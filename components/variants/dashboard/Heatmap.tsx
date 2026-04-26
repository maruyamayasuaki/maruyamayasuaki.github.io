// Synthetic-but-deterministic contribution heatmap based on a seed string.
// (Public GitHub API doesn't expose contribution counts; the GraphQL endpoint
// requires auth which we avoid in the static build.)
function hash(seed: string, n: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  h = (h ^ n * 2654435761) >>> 0;
  return h;
}

const LEVELS = [
  "fill-white/5",
  "fill-emerald-900/70",
  "fill-emerald-700/80",
  "fill-emerald-500/85",
  "fill-emerald-300",
];

export default function Heatmap({ seed = "maruyamayasuaki" }: { seed?: string }) {
  const weeks = 26;
  const days = 7;
  const cells: { x: number; y: number; level: number }[] = [];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const r = hash(seed, w * 7 + d) % 100;
      let level = 0;
      if (r > 92) level = 4;
      else if (r > 80) level = 3;
      else if (r > 60) level = 2;
      else if (r > 35) level = 1;
      cells.push({ x: w, y: d, level });
    }
  }

  const cellSize = 12;
  const gap = 3;
  const totalActive = cells.filter((c) => c.level > 0).length;

  return (
    <div className="overflow-x-auto">
      <svg
        width={weeks * (cellSize + gap)}
        height={days * (cellSize + gap) + 18}
        className="block"
      >
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x * (cellSize + gap)}
            y={c.y * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            rx={2}
            className={LEVELS[c.level]}
          />
        ))}
        <text
          x="0"
          y={days * (cellSize + gap) + 14}
          className="fill-slate-500 text-[10px]"
        >
          {totalActive} active days · last 26 weeks (illustrative)
        </text>
      </svg>
      <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
        Less
        {LEVELS.map((c, i) => (
          <svg key={i} width="10" height="10">
            <rect width="10" height="10" rx={2} className={c} />
          </svg>
        ))}
        More
      </div>
    </div>
  );
}
