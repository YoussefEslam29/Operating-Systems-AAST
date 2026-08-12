// ============================================================
// Cloud / Data Center Manager (Load Balancer) — PPTX Generator
// 10 Slides | Dark Techy Theme | Neon Accents
// Run: node generate_pptx.js
// ============================================================

const PptxGenJS = require("./node_modules/pptxgenjs");
const pptx = new PptxGenJS();

// ─── DESIGN TOKENS ────────────────────────────────────────
const C = {
  bg:        "0D1117",  // slide background (near-black)
  panel:     "161B22",  // card/panel background
  panelAlt:  "1C2333",  // alternate panel
  border:    "30363D",  // subtle border
  cyan:      "00D4FF",  // primary neon accent (dispatch/system)
  cyanDim:   "007A94",  // dimmed cyan
  amber:     "FFB800",  // processing accent
  emerald:   "39FF14",  // completion accent
  purple:    "BF5FFF",  // system/heading accent
  red:       "FF4757",  // warning / highlight
  white:     "F0F6FC",  // primary text
  gray:      "8B949E",  // secondary text
  grayDim:   "484F58",  // muted text
  yellow:    "F1C40F",  // Round Robin highlight
};

// Layout: 13.33" × 7.5" (widescreen 16:9)
pptx.layout = "LAYOUT_WIDE";
pptx.author  = "Youssef Eslam";
pptx.subject = "Cloud Data Center Manager — Load Balancer Simulation";
pptx.title   = "Cloud / Data Center Manager: Load Balancer Simulation";

// ─── HELPERS ────────────────────────────────────────────────

function addBg(slide) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: "100%",
    fill: { color: C.bg },
    line: { color: C.bg },
  });
}

function addHeader(slide, text, sub) {
  // Top accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.06,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
  slide.addText(text, {
    x: 0.5, y: 0.18, w: 12.33, h: 0.65,
    fontSize: 28, bold: true, color: C.white,
    fontFace: "Segoe UI",
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.5, y: 0.82, w: 12.33, h: 0.32,
      fontSize: 13, color: C.cyan,
      fontFace: "Segoe UI",
    });
  }
  // Divider
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 1.1, w: 12.33, h: 0,
    line: { color: C.border, width: 1 },
  });
}

function addPanel(slide, x, y, w, h, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: color || C.panel },
    line: { color: C.border, width: 1 },
    rectRadius: 0.1,
  });
}

function addCodeBlock(slide, x, y, w, h, lines) {
  addPanel(slide, x, y, w, h, "0D1117");
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.28,
    fill: { color: "1C2333" },
    line: { color: C.border, width: 1 },
    rectRadius: 0,
  });
  slide.addText("pseudocode", {
    x: x + 0.12, y: y + 0.04, w: 2, h: 0.2,
    fontSize: 9, color: C.gray, fontFace: "Consolas",
  });
  lines.forEach((line, i) => {
    const parts = Array.isArray(line) ? line : [{ text: line, options: {} }];
    slide.addText(parts, {
      x: x + 0.18, y: y + 0.33 + i * 0.285, w: w - 0.3, h: 0.27,
      fontSize: 11, fontFace: "Consolas",
    });
  });
}

function pill(slide, x, y, label, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 1.55, h: 0.3,
    fill: { color: color || C.cyanDim },
    line: { color: color || C.cyan, width: 1 },
    rectRadius: 0.15,
  });
  slide.addText(label, {
    x, y, w: 1.55, h: 0.3,
    fontSize: 9, bold: true, color: C.white,
    align: "center", fontFace: "Segoe UI",
  });
}

// ─── SLIDE 1 — TITLE ─────────────────────────────────────────────────────────
(function slide1() {
  const slide = pptx.addSlide();
  addBg(slide);

  // Glow block
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 0.5, w: 12.5, h: 6.5,
    fill: { color: "0A1628" },
    line: { color: C.cyan, width: 2 },
    rectRadius: 0.2,
  });

  // Top badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.2, y: 0.8, w: 2.9, h: 0.35,
    fill: { color: C.cyanDim },
    line: { color: C.cyan, width: 1 },
    rectRadius: 0.15,
  });
  slide.addText("OPERATING SYSTEMS PROJECT", {
    x: 5.2, y: 0.8, w: 2.9, h: 0.35,
    fontSize: 9, bold: true, color: C.white, align: "center", fontFace: "Segoe UI",
  });

  // Main title
  slide.addText("Cloud / Data Center Manager", {
    x: 0.8, y: 1.3, w: 11.7, h: 1.1,
    fontSize: 44, bold: true, color: C.white, align: "center", fontFace: "Segoe UI",
  });
  slide.addText("Load Balancer Simulation", {
    x: 0.8, y: 2.35, w: 11.7, h: 0.75,
    fontSize: 34, bold: false, color: C.cyan, align: "center", fontFace: "Segoe UI",
  });

  // Divider
  slide.addShape(pptx.ShapeType.line, {
    x: 2.5, y: 3.2, w: 8.3, h: 0,
    line: { color: C.border, width: 1 },
  });

  // 4 concept pills
  const concepts = [
    ["CPU SCHEDULING",  C.purple],
    ["MULTITHREADING",  C.amber],
    ["LOAD BALANCING",  C.emerald],
    ["GEO-IP ROUTING",  C.cyan],
  ];
  const startX = 1.3;
  concepts.forEach(([label, color], i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: startX + i * 2.7, y: 3.4, w: 2.4, h: 0.38,
      fill: { color: C.panel },
      line: { color: color, width: 2 },
      rectRadius: 0.15,
    });
    slide.addText(label, {
      x: startX + i * 2.7, y: 3.4, w: 2.4, h: 0.38,
      fontSize: 10, bold: true, color: color, align: "center", fontFace: "Segoe UI",
    });
  });

  // Author
  slide.addText("Youssef Eslam  |  Operating Systems  —  Summer 3", {
    x: 0.8, y: 4.1, w: 11.7, h: 0.35,
    fontSize: 13, color: C.gray, align: "center", fontFace: "Segoe UI",
  });

  // Bottom neon line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 6.85, w: 12.5, h: 0.06,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
})();

