"use client";
import AnimatedSection from "./AnimatedSection";
import { type Lang, translations, researchData } from "@/lib/i18n";

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-indigo-900/60 border border-indigo-500/40 text-indigo-300 uppercase tracking-wide">
      {label}
    </span>
  );
}

function ResearchCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="glass rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
        {children}
      </div>
    </AnimatedSection>
  );
}

export default function Research({ lang }: { lang: Lang }) {
  const t = translations[lang].research;
  const isEn = lang === "en";

  return (
    <section id="research" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">{t.title}</h2>
            <p className="text-slate-400">{t.sub}</p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {/* Awards */}
          <ResearchCard delay={0.05}>
            <div className="flex items-center gap-2 mb-2">
              <Tag label={isEn ? "Award" : "受賞"} />
            </div>
            <p className="font-semibold text-white">
              Best Presentation Award <span className="award-badge">Award</span>
            </p>
            <p className="text-sm text-slate-400 mt-1">Kyoto University Joint-Symposium on Mechanics of Advanced Materials &amp; Structures 2025 · Nov 2025</p>
          </ResearchCard>

          <ResearchCard delay={0.1}>
            <div className="flex items-center gap-2 mb-2">
              <Tag label={isEn ? "Scholarship" : "奨学金"} />
            </div>
            <p className="font-semibold text-white">
              <span className="scholarship-badge">{isEn ? "Adopted" : "採択"}</span>{" "}
              {isEn ? "Kyoto University BOOST Next-Generation AI Scholarship" : "京都大学 BOOST 次世代 AI 奨学金"}
            </p>
          </ResearchCard>

          {/* Papers */}
          {researchData.papers.map((p, i) => (
            <ResearchCard key={i} delay={0.15 + i * 0.05}>
              <div className="flex items-center gap-2 mb-2">
                <Tag label={isEn ? "Journal Paper" : "学術論文"} />
              </div>
              <p
                className="font-semibold text-white leading-snug"
                dangerouslySetInnerHTML={{
                  __html: isEn && p.titleEn ? p.titleEn : (p.titleJa ?? p.title ?? ""),
                }}
              />
              <p
                className="text-sm text-slate-400 mt-1"
                dangerouslySetInnerHTML={{ __html: p.authors }}
              />
              <p className="text-sm text-cyan-700 mt-0.5">{p.journal} ({p.year})</p>
            </ResearchCard>
          ))}

          {/* Conferences */}
          {researchData.conferences.map((c, i) => (
            <ResearchCard key={i} delay={0.25 + i * 0.05}>
              <div className="flex items-center gap-2 mb-2">
                <Tag label={c.type} />
              </div>
              <p className="font-semibold text-white leading-snug">
                {isEn && c.titleEn ? c.titleEn : (c.titleJa ?? c.title ?? "")}
                {c.award && <span className="award-badge">Best Presentation</span>}
              </p>
              <p
                className="text-sm text-slate-400 mt-1"
                dangerouslySetInnerHTML={{ __html: c.authors }}
              />
              <p className="text-sm text-slate-500 mt-0.5">{c.venue} · {c.date}</p>
            </ResearchCard>
          ))}
        </div>
      </div>
    </section>
  );
}
