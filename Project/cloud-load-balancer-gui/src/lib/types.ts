// ─── Simulation Types ─────────────────────────────────────

export type Algorithm = "round-robin" | "least-connections" | "random";

export interface Task {
  id: number;
  burstTime: number;        // ms
  arrivalTime: number;      // simulation tick
  origin: string;           // city, country
  ip: string;
  status: "queued" | "processing" | "completed";
  assignedServer: number | null;
  progress: number;         // 0-100
  startedAt: number | null; // tick when processing began
}

export interface ServerState {
  id: number;
  name: string;
  status: "idle" | "processing" | "overloaded";
  currentTask: Task | null;
  queue: Task[];
  tasksCompleted: number;
  totalBusyTime: number;    // ms
  avgBurst: number;
}

export interface LogEntry {
  id: number;
  tick: number;
  type: "dispatch" | "processing" | "complete" | "system" | "geo";
  message: string;
  timestamp: string;
}

export interface SimulationConfig {
  numServers: number;
  numTasks: number;
  minBurst: number;
  maxBurst: number;
  speed: number;            // multiplier
  algorithm: Algorithm;
}

export interface SimulationState {
  running: boolean;
  paused: boolean;
  tick: number;
  tasksGenerated: number;
  tasksCompleted: number;
  servers: ServerState[];
  logs: LogEntry[];
  nextServerIndex: number;  // for round-robin
  config: SimulationConfig;
  taskQueue: Task[];        // tasks waiting to be dispatched
  allTasks: Task[];
}

// ─── Geo IP Data (matching Java code) ─────────────────────

export const SAMPLE_IPS: { ip: string; city: string; country: string; flag: string }[] = [
  { ip: "8.8.8.8",        city: "Ashburn",            country: "United States", flag: "🇺🇸" },
  { ip: "1.1.1.1",        city: "Ashburn",            country: "United States", flag: "🇺🇸" },
  { ip: "41.34.0.1",      city: "6th of October City",country: "Egypt",         flag: "🇪🇬" },
  { ip: "196.219.0.1",    city: "6th of October City",country: "Egypt",         flag: "🇪🇬" },
  { ip: "185.60.216.35",  city: "Dublin",             country: "Ireland",       flag: "🇮🇪" },
  { ip: "103.4.16.0",     city: "South Brisbane",     country: "Australia",     flag: "🇦🇺" },
];
