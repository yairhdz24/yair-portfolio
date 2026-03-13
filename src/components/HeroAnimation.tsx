"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { HiArrowRight, HiChatBubbleLeftRight } from "react-icons/hi2";

/* ─────────────────────────────────────────────
   Rotating phrases for typewriter
   ───────────────────────────────────────────── */
const phrasesEs = [
  "Desarrollador Fullstack",
  "Creador de Software",
  "Automatizaciones con IA",
  "Experiencias Digitales",
];
const phrasesEn = [
  "Fullstack Developer",
  "Software Creator",
  "AI Automations",
  "Digital Experiences",
];

/* ─────────────────────────────────────────────
   Circle texture for round particles
   ───────────────────────────────────────────── */
function useCircleTexture() {
  const [texture] = useState(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  });
  return texture;
}

/* ─────────────────────────────────────────────
   3D: Floating Particles — simple, elegant dots
   ───────────────────────────────────────────── */
function ParticleField({
  mouse,
  isDark,
}: {
  mouse: { x: number; y: number };
  isDark: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const circleTexture = useCircleTexture();
  const count = 300;

  const dataRef = useRef<{
    pos: Float32Array;
    vel: Float32Array;
  } | null>(null);
  if (!dataRef.current) {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    dataRef.current = { pos, vel };
  }
  const positions = dataRef.current.pos;
  const velocities = dataRef.current.vel;

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse repulsion
      const dx = posArray[i * 3] - mouse.x * 6;
      const dy = posArray[i * 3 + 1] - -mouse.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.008;
        posArray[i * 3] += dx * force;
        posArray[i * 3 + 1] += dy * force;
      }

      // Bounds
      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 8) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 4) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.08 : 0.13}
        color={isDark ? "#10B981" : "#0F172A"}
        transparent
        opacity={isDark ? 0.6 : 0.5}
        sizeAttenuation
        map={circleTexture}
        alphaMap={circleTexture}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   3D: Glowing Prism — centered, spins on axis
   with green/blue tech glow on edges
   ───────────────────────────────────────────── */
