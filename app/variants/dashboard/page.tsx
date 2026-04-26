import Link from "next/link";
import { translations, researchData, stackData } from "@/lib/i18n";
import githubStats from "@/lib/github-stats.json";
import LangDonut from "@/components/variants/dashboard/LangDonut";
import Heatmap from "@/components/variants/dashboard/Heatmap";
import SkillRadar from "@/components/variants/dashboard/SkillRadar";
import BibtexButton from "@/components/variants/dashboard/BibtexButton";

export const metadata = {
  title: "Dashboard Variant — Yasuaki Maruyama",
  description: "GitHub-style data dashboard variant.",
};

const t = translations.ja;

const skills = [
  { label: "Python", value: 92 },
  { label: "ML/AI", value: 88 },
  { label: "TS/Next", value: 80 },
  { label: "DFT", value: 78 },
  { label: "Bayes Opt", value: 85 },
  { label: "Cloud", value: 70 },
  { label: "Writing", value: 75 },
];

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toISOString().slice(0, 10);
}

function bibtexFor(p: typeof researchData.papers[number], i: number) {
  const title = "title" in p ? p.title : p.titleEn;
  const authors = p.authors.replace(/<\/?b>/g, "");
  return `@article{maruyama${p.year}_${i},
  title   = {${title}},
  author  = {${authors}},
  journal = {${p.journal}},
  year    = {${p.year}},
}`;
}

export default function DashboardVariant() {
  const langs = githubStats.languages as Record<string, number>;
  const totalRepos = githubStats.totals.repos;
  const totalStars = githubStats.totals.stars;
  const featured = githubStats.featured as Array<{
    name: string;
    description: string | null;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    updated: string | null;
    topics: string[];
  }>;

  return (
    <main className="min-h-screen bg-[#0d1117] text-slate-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-14">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-cyan-500/40 bg-slate-800 flex-shrink-0">
              {githubStats.user.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={githubStats.user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {githubStats.user.name || "Yasuaki Maruyama"}
                <span className="ml-2 text-slate-500 font-normal text-base">@{githubStats.user.login}</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">{t.hero.kicker}</p>
              <p className="text-xs text-slate-500 mt-1">
                {githubStats.user.bio || "Bridging materials science and AI."}
              </p>
            </div>
          </div>
          <div className="md:ml-auto flex gap-6 text-sm">
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">{totalRepos}</div>
              <div className="text-xs text-slate-400">repos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">{totalStars}</div>
              <div className="text-xs text-slate-400">★ stars</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">{githubStats.user.followers}</div>
              <div className="text-xs text-slate-400">followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">{researchData.papers.length}</div>
              <div className="text-xs text-slate-400">papers</div>
            </div>
          </div>
        </header>

        {/* Top row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
          <div className="lg:col-span-2 rounded-lg border border-white/10 bg-[#161b22] p-5">
            <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-emerald-400">●</span> Contribution heatmap
            </h2>
            <Heatmap />
          </div>
          <div className="rounded-lg border border-white/10 bg-[#161b22] p-5">
            <h2 className="text-sm font-semibold text-slate-200 mb-4">Top languages</h2>
            <LangDonut data={langs} />
          </div>
        </section>

        {/* Repos + Radar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2 rounded-lg border border-white/10 bg-[#161b22] p-5">
            <h2 className="text-sm font-semibold text-slate-200 mb-3">Pinned repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featured.slice(0, 6).map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-md border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-cyan-300 font-semibold text-sm truncate">{r.name}</span>
                    <span className="text-[10px] text-slate-500 tabular-nums whitespace-nowrap">
                      ★ {r.stars} · ⑂ {r.forks}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-[2.4em]">
                    {r.description || "—"}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                    {r.language && <span>● {r.language}</span>}
                    <span>updated {fmtDate(r.updated)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#161b22] p-5 flex flex-col items-center">
            <h2 className="text-sm font-semibold text-slate-200 mb-3 self-start">Skill radar</h2>
            <SkillRadar skills={skills} />
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-400 w-full">
              {stackData.flatMap((s) => s.items).slice(0, 12).map((it) => (
                <div key={it} className="flex items-center gap-1">
                  <span className="text-cyan-400">●</span> {it}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience timeline */}
        <section className="mt-5 rounded-lg border border-white/10 bg-[#161b22] p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Experience @ Athena Technologies</h2>
          <ol className="relative border-l border-cyan-500/30 ml-2">
            {t.exp.items.map((e, i) => (
              <li key={e.title} className="ml-6 pb-5 last:pb-0">
                <span className="absolute -left-[7px] mt-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
                <p className="text-[10px] uppercase tracking-wider text-cyan-300">{`#${i + 1}`}</p>
                <h3 className="text-white font-semibold text-sm mt-0.5">{e.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mt-1">{e.body}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {e.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Papers with BibTeX */}
        <section className="mt-5 rounded-lg border border-white/10 bg-[#161b22] p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Publications</h2>
          <ul className="space-y-3">
            {researchData.papers.map((p, i) => {
              const title = "title" in p ? p.title : p.titleEn;
              return (
                <li key={i} className="border-l-2 border-purple-500/40 pl-3">
                  <div className="flex items-start gap-2 justify-between">
                    <p className="text-white text-sm">{title}</p>
                    <BibtexButton bibtex={bibtexFor(p, i)} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1" dangerouslySetInnerHTML={{ __html: p.authors }} />
                  <p className="text-[10px] text-slate-500 mt-0.5 italic">
                    {p.journal} · {p.year}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="mt-10 flex justify-between text-xs text-slate-500 border-t border-white/10 pt-4">
          <span>
            Generated{" "}
            {githubStats.generatedAt ? fmtDate(githubStats.generatedAt) : "—"} · Variant C
          </span>
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
