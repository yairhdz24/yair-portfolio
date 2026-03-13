"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import {
  SiNextdotjs, SiSupabase, SiStripe, SiN8N, SiReact, SiOpenai,
  SiTailwindcss, SiNodedotjs, SiTypescript, SiPostgresql, SiExpo,
  SiDocker, SiVercel, SiPrisma,
} from "react-icons/si";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import type { IconType } from "react-icons";

interface Project {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  icons: IconType[];
  accent: string;
  category: string;
  year: string;
  href: string;
}

const allProjects: Project[] = [
  {
    titleEs: "Plataforma SaaS",
    titleEn: "SaaS Platform",
    descEs: "Sistema multi-tenant con dashboards en tiempo real, billing automatizado y flujos n8n integrados.",
    descEn: "Multi-tenant system with real-time dashboards, automated billing and integrated n8n flows.",
    icons: [SiNextdotjs, SiSupabase, SiStripe, SiN8N],
    accent: "#10B981",
    category: "SaaS",
    year: "2025",
    href: "#",
  },
  {
    titleEs: "E-Commerce Premium",
    titleEn: "Premium E-Commerce",
    descEs: "Catálogo de 10K+ productos con checkout optimizado y analytics avanzados.",
    descEn: "10K+ product catalog with optimized checkout and advanced analytics.",
    icons: [SiReact, SiStripe, SiNodedotjs, SiPostgresql],
    accent: "#3B82F6",
    category: "E-Commerce",
    year: "2024",
    href: "#",
  },
  {
    titleEs: "CRM con IA",
    titleEn: "AI-Powered CRM",
    descEs: "Lead scoring automatizado, seguimiento inteligente y reportes predictivos.",
    descEn: "Automated lead scoring, intelligent follow-up and predictive reports.",
    icons: [SiN8N, SiOpenai, SiSupabase, SiTypescript],
    accent: "#F59E0B",
    category: "Software",
    year: "2024",
    href: "#",
  },
  {
    titleEs: "App Móvil Fitness",
    titleEn: "Fitness Mobile App",
    descEs: "App nativa iOS y Android con tracking de rutinas, notificaciones y modo offline.",
    descEn: "Native iOS and Android app with routine tracking, notifications and offline mode.",
    icons: [SiExpo, SiReact, SiSupabase, SiTypescript],
    accent: "#8B5CF6",
    category: "Mobile",
    year: "2025",
    href: "#",
  },
  {
    titleEs: "Landing Corporativa",
    titleEn: "Corporate Landing",
    descEs: "Animaciones scroll-driven, parallax cinematográfico y Lighthouse score perfecto.",
    descEn: "Scroll-driven animations, cinematic parallax and perfect Lighthouse score.",
    icons: [SiNextdotjs, SiTailwindcss, SiTypescript, SiVercel],
    accent: "#3B82F6",
    category: "Landing",
    year: "2025",
    href: "#",
  },
  {
    titleEs: "Sistema de Inventario",
    titleEn: "Inventory System",
    descEs: "ERP personalizado con gestión de stock, proveedores y reportes automatizados.",
    descEn: "Custom ERP with stock management, suppliers and automated reports.",
    icons: [SiNodedotjs, SiPostgresql, SiDocker, SiReact],
    accent: "#10B981",
    category: "Software",
    year: "2024",
    href: "#",
  },
  {
    titleEs: "Chatbot IA para Clínica",
    titleEn: "AI Chatbot for Clinic",
    descEs: "Chatbot inteligente para agendar citas, responder FAQs y captar leads.",
    descEn: "Intelligent chatbot for scheduling appointments, answering FAQs and capturing leads.",
    icons: [SiOpenai, SiN8N, SiSupabase, SiNodedotjs],
    accent: "#F59E0B",
    category: "IA",
    year: "2024",
    href: "#",
  },
  {
    titleEs: "Dashboard Analytics",
    titleEn: "Analytics Dashboard",
    descEs: "Dashboard en tiempo real con métricas de negocio, gráficas interactivas y alertas.",
    descEn: "Real-time dashboard with business metrics, interactive charts and alerts.",
    icons: [SiReact, SiSupabase, SiTypescript, SiTailwindcss],
    accent: "#3B82F6",
    category: "Software",
    year: "2024",
    href: "#",
  },
  {
    titleEs: "Automatización Marketing",
    titleEn: "Marketing Automation",
    descEs: "Flujos de n8n para email marketing, segmentación de leads y seguimiento automatizado.",
    descEn: "n8n flows for email marketing, lead segmentation and automated follow-up.",
    icons: [SiN8N, SiOpenai, SiNodedotjs, SiSupabase],
    accent: "#10B981",
    category: "Automatización",
    year: "2025",
    href: "#",
  },
  {
    titleEs: "Tienda de Ropa Online",
    titleEn: "Online Clothing Store",
    descEs: "E-Commerce de moda con filtros avanzados, wishlist y pasarela de pagos.",
    descEn: "Fashion e-commerce with advanced filters, wishlist and payment gateway.",
    icons: [SiNextdotjs, SiStripe, SiPrisma, SiVercel],
    accent: "#8B5CF6",
    category: "E-Commerce",
    year: "2023",
    href: "#",
  },
  {
    titleEs: "Portal Inmobiliario",
    titleEn: "Real Estate Portal",
    descEs: "Plataforma de propiedades con mapa interactivo, filtros y sistema de contacto.",
    descEn: "Property platform with interactive map, filters and contact system.",
    icons: [SiNextdotjs, SiSupabase, SiTailwindcss, SiTypescript],
    accent: "#F59E0B",
    category: "Landing",
    year: "2023",
    href: "#",
  },
  {
    titleEs: "App de Delivery",
    titleEn: "Delivery App",
    descEs: "App móvil con tracking en tiempo real, notificaciones push y pagos integrados.",
    descEn: "Mobile app with real-time tracking, push notifications and integrated payments.",
    icons: [SiExpo, SiReact, SiNodedotjs, SiStripe],
    accent: "#10B981",
    category: "Mobile",
    year: "2024",
    href: "#",
  },
];

