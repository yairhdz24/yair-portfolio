"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { HiArrowUpRight, HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { useLang } from "./LanguageProvider";

const focusStyle = {
  borderColor: "#D4A053",
  boxShadow: "0 0 0 3px rgba(212,160,83,0.1)",
};

const blurStyle = {
  borderColor: "var(--border-subtle)",
  boxShadow: "none",
};

function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = focusStyle.borderColor;
  e.target.style.boxShadow = focusStyle.boxShadow;
}

function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = blurStyle.borderColor;
  e.target.style.boxShadow = blurStyle.boxShadow;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const [sent, setSent] = useState(false);
  const { t } = useLang();

  const socials = [
    { icon: SiGithub, href: "https://github.com/", color: "var(--text)", hoverColor: "#e6edf3", label: "GitHub" },
    { icon: SiLinkedin, href: "https://linkedin.com/", color: "#0077b5", hoverColor: "#0077b5", label: "LinkedIn" },
  ];

  const infoCards: {
    icon: typeof HiOutlineEnvelope;
    title: string;
    value: string;
    accent: string;
    href?: string;
    target?: string;
    iconSize?: string;
  }[] = [
    {
      icon: HiOutlineEnvelope,
      title: t.contact.email,
      value: "contacto@levelai.com.mx",
      accent: "#D4A053",
      href: "mailto:contacto@levelai.com.mx",
    },
    {
      icon: SiWhatsapp,
      title: "WhatsApp",
      value: t.contact.wa,
      accent: "#25D366",
      href: "https://wa.me/521XXXXXXXXXX",
      target: "_blank",
      iconSize: "text-[75px]",
    },
    {
      icon: HiOutlineMapPin,
      title: t.contact.label === "Contacto" ? "Ubicación" : "Location",
      value: t.contact.loc,
      accent: "#C9A96E",
    },
  ];

  return (
    <section id="contacto" className="relative py-20 md:py-28 px-6 overflow-hidden" ref={containerRef}>
      {/* Keyframe for gradient shimmer */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Floating gradient orbs */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "#D4A053", opacity: 0.03 }}
        />
        <div
          className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "#E87461", opacity: 0.02 }}
        />
        <div
          className="absolute top-[50%] left-[10%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "#C9A96E", opacity: 0.02 }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        {/* Header - dramatic centered */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.span
            className="text-sm tracking-[0.25em] uppercase mb-5 block font-bold"
            style={{ color: "var(--accent-1)" }}
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ duration: 1, delay: 0.1 }}
          >
            {t.contact.label}
          </motion.span>
          <h2
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] mb-4"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {t.contact.t1}
            <br />
            <span
              className="animated-gradient"
              style={{
                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2), var(--accent-3))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
              }}
            >
              {t.contact.t2}
            </span>
          </h2>
          <motion.p
            className="text-lg max-w-md mx-auto mt-6"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t.contact.sub}
          </motion.p>
        </motion.div>

        {/* 5-col grid: 3 form, 2 info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form - left, wider */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="rounded-3xl p-8 md:p-10 backdrop-blur-sm card-shadow"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="group">
                    <label
                      className="text-[11px] tracking-[0.15em] uppercase mb-2.5 block font-bold"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePh}
                      className="w-full rounded-xl px-5 py-3.5 text-[15px] font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text)",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      className="text-[11px] tracking-[0.15em] uppercase mb-2.5 block font-bold"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.emailPh}
                      className="w-full rounded-xl px-5 py-3.5 text-[15px] font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text)",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Project type select */}
                <div className="group">
                  <label
                    className="text-[11px] tracking-[0.15em] uppercase mb-2.5 block font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.contact.type}
                  </label>
                  <select
                    className="w-full rounded-xl px-5 py-3.5 text-[15px] font-medium transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-muted)",
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="" style={{ background: "var(--bg-card)" }}>
                      {t.contact.typePh}
                    </option>
                    {t.contact.types.map((tp) => (
                      <option key={tp} value={tp} style={{ background: "var(--bg-card)" }}>
                        {tp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="group">
                  <label
                    className="text-[11px] tracking-[0.15em] uppercase mb-2.5 block font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.contact.msg}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t.contact.msgPh}
                    className="w-full rounded-xl px-5 py-3.5 text-[15px] font-medium transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text)",
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Submit button with gradient shimmer */}
                <motion.button
                  type="submit"
                  disabled={sent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-14 py-4 rounded-full overflow-hidden disabled:opacity-60 cursor-pointer"
                >
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, #B8860B, #D4A053, #B8860B)",
                      backgroundSize: "200% 200%",
                      backgroundPosition: "0% 50%",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, #B8860B, #D4A053, #B8860B)",
                      backgroundSize: "200% 200%",
                      animation: "gradient-shift 3s ease infinite",
                    }}
                  />
                  {/* Hover shadow deepener */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_10px_40px_rgba(212,160,83,0.3)]" />
                  <span className="relative z-10 text-sm font-bold text-white tracking-wide flex items-center justify-center gap-2">
                    {sent ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="flex items-center gap-2"
                      >
                        {"✓ " + t.contact.sent}
                      </motion.span>
                    ) : (
                      t.contact.send
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info cards - right */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Info cards with hover lift + icon glow */}
            {infoCards.map((card, i) => {
              const Wrapper = card.href ? motion.a : motion.div;
              const linkProps = card.href
                ? { href: card.href, ...(card.target ? { target: card.target, rel: "noopener noreferrer" } : {}) }
                : {};

              return (
                <Wrapper
                  key={i}
                  {...linkProps}
                  className="group block rounded-2xl p-6 relative overflow-hidden transition-all duration-500"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                >
                  {/* Background icon with hover scale */}
                  <card.icon
                    className={`absolute -bottom-4 -right-4 ${card.iconSize || "text-[90px]"} transition-all duration-700 group-hover:scale-110`}
                    style={{ color: "var(--text-ghost)" }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p
                        className="text-base font-bold mb-1"
                        style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                      >
                        {card.title}
                      </p>
                      <p className="text-sm font-medium" style={{ color: card.accent }}>
                        {card.value}
                      </p>
                    </div>
                    {card.href && (
                      <HiArrowUpRight
                        className="text-lg transition-all duration-400 group-hover:rotate-45 group-hover:scale-110"
                        style={{ color: "var(--text-ghost)" }}
                      />
                    )}
                  </div>
                </Wrapper>
              );
            })}

            {/* Social links as circular/rounded cards */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-2xl p-5 flex items-center justify-center gap-2.5 group relative overflow-hidden transition-all duration-500"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {/* Background decorative icon */}
                  <social.icon
                    className="absolute -bottom-2 -right-2 text-[55px] transition-all duration-700 group-hover:scale-110"
                    style={{ color: "var(--text-ghost)" }}
                  />
                  {/* Foreground icon with hover color */}
                  <social.icon
                    className="relative z-10 text-lg transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <span
                    className="relative z-10 text-sm font-medium transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
