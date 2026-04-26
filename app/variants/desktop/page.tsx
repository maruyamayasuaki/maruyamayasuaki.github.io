"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

type WindowKey = "about" | "research" | "experience" | "projects" | "stack" | "terminal";

type WindowDef = {
  key: WindowKey;
  title: string;
  icon: string;
  iconBg: string;
  initial: { x: number; y: number; w: number; h: number };
};

const WINDOWS: WindowDef[] = [
  { key: "about", title: "About.app", icon: "🪪", iconBg: "from-cyan-400 to-purple-500", initial: { x: 60, y: 60, w: 380, h: 320 } },
  { key: "research", title: "Research.app", icon: "🔬", iconBg: "from-purple-400 to-pink-500", initial: { x: 280, y: 130, w: 480, h: 360 } },
  { key: "experience", title: "Experience.app", icon: "💼", iconBg: "from-amber-400 to-red-500", initial: { x: 160, y: 220, w: 460, h: 320 } },
  { key: "projects", title: "Projects.app", icon: "📦", iconBg: "from-emerald-400 to-cyan-500", initial: { x: 380, y: 80, w: 420, h: 320 } },
  { key: "stack", title: "Stack.app", icon: "🛠", iconBg: "from-slate-300 to-slate-500", initial: { x: 100, y: 320, w: 380, h: 280 } },
  { key: "terminal", title: "Terminal — yasuaki@kyoto-u", icon: "⌘", iconBg: "from-slate-700 to-black", initial: { x: 460, y: 280, w: 480, h: 280 } },
];

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function MenuBar() {
  const now = useNow();
  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center px-3 text-xs text-white z-50 font-medium">
      <span className="text-cyan-300">  Maruyama</span>
      <span className="mx-3">File</span>
      <span className="mr-3">Edit</span>
      <span className="mr-3">View</span>
      <span className="mr-3">Window</span>
      <span className="mr-3">Help</span>
      <div className="ml-auto flex items-center gap-3 text-[11px]">
        <span>🔋 100%</span>
        <span>📶</span>
        <span>🔍</span>
        <span className="font-mono">
          {now ? now.toLocaleString("ja-JP", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
        </span>
      </div>
    </div>
  );
}

function WindowChrome({ title, onClose, onMinimize, children }: { title: string; onClose: () => void; onMinimize: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1d1f24]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col h-full">
      <div className="flex items-center px-3 py-2 bg-gradient-to-b from-[#3a3d44] to-[#2a2d33] cursor-grab active:cursor-grabbing select-none">
        <div className="flex gap-1.5">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400" aria-label="close" />
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-amber-400 hover:bg-amber-300" aria-label="minimize" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <span className="flex-1 text-center text-xs text-slate-200 font-medium pr-12">{title}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-sm">{children}</div>
    </div>
  );
}

function AboutBody() {
  return (
    <div className="space-y-3 text-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl">🪪</div>
        <div>
          <h2 className="text-white font-bold">{t.hero.name}</h2>
          <p className="text-cyan-300 text-xs font-mono">{t.hero.kicker}</p>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{t.hero.lead}</p>
      <div className="text-[11px] text-slate-400 font-mono space-y-1 pt-2 border-t border-white/10">
        <p>📍 Kyoto, Japan</p>
        <p>🎓 Kyoto University · Eng. (D1)</p>
        <p>💼 Athena Technologies · ML Engineer</p>
      </div>
    </div>
  );
}