const categories = ["Todos", "SaaS", "E-Commerce", "Landing", "Mobile", "Software", "IA", "Automatización"];

/* ─── Card con preview visual ─────────────────────────────────── */
function ProjectCard({ project, index, isDark, lang }: {
  project: Project;
  index: number;
  isDark: boolean;
  lang: "es" | "en";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const accent = !isDark && project.accent === "#F59E0B" ? "#B45309"
    : !isDark && project.accent === "#10B981" ? "#047857"
    : !isDark && project.accent === "#3B82F6" ? "#1D4ED8"
    : !isDark && project.accent === "#8B5CF6" ? "#7C3AED"
    : project.accent;

  const isExternal = project.href !== "#";
  const isMobile = project.category === "Mobile";

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "rgba(30,41,59,0.35)" : "rgba(255,255,255,0.6)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Visual preview area */}
      <div
        className="relative h-40 overflow-hidden"
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${accent}08 0%, ${accent}18 100%)`
            : `linear-gradient(135deg, ${accent}06 0%, ${accent}14 100%)`,
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${accent}15, transparent 70%)`,
          }}
        />

        {isMobile ? (
          /* Phone mockup for mobile projects */
          <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[70px] h-[130px] rounded-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" style={{
            border: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.85)",
            boxShadow: `0 8px 30px ${accent}15`,
          }}>
            {/* Notch */}
            <div className="mx-auto mt-1.5 w-8 h-1 rounded-full" style={{
              background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }} />
            {/* Content lines */}
            <div className="px-2 mt-3 space-y-1.5">
              <div className="h-1.5 rounded-full w-full" style={{ background: `${accent}30` }} />
              <div className="h-1.5 rounded-full w-3/4" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }} />
              <div className="h-5 rounded w-full mt-2" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
              <div className="h-5 rounded w-full" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
              <div className="flex gap-1 mt-1">
                <div className="h-3 rounded w-1/2" style={{ background: `${accent}20` }} />
                <div className="h-3 rounded w-1/2" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }} />
              </div>
            </div>
          </div>
        ) : (
          /* Browser mockup for web projects */
          <div className="absolute left-3 right-3 top-4 bottom-0 rounded-t-lg overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]" style={{
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
            borderBottom: "none",
            background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.8)",
            boxShadow: `0 -4px 30px ${accent}08`,
          }}>
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-3 py-2" style={{
              borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}`,
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#EF4444" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F59E0B" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              <div className="ml-2 flex-1 h-3 rounded-full" style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              }} />
            </div>
            {/* Fake UI content — varies by accent color for visual variety */}
            <div className="p-3 space-y-2">
              {/* Nav bar hint */}
              <div className="flex items-center justify-between">
                <div className="h-2 rounded-full w-16" style={{ background: `${accent}25` }} />
                <div className="flex gap-2">
                  <div className="h-2 rounded-full w-8" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }} />
                  <div className="h-2 rounded-full w-8" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }} />
                </div>
              </div>
              {/* Hero area */}
              <div className="h-10 rounded-lg mt-1" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
              {/* Cards row */}
              <div className="flex gap-1.5">
                <div className="h-7 rounded flex-1" style={{ background: `${accent}10` }} />
                <div className="h-7 rounded flex-1" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
                <div className="h-7 rounded flex-1" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
              </div>
            </div>
          </div>
        )}

        {/* Arrow — top right */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
            style={{
              background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            <HiArrowUpRight className="text-[10px]" style={{ color: accent }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        {/* Category + year */}
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className="text-[9px] tracking-[0.12em] uppercase font-bold px-2 py-px rounded"
            style={{ color: accent, background: `${accent}10` }}
          >
            {project.category}
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold mb-1.5 leading-snug"
          style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
        >
          {lang === "es" ? project.titleEs : project.titleEn}
        </h3>

        {/* Desc */}
        <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
          {lang === "es" ? project.descEs : project.descEn}
        </p>

        {/* Tech icons row */}
        <div className="flex items-center gap-1">
          {project.icons.map((Icon, j) => (
            <div
              key={j}
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
              }}
            >
              <Icon className="text-[9px]" style={{ color: "var(--text-faint)" }} />
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ProyectosPage() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos"
    ? allProjects
    : allProjects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <nav
        className="sticky top-0 z-40 px-6 md:px-10"
        style={{
          background: "var(--bg)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
        }}
      >
        <div className="max-w-6xl mx-auto h-14 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 group"
            style={{ color: "var(--text-muted)" }}
          >
            <HiArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {lang === "es" ? "Volver" : "Back"}
          </a>
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text)", fontFamily: "'Garet', sans-serif" }}
          >
            {lang === "es" ? "Catálogo" : "Catalog"}
          </span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {lang === "es" ? "Todos los proyectos" : "All projects"}
          </h1>
          <p className="text-sm md:text-base" style={{ color: "var(--text-faint)" }}>
            {lang === "es"
              ? `${allProjects.length} proyectos realizados`
              : `${allProjects.length} completed projects`}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer"
              style={{
                background: filter === cat
                  ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)")
                  : "transparent",
                color: filter === cat ? "var(--text)" : "var(--text-faint)",
                border: `1px solid ${filter === cat
                  ? (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)")
                  : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)")}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={`${project.titleEs}-${filter}`}
              project={project}
              index={i}
              isDark={isDark}
              lang={lang}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: "var(--text-faint)" }}>
              {lang === "es" ? "No hay proyectos en esta categoría." : "No projects in this category."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
