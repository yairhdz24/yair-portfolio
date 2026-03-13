"use client";

import { SiGithub, SiLinkedin, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiSupabase, SiN8N, SiVercel } from "react-icons/si";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useLang } from "./LanguageProvider";

const techIcons = [
  { icon: SiReact, color: "#61dafb" },
  { icon: SiNextdotjs, color: "#ffffff" },
  { icon: SiTypescript, color: "#3178c6" },
  { icon: SiTailwindcss, color: "#06b6d4" },
  { icon: SiSupabase, color: "#3ecf8e" },
  { icon: SiN8N, color: "#ea4b71" },
  { icon: SiVercel, color: "#ffffff" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border-subtle)" }}>
      {/* Tech icons band */}
      <div className="py-6 px-6" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          {techIcons.map((tech, i) => (
            <tech.icon key={i} className="text-lg opacity-25 hover:opacity-60 transition-opacity duration-300 cursor-default" style={{ color: tech.color }} />
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <div>
            <p className="text-2xl font-bold mb-3" style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}>
              <span className="text-base font-light opacity-30" style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}>{"<"}</span>Yair Hernández<span className="text-base font-light opacity-30 ml-1" style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}>{"/>"}</span>
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-faint)" }}>
              {t.footer.desc}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[11px] tracking-[0.15em] uppercase font-bold mb-2" style={{ color: "var(--text-muted)" }}>{t.footer.nav}</p>
            <a href="#servicios" className="text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>{t.nav.services}</a>
            <a href="#trabajo" className="text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>{t.nav.work}</a>
            <a href="#sobre-mi" className="text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>{t.nav.about}</a>
            <a href="#contacto" className="text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>{t.nav.contact}</a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[11px] tracking-[0.15em] uppercase font-bold mb-2" style={{ color: "var(--text-muted)" }}>{t.footer.connect}</p>
            <a href="mailto:contacto@levelai.com.mx" className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>
              <HiOutlineEnvelope className="text-base" />
              contacto@levelai.com.mx
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>
              <SiGithub className="text-base" />
              GitHub
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>
              <SiLinkedin className="text-base" />
              LinkedIn
            </a>
            <a href="https://levelai.com.mx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: "var(--text-faint)" }}>
              <SiVercel className="text-base" />
              levelai.com.mx
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 py-5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            &copy; {new Date().getFullYear()} Yair Hernández. {t.footer.rights}
          </p>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            {t.footer.made}
          </p>
        </div>
      </div>
    </footer>
  );
}