// ─── SLIDE 2 — PROJECT OVERVIEW ───────────────────────────────────────────────
(function slide2() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Project Overview", "4 Core Concepts — How They Connect");

  // Pipeline arrow-boxes
  const boxes = [
    { label: "Client IP\nRequest",     icon: "🌐", color: C.cyan,   x: 0.4  },
    { label: "Geo-IP\nLocator",        icon: "📍", color: C.purple, x: 3.1  },
    { label: "Load\nBalancer",         icon: "⚖️",  color: C.amber,  x: 5.8  },
    { label: "Server\nThread (VM)",    icon: "🖥️",  color: C.emerald,x: 8.5  },
  ];

  boxes.forEach((b, i) => {
    addPanel(slide, b.x, 1.35, 2.4, 1.6, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: b.x, y: 1.35, w: 2.4, h: 0.06,
      fill: { color: b.color }, line: { color: b.color },
    });
    slide.addText(b.icon, {
      x: b.x, y: 1.55, w: 2.4, h: 0.5,
      fontSize: 28, align: "center",
    });
    slide.addText(b.label, {
      x: b.x + 0.1, y: 2.1, w: 2.2, h: 0.7,
      fontSize: 12, bold: true, color: C.white, align: "center", fontFace: "Segoe UI",
    });
    // Arrow between boxes
    if (i < boxes.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: b.x + 2.4, y: 2.15, w: 0.7, h: 0,
        line: { color: C.cyan, width: 2, endArrowType: "arrow" },
      });
    }
  });

  // 4 bullet summary cards
  const bullets = [
    { color: C.purple,  title: "CPU Scheduling",    body: "Round Robin quantum — each task gets a turn on a server, cycling fairly across all VMs." },
    { color: C.amber,   title: "Multithreading",    body: "Each Virtual Machine (Server) runs as its own thread. Tasks run concurrently in parallel." },
    { color: C.cyan,    title: "Load Balancing",    body: "LoadBalancer.dispatch() assigns incoming tasks to servers using a Round Robin index rotation." },
    { color: C.emerald, title: "IP Geolocation API",body: "GeoLocator.lookup(ip) calls ip-api.com and tags each task with its real-world city + country." },
  ];

  bullets.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 6.5;
    const y = 3.25 + row * 1.6;
    addPanel(slide, x, y, 6.15, 1.4, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 1.4,
      fill: { color: b.color }, line: { color: b.color },
    });
    slide.addText(b.title, {
      x: x + 0.18, y: y + 0.12, w: 5.7, h: 0.32,
      fontSize: 13, bold: true, color: b.color, fontFace: "Segoe UI",
    });
    slide.addText(b.body, {
      x: x + 0.18, y: y + 0.48, w: 5.7, h: 0.8,
      fontSize: 11, color: C.gray, fontFace: "Segoe UI", wrap: true,
    });
  });
})();

