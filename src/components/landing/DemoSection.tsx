"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@src/components/ui/Slider";
import PasswordStrengthMeter from "@src/components/ui/PasswordStrengthMeter";
import { PiCopySimpleBold, PiEyeBold, PiEyeSlashBold, PiShieldBold, PiLockKeyBold } from "react-icons/pi";
import { useApiService } from "@src/lib/hooks/useApiService";
import GlitchText from "@src/components/ui/GlitchText";

export default function DemoSection() {
  // Estados para gerador de senha
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  // Estados para criptografia
  const [textToEncrypt, setTextToEncrypt] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const [encryptCopyFeedback, setEncryptCopyFeedback] = useState("");

  // Obter funções e estados da API
  const {
    passwordState,
    encryptionState,
    generatePassword,
    encryptText
  } = useApiService();

  // Atualiza o encryptedResult quando o estado da API for modificado
  useEffect(() => {
    if (encryptionState.data?.encryptedText) {
      setEncryptedResult(encryptionState.data.encryptedText);
    }
  }, [encryptionState.data]);

  // Função para gerar senha através da API
  const handleGeneratePassword = async () => {
    await generatePassword(passwordLength, includeSpecial);
  };

  // Função para criptografar texto
  const handleEncryptText = async () => {
    if (textToEncrypt.trim()) {
      await encryptText(textToEncrypt);
    }
  };

  // Função para copiar para o clipboard com feedback
  const copyToClipboard = (text: string, type: 'password' | 'encrypt') => {
    navigator.clipboard.writeText(text);

    if (type === 'password') {
      setCopyFeedback("Copiado!");
      setTimeout(() => setCopyFeedback(""), 2000);
    } else {
      setEncryptCopyFeedback("Copiado!");
      setTimeout(() => setEncryptCopyFeedback(""), 2000);
    }
  };

  // Gera uma senha automaticamente ao carregar o componente
  useEffect(() => {
    handleGeneratePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge em coluna, não ao lado do texto */}
          <div className="flex flex-col items-center gap-2 mb-5">
            <div className="inline-block p-1.5 px-4 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-terminal text-sm tracking-wider">TERMINAL DE ACESSO</span>
            </div>
          </div>

          <GlitchText as="h2" className="text-3xl md:text-4xl font-bold mb-4 font-orbitron tracking-tight uppercase">
            Experimente o <span className="text-primary cyber-glow">Poder</span>
          </GlitchText>

          <div className="flex justify-center">
            <div className="code-block text-lg text-muted-foreground max-w-2xl font-terminal mb-2 inline-block">
              $&gt; ./executar --modo=demonstração --nivel=segurança-máxima
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gerador de senha usando API real */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neon-border p-6 rounded-lg bg-black/50 backdrop-blur-md scan-line"
          >
            <div className="flex items-center mb-4">
              <PiShieldBold size={24} className="text-primary mr-2" />
              <h3 className="text-xl font-bold text-primary font-mono tracking-wider">GERADOR DE SENHAS</h3>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-mono text-muted-foreground">COMPRIMENTO: <span className="text-primary">{passwordLength}</span></label>
              </div>
              <Slider
                min={8}
                max={32}
                value={passwordLength}
                onChange={(value) => setPasswordLength(value)}
                className="mb-6"
              />

              <div className="flex items-center mt-3 bg-muted/20 p-2 rounded border border-primary/20">
                <input
                  type="checkbox"
                  id="specialChars"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="specialChars" className="text-sm font-mono text-muted-foreground">
                  CARACTERES_ESPECIAIS = <span className="text-primary">{includeSpecial ? "true" : "false"}</span>;
                </label>
              </div>
            </div>

            <div className="relative bg-black/60 p-3 rounded font-mono mb-4 flex items-center border border-primary/30">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordState.data?.password || ""}
                readOnly
                className="bg-transparent flex-1 outline-none font-mono text-primary"
                placeholder="Sua senha será exibida aqui"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-white transition-colors p-1"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <PiEyeSlashBold size={20} /> : <PiEyeBold size={20} />}
                </button>
                <button
                  onClick={() => passwordState.data && copyToClipboard(passwordState.data.password, 'password')}
                  className="text-muted-foreground hover:text-primary transition-colors p-1 relative"
                  disabled={!passwordState.data}
                  aria-label="Copiar senha"
                >
                  <PiCopySimpleBold size={20} />
                  {copyFeedback && (
                    <span className="absolute -top-8 right-0 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {copyFeedback}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {passwordState.data && (
              <PasswordStrengthMeter
                password={passwordState.data.password}
                score={passwordState.data.score}
                strength={passwordState.data.strength}
              />
            )}

            {passwordState.error && (
              <div className="text-red-400 text-sm mb-3 p-2 bg-red-900/20 rounded font-mono">
                ERRO: {passwordState.error}
              </div>
            )}

            <button
              onClick={handleGeneratePassword}
              disabled={passwordState.isLoading}
              className="mt-4 w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed tracking-wider"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {passwordState.isLoading ? "PROCESSANDO..." : "GERAR NOVA SENHA"}
              </span>
            </button>
          </motion.div>

          {/* Criptografia de texto usando API real */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neon-border p-6 rounded-lg bg-black/50 backdrop-blur-md scan-line"
          >
            <div className="flex items-center mb-4">
              <PiLockKeyBold size={24} className="text-secondary mr-2" />
              <h3 className="text-xl font-bold text-secondary font-mono tracking-wider">CRIPTOGRAFIA DE TEXTO</h3>
            </div>

            <div className="mb-4">
              <label className="text-sm font-mono text-muted-foreground block mb-2">INPUT_TEXT:</label>
              <textarea
                value={textToEncrypt}
                onChange={(e) => setTextToEncrypt(e.target.value)}
                className="w-full p-3 bg-black/60 rounded font-mono resize-none h-24 outline-none focus:ring-1 focus:ring-secondary border border-secondary/30 text-secondary"
                placeholder="Digite um texto para criptografar..."
              ></textarea>
            </div>

            <button
              onClick={handleEncryptText}
              disabled={encryptionState.isLoading || !textToEncrypt.trim()}
              className="w-full py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50 rounded transition-colors font-mono mb-4 disabled:opacity-50 disabled:cursor-not-allowed tracking-wider"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {encryptionState.isLoading ? "CRIPTOGRAFANDO..." : "CRIPTOGRAFAR TEXTO"}
              </span>
            </button>

            {encryptionState.error && (
              <div className="text-red-400 text-sm mb-3 p-2 bg-red-900/20 rounded font-mono">
                ERRO: {encryptionState.error}
              </div>
            )}

            <div className="mb-2">
              <label className="text-sm font-mono text-muted-foreground block mb-2">OUTPUT_ENCRYPTED:</label>
              <div className="w-full p-3 bg-black/60 rounded font-mono h-24 overflow-auto text-xs border border-secondary/30">
                {encryptedResult ? (
                  <div className="flex flex-col gap-2">
                    <code className="text-secondary break-all">
                      {encryptedResult}
                    </code>
                    <button
                      onClick={() => copyToClipboard(encryptedResult, 'encrypt')}
                      className="text-xs self-end text-muted-foreground hover:text-secondary transition-colors relative"
                    >
                      <PiCopySimpleBold size={16} className="inline mr-1" />
                      COPIAR
                      {encryptCopyFeedback && (
                        <span className="absolute -top-8 right-0 text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                          {encryptCopyFeedback}
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  <span className="text-muted-foreground">{/* O texto criptografado aparecerá aqui */}</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
