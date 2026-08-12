"use client";

import React from "react";
import { ServerState } from "@/lib/types";

interface ServerCardProps {
  server: ServerState;
}

export default function ServerCard({ server }: ServerCardProps) {
  const { status, currentTask, queue, tasksCompleted, totalBusyTime, avgBurst } =
    server;

  return (
    <div
      className={`panel server-card server-card--${status}`}
      id={`server-card-${server.id}`}
    >
      {/* Accent bar */}
      <div className={`server-accent server-accent--${status}`} />

      {/* Top row */}
      <div className="server-top">
        <div className="server-name">
          <span
            className={`server-status-dot server-status-dot--${status}`}
          />
          🖥️ {server.name}
        </div>
        <span
          className={`server-status-label server-status-label--${status}`}
        >
          {status}
        </span>
      </div>

      {/* Current task */}
      <div className="server-task">
        {currentTask ? (
          <div className="server-task-info">
            <div className="server-task-name">
              Task-{currentTask.id} ({currentTask.burstTime}ms)
            </div>
            <div className="server-task-origin">
              📍 {currentTask.origin}
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(currentTask.progress, 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="server-idle-label">
            Waiting for tasks…
          </div>
        )}
      </div>

      {/* Queue indicator */}
      {queue.length > 0 && (
        <div className="server-queue">
          <span className="queue-label">Queue ({queue.length})</span>
          <div className="queue-dots">
            {queue.slice(0, 6).map((t) => (
              <div key={t.id} className="queue-dot" title={`Task-${t.id}`} />
            ))}
            {queue.length > 6 && (
              <span style={{ color: "var(--text-muted)", fontSize: 10 }}>
                +{queue.length - 6}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="server-stats">
        <div className="server-stat">
          <div className="server-stat-value">{tasksCompleted}</div>
          <div className="server-stat-label">Tasks</div>
        </div>
        <div className="server-stat">
          <div className="server-stat-value">{avgBurst || "—"}</div>
          <div className="server-stat-label">Avg ms</div>
        </div>
        <div className="server-stat">
          <div className="server-stat-value">
            {totalBusyTime > 0
              ? `${(totalBusyTime / 1000).toFixed(1)}s`
              : "—"}
          </div>
          <div className="server-stat-label">Busy</div>
        </div>
      </div>
    </div>
  );
}
