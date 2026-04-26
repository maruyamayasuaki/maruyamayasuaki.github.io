type Props = {
  data: Record<string, number>;
};

const COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Ruby: "#CC342D",
  Kotlin: "#A97BFF",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
  Batchfile: "#C1F12E",
  Java: "#B07219",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#F34B7D",
};

function colorFor(name: string, i: number) {
  if (COLORS[name]) return COLORS[name];
  const palette = ["#06b6d4", "#a855f7", "#ec4899", "#f97316", "#84cc16", "#14b8a6"];
  return palette[i % palette.length];
}

export default function LangDonut({ data }: Props) {
  const entries = Object.entries(data);
  const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
  const radius = 60;
  const circ = 2 * Math.PI * radius;

  let offset = 0;
  const segments = entries.map(([name, value], i) => {
    const frac = value / total;
    const segLen = circ * frac;
    const seg = (
      <circle
        key={name}
        cx="80"
        cy="80"
        r={radius}
        fill="transparent"
        stroke={colorFor(name, i)}
        strokeWidth="22"
        strokeDasharray={`${segLen} ${circ - segLen}`}
        strokeDashoffset={-offset}
        transform="rotate(-90 80 80)"
      />
    );
    offset += segLen;
    return { name, frac, value, color: colorFor(name, i), seg };
  });

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center">
      <svg viewBox="0 0 160 160" className="w-40 h-40 flex-shrink-0">
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="22" />
        {segments.map((s) => s.seg)}
        <text x="80" y="76" textAnchor="middle" className="fill-white text-xs font-semibold">
          {entries.length}
        </text>
        <text x="80" y="92" textAnchor="middle" className="fill-slate-400 text-[10px]">
          languages
        </text>
      </svg>
      <ul className="text-xs space-y-1.5 w-full">
        {segments.slice(0, 7).map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-slate-200 flex-1">{s.name}</span>
            <span className="text-slate-500 tabular-nums">{(s.frac * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
