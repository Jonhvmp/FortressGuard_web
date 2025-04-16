"use client";

import { useState } from 'react';
import { useApiService } from '@/lib/hooks/useApiService';
import { motion } from "framer-motion";
import { PiShieldCheckBold, PiLockKeyBold, PiPasswordBold, PiEyeBold, PiEyeSlashBold, PiKeyBold, PiShieldBold, PiCopySimpleBold } from "react-icons/pi";
import GlitchText from "@/components/ui/GlitchText";
import BackgroundCyber from "@/components/ui/BackgroundCyber";

export default function ApiTestPage() {
  // Estados para os formulários
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
  const [passwordToValidate, setPasswordToValidate] = useState<string>('');
  const [textToEncrypt, setTextToEncrypt] = useState<string>('');
  const [textToDecrypt, setTextToDecrypt] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<Record<string, string>>({});

  const {
    passwordState,
    validationState,
    encryptionState,
    decryptionState,
    statisticsState,
    generatePassword,
    validatePassword,
    encryptText,
    decryptText,
    getStatistics
  } = useApiService();

  // Função para copiar para o clipboard com feedback
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(prev => ({ ...prev, [key]: "Copiado!" }));
    setTimeout(() => {
      setCopyFeedback(prev => ({ ...prev, [key]: "" }));
    }, 2000);
  };

  return (
    <>
      <BackgroundCyber />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            {/* Badge em primeiro lugar */}
            <div className="flex flex-col items-center mb-4">
              <div className="inline-block p-2 px-4 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary font-terminal text-sm tracking-wider">TERMINAL DE TESTE</span>
              </div>
            </div>

            {/* Título em segundo lugar */}
            <GlitchText as="h1" className="text-3xl md:text-4xl font-bold mb-4 font-orbitron tracking-tight">
              FORTRESS<span className="text-primary">GUARD</span> API
            </GlitchText>

            {/* Descrição em terceiro lugar */}
            <div className="flex justify-center">
              <p className="font-terminal text-lg text-muted-foreground max-w-2xl">
                &lt;teste_direto&gt; Interface para testar os endpoints da API de segurança &lt;/teste_direto&gt;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Geração de Senha */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="neon-border p-6 rounded-lg bg-black/50 backdrop-blur-md scan-line"
            >
              <div className="flex items-center mb-4">
                <PiPasswordBold size={24} className="text-primary mr-2" />
                <h2 className="text-lg font-bold font-orbitron text-primary tracking-wide">GERAÇÃO DE SENHA</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-terminal text-sm mb-1 text-muted-foreground">COMPRIMENTO:</label>
                  <input
                    type="number"
                    min={8}
                    max={32}
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-black/60 rounded border border-primary/30 focus:border-primary focus:outline-none text-primary font-terminal"
                  />
                </div>

                <div className="flex items-center bg-black/30 p-2 rounded border border-primary/20">
                  <input
                    type="checkbox"
                    id="includeSpecial"
                    checked={includeSpecial}
                    onChange={(e) => setIncludeSpecial(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="includeSpecial" className="text-sm font-terminal text-muted-foreground">
                    CARACTERES_ESPECIAIS = <span className="text-primary">{includeSpecial ? "true" : "false"}</span>;
                  </label>
                </div>

                <button
                  onClick={() => generatePassword(passwordLength, includeSpecial)}
                  disabled={passwordState.isLoading}
                  className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded transition-colors font-terminal tracking-wider"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {passwordState.isLoading ? "PROCESSANDO..." : "GERAR SENHA"}
                  </span>
                </button>

                {passwordState.error && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400 font-terminal">
                    ERRO: {passwordState.error}
                  </div>
                )}

                {passwordState.data && (
                  <div className="mt-4">
                    <div className="relative bg-black/60 p-3 rounded font-terminal mb-4 flex items-center border border-primary/30">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordState.data.password}
                        readOnly
                        className="bg-transparent flex-1 outline-none font-terminal text-primary"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted-foreground hover:text-white transition-colors p-1"
                        >
                          {showPassword ? <PiEyeSlashBold size={20} /> : <PiEyeBold size={20} />}
                        </button>
                        <button
                          onClick={() => passwordState.data && copyToClipboard(passwordState.data.password, 'password')}
                          className="text-muted-foreground hover:text-primary transition-colors p-1 relative"
                        >
                          <PiCopySimpleBold size={20} />
                          {copyFeedback['password'] && (
                            <span className="absolute -top-8 right-0 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {copyFeedback['password']}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm font-terminal">
                      <div className="bg-black/30 p-2 rounded border border-muted/30">
                        FORÇA: <span className="font-semibold text-primary">{passwordState.data.strength.toUpperCase()}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded border border-muted/30">
                        SCORE: <span className="font-semibold text-primary">{passwordState.data.score}/6</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Validação de Senha */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-lg bg-black/50 backdrop-blur-md border border-secondary/30"
            >
              <div className="flex items-center mb-4">
                <PiKeyBold size={24} className="text-secondary mr-2" />
                <h2 className="text-lg font-bold font-orbitron text-secondary tracking-wide">VALIDAÇÃO DE SENHA</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-terminal text-sm mb-1 text-muted-foreground">SENHA PARA ANALISAR:</label>
                  <input
                    type="text"
                    value={passwordToValidate}
                    onChange={(e) => setPasswordToValidate(e.target.value)}
                    className="w-full px-3 py-2 bg-black/60 rounded border border-secondary/30 focus:border-secondary focus:outline-none text-secondary font-terminal"
                  />
                </div>

                <button
                  onClick={() => validatePassword(passwordToValidate)}
                  disabled={validationState.isLoading || !passwordToValidate}
                  className="w-full py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50 rounded transition-colors font-terminal tracking-wider"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {validationState.isLoading ? "VALIDANDO..." : "VALIDAR SENHA"}
                  </span>
                </button>

                {validationState.error && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400 font-terminal">
                    ERRO: {validationState.error}
                  </div>
                )}

                {validationState.data && (
                  <div className="mt-4">
                    <div className={`p-2 rounded text-sm font-terminal ${validationState.data.valid
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                      }`}>
                      STATUS: {validationState.data.valid ? 'VÁLIDA' : 'INVÁLIDA'}
                    </div>

                    <div className="mt-3 space-y-2 font-terminal text-sm">
                      <div className="bg-black/30 p-2 rounded border border-muted/30">
                        FORÇA: <span className="font-semibold text-secondary">{validationState.data.strength.toUpperCase()}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded border border-muted/30">
                        SCORE: <span className="font-semibold text-secondary">{validationState.data.score}/6</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded border border-muted/30">
                        FEEDBACK: <span className="text-muted-foreground">{validationState.data.feedback}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Criptografia de Texto */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-lg bg-black/50 backdrop-blur-md border border-accent/30"
            >
              <div className="flex items-center mb-4">
                <PiLockKeyBold size={24} className="text-accent mr-2" />
                <h2 className="text-lg font-bold font-orbitron text-accent tracking-wide">CRIPTOGRAFIA DE TEXTO</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-terminal text-sm mb-1 text-muted-foreground">INPUT_TEXT:</label>
                  <textarea
                    value={textToEncrypt}
                    onChange={(e) => setTextToEncrypt(e.target.value)}
                    className="w-full px-3 py-2 bg-black/60 rounded border border-accent/30 focus:border-accent focus:outline-none text-accent font-terminal h-24 resize-none"
                    placeholder="Digite um texto para criptografar..."
                  ></textarea>
                </div>

                <button
                  onClick={() => encryptText(textToEncrypt)}
                  disabled={encryptionState.isLoading || !textToEncrypt}
                  className="w-full py-2 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/50 rounded transition-colors font-terminal tracking-wider"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {encryptionState.isLoading ? "CRIPTOGRAFANDO..." : "CRIPTOGRAFAR TEXTO"}
                  </span>
                </button>

                {encryptionState.error && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400 font-terminal">
                    ERRO: {encryptionState.error}
                  </div>
                )}

                {encryptionState.data && (
                  <div className="mt-4">
                    <div className="p-3 bg-black/60 rounded font-terminal text-xs border border-accent/30 break-all overflow-auto h-24">
                      {encryptionState.data.encryptedText}
                    </div>

                    <div className="mt-2 flex justify-between">
                      <div className="text-xs font-terminal">
                        <span className="text-muted-foreground">TAMANHO ORIGINAL:</span> <span className="text-accent">{encryptionState.data.originalLength}</span>
                      </div>
                      <div className="text-xs font-terminal">
                        <span className="text-muted-foreground">TAMANHO CRIPTOGRAFADO:</span> <span className="text-accent">{encryptionState.data.encryptedLength}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => encryptionState.data && copyToClipboard(encryptionState.data.encryptedText, 'encrypted')}
                      className="mt-2 w-full py-1.5 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded transition-colors text-xs font-terminal relative"
                    >
                      <span className="inline-flex items-center justify-center gap-1">
                        <PiCopySimpleBold size={14} />
                        COPIAR TEXTO CRIPTOGRAFADO
                      </span>
                      {copyFeedback['encrypted'] && (
                        <span className="absolute -top-8 right-0 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                          {copyFeedback['encrypted']}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Descriptografia de Texto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-lg bg-black/50 backdrop-blur-md border border-yellow-500/30"
            >
              <div className="flex items-center mb-4">
                <PiShieldBold size={24} className="text-yellow-500 mr-2" />
                <h2 className="text-lg font-bold font-orbitron text-yellow-500 tracking-wide">DESCRIPTOGRAFIA</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-terminal text-sm mb-1 text-muted-foreground">TEXTO CRIPTOGRAFADO:</label>
                  <textarea
                    value={textToDecrypt}
                    onChange={(e) => setTextToDecrypt(e.target.value)}
                    className="w-full px-3 py-2 bg-black/60 rounded border border-yellow-500/30 focus:border-yellow-500 focus:outline-none text-yellow-500 font-terminal h-24 resize-none"
                    placeholder="Formato: IV:TextoCriptografado"
                  ></textarea>
                </div>

                <button
                  onClick={() => decryptText(textToDecrypt)}
                  disabled={decryptionState.isLoading || !textToDecrypt}
                  className="w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 border border-yellow-500/50 rounded transition-colors font-terminal tracking-wider"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {decryptionState.isLoading ? "DESCRIPTOGRAFANDO..." : "DESCRIPTOGRAFAR TEXTO"}
                  </span>
                </button>

                {decryptionState.error && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400 font-terminal">
                    ERRO: {decryptionState.error}
                  </div>
                )}

                {decryptionState.data && (
                  <div className="mt-4">
                    <div className="p-3 bg-black/60 rounded font-terminal border border-yellow-500/30 overflow-auto h-24">
                      {decryptionState.data.decryptedText}
                    </div>

                    <div className="mt-2 flex justify-between">
                      <div className="text-xs font-terminal">
                        <span className="text-muted-foreground">TAMANHO:</span> <span className="text-yellow-500">{decryptionState.data.length} caracteres</span>
                      </div>
                      <button
                        onClick={() => decryptionState.data && copyToClipboard(decryptionState.data.decryptedText, 'decrypted')}
                        className="text-xs font-terminal text-yellow-500 relative"
                      >
                        <PiCopySimpleBold size={14} className="inline mr-1" />
                        COPIAR
                        {copyFeedback['decrypted'] && (
                          <span className="absolute -top-8 right-0 text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                            {copyFeedback['decrypted']}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 p-6 rounded-lg bg-black/50 backdrop-blur-md border border-teal-500/30 scan-line"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <PiShieldCheckBold size={24} className="text-teal-500 mr-2" />
                <h2 className="text-lg font-bold font-orbitron text-teal-500 tracking-wide">ESTATÍSTICAS DA API</h2>
              </div>

              <button
                onClick={() => getStatistics()}
                disabled={statisticsState.isLoading}
                className="px-4 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-500 border border-teal-500/50 rounded text-sm transition-colors font-terminal tracking-wider"
              >
                {statisticsState.isLoading ? "CARREGANDO..." : "ATUALIZAR ESTATÍSTICAS"}
              </button>
            </div>

            {statisticsState.error && (
              <div className="p-2 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400 font-terminal">
                ERRO: {statisticsState.error}
              </div>
            )}

            {statisticsState.data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 bg-black/60 rounded border border-teal-500/30"
                >
                  <div className="text-sm font-terminal text-muted-foreground">SENHAS GERADAS</div>
                  <div className="text-2xl font-bold font-terminal digital-text text-teal-500">
                    {statisticsState.data.passwordsGenerated}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 bg-black/60 rounded border border-teal-500/30"
                >
                  <div className="text-sm font-terminal text-muted-foreground">SENHAS VALIDADAS</div>
                  <div className="text-2xl font-bold font-terminal digital-text text-teal-500">
                    {statisticsState.data.passwordsValidated}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-3 bg-black/60 rounded border border-teal-500/30"
                >
                  <div className="text-sm font-terminal text-muted-foreground">TEXTOS CRIPTOGRAFADOS</div>
                  <div className="text-2xl font-bold font-terminal digital-text text-teal-500">
                    {statisticsState.data.textEncrypted}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="col-span-1 md:col-span-3 p-3 bg-black/60 rounded border border-teal-500/30"
                >
                  <div className="text-sm font-terminal text-muted-foreground mb-2">DISTRIBUIÇÃO DE FORÇA DE SENHAS</div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center bg-black/40 p-2 rounded border border-muted/20">
                      <div className="text-xs font-terminal text-muted-foreground">FRACA</div>
                      <div className="font-medium font-terminal text-red-400">{statisticsState.data.stregthDistribution.weak}</div>
                    </div>
                    <div className="text-center bg-black/40 p-2 rounded border border-muted/20">
                      <div className="text-xs font-terminal text-muted-foreground">MÉDIA</div>
                      <div className="font-medium font-terminal text-yellow-400">{statisticsState.data.stregthDistribution.medium}</div>
                    </div>
                    <div className="text-center bg-black/40 p-2 rounded border border-muted/20">
                      <div className="text-xs font-terminal text-muted-foreground">FORTE</div>
                      <div className="font-medium font-terminal text-blue-400">{statisticsState.data.stregthDistribution.strong}</div>
                    </div>
                    <div className="text-center bg-black/40 p-2 rounded border border-muted/20">
                      <div className="text-xs font-terminal text-muted-foreground">MUITO FORTE</div>
                      <div className="font-medium font-terminal text-green-400">{statisticsState.data.stregthDistribution.very_strong}</div>
                    </div>
                  </div>
                </motion.div>

                <div className="col-span-1 md:col-span-3 text-xs font-terminal text-muted-foreground code-block">
                  {`// Última atualização: ${new Date(statisticsState.data.timestamp).toLocaleString()}`}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
