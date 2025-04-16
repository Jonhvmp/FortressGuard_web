"use client";

import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Fi from 'react-icons/fi';
import * as Bi from 'react-icons/bi';
import * as Hi from 'react-icons/hi';
import * as Md from 'react-icons/md';
import { IconType } from 'react-icons';

const AllIcons: Record<string, IconType> = {
  ...Fa,
  ...Fi,
  ...Bi,
  ...Hi,
  ...Md,
};

interface ReactIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function ReactIcon({
  name,
  size = 24,
  color,
  className = ''
}: ReactIconProps) {
  // Verificar se o ícone existe
  const IconComponent = AllIcons[name];

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado`);
    return <span className={`inline-block w-${size / 4} h-${size / 4}`}></span>;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
    />
  );
}

// Lista de ícones populares para referência rápida
export const popularIcons = [
  'FaShieldAlt',
  'FaLock',
  'FaUnlock',
  'FaKey',
  'FaFingerprint',
  'FaUserShield',
  'FaUserSecret',
  'FaServer',
  'FaCode',
  'FaDatabase',
  'FaFileCode',
  'FaRandom',
  'FaCheck',
  'FaTimes',
  'FiBell',
  'FiAlertTriangle',
  'BiLockOpen',
  'BiLock',
  'HiLockClosed',
  'HiLockOpen',
  'MdVpnKey',
  'MdOutlineSecurity',
];
