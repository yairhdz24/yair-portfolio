"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  HiOutlineGlobeAlt, HiOutlineDevicePhoneMobile, HiOutlineCpuChip,
  HiOutlineCodeBracket, HiArrowRight, HiXMark, HiArrowUpRight,
} from "react-icons/hi2";
import {
  SiReact, SiNextdotjs, SiN8N, SiStripe, SiSupabase, SiOpenai,
  SiTailwindcss, SiVercel, SiTypescript, SiNodedotjs, SiPostgresql,
  SiDocker, SiLinux, SiExpo,
} from "react-icons/si";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

const servicesMeta = [
  {
    icon: HiOutlineGlobeAlt,
    accent: "#D4A053",
    gradient: "linear-gradient(135deg, #D4A053, #B8860B)",
    techs: [
      { icon: SiNextdotjs, name: "Next.js", color: "#808080" },
      { icon: SiReact, name: "React", color: "#61dafb" },
      { icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
      { icon: SiStripe, name: "Stripe", color: "#635bff" },
      { icon: SiVercel, name: "Vercel", color: "#808080" },
    ],
    detailEs: "Desde sitios corporativos hasta landing pages de alta conversión y tiendas e-commerce completas. Animaciones cinematográficas, SEO técnico, pasarelas de pago y un performance perfecto. Todo bajo el mismo techo.",
    detailEn: "From corporate websites to high-conversion landing pages and full e-commerce stores. Cinematic animations, technical SEO, payment gateways and perfect performance. All under one roof.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    accent: "#E87461",
    gradient: "linear-gradient(135deg, #E87461, #D4604A)",
    techs: [
      { icon: SiExpo, name: "Expo", color: "#808080" },
      { icon: SiReact, name: "React Native", color: "#61dafb" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
      { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
    ],
    detailEs: "Aplicaciones móviles nativas para iOS y Android con Expo y React Native. Una sola base de código, rendimiento nativo, publicación en App Store y Google Play. Desde MVPs hasta apps complejas.",
    detailEn: "Native mobile apps for iOS and Android with Expo and React Native. Single codebase, native performance, App Store and Google Play publishing. From MVPs to complex apps.",
  },
  {
    icon: HiOutlineCpuChip,
    accent: "#C9A96E",
    gradient: "linear-gradient(135deg, #C9A96E, #A07830)",
    techs: [
      { icon: SiN8N, name: "n8n", color: "#ea4b71" },
      { icon: SiOpenai, name: "OpenAI", color: "#10a37f" },
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiSupabase, name: "Supabase", color: "#3ecf8e" },
    ],
    detailEs: "Flujos de automatización con n8n, agentes de IA inteligentes y chatbots para tu sitio web. Automatizo CRM, marketing, captación de leads y procesos de negocio. Tu negocio funciona solo.",
    detailEn: "Automation flows with n8n, intelligent AI agents and chatbots for your website. I automate CRM, marketing, lead capture and business processes. Your business runs itself.",
  },
  {
    icon: HiOutlineCodeBracket,
    accent: "#B5838D",
    gradient: "linear-gradient(135deg, #B5838D, #8B5E6B)",
    techs: [
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
      { icon: SiDocker, name: "Docker", color: "#2496ed" },
      { icon: SiLinux, name: "Linux", color: "#FCC624" },
    ],
    detailEs: "CRMs, ERPs, APIs, dashboards internos y configuración de servidores. Soluciones construidas exactamente para tu flujo de trabajo. Si lo puedes imaginar, lo puedo construir.",
    detailEn: "CRMs, ERPs, APIs, internal dashboards and server configuration. Solutions built exactly for your workflow. If you can imagine it, I can build it.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="servicios" className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-bold block mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {t.services.label}
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {t.services.t1}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.services.t2}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
            {t.services.sub}
          </p>
        </motion.div>

        {/* Services Grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {servicesMeta.map((meta, i) => {
            const txt = t.services.items[i];
            return (
              <motion.div
                key={i}
                className="group relative rounded-3xl p-7 md:p-9 cursor-pointer overflow-hidden card-shadow"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => setExpandedIndex(i)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${meta.accent}40`;
                  e.currentTarget.style.boxShadow = `0 20px 60px -15px ${meta.accent}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${meta.accent}08 0%, transparent 60%)`,
                  }}
                />

                {/* Number + Icon row */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span
                    className="text-[56px] md:text-[72px] font-bold leading-none select-none"
                    style={{
                      fontFamily: "'Garet', sans-serif",
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${meta.accent}30`,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${meta.accent}10`,
                      border: `1px solid ${meta.accent}20`,
                    }}
                  >
                    <meta.icon className="text-2xl" style={{ color: meta.accent }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="relative z-10 text-xl md:text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                >
                  {txt.title}
                </h3>

                {/* Description */}
                <p
                  className="relative z-10 text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {txt.desc}
                </p>

                {/* Tech pills — with real colors */}
                <div className="relative z-10 flex items-center gap-2 flex-wrap mb-6">
                  {meta.techs.map((tech, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                        color: "var(--text-dim)",
                      }}
                    >
                      <tech.icon className="text-[11px]" style={{ color: tech.color }} />
                      {tech.name}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="relative z-10 flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3"
                  style={{ color: meta.accent }}
                >
                  {lang === "es" ? "Ver más" : "Learn more"}
                  <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== Expanded detail modal ===== */}
      <AnimatePresence>
        {expandedIndex !== null && (
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
                backdropFilter: "blur(20px)",
              }}
              onClick={() => setExpandedIndex(null)}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl p-8 md:p-12"
              style={{
                background: isDark ? "rgba(17,17,22,0.97)" : "rgba(255,255,255,0.98)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                boxShadow: `0 40px 100px -20px ${servicesMeta[expandedIndex].accent}15`,
              }}
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close */}
              <button
                onClick={() => setExpandedIndex(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  color: "var(--text-muted)",
                }}
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Icon + Number */}
              <div className="flex items-center gap-5 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${servicesMeta[expandedIndex].accent}12`,
                    border: `1px solid ${servicesMeta[expandedIndex].accent}25`,
                  }}
                >
                  {(() => {
                    const Icon = servicesMeta[expandedIndex].icon;
                    return <Icon className="text-2xl" style={{ color: servicesMeta[expandedIndex].accent }} />;
                  })()}
                </div>
                <div>
                  <span
                    className="text-xs tracking-[0.15em] uppercase font-bold"
                    style={{ color: servicesMeta[expandedIndex].accent }}
                  >
                    0{expandedIndex + 1}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                  >
                    {t.services.items[expandedIndex].title}
                  </h3>
                </div>
              </div>

              {/* Detail text */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                {lang === "es"
                  ? servicesMeta[expandedIndex].detailEs
                  : servicesMeta[expandedIndex].detailEn}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {servicesMeta[expandedIndex].techs.map((tech, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"}`,
                      color: "var(--text-dim)",
                    }}
                  >
                    <tech.icon className="text-base" style={{ color: tech.color }} />
                    {tech.name}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contacto"
                onClick={() => setExpandedIndex(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ background: servicesMeta[expandedIndex].gradient }}
              >
                {lang === "es" ? "Solicitar este servicio" : "Request this service"}
                <HiArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
