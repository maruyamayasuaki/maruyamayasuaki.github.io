"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { translations, researchData } from "@/lib/i18n";

const t = translations.ja;

const stats = [
  { key: "STR", label: "Strength · 物理 (DFT 計算耐久力)", value: 78, color: "from-red-500 to-orange-400" },
  { key: "INT", label: "Intelligence · 機械学習・数理", value: 92, color: "from-cyan-400 to-blue-500" },
  { key: "WIS", label: "Wisdom · 研究勘・論理思考", value: 86, color: "from-purple-400 to-fuchsia-500" },
  { key: "DEX", label: "Dexterity · プロダクト実装速度", value: 84, color: "from-emerald-400 to-teal-500" },
  { key: "CHA", label: "Charisma · 文章 + プレゼン", value: 73, color: "from-pink-400 to-rose-500" },
  { key: "LUK", label: "Luck · 巡り合わせ", value: 65, color: "from-amber-400 to-yellow-500" },
];

const achievements = [
  { icon: "🏆", title: "Best Presentation Award", desc: "KU Joint-Symposium 2025 で受賞", rarity: "legendary" as const, ts: "2025-11" },
  { icon: "📜", title: "BOOST 次世代 AI 奨学金", desc: "Kyoto University BOOST scholarship", rarity: "epic" as const, ts: "2024" },
  { icon: "🎓", title: "京都大学修士課程修了", desc: "工学研究科 機械理工学", rarity: "rare" as const, ts: "2024" },
  { icon: "📰", title: "Engineering Fracture Mechanics Paper", desc: "vol.331 に共著論文掲載", rarity: "epic" as const, ts: "2026" },
  { icon: "🏃", title: "下関海響マラソン 完走", desc: "42.195 km · sub-5h", rarity: "rare" as const, ts: "2025" },
  { icon: "💼", title: "Industrial AI 産業デプロイ", desc: "FinTech / Manufacturing / HealthTech 横断", rarity: "epic" as const, ts: "2024-25" },
  { icon: "🎵", title: "OBOG 吹奏楽団 加入", desc: "バスクラリネット continued from middle school", rarity: "common" as const, ts: "2020+" },
];

const skills = [
  { tree: "Materials Informatics", lv: 18, max: 20, perks: ["First-principles DFT", "Active Learning", "Bayesian Optimization", "Strain Engineering"] },
  { tree: "Machine Learning", lv: 16, max: 20, perks: ["PyTorch", "scikit-learn", "RAG", "LLM serving"] },
  { tree: "Web Development", lv: 14, max: 20, perks: ["TypeScript", "Next.js", "Rails", "PostgreSQL"] },
  { tree: "Research Communication", lv: 12, max: 20, perks: ["Peer review", "Tech writing", "Conference talks"] },
];

const rarityStyle: Record<"common" | "rare" | "epic" | "legendary", { ring: string; glow: string; label: string }> = {
  common: { ring: "border-slate-500/40", glow: "shadow-slate-500/10", label: "text-slate-400" },
  rare: { ring: "border-cyan-400/60", glow: "shadow-cyan-400/20", label: "text-cyan-300" },
  epic: { ring: "border-purple-400/60", glow: "shadow-purple-400/30", label: "text-purple-300" },
  legendary: { ring: "border-amber-400/80", glow: "shadow-amber-400/40", label: "text-amber-300" },
};

const quests = [
  { state: "completed", title: "Materials Informatics × Active Learning で学位論文", reward: "+ 1500 XP" },
  { state: "in-progress", title: "産業 AI 案件横展開 @ Athena Tech", reward: "+ 800 XP / case" },
  { state: "in-progress", title: "OSS とテックライティング継続", reward: "+ 200 XP / week" },
  { state: "available", title: "新規研究テーマ — 結晶構造最適化の自動化", reward: "+ ??? XP" },
];

