"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const move = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; };
    const animate = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      if (blobRef.current) blobRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX - 4}px, ${targetY - 4}px)`;
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    requestAnimationFrame(animate);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Large glow blob */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          background: "radial-gradient(circle, var(--text-ghost) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Small precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ background: "white" }}
      />
    </>
  );
}
