"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HiArrowUpRight, HiArrowRight, HiXMark } from "react-icons/hi2";
import {
  SiNextdotjs, SiSupabase, SiStripe, SiN8N, SiReact, SiOpenai,
  SiTailwindcss, SiNodedotjs, SiTypescript, SiPostgresql, SiExpo,
} from "react-icons/si";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

const projectsMeta = [
  {
    icons: [
      { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
      { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
      { icon: SiStripe, name: "Stripe", color: "#635bff" },
      { icon: SiN8N, name: "n8n", color: "#ea4b71" },
    ],
    accent: "#D4A053",
    year: "2025",
    image: "/projects/saas-platform.png",
    detailEs: "Plataforma SaaS multi-tenant con billing automatizado vía Stripe, dashboards en tiempo real, autenticación robusta y flujos de automatización con n8n integrados.",
    detailEn: "Multi-tenant SaaS platform with automated billing via Stripe, real-time dashboards, robust authentication and integrated n8n automation flows.",
  },
  {
    icons: [
      { icon: SiReact, name: "React", color: "#61dafb" },
      { icon: SiStripe, name: "Stripe", color: "#635bff" },
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
    ],
    accent: "#E87461",
    year: "2024",
    image: "/projects/ecommerce.png",
    detailEs: "E-Commerce premium con catálogo de 10K+ productos, checkout optimizado, analytics avanzados de conversión y pasarela de pagos integrada con Stripe.",
    detailEn: "Premium e-commerce with 10K+ product catalog, optimized checkout, advanced conversion analytics and Stripe-integrated payment gateway.",
  },
  {
    icons: [
      { icon: SiN8N, name: "n8n", color: "#ea4b71" },
      { icon: SiOpenai, name: "OpenAI", color: "#10a37f" },
      { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
    ],
    accent: "#C9A96E",
    year: "2024",
    image: "/projects/crm-ai.png",
    detailEs: "CRM potenciado con IA — lead scoring automatizado, seguimiento inteligente, chatbot integrado en el sitio web y reportes predictivos que se generan solos.",
    detailEn: "AI-powered CRM — automated lead scoring, intelligent follow-up, website-integrated chatbot and predictive reports that generate themselves.",
  },
  {
    icons: [
      { icon: SiExpo, name: "Expo", color: "#000020" },
      { icon: SiReact, name: "React Native", color: "#61dafb" },
      { icon: SiTailwindcss, name: "NativeWind", color: "#06b6d4" },
      { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
    ],
    accent: "#B5838D",
    year: "2025",
    image: "/projects/mobile-app.png",
    detailEs: "App móvil nativa para iOS y Android con Expo y React Native. Autenticación biométrica, notificaciones push, modo offline y sincronización en tiempo real.",
    detailEn: "Native mobile app for iOS and Android with Expo and React Native. Biometric auth, push notifications, offline mode and real-time sync.",
  },
];

/* ─── Parallax Card ─────────────────────────────────────────────── */
function ProjectCard({
  meta,
  text,
  index,
  onOpen,
}: {
  meta: (typeof projectsMeta)[0];
  text: { readonly title: string; readonly sub: string; readonly tags: readonly string[]; readonly ml: string };
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Parallax: image moves slower than card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const accentDisplay = meta.accent;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
        onClick={onOpen}
        style={{
          background: isDark ? "rgba(30,41,59,0.4)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            boxShadow: `0 25px 60px -15px ${accentDisplay}20, inset 0 0 0 1px ${accentDisplay}15`,
          }}
        />

        {/* Image area with parallax */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <motion.div
            className="absolute inset-0 scale-110"
            style={{ y: imageY }}
          >
            {/* Gradient placeholder — replace with actual screenshots */}
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? `linear-gradient(160deg, #0F172A 0%, ${meta.accent}15 50%, #0F172A 100%)`
                  : `linear-gradient(160deg, #F8FAFC 0%, ${meta.accent}12 50%, #F8FAFC 100%)`,
              }}
            />
            {/* Dot grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            {/* Floating accent shapes */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `radial-gradient(circle, ${accentDisplay}20 0%, transparent 70%)`,
              }}
            />
            {/* Mockup browser frame hint */}
            <div className="absolute inset-6 md:inset-8 rounded-xl overflow-hidden" style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
              background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}>
              {/* Browser dots */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
              }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#D4A053" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#E87461" }} />
                <div className="ml-3 flex-1 h-4 rounded-full" style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                }} />
              </div>
              {/* Content placeholder lines */}
              <div className="p-4 space-y-2">
                <div className="h-3 rounded-full w-3/4" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }} />
                <div className="h-3 rounded-full w-1/2" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
                <div className="h-8 rounded-lg w-full mt-3" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
                <div className="flex gap-2 mt-2">
                  <div className="h-6 rounded w-1/3" style={{ background: `${accentDisplay}15` }} />
                  <div className="h-6 rounded w-1/4" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Year badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider"
              style={{
                background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
                color: "var(--text-muted)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              {meta.year}
            </span>
          </div>

          {/* Arrow on hover */}
          <div className="absolute top-4 right-4 z-10">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400"
              style={{
                background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <HiArrowUpRight className="text-xs" style={{ color: accentDisplay }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {text.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.1em] uppercase font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  color: accentDisplay,
                  background: `${accentDisplay}08`,
                  border: `1px solid ${accentDisplay}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:translate-x-1 transition-transform duration-300"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {text.title}
          </h3>

          {/* Short desc */}
          <p
            className="text-sm leading-relaxed mb-5 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {text.sub}
          </p>

          {/* Tech icons */}
          <div className="flex items-center gap-2">
            {meta.icons.map((item) => {
              const c = isDark ? item.color : (item.color === "#ffffff" || item.color === "#000020" ? "var(--text-faint)" : item.color);
              return (
                <div
                  key={item.name}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  title={item.name}
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                  }}
                >
                  <item.icon className="text-xs" style={{ color: c }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ─────────────────────────────────────────── */
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="trabajo" className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={headerRef}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <motion.span
              className="text-xs tracking-[0.25em] uppercase mb-3 block font-bold"
              style={{ color: "var(--accent-1)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {t.projects.label}
            </motion.span>
            <motion.h2
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t.projects.t1}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t.projects.t2}
              </span>
            </motion.h2>
          </div>
          <motion.p
            className="text-sm md:text-base max-w-sm leading-relaxed"
            style={{ color: "var(--text-faint)" }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.projects.sub}
          </motion.p>
        </div>

        {/* Bento grid — first project large, rest smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projectsMeta.map((meta, i) => {
            const txt = t.projects.items[i];
            if (!txt) return null;
            return (
              <ProjectCard
                key={i}
                meta={meta}
                text={txt}
                index={i}
                onOpen={() => setExpandedIndex(i)}
              />
            );
          })}
        </div>

        {/* Ver catálogo completo */}
        <motion.div
          className="mt-10 md:mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/proyectos"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              color: "var(--text)",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
            }}
          >
            {lang === "es" ? "Ver catálogo completo" : "View full catalog"}
            <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* ===== Expanded detail modal ===== */}
      <AnimatePresence>
        {expandedIndex !== null && (() => {
          const meta = projectsMeta[expandedIndex];
          const txt = t.projects.items[expandedIndex];
          const accentDisplay = meta.accent;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0"
                style={{
                  background: isDark ? "rgba(8,8,12,0.88)" : "rgba(250,250,250,0.92)",
                  backdropFilter: "blur(16px)",
                }}
                onClick={() => setExpandedIndex(null)}
              />

              {/* Modal */}
              <motion.div
                className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
                style={{
                  background: isDark ? "rgba(17,17,22,0.97)" : "rgba(255,255,255,0.98)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                  boxShadow: `0 40px 100px -20px ${accentDisplay}20`,
                }}
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Close */}
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    color: "var(--text-muted)",
                  }}
                >
                  <HiXMark className="w-5 h-5" />
                </button>

                {/* Image area */}
                <div className="relative h-48 md:h-64 overflow-hidden" style={{
                  background: isDark
                    ? `linear-gradient(160deg, #0A0A0A 0%, ${meta.accent}12 50%, #0A0A0A 100%)`
                    : `linear-gradient(160deg, #FAF9F7 0%, ${meta.accent}10 50%, #FAF9F7 100%)`,
                }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Browser mockup */}
                  <div className="absolute inset-6 md:inset-8 rounded-xl overflow-hidden" style={{
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                    background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                  }}>
                    <div className="flex items-center gap-1.5 px-4 py-2.5" style={{
                      borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                    }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#D4A053" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#E87461" }} />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 rounded-full w-2/3" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }} />
                      <div className="h-3 rounded-full w-1/2" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
                      <div className="h-12 rounded-lg w-full mt-3" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
                    </div>
                  </div>
                  {/* Year */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider"
                      style={{
                        background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(12px)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {meta.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 md:p-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {txt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-[0.1em] uppercase font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          color: accentDisplay,
                          background: `${accentDisplay}08`,
                          border: `1px solid ${accentDisplay}15`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                  >
                    {txt.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {lang === "es" ? meta.detailEs : meta.detailEn}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {meta.icons.map((item) => {
                      const c = isDark ? item.color : (item.color === "#ffffff" || item.color === "#000020" ? "var(--text-faint)" : item.color);
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                            color: "var(--text-muted)",
                          }}
                        >
                          <item.icon className="text-sm" style={{ color: c }} />
                          {item.name}
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contacto"
                    onClick={() => setExpandedIndex(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${accentDisplay}, ${accentDisplay}cc)` }}
                  >
                    {lang === "es" ? "Quiero algo así" : "I want something like this"}
                    <HiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
