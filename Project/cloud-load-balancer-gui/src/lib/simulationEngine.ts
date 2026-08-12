import {
  Task,
  ServerState,
  LogEntry,
  SimulationState,
  SimulationConfig,
  SAMPLE_IPS,
  Algorithm,
} from "./types";

// ─── Defaults ────────────────────────────────────────────

export const DEFAULT_CONFIG: SimulationConfig = {
  numServers: 3,
  numTasks: 10,
  minBurst: 500,
  maxBurst: 2000,
  speed: 1,
  algorithm: "round-robin",
};

// ─── Helpers ─────────────────────────────────────────────

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function timeStr(): string {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour12: false }) + "." + String(d.getMilliseconds()).padStart(3, "0");
}

let logCounter = 0;

function makeLog(tick: number, type: LogEntry["type"], message: string): LogEntry {
  return { id: logCounter++, tick, type, message, timestamp: timeStr() };
}

// ─── Create Initial State ────────────────────────────────

export function createInitialState(config: SimulationConfig): SimulationState {
  logCounter = 0;
  const servers: ServerState[] = [];
  for (let i = 1; i <= config.numServers; i++) {
    servers.push({
      id: i,
      name: `Server-${i}`,
      status: "idle",
      currentTask: null,
      queue: [],
      tasksCompleted: 0,
      totalBusyTime: 0,
      avgBurst: 0,
    });
  }

  return {
    running: false,
    paused: false,
    tick: 0,
    tasksGenerated: 0,
    tasksCompleted: 0,
    servers,
    logs: [makeLog(0, "system", "Simulation initialized. Ready to start.")],
    nextServerIndex: 0,
    config,
    taskQueue: [],
    allTasks: [],
  };
}

// ─── Generate a single Task ──────────────────────────────

function generateTask(state: SimulationState): Task {
  const { minBurst, maxBurst } = state.config;
  const burst = rand(minBurst, maxBurst);
  const geo = pickRandom(SAMPLE_IPS);
  const id = state.tasksGenerated + 1;

  return {
    id,
    burstTime: burst,
    arrivalTime: state.tick,
    origin: `${geo.city}, ${geo.country}`,
    ip: geo.ip,
    status: "queued",
    assignedServer: null,
    progress: 0,
    startedAt: null,
  };
}

// ─── Dispatch a Task ─────────────────────────────────────

function pickServer(state: SimulationState, algorithm: Algorithm): ServerState {
  const { servers } = state;
  switch (algorithm) {
    case "round-robin": {
      const server = servers[state.nextServerIndex % servers.length];
      state.nextServerIndex = (state.nextServerIndex + 1) % servers.length;
      return server;
    }
    case "least-connections": {
      let best = servers[0];
      for (const s of servers) {
        const sLoad = s.queue.length + (s.currentTask ? 1 : 0);
        const bLoad = best.queue.length + (best.currentTask ? 1 : 0);
        if (sLoad < bLoad) best = s;
      }
      return best;
    }
    case "random":
      return pickRandom(servers);
    default:
      return servers[0];
  }
}

function dispatchTask(state: SimulationState, task: Task): LogEntry[] {
  const logs: LogEntry[] = [];
  const server = pickServer(state, state.config.algorithm);

  task.assignedServer = server.id;
  server.queue.push(task);

  const geo = SAMPLE_IPS.find((g) => g.ip === task.ip);
  const flag = geo ? geo.flag : "❓";

  logs.push(
    makeLog(
      state.tick,
      "dispatch",
      `[LoadBalancer] Dispatching Task-${task.id} (burst=${task.burstTime}ms, from ${task.origin} ${flag}) → ${server.name}`
    )
  );

  return logs;
}

// ─── Tick the Simulation ─────────────────────────────────

const TICKS_BETWEEN_TASKS = 8; // generate a task every N ticks
const MS_PER_TICK = 100;       // each tick represents 100ms of simulation time

export function simulationTick(prev: SimulationState): SimulationState {
  const state: SimulationState = JSON.parse(JSON.stringify(prev));
  state.tick++;
  const newLogs: LogEntry[] = [];

  // 1) Generate tasks at intervals
  if (
    state.tasksGenerated < state.config.numTasks &&
    state.tick % TICKS_BETWEEN_TASKS === 1
  ) {
    const task = generateTask(state);
    state.tasksGenerated++;
    state.allTasks.push(task);

    const geoInfo = SAMPLE_IPS.find((g) => g.ip === task.ip);
    newLogs.push(
      makeLog(
        state.tick,
        "geo",
        `[GeoLocator] lookup(${task.ip}) → ${task.origin} ${geoInfo?.flag || ""}`
      )
    );

    // Dispatch immediately
    const dispatchLogs = dispatchTask(state, task);
    newLogs.push(...dispatchLogs);
  }

  // 2) Process servers
  for (const server of state.servers) {
    // If currently processing a task, advance progress
    if (server.currentTask) {
      const tickMs = MS_PER_TICK;
      server.currentTask.progress += (tickMs / server.currentTask.burstTime) * 100;

      if (server.currentTask.progress >= 100) {
        server.currentTask.progress = 100;
        server.currentTask.status = "completed";
        server.tasksCompleted++;
        server.totalBusyTime += server.currentTask.burstTime;
        server.avgBurst =
          server.tasksCompleted > 0
            ? Math.round(server.totalBusyTime / server.tasksCompleted)
            : 0;

        newLogs.push(
          makeLog(
            state.tick,
            "complete",
            `[${server.name}] ✓ finished Task-${server.currentTask.id} (burst=${server.currentTask.burstTime}ms, from ${server.currentTask.origin})`
          )
        );

        state.tasksCompleted++;

        // Update in allTasks
        const idx = state.allTasks.findIndex((t) => t.id === server.currentTask!.id);
        if (idx !== -1) state.allTasks[idx] = { ...server.currentTask };

        server.currentTask = null;
      }
    }

    // If idle and has queued tasks, start next
    if (!server.currentTask && server.queue.length > 0) {
      const next = server.queue.shift()!;
      next.status = "processing";
      next.startedAt = state.tick;
      next.progress = 0;
      server.currentTask = next;

      newLogs.push(
        makeLog(
          state.tick,
          "processing",
          `[${server.name}] ▶ processing Task-${next.id} (burst=${next.burstTime}ms, from ${next.origin})`
        )
      );
    }

    // Update status
    if (server.currentTask) {
      server.status =
        server.queue.length > 2 ? "overloaded" : "processing";
    } else {
      server.status = "idle";
    }
  }

  // 3) Check if simulation is complete
  if (
    state.tasksGenerated >= state.config.numTasks &&
    state.tasksCompleted >= state.config.numTasks
  ) {
    state.running = false;
    newLogs.push(
      makeLog(state.tick, "system", "=== Simulation complete ===")
    );

    // Print summary
    let totalTasks = 0;
    for (const s of state.servers) {
      totalTasks += s.tasksCompleted;
      newLogs.push(
        makeLog(
          state.tick,
          "system",
          `${s.name}: ${s.tasksCompleted} tasks | avg burst ${s.avgBurst}ms | total busy time ${s.totalBusyTime}ms`
        )
      );
    }
    newLogs.push(
      makeLog(state.tick, "system", `Total tasks processed: ${totalTasks}`)
    );
  }

  state.logs = [...state.logs, ...newLogs];
  return state;
}