function PrismShape({
  mouse,
}: {
  mouse: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);

  const [prismGeo] = useState(() => {
    const geo = new THREE.CylinderGeometry(1.6, 1.6, 2.8, 3, 1);
    geo.rotateX(Math.PI / 2);
    return geo;
  });

  const [edgesGeo] = useState(() => new THREE.EdgesGeometry(prismGeo));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Spin on its own axis
    groupRef.current.rotation.z = t * 0.25;
    // Gentle tilt so you always see the 3D triangular shape
    groupRef.current.rotation.x = 0.35 + Math.sin(t * 0.1) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.1;
    // Mouse displaces gently
    groupRef.current.position.x +=
      (mouse.x * 1.2 - groupRef.current.position.x) * 0.02;
    groupRef.current.position.y +=
      (-mouse.y * 1.0 - groupRef.current.position.y) * 0.02;
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={groupRef}>
        {/* Glass fill */}
        <mesh>
          <primitive object={prismGeo} attach="geometry" />
          <meshPhysicalMaterial
            color="#10B981"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        {/* Main edges — green glow */}
        <lineSegments>
          <primitive object={edgesGeo} attach="geometry" />
          <lineBasicMaterial color="#10B981" transparent opacity={0.5} />
        </lineSegments>
        {/* Second edge layer — blue glow, slightly larger */}
        <lineSegments scale={1.02}>
          <primitive object={edgesGeo} attach="geometry" />
          <lineBasicMaterial color="#3B82F6" transparent opacity={0.2} />
        </lineSegments>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Hero CTA Button — expand + glow on hover,
   immersive ripple on click, icons
   ───────────────────────────────────────────── */
function HeroButton({
  children,
  href,
  variant = "primary",
  isDark,
  icon,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  isDark: boolean;
  icon?: React.ReactNode;
}) {
  const isPrimary = variant === "primary";
  const [ripple, setRipple] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setRipple(true);
    // After ripple animation, scroll to section
    setTimeout(() => {
      setRipple(false);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      {/* Full-screen ripple flash on click */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            className="fixed inset-0 z-100 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                background: isPrimary
                  ? "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
              }}
              initial={{ width: 0, height: 0, x: "-50%", y: "-50%" }}
              animate={{ width: "200vmax", height: "200vmax", x: "-50%", y: "-50%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.06,
          y: -3,
        }}
        whileTap={{
          scale: 0.93,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`
          group relative inline-flex items-center gap-3 px-8 py-4 rounded-full
          text-sm font-bold tracking-wide cursor-pointer overflow-hidden
          transition-all duration-500 ease-out
          ${isPrimary
            ? "bg-linear-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
            : isDark
              ? "border border-white/20 text-white/70 hover:text-white hover:border-emerald-400/50"
              : "border border-black/15 text-black/60 hover:text-black hover:border-emerald-500/50"
          }
        `}
      >
        {/* Glow layer for primary */}
        {isPrimary && (
          <>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
            <div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
              style={{
                background: "linear-gradient(135deg, #10B981, #06B6D4)",
              }}
            />
          </>
        )}
        {/* Secondary glow */}
        {!isPrimary && (
          <div
            className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
            style={{
              background: isDark
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(16, 185, 129, 0.1)",
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
        {icon && (
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </motion.a>
    </>
  );
}

/* ─────────────────────────────────────────────
   Main Hero Component
   ───────────────────────────────────────────── */
export default function HeroAnimation() {
  const [phase, setPhase] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Typewriter rotating state
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletingRef = useRef(false);

  const { lang, t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const phrases = lang === "es" ? phrasesEs : phrasesEn;

  const bg = isDark ? "#0F172A" : "#F8FAFC";
  const mutedColor = isDark ? "#94A3B8" : "#64748B";
  const accent = isDark ? "#FFFFFF" : "#0F172A";

  // Phase timing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Typewriter effect with rotating phrases
  useEffect(() => {
    if (phase < 1) return;

    const target = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = target.slice(0, currentPhrase.length + 1);
          setCurrentPhrase(next);
          if (next.length === target.length) {
            deletingRef.current = true;
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          const next = target.slice(0, currentPhrase.length - 1);
          setCurrentPhrase(next);
          if (next.length === 0) {
            setIsDeleting(false);
            deletingRef.current = false;
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [phase, currentPhrase, isDeleting, phraseIndex, phrases]);

  // Reset typewriter when language changes
  const prevLangRef = useRef(lang);
  if (prevLangRef.current !== lang) {
    prevLangRef.current = lang;
    setCurrentPhrase("");
    setPhraseIndex(0);
    setIsDeleting(false);
    deletingRef.current = false;
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ background: bg }}
    >
      {/* 3D Canvas - particles + prism */}
      <div className="absolute inset-0 z-1">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#3B82F6" />
          <pointLight position={[-5, -3, 3]} intensity={0.2} color="#10B981" />
          <ParticleField mouse={mouse} isDark={isDark} />
          {phase >= 1 && <PrismShape mouse={mouse} />}
        </Canvas>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-2"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, ${bg} 80%)`,
        }}
      />

      {/* Grid overlay - subtle */}
      <div
        className="absolute inset-0 z-2 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          } 1px, transparent 1px), linear-gradient(90deg, ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          } 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Phase 0: <YH /> — ALL in Garet, same weight */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.5, filter: "blur(30px)" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-baseline select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", damping: 12 }}
            >
              {/* < bracket */}
              <motion.span
                className="text-[80px] md:text-[160px] lg:text-[200px] font-bold leading-none"
                style={{
                  fontFamily: "'Garet', sans-serif",
                  color: isDark
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(15,23,42,0.25)",
                }}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0,
                }}
              >
                {"<"}
              </motion.span>

              {/* YH — bold, accented */}
              <motion.span
                className="text-[80px] md:text-[160px] lg:text-[200px] font-bold leading-none"
                style={{
                  fontFamily: "'Garet', sans-serif",
                  color: accent,
                  textShadow: `0 0 80px ${
                    isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.15)"
                  }`,
                }}
                initial={{ opacity: 0, y: 60, scale: 1.2 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  damping: 12,
                  delay: 0.15,
                }}
              >
                YH
              </motion.span>

              {/* /> closing bracket */}
              <motion.span
                className="text-[80px] md:text-[160px] lg:text-[200px] font-bold leading-none"
                style={{
                  fontFamily: "'Garet', sans-serif",
                  color: isDark
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(15,23,42,0.25)",
                }}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
              >
                <span className="ml-1">/</span>
                {">"}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1+: Full content */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Name */}
            <motion.h1
              className="text-[3rem] md:text-[6.5rem] lg:text-[9rem] font-bold leading-[0.9] tracking-tight text-center"
              style={{ fontFamily: "'Garet', sans-serif" }}
              initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, type: "spring", damping: 14 }}
            >
              <span
                style={{
                  color: accent,
                  textShadow: `0 0 60px ${
                    isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,0,0,0.15)"
                  }`,
                }}
              >
                Yair
              </span>
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: `2px ${
                    isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
                  }`,
                }}
              >
                Hern&aacute;ndez
              </span>
            </motion.h1>

            {/* Typewriter role — GREEN terminal style */}
            <motion.div
              className="flex items-center gap-4 mt-8 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div
                className="h-px w-16"
                style={{
                  background: `linear-gradient(to right, transparent, ${
                    isDark ? "rgba(16,185,129,0.5)" : "rgba(5,150,105,0.4)"
                  })`,
                }}
              />
              {/* Terminal prefix */}
              <span
                className="text-sm md:text-base tracking-[0.15em] uppercase whitespace-nowrap"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: isDark ? "#10B981" : "#059669",
                  textShadow: isDark
                    ? "0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.1)"
                    : "0 0 15px rgba(5,150,105,0.2)",
                }}
              >
                <span style={{ opacity: 0.5 }}>{">"}</span>{" "}
                {currentPhrase}
                <span
                  className="inline-block w-0.5 h-[1.1em] ml-1 align-middle"
                  style={{
                    background: isDark ? "#10B981" : "#059669",
                    animation: "cursor-blink 1s step-end infinite",
                    boxShadow: isDark ? "0 0 8px rgba(16,185,129,0.6)" : "none",
                  }}
                />
              </span>
              <div
                className="h-px w-16"
                style={{
                  background: `linear-gradient(to left, transparent, ${
                    isDark ? "rgba(16,185,129,0.5)" : "rgba(5,150,105,0.4)"
                  })`,
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base md:text-xl text-center max-w-2xl leading-relaxed mb-12"
              style={{ color: mutedColor }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t.hero.desc}
            </motion.p>

            {/* CTA Buttons */}
            {phase >= 2 && (
              <motion.div
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <HeroButton
                  href="#servicios"
                  variant="primary"
                  isDark={isDark}
                  icon={<HiArrowRight className="w-4 h-4" />}
                >
                  {t.hero.cta1}
                </HeroButton>
                <HeroButton
                  href="#contacto"
                  variant="secondary"
                  isDark={isDark}
                  icon={<HiChatBubbleLeftRight className="w-4 h-4" />}
                >
                  {t.hero.cta2}
                </HeroButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      {phase >= 2 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              color: mutedColor,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Scroll
          </span>
          <motion.div
            className="w-5 h-9 rounded-full flex items-start justify-center p-2"
            style={{
              border: `1px solid ${
                isDark ? "rgba(16,185,129,0.3)" : "rgba(5,150,105,0.25)"
              }`,
            }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "#10B981" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
