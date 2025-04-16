import Link from 'next/link';
import { FaShieldAlt } from "react-icons/fa"; // Importação direta do ícone

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <span className="text-primary mr-2">
              <FaShieldAlt size={20} />
            </span>
            <span className="font-orbitron font-bold">
              FORTRESS<span className="text-primary">GUARD</span>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/" className="text-sm font-tech text-muted-foreground hover:text-white transition-colors">
              Home
            </Link>
            <Link href="https://www.linkedin.com/in/jonhvmp/" className="text-sm font-tech text-muted-foreground hover:text-white transition-colors">
              Linkedin
            </Link>
            <Link href="https://fortressguard.onrender.com/docs/" className="text-sm font-tech text-muted-foreground hover:text-white transition-colors">
              Documentação
            </Link>
            <Link
              href="https://github.com/Jonhvmp/FortressGuard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-tech text-muted-foreground hover:text-white transition-colors"
            >
              GitHub
            </Link>
          </nav>

          <div className="mt-4 md:mt-0 text-xs font-terminal text-muted-foreground">
            &copy; {new Date().getFullYear()} FortressGuard. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
