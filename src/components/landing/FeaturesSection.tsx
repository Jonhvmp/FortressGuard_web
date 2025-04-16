"use client";

import { motion } from "framer-motion";
import { PiPasswordBold, PiLockKeyBold, PiShieldCheckeredBold, PiFingerprintBold } from "react-icons/pi";
import FeatureCard from "@src/components/ui/FeatureCard";
import GlitchText from "@src/components/ui/GlitchText";

export default function FeaturesSection() {
  const features = [
    {
      icon: <PiPasswordBold size={32} />,
      title: "GERAÇÃO DE SENHAS",
      description: "Algoritmos criptográficos avançados criam senhas invioláveis com entropia máxima e proteção contra ataques de força bruta.",
      color: "primary"
    },
    {
      icon: <PiLockKeyBold size={32} />,
      title: "VALIDAÇÃO DE SENHAS",
      description: "Análise complexa da força de suas senhas utilizando heurísticas de segurança e detecção de padrões vulneráveis.",
      color: "secondary"
    },
    {
      icon: <PiFingerprintBold size={32} />,
      title: "CRIPTOGRAFIA DE TEXTO",
      description: "Proteção de dados com criptografia AES-256 militar, garantindo confidencialidade total das suas informações sensíveis.",
      color: "accent"
    },
    {
      icon: <PiShieldCheckeredBold size={32} />,
      title: "PROTEÇÃO TOTAL",
      description: "Sistema integrado de defesa digital que monitora, analisa e fortalece sua presença online contra ameaças cibernéticas.",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge em coluna, não ao lado do texto */}
          <div className="flex flex-col items-center gap-2 mb-5">
            <div className="inline-block p-1.5 px-4 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="text-secondary font-terminal text-sm tracking-wider">FERRAMENTAS AVANÇADAS</span>
            </div>
          </div>

          <GlitchText as="h2" className="text-3xl md:text-4xl font-bold mb-4 font-orbitron tracking-tight uppercase">
            Arsenal de <span className="text-secondary cyber-glow">Segurança</span>
          </GlitchText>

          <div className="flex justify-center">
            <p className="text-lg text-muted-foreground max-w-2xl font-terminal tracking-wide code-block mb-2 inline-block">
              &lt;defesa&gt; Uma infraestrutura completa de proteção cibernética contra as ameaças digitais contemporâneas &lt;/defesa&gt;
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colorClass={`text-${feature.color}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
