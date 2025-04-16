"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  primary = false,
  secondary = false,
  size = "medium",
  className = "",
  disabled = false
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBaseStyles = () => {
    const sizeClasses = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg"
    };

    let styleClasses = "";

    if (primary) {
      styleClasses = "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50";
    } else if (secondary) {
      styleClasses = "bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50";
    } else {
      styleClasses = "bg-white/10 hover:bg-white/20 text-white border border-white/30";
    }

    if (disabled) {
      styleClasses = "bg-muted/50 text-muted-foreground border border-muted cursor-not-allowed";
    }

    return `inline-flex items-center justify-center rounded-md ${sizeClasses[size]} ${styleClasses} transition-all`;
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const particleVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: [0, 0.5, 0],
      x: [0, Math.random() * 10 - 5],
      y: [0, -10],
      transition: { duration: 0.8, repeat: Infinity, repeatType: "loop" as const }
    }
  };

  const baseClassNames = `${getBaseStyles()} ${className}`;

  // Generate particles for hover effect
  const particles = Array.from({ length: 8 }).map((_, i) => (
    <motion.span
      key={i}
      variants={particleVariants}
      className={`absolute w-1 h-1 rounded-full ${primary ? 'bg-primary' : secondary ? 'bg-secondary' : 'bg-white'}`}
      style={{
        left: `${10 + Math.random() * 80}%`,
        bottom: '0%',
        opacity: 0
      }}
    />
  ));

  if (href) {
    return (
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover={disabled ? "initial" : "hover"}
        whileTap={disabled ? "initial" : "tap"}
        className="relative inline-block"
        onHoverStart={() => !disabled && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Link href={href} className={baseClassNames}>
          <span className="relative z-10 whitespace-nowrap">{children}</span>
          {isHovered && particles}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? "initial" : "hover"}
      whileTap={disabled ? "initial" : "tap"}
      className={`relative ${baseClassNames}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {isHovered && particles}
    </motion.button>
  );
}
