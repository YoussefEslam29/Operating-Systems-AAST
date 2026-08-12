"use client";

import React from "react";

interface HeaderProps {
  status: "idle" | "running" | "paused" | "complete";
  tick: number;
}

export default function Header({ status, tick }: HeaderProps) {
  const statusLabels: Record<string, string> = {
    idle: "Ready",
    running: "Running",
    paused: "Paused",
    complete: "Complete",
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-icon">⚡</div>
        <div>
          <div className="header-title">Cloud Load Balancer</div>
          <div className="header-subtitle">
            Interactive Simulation Dashboard
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className={`status-badge status-badge--${status}`}>
          <span className="status-dot" />
          {statusLabels[status]}
        </div>
        <div
          className="status-badge status-badge--idle"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}
        >
          TICK {tick}
        </div>
      </div>
    </header>
  );
}
