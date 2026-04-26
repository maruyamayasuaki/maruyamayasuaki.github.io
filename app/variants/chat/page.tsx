"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { translations, researchData, stackData } from "@/lib/i18n";

const t = translations.ja;

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; streaming: boolean };

const SYSTEM_INTRO = `こんにちは。Yasuaki Maruyama のポートフォリオエージェントです。研究・職務・プロジェクト・スキル・連絡先について何でも聞いてください。`;

const SUGGESTIONS = [
  "研究テーマを 1 文で要約して",
  "Athena Tech では何をしている？",
  "スタックを技術カテゴリ別に教えて",
  "発表論文を 3 つ挙げて",
  "趣味は？",
  "コンタクトしたい",
];

function answerFor(q: string): string {
  const lc = q.toLowerCase();

  if (/研究|research|materials|dft|active|bayes|ベイズ|能動|ひずみ|strain/.test(q + lc)) {
    return `研究テーマは **Materials Informatics × Machine Learning** です。具体的には:

\`\`\`
- 第一原理計算 (DFT, VASP) で物性を計算
- ベイズ最適化 + 能動学習で六次元ひずみ空間 ε ∈ ℝ⁶ を探索
- 強誘電体 PbTiO₃ のひずみ最適化を加速
- ${researchData.papers.length} 報の査読論文 (Best Presentation Award 受賞)
\`\`\`

KU Joint-Symposium 2025 で **Best Presentation Award** を受賞しました。`;
  }

  if (/athena|職務|仕事|work|job|llm|rag|fintech|金融|医療|製造/.test(q + lc)) {
    return `**Athena Technologies** で ML エンジニアとして 2024 年 11 月から働いています。3 つの主要案件:

${t.exp.items
  .map(
    (e, i) =>
      `${i + 1}. **${e.title}**
${e.body}
\`${e.tags.join("\` \`")}\``,
  )
  .join("\n\n")}

すべて産業 AI のプロダクション投入です。`;
  }

  if (/stack|スタック|技術|tech|skill|ツール/.test(q + lc)) {
    return `フルスタックで研究 + プロダクトを実装します:

${stackData
  .map((s) => `- **${s.category}**: ${s.items.join(", ")}`)
  .join("\n")}

研究は Python + 数値計算系、プロダクトは TypeScript / Ruby / Kotlin のクロスドメインです。`;
  }

  if (/論文|paper|publication|発表|talk|conference/.test(q + lc)) {
    return `主要な論文:

${researchData.papers
  .slice(0, 3)
  .map((p, i) => {
    const title = "title" in p ? p.title : p.titleEn;
    return `${i + 1}. *${title}*
   ${p.authors.replace(/<\/?b>/g, "")}
   ${p.journal} (${p.year})`;
  })
  .join("\n\n")}

学会発表は ${researchData.conferences.length} 件 (国内・国際, oral / poster)。`;
  }

  if (/趣味|hobby|beyond|side|楽器|マラソン|執筆/.test(q + lc)) {
    return `エンジニアリング以外の活動:

${t.beyond.items.map((b) => `- ${b.icon} **${b.title}**: ${b.body}`).join("\n")}

実装と研究に偏りすぎないバランスを意識しています。`;
  }

  if (/contact|連絡|hire|採用|email|メール|声をかけ/.test(q + lc)) {
    return `お気軽に:

