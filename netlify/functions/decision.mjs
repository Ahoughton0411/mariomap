import { getStore } from "@netlify/blobs";

const REVIEW_WINDOWS = {
  galaxy: 60, star: 60,
  planet: 14, moon: 14,
  "asteroid-primary": 30,
  "asteroid-satellite": 30
};

const MAX_EXTENSIONS = 2;

function getReviewWindow(depth) {
  return REVIEW_WINDOWS[depth] || 30;
}

function calculatePosition(concept, graph) {
  const nodeMap = {};
  graph.nodes.forEach(n => { nodeMap[n.id] = n; });

  const connected = (concept.connections || [])
    .map(id => nodeMap[id])
    .filter(Boolean);

  if (connected.length === 0) {
    const angle = Math.random() * Math.PI * 2;
    return { x: Math.round(1050 + Math.cos(angle) * 700), y: Math.round(700 + Math.sin(angle) * 500) };
  }

  const avgX = connected.reduce((sum, n) => sum + n.x, 0) / connected.length;
  const avgY = connected.reduce((sum, n) => sum + n.y, 0) / connected.length;
  const offset = 80 + Math.random() * 60;
  const angle = Math.random() * Math.PI * 2;

  return {
    x: Math.round(avgX + Math.cos(angle) * offset),
    y: Math.round(avgY + Math.sin(angle) * offset)
  };
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { conceptId, decision } = body;

  if (!conceptId || !decision) {
    return new Response(JSON.stringify({ error: "conceptId and decision are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const store = getStore({ name: "everythingmap", consistency: "eventual" });

  // Load queue
  const queue = await store.get("queue", { type: "json" });
  if (!queue) {
    return new Response(JSON.stringify({ error: "Queue not initialized" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const conceptIndex = queue.pending.findIndex(c => c.id === conceptId);
  if (conceptIndex === -1) {
    return new Response(JSON.stringify({ error: `Concept '${conceptId}' not found in pending queue` }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  const concept = { ...queue.pending[conceptIndex] };
  const today = new Date().toISOString().split("T")[0];

  if (decision === "approve") {
    // Remove from pending
    queue.pending.splice(conceptIndex, 1);
    concept.status = "approved";
    concept.decidedAt = today;
    queue.approved.unshift(concept);

    // Load graph and add the new node
    const graph = await store.get("graph", { type: "json" });
    if (!graph) {
      return new Response(JSON.stringify({ error: "Graph not initialized" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check for duplicate
    const alreadyExists = graph.nodes.find(n => n.id === concept.id);
    if (!alreadyExists) {
      const pos = calculatePosition(concept, graph);
      const radius = Math.max(14, Math.min(38, concept.weight * 6 + 8));

      const newNode = {
        id: concept.id,
        label: concept.label,
        cat: concept.cluster,
        cluster: concept.cluster,
        x: pos.x,
        y: pos.y,
        r: radius,
        desc: concept.desc,
        depth: concept.depth,
        motion: concept.motion,
        parent: concept.parent,
        weight: concept.weight,
        approvedAt: today
      };

      graph.nodes.push(newNode);

      // Add edges for valid connections
      const existingIds = new Set(graph.nodes.map(n => n.id));
      (concept.connections || []).forEach(targetId => {
        if (existingIds.has(targetId)) {
          // Avoid duplicate edges
          const edgeExists = graph.edges.some(
            ([a, b]) => (a === concept.id && b === targetId) || (a === targetId && b === concept.id)
          );
          if (!edgeExists) {
            graph.edges.push([concept.id, targetId]);
          }
        }
      });

      // Update graph meta
      graph.meta.lastUpdated = today;
      graph.meta.version = incrementVersion(graph.meta.version || "1.2");

      await store.setJSON("graph", graph);
    }

    await store.setJSON("queue", queue);

    return new Response(JSON.stringify({
      success: true,
      decision: "approve",
      conceptId,
      message: `'${concept.label}' approved and added to EverythingMap`
    }), { headers: { "Content-Type": "application/json" } });

  } else if (decision === "reject") {
    queue.pending.splice(conceptIndex, 1);
    concept.status = "rejected";
    concept.decidedAt = today;
    queue.rejected.unshift(concept);
    await store.setJSON("queue", queue);

    return new Response(JSON.stringify({
      success: true,
      decision: "reject",
      conceptId,
      message: `'${concept.label}' rejected — back to session log`
    }), { headers: { "Content-Type": "application/json" } });

  } else if (decision === "archive") {
    queue.pending.splice(conceptIndex, 1);
    concept.status = "archived";
    concept.archivedAt = today;
    queue.archived.unshift(concept);
    await store.setJSON("queue", queue);

    return new Response(JSON.stringify({
      success: true,
      decision: "archive",
      conceptId,
      message: `'${concept.label}' archived — dead letter`
    }), { headers: { "Content-Type": "application/json" } });

  } else if (decision === "extend") {
    if ((concept.extensions || 0) >= MAX_EXTENSIONS) {
      return new Response(JSON.stringify({
        error: "Maximum extensions reached",
        message: "Approve, reject, or archive this concept"
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const days = getReviewWindow(concept.depth);
    const base = concept.reviewBy ? new Date(concept.reviewBy) : new Date();
    base.setDate(base.getDate() + days);
    concept.reviewBy = base.toISOString().split("T")[0];
    concept.extensions = (concept.extensions || 0) + 1;
    queue.pending[conceptIndex] = concept;
    await store.setJSON("queue", queue);

    return new Response(JSON.stringify({
      success: true,
      decision: "extend",
      conceptId,
      newReviewBy: concept.reviewBy,
      extensionsLeft: MAX_EXTENSIONS - concept.extensions,
      message: `Extended to ${concept.reviewBy}`
    }), { headers: { "Content-Type": "application/json" } });

  } else {
    return new Response(JSON.stringify({ error: `Unknown decision: '${decision}'` }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};

function incrementVersion(version) {
  const parts = version.split(".");
  const minor = parseInt(parts[1] || "2", 10);
  return `${parts[0]}.${minor + 1}`;
}

export const config = {
  path: "/api/decision"
};
