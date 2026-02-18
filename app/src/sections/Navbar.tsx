import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Cpu } from 'lucide-react';

const navLinks = [
  { name: 'Módulos', href: '#modulos' },
  { name: 'IA', href: '#ia' },
  { name: 'Diferenciadores', href: '#diferenciadores' },
  { name: 'Arquitectura', href: '#arquitectura' },
  { name: 'Precios', href: '#precios' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 spring-ease ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 spring-ease ${
          isScrolled
            ? 'max-w-5xl px-6 py-2 glass shadow-lg rounded-full mx-4 sm:mx-auto mt-2 border border-[#1B4D3E]/10'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#1B4D3E] rounded-xl transform group-hover:scale-110 transition-transform duration-300" />
              <Cpu className="absolute inset-0 m-auto w-5 h-5 text-white" />
              {/* Neural node effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A227] rounded-full animate-neural-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#2D3436] leading-tight">MiCampo</span>
              <span className="text-[10px] text-[#8B5A3C] tracking-wider">SISTEMA NERVIOSO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#2D3436] hover:text-[#1B4D3E] transition-colors duration-300 group rounded-full hover:bg-[#1B4D3E]/5"
              >
                <span>{link.name}</span>
                {/* Neural node on hover */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1B4D3E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-[#2D3436] hover:text-[#1B4D3E] transition-colors px-4 py-2"
            >
              Ingresar
            </Link>
            <Link to="/register">
              <Button
                className="bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-full px-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#1B4D3E]/25 animate-glow-pulse"
              >
                Probar Gratis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#2D3436]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 glass shadow-xl transition-all duration-500 spring-ease ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 px-4 text-lg font-medium text-[#2D3436] hover:text-[#1B4D3E] hover:bg-[#1B4D3E]/5 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[#2D3436]/10 space-y-3">
            <Link 
              to="/login" 
              className="block py-3 px-4 text-[#2D3436] hover:text-[#1B4D3E]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ingresar
            </Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-full">
                Probar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
