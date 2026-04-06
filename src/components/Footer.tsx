"use client";

import { SiGithub, SiLinkedin, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiSupabase, SiN8N, SiVercel, SiNodedotjs, SiPostgresql, SiOpenai, SiDocker } from "react-icons/si";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useLang } from "./LanguageProvider";
import InfiniteMarquee from "./InfiniteMarquee";

const marqueeItems = [
  { icon: SiReact, name: "React", color: "#61dafb" },
  { icon: SiNextdotjs, name: "Next.js", color: "#94a3b8" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
  { icon: SiN8N, name: "n8n", color: "#ea4b71" },
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f" },
  { icon: SiDocker, name: "Docker", color: "#2496ed" },
  { icon: SiVercel, name: "Vercel", color: "#94a3b8" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border-subtle)" }}>
      {/* Tech marquee band */}
      <div className="py-5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <InfiniteMarquee items={marqueeItems} speed={35} direction="left" separator="—" />
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
