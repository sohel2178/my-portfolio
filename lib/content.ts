// All copy and structured content for the page. Only facts supplied by Sohel —
// no invented metrics, dates, clients or URLs.

export type Capability = {
  title: string;
  body: string;
  tags: string[];
  icon: "activity" | "map" | "server" | "cpu" | "layers" | "binary";
};

export const capabilities: Capability[] = [
  {
    title: "Real-Time Systems",
    body: "Systems where data moves continuously between devices, servers, and users.",
    tags: ["Socket.IO", "WebSocket", "Redis", "Firebase RTDB"],
    icon: "activity",
  },
  {
    title: "GPS & Fleet Platforms",
    body: "Vehicle tracking, device communication, live maps, alerts, reporting, and fleet management.",
    tags: ["JT808", "GT06", "Leaflet", "MapTiler"],
    icon: "map",
  },
  {
    title: "Distributed Backend Systems",
    body: "Node.js services, Redis, MongoDB clusters, queues, workers, and scalable infrastructure.",
    tags: ["Node.js", "Replica sets", "Sharding", "Workers"],
    icon: "server",
  },
  {
    title: "IoT Systems",
    body: "Connecting sensors, microcontrollers, GPS devices, BMS systems, and backend services.",
    tags: ["ESP32", "MicroPython", "SIM7600G-H", "BMS"],
    icon: "cpu",
  },
  {
    title: "Infrastructure",
    body: "Docker Swarm, Nginx, Linux VPS, networking, reverse proxies, TCP load balancing, and security.",
    tags: ["Docker Swarm", "Nginx", "Tailscale", "Fail2Ban"],
    icon: "layers",
  },
  {
    title: "Protocol Engineering",
    body: "JT808, GT06, TCP, UDP, WebSocket, UART, RS485, and CAN.",
    tags: ["TCP", "UDP", "UART", "RS485", "CAN"],
    icon: "binary",
  },
];

export type ArchNode = {
  id: string;
  label: string;
  sub: string;
  layer: "device" | "network" | "edge" | "service" | "data" | "realtime" | "client";
  detail: string;
  points: string[];
};

