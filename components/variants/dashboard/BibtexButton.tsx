"use client";

import { useState } from "react";

export default function BibtexButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
      aria-label="Copy BibTeX"
    >
      {copied ? "✓ copied" : "BibTeX"}
    </button>
  );
}
