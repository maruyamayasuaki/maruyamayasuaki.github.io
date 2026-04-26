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
];

export default function VariantsIndex() {
  return (
    <main className="min-h-screen bg-[#060912] text-slate-200 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 mt-8">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-3">Design Variants</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            5 候補を見比べる
          </h1>
          <p className="text-slate-400 max-w-2xl">
            IT 系ターゲットに「刺さる」ポートフォリオの方向性を 5 案、それぞれ別ルートに実装しました。
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
