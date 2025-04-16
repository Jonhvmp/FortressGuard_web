"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShieldAlt, FaLock, FaServer, FaCodeBranch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

// Estrutura dos links de navegação com ícones temáticos
const navigationLinks = [
  { href: "/", label: "Home", icon: <FaShieldAlt className="mr-2" /> },
  {
    href: "https://www.linkedin.com/in/jonhvmp/",
    label: "Linkedin",
    icon: <FaCodeBranch className="mr-2" />,
    external: true
  },
  { href: "https://fortressguard.onrender.com/docs/", label: "Documentação", icon: <FaServer className="mr-2" /> },
  { href: "/api-test", label: "Testar API", icon: <FaLock className="mr-2" /> }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detectar rolagem para alterar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desabilitar rolagem quando o menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Efeito de typewriter para texto criptografado
  const CryptoText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let currentIndex = 0;
      const chars = "!@#$%^&*()_+{}|:<>?1234567890".split("");

      const interval = setInterval(() => {
        if (currentIndex >= text.length) {
          clearInterval(interval);
          return;
        }

        let scrambled = "";
        for (let i = 0; i < currentIndex; i++) {
          scrambled += text[i];
        }

        // Adicionar caracteres criptografados em decifração
        for (let i = currentIndex; i < text.length; i++) {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }

        setDisplayText(scrambled);
        currentIndex += 1;
      }, 100);

      return () => clearInterval(interval);
    }, [text]);

    return <span className="font-mono">{displayText}</span>;
  };

  // Variantes de animação
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      filter: "blur(10px)"
    },
    open: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)"
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 border-b ${isScrolled
        ? "bg-background/90 backdrop-blur-md border-primary/20"
        : "bg-background border-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-40 group">
            <motion.div
              whileHover={{
                rotate: [0, 15, 0, 15, 0],
                scale: 1.1,
                transition: { duration: 0.5 }
              }}
              className="relative text-primary mr-2"
            >
              <FaShieldAlt size={26} />
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            <div className="font-orbitron font-bold text-xl">
              <span className="group-hover:animate-glitch">FORTRESS</span>
              <span className="text-primary group-hover:animate-pulse">GUARD</span>
            </div>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => {
              const isActive = pathname === link.href;

              // Para links externos
              if (link.external) {
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-tech transition-colors relative overflow-hidden group flex items-center ${isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      {link.icon}
                      {link.label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              }

              // Para links internos
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-tech transition-colors flex items-center ${isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                      }`}
                  >
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      {link.icon}
                      {link.label}
                    </motion.span>
                  </Link>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {isActive && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Botão mobile - MELHORADO */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden flex items-center justify-center text-white z-50 relative w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className={`absolute inset-0 rounded-full ${isMenuOpen ? 'bg-background shadow-lg border border-primary/30' : ''}`} />
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-50"
                >
                  <IoCloseOutline size={30} className="text-primary drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMenuOutline size={30} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="fixed inset-x-0 top-[58px] z-50 border-t border-primary/20"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="bg-gradient-to-b from-background to-background/95 backdrop-blur-lg py-6 px-4 overflow-hidden">
                <div className="container mx-auto">
                  <nav className="grid gap-4">
                    {navigationLinks.map((link, index) => {
                      const isActive = pathname === link.href;

                      // Container para o item de navegação
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative overflow-hidden"
                        >
                          {/* Efeito de escaneamento */}
                          <motion.div
                            className="absolute inset-0 w-full h-[2px] bg-primary/40"
                            initial={{ y: 0, opacity: 0.5 }}
                            animate={{
                              y: ['0%', '100%', '0%'],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: index * 0.5
                            }}
                          />

                          {/* Link */}
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center p-3 rounded-lg ${isActive
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-white hover:bg-white/5 border border-transparent"
                                }`}
                            >
                              <div className="flex items-center">
                                <span className="text-primary mr-4 w-6 h-6 flex items-center justify-center">
                                  {link.icon}
                                </span>
                                <span className="font-tech text-lg">{link.label}</span>
                              </div>
                              <div className="ml-auto text-xs opacity-50 font-terminal">
                                {index.toString().padStart(2, '0')}
                              </div>
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className={`flex items-center p-3 rounded-lg ${isActive
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-white hover:bg-white/5 border border-transparent"
                                }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                <span className="text-primary mr-4 w-6 h-6 flex items-center justify-center">
                                  {link.icon}
                                </span>
                                <span className="font-tech text-lg">{link.label}</span>
                              </div>
                              <div className="ml-auto text-xs opacity-50 font-terminal">
                                {index.toString().padStart(2, '0')}
                              </div>
                            </Link>
                          )}
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Footer do menu */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 pt-4 border-t border-gray-800 text-center"
                  >
                    <div className="text-sm text-muted-foreground font-terminal">
                      <div className="mb-2 flex justify-center items-center space-x-2">
                        <span className="text-primary animate-pulse">&#91;</span>
                        <span>FORTRESS<span className="text-primary">GUARD</span></span>
                        <span className="text-primary animate-pulse">&#93;</span>
                      </div>
                      <div className="cyberpunk-terminal text-xs">
                        <CryptoText text="sistema:segurança_avançada" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
