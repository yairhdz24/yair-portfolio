"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  accent?: string;
  variant?: "line" | "gradient" | "dots";
}

export default function SectionDivider({
  accent = "#10B981",
  variant = "gradient",
}: SectionDividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (variant === "dots") {
    return (
      <div ref={ref} className="flex items-center justify-center gap-3 py-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.4 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
          />
        ))}
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div ref={ref} className="flex items-center justify-center py-8">
        <motion.div
          className="h-px w-full max-w-md"
          style={{ background: `linear-gradient(to right, transparent, ${accent}40, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }

  // gradient variant
  return (
    <div ref={ref} className="relative py-6 overflow-hidden">
      <motion.div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}25 20%, ${accent}50 50%, ${accent}25 80%, transparent 100%)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Center glow dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 20px ${accent}60` }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      />
    </div>
  );
}
