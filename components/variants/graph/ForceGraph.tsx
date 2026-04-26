"use client";

import { useEffect, useRef, useState } from "react";

export type GraphNode = {
  id: string;
  label: string;
  group: "core" | "research" | "ml" | "web" | "project" | "tag";
  href?: string;
  description?: string;
  size?: number;
};

export type GraphEdge = { source: string; target: string };

type Sim = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
  r: number;
};

const COLORS: Record<GraphNode["group"], { fill: string; ring: string }> = {
  core: { fill: "#fbbf24", ring: "rgba(251,191,36,0.4)" },
  research: { fill: "#a855f7", ring: "rgba(168,85,247,0.4)" },
  ml: { fill: "#22d3ee", ring: "rgba(34,211,238,0.4)" },
  web: { fill: "#34d399", ring: "rgba(52,211,153,0.4)" },
  project: { fill: "#f472b6", ring: "rgba(244,114,182,0.4)" },
  tag: { fill: "#94a3b8", ring: "rgba(148,163,184,0.3)" },
};

export default function ForceGraph({ nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 560 });
  const [hover, setHover] = useState<GraphNode | null>(null);
  const simRef = useRef<Sim[]>([]);
  const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [, force] = useState(0); // tick re-render

  useEffect(() => {
    function onResize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ w: rect.width, h: Math.max(420, Math.min(720, rect.width * 0.7)) });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Initialize sim once
  useEffect(() => {
    simRef.current = nodes.map((n, i) => ({
      ...n,
      x: size.w / 2 + Math.cos((i / nodes.length) * Math.PI * 2) * Math.min(size.w, size.h) * 0.3,
      y: size.h / 2 + Math.sin((i / nodes.length) * Math.PI * 2) * Math.min(size.w, size.h) * 0.3,
      vx: 0,
      vy: 0,
      r: n.size ?? (n.group === "core" ? 22 : n.group === "research" || n.group === "ml" ? 14 : 10),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, size.w, size.h]);

  // Physics loop
  useEffect(() => {
    let raf = 0;
    let alpha = 1;

    function tick() {
      const sim = simRef.current;
      if (sim.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const cx = size.w / 2;
      const cy = size.h / 2;

      // repulsion
      for (let i = 0; i < sim.length; i++) {
        for (let j = i + 1; j < sim.length; j++) {
          const a = sim[i];
          const b = sim[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist2 = Math.max(dx * dx + dy * dy, 1);
          const f = 1800 / dist2;
          const dist = Math.sqrt(dist2);
          const ux = dx / dist;
          const uy = dy / dist;
          a.vx -= ux * f;
          a.vy -= uy * f;
          b.vx += ux * f;
          b.vy += uy * f;
        }
      }

      // springs
      for (const e of edges) {
        const a = sim.find((n) => n.id === e.source);
        const b = sim.find((n) => n.id === e.target);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const target = a.group === "core" || b.group === "core" ? 110 : 90;
        const k = 0.04;
        const f = (dist - target) * k;
        const ux = dx / dist;
        const uy = dy / dist;
        a.vx += ux * f;
        a.vy += uy * f;
        b.vx -= ux * f;
        b.vy -= uy * f;
      }

      // center pull
      for (const n of sim) {
        n.vx += (cx - n.x) * 0.005;
        n.vy += (cy - n.y) * 0.005;
      }

      // integrate
      for (const n of sim) {
        if (n.fx != null && n.fy != null) {
          n.x = n.fx;
          n.y = n.fy;
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
        n.x = Math.max(n.r + 4, Math.min(size.w - n.r - 4, n.x));
        n.y = Math.max(n.r + 4, Math.min(size.h - n.r - 4, n.y));
      }

      alpha = Math.max(alpha * 0.9985, 0.15);
      force((x) => x + 1);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [edges, size.w, size.h]);

  function clientToSvg(e: React.PointerEvent): { x: number; y: number } | null {
    const svg = containerRef.current?.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * size.w,
      y: ((e.clientY - rect.top) / rect.height) * size.h,
    };
  }

  function onPointerDownNode(e: React.PointerEvent, id: string) {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    const pt = clientToSvg(e);
    if (!pt) return;
    const n = simRef.current.find((x) => x.id === id);
    if (!n) return;
    n.fx = n.x;
    n.fy = n.y;
    draggingRef.current = { id, offsetX: pt.x - n.x, offsetY: pt.y - n.y };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const pt = clientToSvg(e);
    if (!pt) return;
    const n = simRef.current.find((x) => x.id === draggingRef.current!.id);
    if (!n) return;
    n.fx = pt.x - draggingRef.current.offsetX;
    n.fy = pt.y - draggingRef.current.offsetY;
  }
  function onPointerUp() {
    if (!draggingRef.current) return;
    const n = simRef.current.find((x) => x.id === draggingRef.current!.id);
    if (n) {
      n.fx = undefined;
      n.fy = undefined;
    }
    draggingRef.current = null;
  }

  const sim = simRef.current;

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        width="100%"
        height={size.h}
        className="block touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <rect width={size.w} height={size.h} fill="url(#bg-glow)" />

        {edges.map((e, i) => {
          const a = sim.find((n) => n.id === e.source);
          const b = sim.find((n) => n.id === e.target);
          if (!a || !b) return null;
          const isHover = hover && (hover.id === e.source || hover.id === e.target);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isHover ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.12)"}
              strokeWidth={isHover ? 1.8 : 1}
            />
          );
        })}

        {sim.map((n) => {
          const c = COLORS[n.group];
          const isHover = hover?.id === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onPointerDown={(e) => onPointerDownNode(e, n.id)}
              onPointerEnter={() => setHover(n)}
              onPointerLeave={() => setHover((h) => (h?.id === n.id ? null : h))}
              style={{ cursor: "grab" }}
            >
              <circle
                r={n.r + (isHover ? 4 : 2)}
                fill={c.ring}
                opacity={isHover ? 0.9 : 0.4}
              />
              <circle
                r={n.r}
                fill={c.fill}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={1}
              />
              <text
                y={n.r + 14}
                textAnchor="middle"
                className="fill-slate-200"
                fontSize={n.group === "core" ? 13 : 11}
                fontWeight={n.group === "core" ? 700 : 500}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hover && (
        <div className="absolute top-3 left-3 max-w-sm rounded-lg bg-black/80 backdrop-blur border border-white/15 p-3 text-xs pointer-events-none">
          <div className="text-cyan-300 font-mono uppercase tracking-wider text-[10px]">{hover.group}</div>
          <div className="text-white font-semibold mt-0.5">{hover.label}</div>
          {hover.description && <p className="text-slate-400 mt-1 leading-relaxed">{hover.description}</p>}
          {hover.href && (
            <p className="text-cyan-400 mt-1 text-[10px] truncate">→ {hover.href}</p>
          )}
        </div>
      )}

      <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono pointer-events-none">
        ↞ drag any node
      </div>
    </div>
  );
}
