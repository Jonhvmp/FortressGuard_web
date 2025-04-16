"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export default function CounterAnimation({
  from,
  to,
  duration = 2,
  formatter = (value) => Math.round(value).toLocaleString()
}: CounterAnimationProps) {
  const [count, setCount] = useState(from);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(countRef, { once: true, amount: 0.5 });
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = (timestamp - startTimeRef.current) / (duration * 1000);

      if (progress < 1) {
        const value = from + (to - from) * easeOutExpo(progress);
        setCount(value);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    // Easing function para animação mais natural
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, from, to, duration]);

  return <span ref={countRef}>{formatter(count)}</span>;
}