export const architecture: ArchNode[] = [
  {
    id: "tracker",
    label: "GPS Tracker",
    sub: "JT808 / GT06 terminal",
    layer: "device",
    detail:
      "The vehicle-side device. It reports position, status, and alarms, and accepts commands back from the platform.",
    points: ["Position uploads", "Heartbeats", "Alarm flags", "Command responses"],
  },
  {
    id: "network",
    label: "4G Network",
    sub: "Cellular uplink",
    layer: "network",
    detail:
      "Long-lived TCP sockets over mobile networks. Connections drop and come back, so the server has to treat reconnects as normal.",
    points: ["Persistent TCP", "Unstable links", "Reconnect storms"],
  },
  {
    id: "nginx",
    label: "Nginx TCP Load Balancer",
    sub: "stream {} proxy",
    layer: "edge",
    detail:
      "Layer-4 proxying in front of the tracker servers. It spreads raw TCP connections across instances without touching the protocol.",
    points: ["TCP proxying", "Load balancing", "Single public entry point"],
  },
  {
    id: "tcp",
    label: "Node.js TCP / JT808 Server",
    sub: "Protocol gateway",
    layer: "service",
    detail:
      "Turns a byte stream into structured messages. It frames and unescapes JT808 packets, verifies checksums, keeps a session per terminal, and sends replies and queued commands back.",
    points: ["Packet framing & parsing", "Session per terminal ID", "ACKs & command queue", "Mileage calculation"],
  },
  {
    id: "redis",
    label: "Redis",
    sub: "Hot state",
    layer: "data",
    detail:
      "The live layer. It holds the latest position and device state, so dashboards and workers never have to scan history to answer “where is it now?”.",
    points: ["Live location cache", "Device state across reconnects", "Command queues"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    sub: "Replica sets · sharding",
    layer: "data",
    detail:
      "Durable storage for position history, devices, alerts, and reports, running on a sharded cluster with replica-set members.",
    points: ["Position history", "Reports & trips", "Sharded cluster"],
  },
  {
    id: "realtime",
    label: "Firebase / WebSocket",
    sub: "Push layer",
    layer: "realtime",
    detail:
      "Fans updates out to connected clients as they happen, using Socket.IO and Firebase Realtime Database depending on the consumer.",
    points: ["Socket.IO rooms", "Firebase RTDB", "Alert delivery"],
  },
  {
    id: "dashboard",
    label: "Next.js Dashboard",
    sub: "Operator UI",
    layer: "client",
    detail:
      "Live maps built on Leaflet and MapTiler, alerts, device commands, and reports, all in a typed React and Next.js app.",
    points: ["Live map", "Alerts", "Device commands", "Reports"],
  },
  {
    id: "manager",
    label: "Fleet Manager",
    sub: "The human at the end",
    layer: "client",
    detail:
      "The person who actually needs the answer. Every layer above exists so they can see where a vehicle is and act on it.",
    points: ["Decisions", "Actions", "Accountability"],
  },
];

export type Project = {
  name: string;
  category: string;
  summary: string;
  challenge: string;
  features: string[];
  stack: string[];
  visual?: "jt808-frame" | "signal-path";
  url?: string;
  repo?: string;
};

export const featuredProject: Project = {
  name: "Sultan Tracker",
  category: "GPS Tracking · Fleet Management · IoT Platform",
  summary:
    "A GPS tracking and fleet management platform in Bangladesh. It covers the full chain: tracker devices talking TCP, live locations, alerts, fleet management, and real-time dashboards for operators.",
  challenge:
    "Keeping thousands of concurrent GPS tracker connections alive and parsed in real time. Behind Nginx TCP proxying and a distributed deployment, every incoming position has to be decoded, cached as live state, persisted, and pushed to the dashboards that are watching it.",
  features: [
    "TCP server infrastructure",
    "GPS data parsing",
    "Real-time location processing",
    "Redis-based live location caching",
    "MongoDB storage",
    "Alert processing",
    "Device command processing",
    "Real-time dashboards",
    "Distributed deployment",
    "Nginx TCP proxying & load balancing",
  ],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redis",
    "Firebase RTDB",
    "Socket.IO",
    "Docker Swarm",
    "Nginx",
    "Leaflet",
    "MapTiler",
  ],
};

export const projects: Project[] = [
  {
    name: "JT808 Tracker Platform",
    category: "IoT · GPS · Protocol Engineering",
    summary:
      "A tracker backend built on the JT808 protocol. It receives device data over TCP, parses JT808 packets, processes positions, calculates mileage, stores device state, and talks back to the trackers.",
    challenge:
      "Implementing a binary protocol correctly at the byte level. That includes framing, escaping, message IDs, and serials, plus keeping each device's session and state consistent when the connection drops and reconnects.",
    features: [
      "JT808 packet parsing",
      "Device session management",
      "GPS position processing & mileage",
      "Command queue & terminal parameter config",
      "Persistent device state across reconnects",
    ],
    stack: ["Node.js", "TCP", "JT808", "MongoDB", "Redis", "Firebase", "Docker"],
    visual: "jt808-frame",
  },
  {
    name: "Battery & IoT Prototyping",
    category: "Embedded · IoT · Hardware",
    summary:
      "Ongoing hardware work on lithium battery systems: BMS integration, GPS-enabled battery monitoring, temperature sensing, and remote charge and discharge control from a backend.",
    challenge:
      "Making physical systems such as cells, BMS boards, relays, and sensors speak reliably to software over UART, RS485, and CAN, then making them controllable remotely.",
    features: [
      "BMS communication",
      "GPS-enabled battery monitoring",
      "Remote charge / discharge control",
      "Temperature monitoring",
      "Relays & sensors",
    ],
    visual: "signal-path",
    stack: ["ESP32", "MicroPython", "BQ76920", "JK BMS", "Daly BMS", "GPS modules", "RS485", "CAN", "UART"],
  },
  {
    name: "WhatsApp CRM",
    category: "Real-time Communication · CRM",
    summary:
      "A WhatsApp-based CRM and backend for handling customer conversations. Messages, status updates, and CRM workflows stay in sync across agents in real time.",
    challenge:
      "Bridging an external, webhook-driven messaging API with a live agent UI, so that conversations and message status stay consistent for everyone looking at them.",
    features: [
      "Customer conversations",
      "Real-time messaging",
      "Message status tracking",
      "CRM workflows",
      "Backend API",
    ],
    stack: ["Next.js", "Express.js", "MongoDB", "Redis", "Socket.IO", "WhatsApp Cloud API"],
  },
  {
    name: "Rangs Tracker",
    category: "Fleet Tracking · Reporting",
    summary:
      "A tracking and reporting application for vehicle data. It provides filterable dashboards and monthly reports built from GPS tracking records.",
    challenge:
      "Turning large volumes of raw tracking records into reports and views that are fast to filter and easy to read.",
    features: ["Monthly reports", "Filtering", "Dashboard UI", "Vehicle data visualization"],
    stack: ["Next.js", "React", "TypeScript", "MongoDB"],
  },
];