// ─── SLIDE 3 — ROUND ROBIN CONCEPT ────────────────────────────────────────────
(function slide3() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Round Robin CPU Scheduling", "Fair time-slot rotation — each task gets a turn before any task gets a second turn");

  // Concept box
  addPanel(slide, 0.4, 1.25, 5.7, 1.05, C.panel);
  slide.addText("⚙️  Core Idea", {
    x: 0.6, y: 1.32, w: 5.3, h: 0.3,
    fontSize: 12, bold: true, color: C.yellow, fontFace: "Segoe UI",
  });
  slide.addText("The CPU (or Load Balancer) keeps a queue of tasks. It picks the next one, gives it a fixed time slot (quantum), then moves to the next — wrapping back to the start. No task monopolizes the resource.", {
    x: 0.6, y: 1.63, w: 5.3, h: 0.6,
    fontSize: 10.5, color: C.gray, fontFace: "Segoe UI", wrap: true,
  });

  // ── Timeline rows (Task → Server slots) ──
  const tasks = [
    { name: "Task-1", burst: 1900, color: C.cyan   },
    { name: "Task-2", burst: 711,  color: C.amber  },
    { name: "Task-3", burst: 538,  color: C.purple },
  ];

  const servers = ["Server-1", "Server-2", "Server-3"];
  const colW = 1.9;
  const startX = 6.4;
  const startY = 1.3;

  // Server column headers
  servers.forEach((s, i) => {
    addPanel(slide, startX + i * colW, startY, colW - 0.08, 0.38, C.panelAlt);
    slide.addText(s, {
      x: startX + i * colW, y: startY, w: colW - 0.08, h: 0.38,
      fontSize: 11, bold: true, color: C.white, align: "center", fontFace: "Segoe UI",
    });
  });

  // Round Robin dispatch rows
  const rounds = [
    // [server index, task index]
    [0, 0], [1, 1], [2, 2],  // Round 1 — dispatch
    [0, 0],                   // Round 2 — Task-1 still long
  ];

  const rowLabels = ["Dispatch →", "Round 2 →", "Round 3 →"];
  const dispatchMap = [
    // row 0: Task-1→S1, Task-2→S2, Task-3→S3
    [0, 1, 2],
    // row 1: only Task-1 still long, S2+S3 idle
    [0, -1, -1],
    // row 2: all done
    [-1, -1, -1],
  ];

  dispatchMap.forEach((row, ri) => {
    const rowY = startY + 0.48 + ri * 1.1;
    slide.addText(rowLabels[ri] || "", {
      x: startX - 1.5, y: rowY + 0.35, w: 1.4, h: 0.35,
      fontSize: 10, color: C.gray, align: "right", fontFace: "Segoe UI",
    });
    row.forEach((taskIdx, si) => {
      const boxX = startX + si * colW;
      const boxY = rowY + 0.1;
      if (taskIdx >= 0) {
        const t = tasks[taskIdx];
        addPanel(slide, boxX, boxY, colW - 0.08, 0.85, C.panel);
        slide.addShape(pptx.ShapeType.rect, {
          x: boxX, y: boxY, w: colW - 0.08, h: 0.06,
          fill: { color: t.color }, line: { color: t.color },
        });
        slide.addText(t.name, {
          x: boxX, y: boxY + 0.1, w: colW - 0.08, h: 0.3,
          fontSize: 11, bold: true, color: t.color, align: "center", fontFace: "Segoe UI",
        });
        slide.addText(`${t.burst} ms`, {
          x: boxX, y: boxY + 0.44, w: colW - 0.08, h: 0.28,
          fontSize: 10, color: C.gray, align: "center", fontFace: "Consolas",
        });
      } else {
        // Idle
        addPanel(slide, boxX, boxY, colW - 0.08, 0.85, "111820");
        slide.addText("IDLE", {
          x: boxX, y: boxY + 0.3, w: colW - 0.08, h: 0.28,
          fontSize: 10, color: C.grayDim, align: "center", fontFace: "Segoe UI",
        });
      }
    });
  });

  // Actual result from run
  slide.addText("✅  Actual run result:  Task-1 → S1 (1900ms)  |  Task-2 → S2 (711ms)  |  Task-3 → S3 (538ms)", {
    x: 0.4, y: 6.9, w: 12.5, h: 0.35,
    fontSize: 10, color: C.emerald, fontFace: "Consolas",
  });
})();

// ─── SLIDE 4 — ROUND ROBIN PSEUDOCODE ─────────────────────────────────────────
(function slide4() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Round Robin — Pseudocode", "Matching the actual LoadBalancer.dispatch() logic in the Java code");

  const kw = (t) => ({ text: t, options: { color: C.purple, bold: true } });
  const fn = (t) => ({ text: t, options: { color: C.cyan } });
  const cm = (t) => ({ text: t, options: { color: C.grayDim } });
  const nm = (t) => ({ text: t, options: { color: C.amber } });
  const tx = (t) => ({ text: t, options: { color: C.white } });
  const str= (t) => ({ text: t, options: { color: C.emerald } });

  const lines = [
    [cm("// State: integer index, starts at 0"), ],
    [kw("GLOBAL "), tx("nextIndex ← 0")],
    [tx("")],
    [kw("FUNCTION "), fn("dispatch"), tx("(task, servers[]):") ],
    [tx("    index  ← nextIndex")],
    [tx("    server ← servers[index]")],
    [tx("    nextIndex ← (nextIndex + "), nm("1"), tx(") mod len(servers)") ],
    [cm("    // ↑ wraps back to 0 after last server")],
    [tx("    PRINT "), str('"[LoadBalancer] Dispatching "'), tx(" + task + "), str('" → "'), tx(" + server")],
    [fn("    server.assignTask"), tx("(task)")],
    [kw("END FUNCTION")],
    [tx("")],
    [cm("// Thread-safe in Java:  AtomicInteger.getAndUpdate(i → (i+1) % servers.size())")],
  ];

  addCodeBlock(slide, 0.5, 1.25, 8.2, 5.35, lines);

  // Side annotations
  const notes = [
    { y: 2.0,  color: C.gray,    text: "state is shared\nacross all calls" },
    { y: 2.9,  color: C.cyan,    text: "current server\nchosen" },
    { y: 3.2,  color: C.yellow,  text: "advance pointer\n& wrap around" },
    { y: 4.3,  color: C.emerald, text: "hand task to\nserver queue" },
  ];

  notes.forEach(n => {
    addPanel(slide, 9.0, n.y, 4.1, 0.65, C.panel);
    slide.addShape(pptx.ShapeType.line, {
      x: 8.7, y: n.y + 0.32, w: 0.3, h: 0,
      line: { color: n.color, width: 1, endArrowType: "arrow" },
    });
    slide.addText(n.text, {
      x: 9.1, y: n.y + 0.08, w: 3.8, h: 0.5,
      fontSize: 10, color: n.color, fontFace: "Segoe UI", wrap: true,
    });
  });

  // Key insight box
  addPanel(slide, 9.0, 5.5, 4.1, 1.75, C.panelAlt);
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.0, y: 5.5, w: 0.06, h: 1.75,
    fill: { color: C.yellow }, line: { color: C.yellow },
  });
  slide.addText("Key Property", {
    x: 9.18, y: 5.58, w: 3.8, h: 0.3,
    fontSize: 11, bold: true, color: C.yellow, fontFace: "Segoe UI",
  });
  slide.addText("O(1) dispatch — constant time regardless of how many servers or tasks exist. AtomicInteger makes it lock-free and thread-safe under high concurrency.", {
    x: 9.18, y: 5.9, w: 3.8, h: 1.2,
    fontSize: 10, color: C.gray, fontFace: "Segoe UI", wrap: true,
  });
})();

