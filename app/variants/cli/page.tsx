import Link from "next/link";
import Terminal from "@/components/variants/cli/Terminal";
import { translations, researchData } from "@/lib/i18n";

export const metadata = {
  title: "CLI Variant — Yasuaki Maruyama",
  description: "Terminal-style portfolio variant.",
};

const t = translations.ja;

export default function CLIVariant() {
  return (
    <main className="min-h-screen bg-[#03060c] text-slate-200 font-mono">
      {/* CRT scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-20 pb-16">
        <header className="mb-6">
          <p className="text-xs text-emerald-400/80">{`> session: tty/portfolio · variant: A — CLI`}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-300 mt-1">
            yasuaki@kyoto-u <span className="text-slate-500">~</span>
          </h1>
        </header>

        <Terminal />

        {/* Static fallback content (also visible after the typing finishes) */}
        <section id="experience" className="mt-16 grid gap-6">
          <h2 className="text-emerald-300 text-sm tracking-widest uppercase">
            {`// experience.log`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.exp.items.map((e, i) => (
              <article
                key={e.title}
                className="border border-emerald-500/20 bg-black/40 p-4 rounded-md hover:border-emerald-400/60 transition-colors"
              >
                <p className="text-emerald-400/80 text-xs">[{String(i + 1).padStart(2, "0")}]</p>
                <h3 className="text-slate-100 font-bold mt-1 text-sm">{e.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mt-2">{e.body}</p>
                <p className="mt-3 text-amber-300/90 text-[10px] tracking-wider">
                  {e.tags.map((tag) => `#${tag.toLowerCase().replace(/\s+/g, "_")}`).join(" ")}
                </p>
                {e.links.length > 0 && (
                  <p className="mt-2 text-xs">
                    {e.links.map((l, j) => (
                      <span key={l.url}>
                        {j > 0 && <span className="text-slate-600"> · </span>}
                        <a className="text-sky-400 hover:text-sky-300 underline-offset-4 hover:underline" href={l.url} target="_blank" rel="noreferrer">
                          {`>> `}{l.label.replace(" →", "")}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="mt-16">
          <h2 className="text-emerald-300 text-sm tracking-widest uppercase mb-3">
            {`// research/papers.bib`}
          </h2>
          <div className="border border-emerald-500/20 bg-black/40 p-4 rounded-md text-xs leading-relaxed">
            {researchData.papers.map((p, i) => {
              const title = "title" in p ? p.title : p.titleEn;
              return (
                <pre key={i} className="whitespace-pre-wrap text-slate-300 mb-3">
                  <span className="text-amber-300">@article</span>
                  <span className="text-slate-500">{`{`}</span>
                  <span className="text-emerald-300">paper{i + 1}</span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}<span className="text-cyan-300">title</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-slate-100">{`"${title}"`}</span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}<span className="text-cyan-300">journal</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-slate-100">{`"${p.journal}"`}</span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}<span className="text-cyan-300">year</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-slate-100">{`{${p.year}}`}</span>
                  {"\n"}<span className="text-slate-500">{`}`}</span>
                </pre>
              );
            })}
          </div>
        </section>

        <section id="projects" className="mt-16">
          <h2 className="text-emerald-300 text-sm tracking-widest uppercase mb-3">
            {`// ls projects/`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.projects.items.map((p) => (
              <article key={p.title} className="border border-emerald-500/20 bg-black/40 p-4 rounded-md hover:border-emerald-400/60 transition-colors">
                <p className="text-amber-300 text-xs">{`drwxr-xr-x  yasuaki  ${p.tags.join(" · ")}`}</p>
                <h3 className="text-slate-100 font-bold mt-1">{p.title}/</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{p.body}</p>
                {p.link && (
                  <a className="block mt-3 text-sky-400 text-xs hover:text-sky-300 hover:underline" href={p.link.url} target="_blank" rel="noreferrer">
                    {`$ open `}{p.link.url}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-emerald-300 text-sm tracking-widest uppercase mb-3">
            {`// contact --send`}
          </h2>
          <div className="border border-emerald-500/20 bg-black/40 p-4 rounded-md text-sm flex flex-wrap gap-3">
            <a className="text-sky-400 hover:text-sky-300 hover:underline" href="https://github.com/maruyamayasuaki" target="_blank" rel="noreferrer">$ ssh github.com/maruyamayasuaki</a>
            <span className="text-slate-600">|</span>
            <a className="text-sky-400 hover:text-sky-300 hover:underline" href="https://qiita.com/yasu_qita" target="_blank" rel="noreferrer">$ curl qiita.com/yasu_qita</a>
            <span className="text-slate-600">|</span>
            <a className="text-sky-400 hover:text-sky-300 hover:underline" href="mailto:yasuuuuu0898@gmail.com">$ mail yasuuuuu0898@gmail.com</a>
          </div>
        </section>

        <footer className="mt-16 text-xs text-slate-500 border-t border-emerald-500/10 pt-4 flex justify-between">
          <span>EOF — © 2025 Yasuaki Maruyama</span>
          <span>
            <Link href="/" className="hover:text-emerald-300">/home</Link>
            <span className="text-slate-700"> · </span>
            <Link href="/variants" className="hover:text-emerald-300">/variants</Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
