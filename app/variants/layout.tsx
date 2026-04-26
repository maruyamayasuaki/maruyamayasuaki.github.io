import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Variants | Yasuaki Maruyama",
  description: "Five candidate redesigns of the portfolio site, side by side.",
};

export default function VariantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-3 left-3 z-50 flex gap-2 text-xs">
        <Link
          href="/variants"
          className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-white/15 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
        >
          ← Variants
        </Link>
        <Link
          href="/"
          className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-white/15 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
        >
          Original /
        </Link>
      </div>
      {children}
    </div>
  );
}