function ResearchBody() {
  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold flex items-center gap-2 mb-2">
        <span>🔬</span> Publications & Talks
      </h2>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Papers</p>
        {researchData.papers.map((p, i) => {
          const title = "title" in p ? p.title : p.titleEn;
          return (
            <div key={i} className="text-xs mb-2 border-l-2 border-purple-400/40 pl-2">
              <p className="text-white">{title}</p>
              <p className="text-slate-500 italic">{p.journal} · {p.year}</p>
            </div>
          );
        })}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 mt-3">Awards</p>
        {researchData.awards.map((a, i) => {
          const title = "title" in a ? a.title : a.titleJa;
          return (
            <div key={i} className="text-xs text-slate-300">
              ⭐ <b>{title}</b> <span className="text-slate-500">— {a.meta}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExperienceBody() {
  return (
    <div>
      <h2 className="text-white font-semibold flex items-center gap-2 mb-3">
        <span>💼</span> Athena Technologies
      </h2>
      <div className="space-y-3">
        {t.exp.items.map((e, i) => (
          <div key={e.title} className="text-xs">
            <p className="text-white font-semibold">[{i + 1}] {e.title}</p>
            <p className="text-slate-400 mt-1 leading-relaxed">{e.body}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {e.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px]">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsBody() {
  return (
    <div>
      <h2 className="text-white font-semibold flex items-center gap-2 mb-3"><span>📦</span> Side Projects</h2>
      <ul className="space-y-2">
        {t.projects.items.map((p) => (
          <li key={p.title} className="text-xs border border-white/5 rounded-md p-2 hover:border-cyan-500/40 transition-colors">
            <p className="text-white font-semibold flex items-center justify-between">
              {p.title}
              {p.link && <a href={p.link.url} target="_blank" rel="noreferrer" className="text-cyan-300 text-[10px] hover:underline">↗</a>}
            </p>
            <p className="text-slate-400 mt-0.5 leading-relaxed">{p.body}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">{p.tags.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackBody() {
  return (
    <div>
      <h2 className="text-white font-semibold flex items-center gap-2 mb-3"><span>🛠</span> Stack</h2>
      <div className="space-y-2">
        {stackData.map((s) => (
          <div key={s.category}>
            <p className="text-[10px] uppercase tracking-wider text-cyan-300 mb-1">{s.category}</p>
            <div className="flex flex-wrap gap-1">
              {s.items.map((it) => (
                <span key={it} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 text-xs font-mono">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalBody() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-black/60 -m-4 p-4 h-full font-mono text-xs text-emerald-300">
      <p><span className="text-amber-300">yasuaki@kyoto-u</span>:<span className="text-sky-400">~</span>$ uname -a</p>
      <p className="text-slate-200 ml-2 mb-2">Darwin yasuaki.local Kernel · ML × Materials × Web</p>
      <p><span className="text-amber-300">yasuaki@kyoto-u</span>:<span className="text-sky-400">~</span>$ ps aux | head</p>
      <p className="text-slate-300 ml-2">PID  CMD</p>
      <p className="text-slate-300 ml-2">001  research.dft (running)</p>
      <p className="text-slate-300 ml-2">002  athena-ml-engineer (running)</p>
      <p className="text-slate-300 ml-2">003  bass-clarinet.weekly</p>
      <p className="text-slate-300 ml-2 mb-2">004  marathon.runner</p>
      <p>
        <span className="text-amber-300">yasuaki@kyoto-u</span>:<span className="text-sky-400">~</span>$ {" "}
        <span className="inline-block w-2 h-3.5 align-middle bg-emerald-300" style={{ opacity: tick % 2 ? 1 : 0 }} />
      </p>
    </div>
  );
}

function Body({ k }: { k: WindowKey }) {
  switch (k) {
    case "about": return <AboutBody />;
    case "research": return <ResearchBody />;
    case "experience": return <ExperienceBody />;
    case "projects": return <ProjectsBody />;
    case "stack": return <StackBody />;
    case "terminal": return <TerminalBody />;
  }
}

function Dock({ openKeys, onOpen }: { openKeys: WindowKey[]; onOpen: (k: WindowKey) => void }) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-2 flex items-end gap-2">
        {WINDOWS.map((w) => (
          <button
            key={w.key}
            onClick={() => onOpen(w.key)}
            className="group relative flex flex-col items-center"
            title={w.title}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${w.iconBg} flex items-center justify-center text-2xl shadow-md group-hover:scale-125 group-hover:-translate-y-2 transition-transform origin-bottom`}>
              {w.icon}
            </div>
            {openKeys.includes(w.key) && (
              <div className="w-1 h-1 rounded-full bg-white mt-1" />
            )}
          </button>
        ))}
        <div className="w-px h-10 bg-white/15 mx-1" />
        <Link href="/variants" className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-xl shadow-md hover:scale-125 hover:-translate-y-2 transition-transform origin-bottom" title="Variants">
          ⌬
        </Link>
      </div>
    </div>
  );
}

export default function DesktopVariant() {
  const [open, setOpen] = useState<WindowKey[]>(["about", "research", "terminal"]);
  const [stack, setStack] = useState<WindowKey[]>(["about", "research", "terminal"]);
  const constraintsRef = useRef<HTMLDivElement>(null);

  function focus(k: WindowKey) {
    setStack((s) => [...s.filter((x) => x !== k), k]);
  }
  function openWindow(k: WindowKey) {
    setOpen((o) => (o.includes(k) ? o : [...o, k]));
    focus(k);
  }
  function closeWindow(k: WindowKey) {
    setOpen((o) => o.filter((x) => x !== k));
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden text-slate-200"
      style={{
        background:
          "radial-gradient(ellipse at top, #1e1b4b 0%, #0a0a12 50%, #000 100%)",
      }}
    >
      {/* Wallpaper aurora */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
      </div>

      <MenuBar />

      <div ref={constraintsRef} className="absolute inset-0 pt-7 pb-20 px-2">
        <AnimatePresence>
          {WINDOWS.filter((w) => open.includes(w.key)).map((w) => {
            const z = stack.indexOf(w.key) + 10;
            return (
              <motion.div
                key={w.key}
                drag
                dragMomentum={false}
                dragConstraints={constraintsRef}
                onMouseDown={() => focus(w.key)}
                initial={{ opacity: 0, scale: 0.92, x: w.initial.x, y: w.initial.y }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  width: w.initial.w,
                  height: w.initial.h,
                  zIndex: z,
                }}
                className="will-change-transform"
              >
                <WindowChrome title={w.title} onClose={() => closeWindow(w.key)} onMinimize={() => closeWindow(w.key)}>
                  <Body k={w.key} />
                </WindowChrome>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Mobile fallback */}
        <div className="md:hidden absolute inset-x-3 top-12 bottom-24 overflow-y-auto space-y-3">
          {WINDOWS.map((w) => (
            <div key={w.key} className="rounded-xl border border-white/10 bg-[#1d1f24]/95 backdrop-blur-xl">
              <div className="flex items-center px-3 py-2 bg-gradient-to-b from-[#3a3d44] to-[#2a2d33]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="flex-1 text-center text-xs text-slate-200">{w.title}</span>
              </div>
              <div className="p-4 text-sm"><Body k={w.key} /></div>
            </div>
          ))}
        </div>
      </div>

      <Dock openKeys={open} onOpen={openWindow} />

      <div className="hidden md:block absolute bottom-2 left-3 z-10 text-[10px] text-slate-500 font-mono">
        ↞ drag the windows · variant J · macOS
      </div>
    </main>
  );
}
