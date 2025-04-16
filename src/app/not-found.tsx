"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import AnimatedButton from "@/components/ui/AnimatedButton";
import TerminalAnimation from "@/components/ui/TerminalAnimation";
import { PiArrowLeftBold, PiWarningCircleBold } from "react-icons/pi";
import BackgroundCyber from "@/components/ui/BackgroundCyber";

export default function NotFound() {
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
              className="text-accent mb-4 flex justify-center"
            >
              <PiWarningCircleBold size={56} className="drop-shadow-[0_0_8px_rgba(255,70,10,0.7)]" />
            </motion.div>

            <GlitchText
              as="h1"
              className="text-4xl md:text-6xl font-bold mb-4 font-orbitron tracking-tight"
              glitchIntensity={8}
            >
              ERRO<span className="text-accent">404</span>
            </GlitchText>

            <p className="text-xl md:text-2xl text-muted-foreground font-terminal tracking-widest mb-2">
              &lt;acesso_negado::<span className="text-accent">página_não_encontrada</span>/&gt;
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 mb-12 w-full max-w-xl mx-auto scan-line"
            >
              <TerminalAnimation
                lines={[
                  "> verificando_rota_solicitada...",
                  "> analisando_URLs_disponíveis...",
                  "> procurando_caminhos_alternativos...",
                  "> ERRO: recurso_inexistente_no_servidor.",
                  "> tentativa_de_acesso_bloqueada.",
                  "> falha_no_acesso_ao_recurso."
                ]}
                typingSpeed={40}
                className="p-2 md:p-4 lg:p-6 rounded-lg neon-border-accent bg-black/60 backdrop-blur-sm text-xs sm:text-sm md:text-base overflow-x-hidden"
              />
            </motion.div>

            <div className="code-block text-lg text-muted-foreground max-w-2xl mx-auto font-terminal mb-8 text-left">
              <p className="text-accent"># Diagnóstico de Falha no Acesso</p>
              <p>{`O recurso solicitado não foi encontrado no servidor.`}</p>
              <p>{`Possíveis causas incluem URL incorreta, recurso removido ou acesso restrito.`}</p>
              <p className="text-accent mt-2"># Ações Recomendadas</p>
              <p>{`Retorne ao perímetro seguro (página inicial) e tente um caminho alternativo.`}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
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
