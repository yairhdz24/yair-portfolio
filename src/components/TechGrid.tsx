"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiSupabase, SiPostgresql, SiN8N, SiVercel, SiCloudflare, SiOpenai,
  SiGit, SiStripe, SiDocker, SiFigma, SiGithub, SiLinux, SiPrisma,
  SiAnthropic,
} from "react-icons/si";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

const techItems = [
  { icon: SiReact, name: "React", color: "#61dafb" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
  { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
  { icon: SiN8N, name: "n8n", color: "#ea4b71" },
  { icon: SiVercel, name: "Vercel", color: "#000000" },
  { icon: SiCloudflare, name: "Cloudflare", color: "#f38020" },
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f" },
  { icon: SiAnthropic, name: "Claude", color: "#D97757" },
  { icon: SiStripe, name: "Stripe", color: "#635bff" },
  { icon: SiGit, name: "Git", color: "#f05032" },
  { icon: SiDocker, name: "Docker", color: "#2496ed" },
  { icon: SiFigma, name: "Figma", color: "#a259ff" },
  { icon: SiGithub, name: "GitHub", color: "#181717" },
  { icon: SiLinux, name: "Linux", color: "#FCC624" },
];

const rows = [
  techItems.slice(0, 7),
  techItems.slice(7, 14),
  techItems.slice(14),
];

export default function TechGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Scroll-driven horizontal parallax for rows
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const row0X = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const row1X = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const row2X = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rowXValues = [row0X, row1X, row2X];

  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos((prev) => ({ ...prev, visible: false }));
  }, []);

  const getColor = (color: string) => {
    if (!isDark) return color;
    if (color === "#000000" || color === "#181717" || color === "#2D3748") return "#ffffff";
    return color;
  };

  return (
    <section className="relative py-12 md:py-16 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6"
              style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
            >
              {t.about.stack}
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "var(--text-faint)" }}
            >
              {lang === "es"
                ? "Funciona con tu stack actual, donde sea que despliegues. Next.js en Vercel, automatizaciones con n8n, bases de datos en Supabase. Tu elección de frameworks y herramientas — todo se conecta."
                : "Works with your existing stack, wherever you deploy. Next.js on Vercel, automations with n8n, databases on Supabase. Your choice of frameworks and tools — they all just connect."}
            </p>
          </motion.div>

          {/* Right: Staggered icon grid */}
          <div
            ref={gridRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cursor-following glow — green in dark, blue in light */}
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: glowPos.x,
                top: glowPos.y,
                width: 350,
                height: 350,
                opacity: glowPos.visible ? 1 : 0,
                background: isDark
                  ? "radial-gradient(circle, rgba(212,160,83,0.12) 0%, rgba(212,160,83,0.03) 40%, transparent 70%)"
                  : "radial-gradient(circle, rgba(184,134,11,0.10) 0%, rgba(184,134,11,0.02) 40%, transparent 70%)",
                transition: "left 0.1s ease-out, top 0.1s ease-out, opacity 0.3s ease",
                zIndex: 0,
              }}
            />

            <div className="flex flex-col gap-2.5 relative z-10">
              {rows.map((row, rowIdx) => (
                <motion.div
                  key={rowIdx}
                  className="flex gap-2.5 justify-center"
                  style={{
                    paddingLeft: rowIdx === 1 ? "40px" : "0",
                    x: rowXValues[rowIdx],
                  }}
                >
                  {row.map((tech, colIdx) => {
                    const c = getColor(tech.color);
                    const delay = 0.04 * (rowIdx * 7 + colIdx);
                    return (
                      <motion.div
                        key={tech.name}
                        className="group relative aspect-square flex items-center justify-center rounded-2xl cursor-default"
                        style={{
                          width: 76,
                          height: 76,
                          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay, duration: 0.4, ease: "easeOut" }}
                        whileHover={{
                          y: -8,
                          scale: 1.1,
                          transition: { duration: 0.25, ease: "easeOut" },
                        }}
                      >
                        {/* Glow border + shadow on CARD hover */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                          style={{
                            border: `1px solid ${c}60`,
                            boxShadow: `0 0 25px ${c}30, 0 8px 16px rgba(0,0,0,0.12)`,
                          }}
                        />
                        {/* Icon — activates color on CARD hover, not just icon hover */}
                        <tech.icon
                          className="text-[26px] transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110"
                          style={{ color: c }}
                        />
                        {/* Tech name tooltip on hover */}
                        <div
                          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
                          style={{ color: c }}
                        >
                          {tech.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
