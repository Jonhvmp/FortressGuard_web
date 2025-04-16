"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { PiShieldCheckBold, PiArrowRightBold, PiLockBold, PiCurrencyDollarBold, PiTimerBold, PiWarningBold, PiCopySimpleBold } from "react-icons/pi";
import AnimatedButton from "@src/components/ui/AnimatedButton";
import GlitchText from "@src/components/ui/GlitchText";

// Função para gerar um tempo aleatório realista (entre 17 e 47 horas)
const generateRandomTime = (): number => {
  // Número entre 17 e 47 horas convertido para segundos
  const hoursRange = Math.floor(Math.random() * (47 - 17 + 1) + 17);
  // Minutos aleatórios para dar um aspecto mais natural (0-59)
  const minutesRange = Math.floor(Math.random() * 60);
  // Segundos aleatórios para dar um aspecto mais natural (0-59)
  const secondsRange = Math.floor(Math.random() * 60);

  // Convertendo tudo para segundos
  return (hoursRange * 3600) + (minutesRange * 60) + secondsRange;
};

// Função para formatar segundos para o formato HH:MM:SS
const formatTimeFromSeconds = (totalSeconds: number): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export default function CTASection() {
  // Estado para o contador regressivo
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Estado para total de segundos restantes (para cálculos internos)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Número artificial de templates restantes
  const [templatesLeft, setTemplatesLeft] = useState(7);

  // Estado para copiar código de desconto
  const [couponCopied, setCouponCopied] = useState(false);

  // Código do cupom de desconto
  const discountCode = "fortressguard35";

  // Função para copiar código de desconto
  const copyCouponCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  };

  // Efeito pulsante para destacar o desconto - Corrigindo o tipo para Variants
  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const // Aqui usamos "as const" para fixar o tipo
      }
    }
  };

  // Efeito de aparecer para os benefícios
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  // Inicialização do timer a partir do localStorage ou gerando um novo
  useEffect(() => {
    const initializeTimer = () => {
      // Verifica se há um tempo salvo no localStorage
      const savedEndTime = localStorage.getItem('offerEndTime');
      const now = new Date().getTime();

      if (savedEndTime) {
        const endTime = parseInt(savedEndTime, 10);

        // Verifica se o tempo não expirou
        if (endTime > now) {
          const remainingSeconds = Math.floor((endTime - now) / 1000);
          setSecondsLeft(remainingSeconds);
          setTimeLeft(formatTimeFromSeconds(remainingSeconds));
          return;
        }
      }

      // Se não há tempo salvo ou já expirou, gera um novo
      const newRandomSeconds = generateRandomTime();
      const newEndTime = now + (newRandomSeconds * 1000);

      // Salva o novo tempo no localStorage
      localStorage.setItem('offerEndTime', newEndTime.toString());

      setSecondsLeft(newRandomSeconds);
      setTimeLeft(formatTimeFromSeconds(newRandomSeconds));
    };

    initializeTimer();
  }, []);

  // Timer regressivo atualizado
  useEffect(() => {
    // Só iniciar o timer quando secondsLeft estiver definido
    if (secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === null || prev <= 0) {
          // Se o tempo acabou, gera um novo tempo aleatório
          const newTime = generateRandomTime();
          const newEndTime = new Date().getTime() + (newTime * 1000);
          localStorage.setItem('offerEndTime', newEndTime.toString());

          // Atualiza o estado visual do timer
          setTimeLeft(formatTimeFromSeconds(newTime));

          return newTime;
        }

        const newSeconds = prev - 1;
        setTimeLeft(formatTimeFromSeconds(newSeconds));
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Gerenciar templates restantes no localStorage
  useEffect(() => {
    const initializeTemplates = () => {
      const savedTemplates = localStorage.getItem('templatesLeft');

      if (savedTemplates) {
        setTemplatesLeft(parseInt(savedTemplates, 10));
      } else {
        // Valor inicial entre 5 e 9
        const initialTemplates = Math.floor(Math.random() * (9 - 5 + 1) + 5);
        setTemplatesLeft(initialTemplates);
        localStorage.setItem('templatesLeft', initialTemplates.toString());
      }
    };

    initializeTemplates();
  }, []);

  // Atualizar a quantidade de templates disponíveis
  useEffect(() => {
    // A cada 3-7 minutos, diminuímos a quantidade de templates disponíveis para criar urgência
    const randomMinutes = Math.floor(Math.random() * (7 - 3 + 1) + 3);
    const randomTime = randomMinutes * 60 * 1000;

    const decreaseTimer = setTimeout(() => {
      setTemplatesLeft(prev => {
        // Garantimos que o número mínimo seja 2 para manter a urgência
        if (prev > 2) {
          const newValue = prev - 1;
          localStorage.setItem('templatesLeft', newValue.toString());
          return newValue;
        }
        return prev;
      });
    }, randomTime);

    return () => clearTimeout(decreaseTimer);
  }, [templatesLeft]);

  // Lista de benefícios
  const benefits = [
    "Design cyberpunk completo e otimizado",
    "Componentes React reutilizáveis",
    "Integração com APIs de segurança",
    "Animações profissionais com Framer Motion",
    "Estilos Tailwind CSS personalizáveis",
    "Suporte técnico por 30 dias"
  ];

  // Verificar se o timer está em um estágio crítico (menos de 3 horas)
  const isTimeCritical = timeLeft.hours < 3;

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/0 via-primary/10 to-muted/0 z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center neon-border rounded-xl p-8 md:p-12 bg-black/80 backdrop-blur-md scan-line mt-16 overflow-hidden"
      >
        {/* Badge de oferta limitada */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120 }}
          className="absolute -left-2 top-6 bg-primary/90 text-black py-1 px-4 rotate-[-35deg] font-bold text-sm z-10 shadow-lg"
        >
          OFERTA LIMITADA
        </motion.div>

        {/* Glow effect no background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.25), transparent 60%)",
              "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.15), transparent 50%)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 z-0"
        />

        {/* Header da oferta reestruturado - badge em cima, título embaixo, descrição depois */}
        <div className="mb-8">
          {/* Badge em primeiro lugar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <div className="inline-block p-1.5 px-4 rounded-full bg-primary/20 border border-primary/40">
              <span className="text-primary font-terminal text-sm tracking-wider">OFERTA EXCLUSIVA</span>
            </div>
          </motion.div>

          {/* Título em segundo lugar */}
          <GlitchText as="h2" className="text-3xl md:text-5xl font-bold mb-4 font-orbitron tracking-tight leading-tight uppercase">
            Adquira este <span className="text-primary cyber-glow">Template</span> Agora
          </GlitchText>

          {/* Descrição em terceiro lugar */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
          >
            Implemente sua própria fortaleza digital com este design cyberpunk profissional
          </motion.p>
        </div>

        {/* Desconto e preço */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="mb-8 bg-gradient-to-r from-primary/20 to-secondary/20 py-5 px-4 rounded-lg max-w-md mx-auto border border-primary/30"
        >
          <div className="flex justify-center items-center gap-4 mb-2">
            <div className="text-lg font-mono line-through text-muted-foreground">R$82,90</div>
            <div className="bg-primary/90 text-black font-bold px-2 py-1 rounded text-sm">-35%</div>
          </div>
          <div className="text-4xl font-orbitron font-bold text-primary mb-1">R$53,88</div>
          <div className="text-sm text-muted-foreground">Preço com desconto aplicado</div>
        </motion.div>

        {/* Campo de código de desconto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            <PiCurrencyDollarBold className="text-green-500" size={18} />
            <span className="text-green-500 font-terminal text-sm">CÓDIGO DE DESCONTO:</span>
          </div>

          <div className="relative flex items-center">
            <div className="flex-1 bg-black/60 border border-green-500/30 p-3 rounded font-mono text-green-400 flex items-center justify-center select-all">
              {discountCode}
            </div>
            <button
              onClick={copyCouponCode}
              className="absolute right-3 text-muted-foreground hover:text-green-400 transition-colors"
              aria-label="Copiar código de desconto"
            >
              <PiCopySimpleBold size={20} />
              {couponCopied && (
                <span className="absolute -top-8 right-0 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded whitespace-nowrap">
                  Código copiado!
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Timer regressivo para urgência */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            <PiTimerBold className={isTimeCritical ? "text-red-500 animate-pulse" : "text-red-500"} size={20} />
            <span className={isTimeCritical ? "text-red-500 font-terminal text-sm animate-pulse" : "text-red-500 font-terminal text-sm"}>
              {isTimeCritical ? "TEMPO QUASE ESGOTADO:" : "OFERTA EXPIRA EM:"}
            </span>
          </div>

          <div className="flex justify-center gap-4 font-mono">
            <div className={`bg-black/60 p-3 rounded-lg border ${isTimeCritical ? 'border-red-500/50 animate-pulse' : 'border-red-500/30'} w-20`}>
              <div className={`text-2xl font-bold ${isTimeCritical ? 'text-red-500' : 'text-red-400'}`}>
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground">HORAS</div>
            </div>
            <div className={`bg-black/60 p-3 rounded-lg border ${isTimeCritical ? 'border-red-500/50 animate-pulse' : 'border-red-500/30'} w-20`}>
              <div className={`text-2xl font-bold ${isTimeCritical ? 'text-red-500' : 'text-red-400'}`}>
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground">MINUTOS</div>
            </div>
            <div className={`bg-black/60 p-3 rounded-lg border ${isTimeCritical ? 'border-red-500/50 animate-pulse' : 'border-red-500/30'} w-20`}>
              <div className={`text-2xl font-bold ${isTimeCritical ? 'text-red-500' : 'text-red-400'}`}>
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground">SEGUNDOS</div>
            </div>
          </div>
        </motion.div>

        {/* Alerta de quantidade limitada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className={`mb-8 flex items-center justify-center gap-2 ${templatesLeft < 4 ? 'bg-yellow-900/40 animate-pulse' : 'bg-yellow-900/30'
            } p-2 rounded-lg border border-yellow-500/30 max-w-sm mx-auto`}
        >
          <PiWarningBold className="text-yellow-500" size={20} />
          {templatesLeft < 4 ? (
            <span className="text-yellow-400 font-terminal text-sm">
              <strong>URGENTE:</strong> Apenas {templatesLeft} templates disponíveis!
            </span>
          ) : (
            <span className="text-yellow-400 font-terminal text-sm">
              Apenas {templatesLeft} templates disponíveis neste valor!
            </span>
          )}
        </motion.div>

        {/* Lista de benefícios */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-left max-w-md mx-auto"
        >
          <div className="text-center mb-4 font-terminal text-primary">O QUE VOCÊ RECEBE:</div>
          <div className="grid gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 bg-black/40 p-2 rounded border border-primary/20"
              >
                <PiShieldCheckBold size={20} className="text-primary" />
                <span className="text-sm font-terminal text-muted-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botão de compra - Ajustado para telas menores */}
        <AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4"
          >
            <AnimatedButton
              href="https://buy.stripe.com/00g14i8PN3sX8co6ov"
              primary
              size="large"
              className="font-terminal tracking-wider uppercase px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm sm:text-base md:text-base max-w-full mx-auto"
            >
              <span className="inline-flex items-center justify-center gap-1 sm:gap-2">
                <PiCurrencyDollarBold size={18} className="hidden xs:inline md:inline" />
                <span>GARANTIR MEU TEMPLATE</span>
                <PiArrowRightBold size={16} className="hidden xs:inline md:inline" />
              </span>
            </AnimatedButton>
          </motion.div>
        </AnimatePresence>

        {/* Garantias e segurança */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <PiLockBold className="text-primary" />
            <span>Pagamento 100% seguro via Stripe</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-terminal cyberpunk-terminal">
            $ ./security --template=fortress --discount=35% --payment=secure
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
