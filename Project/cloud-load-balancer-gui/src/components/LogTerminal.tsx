"use client";

import React, { useEffect, useRef } from "react";
import { LogEntry } from "@/lib/types";

interface LogTerminalProps {
  logs: LogEntry[];
}

export default function LogTerminal({ logs }: LogTerminalProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div className="terminal" id="log-terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot terminal-dot--red" />
          <div className="terminal-dot terminal-dot--yellow" />
          <div className="terminal-dot terminal-dot--green" />
        </div>
        <span className="terminal-title">
          simulation.log — {logs.length} entries
        </span>
        <span
          style={{ fontSize: 10, color: "var(--text-muted)" }}
        >
          auto-scroll
        </span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {logs.map((log) => (
          <div key={log.id} className="log-line">
            <span className="log-time">{log.timestamp}</span>
            <span className={`log-msg--${log.type}`}>{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
            Waiting for simulation…
          </div>
        )}
      </div>
    </div>
  );
}
