import Link from "next/link";

type Variant = {
  slug: string;
  letter: string;
  name: string;
  tagline: string;
  audience: string[];
  accent: string;
  preview: React.ReactNode;
};

const variants: Variant[] = [
  {
    slug: "cli",
    letter: "A",
    name: "CLI / Terminal",
    tagline: "$ whoami — タイプライタで語る、ハッカー寄りのターミナル UI",
    audience: ["OSS", "シニア", "ハッカー寄り"],
    accent: "from-emerald-400 to-amber-300",
    preview: (
      <pre className="font-mono text-[10px] leading-tight text-emerald-300/90">
        <span className="text-amber-300">$</span> whoami{"\n"}
        Yasuaki Maruyama{"\n"}
        <span className="text-amber-300">$</span> ls projects/{"\n"}
        local-discovery  manimtube  starbucks-map  …{"\n"}
        <span className="text-amber-300">$</span> <span className="animate-pulse">▍</span>
      </pre>
    ),
  },
  {
    slug: "ide",
    letter: "B",
    name: "IDE / VSCode",
    tagline: "Explorer + エディタ + ステータスバー、コードで語るレイアウト",
    audience: ["Web", "フルスタック"],
    accent: "from-sky-400 to-indigo-400",
    preview: (
      <div className="font-mono text-[10px] leading-tight grid grid-cols-[60px_1fr] h-full">
        <div className="border-r border-white/10 pr-2 text-slate-400">
          <div>EXPLORER</div>
          <div className="mt-1 text-cyan-300">▾ portfolio</div>
          <div className="pl-2">about.md</div>
          <div className="pl-2 text-amber-300">experience.tsx</div>
          <div className="pl-2">projects.json</div>
        </div>
        <div className="pl-2 text-slate-300">
          <div className="text-purple-300">{`<Section>`}</div>
          <div className="pl-2">{`Athena Tech…`}</div>
          <div className="text-purple-300">{`</Section>`}</div>
        </div>
      </div>
    ),
  },
  {
    slug: "dashboard",
    letter: "C",
    name: "GitHub Dashboard",
    tagline: "実績を数値で。コントリビューション・言語比率・論文を可視化",
    audience: ["採用", "マネージャ", "研究者"],
    accent: "from-fuchsia-400 to-cyan-400",
    preview: (
      <div className="grid grid-cols-12 gap-[2px] p-1">
        {Array.from({ length: 12 * 7 }).map((_, i) => {
          const level = (i * 13) % 5;
          const bg = ["bg-white/5", "bg-emerald-900/60", "bg-emerald-700/70", "bg-emerald-500/80", "bg-emerald-300"][level];
          return <div key={i} className={`aspect-square rounded-[2px] ${bg}`} />;
        })}
      </div>
    ),
  },
  {
    slug: "brutalist",
    letter: "D",
    name: "Brutalist",
    tagline: "装飾なし、モノスペース、高密度。中身で語る README 派",
    audience: ["シニア", "OSS"],
    accent: "from-white to-slate-400",
    preview: (
      <pre className="font-mono text-[10px] leading-tight text-white">
        # Yasuaki Maruyama{"\n"}
        - Material Informatics × ML{"\n"}
        - Kyoto Univ. D1{"\n"}
        - @ Athena Technologies{"\n"}
        ## Papers [1] [2]{"\n"}
        ## Stack: py, ts, rb, kt{"\n"}
      </pre>
    ),
  },
  {
    slug: "mi-lab",
    letter: "E",
    name: "MI Lab — 3D",
    tagline: "Hero に結晶格子 3D + ベイズ最適化デモ。専門性を主役に",
    audience: ["ML", "研究者", "CTO"],
    accent: "from-cyan-300 via-purple-400 to-fuchsia-500",
    preview: (
      <div className="relative h-full">
        <svg viewBox="0 0 100 60" className="w-full h-full">
          {[
            [25, 15],
            [55, 15],
            [85, 15],
            [10, 35],
            [40, 35],
            [70, 35],
            [25, 55],
            [55, 55],
            [85, 55],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3.5" fill="url(#g)" />
            </g>
          ))}
          {[
            [25, 15, 55, 15],
            [55, 15, 85, 15],
            [10, 35, 40, 35],
            [40, 35, 70, 35],
            [25, 55, 55, 55],
            [55, 55, 85, 55],
            [25, 15, 10, 35],
            [55, 15, 40, 35],
            [85, 15, 70, 35],
            [10, 35, 25, 55],
            [40, 35, 55, 55],
            [70, 35, 85, 55],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
          ))}
          <defs>
            <radialGradient id="g">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    slug: "bento",
    letter: "F",
    name: "Bento Grid",
    tagline: "Apple WWDC 風の非対称タイル。動的・トレンド最先端",
    audience: ["Web", "採用", "PM"],
    accent: "from-fuchsia-400 via-purple-400 to-cyan-300",
    preview: (
      <div className="grid grid-cols-3 grid-rows-2 gap-1 p-1 h-full">
        <div className="col-span-2 rounded-md bg-gradient-to-br from-purple-500/40 to-cyan-500/30 border border-white/10" />
        <div className="rounded-md bg-white/5 border border-white/10" />
        <div className="rounded-md bg-white/5 border border-white/10" />
        <div className="col-span-2 rounded-md bg-gradient-to-br from-cyan-500/30 to-pink-500/20 border border-white/10" />
      </div>
    ),
  },
  {
    slug: "notion",
    letter: "G",
    name: "Notion Workspace",
    tagline: "ブロック・トグル・DB ビュー。ドキュメントワーカー寄り",
    audience: ["Web", "PM", "ライター"],
    accent: "from-slate-300 to-slate-500",
    preview: (
      <div className="font-mono text-[10px] leading-tight p-2 text-slate-300">
        <div className="text-white">🪪 About me</div>
        <div className="ml-3 text-slate-400">▾ Profile</div>
        <div className="ml-6">▸ Education</div>
        <div className="ml-6">▸ Now</div>
        <div className="mt-1 text-white">💼 Experience</div>
        <div className="ml-3 text-cyan-300">+ /database</div>
      </div>
    ),
  },
  {
    slug: "linear",
    letter: "H",
    name: "Linear / Vercel",
    tagline: "高級感ある SaaS ランディング。CTA とメッシュ背景",
    audience: ["採用", "経営", "営業"],
    accent: "from-white via-purple-300 to-cyan-300",
    preview: (
      <div className="relative h-full flex flex-col items-center justify-center text-center p-2">
        <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, #7c3aed, transparent 60%)" }} />
        <div className="relative text-[10px] font-bold text-white">Bridging matter</div>
        <div className="relative text-[10px] font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">and intelligence.</div>
        <div className="relative mt-1 px-2 py-0.5 rounded-full bg-white text-[8px] text-black">Get started →</div>
      </div>
    ),
  },
  {
    slug: "status",
    letter: "I",
    name: "Status Page",
    tagline: "All systems operational ✅。稼働率と incident timeline 風刺",
    audience: ["OSS", "SRE", "エンジニア"],
    accent: "from-emerald-400 to-cyan-400",
    preview: (
      <div className="p-2 text-[10px] font-mono">
        <div className="flex items-center gap-1 text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          all systems operational
        </div>
        <div className="mt-1 flex gap-[1px] h-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i === 18 ? "bg-amber-400" : "bg-emerald-400/80"}`} />
          ))}
        </div>
        <div className="mt-1 text-slate-500">99.97% · 90d</div>
      </div>
    ),
  },
  {
    slug: "desktop",
    letter: "J",
    name: "macOS Desktop",
    tagline: "ドラッグ可能なウィンドウ + Dock。遊び心あり",
    audience: ["Web", "デザイナー", "若手"],
    accent: "from-pink-400 via-purple-400 to-cyan-400",
    preview: (
      <div className="relative h-full">
        <div className="absolute top-2 left-2 w-[55%] h-[60%] rounded-md bg-[#1d1f24] border border-white/15">
          <div className="h-2 bg-gradient-to-b from-[#3a3d44] to-[#2a2d33] flex items-center px-1 gap-0.5">
            <span className="w-1 h-1 rounded-full bg-red-500" />
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 w-[50%] h-[50%] rounded-md bg-[#1d1f24] border border-white/15">
          <div className="h-2 bg-gradient-to-b from-[#3a3d44] to-[#2a2d33]" />
        </div>
      </div>
    ),
  },
  {
    slug: "rpg",
    letter: "K",
    name: "RPG Character Sheet",
    tagline: "HP/MP/EXP・スキルツリー・achievement。遊び心 + IT",
    audience: ["若手", "ゲーマー", "エンジニア"],
    accent: "from-amber-400 via-purple-500 to-cyan-300",
    preview: (
      <div className="p-2 text-[10px] font-mono space-y-1">
        <div className="flex items-baseline justify-between">
          <span className="text-amber-300 font-bold">Lv. 27</span>
          <span className="text-slate-300">Researcher × ML Mage</span>
        </div>
        <div className="h-1 bg-emerald-500/80 rounded-full" style={{ width: "82%" }} />
        <div className="h-1 bg-cyan-500/80 rounded-full" style={{ width: "97%" }} />
        <div className="h-1 bg-amber-500/80 rounded-full" style={{ width: "79%" }} />
        <div className="text-purple-300">⭐ 7 / achievements</div>
      </div>
    ),
  },
  {
    slug: "arxiv",
    letter: "L",
    name: "arXiv Paper",
    tagline: "学術論文 2 カラム組版。研究者・CTO 直撃",
    audience: ["研究者", "CTO", "学術"],
    accent: "from-red-400 to-amber-400",
    preview: (
      <div className="bg-[#f7f6f1] text-black h-full p-2 text-[8px] leading-tight font-serif">
        <div className="bg-[#b31b1b] text-white text-[7px] -mx-2 -mt-2 px-2 py-0.5 mb-1">arXiv:2026.0001</div>
        <div className="font-bold text-center text-[9px] mb-0.5">Cross-Domain Engineer-Researcher</div>
        <div className="text-center text-[7px]">Maruyama, Y.¹,²</div>
        <div className="border-t border-b border-gray-400 my-1 py-0.5 text-[7px]">
          <b>Abstract — </b>We document...
        </div>
        <div className="columns-2 gap-1 text-[6px]">
          1. Introduction. Active learning bridges...
        </div>
      </div>
    ),
  },
  {
    slug: "graph",
    letter: "N",
    name: "Knowledge Graph",
    tagline: "研究・職務・スキルの関係を Force-directed で可視化",
    audience: ["研究者", "CTO", "PM"],
    accent: "from-purple-400 to-pink-400",
    preview: (
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <line x1="50" y1="30" x2="20" y2="20" stroke="rgba(255,255,255,0.2)" />
        <line x1="50" y1="30" x2="80" y2="15" stroke="rgba(255,255,255,0.2)" />
        <line x1="50" y1="30" x2="25" y2="45" stroke="rgba(255,255,255,0.2)" />
        <line x1="50" y1="30" x2="80" y2="50" stroke="rgba(255,255,255,0.2)" />
        <line x1="20" y1="20" x2="25" y2="45" stroke="rgba(255,255,255,0.1)" />
        <line x1="80" y1="15" x2="80" y2="50" stroke="rgba(255,255,255,0.1)" />
        <circle cx="50" cy="30" r="6" fill="#fbbf24" />
        <circle cx="20" cy="20" r="3.5" fill="#a855f7" />
        <circle cx="80" cy="15" r="3.5" fill="#22d3ee" />
        <circle cx="25" cy="45" r="3" fill="#34d399" />
        <circle cx="80" cy="50" r="3" fill="#f472b6" />
      </svg>
    ),
  },
  {
    slug: "chat",
    letter: "O",
    name: "Ask Yasuaki — LLM Chat",
    tagline: "ChatGPT 風 UI。質問するとストリーミング応答 (静的)",
    audience: ["採用", "Web", "誰でも"],
    accent: "from-cyan-400 via-blue-400 to-purple-400",
    preview: (
      <div className="p-2 text-[10px] space-y-1">
        <div className="flex justify-end">
          <div className="rounded px-2 py-0.5 bg-cyan-600/30 text-cyan-50">研究テーマは？</div>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex-shrink-0" />
          <div className="rounded px-2 py-0.5 bg-white/10 text-slate-200">
            Materials Informatics × ML
            <span className="inline-block w-1 h-2 align-middle bg-cyan-300 animate-pulse ml-0.5" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function VariantsIndex() {
  return (
    <main className="min-h-screen bg-[#060912] text-slate-200 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 mt-8">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-3">Design Variants</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            14 候補を見比べる
          </h1>
          <p className="text-slate-400 max-w-2xl">
            IT 系ターゲットに「刺さる」ポートフォリオの方向性を 14 案、それぞれ別ルートに実装しました。
            実際に触ってから採用案を決めます。コンテンツは <code className="px-1 py-0.5 rounded bg-white/5 text-cyan-300 text-xs">lib/i18n.ts</code> を全案で共通利用しています。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {variants.map((v) => (
            <Link
              key={v.slug}
              href={`/variants/${v.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-all overflow-hidden"
            >
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${v.accent} opacity-60 group-hover:opacity-100 transition-opacity`}
              />
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl font-bold bg-gradient-to-br ${v.accent} bg-clip-text text-transparent`}>
                    {v.letter}
                  </span>
                  <h2 className="text-xl font-semibold text-white">{v.name}</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{v.tagline}</p>

                <div className="rounded-lg bg-black/40 border border-white/10 h-28 overflow-hidden">
                  {v.preview}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {v.audience.map((a) => (
                    <span key={a} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-cyan-400 group-hover:text-cyan-300 mt-1">
                  /variants/{v.slug} →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-xs text-slate-500">
          すべて静的書き出し (Next.js 16 + React 19) で GitHub Pages にデプロイされています。
        </footer>
      </div>
    </main>
  );
}