- 📧 [yasuuuuu0898@gmail.com](mailto:yasuuuuu0898@gmail.com)
- 🐙 [github.com/maruyamayasuaki](https://github.com/maruyamayasuaki)
- ✍️ [qiita.com/yasu_qita](https://qiita.com/yasu_qita)

研究共同・採用相談・技術相談など、いずれも歓迎です。`;
  }

  if (/プロジェクト|project|side|github|オープンソース/.test(q + lc)) {
    return `主な個人プロジェクト:

${t.projects.items.map((p) => `- **${p.title}** (${p.tags.join(", ")}) — ${p.body}`).join("\n")}`;
  }

  if (/who|だれ|誰|name|about|自己/.test(q + lc)) {
    return `**${t.hero.name}** — ${t.hero.kicker}。

${t.hero.lead}

京都大学大学院工学研究科 博士課程 1 年。Athena Technologies で産業 AI を開発しています。`;
  }

  return `その質問は手元の知識からは外れていそうです。代わりに以下が答えられます:

- 研究テーマ・論文
- Athena Technologies での職務
- 技術スタック
- 個人プロジェクト
- 趣味
- コンタクト方法

該当しそうなものがあれば日本語/English どちらでも投げてください。`;
}

function StreamingText({ text, onDone }: { text: string; onDone: () => void }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += Math.max(1, Math.round(2 + Math.random() * 4));
      if (i >= text.length) {
        setShown(text);
        clearInterval(id);
        onDone();
      } else {
        setShown(text.slice(0, i));
      }
    }, 18);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span>{shown}</span>;
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let codeBuf: string[] | null = null;
  let listBuf: string[] | null = null;

  function flushCode(key: number) {
    if (!codeBuf) return;
    out.push(
      <pre key={`c${key}`} className="bg-black/60 border border-white/10 rounded-md p-3 my-2 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
        {codeBuf.join("\n")}
      </pre>,
    );
    codeBuf = null;
  }
  function flushList(key: number) {
    if (!listBuf) return;
    out.push(
      <ul key={`l${key}`} className="list-disc list-inside space-y-1 my-2 text-slate-200">
        {listBuf.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
        ))}
      </ul>,
    );
    listBuf = null;
  }

  function inlineMd(s: string) {
    return s
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-white/10 text-cyan-200 font-mono text-[0.85em]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-cyan-300 underline-offset-4 hover:underline">$1</a>');
  }

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (codeBuf) flushCode(i);
      else codeBuf = [];
      return;
    }
    if (codeBuf) {
      codeBuf.push(line);
      return;
    }
    if (/^\s*[-•]\s+/.test(line)) {
      if (!listBuf) listBuf = [];
      listBuf.push(line.replace(/^\s*[-•]\s+/, ""));
      return;
    }
    if (listBuf) flushList(i);
    if (/^\d+\.\s+/.test(line)) {
      out.push(
        <p key={i} className="text-slate-200 mb-1.5" dangerouslySetInnerHTML={{ __html: inlineMd(line) }} />,
      );
      return;
    }
    if (line.trim() === "") {
      out.push(<div key={i} className="h-2" />);
      return;
    }
    out.push(
      <p key={i} className="text-slate-200 leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: inlineMd(line) }} />,
    );
  });
  flushCode(9999);
  flushList(9998);
  return out;
}

function MessageBubble({ msg, onStreamingDone }: { msg: Msg; onStreamingDone: (id: string) => void }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-cyan-600/30 border border-cyan-500/30 px-4 py-2 text-sm text-cyan-50">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        YM
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3 text-sm leading-relaxed flex-1">
        {msg.streaming ? (
          <StreamingText text={msg.text} onDone={() => onStreamingDone(msg.id)} />
        ) : (
          renderMarkdown(msg.text)
        )}
        {msg.streaming && <span className="inline-block w-1.5 h-4 align-middle bg-cyan-300 animate-pulse ml-0.5" />}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">YM</div>
      <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3 flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export default function ChatVariant() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "intro", role: "assistant", text: SYSTEM_INTRO, streaming: false },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const reply = answerFor(trimmed);
      setMessages((m) => [...m, { id: `a${Date.now()}`, role: "assistant", text: reply, streaming: true }]);
    }, 700 + Math.random() * 400);
  }

  function streamingDone(id: string) {
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, streaming: false } : msg)));
  }

  return (
    <main className="min-h-screen bg-[#0a0a10] text-slate-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-black/40 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">YM</div>
          <div>
            <h1 className="text-sm font-semibold text-white">Ask Yasuaki</h1>
            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              portfolio-agent · v0.1 · static knowledge
            </p>
          </div>
        </div>
        <Link href="/variants" className="text-xs text-slate-400 hover:text-cyan-300">← variants</Link>
      </header>

      {/* Conversation */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <MessageBubble msg={m} onStreamingDone={streamingDone} />
              </motion.div>
            ))}
          </AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <ThinkingDots />
            </motion.div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 md:px-8 pb-3">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur px-4 md:px-8 py-3">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-2 focus-within:border-cyan-500/50 transition-colors"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Yasuaki…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500"
              disabled={thinking}
            />
            <button
              type="submit"
              disabled={thinking || !input.trim()}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send ↗
            </button>
          </form>
          <p className="text-[10px] text-slate-500 mt-2 font-mono text-center">
            ⓘ static knowledge base · responses generated client-side from canned prompts · variant O
          </p>
        </div>
      </div>
    </main>
  );
}
