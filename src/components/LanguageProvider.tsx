"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "es",
  toggle: () => {},
});

export const translations = {
  es: {
    nav: { services: "Servicios", work: "Trabajo", about: "Sobre mí", contact: "Contacto", cta: "Hablemos" },
    hero: {
      role: "Desarrollador Fullstack",
      desc: "Creo experiencias digitales, plataformas SaaS y automatizaciones inteligentes que transforman negocios.",
      cta1: "Explorar Servicios",
      cta2: "Hablemos",
    },
    services: {
      label: "Servicios",
      t1: "Lo que",
      t2: "construyo",
      sub: "Soluciones diseñadas desde cero para resolver problemas reales. Sin plantillas. Sin límites.",
      items: [
        { title: "Desarrollo Web", desc: "Páginas web, landing pages y e-commerce ultra-rápidos con animaciones cinematográficas, SEO técnico y conversión optimizada." },
        { title: "Apps Móviles", desc: "Aplicaciones nativas para iOS y Android con Expo y React Native. Rendimiento nativo, una sola base de código." },
        { title: "Automatizaciones & IA", desc: "Flujos inteligentes con n8n, agentes de IA y chatbots que automatizan tu negocio mientras tú descansas." },
        { title: "Software a Medida", desc: "CRMs, ERPs, APIs, dashboards y configuración de servidores. Soluciones que se adaptan a tu negocio, no al revés." },
      ],
    },
    projects: {
      label: "Trabajo",
      t1: "Proyectos",
      t2: "destacados",
      sub: "Soluciones que generan impacto real y medible en los negocios de mis clientes.",
      items: [
        { title: "Plataforma SaaS", sub: "Sistema multi-tenant con dashboards en tiempo real, billing automatizado y flujos n8n integrados.", tags: ["SaaS", "Automatización", "Real-time"], ml: "usuarios activos" },
        { title: "E-Commerce Premium", sub: "Catálogo de 10K+ productos con checkout optimizado, analytics avanzados y máxima conversión.", tags: ["Tienda", "Pagos", "Analytics"], ml: "tasa de conversión" },
        { title: "CRM con IA", sub: "Lead scoring automatizado por IA, seguimiento inteligente y reportes predictivos.", tags: ["IA", "Automatización", "CRM"], ml: "procesos automatizados" },
        { title: "Landing Corporativa", sub: "Animaciones scroll-driven, parallax cinematográfico y performance score perfecto.", tags: ["Landing", "Animaciones", "Performance"], ml: "Lighthouse score" },
      ],
    },
    about: {
      label: "Sobre mí",
      quote: "Ingeniero de software y desarrollador fullstack.",
      quoteDim: " Creo software sólido y robusto que resuelve problemas reales.",
      bio1: "Mi enfoque principal es resolver problemas de empresas y personas, creando software a medida que va más allá de lo rudimentario — sólido, robusto y con una experiencia de usuario excepcional.",
      bio2: "Construyo plataformas SaaS escalables, automatizaciones inteligentes con n8n e IA, y experiencias digitales que realmente impactan. Cada proyecto lo trato como si fuera mío.",
      stack: "Stack tecnológico",
      stats: [
        { label: "Proyectos entregados" },
        { label: "Años de experiencia" },
        { label: "Clientes satisfechos" },
        { label: "Uptime garantizado" },
      ],
    },
    contact: {
      label: "Contacto",
      t1: "Hagamos algo",
      t2: "increíble",
      sub: "¿Tienes un proyecto en mente? Cuéntame tu visión.",
      name: "Nombre",
      namePh: "Tu nombre",
      email: "Email",
      emailPh: "tu@email.com",
      type: "Tipo de proyecto",
      typePh: "Seleccionar...",
      types: ["Desarrollo Web", "App Móvil", "Automatización & IA", "Software a Medida"],
      msg: "Mensaje",
      msgPh: "Cuéntame sobre tu proyecto...",
      send: "Enviar mensaje →",
      sent: "Mensaje enviado ✓",
      wa: "Chat directo · Respuesta rápida",
      loc: "México · Remoto · LATAM & Global",
    },
    footer: {
      desc: "Desarrollador fullstack creando experiencias digitales, plataformas SaaS y automatizaciones inteligentes.",
      nav: "Navegación",
      connect: "Conecta",
      rights: "Todos los derechos reservados.",
      made: "Hecho con Next.js, Tailwind CSS & Framer Motion",
    },
  },
  en: {
    nav: { services: "Services", work: "Work", about: "About", contact: "Contact", cta: "Let's talk" },
    hero: {
      role: "Fullstack Developer",
      desc: "I create digital experiences, SaaS platforms and intelligent automations that transform businesses.",
      cta1: "Explore Services",
      cta2: "Let's talk",
    },
    services: {
      label: "Services",
      t1: "What I",
      t2: "build",
      sub: "Solutions designed from scratch to solve real problems. No templates. No limits.",
      items: [
        { title: "Web Development", desc: "Websites, landing pages and e-commerce — ultra-fast with cinematic animations, technical SEO and optimized conversion." },
        { title: "Mobile Apps", desc: "Native apps for iOS and Android with Expo and React Native. Native performance, single codebase." },
        { title: "Automations & AI", desc: "Intelligent flows with n8n, AI agents and chatbots that automate your business while you rest." },
        { title: "Custom Software", desc: "CRMs, ERPs, APIs, dashboards and server configuration. Solutions that adapt to your business, not the other way around." },
      ],
    },
    projects: {
      label: "Work",
      t1: "Featured",
      t2: "projects",
      sub: "Solutions that generate real and measurable impact on my clients' businesses.",
      items: [
        { title: "SaaS Platform", sub: "Multi-tenant system with real-time dashboards, automated billing and integrated n8n flows.", tags: ["SaaS", "Automation", "Real-time"], ml: "active users" },
        { title: "Premium E-Commerce", sub: "10K+ product catalog with optimized checkout, advanced analytics and maximum conversion.", tags: ["Store", "Payments", "Analytics"], ml: "conversion rate" },
        { title: "AI-Powered CRM", sub: "AI-automated lead scoring, intelligent follow-up and predictive reports.", tags: ["AI", "Automation", "CRM"], ml: "processes automated" },
        { title: "Corporate Landing", sub: "Scroll-driven animations, cinematic parallax and perfect performance score.", tags: ["Landing", "Animations", "Performance"], ml: "Lighthouse score" },
      ],
    },
    about: {
      label: "About",
      quote: "Software engineer and fullstack developer.",
      quoteDim: " I build solid, robust software that solves real problems.",
      bio1: "My main focus is solving problems for businesses and people, creating custom software that goes beyond the rudimentary — solid, robust, and with an exceptional user experience.",
      bio2: "I build scalable SaaS platforms, intelligent automations with n8n and AI, and digital experiences that truly make an impact. Every project I take on, I treat as my own.",
      stack: "Tech Stack",
      stats: [
        { label: "Projects delivered" },
        { label: "Years of experience" },
        { label: "Happy clients" },
        { label: "Uptime guaranteed" },
      ],
    },
    contact: {
      label: "Contact",
      t1: "Let's make something",
      t2: "amazing",
      sub: "Have a project in mind? Tell me your vision.",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "your@email.com",
      type: "Project type",
      typePh: "Select...",
      types: ["Web Development", "Mobile App", "Automation & AI", "Custom Software"],
      msg: "Message",
      msgPh: "Tell me about your project...",
      send: "Send message →",
      sent: "Message sent ✓",
      wa: "Direct chat · Fast response",
      loc: "Mexico · Remote · LATAM & Global",
    },
    footer: {
      desc: "Fullstack developer creating digital experiences, SaaS platforms and intelligent automations.",
      nav: "Navigation",
      connect: "Connect",
      rights: "All rights reserved.",
      made: "Made with Next.js, Tailwind CSS & Framer Motion",
    },
  },
} as const;

export type Translations = (typeof translations)["es"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => {
  const { lang, toggle } = useContext(LangContext);
  return { lang, toggle, t: translations[lang] };
};
