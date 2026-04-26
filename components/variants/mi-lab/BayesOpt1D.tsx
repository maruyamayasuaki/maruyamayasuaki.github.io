"use client";

// 1-D Bayesian Optimization mini-demo.
// True f is hidden (a smooth bumpy function on [0,1]); we sample, fit a tiny GP
// (RBF kernel), and show mean ± 2σ band plus the EI acquisition function.
// User clicks "Sample next" to add the argmax of EI; or clicks the panel to add
// a manual sample.

import { useMemo, useState } from "react";

const W = 600;
const H = 280;
const padL = 36;
const padR = 16;
const padT = 16;
const padB = 28;
const innerW = W - padL - padR;
const innerH = H - padT - padB;

// Hidden ground-truth: a strain-property-like nonlinear curve.
function f(x: number) {
  return Math.sin(6 * x) * (1 - x) * 0.6 + 0.5 + 0.18 * Math.cos(12 * x) * x;
}

// RBF kernel
function k(a: number, b: number, ls = 0.08, sigF = 0.3) {
  return sigF * sigF * Math.exp(-((a - b) ** 2) / (2 * ls * ls));
}

// Tiny GP with explicit matrix ops; works fine for N ~ 30
function gp(xs: number[], ys: number[], grid: number[]) {
  const n = xs.length;
  const noise = 0.0008;
  const K: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => k(xs[i], xs[j]) + (i === j ? noise : 0)),
  );

  // Solve K alpha = y via Cholesky
  const L: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = K[i][j];
      for (let p = 0; p < j; p++) s -= L[i][p] * L[j][p];
      if (i === j) {
        L[i][j] = Math.sqrt(Math.max(s, 1e-9));
      } else {
        L[i][j] = s / L[j][j];
      }
    }
  }
  // Solve L z = y, then L^T alpha = z
  const z = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = ys[i];
    for (let p = 0; p < i; p++) s -= L[i][p] * z[p];
    z[i] = s / L[i][i];
  }
  const alpha = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = z[i];
    for (let p = i + 1; p < n; p++) s -= L[p][i] * alpha[p];
    alpha[i] = s / L[i][i];
  }

  return grid.map((xstar) => {
    const ks = xs.map((xi) => k(xi, xstar));
    let mean = 0;
    for (let i = 0; i < n; i++) mean += ks[i] * alpha[i];

    // Solve L v = ks
    const v = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let s = ks[i];
      for (let p = 0; p < i; p++) s -= L[i][p] * v[p];
      v[i] = s / L[i][i];
    }
    let varStar = k(xstar, xstar);
    for (let i = 0; i < n; i++) varStar -= v[i] * v[i];
    return { mean, std: Math.sqrt(Math.max(varStar, 1e-6)) };
  });
}

// Expected Improvement
function ei(mean: number, std: number, fbest: number) {
  if (std < 1e-6) return 0;
  const z = (mean - fbest) / std;
  const pdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  // CDF approx
  const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
  return (mean - fbest) * cdf + std * pdf;
}
function erf(x: number) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

const initialSamples = [0.05, 0.32, 0.78];

function fmt(n: number) {
  return n.toFixed(3);
}

