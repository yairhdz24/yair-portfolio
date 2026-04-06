"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { useLang } from "./LanguageProvider";

const clients = [
  {
    name: "Level AI",
    logo: "/clients/levelai.svg",
    href: "https://levelai.com.mx",
    category: "SaaS",
  },
  {
    name: "Cliente 2",
    logo: null,
    href: "#",
    category: "E-Commerce",
  },
  {
    name: "Cliente 3",
    logo: null,
    href: "#",
    category: "Landing",
  },
  {
    name: "Cliente 4",
    logo: null,
    href: "#",
    category: "Automatización",
  },
  {
    name: "Cliente 5",
    logo: null,
    href: "#",
    category: "Software",
  },
  {
    name: "Cliente 6",
    logo: null,
    href: "#",
    category: "CRM",
  },
];

export default function Clients() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const isEs = lang === "es";

  return (
    <section className="py-20 md:py-28 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-bold block mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {isEs ? "Clientes" : "Clients"}
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] mb-5"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {isEs ? "Han confiado en " : "They trusted "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {isEs ? "mi trabajo" : "my work"}
            </span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            {isEs
              ? "Marcas y empresas que eligieron soluciones digitales a medida."
              : "Brands and companies that chose custom digital solutions."}
          </p>
        </motion.div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {clients.map((client, i) => (
            <motion.a
              key={client.name}
              href={client.href}
              target={client.href.startsWith("http") ? "_blank" : undefined}
              rel={client.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col items-center justify-center rounded-2xl p-8 md:p-10 transition-all duration-500 card-shadow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                minHeight: "160px",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-1)";
                e.currentTarget.style.boxShadow = "0 20px 50px -12px rgba(212,160,83,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Arrow indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <HiArrowUpRight className="w-4 h-4" style={{ color: "var(--accent-1)" }} />
              </div>

              {/* Logo or text placeholder */}
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 md:h-12 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ filter: "grayscale(100%)" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(0%)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(100%)"; }}
                />
              ) : (
                <span
                  className="text-xl md:text-2xl font-bold opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                >
                  {client.name}
                </span>
              )}

              {/* Category tag */}
              <span
                className="mt-3 text-[10px] tracking-[0.12em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "var(--accent-1)" }}
              >
                {client.category}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
