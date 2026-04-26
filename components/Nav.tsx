"use client";
import { useState, useEffect } from "react";
import { type Lang, translations } from "@/lib/i18n";

export default function Nav({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#about", label: t.about },
    { href: "#experience", label: t.exp },
    { href: "#research", label: t.research },
    { href: "#projects", label: t.projects },
    { href: "#beyond", label: t.beyond },
    { href: "#contact", label: t.contact },
  ];

  return (
    <nav
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <span className="font-bold text-white tracking-tight">Yasuaki Maruyama</span>
      <div className="flex items-center gap-5">
        <div className="hidden md:flex gap-5 text-sm text-slate-300">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          onClick={onToggle}
          className="text-xs px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
        >
          {lang === "ja" ? "EN" : "JA"}
        </button>
      </div>
    </nav>
  );
}
