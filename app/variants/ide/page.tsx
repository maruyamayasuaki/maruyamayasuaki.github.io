import { codeToHtml } from "shiki";
import { translations, researchData, stackData } from "@/lib/i18n";
import IdeShell, { type IdeFile } from "@/components/variants/ide/IdeShell";
import "@/components/variants/ide/ide.css";
import Link from "next/link";

export const metadata = {
  title: "IDE Variant — Yasuaki Maruyama",
  description: "VSCode-style IDE variant of the portfolio.",
};

const t = translations.ja;

const aboutMd = `# Yasuaki Maruyama

> Material Informatics × ML Engineer
> Kyoto University · Athena Technologies

## Profile
${t.hero.lead}

## Currently
- 京都大学大学院工学研究科 博士課程 1 年
- ML Engineer @ Athena Technologies (2024-11–)
- Bayesian active learning × first-principles DFT

## Reach me
- GitHub : https://github.com/maruyamayasuaki
- Qiita  : https://qiita.com/yasu_qita
- Email  : yasuuuuu0898@gmail.com
`;

const experienceTsx = `import type { Project } from "./types";

/**
 * Industrial AI delivered at Athena Technologies (2024-11–).
 * Each entry is one revenue-bearing engagement.
 */
export const experience: Project[] = [
${t.exp.items
  .map(
    (e, i) => `  {
    id: ${i + 1},
    title: ${JSON.stringify(e.title)},
    summary: ${JSON.stringify(e.body)},
    tags: [${e.tags.map((tag) => `"${tag}"`).join(", ")}],
    links: [${e.links.map((l) => `"${l.url}"`).join(", ")}],
  }`,
  )
  .join(",\n")}
];

export const isImpactful = (p: Project) =>
  p.tags.some((t) => ["FinTech", "HealthTech", "Manufacturing"].includes(t));
`;

const projectsJson = JSON.stringify(
  {
    featured: t.projects.items.map((p) => ({
      title: p.title,
      summary: p.body,
      stack: p.tags,
      url: p.link?.url ?? null,
    })),
    stack: stackData.reduce((acc, s) => ({ ...acc, [s.category]: s.items }), {}),
  },
  null,
  2,
);

const researchBib = researchData.papers
  .map((p, i) => {
    const title = "title" in p ? p.title : p.titleEn;
    const authors = p.authors.replace(/<\/?b>/g, "");
    return `@article{maruyama${p.year}_${i},
  title   = {${title}},
  author  = {${authors}},
  journal = {${p.journal}},
  year    = {${p.year}},
}`;
  })
  .join("\n\n");

const stackPy = `# stack.py — research + production runtime
from __future__ import annotations

LANGUAGES = ${JSON.stringify(stackData[0].items)}
ML        = ${JSON.stringify(stackData[1].items)}
WEB       = ${JSON.stringify(stackData[2].items)}
RESEARCH  = ${JSON.stringify(stackData[3].items)}

def daily() -> dict[str, list[str]]:
    """A typical workday spans these tools."""
    return {
        "morning":   ["Python", "PyTorch", "Active Learning"],
        "afternoon": ["TypeScript", "Next.js", "AWS"],
        "evening":   ["First-principles DFT", "Bayesian Opt"],
    }

if __name__ == "__main__":
    for shift, tools in daily().items():
        print(f"{shift:>9}: {', '.join(tools)}")
`;

async function buildFiles(): Promise<IdeFile[]> {
  const theme = "github-dark-default";

  const renders = await Promise.all([
    codeToHtml(aboutMd, { lang: "markdown", theme }),
    codeToHtml(experienceTsx, { lang: "tsx", theme }),
    codeToHtml(projectsJson, { lang: "json", theme }),
    codeToHtml(researchBib, { lang: "bibtex", theme }),
    codeToHtml(stackPy, { lang: "python", theme }),
  ]);

  return [
    {
      id: "about",
      label: "about.md",
      icon: "⌘",
      iconColor: "text-sky-400",
      language: "Markdown",
      highlighted: renders[0],
      raw: aboutMd,
    },
    {
      id: "experience",
      label: "experience.tsx",
      icon: "⟨⟩",
      iconColor: "text-blue-400",
      language: "TypeScript React",
      highlighted: renders[1],
      raw: experienceTsx,
    },
    {
      id: "projects",
      label: "projects.json",
      icon: "{}",
      iconColor: "text-amber-400",
      language: "JSON",
      highlighted: renders[2],
      raw: projectsJson,
    },
    {
      id: "research",
      label: "research.bib",
      icon: "Σ",
      iconColor: "text-violet-400",
      language: "BibTeX",
      highlighted: renders[3],
      raw: researchBib,
    },
    {
      id: "stack",
      label: "stack.py",
      icon: "🐍",
      iconColor: "",
      language: "Python",
      highlighted: renders[4],
      raw: stackPy,
    },
  ];
}

export default async function IDEVariant() {
  const files = await buildFiles();

  return (
    <main className="min-h-screen bg-[#1e1e1e] text-slate-200">
      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-16 pb-10">
        <header className="mb-4 flex items-baseline gap-3 flex-wrap">
          <h1 className="text-xl md:text-2xl font-semibold text-white font-mono">
            <span className="text-slate-500">~/</span>portfolio
          </h1>
          <span className="text-xs text-slate-500 font-mono">— Variant B · IDE / VSCode</span>
        </header>

        <IdeShell files={files} />

        <p className="mt-4 text-xs text-slate-500 font-mono">
          ヒント: ファイルツリーから別の「ファイル」を開いて見比べてください。
          シンタックスハイライトはビルド時に <code>shiki</code> で実行され、クライアントには文字列のみ送られます。
        </p>

        <footer className="mt-12 text-xs text-slate-500 font-mono flex justify-between border-t border-white/10 pt-4">
          <span>© 2025 Yasuaki Maruyama · Variant B</span>
          <span>
            <Link href="/" className="hover:text-cyan-400">/</Link>
            <span className="text-slate-700"> · </span>
            <Link href="/variants" className="hover:text-cyan-400">/variants</Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
