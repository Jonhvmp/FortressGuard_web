"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
}

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className = "",
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Normalizar o valor do progresso para um percentual
  const calculateProgress = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const progress = calculateProgress(value);

  // Calcular novo valor com base na posição do mouse
  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);
    const rawValue = min + percent * (max - min);

    // Arredondar para o step mais próximo
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.min(Math.max(min, steppedValue), max);

    onChange(clampedValue);
  }, [min, max, step, onChange]);

  // Event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updateValue]);

  return (
    <div className={`relative h-6 ${className}`}>
      {/* Track Background */}
      <div
        ref={trackRef}
        className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full bg-muted/50 cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Active Track */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary/70"
          style={{ width: `${progress}%` }}
        />

        {/* Glowing Effect on Active Track */}
        <div
          className="absolute left-0 top-0 h-full rounded-full opacity-30 blur-sm bg-primary"
          style={{ width: `${progress}%` }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border border-primary/50 shadow-lg cursor-grab"
          style={{ left: `${progress}%` }}
          animate={{
            boxShadow: isDragging
              ? "0 0 0 3px rgba(10, 255, 10, 0.2), 0 0 10px rgba(10, 255, 10, 0.4)"
              : "0 0 0 0px rgba(10, 255, 10, 0.1), 0 0 5px rgba(10, 255, 10, 0.2)"
          }}
          whileTap={{ cursor: "grabbing" }}
        />
      </div>

      {/* Value Markers */}
      <div className="absolute top-full left-0 w-full flex justify-between mt-1 text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