// ─── SLIDE 5 — LOAD BALANCING CONCEPT ─────────────────────────────────────────
(function slide5() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Load Balancing", "Distributing incoming tasks fairly across all available Virtual Machine servers");

  // Central LB node
  addPanel(slide, 5.4, 2.1, 2.5, 1.2, "091520");
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.4, y: 2.1, w: 2.5, h: 0.06,
    fill: { color: C.amber }, line: { color: C.amber },
  });
  slide.addText("⚖️", { x: 5.4, y: 2.2, w: 2.5, h: 0.5, fontSize: 26, align: "center" });
  slide.addText("LOAD BALANCER", {
    x: 5.4, y: 2.74, w: 2.5, h: 0.3,
    fontSize: 10, bold: true, color: C.amber, align: "center", fontFace: "Segoe UI",
  });

  // Task coming in from left
  addPanel(slide, 0.5, 2.45, 2.0, 0.7, C.panel);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 2.45, w: 0.06, h: 0.7,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
  slide.addText("📦 New Task", {
    x: 0.58, y: 2.52, w: 1.85, h: 0.3,
    fontSize: 11, bold: true, color: C.cyan, fontFace: "Segoe UI",
  });
  slide.addText("burst: 983ms\nfrom: Egypt", {
    x: 0.58, y: 2.82, w: 1.85, h: 0.28,
    fontSize: 9, color: C.gray, fontFace: "Consolas",
  });
  // Arrow left → LB
  slide.addShape(pptx.ShapeType.line, {
    x: 2.5, y: 2.8, w: 2.9, h: 0,
    line: { color: C.cyan, width: 2, endArrowType: "arrow" },
  });

  // 3 server nodes to the right
  const servers = [
    { name: "Server-1", tasks: 4, busy: 5446, color: C.cyan,   y: 1.5,  load: 60 },
    { name: "Server-2", tasks: 3, busy: 3024, color: C.amber,  y: 3.05, load: 35 },
    { name: "Server-3", tasks: 3, busy: 2957, color: C.emerald,y: 4.6,  load: 34 },
  ];

  servers.forEach((s, i) => {
    const sx = 10.0, sy = s.y;
    addPanel(slide, sx, sy, 3.0, 1.2, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: sx, y: sy, w: 3.0, h: 0.06,
      fill: { color: s.color }, line: { color: s.color },
    });
    slide.addText(`🖥️  ${s.name}`, {
      x: sx + 0.1, y: sy + 0.1, w: 2.8, h: 0.3,
      fontSize: 11, bold: true, color: s.color, fontFace: "Segoe UI",
    });
    slide.addText(`${s.tasks} tasks  |  busy: ${s.busy}ms`, {
      x: sx + 0.1, y: sy + 0.44, w: 2.8, h: 0.25,
      fontSize: 9.5, color: C.gray, fontFace: "Consolas",
    });
    // Load bar
    slide.addShape(pptx.ShapeType.rect, {
      x: sx + 0.1, y: sy + 0.75, w: 2.8, h: 0.18,
      fill: { color: C.grayDim }, line: { color: C.border },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: sx + 0.1, y: sy + 0.75, w: 2.8 * (s.load / 100), h: 0.18,
      fill: { color: s.color }, line: { color: s.color },
    });
    slide.addText(`${s.load}%`, {
      x: sx + 2.5, y: sy + 0.74, w: 0.5, h: 0.22,
      fontSize: 9, color: s.color, fontFace: "Consolas",
    });

    // Arrow LB → Server
    slide.addShape(pptx.ShapeType.line, {
      x: 7.9, y: sy + 0.6, w: 2.1, h: 0,
      line: { color: s.color, width: 1.5, endArrowType: "arrow" },
    });
  });

  // Round Robin label
  slide.addText("Round Robin →", {
    x: 7.9, y: 3.45, w: 2.0, h: 0.32,
    fontSize: 11, bold: true, color: C.yellow,
    align: "center", fontFace: "Segoe UI",
  });

  // Summary
  slide.addText("Real results: Server-1 → 4 tasks (5446ms total)  |  Server-2 → 3 tasks (3024ms)  |  Server-3 → 3 tasks (2957ms)", {
    x: 0.4, y: 6.9, w: 12.9, h: 0.35,
    fontSize: 10, color: C.emerald, fontFace: "Consolas",
  });
})();

