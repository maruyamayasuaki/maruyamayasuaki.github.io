import Link from "next/link";
import { translations, researchData } from "@/lib/i18n";
import "./arxiv.css";

export const metadata = {
  title: "Maruyama, Y. — A 27-Year-Old Engineer-Researcher: Profile",
  description: "arXiv-style portfolio variant.",
};

const t = translations.ja;

export default function ArxivVariant() {
  return (
    <main className="arxiv min-h-screen">
      {/* arXiv top bar */}
      <div className="topbar no-print">
        <span>arXiv:2026.0001 [cs.AI]</span>
        <span>
          <Link href="/" className="mr-3">[home]</Link>
          <Link href="/variants">[variants]</Link>
        </span>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-10">
        <p className="arxiv-id">arXiv:2026.0001v1 [cs.AI · cond-mat.mtrl-sci] · 26 Apr 2026</p>

        <h1>A Cross-Domain Engineer-Researcher Bridging Materials Science<br />and Machine Intelligence</h1>

        <p className="authors">
          Yasuaki Maruyama <sup>1, 2</sup>
        </p>
        <p className="affil">
          <sup>1</sup>Kyoto University, Graduate School of Engineering · D1 ·{" "}
          <sup>2</sup>Athena Technologies, Inc. · ML Engineer · maruyamayasuaki[at]gmail.com
        </p>

        <div className="abstract">
          We document the activity profile of a 27-year-old engineer-researcher operating
          across <em>first-principles materials informatics</em>, <em>industrial machine
          learning</em>, and <em>full-stack product engineering</em>. Methods include
          DFT (VASP) coupled with Bayesian active learning for high-dimensional
          strain-property optimization, secure local LLM deployment in air-gapped
          environments, and full-stack web/mobile delivery in TypeScript, Ruby, and
          Kotlin. The candidate has produced {researchData.papers.length} peer-reviewed
          articles and {researchData.conferences.length} conference presentations
          (1 Best-Presentation Award), simultaneously deploying production AI to
          finance, manufacturing, and healthcare sectors.{" "}
          <b>Keywords:</b> materials informatics, active learning, first-principles DFT,
          industrial AI, secure LLM, full-stack engineering.
        </div>

        <div className="body">
          <div className="twocol">
            <h2>Introduction</h2>
            <p>
              The boundary between computational materials science and machine
              learning has blurred in the past decade. Practitioners who can move
              fluidly between density-functional theory (DFT), Bayesian decision
              theory, and production-grade software engineering remain rare. This
              note describes such a profile <span className="ref">[1, 2]</span>.
            </p>

            <p>
              The subject is enrolled in the doctoral program at Kyoto University,
              where strain engineering of ferroelectric perovskites under active
              learning is the principal research thread. Concurrently, the subject
              is employed as an ML engineer at Athena Technologies, where industrial
              AI is shipped to regulated sectors.
            </p>

            <h2>Methods</h2>
            <h3>2.1 Strain optimization via active learning</h3>
            <p>
              We treat the six-dimensional strain tensor as a continuous design
              variable and the target property (band gap, polarization, elastic
              modulus) as an expensive black-box function {`f: ℝ⁶ → ℝ`}.
            </p>
            <p className="equation">
              x* = arg max<sub>x ∈ X</sub> α(x; D), &nbsp; D = {`{(xᵢ, f(xᵢ))}`}
            </p>
            <p>
              The acquisition α is Expected Improvement (GP-EI) with an RBF kernel.
              First-principles calculations are dispatched as Slurm jobs on the
              KUDPC cluster <span className="ref">[3]</span>.
            </p>

            <h3>2.2 Industrial AI delivery</h3>
            <p>
              At Athena Technologies, three engagements have been delivered:
              (i) a secure local LLM running entirely behind an air-gap for a major
              bank, supporting masking, approval-document review, and automated
              business document generation; (ii) anomaly detection and process
              optimization on factory sensor logs; (iii) a high-recall RAG
              assistant tuned for medical knowledge bases.
            </p>

            <div className="figure">
              <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 200 100" style={{ width: "100%", maxWidth: "300px" }}>
                  <path d="M 10 80 Q 50 20, 90 60 T 190 30" fill="none" stroke="#111" strokeWidth="1.5" />
                  <circle cx="20" cy="72" r="3" fill="#111" />
                  <circle cx="60" cy="38" r="3" fill="#111" />
                  <circle cx="120" cy="55" r="3" fill="#111" />
                  <circle cx="170" cy="35" r="3" fill="#111" />
                  <line x1="10" y1="90" x2="190" y2="90" stroke="#111" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke="#111" />
                  <text x="105" y="98" fontSize="6" textAnchor="middle">strain ε →</text>
                  <text x="3" y="50" fontSize="6" textAnchor="middle" transform="rotate(-90 3 50)">f(ε)</text>
                </svg>
              </div>
              <p className="caption">
                <b>Figure 1.</b> Schematic of GP-posterior over the property landscape
                with four DFT observations (filled circles).
              </p>
            </div>

            <h2>Experience</h2>
            {t.exp.items.map((e, i) => (
              <p key={e.title}>
                <b>{i + 1}.</b> <em>{e.title}.</em> {e.body} {e.links.length > 0 && (
                  <>
                    See {e.links.map((l, j) => (
                      <span key={l.url}>
                        {j > 0 && ", "}
                        <a href={l.url} target="_blank" rel="noreferrer" className="ref">[{4 + j + i * 2}]</a>
                      </span>
                    ))}.
                  </>
                )}
              </p>
            ))}

            <h2>Selected Side Projects</h2>
            {t.projects.items.map((p) => (
              <p key={p.title}>
                <b>{p.title}.</b> {p.body} <code>{p.tags.join(" / ")}</code>
                {p.link && <> <a href={p.link.url} target="_blank" rel="noreferrer" className="ref">[link]</a></>}.
              </p>
            ))}

            <h2>Awards</h2>
            <ul>
              {researchData.awards.map((a, i) => {
                const title = "title" in a ? a.title : a.titleJa;
                return (
                  <li key={i}>
                    <em>{title}</em>. {a.meta}.
                  </li>
                );
              })}
            </ul>

            <h2>Discussion</h2>
            <p>
              Active learning bridges the gap between expensive computational
              materials science and tractable optimization. The same Bayesian
              decision machinery transfers cleanly to industrial engagements where
              labeled data is scarce and acquisition is expensive. Cross-domain
              practice keeps both halves honest.
            </p>

            <h2>Acknowledgments</h2>
            <p className="text-sm">
              Thanks to the Shimada Group at Kyoto University and the engineering
              team at Athena Technologies for the collaborations referenced
              throughout this profile.
            </p>

            <h2>References</h2>
            <ol className="refs">
              {researchData.papers.map((p, i) => {
                const title = "title" in p ? p.title : p.titleEn;
                return (
                  <li key={i}>
                    <span dangerouslySetInnerHTML={{ __html: p.authors }} />, &ldquo;<em>{title}</em>&rdquo;, {p.journal}, {p.year}.
                  </li>
                );
              })}
              <li>Maruyama, Y., Source repository, GitHub.{" "}
                <a href="https://github.com/maruyamayasuaki" target="_blank" rel="noreferrer">
                  https://github.com/maruyamayasuaki
                </a>
              </li>
              <li>Maruyama, Y., Technical writing index, Qiita.{" "}
                <a href="https://qiita.com/yasu_qita" target="_blank" rel="noreferrer">https://qiita.com/yasu_qita</a>
              </li>
            </ol>
          </div>

          <p className="footnote">
            Compiled with LaTeX-equivalent web typography. © 2025 Maruyama. Licensed for
            non-commercial reading. Contact: maruyamayasuaki[at]gmail.com.{" "}
            <Link href="/" className="ref">[home]</Link>{" · "}
            <Link href="/variants" className="ref">[variants]</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
