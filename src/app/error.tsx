"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { PiArrowLeftBold, PiArrowCounterClockwiseBold, PiShieldWarningBold } from "react-icons/pi";
import BackgroundCyber from "@/components/ui/BackgroundCyber";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra o erro no serviço de analytics ou monitoramento
    console.error(error);
  }, [error]);

  return (
    <>
      <BackgroundCyber />
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl w-full mx-auto text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-primary mb-4 flex justify-center"
            >
              <PiShieldWarningBold size={56} className="drop-shadow-[0_0_8px_rgba(10,255,10,0.7)]" />
            </motion.div>

            <GlitchText
              as="h1"
              className="text-4xl md:text-6xl font-bold mb-4 font-orbitron tracking-tight"
              glitchIntensity={6}
            >
              SISTEMA<span className="text-primary">COMPROMETIDO</span>
            </GlitchText>

            <p className="text-xl md:text-2xl text-muted-foreground font-terminal tracking-widest mb-6">
              &lt;alerta::<span className="text-primary">falha_crítica_detectada</span>/&gt;
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 p-4 md:p-6 rounded-lg bg-black/50 scan-line backdrop-blur-md neon-border max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between mb-2 border-b border-primary/30 pb-2">
                <div className="font-mono text-xs text-primary flex items-center">
                  <span className="block w-3 h-3 bg-primary rounded-full mr-2 animate-pulse"></span>
                  RELATÓRIO DE ERRO
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date().toLocaleString()}
                </div>
              </div>

              <div className="code-block text-left text-sm text-muted-foreground font-terminal mb-4">
                <p className="text-primary mb-1"># STATUS: Erro Interno Detectado</p>
                <p>$ Falha ao renderizar o componente solicitado</p>
                <p>$ Código de erro: {error.digest || 'UNKNOWN'}</p>
                <p>$ Mensagem: {error.message || 'Falha não especificada'}</p>
                <p className="text-primary mt-2"># DIAGNÓSTICO</p>
                <p>$ Operação interrompida por um erro inesperado no servidor</p>
                <p>$ Equipes de reparo estão em alerta</p>
                <p className="text-primary mt-2"># RECOMENDAÇÃO</p>
                <p>$ Tente reiniciar a operação</p>
                <p>$ Se o erro persistir, retorne à base e tente outra rota</p>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <AnimatedButton
                onClick={reset}
                primary
                size="large"
                className="font-terminal tracking-wider uppercase"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <PiArrowCounterClockwiseBold size={18} />
                  <span>TENTAR NOVAMENTE</span>
                </span>
              </AnimatedButton>

              <AnimatedButton
                href="/"
                secondary
                size="large"
                className="font-terminal tracking-wider uppercase"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <PiArrowLeftBold size={16} />
                  <span>RETORNAR À BASE</span>
                </span>
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
