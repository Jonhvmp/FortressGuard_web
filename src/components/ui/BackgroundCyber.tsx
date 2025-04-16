"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixColumnProps {
  column: {
    id: number;
    left: string;
    startDelay: number;
    speed: number;
    opacity: number;
    charCount: number;
    initialChars: string[];
    hue: number;
  };
  height: number;
  generateChar: () => string;
  reducedMotion: boolean;
}

// Background animado inspirado no estilo Matrix com quedas de código
export default function BackgroundCyber() {
  // Referência para o container
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para armazenar as dimensões da tela
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Estado para controlar se o componente está visível
  const [isVisible, setIsVisible] = useState(true);

  // Estado para detectar dispositivos de baixo desempenho
  const [lowPerformance, setLowPerformance] = useState(false);

  // Estado para preferência de movimento reduzido
  const [reducedMotion, setReducedMotion] = useState(false);

  // Verificar a performance do dispositivo quando o componente montar
  useEffect(() => {
    // Detecta se é um dispositivo móvel
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Verificação básica de performance
    const checkPerformance = () => {
      if (isMobile) {
        // Reduz automaticamente a complexidade para dispositivos móveis
        const startTime = performance.now();

        // Teste simples de performance
        for (let i = 0; i < 10000; i++) {
          // Executa operação sem armazenar o resultado
          void(i);
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        // Se o teste demorar mais de 5ms, consideramos baixa performance
        setLowPerformance(duration > 5);

        // Verificar preferência de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setReducedMotion(prefersReducedMotion);
      }
    };

    checkPerformance();

    // Configurar o IntersectionObserver para pausar quando fora da tela
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Atualizar dimensões ao carregar e redimensionar
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Executar imediatamente
    updateDimensions();

    // Adicionar listener de resize com throttling para melhor performance
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gerar caracteres do estilo Matrix (memoizado para evitar recálculos)
  const matrixChars = useMemo(() =>
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",
    []
  );

  const generateMatrixChar = useCallback(() => {
    return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
  }, [matrixChars]);

  // Calcular o número de colunas baseado na largura da tela (responsivo e otimizado)
  const columnCount = useMemo(() => {
    if (dimensions.width === 0) return 0;

    // Densidade de colunas adaptada ao tamanho da tela e performance
    const baseDensity = dimensions.width < 768 ? 45 : 30;
    const density = lowPerformance ? baseDensity * 1.5 : baseDensity;

    // Reduz drasticamente em dispositivos de baixo desempenho
    const maxColumns = lowPerformance
      ? Math.min(20, Math.floor(dimensions.width / density))
      : Math.min(48, Math.floor(dimensions.width / density));

    return Math.max(8, maxColumns);
  }, [dimensions.width, lowPerformance]);

  // Criar colunas de Matrix com variação de cores e velocidades
  const matrixColumns = useMemo(() => {
    if (dimensions.width === 0 || !isVisible) return [];

    const adjustedCount = reducedMotion ? Math.floor(columnCount * 0.5) : columnCount;

    return Array.from({ length: adjustedCount }).map((_, colIndex) => {
      // Características aleatórias para cada coluna
      const startDelay = Math.random() * 3;

      // Ajustando velocidade para melhor performance em dispositivos móveis
      const speedFactor = Math.random();
      const speedBase = lowPerformance ? 1.5 : 1;
      const speed = speedFactor < 0.2
        ? (2 + Math.random() * 1) * speedBase // 20% das colunas muito rápidas
        : speedFactor > 0.8
          ? (6 + Math.random() * 3) * speedBase // 20% das colunas mais lentas
          : (3 + Math.random() * 2) * speedBase; // 60% com velocidade média

      const left = `${(colIndex / adjustedCount) * 100}%`;

      // Reduz o comprimento para melhor performance
      const charCount = lowPerformance
        ? 4 + Math.floor(Math.random() * 6)
        : 6 + Math.floor(Math.random() * 14);

      // Variação na opacidade para adicionar profundidade
      const opacity = 0.4 + Math.random() * 0.6;

      // Leve variação na cor para um efeito mais elegante
      // Ainda mantém a temática verde, mas com sutis variações
      const hue = 120 + Math.random() * 20 - 10; // Base 120 (verde) com variação de ±10

      // Matriz de caracteres iniciais
      const initialChars = Array.from({ length: charCount }, generateMatrixChar);

      return {
        id: colIndex,
        left,
        startDelay,
        speed,
        opacity,
        charCount,
        initialChars,
        hue
      };
    });
  }, [columnCount, dimensions.width, generateMatrixChar, isVisible, lowPerformance, reducedMotion]);

  // Partículas flutuantes com movimento mais orgânico
  const particles = useMemo(() => {
    if (dimensions.width === 0 || !isVisible) return [];

    // Reduz o número de partículas em dispositivos de baixo desempenho
    const particleCount = lowPerformance ? 8 : reducedMotion ? 12 : 20;

    return Array.from({ length: particleCount }).map((_, i) => {
      const size = Math.random() * 2.5 + 0.5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 6 + Math.random() * 8;

      // Movimento mais simples em dispositivos de baixo desempenho
      const xMovement = lowPerformance ? 0 : Math.random() * 20 - 10; // movimento de ±10%

      return (
        <motion.span
          key={`particle-${i}`}
          className="absolute rounded-full shadow-lg"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            top: `${top}%`,
            backgroundColor: `rgba(10, 255, 10, ${0.1 + Math.random() * 0.3})`,
            filter: `blur(${Math.random() * 2}px)`,
            zIndex: 1
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? {
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
            x: [0, xMovement, 0],
            y: [0, -30, 0]
          } : { opacity: 0 }}
          transition={{
            duration,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      );
    });
  }, [dimensions.width, isVisible, lowPerformance, reducedMotion]);

  // Efeito de pulso suave que percorre a tela
  const pulseEffect = useMemo(() => {
    if (dimensions.height === 0 || !isVisible || (lowPerformance && reducedMotion)) return null;

    return (
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(10, 255, 10, 0.2) 0%, transparent 50%)',
          backgroundSize: '150% 150%'
        }}
        animate={isVisible ? {
          backgroundPosition: [
            '0% 0%',
            '100% 100%',
            '0% 100%',
            '100% 0%',
            '0% 0%'
          ]
        } : {}}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
      />
    );
  }, [dimensions.height, isVisible, lowPerformance, reducedMotion]);

  // Versão simplificada para dispositivos de muito baixa performance
  if (lowPerformance && reducedMotion) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-background/90 to-background opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJtYXRyaXhQYXR0ZXJuIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjx0ZXh0IHg9IjUiIHk9IjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIiBmaWxsPSJyZ2JhKDAsIDI1NSwgMCwgMC4yKSI+MTwvdGV4dD48dGV4dCB4PSIyNSIgeT0iMzAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9InJnYmEoMCwgMjU1LCAwLCAwLjIpIj4wPC90ZXh0Pjx0ZXh0IHg9IjM1IiB5PSIxNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCIgZmlsbD0icmdiYSgwLCAyNTUsIDAsIDAuMSkiPk08L3RleHQ+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI21hdHJpeFBhdHRlcm4pIiAvPjwvc3ZnPg==')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background opacity-70" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black"
      aria-hidden="true"
    >
      {/* Gradiente de fundo para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-background/90 to-background opacity-90" />

      {/* Efeito de pulso */}
      {pulseEffect}

      {/* Efeito de escaneamento horizontal sutil - desabilitado em dispositivos lentos */}
      {dimensions.height > 0 && isVisible && !lowPerformance && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          animate={{
            y: [dimensions.height * -1, dimensions.height * 2]
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear"
          }}
        />
      )}

      {/* Colunas de Matrix */}
      <AnimatePresence>
        {isVisible && matrixColumns.map(column => (
          <MatrixColumn
            key={`col-${column.id}`}
            column={column}
            height={dimensions.height}
            generateChar={generateMatrixChar}
            reducedMotion={lowPerformance || reducedMotion}
          />
        ))}
      </AnimatePresence>

      {/* Partículas brilhantes */}
      {particles}

      {/* Overlay com vibrância para dar mais profundidade */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/30" />

      {/* Vinheta para melhorar o foco central */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background opacity-70" />
    </div>
  );
}

// Componente para cada coluna Matrix
function MatrixColumn({ column, height, generateChar, reducedMotion }: MatrixColumnProps) {
  const { id, left, startDelay, speed, opacity, charCount, initialChars, hue } = column;

  // Estado para os caracteres (inicializado com os caracteres gerados)
  const [chars, setChars] = useState(initialChars);

  // Estados para efeitos visuais
  const [glowIntensity, setGlowIntensity] = useState(Math.random());

  // Atualizar caracteres aleatoriamente com efeito visual melhorado
  useEffect(() => {
    if (height === 0) return;

    const intervals: NodeJS.Timeout[] = [];

    // Intervalo mais longo para dispositivos de baixo desempenho
    const glowInterval = setInterval(() => {
      setGlowIntensity(0.7 + Math.random() * 0.3); // Variação de 0.7 a 1.0
    }, (500 + Math.random() * 1000) * (reducedMotion ? 2 : 1));

    intervals.push(glowInterval);

    // Menos atualizações de caracteres em dispositivos de baixo desempenho
    if (!reducedMotion) {
      chars.forEach((_, index) => {
        // Cabeça da coluna muda mais rápido que a cauda
        const updateFrequency = index === 0
          ? 80 + Math.random() * 120 // 80-200ms para a cabeça
          : index < 3
            ? 200 + Math.random() * 300 // 200-500ms para os primeiros caracteres
            : 500 + Math.random() * 1500; // 500-2000ms para o resto

        // Probabilidade de mudança varia com a posição
        const changeChance = index === 0
          ? 0.5 // 50% para a cabeça
          : index < 3
            ? 0.4 // 40% para os primeiros caracteres
            : 0.3; // 30% para o resto

        const interval = setInterval(() => {
          if (Math.random() < changeChance) {
            setChars(prevChars => {
              const newChars = [...prevChars];
              newChars[index] = generateChar();
              return newChars;
            });
          }
        }, updateFrequency);

        intervals.push(interval);
      });
    } else {
      // Versão simplificada para dispositivos de baixo desempenho
      // Apenas atualiza alguns caracteres ocasionalmente
      const simpleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * chars.length);
        setChars(prevChars => {
          const newChars = [...prevChars];
          newChars[randomIndex] = generateChar();
          return newChars;
        });
      }, 500 + Math.random() * 500);

      intervals.push(simpleInterval);
    }

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [chars, generateChar, height, reducedMotion]);

  // Animação de movimento da coluna com efeito de aceleração natural
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: 0, opacity }}
      initial={{ y: height * -0.5 }}
      animate={{ y: height * 1.5 }}
      exit={{ opacity: 0 }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: [0.1, 0.3, 0.7, 0.9], // Efeito de aceleração mais natural
        delay: startDelay
      }}
    >
      {chars.map((char, charIndex) => {
        // Brilho maior para o primeiro caractere (cabeça da coluna)
        const isHead = charIndex === 0;
        const isNearHead = charIndex < 3;

        // Opacidade baseada na distância da cabeça
        const charOpacity = isHead
          ? 1
          : Math.max(0.1, 1 - (charIndex / (charCount * 0.7)));

        // Brilho reduzido em dispositivos de baixo desempenho
        const glowAmount = reducedMotion
          ? 'none'  // Sem glow em dispositivos de baixo desempenho
          : isHead
            ? `0 0 ${8 * glowIntensity}px rgba(10, 255, 10, ${0.8 * glowIntensity})`
            : isNearHead
              ? `0 0 ${3 * glowIntensity}px rgba(10, 255, 10, ${0.3 * glowIntensity})`
              : 'none';

        // Tamanho decresce gradualmente - menor em dispositivos de baixo desempenho
        const fontSize = reducedMotion
          ? (isHead ? "text-sm" : "text-xs")
          : isHead
            ? "text-lg md:text-xl"
            : isNearHead
              ? "text-base md:text-lg"
              : charIndex < 5
                ? "text-sm md:text-base"
                : "text-xs md:text-sm";

        // Cores variam sutilmente com base no hue definido para a coluna
        const charColor = isHead
          ? '#ffffff'
          : isNearHead
            ? `hsl(${hue}, 100%, ${70 - charIndex * 5}%)`
            : `hsl(${hue}, 100%, ${60 - charIndex * 3}%)`;

        // Sem blur em dispositivos de baixo desempenho
        const blurAmount = reducedMotion
          ? '0px'
          : isHead
            ? '0px'
            : isNearHead
              ? '0.2px'
              : `${Math.min(1, charIndex * 0.1)}px`;

        return (
          <motion.div
            key={`char-${id}-${charIndex}`}
            className={`absolute font-mono ${fontSize}`}
            style={{
              left: 0,
              top: `${(charIndex * 1.2)}em`,
              opacity: charOpacity,
              color: charColor,
              textShadow: glowAmount,
              filter: `blur(${blurAmount})`,
              transformOrigin: 'center'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: charOpacity,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
