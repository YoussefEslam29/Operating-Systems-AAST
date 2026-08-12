"use client";

import React from "react";
import { SimulationState } from "@/lib/types";

interface MetricsOverviewProps {
  state: SimulationState;
}

const SERVER_COLORS = [
  "#00D4FF",
  "#BF5FFF",
  "#39FF14",
  "#FFB800",
  "#FF4757",
  "#E879F9",
  "#F1C40F",
  "#06D6A0",
];

export default function MetricsOverview({ state }: MetricsOverviewProps) {
  const { servers, tasksGenerated, tasksCompleted, config } = state;
  const totalBusy = servers.reduce((a, s) => a + s.totalBusyTime, 0);
  const avgBurst =
    tasksCompleted > 0 ? Math.round(totalBusy / tasksCompleted) : 0;
  const activeCount = servers.filter(
    (s) => s.status === "processing" || s.status === "overloaded"
  ).length;

  // Distribution data
  const totalTasks = servers.reduce((a, s) => a + s.tasksCompleted, 0);

  return (
    <div>
      {/* Metric cards */}
      <div className="metrics-grid" id="metrics-overview">
        <div className="metric-card metric-card--cyan">
          <div className="metric-icon">📦</div>
          <div className="metric-value metric-value--cyan">
            {tasksGenerated}
            <span
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                fontWeight: 400,
              }}
            >
              {" "}
              / {config.numTasks}
            </span>
          </div>
          <div className="metric-label">Tasks Generated</div>
        </div>

        <div className="metric-card metric-card--emerald">
          <div className="metric-icon">✅</div>
          <div className="metric-value metric-value--emerald">
            {tasksCompleted}
          </div>
          <div className="metric-label">Completed</div>
        </div>

        <div className="metric-card metric-card--amber">
          <div className="metric-icon">⚡</div>
          <div className="metric-value metric-value--amber">
            {avgBurst || "—"}
            {avgBurst > 0 && (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontWeight: 400,
                }}
              >
                ms
              </span>
            )}
          </div>
          <div className="metric-label">Avg Burst</div>
        </div>

        <div className="metric-card metric-card--purple">
          <div className="metric-icon">🖥️</div>
          <div className="metric-value metric-value--purple">
            {activeCount}
            <span
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                fontWeight: 400,
              }}
            >
              {" "}
              / {config.numServers}
            </span>
          </div>
          <div className="metric-label">Active Servers</div>
        </div>
      </div>

      {/* Distribution bar */}
      {totalTasks > 0 && (
        <div className="dist-bar-container">
          <div className="dist-bar-label-row">
            <span
              className="control-label"
              style={{ color: "var(--text-secondary)" }}
            >
              Task Distribution
            </span>
            <span
              className="control-label"
              style={{ color: "var(--text-muted)" }}
            >
              {totalTasks} total
            </span>
          </div>
          <div className="dist-bar">
            {servers.map((s, i) => (
              <div
                key={s.id}
                className="dist-bar-segment"
                style={{
                  width: `${(s.tasksCompleted / totalTasks) * 100}%`,
                  background: SERVER_COLORS[i % SERVER_COLORS.length],
                }}
              />
            ))}
          </div>
          <div className="dist-legend">
            {servers.map((s, i) => (
              <div key={s.id} className="dist-legend-item">
                <div
                  className="dist-legend-dot"
                  style={{
                    background: SERVER_COLORS[i % SERVER_COLORS.length],
                  }}
                />
                {s.name} ({s.tasksCompleted})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
