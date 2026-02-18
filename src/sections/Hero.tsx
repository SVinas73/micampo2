import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Cpu } from 'lucide-react';
import gsap from 'gsap';

// Neural Network SVG Component
const NeuralNetwork = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1B4D3E" stopOpacity="0" />
          <stop offset="50%" stopColor="#1B4D3E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1B4D3E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Neural connections */}
      <g className="neural-connections">
        {[...Array(8)].map((_, i) => (
          <line
            key={`conn-${i}`}
            x1={`${15 + i * 10}%`}
            y1={`${20 + (i % 3) * 25}%`}
            x2={`${60 + (i % 4) * 8}%`}
            y2={`${15 + (i % 5) * 18}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="neural-line"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </g>
      {/* Neural nodes */}
      <g className="neural-nodes">
        {[...Array(12)].map((_, i) => (
          <circle
            key={`node-${i}`}
            cx={`${20 + (i % 6) * 12}%`}
            cy={`${25 + Math.floor(i / 6) * 40}%`}
            r="4"
            fill="#1B4D3E"
            className="animate-neural-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        '.hero-headline span',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      // Subheadline
      gsap.fromTo(
        '.hero-subheadline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.8 }
      );

      // CTAs
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
      );

      // Image
      gsap.fromTo(
        '.hero-image',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.2 }
      );

      // Neural overlay
      gsap.fromTo(
        '.neural-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F2ED]"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) scale(1.05)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <img
          src="/images/micampo-hero.jpg"
          alt="Campos agrícolas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2ED] via-transparent to-[#F5F2ED]/50" />
      </div>

      {/* Neural Network Overlay */}
      <div className="neural-overlay absolute inset-0 z-[1] opacity-30">
        <NeuralNetwork />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B4D3E]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#1B4D3E]" />
              <span className="text-sm font-medium text-[#1B4D3E]">El Sistema Nervioso del Agro</span>
            </div>

            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3436] leading-tight mb-6 overflow-hidden">
              <span className="inline-block">Conectamos</span>{' '}
              <span className="inline-block text-[#1B4D3E]">cada hectárea,</span>{' '}
              <span className="inline-block">cada animal</span>{' '}
              <span className="inline-block text-[#8B5A3C]">y cada decisión</span>
            </h1>

            <p className="hero-subheadline text-lg sm:text-xl text-[#2D3436]/70 mb-8 max-w-xl leading-relaxed">
              MiCampo es el primer Sistema Operativo Integral que une agricultura, ganadería, 
              logística y finanzas en una inteligencia predictiva única potenciada por IA.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#1B4D3E]/30 hover:-translate-y-1 group"
                >
                  Activar MiCampo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 group"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Ver Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { value: '20M+', label: 'Hectáreas' },
                { value: '500K+', label: 'Animales' },
                { value: '15K+', label: 'Productores' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-[#1B4D3E]">{stat.value}</div>
                  <div className="text-sm text-[#2D3436]/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="hidden lg:block relative">
            <div 
              className="relative"
              style={{
                transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`,
                transition: 'transform 0.5s ease-out',
              }}
            >
              {/* Floating cards representing the system */}
              <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-xl p-4 animate-float-organic">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center">
                    <span className="text-[#1B4D3E] text-lg">🌾</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#2D3436]">Lote 42</div>
                    <div className="text-xs text-[#2D3436]/60">NDVI: 0.87</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 bg-white rounded-2xl shadow-xl p-4 animate-float-organic" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8B5A3C]/10 rounded-xl flex items-center justify-center">
                    <span className="text-[#8B5A3C] text-lg">🐄</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#2D3436]">Vaca #1847</div>
                    <div className="text-xs text-[#2D3436]/60">Producción: 28L</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/4 bg-white rounded-2xl shadow-xl p-4 animate-float-organic" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                    <span className="text-[#C9A227] text-lg">💰</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#2D3436]">Margen Bruto</div>
                    <div className="text-xs text-green-600">+12.5% vs mes pasado</div>
                  </div>
                </div>
              </div>

              {/* Central node */}
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E] to-[#143d31] rounded-full opacity-10 animate-pulse" />
                <div className="absolute inset-4 bg-gradient-to-br from-[#1B4D3E] to-[#143d31] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-8 bg-gradient-to-br from-[#1B4D3E] to-[#143d31] rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <Cpu className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-sm font-medium">MiCampo</div>
                    <div className="text-xs opacity-70">IA Activa</div>
                  </div>
                </div>
                {/* Orbiting dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-[#C9A227] rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(140px) rotate(-${i * 60}deg)`,
                      animation: `neural-pulse 2s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2ED] to-transparent z-[5]" />
    </section>
  );
}
