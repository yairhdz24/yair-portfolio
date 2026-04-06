"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import TextReveal from "./TextReveal";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const step = target / 60;
    const id = setInterval(() => {
      c += step;
      if (c >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(c));
      }
    }, 20);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function CurvedUnderline({ color = "#D4A053", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 12"
      className="absolute -bottom-2 left-0 w-full"
      preserveAspectRatio="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 1.2, ease: "easeOut" }}
    >
      <motion.path
        d="M0 8 Q50 0, 100 6 T200 4"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1.2, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

const statValues = [
  { n: 47, s: "+" },
  { n: 4, s: "+" },
  { n: 30, s: "+" },
  { n: 99, s: "%" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const { t } = useLang();

  return (
    <section id="sobre-mi" className="relative py-20 md:py-28 px-6 overflow-hidden" ref={containerRef}>
      {/* Background ambient parallax blobs — new palette */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute top-[15%] left-[25%] w-[700px] h-[500px] rounded-full blur-[200px]"
          style={{ background: "#D4A053", opacity: 0.04 }}
        />
        <div
          className="absolute top-[45%] right-[15%] w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: "#E87461", opacity: 0.03 }}
        />
        <div
          className="absolute bottom-[10%] left-[50%] w-[400px] h-[300px] rounded-full blur-[150px]"
          style={{ background: "#C9A96E", opacity: 0.03 }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            className="text-sm tracking-[0.25em] uppercase mb-5 block font-bold"
            style={{ color: "var(--accent-1)" }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {t.about.label}
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95]"
            style={{ fontFamily: "'Garet', sans-serif" }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <span className="relative inline-block" style={{ color: "var(--text)" }}>
              Yair
              {inView && <CurvedUnderline color="var(--accent-1)" delay={0.8} />}
            </span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hernández
            </span>
          </motion.h2>
        </div>

        {/* Two-column: Photo + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* LEFT: Photo with parallax */}
          <div className="lg:col-span-5">
            <motion.div
              className="relative"
              style={{ y: photoY }}
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div
                className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, var(--bg-card), var(--text-ghost))" }}
                />
                <Image
                  src="/yair.jpeg"
                  alt="Yair Hernández"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px 30px var(--bg)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 40%)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 15%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-1)" }} />
                    <span
                      className="text-xs font-bold tracking-[0.15em] uppercase"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Disponible para proyectos
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Quote + Bio + Stats */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            style={{ y: contentY }}
          >
            {/* Pull quote with animated left border */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <div
                className="pl-8 md:pl-10 relative"
                style={{ borderLeft: "2px solid rgba(212,160,83,0.15)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-[2px]"
                  style={{ background: "linear-gradient(to bottom, var(--accent-1), var(--accent-2))" }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: "100%" } : {}}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                />
                <p
                  className="text-xl md:text-2xl lg:text-3xl leading-[1.4] font-medium"
                  style={{ fontFamily: "'Garet', sans-serif" }}
                >
                  <span className="relative inline">
                    <span style={{ color: "var(--text)" }}>{t.about.quote}</span>
                    <svg
                      viewBox="0 0 300 8"
                      className="w-[70%] h-2 mt-1 block"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M0 6 Q75 0, 150 4 T300 2"
                        fill="none"
                        stroke="var(--accent-1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                        transition={{ delay: 1, duration: 1.4, ease: "easeOut" }}
                      />
                    </svg>
                  </span>
                  <span style={{ color: "var(--text-faint)" }}>{t.about.quoteDim}</span>
                </p>
              </div>
            </motion.div>

            {/* Bio text with GSAP text reveal */}
            <div className="mb-10">
              <TextReveal
                as="p"
                className="text-base md:text-lg leading-[1.9] mb-5"
                style={{ color: "var(--text-dim)" }}
                animationType="fade-blur"
                stagger={0.03}
                delay={0.2}
              >
                {t.about.bio1}
              </TextReveal>
              <TextReveal
                as="p"
                className="text-base md:text-lg leading-[1.9]"
                style={{ color: "var(--text-dim)" }}
                animationType="fade-blur"
                stagger={0.03}
                delay={0.4}
              >
                {t.about.bio2}
              </TextReveal>
            </div>

            {/* Stats — horizontal with animated progress bars */}
            <div className="space-y-5">
              {t.about.stats.map((s, i) => {
                const accents = ["var(--accent-1)", "var(--accent-2)", "var(--accent-1)", "var(--accent-3)"];
                const widths = ["92%", "75%", "85%", "99%"];
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="text-sm font-medium" style={{ color: "var(--text-dim)" }}>
                        {s.label}
                      </p>
                      <p
                        className="text-2xl md:text-3xl font-bold tabular-nums"
                        style={{
                          fontFamily: "'Garet', sans-serif",
                          color: accents[i],
                        }}
                      >
                        <Counter target={statValues[i].n} suffix={statValues[i].s} />
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "var(--text-ghost)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: accents[i] }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: widths[i] } : {}}
                        transition={{ delay: 0.7 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
