"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalAnimationProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
}

export default function TerminalAnimation({
  lines,
  typingSpeed = 50,
  className = ""
}: TerminalAnimationProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      if (currentChar < lines[currentLine].length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (currentLine >= newLines.length) {
            newLines.push(lines[currentLine].substring(0, currentChar + 1));
          } else {
            newLines[currentLine] = lines[currentLine].substring(0, currentChar + 1);
          }
          return newLines;
        });
        setCurrentChar(prev => prev + 1);
      } else {
        // Line complete, move to next
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, 500); // Pausa entre linhas
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, typingSpeed]);

  return (
    <div className={`font-terminal text-xs sm:text-sm md:text-base text-left break-words ${className}`}>
      {displayedLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 break-words"
        >
          <span className="text-primary whitespace-pre-wrap break-words">{line}</span>
          {index === displayedLines.length - 1 && showCursor && (
            <span className="text-primary animate-pulse">▋</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
