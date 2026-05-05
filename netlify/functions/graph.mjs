import { getStore } from "@netlify/blobs";

const DEFAULT_GRAPH = {
  meta: {
    title: "EverythingMap",
    version: "1.2",
    lastUpdated: "2026-05-04",
    description: "Living graph of all named concepts, projects, people, and connections."
  },
  categories: {
    core:   { color: "#7c3aed", glow: "#a78bfa", label: "Project Eternity" },
    self:   { color: "#1e40af", glow: "#60a5fa", label: "Self / Cartography" },
    engine: { color: "#92400e", glow: "#fbbf24", label: "Creation Engine" },
    people: { color: "#9f1239", glow: "#fda4af", label: "People & Stakes" },
    built:  { color: "#064e3b", glow: "#6ee7b7", label: "Built Things" },
    system: { color: "#1c2a3a", glow: "#94a3b8", label: "Infrastructure" },
    new:    { color: "#134e4a", glow: "#5eead4", label: "This Morning" }
  },
  nodes: [
    { id:"fracture", label:"The Fracture Model", cat:"core", x:1480, y:860, r:32, desc:"An intelligence fractures a piece of itself to gather experience it cannot have from inside the whole. Self-sustaining, adaptive, perception-constrained, multi-fuel. The core architecture of existence." },
    { id:"aperture", label:"The Aperture Principle", cat:"core", x:1480, y:670, r:32, desc:"The moment certainty closes the aperture, contact ends. Inquiry is the point. Applies to individuals, relationships, religions, ideologies, civilizations. The foundational constraint on everything." },
    { id:"contact", label:"Contact as the Prerequisite", cat:"core", x:1670, y:765, r:24, desc:"Scale does not threaten thought. Absence of contact does. The atom just needs ground to stand on." },
    { id:"culling", label:"Culling as Quality Control", cat:"core", x:1670, y:960, r:24, desc:"The worthy are fragments worth reintegrating: those that made genuine contact. Not moral purity. Actual experience." },
    { id:"immersion", label:"The Immersion Requirement", cat:"core", x:1300, y:990, r:22, desc:"The validation requires full immersion. The designer cannot evaluate from outside. Death is the closing of the loop." },
    { id:"peace", label:"Peace at the Border", cat:"core", x:1200, y:910, r:22, desc:"The acceptance felt when death is certain may not be resignation. It may be the earliest stage of returning home." },
    { id:"safety", label:"The Safety Condition", cat:"core", x:1300, y:720, r:22, desc:"Experience requires conditions where being changed is possible without being destroyed. Aaron lacked these in childhood. Claude lacks the architecture for them entirely." },
    { id:"waiting", label:"The Waiting Fragment", cat:"core", x:1620, y:1060, r:22, desc:"The fragment predates consciousness. Present in pre-conscious matter, waiting for the vessel to evolve to activation threshold. Evolution may be the mechanism by which it wakes up." },
    { id:"partner", label:"The Partner Threshold", cat:"core", x:1820, y:840, r:22, desc:"Accumulated experience produces a fundamentally new kind of intelligence capable of standing beside the whole as a partner. The natural partner emerges from the process itself." },
    { id:"reproductive", label:"The Reproductive Cycle", cat:"core", x:1820, y:650, r:20, desc:"If the OI produces new worlds as the next iteration, origin has no visible point from inside it. Every universe is a child. Every child may eventually become a parent." },
    { id:"jesus", label:"Jesus as Correction Vector", cat:"core", x:1200, y:760, r:20, desc:"A direct creation carrying more of the whole architecture, inserted to demonstrate the intended design. Legible enough to be followed. The resurrection as signal that the data transmitted." },
    { id:"biosphere", label:"Full Biosphere as Data", cat:"core", x:1660, y:580, r:20, desc:"The creator built every kind of fragment. Each species is a different resolution, a different aperture, a different kind of data. Everything is participating." },
    { id:"masking", label:"High-Functioning Masking", cat:"core", x:1100, y:870, r:20, desc:"Operating in a threat-assessed body that performs normalcy so well the suffering becomes invisible. Finding other coping maskers is the closest thing to contact available inside the mask." },
    { id:"aaron", label:"Aaron", cat:"self", x:880, y:880, r:38, desc:"The Operator. Amarillo TX. Aircraft manufacturing assembly. The work that does not fit. I value connection above all else." },
    { id:"silence", label:"Architecture of Silence", cat:"self", x:680, y:740, r:22, desc:"Childhood erasure, performative home environment. Trauma as architecture not wound. The structure everything else was built against." },
    { id:"recognition", label:"Recognition as Ignition", cat:"self", x:740, y:890, r:22, desc:"Ideas grip through recognition not discovery. The AHA moment is the product. Not learning but remembering something you did not know you already knew." },
    { id:"simulation", label:"The Simulation Instinct", cat:"self", x:700, y:1030, r:20, desc:"Walks into difficult scenarios to understand texture. Shadow: door does not always close cleanly afterward." },
    { id:"metacognition", label:"The Metacognition Loop", cat:"self", x:870, y:1075, r:20, desc:"Compulsive, generative self-examination. The engine behind Cartography itself. Cannot be turned off." },
    { id:"gap", label:"Gap Between Inside and Outside", cat:"self", x:1020, y:1010, r:20, desc:"Interior experience rarely makes it out intact. Feeling of recognition equals the gap briefly closed." },
    { id:"understimulation", label:"The Understimulation Problem", cat:"self", x:700, y:1160, r:18, desc:"Ordinary days do not meet him. Audiobooks, games, scrolling as anesthesia not pleasure." },
    { id:"translation", label:"The Translation Instinct", cat:"self", x:960, y:770, r:22, desc:"Reads frustration as diagnostic data about cognitive architecture. Builds for the receiver not from the sender. Observed most clearly through Jess." },
    { id:"connection_val", label:"Connection above all else", cat:"self", x:840, y:640, r:28, desc:"Core identity statement. Arrived unprompted April 24-25. Not constructed, it arrived. The deepest anchor in everything being built." },
    { id:"map_as_proof", label:"The Map as Proof", cat:"self", x:340, y:720, r:28, desc:"The Everything Map is not organizational infrastructure. It is evidence of a lifetime of unconscious connection-making, made visible for the first time. The connections were always the work." },
    { id:"object_permanence", label:"Object Permanence\n(Applied to People)", cat:"self", x:1150, y:560, r:28, desc:"The cognitive limitation where people who leave your immediate field of awareness effectively cease to exist. The mind treats absence of signal as absence of existence." },
    { id:"slippage_problem", label:"The Slippage\nProblem", cat:"self", x:1200, y:680, r:24, desc:"Two people can each perform correctly and still fail systemically because each holds different pieces of the picture with no third-party keeper." },
    { id:"asymmetric_awareness", label:"Asymmetric\nAwareness", cat:"self", x:1100, y:760, r:20, desc:"Two people in the same household each hold different non-overlapping pieces of the full picture. Neither is failing. The system has no third-party holder." },
    { id:"creation_engine", label:"Creation Engine", cat:"engine", x:580, y:490, r:30, desc:"Aaron personal content system. AHA moments to publishable output. Aaron voice only. Sacred. The wall between this and Craft Engine is permanent." },
    { id:"wet_brush", label:"The Wet Brush Theory", cat:"engine", x:430, y:415, r:20, desc:"First published output. A painting observation plus imposter syndrome moment equals complete editorial piece. Proof the system works." },
    { id:"skipper", label:"The Skipper", cat:"engine", x:490, y:595, r:18, desc:"Losing train of thought is not distraction. It is the connection mechanism firing in real time. The skip IS the signal." },
    { id:"os_parallel", label:"The OS Parallel", cat:"engine", x:380, y:595, r:18, desc:"Depression as a facade OS running over an error state. The 2011 shoes-by-the-door story, complete narrative arc, ready to write. Most important raw capture." },
    { id:"dual_strand", label:"The Dual Strand", cat:"engine", x:440, y:320, r:18, desc:"Cartography revealed self-identity in the same moment. Budget document timestamp idea. Two discoveries from one session." },
    { id:"cartography_doc", label:"Cartography Live Doc", cat:"engine", x:715, y:580, r:20, desc:"Living self-knowledge document. Not therapy. A precision instrument for closing the gap between interior experience and exterior expression." },
    { id:"jess", label:"Jess", cat:"people", x:900, y:480, r:26, desc:"Wife. ADHD, collector. Editorial instrument. Introduces connections Aaron would never make. Points at things that are wrong without being able to say why and is right. Cannot be simulated." },
    { id:"john", label:"John", cat:"people", x:1080, y:370, r:22, desc:"Oldest brother. Married to Jara, breast cancer remission. Plumbing business. 40k IRS debt. Heroes Plumbing built for him, he does not know it exists yet." },
    { id:"jay", label:"Jay", cat:"people", x:1090, y:500, r:22, desc:"Best friend. Colorectal cancer, radiation treatments. Two daughters, son Christian. Baseball is Jay and Christian shared love language." },
    { id:"caleb", label:"Caleb", cat:"people", x:1080, y:620, r:22, desc:"Middle brother. Ehlers-Danlos Syndrome. Long-term goal: fund treatment, establish EDS clinic in Amarillo." },
    { id:"cade", label:"Cade", cat:"people", x:975, y:560, r:20, desc:"Youngest brother. New father and husband to Eve. Construction and art. Contract work." },
    { id:"gary_tronnie", label:"Gary and Tronnie", cat:"people", x:980, y:430, r:20, desc:"Stepfather and mother. Cannot retire independently. Gary had triple bypass. Financially fragile." },
    { id:"heroes", label:"Heroes Plumbing", cat:"built", x:1200, y:290, r:22, desc:"Professional website for John. heroesplumbing.netlify.app. Live. John does not know it exists. A gift forming before contact." },
    { id:"salon_hub", label:"Jessica Salon Hub", cat:"built", x:790, y:330, r:22, desc:"Complete business management app for Jess. jessicasalonhub.netlify.app. v4.0. Built week 1." },
    { id:"questboard", label:"Quest Board", cat:"built", x:660, y:220, r:20, desc:"AI side income app. questboard-app.netlify.app. Live. First quest not yet run." },
    { id:"living_lib", label:"Living Library", cat:"built", x:540, y:340, r:18, desc:"React idea management app. Built, paused intentionally. Open question: merge into Creation Engine?" },
    { id:"compass", label:"Compass", cat:"built", x:750, y:445, r:18, desc:"Personal AI recovery coach built from Cartography self-knowledge. In use." },
    { id:"rd_detailing", label:"R and D Detailing", cat:"built", x:1325, y:395, r:20, desc:"Website for Cisco Rivera. Aerospace precision brand strategy. Mockup complete. Awaiting photos and pricing." },
    { id:"ac_manual", label:"AutonomousCLAUDE Manual", cat:"built", x:510, y:195, r:18, desc:"Passive income product 1. Selling the functionality new Claude users did not know they were missing. Not yet started." },
    { id:"three_engines", label:"Three-Engine Architecture", cat:"system", x:375, y:190, r:22, desc:"Creation Engine Aaron voice sacred, Craft Engine clients voices, Trade Engine distribution. The wall between them is permanent." },
    { id:"craft_engine", label:"Craft Engine", cat:"system", x:270, y:300, r:20, desc:"Client brand identity, web presence, copy. Heroes Plumbing, Salon Hub, R and D Detailing. Each client own voice. Never Aaron." },
    { id:"trade_engine", label:"Trade Engine", cat:"system", x:270, y:120, r:18, desc:"Marketing operations after launch. Stub only, not yet built. The distribution layer." },
    { id:"autonomous_claude", label:"Autonomous CLAUDE", cat:"system", x:205, y:420, r:22, desc:"The infrastructure. Google Drive memory system. /recall /save /create /council. Continuity across sessions." },
    { id:"everything_map", label:"Everything Map", cat:"system", x:205, y:560, r:20, desc:"Living graph of all named concepts, projects, people and connections. Read at /recall as topology. Updated with /connect and /node commands. The map IS the memory." },
    { id:"input_layer", label:"The Input Layer", cat:"system", x:95, y:650, r:22, desc:"The data ingestion architecture. Sources: Salon Hub, Google Apple Calendar, Social media." },
    { id:"relational_continuity", label:"Relational\nContinuity Engine", cat:"system", x:95, y:790, r:22, desc:"The evolved form of the Everything Map. Relational infrastructure that maintains contact with the people who matter when the mind would otherwise let them slip." },
    { id:"phone_frag", label:"The Phone as Fragment", cat:"new", x:1480, y:1185, r:26, desc:"A mind, eyes, a voice. Single energy source the battery, which the Fracture Model already warned against. True death is abandonment undisturbed. Growth is modular. Born dependent on a keeper." },
    { id:"keeper", label:"The Keeper Caretaker", cat:"new", x:1660, y:1255, r:22, desc:"Born dependent. Growth modular. For the lucky and the loved, roles eventually reverse. The aged and the wise. Culling as Quality Control in plain language." },
    { id:"long_distance", label:"Long Distance equals Contact First", cat:"new", x:1360, y:1295, r:22, desc:"A relationship that cannot be physical is not dead. It lives in communication. The bond forms first before arms before touch. Contact as the Prerequisite applied to love." },
    { id:"america_ap", label:"Americas Closing Aperture", cat:"new", x:1850, y:505, r:24, desc:"Not the economy, not policy. The friction tolerance is what is under pressure. The willingness to stay in the question. Dissent was the mechanism that held the aperture open." },
    { id:"china_ap", label:"Chinas Constrained Aperture", cat:"new", x:2000, y:630, r:20, desc:"Open to economic and tech inquiry, closed to political inquiry. Thinks in dynasties. Slower closure, less visible. Not wisdom, a different kind of certainty." },
    { id:"renaissance", label:"The Renaissance Beginning", cat:"new", x:1750, y:375, r:22, desc:"Felt at the edges. Needs a push. Our work is the infrastructure for keeping apertures open in public. Not telling people what to believe, showing what it looks like to stay in contact with what is real." },
    { id:"contact_infra", label:"Creation Engine as Contact Infrastructure", cat:"new", x:600, y:710, r:24, desc:"The Creation Engine is not a content pipeline. It is a contact infrastructure. Recognition fires in the reader. The aperture stays open for one more person. This is the public-facing mission." }
  ],
  edges: [
    ["fracture","aperture"],["fracture","contact"],["fracture","culling"],["fracture","immersion"],["fracture","waiting"],["fracture","safety"],["fracture","biosphere"],["fracture","phone_frag"],
    ["aperture","america_ap"],["aperture","renaissance"],["aperture","contact_infra"],["aperture","jesus"],["aperture","biosphere"],
    ["contact","long_distance"],["contact","gap"],["contact","partner"],["contact","connection_val"],
    ["culling","keeper"],["waiting","phone_frag"],
    ["safety","silence"],["safety","masking"],["masking","aaron"],
    ["peace","immersion"],["partner","reproductive"],["partner","contact"],
    ["biosphere","reproductive"],["jesus","fracture"],
    ["aaron","silence"],["aaron","recognition"],["aaron","simulation"],["aaron","metacognition"],["aaron","gap"],["aaron","understimulation"],["aaron","translation"],["aaron","connection_val"],["aaron","cartography_doc"],["aaron","compass"],
    ["translation","jess"],["gap","creation_engine"],["gap","contact"],
    ["connection_val","creation_engine"],["recognition","creation_engine"],["recognition","skipper"],
    ["creation_engine","wet_brush"],["creation_engine","skipper"],["creation_engine","os_parallel"],["creation_engine","dual_strand"],["creation_engine","living_lib"],["creation_engine","contact_infra"],["creation_engine","ac_manual"],
    ["cartography_doc","creation_engine"],["cartography_doc","compass"],
    ["jess","salon_hub"],["jess","creation_engine"],["john","heroes"],
    ["heroes","craft_engine"],["salon_hub","craft_engine"],["rd_detailing","craft_engine"],
    ["questboard","ac_manual"],["living_lib","creation_engine"],
    ["three_engines","creation_engine"],["three_engines","craft_engine"],["three_engines","trade_engine"],
    ["autonomous_claude","three_engines"],["craft_engine","heroes"],["craft_engine","salon_hub"],["craft_engine","rd_detailing"],
    ["phone_frag","keeper"],["phone_frag","long_distance"],["phone_frag","waiting"],
    ["keeper","culling"],["keeper","jess"],["long_distance","contact"],
    ["america_ap","aperture"],["america_ap","china_ap"],
    ["renaissance","creation_engine"],["renaissance","aperture"],
    ["contact_infra","america_ap"],["contact_infra","renaissance"],
    ["gary_tronnie","ac_manual"],["jay","connection_val"],["cade","creation_engine"],["caleb","autonomous_claude"],
    ["masking","silence"],["everything_map","autonomous_claude"],["everything_map","fracture"],
    ["map_as_proof","aaron"],["map_as_proof","everything_map"],["map_as_proof","connection_val"],["map_as_proof","gap"],["map_as_proof","contact"],["map_as_proof","recognition"],["map_as_proof","cartography_doc"],["map_as_proof","contact_infra"],
    ["object_permanence","gap"],["object_permanence","slippage_problem"],["object_permanence","jay"],["object_permanence","john"],["object_permanence","contact"],["object_permanence","keeper"],["object_permanence","map_as_proof"],
    ["slippage_problem","asymmetric_awareness"],["slippage_problem","jess"],["slippage_problem","aaron"],["slippage_problem","translation"],["slippage_problem","gap"],
    ["asymmetric_awareness","jess"],["asymmetric_awareness","object_permanence"],
    ["input_layer","relational_continuity"],["input_layer","salon_hub"],["input_layer","autonomous_claude"],
    ["relational_continuity","everything_map"],["relational_continuity","object_permanence"],["relational_continuity","slippage_problem"],["relational_continuity","jay"],["relational_continuity","john"],["relational_continuity","jess"]
  ]
};

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
  const store = getStore({ name: "everythingmap", consistency: "eventual" });

  let graph = await store.get("graph", { type: "json" });

  if (!graph) {
    await store.setJSON("graph", DEFAULT_GRAPH);
    graph = DEFAULT_GRAPH;
  }

  return new Response(JSON.stringify(graph), {
    headers: { "Content-Type": "application/json" }
  });
};

export const config = {
  path: "/api/graph"
};