export default function BayesOpt1D() {
  const [xs, setXs] = useState<number[]>(initialSamples);
  const ys = useMemo(() => xs.map(f), [xs]);

  const grid = useMemo(() => Array.from({ length: 121 }, (_, i) => i / 120), []);
  const post = useMemo(() => gp(xs, ys, grid), [xs, ys, grid]);

  const fbest = Math.max(...ys);
  const eis = post.map((p) => ei(p.mean, p.std, fbest));
  const eiMax = Math.max(...eis, 1e-6);
  const argmaxIdx = eis.indexOf(eiMax);
  const xNext = grid[argmaxIdx];

  function px(x: number) {
    return padL + x * innerW;
  }
  function py(y: number) {
    // map y∈[0,1] → top→bottom
    return padT + (1 - Math.max(0, Math.min(1, y))) * innerH;
  }

  const meanPath = grid.map((x, i) => `${i === 0 ? "M" : "L"}${px(x)},${py(post[i].mean)}`).join(" ");
  const upperPath = grid.map((x, i) => `${i === 0 ? "M" : "L"}${px(x)},${py(post[i].mean + 2 * post[i].std)}`).join(" ");
  const lowerPath = grid
    .slice()
    .reverse()
    .map((x, i) => {
      const orig = grid.length - 1 - i;
      return `L${px(x)},${py(post[orig].mean - 2 * post[orig].std)}`;
    })
    .join(" ");
  const bandPath = upperPath + " " + lowerPath + " Z";

  // EI as a normalized curve in its own band (bottom 22%)
  const eiBandTop = padT + innerH * 0.78;
  const eiBandBottom = padT + innerH;
  function eiY(v: number) {
    const f = v / eiMax;
    return eiBandBottom - f * (eiBandBottom - eiBandTop);
  }
  const eiPath = grid.map((x, i) => `${i === 0 ? "M" : "L"}${px(x)},${eiY(eis[i])}`).join(" ");

  function addSample(x: number) {
    setXs((prev) => [...prev, x].sort((a, b) => a - b));
  }
  function reset() {
    setXs(initialSamples);
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px2 = ((e.clientX - rect.left) / rect.width) * W;
    const xn = Math.max(0, Math.min(1, (px2 - padL) / innerW));
    addSample(xn);
  }

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur p-5">
      <div className="flex flex-wrap items-baseline gap-3 mb-3">
        <h3 className="text-cyan-300 font-semibold text-sm">
          Bayesian Optimization · 1D demo
        </h3>
        <p className="text-xs text-slate-400 flex-1 min-w-[12ch]">
          GP posterior (mean ± 2σ) と EI 獲得関数。次の探索点 <span className="text-cyan-300">x*</span> = {fmt(xNext)} (EI = {fmt(eiMax)})。
        </p>
        <button
          onClick={() => addSample(xNext)}
          className="text-xs px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/30"
        >
          Sample x*
        </button>
        <button
          onClick={reset}
          className="text-xs px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto cursor-crosshair"
        onClick={handleClick}
        role="img"
        aria-label="Bayesian Optimization GP posterior and EI acquisition demo"
      >
        {/* axes */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} stroke="rgba(255,255,255,0.18)" />
        <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="rgba(255,255,255,0.18)" />

        {/* uncertainty band */}
        <path d={bandPath} fill="rgba(124,58,237,0.18)" />

        {/* true function (faint, dashed) */}
        <path
          d={grid.map((x, i) => `${i === 0 ? "M" : "L"}${px(x)},${py(f(x))}`).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeDasharray="4 4"
          strokeWidth="1"
        />

        {/* posterior mean */}
        <path d={meanPath} fill="none" stroke="#a5f3fc" strokeWidth="1.6" />

        {/* observations */}
        {xs.map((x, i) => (
          <g key={i}>
            <line
              x1={px(x)}
              y1={py(ys[i])}
              x2={px(x)}
              y2={padT + innerH}
              stroke="rgba(245,158,11,0.45)"
              strokeWidth="1"
            />
            <circle cx={px(x)} cy={py(ys[i])} r="4" fill="#fbbf24" stroke="#fff" strokeWidth="1" />
          </g>
        ))}

        {/* EI band separator */}
        <line
          x1={padL}
          y1={eiBandTop}
          x2={padL + innerW}
          y2={eiBandTop}
          stroke="rgba(255,255,255,0.08)"
          strokeDasharray="2 4"
        />
        <text x={padL + 4} y={eiBandTop + 12} className="fill-slate-500 text-[9px]">
          EI(x)
        </text>

        {/* EI curve */}
        <path d={eiPath} fill="none" stroke="#22d3ee" strokeWidth="1.4" />
        <line
          x1={px(xNext)}
          y1={padT}
          x2={px(xNext)}
          y2={padT + innerH}
          stroke="#22d3ee"
          strokeDasharray="2 3"
          strokeWidth="1"
        />

        <text x={padL - 6} y={py(0)} textAnchor="end" className="fill-slate-500 text-[9px]">
          0
        </text>
        <text x={padL - 6} y={py(1) + 4} textAnchor="end" className="fill-slate-500 text-[9px]">
          1
        </text>
        <text x={padL + innerW} y={padT + innerH + 16} textAnchor="end" className="fill-slate-500 text-[9px]">
          strain →
        </text>
      </svg>

      <p className="text-[10px] text-slate-500 mt-2">
        パネルをクリックして任意の x で観測を追加できます。{xs.length} 観測。最良値 f<sub>best</sub> = {fmt(fbest)}。
      </p>
    </div>
  );
}
