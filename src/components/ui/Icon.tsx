"use client";

import React from 'react';
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Ci from 'react-icons/ci';
import * as Fa from 'react-icons/fa';
import * as Fa6 from 'react-icons/fa6';
import * as Fi from 'react-icons/fi';
import * as Gi from 'react-icons/gi';
import * as Go from 'react-icons/go';
import * as Gr from 'react-icons/gr';
import * as Hi from 'react-icons/hi';
import * as Hi2 from 'react-icons/hi2';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io';
import * as Io5 from 'react-icons/io5';
// import * as Li from 'react-icons/li';
import * as Lu from 'react-icons/lu';
import * as Md from 'react-icons/md';
import * as Pi from 'react-icons/pi';
import * as Ri from 'react-icons/ri';
import * as Si from 'react-icons/si';
import * as Sl from 'react-icons/sl';
import * as Tb from 'react-icons/tb';
import * as Ti from 'react-icons/ti';
import * as Vsc from 'react-icons/vsc';
import * as Wi from 'react-icons/wi';

// Unindo todas as bibliotecas de ícones em um único objeto
const IconLibraries = {
  ...Ai, ...Bi, ...Bs, ...Ci, ...Fa, ...Fa6, ...Fi, ...Gi, ...Go, ...Gr,
  ...Hi, ...Hi2, ...Im, ...Io, ...Io5, ...Lu, ...Md, ...Pi, ...Ri,
  ...Si, ...Sl, ...Tb, ...Ti, ...Vsc, ...Wi
};

// Mapeamento dos pesos do Phosphor para equivalentes ou prefixos em outras bibliotecas
const weightPrefixMap = {
  thin: 'Outline',
  light: 'Light',
  regular: '',
  bold: 'Bold',
  fill: 'Fill',
  duotone: 'Duotone'
};

interface IconProps {
  name: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  color?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function Icon({
  name,
  size = 24,
  weight = 'regular',
  color,
  className = '',
  fallback = null
}: IconProps) {
  // Verificar se name está definido
  if (!name) {
    console.warn(`Nome de ícone não fornecido`);
    return fallback as React.ReactElement || null;
  }

  // Para ícones que incluem peso no nome (por exemplo, PiShieldBold)
  const getIconWithWeight = () => {
    // Mapeamento especial para ícones do Phosphor (Pi)
    if (name.startsWith('Pi')) {
      const baseName = name.substring(2); // Remove "Pi" do início
      const weightSuffix = weightPrefixMap[weight] || '';
      const iconNameWithWeight = `Pi${baseName}${weightSuffix}`;

      return IconLibraries[iconNameWithWeight as keyof typeof IconLibraries];
    }

    // Para outros ícones, podemos tentar variações comuns
    const baseLibraryPrefix = name.substring(0, 2); // Ex: 'Fa', 'Md', etc.
    const baseName = name.substring(2); // Nome sem o prefixo

    // Tentativas comuns de combinação biblioteca/peso
    const attempts = [
      name, // Nome original
      `${baseLibraryPrefix}${baseName}${weightPrefixMap[weight] || ''}` // Com sufixo de peso
    ];

    // Procura pelo primeiro que existe
    for (const attempt of attempts) {
      if (IconLibraries[attempt as keyof typeof IconLibraries]) {
        return IconLibraries[attempt as keyof typeof IconLibraries];
      }
    }

    return null;
  };

  // Encontrar o componente do ícone
  const IconComponent = getIconWithWeight();

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado em react-icons`);
    return fallback as React.ReactElement || null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
    />
  );
}

// Exporta todas as bibliotecas para facilitar a navegação de ícones disponíveis
export const Libraries = {
  Ai, Bi, Bs, Ci, Fa, Fa6, Fi, Gi, Go, Gr, Hi, Hi2, Im, Io, Io5, Lu, Md, Pi, Ri, Si, Sl, Tb, Ti, Vsc, Wi
};

// Gera a lista de todos os ícones disponíveis para o IconPicker
export const availableIcons = Object.keys(IconLibraries).filter(
  // Filtra apenas strings que começam com uma biblioteca válida
  key => {
    const prefix = key.substring(0, 2);
    return Object.keys(Libraries).includes(prefix);
  }
);
