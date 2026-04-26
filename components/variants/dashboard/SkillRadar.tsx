type Skill = { label: string; value: number };

export default function SkillRadar({ skills }: { skills: Skill[] }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const max = 100;
  const radius = size / 2 - 36;
  const n = skills.length;

  function point(value: number, i: number) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = (value / max) * radius;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  }

  const polygon = skills.map((s, i) => point(s.value, i).join(",")).join(" ");

  const rings = [25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] h-auto">
      {rings.map((r) => {
        const points = skills
          .map((_, i) => point(r, i).join(","))
          .join(" ");
        return (
          <polygon
            key={r}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}
      {skills.map((_, i) => {
        const [x, y] = point(max, i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
          />
        );
      })}

      <polygon
        points={polygon}
        fill="rgba(124,58,237,0.25)"
        stroke="#7c3aed"
        strokeWidth="1.5"
      />
      {skills.map((s, i) => {
        const [x, y] = point(s.value, i);
        return <circle key={s.label} cx={x} cy={y} r="3" fill="#a5f3fc" />;
      })}

      {skills.map((s, i) => {
        const [x, y] = point(max + 12, i);
        return (
          <text
            key={s.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-300 text-[10px]"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}
