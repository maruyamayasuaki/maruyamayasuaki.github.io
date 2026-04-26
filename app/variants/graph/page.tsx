"use client";

import Link from "next/link";
import ForceGraph, { type GraphNode, type GraphEdge } from "@/components/variants/graph/ForceGraph";

const nodes: GraphNode[] = [
  { id: "me", label: "Yasuaki Maruyama", group: "core", description: "Material Informatics × ML Engineer", size: 26 },

  // research
  { id: "dft", label: "First-principles DFT", group: "research", description: "VASP-based high-throughput density-functional theory" },
  { id: "active-learning", label: "Active Learning", group: "research", description: "Bayesian acquisition over expensive black-box functions" },
  { id: "strain", label: "Strain Engineering", group: "research", description: "Six-dimensional ε ∈ ℝ⁶ design space" },
  { id: "ferro", label: "Ferroelectrics (PbTiO₃)", group: "research", description: "Perovskite ABO₃ optimization target" },
  { id: "kyoto", label: "Kyoto University · D1", group: "research", description: "Graduate School of Engineering" },

  // ml
  { id: "athena", label: "Athena Technologies", group: "ml", description: "ML Engineer (2024-11–)", size: 18 },
  { id: "secure-llm", label: "Secure Local LLM", group: "ml", description: "FinTech, air-gapped deployment" },
  { id: "manuf", label: "Manufacturing AI", group: "ml", description: "Anomaly detection / process optimization" },
  { id: "med-rag", label: "Medical RAG", group: "ml", description: "HealthTech knowledge retrieval" },
  { id: "pytorch", label: "PyTorch", group: "tag" },
  { id: "rag", label: "RAG", group: "tag" },
  { id: "bayes", label: "Bayesian Opt", group: "tag" },

  // web / projects
  { id: "ts", label: "TypeScript", group: "tag" },
  { id: "py", label: "Python", group: "tag" },
  { id: "rb", label: "Ruby", group: "tag" },
  { id: "kt", label: "Kotlin", group: "tag" },
  { id: "next", label: "Next.js", group: "tag" },
  { id: "rails", label: "Rails", group: "tag" },

  { id: "local-discovery", label: "Local Discovery", group: "project", description: "飲食店共有 Web アプリ", href: "https://github.com/maruyamayasuaki/Local_Food_Discovery" },
  { id: "manimtube", label: "Manimtube", group: "project", description: "CS 解説動画プラットフォーム" },
  { id: "starbucks", label: "Starbucks Map App", group: "project", description: "Android 地図アプリ" },
  { id: "pomodoro", label: "Pomodoro Blocker", group: "project", description: "Chrome 拡張: 集中支援" },

  // beyond
  { id: "qiita", label: "Tech Writing (Qiita)", group: "web", description: "AI / 並列処理 / 拡張機能", href: "https://qiita.com/yasu_qita" },
  { id: "marathon", label: "Marathon (42.195 km)", group: "web" },
  { id: "bass", label: "Bass Clarinet", group: "web" },
];

const edges: GraphEdge[] = [
  // me → research cluster
  ["me", "kyoto"],
  ["me", "active-learning"],
  ["me", "dft"],
  ["kyoto", "dft"],
  ["kyoto", "active-learning"],
  ["active-learning", "bayes"],
  ["active-learning", "strain"],
  ["dft", "strain"],
  ["strain", "ferro"],
  ["dft", "ferro"],

  // me → industry cluster
  ["me", "athena"],
  ["athena", "secure-llm"],
  ["athena", "manuf"],
  ["athena", "med-rag"],
  ["secure-llm", "rag"],
  ["med-rag", "rag"],
  ["secure-llm", "py"],
  ["manuf", "py"],
  ["med-rag", "py"],
  ["py", "pytorch"],

  // ml & research overlap (shared techniques)
  ["bayes", "manuf"],
  ["active-learning", "manuf"],
  ["pytorch", "active-learning"],

  // me → projects cluster
  ["me", "local-discovery"],
  ["me", "manimtube"],
  ["me", "starbucks"],
  ["me", "pomodoro"],
  ["local-discovery", "rb"],
  ["local-discovery", "rails"],
  ["manimtube", "next"],
  ["manimtube", "py"],
  ["starbucks", "kt"],
  ["pomodoro", "ts"],
  ["next", "ts"],

  // me → beyond
  ["me", "qiita"],
  ["me", "marathon"],
  ["me", "bass"],
  ["qiita", "ts"],
].map(([source, target]) => ({ source, target }));

export default function GraphVariant() {
  return (
    <main className="min-h-screen bg-[#06070d] text-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-10">
        <header className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-mono">/ variants / graph</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">Knowledge Graph</h1>
            <p className="text-xs text-slate-400 mt-1">研究・産業 AI・プロダクト・タグ。すべての関心事を一枚の網にする。</p>
          </div>
          <Link href="/variants" className="text-xs text-slate-400 hover:text-cyan-300">← variants</Link>
        </header>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-300 mb-3">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /> core</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-400" /> research</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-cyan-400" /> industrial AI</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400" /> writing / life</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-400" /> side projects</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-400" /> tag / tool</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
          <ForceGraph nodes={nodes} edges={edges} />
        </div>

        <p className="mt-3 text-[11px] text-slate-500 font-mono text-center">
          {nodes.length} nodes · {edges.length} edges · physics-driven layout · drag to perturb
        </p>

        <footer className="mt-10 text-center text-xs text-slate-500">
          variant N · Knowledge Graph
        </footer>
      </div>
    </main>
  );
}
