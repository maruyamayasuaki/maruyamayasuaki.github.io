"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { translations, researchData, stackData } from "@/lib/i18n";
import BayesOpt1D from "@/components/variants/mi-lab/BayesOpt1D";

// Three.js scene must be client-only — disable SSR for compatibility with
// `output: "export"` static generation.
const Lattice3D = dynamic(() => import("@/components/variants/mi-lab/Lattice3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs font-mono">
      loading lattice…
    </div>
  ),
});

const t = translations.ja;

export default function MILabVariant() {
  return (
    <main className="min-h-screen bg-[#040711] text-slate-200">
      {/* Hero with 3D lattice */}
      <section className="relative h-[88vh] min-h-[640px] overflow-hidden">
        <Lattice3D />

        {/* Vignette + gradient overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(4,7,17,0.85) 80%), linear-gradient(180deg, rgba(4,7,17,0.4), transparent 40%, rgba(4,7,17,0.95))",
          }}
        />

        {/* Lab-notebook overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
          <div className="max-w-5xl mx-auto w-full px-6 pb-16 pointer-events-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-3 font-mono">
              experiment_log_042 · PbTiO₃ · perovskite ABO₃
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
              {t.hero.name}
            </h1>
            <p className="text-cyan-300 text-lg font-mono mb-3">{t.hero.kicker}</p>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              {t.hero.lead}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#research"
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-shadow"
              >
                Open lab notebook ↓
              </a>
              <a
                href="https://github.com/maruyamayasuaki"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-md border border-white/20 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
            <p className="mt-5 text-[11px] text-slate-500 font-mono">
              ▣ drag to rotate · scroll to zoom · A: Pb · B: Ti · O: oxygen octahedron
            </p>
          </div>
        </div>

        {/* Top legend */}
        <div className="absolute top-20 right-6 text-xs font-mono space-y-1 bg-black/40 backdrop-blur p-3 rounded-md border border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-slate-300">A-site (Pb²⁺)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300">B-site (Ti⁴⁺)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-slate-300">O²⁻</span>
          </div>
        </div>
      </section>

      {/* Section: research highlights */}
      <section id="research" className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono">
              §1 · Method
            </p>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">能動学習で六次元ひずみ空間を探索</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              第一原理計算 (DFT) は高精度ですが、評価コストが大きく
              全探索は不可能です。Gaussian Process と Expected Improvement
              による Bayesian Active Learning で「次に計算すべき点」を選び、
              強誘電体 PbTiO₃ のひずみ最適化を加速しています。
            </p>
            <ul className="mt-4 text-xs text-slate-300 font-mono space-y-1.5">
              <li>· DFT (VASP) × high-throughput pipeline</li>
              <li>· 6-D strain ε ∈ ℝ⁶ search space</li>
              <li>· GP-EI / GP-UCB 比較</li>
              <li>· 数百点で convergence 確認</li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <BayesOpt1D />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-20 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono mb-2">
            §2 · Industrial AI · Athena Technologies
          </p>
          <h2 className="text-3xl font-bold text-white mb-8">研究で培った最適化思考を産業 AI に</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.exp.items.map((e, i) => (
              <article
                key={e.title}
                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-colors"
              >
                <p className="text-[10px] font-mono text-cyan-300">case_{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-white font-semibold mt-1">{e.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{e.body}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {e.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono mb-2">
            §3 · Publications & Conferences
          </p>
          <h2 className="text-3xl font-bold text-white mb-8">Peer-reviewed output</h2>

          <div className="space-y-3">
            {researchData.papers.map((p, i) => {
              const title = "title" in p ? p.title : p.titleEn;
              return (
                <div
                  key={i}
                  className="p-4 rounded-md border-l-2 border-purple-400/60 bg-white/[0.02]"
                >
                  <h3 className="text-white text-sm font-semibold">{title}</h3>
                  <p
                    className="text-xs text-slate-400 mt-1"
                    dangerouslySetInnerHTML={{ __html: p.authors }}
                  />
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    {p.journal} · {p.year}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="text-sm font-mono text-cyan-300 mt-10 mb-3">
            §3.1 · Conferences
          </h3>
          <ul className="space-y-2 text-xs">
            {researchData.conferences.map((c, i) => {
              const title = "title" in c ? c.title : c.titleJa;
              return (
                <li key={i} className="text-slate-400 leading-relaxed">
                  <span className="text-cyan-300 font-mono">[{c.type}]</span>{" "}
                  <span className="text-slate-200">{title}</span>
                  {c.award && <span className="ml-1 inline-block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">★ Best</span>}
                  <br />
                  <span className="text-slate-500">{c.venue} · {c.date}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Stack */}
      <section className="px-6 py-20 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono mb-2">
            §4 · Toolchain
          </p>
          <h2 className="text-3xl font-bold text-white mb-8">研究 → 実装、両側を実装する</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stackData.map((s) => (
              <div key={s.category} className="p-4 rounded-lg border border-white/10 bg-black/20">
                <p className="text-xs font-mono text-cyan-300 mb-2">{s.category}</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  {s.items.map((it) => (
                    <li key={it}>· {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-xs text-slate-500 border-t border-white/5">
        <p>
          © 2025 Yasuaki Maruyama · Variant E · Built with Next.js + react-three-fiber
        </p>
        <p className="mt-1">
          <Link href="/" className="hover:text-cyan-400">/</Link>
          <span className="text-slate-700"> · </span>
          <Link href="/variants" className="hover:text-cyan-400">/variants</Link>
        </p>
      </footer>
    </main>
  );
}
