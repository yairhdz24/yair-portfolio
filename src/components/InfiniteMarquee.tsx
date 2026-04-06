"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MarqueeItem {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  name: string;
  color: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  separator?: string;
  className?: string;
}

export default function InfiniteMarquee({
  items,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  separator = "·",
  className = "",
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const track = container.querySelector(".marquee-track") as HTMLElement;
    if (!track) return;

    // Duplicate content for seamless loop
    const content = track.querySelector(".marquee-content") as HTMLElement;
    if (!content) return;

    const clone = content.cloneNode(true) as HTMLElement;
    track.appendChild(clone);

    const contentWidth = content.offsetWidth;
    const duration = contentWidth / speed;

    const xFrom = direction === "left" ? 0 : -contentWidth;
    const xTo = direction === "left" ? -contentWidth : 0;

    gsap.set(track, { x: xFrom });

    tweenRef.current = gsap.to(track, {
      x: xTo,
      duration,
      ease: "none",
      repeat: -1,
    });

    const handleMouseEnter = () => {
      if (pauseOnHover && tweenRef.current) {
        gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover && tweenRef.current) {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      tweenRef.current?.kill();
    };
  }, [items, speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div className="marquee-track flex whitespace-nowrap">
        <div className="marquee-content flex items-center gap-8 px-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex items-center gap-3 group cursor-default">
                <item.icon
                  className="text-xl transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:scale-110"
                  style={{ color: item.color }}
                />
                <span
                  className="text-sm font-medium transition-opacity duration-300 opacity-30 group-hover:opacity-70"
                  style={{ color: "var(--text)" }}
                >
                  {item.name}
                </span>
              </div>
              {i < items.length - 1 && (
                <span className="text-lg opacity-10" style={{ color: "var(--text)" }}>
                  {separator}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
