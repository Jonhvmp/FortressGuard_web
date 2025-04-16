"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiLock, PiWarning, PiLockSimple, PiLockKey, PiShieldCheck } from "react-icons/pi";

interface PasswordStrengthMeterProps {
  password: string;
  score?: number;
  strength?: string;
}

type StrengthLevel = "empty" | "weak" | "medium" | "strong" | "very-strong";

export default function PasswordStrengthMeter({
  password,
  score: externalScore,
  strength: externalStrength
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState<StrengthLevel>("empty");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Se temos valores da API, usamos eles diretamente
    if (externalScore !== undefined && externalStrength) {
      setScore(externalScore);

      // Convertemos o formato da API para o formato interno se necessário
      let strengthValue: StrengthLevel;

      switch (externalStrength) {
        case "weak":
          strengthValue = "weak";
          setFeedback("Senha fraca. Adicione mais complexidade.");
          break;
        case "medium":
          strengthValue = "medium";
          setFeedback("Senha média. Continue melhorando.");
          break;
        case "strong":
          strengthValue = "strong";
          setFeedback("Senha forte. Boa escolha!");
          break;
        case "very-strong":
        case "very strong":
          strengthValue = "very-strong";
          setFeedback("Senha muito forte. Excelente!");
          break;
        default:
          strengthValue = "empty";
          setFeedback("Digite uma senha para avaliar");
      }

      setStrength(strengthValue);
      return;
    }

    // Caso contrário, usamos a lógica interna de cálculo
    if (!password) {
      setStrength("empty");
      setScore(0);
      setFeedback("Digite uma senha para avaliar");
      return;
    }

    // Critérios de avaliação
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    // Calcular pontuação
    let currentScore = 0;
    if (hasLength) currentScore += 1;
    if (hasUppercase) currentScore += 1;
    if (hasLowercase) currentScore += 1;
    if (hasNumbers) currentScore += 1;
    if (hasSpecialChars) currentScore += 1;
    if (password.length >= 12) currentScore += 1;

    // Determinar força com base na pontuação
    let currentStrength: StrengthLevel = "weak";
    let currentFeedback = "";

    if (currentScore <= 2) {
      currentStrength = "weak";
      currentFeedback = "Senha fraca. Adicione mais complexidade.";
    } else if (currentScore <= 4) {
      currentStrength = "medium";
      currentFeedback = "Senha média. Continue melhorando.";
    } else if (currentScore <= 5) {
      currentStrength = "strong";
      currentFeedback = "Senha forte. Boa escolha!";
    } else {
      currentStrength = "very-strong";
      currentFeedback = "Senha muito forte. Excelente!";
    }

    setStrength(currentStrength);
    setScore(currentScore);
    setFeedback(currentFeedback);
  }, [password, externalScore, externalStrength]);

  // Configuração baseada na força
  const strengthConfig = {
    empty: {
      color: "text-muted-foreground",
      barColor: "bg-muted-foreground/20",
      percentage: 0
    },
    weak: {
      color: "text-red-500",
      barColor: "bg-red-500",
      percentage: 25
    },
    medium: {
      color: "text-yellow-500",
      barColor: "bg-yellow-500",
      percentage: 50
    },
    strong: {
      color: "text-blue-500",
      barColor: "bg-blue-500",
      percentage: 75
    },
    "very-strong": {
      color: "text-primary",
      barColor: "bg-primary",
      percentage: 100
    }
  };

  // Função para obter o ícone adequado com base na força
  const getStrengthIcon = () => {
    switch (strength) {
      case "empty":
        return <PiLock size={18} />;
      case "weak":
        return <PiWarning size={18} />;
      case "medium":
        return <PiLockSimple size={18} />;
      case "strong":
        return <PiLockKey size={18} />;
      case "very-strong":
        return <PiShieldCheck size={18} />;
      default:
        return <PiLock size={18} />;
    }
  };

  const config = strengthConfig[strength];

  // Reuso dos critérios para não repetir código
  const hasUppercase = password ? /[A-Z]/.test(password) : false;
  const hasLowercase = password ? /[a-z]/.test(password) : false;
  const hasNumbers = password ? /[0-9]/.test(password) : false;
  const hasSpecialChars = password ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) : false;
  const hasMinLength = password ? password.length >= 8 : false;
  const hasExtendedLength = password ? password.length >= 12 : false;

  return (
    <div className="w-full">
      <div className="flex items-center mb-1 gap-1">
        <span className={`${config.color}`}>
          {getStrengthIcon()}
        </span>
        <span className={`text-xs ${config.color} font-medium capitalize`}>
          {strength === "empty" ? "Força da senha" : `${strength.replace("-", " ")}`}
        </span>
      </div>

      <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${config.barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${config.percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-1">
        {feedback} {password && `(${score}/6 pontos)`}
      </p>

      {password && score > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <div className={hasMinLength ? "text-green-500" : "text-muted-foreground"}>
            {hasMinLength ? "✓" : "○"} 8+ caracteres
          </div>
          <div className={hasUppercase ? "text-green-500" : "text-muted-foreground"}>
            {hasUppercase ? "✓" : "○"} Maiúsculas
          </div>
          <div className={hasLowercase ? "text-green-500" : "text-muted-foreground"}>
            {hasLowercase ? "✓" : "○"} Minúsculas
          </div>
          <div className={hasNumbers ? "text-green-500" : "text-muted-foreground"}>
            {hasNumbers ? "✓" : "○"} Números
          </div>
          <div className={hasSpecialChars ? "text-green-500" : "text-muted-foreground"}>
            {hasSpecialChars ? "✓" : "○"} Caracteres especiais
          </div>
          <div className={hasExtendedLength ? "text-green-500" : "text-muted-foreground"}>
            {hasExtendedLength ? "✓" : "○"} 12+ caracteres
          </div>
        </div>
      )}
    </div>
  );
}
