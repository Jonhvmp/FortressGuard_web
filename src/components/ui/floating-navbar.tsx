"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaShieldAlt, FaLock } from "react-icons/fa";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [securityCode, setSecurityCode] = useState("");

  // Gerar código de segurança aleatório
  useEffect(() => {
    const generateSecurityCode = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const interval = setInterval(() => {
      setSecurityCode(generateSecurityCode());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() || 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Caracteres digitais aleatórios para animação
  const DigitalFlicker = () => {
    const [char, setChar] = useState("0");

    useEffect(() => {
      const chars = "01:./|-_+=";
      const interval = setInterval(() => {
        setChar(chars[Math.floor(Math.random() * chars.length)]);
      }, 200);

      return () => clearInterval(interval);
    }, []);

    return <span className="text-primary/70 text-xs animate-pulse">{char}</span>;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto rounded-xl z-[5000] pr-3 pl-4 py-2 items-center justify-center space-x-4",
          "bg-background/80 backdrop-blur-lg border border-primary/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]",
          className
        )}
      >
        {/* Terminal indicators */}
        <div className="flex space-x-1 mr-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/70"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Security code */}
        <div className="hidden sm:flex items-center mr-2 bg-background/40 px-2 py-0.5 rounded border border-primary/20">
          <span className="text-[10px] font-terminal text-primary/80 mr-1">SEC:</span>
          <span className="text-[10px] font-terminal text-white/70">{securityCode}</span>
        </div>

        {/* Shield icon */}
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="text-primary w-5 h-5 mr-1"
        >
          <FaShieldAlt size={18} />
        </motion.div>

        {/* Nav items */}
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative group items-center flex space-x-1 text-sm font-tech",
              "text-white/80 hover:text-primary transition-colors duration-200"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">
              {navItem.name}
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary/70"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        ))}

        {/* Login button with cyberpunk style */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden border border-primary/50 text-white font-tech px-4 py-1.5 rounded-lg bg-primary/10 group"
        >
          <span className="relative z-10 flex items-center">
            <FaLock className="mr-2 text-primary w-3 h-3" />
            <span>Secure Login</span>
          </span>

          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glitch scan effect */}
          <motion.div
            className="absolute inset-0 w-full h-1 bg-primary/30"
            initial={{ y: 0 }}
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Digital characters in corners */}
          <div className="absolute top-0 left-0 text-[8px] opacity-80 text-primary">
            <DigitalFlicker />
          </div>
          <div className="absolute bottom-0 right-0 text-[8px] opacity-80 text-primary">
            <DigitalFlicker />
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
