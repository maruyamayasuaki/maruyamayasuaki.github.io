"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Tile({
  children,
  className = "",
  delay = 0,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur p-5 overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.18), transparent 40%)" }} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
  if (href) {
    return (
      <Link href={href} className="contents">
        {inner}
      </Link>
    );
  }
  return inner;
}

function HeroTile() {
  const now = useNow();
  return (
    <Tile className="md:col-span-3 md:row-span-2 min-h-[260px]">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-300/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          live · {now ? now.toISOString().slice(11, 19) : "--:--:--"} JST
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight leading-[1.05]">
          {t.hero.name}
        </h1>
        <p className="text-cyan-300 font-mono text-sm mt-2">{t.hero.kicker}</p>
        <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl leading-relaxed">{t.hero.lead}</p>
        <div
          aria-hidden
          className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "conic-gradient(from 0deg, #06b6d4, #a855f7, #ec4899, #06b6d4)" }}
        />
      </div>
    </Tile>
  );
}

function StatsTile() {
  const stats = [
    { label: "papers", value: researchData.papers.length },
    { label: "talks", value: researchData.conferences.length },
    { label: "awards", value: researchData.awards.length },
  ];
  return (
    <Tile delay={0.05} className="md:col-span-1">
      <div className="text-[11px] font-mono text-purple-300 mb-3">stats.json</div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl md:text-4xl font-bold text-white tabular-nums bg-gradient-to-br from-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </Tile>
  );
}

function StackTile() {
  const all = stackData.flatMap((s) => s.items);
  return (
    <Tile delay={0.1} className="md:col-span-2 md:row-span-2">
      <div className="text-[11px] font-mono text-purple-300 mb-3">stack.flat()</div>
      <div className="flex flex-wrap gap-1.5">
        {all.map((it, i) => (
          <motion.span
            key={it}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.018, duration: 0.3 }}
            className="px-2.5 py-1 rounded-md text-xs font-mono border border-cyan-500/20 bg-cyan-500/5 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            {it}
          </motion.span>
        ))}
      </div>
    </Tile>
  );
}

function ResearchTile() {
  const top = researchData.papers[0];
  const title = "title" in top ? top.title : top.titleEn;
  return (
    <Tile delay={0.15} className="md:col-span-2">
      <div className="text-[11px] font-mono text-purple-300 mb-2">latest_paper.bib</div>
      <h3 className="text-white font-semibold text-base leading-snug">{title}</h3>
      <p className="text-xs text-slate-400 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: top.authors }} />
      <p className="text-[10px] text-slate-500 italic mt-1">{top.journal} · {top.year}</p>
    </Tile>
  );
}

function ExperienceTile() {
  return (
    <Tile delay={0.2} className="md:col-span-2 md:row-span-2">
      <div className="text-[11px] font-mono text-purple-300 mb-3">@athena_tech</div>
      <div className="space-y-3">
        {t.exp.items.map((e, i) => (
          <div key={e.title} className="border-l-2 border-cyan-500/40 pl-3 hover:border-cyan-400 transition-colors">
            <div className="text-[10px] font-mono text-cyan-300">case_{String(i + 1).padStart(2, "0")}</div>
            <div className="text-white text-sm font-semibold">{e.title}</div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{e.body}</p>
          </div>
        ))}
      </div>
    </Tile>
  );
}

function PingTile() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c + 1) % 60), 1000);
    return () => clearInterval(id);
  }, []);
  const bars = Array.from({ length: 24 }, (_, i) => (count + i) % 24);
  return (
    <Tile delay={0.25} className="md:col-span-1">
      <div className="text-[11px] font-mono text-purple-300 mb-3">activity</div>
      <div className="flex items-end gap-0.5 h-16">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/30 to-cyan-300"
            style={{ height: `${20 + b * 3}%`, transition: "height 0.6s ease" }}
          />
        ))}
      </div>
      <div className="text-[10px] text-slate-500 mt-2 font-mono">commits.live</div>
    </Tile>
  );
}

function ProjectsTile() {
  return (
    <Tile delay={0.3} className="md:col-span-2">
      <div className="text-[11px] font-mono text-purple-300 mb-2">~/projects</div>
      <div className="grid grid-cols-2 gap-2">
        {t.projects.items.slice(0, 4).map((p) => (
          <a
            key={p.title}
            href={p.link?.url ?? "#"}
            target={p.link ? "_blank" : undefined}
            rel="noreferrer"
            className="block p-2 rounded-md border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.03] transition-colors"
          >
            <div className="text-white text-xs font-semibold truncate">{p.title}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{p.tags.slice(0, 2).join(" · ")}</div>
          </a>
        ))}
      </div>
    </Tile>
  );
}

function ContactTile() {
  return (
    <Tile delay={0.35} className="md:col-span-1">
      <div className="text-[11px] font-mono text-purple-300 mb-3">curl -s</div>
      <div className="space-y-2 text-xs">
        <a href="https://github.com/maruyamayasuaki" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:text-cyan-200">→ github</a>
        <a href="https://qiita.com/yasu_qita" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:text-cyan-200">→ qiita</a>
        <a href="mailto:yasuuuuu0898@gmail.com" className="block text-cyan-300 hover:text-cyan-200">→ email</a>
      </div>
    </Tile>
  );
}

function GradientBg() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#06070d]">
      <div className="absolute -top-1/3 -left-1/3 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
           style={{ background: "radial-gradient(circle, #7c3aed, transparent 60%)" }} />
      <div className="absolute -bottom-1/3 -right-1/3 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl"
           style={{ background: "radial-gradient(circle, #06b6d4, transparent 60%)" }} />
    </div>
  );
}

export default function BentoVariant() {
  // Track mouse for radial spotlight on hover
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el?.closest) return;
      const tile = el.closest<HTMLElement>(".group");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      tile.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="min-h-screen text-slate-200 px-4 md:px-8 pt-16 pb-12">
      <GradientBg />
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <p className="text-xs font-mono text-cyan-300/80">/ variants / bento</p>
          <Link href="/variants" className="text-xs font-mono text-slate-400 hover:text-cyan-300">← all variants</Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:auto-rows-[120px]">
          <HeroTile />
          <StatsTile />
          <StackTile />
          <ResearchTile />
          <ExperienceTile />
          <PingTile />
          <ProjectsTile />
          <ContactTile />
        </div>

        <footer className="mt-12 text-xs text-slate-500 text-center">
          Bento · Variant F · {t.hero.name}
        </footer>
      </div>
    </main>
  );
}
