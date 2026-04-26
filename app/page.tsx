"use client";
import { useState } from "react";
import { type Lang, translations } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Stack from "@/components/Stack";
import AnimatedSection from "@/components/AnimatedSection";

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <AnimatedSection>
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-3">{title}</h2>
        <p className="text-slate-400">{sub}</p>
      </div>
    </AnimatedSection>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[0.72rem] px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
      {label}
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ja");
  const t = translations[lang];

  return (
    <>
      <Nav lang={lang} onToggle={() => setLang((l) => (l === "ja" ? "en" : "ja"))} />
      <Hero lang={lang} />

      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title={t.about.title} sub={t.about.sub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.about.cards.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 h-full hover:border-purple-500/40 transition-all duration-300">
                  <h3 className="font-semibold text-white mb-2 text-sm">{c.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 bg-slate-950/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title={t.exp.title} sub={t.exp.sub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.exp.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 flex flex-col gap-4 h-full hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => <Tag key={tag} label={tag} />)}
                  </div>
                  {item.links.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                      {item.links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                          className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Research lang={lang} />

      <section id="projects" className="py-24 px-6 bg-slate-950/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title={t.projects.title} sub={t.projects.sub} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.projects.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass rounded-xl p-6 flex flex-col gap-4 h-full hover:border-purple-500/40 transition-all duration-300">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => <Tag key={tag} label={tag} />)}
                  </div>
                  {item.link && (
                    <a href={item.link.url} target="_blank" rel="noreferrer"
                      className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                      {item.link.label}
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Stack lang={lang} />

      <section id="beyond" className="py-24 px-6 bg-slate-950/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title={t.beyond.title} sub={t.beyond.sub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.beyond.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 flex flex-col gap-3 h-full hover:border-cyan-500/30 transition-all duration-300">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.body}</p>
                  {item.link && (
                    <a href={item.link.url} target="_blank" rel="noreferrer"
                      className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                      {item.link.label}
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-3">{t.contact.title}</h2>
            <p className="text-slate-400 mb-10">{t.contact.sub}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              {[
                { label: "GitHub", url: "https://github.com/maruyamayasuaki" },
                { label: "Qiita", url: "https://qiita.com/yasu_qita" },
                { label: "Email", url: "mailto:yasuuuuu0898@gmail.com" },
              ].map((l) => (
                <a key={l.label} href={l.url}
                  target={l.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 font-medium">
                  {l.label}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="text-center py-8 text-xs text-slate-600 border-t border-slate-800 space-y-2">
        <div>© 2025 Yasuaki Maruyama · Built with Next.js + TypeScript</div>
        <div>
          <a href="/variants" className="text-slate-500 hover:text-cyan-400 transition-colors">
            ⌥ Design Variants (preview 5 candidates) →
          </a>
        </div>
      </footer>
    </>
  );
}
