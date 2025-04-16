"use client";

import { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  glitchIntensity?: number;
}

export default function GlitchText({
  children,
  as: Component = "div",
  className = "",
  glitchIntensity = 4
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  // Trigger glitch effect randomly
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of glitching
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 250);
      }
    }, 2000 + Math.random() * 4000); // Random interval between 2-6 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  const glitchVariants = {
    normal: {
      textShadow: "0 0 0 rgba(0,0,0,0)"
    },
    glitch: {
      textShadow: [
        "0.05em 0 0 rgba(10,255,10,0.75), -0.05em -0.025em 0 rgba(0,153,255,0.75)",
        "-0.05em -0.025em 0 rgba(10,255,10,0.75), 0.025em 0.025em 0 rgba(0,153,255,0.75)",
        "0.025em 0.05em 0 rgba(10,255,10,0.75), -0.05em -0.025em 0 rgba(0,153,255,0.75)",
        "-0.05em -0.05em 0 rgba(10,255,10,0.75), -0.025em 0.05em 0 rgba(0,153,255,0.75)",
        "-0.05em 0 0 rgba(10,255,10,0.75), 0.025em 0 0 rgba(0,153,255,0.75)",
      ],
      x: [0, -1, 1, -1, 1, 0].map(x => x * glitchIntensity * 0.5),
      y: [0, 1, -1, 1, -1, 0].map(y => y * glitchIntensity * 0.5),
      transition: { duration: 0.4, repeat: 0 }
    }
  };

  return (
    <motion.div
      className="inline-block"
      variants={glitchVariants}
      animate={isGlitching ? "glitch" : "normal"}
    >
      <Component className={`${isGlitching ? 'glitch-effect' : ''} ${className}`}>
        {children}
      </Component>
    </motion.div>
  );
}
