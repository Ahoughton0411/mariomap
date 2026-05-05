import { getStore } from "@netlify/blobs";

const DEFAULT_QUEUE = {
  meta: {
    title: "EverythingMap Pending Queue",
    version: "1.0",
    lastUpdated: "2026-05-04"
  },
  pending: [
    {
      id: "black_hole_architecture",
      label: "Black Hole as Design Architecture",
      cluster: "core",
      desc: "Black holes are not destruction events — they are gravitational anchors, compression processors, and threshold markers. The event horizon is a physical Aperture Principle: cross it and inquiry stops permanently. Hawking radiation suggests information returns eventually in another form — a fragment that fell in doesn't cease to exist, it gets encoded differently.",
      connections: ["fracture", "aperture", "reproductive", "culling"],
      depth: "asteroid-primary",
      motion: "orbit-galaxy",
      parent: "core",
      weight: 3,
      surfaced: "2026-05-04",
      session: "MarioMap_Session_2026-05-04_Morning",
      status: "pending",
      surfacedBy: "aaron",
      reviewBy: "2026-06-04",
      extensions: 0,
      threads: [
        "Black Hole as Threshold Architecture — event horizon = physical Aperture Principle",
        "Black Hole as Compression/Return Cycle — Hawking radiation = fragment returning",
        "Black Hole as Gravitational Anchor — what makes a galaxy cohere"
      ]
    }
  ],
  approved: [],
  rejected: [],
  archived: []
};

export default async (req, context) => {
  const store = getStore({ name: "everythingmap", consistency: "eventual" });

  let queue = await store.get("queue", { type: "json" });

  if (!queue) {
    await store.setJSON("queue", DEFAULT_QUEUE);
    queue = DEFAULT_QUEUE;
  }

  return new Response(JSON.stringify(queue), {
    headers: { "Content-Type": "application/json" }
  });
};

export const config = {
  path: "/api/queue"
};
