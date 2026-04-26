"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

type Line =
  | { kind: "prompt"; cmd: string }
  | { kind: "out"; text: string }
  | { kind: "ascii"; text: string };

const t = translations.ja;

function buildScript(): Line[] {
  const lines: Line[] = [
    { kind: "ascii", text: "  ___                       _    _ \n / __|___ _ _ __ _ ___ _ _ | | _(_)\n \\__ \\ -_) '_/ _` / -_) ' \\| |/ / |\n |___/___|_| \\__,_\\___|_||_|_|\\_\\_|" },
    { kind: "out", text: "Welcome. Last login: Sat 26 Apr 2026 from 192.0.2.42" },
    { kind: "prompt", cmd: "whoami" },
    { kind: "out", text: `${t.hero.name} — ${t.hero.kicker}` },
    { kind: "prompt", cmd: "cat about.md" },
    { kind: "out", text: t.hero.lead },
    { kind: "prompt", cmd: "ls experience/" },
    {
      kind: "out",
      text: t.exp.items.map((e, i) => `  ${String(i + 1).padStart(2, "0")}_${e.title.replace(/\s+/g, "_")}`).join("\n"),
    },
    { kind: "prompt", cmd: "head -n 1 research/papers.bib" },
    {
      kind: "out",
      text: researchData.papers
        .map((p) => `@article{${"title" in p ? p.title : p.titleEn}, year={${p.year}}, journal={${p.journal}}}`)
        .join("\n"),
    },
    { kind: "prompt", cmd: "ls projects/" },
    {
      kind: "out",
      text: t.projects.items.map((p) => `  ${p.title.toLowerCase().replace(/\s+/g, "-")}/`).join("\n"),
    },
    { kind: "prompt", cmd: "stack --tree" },
    {
      kind: "out",
      text: stackData.map((s) => `${s.category}\n` + s.items.map((i) => `  ├─ ${i}`).join("\n")).join("\n"),
    },
  ];
  return lines;
}

const PROMPT_PREFIX = "yasuaki@kyoto-u";

export default function Terminal() {
  const script = useMemo(() => buildScript(), []);
  const [renderedLines, setRenderedLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<{ idx: number; col: number } | null>({ idx: 0, col: 0 });
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!typing) return;
    const line = script[typing.idx];
    const targetText = line.kind === "prompt" ? line.cmd : line.text;
    const speed = line.kind === "prompt" ? 55 : 8;
    const pause = line.kind === "prompt" ? 320 : 120;

    if (typing.col < targetText.length) {
      const tm = setTimeout(() => setTyping({ idx: typing.idx, col: typing.col + 1 }), speed);
      return () => clearTimeout(tm);
    }

    const tm = setTimeout(() => {
      setRenderedLines((prev) => [...prev, line]);
      const next = typing.idx + 1;
      if (next >= script.length) {
        setTyping(null);
        setDone(true);
      } else {
        setTyping({ idx: next, col: 0 });
      }
    }, pause);
    return () => clearTimeout(tm);
  }, [typing, script]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [renderedLines, typing]);

  function renderLine(line: Line, key: number) {
    if (line.kind === "prompt") {
      return (
        <div key={key} className="text-emerald-300">
          <span className="text-amber-300">{PROMPT_PREFIX}</span>
          <span className="text-slate-500">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-slate-500">$ </span>
          <span className="text-slate-100">{line.cmd}</span>
        </div>
      );
    }
    if (line.kind === "ascii") {
      return (
        <pre key={key} className="text-emerald-400/90 whitespace-pre">{line.text}</pre>
      );
    }
    return (
      <pre key={key} className="text-slate-300 whitespace-pre-wrap">{line.text}</pre>
    );
  }

  function renderTyping() {
    if (!typing) return null;
    const line = script[typing.idx];
    const text = line.kind === "prompt" ? line.cmd : line.text;
    const visible = text.slice(0, typing.col);
    if (line.kind === "prompt") {
      return (
        <div className="text-emerald-300">
          <span className="text-amber-300">{PROMPT_PREFIX}</span>
          <span className="text-slate-500">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-slate-500">$ </span>
          <span className="text-slate-100">{visible}</span>
          <span className="ml-0.5 inline-block w-2 h-4 bg-emerald-300 align-middle animate-pulse" />
        </div>
      );
    }
    if (line.kind === "ascii") {
      return <pre className="text-emerald-400/90 whitespace-pre">{visible}</pre>;
    }
    return <pre className="text-slate-300 whitespace-pre-wrap">{visible}</pre>;
  }

  return (
    <div
      ref={scrollRef}
      className="font-mono text-sm bg-black/80 border border-emerald-500/30 rounded-lg shadow-[0_0_60px_rgba(16,185,129,0.08)] backdrop-blur-sm h-[70vh] md:h-[78vh] overflow-y-auto"
    >
      <div className="sticky top-0 flex items-center gap-2 bg-black/90 border-b border-emerald-500/20 px-3 py-2 text-xs text-slate-500">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-slate-400">— {PROMPT_PREFIX}: ~/portfolio —</span>
      </div>
      <div className="p-5 space-y-1.5">
        {renderedLines.map(renderLine)}
        {renderTyping()}
        {done && (
          <div className="text-emerald-300 pt-2">
            <span className="text-amber-300">{PROMPT_PREFIX}</span>
            <span className="text-slate-500">:</span>
            <span className="text-sky-400">~</span>
            <span className="text-slate-500">$ </span>
            <span className="ml-0.5 inline-block w-2 h-4 bg-emerald-300 align-middle animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
