"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { SimulationState, SimulationConfig } from "@/lib/types";
import {
  DEFAULT_CONFIG,
  createInitialState,
  simulationTick,
} from "@/lib/simulationEngine";

import Header from "@/components/Header";
import ControlPanel from "@/components/ControlPanel";
import ServerCard from "@/components/ServerCard";
import MetricsOverview from "@/components/MetricsOverview";
import LogTerminal from "@/components/LogTerminal";

export default function Home() {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [simState, setSimState] = useState<SimulationState>(() =>
    createInitialState(DEFAULT_CONFIG)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Derive overall status
  const overallStatus = simState.running
    ? simState.paused
      ? "paused"
      : "running"
    : simState.tasksCompleted > 0 &&
      simState.tasksCompleted >= simState.config.numTasks
    ? "complete"
    : "idle";

  // ─── Simulation Loop ──────────────────────────────────
  const tick = useCallback(() => {
    setSimState((prev) => {
      if (!prev.running || prev.paused) return prev;
      return simulationTick(prev);
    });
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (simState.running && !simState.paused) {
      const ms = Math.round(120 / simState.config.speed);
      intervalRef.current = setInterval(tick, ms);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simState.running, simState.paused, simState.config.speed, tick]);

  // ─── Handlers ──────────────────────────────────────────
  const handleStart = () => {
    if (simState.paused) {
      setSimState((prev) => ({ ...prev, paused: false }));
    } else {
      setSimState((prev) => ({ ...prev, running: true, paused: false }));
    }
  };

  const handlePause = () => {
    setSimState((prev) => ({ ...prev, paused: true }));
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSimState(createInitialState(config));
  };

  const handleConfigChange = (patch: Partial<SimulationConfig>) => {
    const next = { ...config, ...patch };
    setConfig(next);
    // If speed changed while running, update the live state
    if (patch.speed !== undefined) {
      setSimState((prev) => ({
        ...prev,
        config: { ...prev.config, speed: patch.speed! },
      }));
    }
    // If not running, rebuild initial state with new config
    if (!simState.running) {
      setSimState(createInitialState(next));
    }
  };

  return (
    <div className="app-container">
      <Header status={overallStatus} tick={simState.tick} />

      <div className="main-content">
        {/* Controls */}
        <ControlPanel
          config={simState.config}
          running={simState.running}
          paused={simState.paused}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onConfigChange={handleConfigChange}
        />

        {/* Metrics */}
        <div className="section-title">📊 Metrics Overview</div>
        <MetricsOverview state={simState} />

        {/* Server Cards */}
        <div className="section-title">🖥️ Virtual Machine Servers</div>
        <div className="dashboard-grid">
          {simState.servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>

        {/* Log Terminal */}
        <div className="section-title">📋 Simulation Logs</div>
        <LogTerminal logs={simState.logs} />
      </div>
    </div>
  );
}
