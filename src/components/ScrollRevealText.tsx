"use client";

import { useRef, CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollRevealText({
  children,
  className = "",
  style,
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = children.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`} style={style}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}
