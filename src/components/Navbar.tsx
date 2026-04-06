"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSun, HiOutlineMoon, HiBriefcase, HiUser, HiEnvelope, HiCommandLine, HiOutlineSparkles } from "react-icons/hi2";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLang();

  const links = [
    { href: "#servicios", label: t.nav.services, icon: <HiCommandLine className="w-3.5 h-3.5" /> },
    { href: "#trabajo", label: t.nav.work, icon: <HiBriefcase className="w-3.5 h-3.5" /> },
    { href: "#sobre-mi", label: t.nav.about, icon: <HiUser className="w-3.5 h-3.5" /> },
    { href: "#cotizar", label: lang === "es" ? "Cotizar" : "Pricing", icon: <HiOutlineSparkles className="w-3.5 h-3.5" /> },
    { href: "#contacto", label: t.nav.contact, icon: <HiEnvelope className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? "var(--bg)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(148, 163, 184, 0.08)" : "1px solid transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 3.8, duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold transition-colors duration-300 flex items-baseline gap-0 group" style={{ color: "var(--text)", fontFamily: "'Garet', sans-serif" }}>
            <span className="text-[13px] font-light opacity-30 group-hover:opacity-50 transition-opacity duration-300" style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}>{"<"}</span>
            <span>YH</span>
            <span className="text-[13px] font-light opacity-30 group-hover:opacity-50 transition-opacity duration-300 ml-px" style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}>{"/>"}</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 text-[13px] transition-colors duration-300 group"
                style={{ color: "var(--text-muted)", fontFamily: "'Garet', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <span className="opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                  {l.icon}
                </span>
                {l.label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            {/* Theme toggle — moon dark in light, sun yellow in dark */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110"
              style={{
                borderColor: "var(--border-subtle)",
              }}
            >
              {isDark ? (
                <HiOutlineSun className="text-lg" style={{ color: "#FBBF24" }} />
              ) : (
                <HiOutlineMoon className="text-lg" style={{ color: "#09090B" }} />
              )}
            </button>

            {/* CTA — indigo gradient with magnetic effect */}
            <MagneticButton as="a" href="#contacto" strength={0.3} radius={120}
              className="text-[13px] px-6 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25 inline-block magnetic-glow"
              style={{
                background: "linear-gradient(135deg, #B8860B, #D4A053)",
                fontFamily: "'Garet', sans-serif",
              }}
            >
              {t.nav.cta}
            </MagneticButton>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border-subtle)" }}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center border"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {isDark ? (
                <HiOutlineSun className="text-base" style={{ color: "#FBBF24" }} />
              ) : (
                <HiOutlineMoon className="text-base" style={{ color: "#09090B" }} />
              )}
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              style={{ color: "var(--text-muted)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ===== FULLSCREEN MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden flex flex-col"
            style={{ background: "var(--bg)" }}
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <div className="flex justify-end p-6">
              <motion.button
                onClick={() => setOpen(false)}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: "var(--text-muted)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-10 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 py-4 border-b group"
                  style={{ borderColor: "var(--border-subtle)" }}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-sm" style={{ color: "var(--text-faint)" }}>
                    {l.icon}
                  </span>
                  <span className="text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "'Garet', sans-serif" }}>
                    {l.label}
                  </span>
                  <motion.span
                    className="ml-auto text-2xl"
                    style={{ color: "var(--text-faint)" }}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="px-10 pb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block text-center py-4 rounded-full text-white text-lg font-bold"
                style={{ background: "linear-gradient(135deg, #B8860B, #D4A053)", fontFamily: "'Garet', sans-serif" }}
              >
                {t.nav.cta}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