export type SkillGroup = { name: string; items: string[] };

export const primaryTech = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Redis",
  "Docker",
  "Nginx",
  "Linux",
  "Firebase",
  "Socket.IO",
  "JT808",
  "ESP32",
] as const;

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    items: [
      "JavaScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "App Router",
      "Leaflet",
      "MapTiler",
      "Real-time dashboards",
      "Responsive UI",
    ],
  },
  {
    name: "Backend",
    items: ["REST APIs", "WebSocket", "JWT auth", "Background workers", "Command processing", "TCP servers"],
  },
  {
    name: "Database",
    items: ["MongoDB replica sets", "MongoDB sharding", "Firebase Realtime Database"],
  },
  {
    name: "Infrastructure",
    items: [
      "Docker Compose",
      "Docker Swarm",
      "Ubuntu",
      "DigitalOcean",
      "Contabo VPS",
      "Tailscale",
      "Certbot",
      "DNS",
      "Reverse proxy",
      "TCP proxying",
      "Load balancing",
      "Monitoring",
      "Fail2Ban",
      "Asterisk / PJSIP",
      "TURN / coturn",
    ],
  },
  {
    name: "IoT / Embedded",
    items: [
      "MicroPython",
      "Raspberry Pi",
      "SIM7600G-H 4G",
      "GPS trackers & modules",
      "BMS",
      "TPMS",
      "Relays",
      "Sensors",
      "PCA9685",
      "MQTT concepts",
      "Hardware debugging",
    ],
  },
  {
    name: "Protocols",
    items: ["GT06", "TCP", "UDP", "HTTP", "UART", "RS485", "CAN", "RTP / SIP"],
  },
  {
    name: "Android",
    items: ["Native Android", "Java", "GPS / tracking apps", "Device communication"],
  },
];

export const philosophy = [
  "Understand the system, not just the API.",
  "Build for real-world constraints.",
  "Measure before optimizing.",
  "Keep infrastructure observable.",
  "Hardware and software are one system when you’re building IoT.",
];

export const journey = [
  {
    stage: "Web Development",
    body: "React, Next.js, and TypeScript. Interfaces, state, and the browser as a platform.",
  },
  {
    stage: "Backend Systems",
    body: "Node.js and Express APIs, authentication, MongoDB, and the work of keeping data correct.",
  },
  {
    stage: "GPS Tracking",
    body: "Tracker devices, TCP servers, and binary protocols like JT808 and GT06. This is where the work stopped being only HTTP.",
  },
  {
    stage: "Real-Time Infrastructure",
    body: "Redis, Socket.IO, and Firebase. Moving live state from devices to dashboards as it happens.",
  },
  {
    stage: "IoT / Embedded Systems",
    body: "ESP32, MicroPython, BMS boards, UART, RS485, and CAN. Working on the physical side of the system too.",
  },
  {
    stage: "Distributed Systems",
    body: "Docker Swarm, Nginx TCP load balancing, and sharded MongoDB. Making the whole chain hold up under load.",
  },
];
