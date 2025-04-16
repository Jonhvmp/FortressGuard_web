"use client";

import { motion } from "framer-motion";
import TerminalAnimation from "@src/components/ui/TerminalAnimation";
import GlitchText from "@src/components/ui/GlitchText";
import AnimatedButton from "@src/components/ui/AnimatedButton";
import { PiArrowRightBold, PiShieldCheckBold } from "react-icons/pi";
import { FaCode, FaShieldAlt } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto text-center"
      >
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-primary"
            >
              <FaShieldAlt size={56} className="drop-shadow-[0_0_8px_rgba(10,255,10,0.7)]" />
            </motion.div>
          </div>

          <GlitchText
            as="h1"
            className="text-4xl md:text-6xl font-bold mb-4 font-orbitron tracking-tight"
            glitchIntensity={5}
          >
            FORTRESS<span className="text-primary">GUARD</span>
          </GlitchText>
          <p className="text-xl md:text-2xl text-muted-foreground font-terminal tracking-widest">
            &lt;proteção_digital::<span className="text-primary">avançada</span>/&gt;
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 mb-12 w-full max-w-3xl mx-auto scan-line"
        >
          <TerminalAnimation
            lines={[
              "> iniciando_sistema_de_segurança...",
              "> carregando_protocolos_AES-256...",
              "> verificando_integridade_das_chaves...",
              "> estabelecendo_perímetro_de_segurança...",
              "> sistema FortressGuard v1.3.7 ativado.",
              "> bem-vindo_ao_futuro_da_proteção_digital."
            ]}
            typingSpeed={40}
            className="p-2 md:p-4 lg:p-6 rounded-lg neon-border bg-black/60 backdrop-blur-sm text-xs sm:text-sm md:text-base overflow-x-hidden"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <AnimatedButton
            href="/api-test"
            primary
            size="large"
            className="font-terminal tracking-wider uppercase"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <PiShieldCheckBold size={20} />
              <span>INICIAR PROTEÇÃO</span>
              <PiArrowRightBold size={16} />
            </span>
          </AnimatedButton>

          <AnimatedButton
            href="https://www.linkedin.com/in/jonhvmp/"
            secondary
            size="large"
            className="font-terminal tracking-wider uppercase"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <FaCode size={18} />
              <span>CONHECER O CRIADOR</span>
              <PiArrowRightBold size={16} />
            </span>
          </AnimatedButton>
        </div>
      </motion.div>
    </section>
  );
}
