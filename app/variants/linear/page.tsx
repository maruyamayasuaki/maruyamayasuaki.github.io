"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

function MeshGradient() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(800px circle at 20% 10%, rgba(124,58,237,0.18), transparent 50%),
            radial-gradient(700px circle at 80% 5%, rgba(34,211,238,0.15), transparent 50%),
            radial-gradient(900px circle at 50% 100%, rgba(236,72,153,0.12), transparent 50%),
            #050608
          `,
        }}
      />
      <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.15]" aria-hidden>
        <defs>
          <pattern id="lineargrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fademask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#lineargrid)" mask="url(#fademask)" />
      </svg>
    </>
  );
}

function NavBar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[min(900px,calc(100%-2rem))]"
    >
      <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-2 flex items-center justify-between">
        <Link href="/variants" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">YM</span>
          <span className="text-sm font-semibold text-white">maruyama</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">v.F</span>
        </Link>
        <div className="hidden md:flex items-center gap-5 text-xs text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#research" className="hover:text-white transition-colors">Research</a>
          <a href="#projects" className="hover:text-white transition-colors">Work</a>
          <a href="#pricing" className="hover:text-white transition-colors">Hire</a>
        </div>
        <a
          href="mailto:yasuuuuu0898@gmail.com"
          className="text-xs px-3 py-1 rounded-full bg-white text-black font-semibold hover:bg-slate-100 transition-colors"
        >
          Get in touch →
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <MeshGradient />
      <motion.div style={{ y, opacity }} className="relative text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Available for research collaboration</span>
          <span className="text-cyan-300">→</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.02]"
        >
          Bridging matter
          <br />
          and{" "}
          <span className="bg-gradient-to-br from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            machine intelligence
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-slate-400 text-lg mt-6 max-w-xl mx-auto leading-relaxed"
        >
          {t.hero.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-9 flex gap-3 justify-center flex-wrap"
        >
          <a href="#features" className="group px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] transition-transform">
            See what I build
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#research" className="px-5 py-2.5 rounded-full border border-white/15 text-white text-sm hover:bg-white/5 transition-colors">
            View publications
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex items-center gap-6 justify-center text-[10px] tracking-widest uppercase text-slate-500"
        >
          <span>Trusted output for</span>
          <span className="text-slate-300">FinTech</span>
          <span className="w-px h-3 bg-slate-700" />
          <span className="text-slate-300">Manufacturing</span>
          <span className="w-px h-3 bg-slate-700" />
          <span className="text-slate-300">HealthTech</span>
          <span className="w-px h-3 bg-slate-700" />
          <span className="text-slate-300">Materials Science</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-[10px] tracking-widest uppercase">
        scroll ↓
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, delay = 0 }: { icon: string; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden hover:border-white/25 transition-colors"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-white font-semibold text-base">{title}</h3>
        <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Built for the cross-domain stack.
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            研究の数値解析、産業 AI、Web プロダクト。一つの頭で扱える。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard icon="🧪" title="First-principles + ML" desc="DFT (VASP) と能動学習を組み合わせた高効率な物性探索。" />
          <FeatureCard icon="🔐" title="Secure Local LLM" delay={0.1} desc="閉域網に閉じた金融機関向け LLM を 0 → 1 で構築。" />
          <FeatureCard icon="📈" title="Industrial AI" delay={0.2} desc="製造業センサーデータからの異常検知・最適化を本番投入。" />
          <FeatureCard icon="🩺" title="RAG for Health" delay={0.3} desc="医療ナレッジを正確に引く RAG アシスタントを設計。" />
          <FeatureCard icon="⚡" title="Full-stack delivery" delay={0.4} desc="Rails / Next.js / Android まで実装可能。研究からプロダクトまで。" />
          <FeatureCard icon="✍️" title="Tech writing" delay={0.5} desc="Qiita 等で並列処理・LLM・拡張機能まで幅広く執筆。" />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: researchData.papers.length + "+", label: "Papers published" },
    { value: researchData.conferences.length + "", label: "Conference talks" },
    { value: t.exp.items.length, label: "Industrial deployments" },
    { value: stackData.flatMap((s) => s.items).length + "+", label: "Tools & languages" },
  ];
  return (
    <section className="relative py-20 px-6 border-y border-white/5 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
              {s.value}
            </div>
            <div className="text-xs text-slate-400 mt-2 uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-3">Research</p>
          <h2 className="text-4xl font-bold text-white">Peer-reviewed work</h2>
        </motion.div>
        <div className="space-y-3">
          {researchData.papers.map((p, i) => {
            const title = "title" in p ? p.title : p.titleEn;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-colors"
              >
                <h3 className="text-white text-base font-semibold group-hover:text-cyan-200 transition-colors">{title}</h3>
                <p className="text-xs text-slate-400 mt-2" dangerouslySetInnerHTML={{ __html: p.authors }} />
                <p className="text-[11px] text-slate-500 italic mt-1">{p.journal} · {p.year}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-3">Selected work</p>
          <h2 className="text-4xl font-bold text-white">Industrial AI delivery.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.exp.items.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 hover:border-white/30 transition-colors"
            >
              <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">case · 0{i + 1}</div>
              <h3 className="text-white font-semibold mt-2">{e.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">{e.body}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {e.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-full max-w-3xl mx-auto opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 60%)" }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white tracking-tight"
        >
          Let&apos;s build something
          <br />
          <span className="bg-gradient-to-br from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            that compiles in the real world.
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex gap-3 justify-center flex-wrap"
        >
          <a href="mailto:yasuuuuu0898@gmail.com" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] transition-transform">
            Get in touch →
          </a>
          <a href="https://github.com/maruyamayasuaki" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/15 text-white hover:bg-white/5 transition-colors">
            View GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function LinearVariant() {
  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 overflow-x-hidden">
      <NavBar />
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <ResearchSection />
      <ProjectsSection />
      <CTA />
      <footer className="text-center py-10 text-xs text-slate-600 border-t border-white/5">
        © 2025 Yasuaki Maruyama · Variant H — Linear/Vercel · <Link href="/variants" className="hover:text-cyan-400">all variants</Link>
      </footer>
    </main>
  );
}
