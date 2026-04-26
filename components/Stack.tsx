"use client";
import AnimatedSection from "./AnimatedSection";
import { type Lang, translations, stackData } from "@/lib/i18n";

export default function Stack({ lang }: { lang: Lang }) {
  const t = translations[lang].stack;
  return (
    <section id="stack" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">{t.title}</h2>
            <p className="text-slate-400">{t.sub}</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stackData.map((group, i) => (
            <AnimatedSection key={group.category} delay={i * 0.08}>
              <div className="glass rounded-xl p-5 h-full hover:border-purple-500/40 transition-all duration-300">
                <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
