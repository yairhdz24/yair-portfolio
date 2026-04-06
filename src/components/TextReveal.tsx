"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars" | "lines";
  animationType?: "slide-up" | "fade-blur" | "mask-up";
}

export default function TextReveal({
  children,
  className = "",
  style,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.04,
  splitBy = "words",
  animationType = "slide-up",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const text = children;

    // Split text into elements
    let parts: string[];
    if (splitBy === "chars") {
      parts = text.split("");
    } else if (splitBy === "lines") {
      parts = text.split("\n");
    } else {
      parts = text.split(" ");
    }

    // Build HTML
    el.innerHTML = parts
      .map((part) => {
        const display = splitBy === "words" ? part + "\u00A0" : part;
        return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="text-reveal-inner" style="display:inline-block;will-change:transform,opacity;">${display}</span></span>`;
      })
      .join("");

    const innerEls = el.querySelectorAll(".text-reveal-inner");

    // Animation configs
    const animations: Record<string, { from: gsap.TweenVars }> = {
      "slide-up": {
        from: { yPercent: 110, opacity: 0, rotateX: -20 },
      },
      "fade-blur": {
        from: { opacity: 0, filter: "blur(12px)", y: 20 },
      },
      "mask-up": {
        from: { yPercent: 100 },
      },
    };

    const config = animations[animationType] || animations["slide-up"];

    gsap.fromTo(innerEls, config.from, {
      yPercent: 0,
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 0.9,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, splitBy, animationType]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ ...style, perspective: "600px" }}
    >
      {children}
    </Tag>
  );
}
