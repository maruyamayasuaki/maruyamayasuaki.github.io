import Link from "next/link";
import { translations, researchData, stackData } from "@/lib/i18n";
import "./brutalist.css";

export const metadata = {
  title: "Yasuaki Maruyama — README",
  description: "Brutalist high-density variant: README-style portfolio.",
};

const t = translations.ja;

const links = [
  { label: "GitHub", url: "https://github.com/maruyamayasuaki" },
  { label: "Qiita", url: "https://qiita.com/yasu_qita" },
  { label: "Email", url: "mailto:yasuuuuu0898@gmail.com" },
];

export default function BrutalistVariant() {
  return (
    <main className="brutal min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16">
        <header>
          <p className="brutal-meta">~ / portfolio / README.md · last updated 2026-04</p>
          <h1>
            Yasuaki Maruyama <mark>Material Informatics × ML</mark>
          </h1>
          <p>
            京都大学大学院工学研究科 博士課程 1 年。能動学習と第一原理計算を用いた
            ひずみ設計を研究。<br />
            <a href="https://www.athenatech.io/" target="_blank" rel="noreferrer">Athena Technologies</a>{" "}
            にて ML エンジニア (2024-11–) として、銀行・製造・医療向け AI を構築。
          </p>
          <p className="brutal-meta">
            {links.map((l, i) => (
              <span key={l.url}>
                {i > 0 && " · "}
                <a href={l.url} target={l.url.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </header>

        <div className="brutal-grid">
          <aside className="brutal-toc no-print">
            <strong>CONTENTS</strong>
            <ol>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#research">Research</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#stack">Stack</a></li>
              <li><a href="#beyond">Beyond</a></li>
            </ol>
            <hr />
            <p className="brutal-meta">
              <kbd>Ctrl</kbd>+<kbd>P</kbd> で印刷可。<br />
              モノスペース、装飾なし、JS なし。
            </p>
          </aside>

          <article>
            <section id="about">
              <h2>{"// About"}</h2>
              <table>
                <tbody>
                  {t.about.cards.map((c) => (
                    <tr key={c.title}>
                      <th style={{ width: "30%" }}>{c.title}</th>
                      <td>{c.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="experience">
              <h2>{"// Experience @ Athena Technologies (2024-11–)"}</h2>
              {t.exp.items.map((item, i) => (
                <div key={item.title}>
                  <h3>
                    [{i + 1}] {item.title}
                  </h3>
                  <p>{item.body}</p>
                  <p>
                    {item.tags.map((tag) => (
                      <span key={tag} className="brutal-tag">{tag}</span>
                    ))}
                  </p>
                  {item.links.length > 0 && (
                    <p className="brutal-meta">
                      {item.links.map((l, j) => (
                        <span key={l.url}>
                          {j > 0 && " · "}
                          <a href={l.url} target="_blank" rel="noreferrer">
                            [ref] {l.label.replace(" →", "")}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </section>

            <section id="research">
              <h2>{"// Research"}</h2>
              <h3>Awards / Scholarships</h3>
              <ul>
                {researchData.awards.map((a, i) => {
                  const title = "title" in a ? a.title : a.titleJa;
                  return (
                    <li key={i}>
                      <strong>[{a.type}]</strong> {title} <span className="brutal-meta">— {a.meta}</span>
                    </li>
                  );
                })}
              </ul>

              <h3>Papers</h3>
              <ol>
                {researchData.papers.map((p, i) => {
                  const title = "title" in p ? p.title : p.titleJa;
                  return (
                    <li key={i}>
                      {title}.{" "}
                      <span className="brutal-meta" dangerouslySetInnerHTML={{ __html: p.authors }} />.{" "}
                      <em>{p.journal}</em> ({p.year}).
                    </li>
                  );
                })}
              </ol>

              <h3>Conferences</h3>
              <ol>
                {researchData.conferences.map((c, i) => {
                  const title = "title" in c ? c.title : c.titleJa;
                  return (
                    <li key={i}>
                      {title}
                      {c.award && <> <mark>★ Best Presentation</mark></>}.{" "}
                      <span className="brutal-meta" dangerouslySetInnerHTML={{ __html: c.authors }} />.{" "}
                      <em>{c.venue}</em>, {c.date}. <span className="brutal-meta">[{c.type}]</span>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section id="projects">
              <h2>{"// Projects"}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>What</th>
                    <th>Stack</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {t.projects.items.map((p) => (
                    <tr key={p.title}>
                      <td><strong>{p.title}</strong></td>
                      <td>{p.body}</td>
                      <td className="brutal-meta">{p.tags.join(", ")}</td>
                      <td>
                        {p.link ? (
                          <a href={p.link.url} target="_blank" rel="noreferrer">
                            {p.link.label.replace(" →", "")}
                          </a>
                        ) : (
                          <span className="brutal-meta">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="stack">
              <h2>{"// Stack"}</h2>
              <table>
                <tbody>
                  {stackData.map((row) => (
                    <tr key={row.category}>
                      <th style={{ width: "25%" }}>{row.category}</th>
                      <td>{row.items.join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="beyond">
              <h2>{"// Beyond Engineering"}</h2>
              <ul>
                {t.beyond.items.map((b) => (
                  <li key={b.title}>
                    <strong>{b.title}.</strong> {b.body}
                    {b.link && (
                      <> · <a href={b.link.url} target="_blank" rel="noreferrer">{b.link.label.replace(" →", "")}</a></>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <footer className="brutal-footnotes">
              <hr />
              <p>
                © 2025 Yasuaki Maruyama. Plain HTML + CSS, no JS. Lighthouse-friendly.
                {" "}<Link href="/">[home]</Link> · <Link href="/variants">[variants]</Link>
              </p>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
