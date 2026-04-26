"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

const services = [
  {
    name: "research.kyoto-u.ac.jp",
    description: "Material Informatics 第一原理計算 + ベイズ能動学習",
    status: "operational" as const,
    uptime: 99.97,
  },
  {
    name: "ml-engineer @ athenatech",
    description: "金融・製造・医療向け産業 AI を本番運用中",
    status: "operational" as const,
    uptime: 99.99,
  },
  {
    name: "side-projects",
    description: "Local Discovery / Manimtube / Pomodoro Blocker / Starbucks Map",
    status: "degraded" as const,
    uptime: 96.4,
  },
  {
    name: "tech-writing.qiita.com",
    description: "AI・並列処理・Chrome 拡張など多領域で連載",
    status: "operational" as const,
    uptime: 100.0,
  },
  {
    name: "bass-clarinet.live",
    description: "北野高校 OBOG 吹奏楽団。週末 deploy",
    status: "operational" as const,
    uptime: 100.0,
  },
  {
    name: "marathon.runtime",
    description: "下関海響マラソン 2025 完走 — full 42.195 km",
    status: "operational" as const,
    uptime: 100.0,
  },
];

const incidents = [
  {
    date: "2025-11",
    title: "Best Presentation Award · KU Joint-Symposium",
    severity: "milestone" as const,
    body: "Resolved — research.kyoto-u.ac.jp で重要なマイルストーン。Award reached.",
  },
  {
    date: "2025-10",
    title: "Article on Engineering Fracture Mechanics shipped",
    severity: "milestone" as const,
    body: "Paper deployed to journal cluster (vol. 331). Co-author replication confirmed.",
  },
  {
    date: "2025-04",
    title: "Marathon load test passed",
    severity: "milestone" as const,
    body: "marathon.runtime sustained 42.195 km @ 60% peak HR. No crash, no rollback.",
  },
  {
    date: "2024-11",
    title: "ML Engineer @ Athena Technologies — onboarding complete",
    severity: "info" as const,
    body: "New deployment region opened (FinTech / Manufacturing / HealthTech).",
  },
];

const statusColor: Record<"operational" | "degraded" | "down" | "milestone" | "info", string> = {
  operational: "text-emerald-400",
  degraded: "text-amber-400",
  down: "text-red-400",
  milestone: "text-cyan-400",
  info: "text-slate-400",
};

const statusBg: Record<"operational" | "degraded" | "down", string> = {
  operational: "bg-emerald-400",
  degraded: "bg-amber-400",
  down: "bg-red-400",
};

const statusLabel: Record<"operational" | "degraded" | "down", string> = {
  operational: "Operational",
  degraded: "Partial outage",
  down: "Major outage",
};

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function UptimeBars({ count = 90, status }: { count?: number; status: "operational" | "degraded" | "down" }) {
  // Deterministic but varied bar pattern
  const bars = Array.from({ length: count }, (_, i) => {
    const seed = (i * 31 + count) % 97;
    if (status === "down") return seed > 70 ? "down" : seed > 40 ? "degraded" : "operational";
    if (status === "degraded") return seed > 92 ? "degraded" : seed > 88 ? "down" : "operational";
    return seed > 95 ? "degraded" : "operational";
  });
  return (
    <div className="flex gap-[2px] h-7 w-full">
      {bars.map((s, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm hover:scale-y-110 origin-bottom transition-transform ${statusBg[s as keyof typeof statusBg]} opacity-90`}
          title={`day -${count - i} · ${s}`}
        />
      ))}
    </div>
  );
}

function ServiceRow({ svc }: { svc: (typeof services)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-b border-white/5 last:border-b-0 py-4"
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div>
          <h3 className="text-white font-mono text-sm flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusBg[svc.status]} ${svc.status === "operational" ? "" : "animate-pulse"}`} />
            {svc.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{svc.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-xs font-semibold ${statusColor[svc.status]}`}>{statusLabel[svc.status]}</div>
          <div className="text-[10px] text-slate-500 tabular-nums mt-0.5">{svc.uptime.toFixed(2)}% · 90d</div>
        </div>
      </div>
      <UptimeBars status={svc.status} />
    </motion.div>
  );
}

function PerformanceMetric({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={`text-2xl font-bold tabular-nums ${color}`}>{value}</span>
        <span className="text-xs text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

export default function StatusVariant() {
  const now = useNow();
  const overallOk = services.every((s) => s.status === "operational");

  return (
    <main className="min-h-screen bg-[#0a0d12] text-slate-200">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-14">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <span className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-black">YM</span>
              status.maruyamayasuaki.dev
            </div>
            <Link href="/variants" className="text-slate-500 hover:text-cyan-300">← variants</Link>
          </div>

          <div className={`mt-6 rounded-lg p-5 border ${overallOk ? "bg-emerald-500/5 border-emerald-500/30" : "bg-amber-500/5 border-amber-500/30"}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className={`block w-3 h-3 rounded-full ${overallOk ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className={`absolute inset-0 rounded-full ${overallOk ? "bg-emerald-400" : "bg-amber-400"} animate-ping`} />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                {overallOk ? "All systems operational." : "Partial outage detected."}
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Updated {now ? now.toISOString().slice(11, 19) : "--:--:--"} UTC · refresh interval 1 s · health probes from Kyoto / Tokyo / Cloud
            </p>
          </div>
        </header>

        {/* Performance metrics */}
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Current performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <PerformanceMetric label="Papers / yr" value={2} unit="paper" color="text-cyan-300" />
            <PerformanceMetric label="Talks / yr" value={researchData.conferences.length} unit="talks" color="text-purple-300" />
            <PerformanceMetric label="Stars (Github)" value={7} unit="★" color="text-amber-300" />
            <PerformanceMetric label="Tools mastered" value={stackData.flatMap((s) => s.items).length} unit="tools" color="text-emerald-300" />
          </div>
        </section>

        {/* Service grid */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Service status</h2>
            <span className="text-[10px] text-slate-500 font-mono">last 90 days</span>
          </div>
          {services.map((s) => (
            <ServiceRow key={s.name} svc={s} />
          ))}
        </section>

        {/* Incidents / milestones */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-white mb-4">Recent activity</h2>
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${statusColor[inc.severity]}`}>
                    [{inc.severity}]
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{inc.date}</span>
                </div>
                <h3 className="text-white text-sm font-semibold mt-1">{inc.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{inc.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detail: experience */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-white mb-4">Subsystems @ Athena Technologies</h2>
          <div className="space-y-2 font-mono text-xs">
            {t.exp.items.map((e, i) => (
              <div key={e.title} className="rounded-md border border-white/10 bg-white/[0.02] p-3 flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">●</span>
                <div className="flex-1">
                  <div className="text-white">{e.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{e.body}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {e.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-emerald-400 text-[10px]">200 OK</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/5 pt-4 text-[10px] text-slate-500 font-mono flex justify-between">
          <span>powered by health-check {now ? now.getTime() : 0}</span>
          <span>
            <a href="mailto:yasuuuuu0898@gmail.com" className="hover:text-cyan-300">subscribe</a>
            {" · "}
            <a href="https://github.com/maruyamayasuaki" target="_blank" rel="noreferrer" className="hover:text-cyan-300">github</a>
            {" · "}
            <Link href="/variants" className="hover:text-cyan-300">variants</Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
