"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

type PageId = "about" | "experience" | "research" | "projects" | "stack" | "beyond";

const PAGES: { id: PageId; emoji: string; title: string }[] = [
  { id: "about", emoji: "🪪", title: "About" },
  { id: "experience", emoji: "💼", title: "Experience" },
  { id: "research", emoji: "🔬", title: "Research" },
  { id: "projects", emoji: "📦", title: "Projects" },
  { id: "stack", emoji: "🛠", title: "Stack" },
  { id: "beyond", emoji: "🎵", title: "Beyond" },
];

function Block({ children, type = "p" }: { children: React.ReactNode; type?: "p" | "h1" | "h2" | "h3" | "callout" | "quote" | "todo" | "code" | "toggle" }) {
  return (
    <div className="group relative -mx-2 px-2 py-1 hover:bg-[#2c2c30]/70 rounded transition-colors">
      <span className="absolute left-0 top-2 -translate-x-full pl-1 pr-1 opacity-0 group-hover:opacity-100 text-slate-500 text-xs cursor-grab select-none">⋮⋮</span>
      <span className="absolute left-0 top-2 -translate-x-[180%] opacity-0 group-hover:opacity-100 text-slate-500 text-xs cursor-pointer">+</span>
      {type === "p" && <p className="text-slate-200 leading-relaxed text-[15px]">{children}</p>}
      {type === "h1" && <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-1">{children}</h1>}
      {type === "h2" && <h2 className="text-2xl font-bold text-white mt-6 mb-1 border-b border-white/5 pb-1">{children}</h2>}
      {type === "h3" && <h3 className="text-lg font-semibold text-white mt-3">{children}</h3>}
      {type === "callout" && (
        <div className="flex gap-3 p-3 rounded-md bg-[#2a2a2e] border border-white/5 my-1">
          <span className="text-xl">💡</span>
          <div className="text-slate-200 text-[14px] leading-relaxed">{children}</div>
        </div>
      )}
      {type === "quote" && <blockquote className="border-l-3 border-white/40 pl-3 text-slate-300 italic">{children}</blockquote>}
      {type === "code" && (
        <pre className="bg-[#1f1f22] border border-white/5 rounded-md p-3 text-xs text-emerald-300 font-mono overflow-x-auto">
          {children}
        </pre>
      )}
    </div>
  );
}

function Toggle({ summary, children, defaultOpen = false }: { summary: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="group relative -mx-2 px-2 py-1 hover:bg-[#2c2c30]/70 rounded">
      <button onClick={() => setOpen(!open)} className="flex items-start gap-1.5 w-full text-left">
        <span className={`text-slate-400 text-xs mt-1 transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
        <span className="text-slate-200 text-[15px]">{summary}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden ml-4 mt-1 border-l border-white/10 pl-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageContent({ page }: { page: PageId }) {
  if (page === "about") {
    return (
      <>
        <Block type="h1">🪪 About me</Block>
        <Block type="callout">
          {t.hero.lead}
        </Block>
        <Block type="p">{t.about.sub}</Block>
        <Block type="h2">プロフィール</Block>
        {t.about.cards.map((c) => (
          <Toggle key={c.title} summary={<><b>{c.title}</b>　— {c.body.slice(0, 30)}…</>}>
            <Block type="p">{c.body}</Block>
          </Toggle>
        ))}
      </>
    );
  }
  if (page === "experience") {
    return (
      <>
        <Block type="h1">💼 Experience</Block>
        <Block type="quote">{t.exp.sub}</Block>
        {t.exp.items.map((e, i) => (
          <Toggle key={e.title} defaultOpen={i === 0} summary={<><b>{e.title}</b>　<span className="text-slate-500 text-xs">/ {e.tags.join(" · ")}</span></>}>
            <Block type="p">{e.body}</Block>
            {e.links.length > 0 && (
              <Block type="p">
                {e.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-cyan-300 underline-offset-4 hover:underline mr-3">
                    {l.label.replace(" →", "")} ↗
                  </a>
                ))}
              </Block>
            )}
          </Toggle>
        ))}
      </>
    );
  }
  if (page === "research") {
    return (
      <>
        <Block type="h1">🔬 Research</Block>
        <Block type="callout">{translations.ja.research.sub}</Block>
        <Block type="h2">📚 Papers</Block>
        {researchData.papers.map((p, i) => {
          const title = "title" in p ? p.title : p.titleEn;
          return (
            <Toggle key={i} summary={<><b>{title}</b></>} defaultOpen={i === 0}>
              <Block type="p"><span dangerouslySetInnerHTML={{ __html: p.authors }} /></Block>
              <Block type="p"><i>{p.journal} · {p.year}</i></Block>
            </Toggle>
          );
        })}
        <Block type="h2">🎤 Conferences</Block>
        {researchData.conferences.map((c, i) => {
          const title = "title" in c ? c.title : c.titleJa;
          return (
            <Block key={i}>
              · <span className="text-cyan-300">[{c.type}]</span> <b>{title}</b>{c.award && " ⭐"}<br />
              <span className="text-slate-500 text-sm">　{c.venue} · {c.date}</span>
            </Block>
          );
        })}
      </>
    );
  }
  if (page === "projects") {
    return (
      <>
        <Block type="h1">📦 Projects (database view)</Block>
        <div className="rounded-md border border-white/10 overflow-hidden mt-3">
          <table className="w-full text-sm">
            <thead className="bg-[#2a2a2e]">
              <tr>
                <th className="p-2 text-left text-slate-400 font-medium text-xs uppercase tracking-wider">Aa Name</th>
                <th className="p-2 text-left text-slate-400 font-medium text-xs uppercase tracking-wider">⊟ Stack</th>
                <th className="p-2 text-left text-slate-400 font-medium text-xs uppercase tracking-wider">↗ Link</th>
              </tr>
            </thead>
            <tbody>
              {t.projects.items.map((p) => (
                <tr key={p.title} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="p-2 text-white"><b>{p.title}</b><div className="text-slate-400 text-xs mt-0.5">{p.body}</div></td>
                  <td className="p-2 align-top">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-200 border border-cyan-500/20">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2 align-top text-xs">
                    {p.link ? <a href={p.link.url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{p.link.label.replace(" →", "")} ↗</a> : <span className="text-slate-500">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  if (page === "stack") {
    return (
      <>
        <Block type="h1">🛠 Stack</Block>
        <Block type="callout">{t.stack.sub}</Block>
        {stackData.map((s) => (
          <div key={s.category} className="mt-4">
            <Block type="h3">{s.category}</Block>
            <div className="flex flex-wrap gap-1.5 px-2 py-1">
              {s.items.map((it) => (
                <span key={it} className="px-2 py-0.5 rounded text-xs font-mono bg-[#2a2a2e] border border-white/10 text-slate-200">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
  // beyond
  return (
    <>
      <Block type="h1">🎵 Beyond Engineering</Block>
      <Block type="quote">{t.beyond.sub}</Block>
      <ul className="space-y-2 px-2">
        {t.beyond.items.map((b) => (
          <li key={b.title} className="text-slate-200">
            <span className="mr-2">{b.icon}</span>
            <b>{b.title}.</b> {b.body}
            {b.link && <> <a href={b.link.url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline ml-1">↗</a></>}
          </li>
        ))}
      </ul>
    </>
  );
}

function SlashHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      className="mt-6 -mx-2 px-2 py-1 text-slate-600 text-[15px] flex items-center gap-2"
    >
      <span className="w-px h-4 bg-cyan-300 animate-pulse" />
      Type <span className="px-1.5 py-0.5 rounded bg-[#2a2a2e] border border-white/10 text-slate-400 font-mono text-xs">/</span> for blocks…
    </motion.div>
  );
}

export default function NotionVariant() {
  const [active, setActive] = useState<PageId>("about");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="min-h-screen bg-[#191919] text-slate-200 flex">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="bg-[#202020] border-r border-white/5 flex-shrink-0 overflow-hidden"
          >
            <div className="w-[240px] py-4 px-2 text-sm pt-16">
              <div className="px-2 py-1 flex items-center gap-2 hover:bg-white/5 rounded text-slate-300 text-xs font-semibold">
                <span className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">YM</span>
                Yasuaki&apos;s Workspace
              </div>
              <div className="mt-4 space-y-0.5">
                <p className="px-2 text-[10px] text-slate-500 uppercase tracking-wider">Pages</p>
                {PAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    className={`w-full text-left px-2 py-1 rounded text-[13px] flex items-center gap-2 transition-colors ${
                      active === p.id ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{p.emoji}</span>
                    <span>{p.title}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 px-2 text-[11px] text-slate-500">
                <p>+ Add a page</p>
                <p className="mt-1">+ New database</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-4 py-2 border-b border-white/5 text-xs text-slate-400 pt-4 mt-12 md:mt-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:text-white px-2 py-0.5 rounded hover:bg-white/5">≡</button>
          <span className="text-slate-500">/</span>
          <span>Yasuaki&apos;s Workspace</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-200">{PAGES.find((p) => p.id === active)?.title}</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-emerald-400">●</span>
            <span>Edited just now</span>
            <Link href="/variants" className="ml-3 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10">← variants</Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <article className="max-w-3xl mx-auto px-8 py-12">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PageContent page={active} />
              <SlashHint />
            </motion.div>
          </article>
        </div>
      </div>
    </main>
  );
}