function StatBar({ s, idx }: { s: (typeof stats)[number]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + idx * 0.07 }}
      className="font-mono"
    >
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-amber-300 font-bold">{s.key}</span>
        <span className="text-slate-200 tabular-nums">{s.value}/100</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-0.5">{s.label}</p>
      <div className="h-2 mt-1.5 rounded-full bg-black/40 border border-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${s.value}%` }}
          transition={{ delay: 0.4 + idx * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full bg-gradient-to-r ${s.color} relative`}
        >
          <span className="absolute inset-0 bg-white/30 mix-blend-overlay" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function HPBar() {
  const [hp, setHp] = useState(820);
  const max = 1000;
  useEffect(() => {
    const id = setInterval(() => setHp((h) => 800 + Math.round(Math.sin(Date.now() / 800) * 30 + 20)), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="font-mono">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-emerald-300 font-bold">HP</span>
        <span className="text-slate-200 tabular-nums">
          {hp}/{max}
        </span>
      </div>
      <div className="h-3 mt-1 rounded-full bg-black/40 border border-emerald-500/30 overflow-hidden">
        <motion.div
          animate={{ width: `${(hp / max) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 relative"
        >
          <span className="absolute inset-0 bg-white/30 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  );
}

function MPBar() {
  const [mp, setMp] = useState(680);
  const max = 700;
  useEffect(() => {
    const id = setInterval(() => setMp((m) => 660 + Math.round(Math.cos(Date.now() / 700) * 18 + 18)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="font-mono">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-cyan-300 font-bold">MP</span>
        <span className="text-slate-200 tabular-nums">
          {mp}/{max}
        </span>
      </div>
      <div className="h-3 mt-1 rounded-full bg-black/40 border border-cyan-500/30 overflow-hidden">
        <motion.div
          animate={{ width: `${(mp / max) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 relative"
        >
          <span className="absolute inset-0 bg-white/30 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  );
}

function ExpBar() {
  return (
    <div className="font-mono">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-amber-300 font-bold">EXP</span>
        <span className="text-slate-200 tabular-nums">23,847 / 30,000 → Lv. 28</span>
      </div>
      <div className="h-2 mt-1 rounded-full bg-black/40 border border-amber-500/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "79.5%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 relative"
        >
          <span className="absolute inset-0 bg-white/30 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  );
}

function SkillTree({ s, idx }: { s: (typeof skills)[number]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      className="rounded-lg border border-purple-500/20 bg-black/30 p-4 hover:border-purple-400/50 transition-colors"
    >
      <div className="flex items-baseline justify-between font-mono">
        <h3 className="text-purple-300 font-bold text-sm">{s.tree}</h3>
        <span className="text-xs text-amber-300 tabular-nums">Lv. {s.lv}/{s.max}</span>
      </div>
      <div className="flex gap-1 mt-2">
        {Array.from({ length: s.max }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-sm ${i < s.lv ? "bg-purple-400" : "bg-white/10"}`} />
        ))}
      </div>
      <ul className="mt-3 text-xs text-slate-300 space-y-0.5 font-mono">
        {s.perks.map((p) => (
          <li key={p}>★ {p}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function RpgVariant() {
  return (
    <main className="min-h-screen text-slate-200 relative" style={{
      background:
        "radial-gradient(ellipse at top, #1e1b4b 0%, #0a0612 50%, #000 100%)",
    }}>
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'8\\' height=\\'8\\'><rect width=\\'4\\' height=\\'4\\' fill=\\'rgba(255,255,255,0.04)\\'/></svg>')" }} />

      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-16 pb-14 font-mono">
        {/* Top bar */}
        <header className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>┃ PARTY · DUNGEON v.K</span>
          <Link href="/variants" className="hover:text-cyan-300">[ESC] all variants</Link>
        </header>

        {/* Character header */}
        <div className="rounded-xl border-2 border-amber-500/40 bg-gradient-to-br from-black/60 to-purple-950/40 p-6 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, #fbbf24, transparent 60%)" }} />
          <div className="relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-amber-300 via-purple-500 to-cyan-400 p-1 shadow-2xl shadow-amber-500/40"
            >
              <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-5xl">
                🧙‍♂️
              </div>
            </motion.div>
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{t.hero.name}</h1>
                <span className="text-amber-300 font-bold">Lv. 27</span>
              </div>
              <p className="text-purple-300 text-sm mt-1">Class: <span className="text-white">Researcher × ML Mage / Industrial AI Sage</span></p>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">{t.hero.lead}</p>
              <div className="space-y-2 mt-4">
                <HPBar />
                <MPBar />
                <ExpBar />
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-5">
            <h2 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
              <span>⚔</span> ATTRIBUTES
            </h2>
            <div className="space-y-4">
              {stats.map((s, i) => (
                <StatBar key={s.key} s={s} idx={i} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-black/40 p-5">
            <h2 className="text-purple-300 font-bold mb-4 flex items-center gap-2">
              <span>📜</span> SKILL TREES
            </h2>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <SkillTree key={s.tree} s={s} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mt-6 rounded-xl border border-amber-500/20 bg-black/40 p-5">
          <h2 className="text-amber-300 font-bold mb-4 flex items-center gap-2">
            <span>🏆</span> ACHIEVEMENTS UNLOCKED · {achievements.length}/∞
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((a, i) => {
              const r = rarityStyle[a.rarity];
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, rotate: -1 }}
                  className={`rounded-lg p-3 border-2 ${r.ring} bg-black/50 shadow-md ${r.glow} text-center cursor-pointer`}
                >
                  <div className="text-3xl mb-1">{a.icon}</div>
                  <div className="text-white text-xs font-bold leading-tight">{a.title}</div>
                  <div className={`text-[9px] uppercase tracking-wider ${r.label} mt-1`}>{a.rarity}</div>
                  <div className="text-[9px] text-slate-500 mt-1">{a.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Quest log */}
        <section className="mt-6 rounded-xl border border-emerald-500/20 bg-black/40 p-5">
          <h2 className="text-emerald-300 font-bold mb-4 flex items-center gap-2">
            <span>🗺</span> QUEST LOG
          </h2>
          <ul className="space-y-2 text-sm">
            {quests.map((q) => (
              <li key={q.title} className="flex items-baseline gap-3 border-b border-white/5 pb-2 last:border-0">
                <span className={`text-xs font-bold tabular-nums ${
                  q.state === "completed" ? "text-emerald-400" : q.state === "in-progress" ? "text-amber-400" : "text-slate-400"
                }`}>
                  [{q.state.toUpperCase()}]
                </span>
                <span className="text-slate-200 flex-1">{q.title}</span>
                <span className="text-purple-300 text-xs">{q.reward}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Inventory: papers */}
        <section className="mt-6 rounded-xl border border-pink-500/20 bg-black/40 p-5">
          <h2 className="text-pink-300 font-bold mb-4 flex items-center gap-2">
            <span>📦</span> INVENTORY · Papers & Talks
          </h2>
          <div className="space-y-2 text-xs">
            {researchData.papers.map((p, i) => {
              const title = "title" in p ? p.title : p.titleEn;
              return (
                <div key={i} className="rounded-md border border-white/10 bg-black/40 p-3 hover:border-pink-400/40 transition-colors">
                  <p className="text-amber-300 text-[10px]">📕 [Equipped]</p>
                  <p className="text-white">{title}</p>
                  <p className="text-slate-500 italic">{p.journal} · {p.year}</p>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-8 text-center text-[10px] text-slate-500">
          ▼ press [A] to continue · variant K · RPG character sheet
        </footer>
      </div>
    </main>
  );
}
