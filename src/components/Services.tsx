"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  HiOutlineGlobeAlt, HiOutlineDevicePhoneMobile, HiOutlineCpuChip,
  HiOutlineCodeBracket, HiArrowRight, HiXMark,
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
    accent: "#3B82F6",
    techs: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiReact, name: "React" },
      { icon: SiTailwindcss, name: "Tailwind" },
      { icon: SiStripe, name: "Stripe" },
      { icon: SiVercel, name: "Vercel" },
    ],
    detailEs: "Desde sitios corporativos hasta landing pages de alta conversión y tiendas e-commerce completas. Animaciones cinematográficas, SEO técnico, pasarelas de pago y un performance perfecto. Todo bajo el mismo techo.",
    detailEn: "From corporate websites to high-conversion landing pages and full e-commerce stores. Cinematic animations, technical SEO, payment gateways and perfect performance. All under one roof.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    accent: "#10B981",
    techs: [
      { icon: SiExpo, name: "Expo" },
      { icon: SiReact, name: "React Native" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiSupabase, name: "Supabase" },
    ],
    detailEs: "Aplicaciones móviles nativas para iOS y Android con Expo y React Native. Una sola base de código, rendimiento nativo, publicación en App Store y Google Play. Desde MVPs hasta apps complejas.",
    detailEn: "Native mobile apps for iOS and Android with Expo and React Native. Single codebase, native performance, App Store and Google Play publishing. From MVPs to complex apps.",
  },
  {
    icon: HiOutlineCpuChip,
    accent: "#F59E0B",
    techs: [
      { icon: SiN8N, name: "n8n" },
      { icon: SiOpenai, name: "OpenAI" },
      { icon: SiNodedotjs, name: "Node.js" },
      { icon: SiSupabase, name: "Supabase" },
    ],
    detailEs: "Flujos de automatización con n8n, agentes de IA inteligentes y chatbots para tu sitio web. Automatizo CRM, marketing, captación de leads y procesos de negocio. Tu negocio funciona solo.",
    detailEn: "Automation flows with n8n, intelligent AI agents and chatbots for your website. I automate CRM, marketing, lead capture and business processes. Your business runs itself.",
  },
  {
    icon: HiOutlineCodeBracket,
    accent: "#3B82F6",
    techs: [
      { icon: SiNodedotjs, name: "Node.js" },
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: SiDocker, name: "Docker" },
      { icon: SiLinux, name: "Linux" },
    ],
    detailEs: "CRMs, ERPs, APIs, dashboards internos y configuración de servidores. Soluciones construidas exactamente para tu flujo de trabajo. Si lo puedes imaginar, lo puedo construir.",
    detailEn: "CRMs, ERPs, APIs, internal dashboards and server configuration. Solutions built exactly for your workflow. If you can imagine it, I can build it.",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalServices = servicesMeta.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Map scroll progress to active service index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * totalServices),
        totalServices - 1
      );
      setActiveIndex(Math.max(0, idx));
    });
    return unsubscribe;
  }, [scrollYProgress, totalServices]);

  return (
    <section id="servicios" ref={containerRef} style={{ height: `${(totalServices + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          {/* Header — always visible */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <span
                className="text-xs tracking-[0.25em] uppercase font-bold block mb-3"
                style={{ color: "#10B981" }}
              >
                {t.services.label}
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
              >
                {t.services.t1}{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #10B981, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t.services.t2}
                </span>
              </h2>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 md:pb-2">
              {servicesMeta.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === activeIndex
                      ? servicesMeta[activeIndex].accent
                      : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                    transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Animated progress line between transitions */}
          <div className="mb-8 md:mb-10">
            <div
              className="h-px w-full rounded-full overflow-hidden"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${servicesMeta[activeIndex].accent}, ${servicesMeta[activeIndex].accent}60)`,
                  width: `${((activeIndex + 1) / totalServices) * 100}%`,
                }}
                layout
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            {/* Counter */}
            <div className="flex justify-between mt-3">
              <span
                className="text-xs font-bold tracking-wider"
                style={{ color: servicesMeta[activeIndex].accent }}
              >
                0{activeIndex + 1} / 0{totalServices}
              </span>
              <span
                className="text-xs tracking-wider"
                style={{ color: "var(--text-faint)" }}
              >
                {t.services.items[activeIndex].title}
              </span>
            </div>
          </div>

          {/* Service cards — animate based on scroll */}
          <div className="relative h-[48vh] md:h-[42vh]">
            <AnimatePresence mode="wait">
              {servicesMeta.map((meta, i) => {
                if (i !== activeIndex) return null;
                const txt = t.services.items[i];
                // Light mode: use deeper accent colors
                const accentDisplay = !isDark && meta.accent === "#F59E0B" ? "#B45309"
                  : !isDark && meta.accent === "#10B981" ? "#047857"
                  : !isDark && meta.accent === "#3B82F6" ? "#1D4ED8"
                  : meta.accent;
                return (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -60, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Background glow for transition */}
                    <motion.div
                      className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${accentDisplay}08 0%, transparent 60%)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />

                    <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center h-full">
                      {/* Left: Big number (outline style) + icon */}
                      <div className="shrink-0 flex items-center gap-6">
                        <span
                          className="text-[80px] md:text-[120px] font-bold leading-none select-none"
                          style={{
                            fontFamily: "'Garet', sans-serif",
                            color: "transparent",
                            WebkitTextStroke: `2px ${accentDisplay}40`,
                            textShadow: `0 0 40px ${accentDisplay}15`,
                          }}
                        >
                          0{i + 1}
                        </span>
                        <motion.div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `${accentDisplay}12`,
                            border: `1px solid ${accentDisplay}35`,
                            boxShadow: `0 0 30px ${accentDisplay}10`,
                          }}
                          initial={{ rotate: -10, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.15, type: "spring", damping: 15 }}
                        >
                          <meta.icon
                            className="text-3xl md:text-4xl"
                            style={{ color: accentDisplay }}
                          />
                        </motion.div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 min-w-0">
                        <motion.h3
                          className="text-3xl md:text-5xl font-bold mb-4"
                          style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          {txt.title}
                        </motion.h3>
                        <motion.p
                          className="text-base md:text-lg leading-relaxed mb-6 max-w-lg"
                          style={{ color: "var(--text-muted)" }}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {txt.desc}
                        </motion.p>

                        {/* Tech pills */}
                        <motion.div
                          className="flex items-center gap-2 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          {meta.techs.map((tech, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                              style={{
                                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                                color: "var(--text-muted)",
                              }}
                            >
                              <tech.icon className="text-sm" />
                              {tech.name}
                            </div>
                          ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.button
                          onClick={() => setExpandedIndex(i)}
                          className="group inline-flex items-center gap-2 text-sm font-bold cursor-pointer"
                          style={{ color: accentDisplay }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35, duration: 0.4 }}
                        >
                          {lang === "es" ? "Ver más" : "Learn more"}
                          <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-8">
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                className="w-5 h-8 rounded-full flex items-start justify-center pt-2"
                style={{
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                <motion.div
                  className="w-1 h-1.5 rounded-full"
                  style={{ background: "var(--text-muted)" }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
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
                background: isDark ? "rgba(15,23,42,0.85)" : "rgba(248,250,252,0.9)",
                backdropFilter: "blur(16px)",
              }}
              onClick={() => setExpandedIndex(null)}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl p-8 md:p-12"
              style={{
                background: isDark ? "rgba(30,41,59,0.95)" : "rgba(255,255,255,0.98)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                boxShadow: `0 40px 100px -20px ${servicesMeta[expandedIndex].accent}20`,
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
                    background: `${servicesMeta[expandedIndex].accent}15`,
                    border: `1px solid ${servicesMeta[expandedIndex].accent}30`,
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
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                      color: "var(--text-dim)",
                    }}
                  >
                    <tech.icon className="text-base" />
                    {tech.name}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contacto"
                onClick={() => setExpandedIndex(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${servicesMeta[expandedIndex].accent}, ${servicesMeta[expandedIndex].accent}cc)` }}
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
