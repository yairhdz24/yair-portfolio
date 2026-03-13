"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Swoosh({
  color = "#7c3aed",
  width = 200,
  className = "",
}: {
  color?: string;
  width?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <svg
      ref={ref}
      width={width}
      height="12"
      viewBox="0 0 200 12"
      fill="none"
      className={className}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d="M0 8 C40 2, 80 12, 120 4 S180 10, 200 6"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
      <motion.path
        d="M10 10 C50 4, 90 14, 130 6 S170 12, 195 8"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
  );
}
