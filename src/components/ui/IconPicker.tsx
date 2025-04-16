"use client";

import { useState, useRef, useEffect } from "react";
import Icon, { availableIcons, Libraries } from "./Icon";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

export default function IconPicker({ value, onChange, className = "" }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filtra ícones baseado no termo de busca e biblioteca selecionada
  const filteredIcons = availableIcons.filter((icon: string) => {
    const matchesSearch = !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLibrary = !selectedLibrary || icon.startsWith(selectedLibrary);
    return matchesSearch && matchesLibrary;
  });

  // Limita a quantidade de ícones exibidos para melhorar performance
  const displayedIcons = filteredIcons.slice(0, 100);

  // Lista de bibliotecas disponíveis
  const libraryOptions = Object.keys(Libraries).sort();

  // Foca no campo de busca quando abre o picker
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Fecha o picker ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Resetar filtros ao fechar
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedLibrary(null);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-muted bg-muted/30 hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <>
            <Icon name={value} size={20} />
            <span>{value}</span>
          </>
        ) : (
          <span>Selecionar ícone</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-80 max-h-96 overflow-y-auto bg-background border border-muted rounded-md shadow-lg p-3">
          <div className="space-y-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar ícones..."
              className="w-full px-3 py-1.5 rounded border border-muted/50 bg-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                className={`text-xs px-2 py-1 rounded-full ${selectedLibrary === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 hover:bg-muted"
                  }`}
                onClick={() => setSelectedLibrary(null)}
              >
                Todos
              </button>

              {libraryOptions.map((lib) => (
                <button
                  key={lib}
                  type="button"
                  className={`text-xs px-2 py-1 rounded-full ${selectedLibrary === lib
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                    }`}
                  onClick={() => setSelectedLibrary(lib)}
                >
                  {lib}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-6 gap-1">
            {displayedIcons.map((iconName) => (
              <button
                key={iconName}
                type="button"
                className={`p-2 rounded hover:bg-muted/30 flex items-center justify-center ${iconName === value ? "bg-primary/20 border border-primary/50" : ""
                  }`}
                onClick={() => {
                  onChange(iconName);
                  setIsOpen(false);
                }}
                title={iconName}
              >
                <Icon name={iconName} size={20} />
              </button>
            ))}
          </div>

          {displayedIcons.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Nenhum ícone encontrado
            </p>
          )}

          {filteredIcons.length > 100 && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              Mostrando 100 de {filteredIcons.length} ícones
            </p>
          )}
        </div>
      )}
    </div>
  );
}
