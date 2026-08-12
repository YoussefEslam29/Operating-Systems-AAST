"use client";

import React from "react";
import { SimulationConfig, Algorithm } from "@/lib/types";

interface ControlPanelProps {
  config: SimulationConfig;
  running: boolean;
  paused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onConfigChange: (patch: Partial<SimulationConfig>) => void;
}

export default function ControlPanel({
  config,
  running,
  paused,
  onStart,
  onPause,
  onReset,
  onConfigChange,
}: ControlPanelProps) {
  const speeds = [0.5, 1, 2, 5];
  const disabled = running && !paused;

  return (
    <div className="control-panel" id="control-panel">
      {/* Play / Pause / Reset */}
      <div className="control-group">
        {!running || paused ? (
          <button className="btn btn--primary" onClick={onStart} id="btn-start">
            <span className="btn-icon">{paused ? "▶" : "▶"}</span>
            {paused ? "Resume" : "Start"}
          </button>
        ) : (
          <button className="btn btn--warning" onClick={onPause} id="btn-pause">
            <span className="btn-icon">⏸</span>
            Pause
          </button>
        )}
        <button className="btn btn--danger" onClick={onReset} id="btn-reset">
          <span className="btn-icon">↺</span>
          Reset
        </button>
      </div>

      <div className="control-divider" />

      {/* Algorithm */}
      <div className="control-group">
        <span className="control-label">Algorithm</span>
        <select
          className="control-select"
          id="select-algorithm"
          value={config.algorithm}
          disabled={disabled}
          onChange={(e) =>
            onConfigChange({ algorithm: e.target.value as Algorithm })
          }
        >
          <option value="round-robin">Round Robin</option>
          <option value="least-connections">Least Connections</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div className="control-divider" />

      {/* Servers */}
      <div className="control-group">
        <span className="control-label">Servers</span>
        <input
          className="control-input"
          id="input-servers"
          type="number"
          min={1}
          max={8}
          value={config.numServers}
          disabled={disabled}
          onChange={(e) =>
            onConfigChange({
              numServers: Math.max(1, Math.min(8, Number(e.target.value))),
            })
          }
        />
      </div>

      {/* Tasks */}
      <div className="control-group">
        <span className="control-label">Tasks</span>
        <input
          className="control-input"
          id="input-tasks"
          type="number"
          min={1}
          max={100}
          value={config.numTasks}
          disabled={disabled}
          onChange={(e) =>
            onConfigChange({
              numTasks: Math.max(1, Math.min(100, Number(e.target.value))),
            })
          }
        />
      </div>

      {/* Burst Range */}
      <div className="control-group">
        <span className="control-label">Burst</span>
        <input
          className="control-input"
          id="input-min-burst"
          type="number"
          min={100}
          max={5000}
          step={100}
          value={config.minBurst}
          disabled={disabled}
          onChange={(e) =>
            onConfigChange({ minBurst: Number(e.target.value) })
          }
        />
        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>–</span>
        <input
          className="control-input"
          id="input-max-burst"
          type="number"
          min={100}
          max={5000}
          step={100}
          value={config.maxBurst}
          disabled={disabled}
          onChange={(e) =>
            onConfigChange({ maxBurst: Number(e.target.value) })
          }
        />
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>ms</span>
      </div>

      <div className="control-divider" />

      {/* Speed */}
      <div className="control-group">
        <span className="control-label">Speed</span>
        <div className="speed-group">
          {speeds.map((s) => (
            <button
              key={s}
              className={`speed-btn ${
                config.speed === s ? "speed-btn--active" : ""
              }`}
              onClick={() => onConfigChange({ speed: s })}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
