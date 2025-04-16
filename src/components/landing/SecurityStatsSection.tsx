"use client";

import { motion } from "framer-motion";
import CounterAnimation from "@src/components/ui/CounterAnimation";
import { PiLockSimpleBold, PiUserBold, PiKeyBold, PiShieldCheckBold } from "react-icons/pi";
import GlitchText from "@/components/ui/GlitchText";

export default function SecurityStatsSection() {
  const stats = [
    {
      icon: <PiLockSimpleBold size={28} />,
      value: 15243,
      label: "SENHAS GERADAS",
      description: "Proteções criadas",
      color: "primary"
    },
    {
      icon: <PiKeyBold size={28} />,
      value: 8976,
      label: "VALIDAÇÕES",
      description: "Análises de segurança",
      color: "secondary"
    },
    {
      icon: <PiShieldCheckBold size={28} />,
      value: 5621,
      label: "CRIPTOGRAFIAS",
      description: "Dados protegidos",
      color: "accent"
    },
    {
      icon: <PiUserBold size={28} />,
      value: 3450,
      label: "USUÁRIOS",
      description: "Identidades seguras",
      color: "primary"
    }
  ];

  return (
    <section className="py-24 px-4 relative bg-muted/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>

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
            <div className="inline-block p-1.5 px-4 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-accent font-terminal text-sm tracking-wider">ANÁLISE DE DADOS</span>
            </div>
          </div>

          <GlitchText as="h2" className="text-3xl md:text-4xl font-bold mb-4 font-orbitron tracking-tight uppercase">
            Métricas de <span className="text-accent cyber-glow">Segurança</span>
          </GlitchText>

          <div className="flex justify-center">
            <div className="code-block text-lg text-muted-foreground max-w-2xl font-terminal mb-2 inline-block">
              &lt;segurança_em_números&gt; Estatísticas em tempo real de nossa infraestrutura de proteção &lt;/segurança_em_números&gt;
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-muted/30 hover:border-muted/50 transition-all text-center sm:text-left"
            >
              <div className="flex justify-center sm:justify-start">
                <div className={`inline-flex p-3 rounded-full bg-${stat.color}/10 text-${stat.color} mb-4`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1 font-terminal digital-text text-white">
                  <CounterAnimation
                    from={0}
                    to={stat.value}
                    duration={2.5}
                  />
                </h3>
                <p className="text-sm font-bold text-white/90 font-orbitron tracking-wider">{stat.label}</p>
                <p className="text-xs text-muted-foreground font-tech mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
