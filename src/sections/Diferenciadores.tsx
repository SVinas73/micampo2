import { useEffect, useRef, useState } from 'react';
import { 
  Copy, 
  WifiOff, 
  Sun, 
  BarChart3, 
  Bot,
  ArrowRight,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const diferenciadores = [
  {
    id: 'gemelo',
    title: 'Gemelo Digital Táctico',
    subtitle: 'De la observación a la acción',
    description: 'Cuando el satélite detecta malezas y el clima es favorable, MiCampo pre-configura automáticamente la orden de trabajo. No solo muestra problemas, propone soluciones.',
    icon: Copy,
    color: '#1B4D3E',
    visual: 'split',
  },
  {
    id: 'offline',
    title: 'IA Offline-First',
    subtitle: 'Inteligencia sin señal',
    description: 'Nuestro asistente descarga datos al celular. Pregunta en medio del campo sin conexión: "¿Qué rinde tuvo este lote el año pasado?" y recibe respuesta al instante.',
    icon: WifiOff,
    color: '#8B5A3C',
    visual: 'phone',
  },
  {
    id: 'cabina',
    title: 'Modo Cabina',
    subtitle: 'Diseñado para el campo real',
    description: 'Interfaz adaptable con Modo Alto Contraste para operar bajo el sol del mediodía y Modo Oscuro para operación nocturna en tractor. Reduce la fatiga visual.',
    icon: Sun,
    color: '#C9A227',
    visual: 'daynight',
  },
  {
    id: 'benchmark',
    title: 'Benchmarking Anónimo',
    subtitle: 'Inteligencia colectiva',
    description: 'Compara tu desempeño con el promedio de tu zona (anonimizado). "Mi costo de cosecha es 15% mayor que mis vecinos". Dato clave para negociar y mejorar.',
    icon: BarChart3,
    color: '#1B4D3E',
    visual: 'chart',
  },
  {
    id: 'robotico',
    title: 'Centro de Control Robótico',
    subtitle: 'El futuro de la agricultura',
    description: 'Orquestador de flota que coordina misiones mixtas: tractores tripulados trabajando junto a robots autónomos en el mismo lote. La agricultura del mañana, hoy.',
    icon: Bot,
    color: '#6366F1',
    visual: 'robots',
  },
];

export default function Diferenciadores() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % diferenciadores.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.diferenciadores-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.diferenciador-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.diferenciador-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeDif = diferenciadores[activeIndex];

  return (
    <section ref={sectionRef} id="diferenciadores" className="py-24 lg:py-32 bg-[#2D3436] relative overflow-hidden">
      {/* Background neural pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#1B4D3E" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#1B4D3E" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#1B4D3E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="diferenciadores-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B4D3E]/20 rounded-full mb-4">
            <Zap className="w-4 h-4 text-[#C9A227]" />
            <span className="text-sm font-medium text-[#C9A227]">Lo que nos hace únicos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Diferenciadores <span className="text-[#C9A227]">MiCampo</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Innovaciones que nos posicionan como el sistema más avanzado del mercado agropecuario.
          </p>
        </div>

        {/* Main Content */}
        <div className="diferenciador-content grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Navigation & Content */}
          <div>
            {/* Navigation tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {diferenciadores.map((dif, idx) => (
                <button
                  key={dif.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    idx === activeIndex
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  style={{
                    backgroundColor: idx === activeIndex ? dif.color : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {dif.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="relative min-h-[280px]">
              {diferenciadores.map((dif, idx) => (
                <div
                  key={dif.id}
                  className={`transition-all duration-500 ${
                    idx === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${dif.color}30` }}
                  >
                    <dif.icon className="w-8 h-8" style={{ color: dif.color }} />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {dif.title}
                  </h3>
                  <p className="text-lg text-[#C9A227] mb-4">
                    {dif.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {dif.description}
                  </p>

                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-[#2D3436] rounded-full group"
                  >
                    Conocer más
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev - 1 + diferenciadores.length) % diferenciadores.length);
                  setIsAutoPlaying(false);
                }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % diferenciadores.length);
                  setIsAutoPlaying(false);
                }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {/* Progress dots */}
              <div className="flex items-center gap-2 ml-4">
                {diferenciadores.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-8 bg-[#C9A227]' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central circle */}
              <div 
                className="absolute inset-8 rounded-full flex items-center justify-center transition-all duration-500"
                style={{ backgroundColor: `${activeDif.color}20` }}
              >
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 animate-glow-pulse"
                  style={{ backgroundColor: activeDif.color }}
                >
                  <activeDif.icon className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Orbiting elements */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 72}deg) translateX(180px) rotate(-${i * 72}deg)`,
                    opacity: i === activeIndex % 5 ? 1 : 0.3,
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full animate-neural-pulse"
                    style={{ 
                      backgroundColor: activeDif.color,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                </div>
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + 40 * Math.cos((i * 72 * Math.PI) / 180)}%`}
                    y2={`${50 + 40 * Math.sin((i * 72 * Math.PI) / 180)}%`}
                    stroke={activeDif.color}
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity={i === activeIndex % 5 ? 0.8 : 0.2}
                    className="transition-opacity duration-500"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