// ─── SLIDE 6 — LOAD BALANCING PSEUDOCODE ──────────────────────────────────────
(function slide6() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Load Balancing — Pseudocode", "Full pipeline: task creation → geo-lookup → dispatch → server assignment");

  const kw = (t) => ({ text: t, options: { color: C.purple, bold: true } });
  const fn = (t) => ({ text: t, options: { color: C.cyan } });
  const cm = (t) => ({ text: t, options: { color: C.grayDim } });
  const nm = (t) => ({ text: t, options: { color: C.amber } });
  const tx = (t) => ({ text: t, options: { color: C.white } });
  const str= (t) => ({ text: t, options: { color: C.emerald } });

  const lines = [
    [cm("// TaskGenerator thread — produces tasks every 200-800ms")],
    [kw("FOR "), tx("i ← 1 "), kw("TO "), nm("numTasks"), tx(":") ],
    [tx("    burstTime ← random("), nm("500"), tx(", "), nm("2000"), tx(")")],
    [tx("    task      ← "), kw("new"), tx(" Task(burstTime)")],
    [tx("    ip        ← randomSample(SAMPLE_IPS)")],
    [tx("    location  ← "), fn("GeoLocator.lookup"), tx("(ip)"), cm("   // HTTP GET → ip-api.com")],
    [tx("    task.origin ← location")],
    [fn("    loadBalancer.dispatch"), tx("(task)")],
    [tx("    "), kw("SLEEP"), tx(" random("), nm("200"), tx(", "), nm("800"), tx(")")],
    [cm("")],
    [cm("// Server thread — consumes tasks from its BlockingQueue")],
    [kw("LOOP WHILE "), tx("running:") ],
    [tx("    task ← "), fn("taskQueue.take"), tx("()"), cm("      // blocks until a task arrives")],
    [tx("    PRINT "), str('"[Server-N] processing "'), tx(" + task")],
    [kw("    SLEEP"), tx("(task.burstTime)"), cm("   // simulate CPU work")],
    [tx("    tasksCompleted ← tasksCompleted + "), nm("1")],
    [tx("    totalBusyTime  ← totalBusyTime  + task.burstTime")],
  ];

  addCodeBlock(slide, 0.4, 1.25, 8.3, 5.95, lines);

  // Side notes
  const notes = [
    { y: 1.6,  color: C.amber,   text: "Producer thread:\ngenerates bursts" },
    { y: 2.6,  color: C.purple,  text: "Real HTTP call\nto ip-api.com" },
    { y: 3.25, color: C.cyan,    text: "Round Robin\ndispatch" },
    { y: 4.5,  color: C.emerald, text: "Consumer thread:\nBlocking queue" },
    { y: 5.9,  color: C.yellow,  text: "Thread.sleep\nsimulates work" },
  ];

  notes.forEach(n => {
    addPanel(slide, 9.0, n.y, 4.1, 0.6, C.panel);
    slide.addShape(pptx.ShapeType.line, {
      x: 8.7, y: n.y + 0.3, w: 0.3, h: 0,
      line: { color: n.color, width: 1, endArrowType: "arrow" },
    });
    slide.addText(n.text, {
      x: 9.1, y: n.y + 0.08, w: 3.8, h: 0.45,
      fontSize: 10, color: n.color, fontFace: "Segoe UI", wrap: true,
    });
  });
})();

