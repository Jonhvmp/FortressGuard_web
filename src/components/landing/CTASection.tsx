"use client";

import { motion } from "framer-motion";
import { PiShieldCheckBold, PiArrowRightBold, PiLockBold } from "react-icons/pi";
import AnimatedButton from "@src/components/ui/AnimatedButton";
import GlitchText from "@src/components/ui/GlitchText";

export default function CTASection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/0 via-primary/5 to-muted/0 z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center neon-border rounded-xl p-8 md:p-12 bg-black/70 backdrop-blur-md scan-line mt-16"
      >

        <div className="mt-6">
          <GlitchText as="h2" className="text-3xl md:text-4xl font-bold mb-6 font-orbitron tracking-tight leading-tight uppercase">
            Fortaleça sua <span className="text-primary cyber-glow">Defesa</span> Digital
          </GlitchText>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-primary/20">
              <PiShieldCheckBold size={20} className="text-primary" />
              <span className="text-sm font-terminal text-muted-foreground tracking-wider">CRIPTOGRAFIA AVANÇADA</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-primary/20">
              <PiLockBold size={20} className="text-primary" />
              <span className="text-sm font-terminal text-muted-foreground tracking-wider">PROTEÇÃO CONTÍNUA</span>
            </div>
          </div>

          <div className="code-block text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-terminal leading-relaxed px-4 py-2">
            <p>{"// O universo cibernético está repleto de ameaças crescentes."}</p>
            <p className="mt-2">
              {"// Execute agora o protocolo de segurança FortressGuard e fortaleça suas defesas."}
            </p>
          </div>

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

          <p className="text-xs text-muted-foreground mt-6 font-terminal cyberpunk-terminal">
            $ sudo ./fortressguard --protect --all-systems
          </p>
        </div>
      </motion.div>
    </section>
  );
}
