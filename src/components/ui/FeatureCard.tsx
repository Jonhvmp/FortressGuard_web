"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  colorClass = "text-primary"
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-muted transition-all relative
        ${isHovered ? 'neon-border' : 'hover:border-muted/80'}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`${colorClass} mb-4`}>
        {icon}
      </div>

      <h3 className="text-lg font-orbitron font-bold mb-2">{title}</h3>

      <p className="text-sm text-muted-foreground font-tech">{description}</p>

      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at center, var(--${colorClass.split('-')[1]}) 0%, transparent 70%)`
          }}
        />
      )}
    </motion.div>
  );
}