// ─── SLIDE 7 — MULTITHREADING ─────────────────────────────────────────────────
(function slide7() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Multithreading Implementation", "Each VM Server = an independent Java Thread running concurrently");

  // Thread model diagram
  const threads = [
    { name: "TaskGenerator\nThread",       color: C.amber,  icon: "⚙️",  tasks: ["Task-1 (1900ms)", "Task-4 (1862ms)", "Task-7 (542ms)", "Task-10 (1142ms)"] },
    { name: "Server-1\nThread",            color: C.cyan,   icon: "🖥️",  tasks: ["Task-1 (1900ms)", "Task-4 (1862ms)", "Task-7 (542ms)", "Task-10 (1142ms)"] },
    { name: "Server-2\nThread",            color: C.purple, icon: "🖥️",  tasks: ["Task-2 (711ms)", "Task-5 (983ms)", "Task-8 (1330ms)"] },
    { name: "Server-3\nThread",            color: C.emerald,icon: "🖥️",  tasks: ["Task-3 (538ms)", "Task-6 (1378ms)", "Task-9 (1041ms)"] },
  ];

  const timelineW = 9.0;
  const startX    = 3.8;
  const startY    = 1.3;
  const rowH      = 1.15;
  const totalMs   = 8000; // ms represented in the timeline

  threads.forEach((t, ti) => {
    const rowY = startY + ti * rowH;

    // Thread label
    addPanel(slide, 0.3, rowY, 3.3, rowH - 0.1, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y: rowY, w: 0.06, h: rowH - 0.1,
      fill: { color: t.color }, line: { color: t.color },
    });
    slide.addText(t.icon, {
      x: 0.38, y: rowY + 0.08, w: 0.5, h: 0.5,
      fontSize: 20, align: "center",
    });
    slide.addText(t.name, {
      x: 0.92, y: rowY + 0.12, w: 2.55, h: 0.5,
      fontSize: 11, bold: true, color: t.color, fontFace: "Segoe UI",
    });
    slide.addText("Java Thread", {
      x: 0.92, y: rowY + 0.62, w: 2.55, h: 0.28,
      fontSize: 9, color: C.gray, fontFace: "Consolas",
    });

    // Timeline background
    slide.addShape(pptx.ShapeType.rect, {
      x: startX, y: rowY + 0.12, w: timelineW, h: rowH - 0.32,
      fill: { color: "0A1220" }, line: { color: C.border, width: 1 },
    });

    // Task blocks on timeline
    if (ti === 0) {
      // TaskGenerator — just label
      slide.addText("generates tasks every 200–800ms", {
        x: startX + 0.1, y: rowY + 0.3, w: timelineW - 0.2, h: 0.4,
        fontSize: 10, color: C.amber, fontFace: "Consolas", italic: true,
      });
    } else {
      let curMs = 0;
      t.tasks.forEach((task, i) => {
        const ms = parseInt(task.match(/\d+/)[0]);
        const blockX = startX + (curMs / totalMs) * timelineW;
        const blockW = Math.max((ms / totalMs) * timelineW, 0.4);
        // Map neon color to a darker fill shade (pptxgenjs only supports 6-digit hex)
        const darkFill = { [C.cyan]: "003D4D", [C.purple]: "2D0066", [C.emerald]: "0D3D00" }[t.color] || "1A2233";
        slide.addShape(pptx.ShapeType.roundRect, {
          x: blockX, y: rowY + 0.14, w: blockW, h: rowH - 0.36,
          fill: { color: darkFill },
          line: { color: t.color, width: 1.5 },
          rectRadius: 0.04,
        });
        if (blockW > 0.7) {
          slide.addText(`T-${i + 1 + (ti === 1 ? 0 : ti === 2 ? 3 : 6) - 1}`, {
            x: blockX + 0.05, y: rowY + 0.22, w: blockW - 0.1, h: 0.3,
            fontSize: 8.5, color: t.color, align: "center", fontFace: "Consolas",
          });
        }
        curMs += ms;
      });
    }
  });

  // Time axis
  [0, 2000, 4000, 6000, 8000].forEach(ms => {
    const x = startX + (ms / totalMs) * timelineW;
    slide.addShape(pptx.ShapeType.line, {
      x, y: startY + 4 * rowH - 0.05, w: 0, h: 0.2,
      line: { color: C.border, width: 1 },
    });
    slide.addText(`${ms}ms`, {
      x: x - 0.25, y: startY + 4 * rowH + 0.15, w: 0.6, h: 0.25,
      fontSize: 8, color: C.gray, align: "center", fontFace: "Consolas",
    });
  });

  // Key properties
  addPanel(slide, 0.3, 6.35, 12.7, 0.85, C.panelAlt);
  const props = [
    { icon: "🔒", text: "BlockingQueue — thread-safe task handoff; server blocks until a task arrives" },
    { icon: "⚡", text: "volatile boolean running — safe cross-thread shutdown signal" },
    { icon: "🔗", text: "Thread.join() — main thread waits for all servers to finish before printing summary" },
  ];
  props.forEach((p, i) => {
    slide.addText(`${p.icon} ${p.text}`, {
      x: 0.5 + i * 4.3, y: 6.42, w: 4.15, h: 0.7,
      fontSize: 9.5, color: C.gray, fontFace: "Segoe UI", wrap: true,
    });
  });
})();

// ─── SLIDE 8 — IP GEOLOCATION API ────────────────────────────────────────────
(function slide8() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "IP Geolocation API Integration", "Real HTTP calls to ip-api.com — tagging each task with its geographic origin");

  // Flow: IP → API → JSON → Location → Task
  const steps = [
    { x: 0.35, label: "Client\nIP Address",       icon: "🌐", color: C.cyan,    sub: "e.g. 196.219.0.1"  },
    { x: 2.85, label: "HTTP GET\nip-api.com",      icon: "🔗", color: C.purple,  sub: "3 sec timeout"     },
    { x: 5.35, label: "JSON\nResponse",            icon: "📄", color: C.amber,   sub: '{"city":…}'        },
    { x: 7.85, label: "Parsed\nLocation",          icon: "📍", color: C.emerald, sub: "6th of Oct, Egypt" },
    { x: 10.35, label: "Task\ntagged",             icon: "📦", color: C.cyan,    sub: "task.origin = …"   },
  ];

  steps.forEach((s, i) => {
    addPanel(slide, s.x, 1.3, 2.3, 1.5, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: s.x, y: 1.3, w: 2.3, h: 0.06,
      fill: { color: s.color }, line: { color: s.color },
    });
    slide.addText(s.icon, { x: s.x, y: 1.46, w: 2.3, h: 0.5, fontSize: 24, align: "center" });
    slide.addText(s.label, {
      x: s.x + 0.05, y: 1.98, w: 2.2, h: 0.45,
      fontSize: 11, bold: true, color: s.color, align: "center", fontFace: "Segoe UI",
    });
    slide.addText(s.sub, {
      x: s.x + 0.05, y: 2.44, w: 2.2, h: 0.32,
      fontSize: 9, color: C.gray, align: "center", fontFace: "Consolas",
    });
    if (i < steps.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: s.x + 2.3, y: 2.05, w: 0.55, h: 0,
        line: { color: s.color, width: 1.5, endArrowType: "arrow" },
      });
    }
  });

  // Sample IPs table
  addPanel(slide, 0.35, 3.1, 12.6, 0.38, C.panelAlt);
  slide.addText("Sample IP Pool used in simulation:", {
    x: 0.5, y: 3.14, w: 3.5, h: 0.28, fontSize: 11, bold: true, color: C.white, fontFace: "Segoe UI",
  });

  const ips = [
    { ip: "8.8.8.8",        loc: "Ashburn, US",             flag: "🇺🇸" },
    { ip: "1.1.1.1",        loc: "Ashburn, US",             flag: "🇺🇸" },
    { ip: "41.34.0.1",      loc: "6th of Oct City, Egypt",  flag: "🇪🇬" },
    { ip: "196.219.0.1",    loc: "6th of Oct City, Egypt",  flag: "🇪🇬" },
    { ip: "185.60.216.35",  loc: "Dublin, Ireland",         flag: "🇮🇪" },
    { ip: "not-a-real-ip",  loc: "Unknown location",        flag: "❓" },
  ];

  ips.forEach((ip, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 4.2;
    const y = 3.6 + row * 1.35;
    addPanel(slide, x, y, 4.0, 1.2, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 1.2,
      fill: { color: C.cyanDim }, line: { color: C.cyanDim },
    });
    slide.addText(`${ip.flag}  ${ip.ip}`, {
      x: x + 0.14, y: y + 0.1, w: 3.8, h: 0.32,
      fontSize: 11, bold: true, color: C.white, fontFace: "Consolas",
    });
    slide.addText(`→  ${ip.loc}`, {
      x: x + 0.14, y: y + 0.46, w: 3.8, h: 0.28,
      fontSize: 10, color: C.emerald, fontFace: "Segoe UI",
    });
    slide.addText(ip.loc === "Unknown location" ? "Fallback: invalid IP → graceful default" : "Live lookup via ip-api.com (free, no key)", {
      x: x + 0.14, y: y + 0.78, w: 3.8, h: 0.28,
      fontSize: 8.5, color: C.gray, fontFace: "Segoe UI",
    });
  });
})();

