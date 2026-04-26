"use client";

import { useState } from "react";

export type IdeFile = {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  language: string;
  highlighted: string;
  raw: string;
};

export default function IdeShell({ files }: { files: IdeFile[] }) {
  const [activeId, setActiveId] = useState(files[0].id);
  const [openTabs, setOpenTabs] = useState<string[]>([files[0].id]);
  const [explorerOpen, setExplorerOpen] = useState(true);

  const active = files.find((f) => f.id === activeId)!;
  const lineCount = active.raw.split("\n").length;

  function open(id: string) {
    setActiveId(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }
  function close(id: string) {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (next.length === 0) return [files[0].id];
      if (id === activeId) setActiveId(next[next.length - 1]);
      return next;
    });
  }

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e] text-slate-200 font-mono text-[13px] flex flex-col h-[80vh] shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#3c3c3c] border-b border-black/40">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="text-xs text-slate-300">portfolio — Visual Studio Code</div>
        <button
          className="md:hidden text-xs text-slate-400 hover:text-white"
          onClick={() => setExplorerOpen((v) => !v)}
        >
          {explorerOpen ? "Hide" : "Show"} Explorer
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Activity bar */}
        <div className="hidden sm:flex w-12 bg-[#333333] border-r border-black/40 flex-col items-center py-3 gap-4 text-slate-400 text-lg">
          <span title="Explorer" className="text-white">▤</span>
          <span title="Search">⌕</span>
          <span title="Source Control">⑂</span>
          <span title="Run">▷</span>
          <span title="Extensions">▦</span>
        </div>

        {/* Explorer */}
        {explorerOpen && (
          <aside className="w-56 bg-[#252526] border-r border-black/40 text-[12px] py-2 flex-shrink-0 overflow-y-auto">
            <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400">Explorer</div>
            <div className="px-3 py-0.5 text-slate-200 font-semibold">▾ PORTFOLIO</div>
            <ul className="text-slate-300">
              {files.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => open(f.id)}
                    className={`w-full text-left flex items-center gap-1.5 px-6 py-1 hover:bg-white/5 ${
                      activeId === f.id ? "bg-white/10 text-white" : ""
                    }`}
                  >
                    <span className={f.iconColor}>{f.icon}</span>
                    <span>{f.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Editor area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex bg-[#2d2d2d] border-b border-black/40 overflow-x-auto">
            {openTabs.map((id) => {
              const f = files.find((x) => x.id === id)!;
              const isActive = id === activeId;
              return (
                <div
                  key={id}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs border-r border-black/40 cursor-pointer min-w-fit ${
                    isActive ? "bg-[#1e1e1e] text-white" : "text-slate-400 hover:bg-white/5"
                  }`}
                  onClick={() => setActiveId(id)}
                >
                  <span className={f.iconColor}>{f.icon}</span>
                  <span className="whitespace-nowrap">{f.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      close(id);
                    }}
                    className="ml-1 text-slate-500 hover:text-white"
                    aria-label={`Close ${f.label}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-auto">
            <div
              className="ide-shiki text-[13px] leading-6"
              dangerouslySetInnerHTML={{ __html: active.highlighted }}
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] font-sans">
        <div className="flex items-center gap-3">
          <span>⑂ claude/review-implementation-design-xYJpv</span>
          <span className="opacity-80">↻ 0 ↑ 0</span>
          <span className="opacity-80">⚠ 0  ⓧ 0</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>{active.language}</span>
          <span>{lineCount} L</span>
        </div>
      </div>
    </div>
  );
}