// ─── SLIDE 9 — PUTTING IT ALL TOGETHER (Hero) ─────────────────────────────────
(function slide9() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "Putting It All Together", "Full pipeline — one real request traced end-to-end through the simulation");

  // Step boxes with numbered circles
  const steps = [
    { n: "1", title: "IP Arrives",          body: "TaskGenerator picks IP 196.219.0.1 (Egypt) and calls GeoLocator.lookup(ip)", color: C.cyan,    x: 0.3,  y: 1.3  },
    { n: "2", title: "Geo-IP Lookup",       body: "HTTP GET to ip-api.com returns {city:\"6th of October City\", country:\"Egypt\"}", color: C.purple, x: 3.45, y: 1.3  },
    { n: "3", title: "Task Created",        body: "new Task(983ms) — id=5, burst=983ms, origin=\"6th of October City, Egypt\"", color: C.amber,  x: 6.6,  y: 1.3  },
    { n: "4", title: "Dispatch (RR)",       body: "LoadBalancer.dispatch() → nextIndex=1 → Server-2 assigned. nextIndex becomes 2.", color: C.yellow, x: 9.75, y: 1.3  },
    { n: "5", title: "Queue → Server",      body: "Server-2.taskQueue.add(task) — Server-2 thread wakes from .take() and starts processing", color: C.emerald,x: 0.3, y: 4.05 },
    { n: "6", title: "Thread Processes",    body: "Thread.sleep(983ms) — simulates CPU burst. tasksCompleted++, totalBusyTime+=983", color: C.cyan,   x: 3.45, y: 4.05 },
    { n: "7", title: "Task Complete",       body: "\"[Server-2] finished Task-5 (burst=983ms, from 6th of October City, Egypt)\"", color: C.purple, x: 6.6,  y: 4.05 },
    { n: "8", title: "Summary Stats",       body: "After all tasks: printSummary() prints per-server task count, avg burst, total busy time", color: C.amber,  x: 9.75, y: 4.05 },
  ];

  steps.forEach((s) => {
    addPanel(slide, s.x, s.y, 3.0, 2.45, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: s.x, y: s.y, w: 3.0, h: 0.06,
      fill: { color: s.color }, line: { color: s.color },
    });
    // Number badge
    slide.addShape(pptx.ShapeType.ellipse, {
      x: s.x + 0.08, y: s.y + 0.12, w: 0.38, h: 0.38,
      fill: { color: s.color }, line: { color: s.color },
    });
    slide.addText(s.n, {
      x: s.x + 0.08, y: s.y + 0.12, w: 0.38, h: 0.38,
      fontSize: 12, bold: true, color: C.bg, align: "center", fontFace: "Segoe UI",
    });
    slide.addText(s.title, {
      x: s.x + 0.54, y: s.y + 0.16, w: 2.4, h: 0.3,
      fontSize: 11, bold: true, color: s.color, fontFace: "Segoe UI",
    });
    slide.addText(s.body, {
      x: s.x + 0.1, y: s.y + 0.58, w: 2.82, h: 1.8,
      fontSize: 9.5, color: C.gray, fontFace: "Segoe UI", wrap: true,
    });
  });

  // Arrows between steps 1-4 (top row)
  [0, 1, 2].forEach(i => {
    slide.addShape(pptx.ShapeType.line, {
      x: 3.3 + i * 3.15, y: 2.5, w: 0.15, h: 0,
      line: { color: C.cyan, width: 1.5, endArrowType: "arrow" },
    });
  });
  // Down arrow from step 4 to step 8
  slide.addShape(pptx.ShapeType.line, {
    x: 11.25, y: 3.75, w: 0, h: 0.3,
    line: { color: C.amber, width: 1.5, endArrowType: "arrow" },
  });
  // Arrows between steps 5-8 (bottom row) — reversed
  [0, 1, 2].forEach(i => {
    slide.addShape(pptx.ShapeType.line, {
      x: 9.6 - i * 3.15, y: 5.27, w: -0.15, h: 0,
      line: { color: C.emerald, width: 1.5, endArrowType: "arrow" },
    });
  });
})();

// ─── SLIDE 10 — ARCHITECTURE + KEY TAKEAWAYS ──────────────────────────────────
(function slide10() {
  const slide = pptx.addSlide();
  addBg(slide);
  addHeader(slide, "System Architecture & Key Takeaways", "Class relationships + the 4 core concepts to remember");

  // Architecture diagram — class boxes
  const classes = [
    { name: "CloudLoadBalancer", role: "main()\nEntry point", color: C.white,   x: 5.5, y: 1.3, w: 2.9 },
    { name: "TaskGenerator",     role: "Runnable\nProduces Tasks", color: C.amber,  x: 0.3, y: 3.0, w: 2.9 },
    { name: "LoadBalancer",      role: "Round Robin\ndispatch(task)", color: C.yellow, x: 5.5, y: 3.0, w: 2.9 },
    { name: "GeoLocator",        role: "lookup(ip)\nHTTP API call", color: C.purple, x: 0.3, y: 4.7, w: 2.9 },
    { name: "Task",              role: "id, burst,\narrival, origin", color: C.cyan,  x: 3.4, y: 4.7, w: 2.9 },
    { name: "Server",            role: "Runnable\nBlockingQueue", color: C.emerald,x: 8.7, y: 3.0, w: 2.9 },
  ];

  classes.forEach(c => {
    addPanel(slide, c.x, c.y, c.w, 1.3, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: c.x, y: c.y, w: c.w, h: 0.06,
      fill: { color: c.color }, line: { color: c.color },
    });
    slide.addText(c.name, {
      x: c.x + 0.08, y: c.y + 0.12, w: c.w - 0.16, h: 0.38,
      fontSize: 11, bold: true, color: c.color, fontFace: "Consolas",
    });
    slide.addText(c.role, {
      x: c.x + 0.08, y: c.y + 0.52, w: c.w - 0.16, h: 0.7,
      fontSize: 9.5, color: C.gray, fontFace: "Segoe UI",
    });
  });

  // Connector lines
  const connectors = [
    // main → TaskGenerator
    { x1: 5.5, y1: 2.0, x2: 3.2, y2: 3.0 },
    // main → LoadBalancer
    { x1: 6.95, y1: 2.6, x2: 6.95, y2: 3.0 },
    // main → Server (x3)
    { x1: 8.4, y1: 2.0, x2: 10.15, y2: 3.0 },
    // TaskGenerator → GeoLocator
    { x1: 1.75, y1: 4.3, x2: 1.75, y2: 4.7 },
    // TaskGenerator → LoadBalancer
    { x1: 3.2, y1: 3.65, x2: 5.5, y2: 3.65 },
    // LoadBalancer → Server
    { x1: 8.4, y1: 3.65, x2: 8.7, y2: 3.65 },
    // LoadBalancer → Task
    { x1: 6.95, y1: 4.3, x2: 4.85, y2: 4.7 },
  ];
  connectors.forEach(c => {
    slide.addShape(pptx.ShapeType.line, {
      x: Math.min(c.x1, c.x2), y: Math.min(c.y1, c.y2),
      w: Math.abs(c.x2 - c.x1) || 0.01,
      h: Math.abs(c.y2 - c.y1) || 0.01,
      line: { color: C.border, width: 1, endArrowType: "arrow" },
    });
  });

  // 4 Takeaways
  const takeaways = [
    { color: C.yellow,  icon: "🔁", text: "Round Robin guarantees fair, O(1) task dispatch using a rotating atomic index — no starvation." },
    { color: C.amber,   icon: "🧵", text: "Server Threads (VMs) run concurrently using BlockingQueue as a thread-safe producer-consumer channel." },
    { color: C.purple,  icon: "🌐", text: "GeoLocator makes real HTTP API calls to ip-api.com, tagging each task with its geographic origin." },
    { color: C.emerald, icon: "📊", text: "Thread.join() & volatile flags enable clean, coordinated shutdown and accurate final statistics." },
  ];

  takeaways.forEach((t, i) => {
    const x = 11.8;
    const y = 1.3 + i * 1.45;
    addPanel(slide, x, y, 1.3, 5.5, C.panel); // will be overridden per row
    // Just add individual rows
    addPanel(slide, 11.8, y, 1.28, 1.3, C.panel);
    slide.addShape(pptx.ShapeType.rect, {
      x: 11.8, y, w: 1.28, h: 0.06,
      fill: { color: t.color }, line: { color: t.color },
    });
    slide.addText(t.icon, {
      x: 11.8, y: y + 0.1, w: 1.28, h: 0.5,
      fontSize: 22, align: "center",
    });
    slide.addText(t.text, {
      x: 11.8, y: y + 0.62, w: 1.28, h: 0.62,
      fontSize: 7.5, color: C.gray, fontFace: "Segoe UI", wrap: true,
    });
  });
})();

// ─── GENERATE ────────────────────────────────────────────────
const outPath = "CloudLoadBalancer_Presentation.pptx";
pptx.writeFile({ fileName: outPath })
  .then(() => console.log(`\n✅  DONE! Saved: ${outPath}\n`))
  .catch(err => console.error("Error:", err));
