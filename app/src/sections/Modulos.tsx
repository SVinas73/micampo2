import { useEffect, useRef, useState } from 'react';
import { 
  Satellite, 
  Beef, 
  Package, 
  TrendingUp, 
  Tractor, 
  Leaf,
  ArrowRight,
  Droplets,
  Sun,
  Bug,
  MapPin,
  Milk,
  Syringe,
  Wheat,
  Fuel,
  Receipt,
  Landmark,
  Wrench,
  Cpu,
  Globe
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modulos = [
  {
    id: 'agricultura',
    title: 'Agricultura de Precisión',
    description: 'El cerebro agronómico. Combina satélites, sensores y predicciones.',
    icon: Satellite,
    color: '#1B4D3E',
    image: '/images/micampo-agricultura.jpg',
    features: [
      { icon: MapPin, text: 'Mapeo NDVI Multi-Capa' },
      { icon: Droplets, text: 'Gestión de Riego con IA' },
      { icon: Sun, text: 'Pronóstico Climático' },
      { icon: Bug, text: 'Alertas de Plagas IA' },
    ],
  },
  {
    id: 'ganaderia',
    title: 'Ganadería Inteligente',
    description: 'Gestión de rentabilidad individual, no solo conteo de cabezas.',
    icon: Beef,
    color: '#8B5A3C',
    image: '/images/micampo-ganaderia.jpg',
    features: [
      { icon: Cpu, text: 'Identificación RFID' },
      { icon: Milk, text: 'Producción Lechera' },
      { icon: Syringe, text: 'Calendario Sanitario' },
      { icon: TrendingUp, text: 'ROI Genético' },
    ],
  },
  {
    id: 'logistica',
    title: 'Logística e Inventarios',
    description: 'Control del dinero inmovilizado en insumos y granos.',
    icon: Package,
    color: '#C9A227',
    image: '/images/micampo-logistica.jpg',
    features: [
      { icon: Wheat, text: 'Stock de Insumos' },
      { icon: Fuel, text: 'Gestión de Combustible' },
      { icon: Receipt, text: 'Balanzas Digitales' },
      { icon: ArrowRight, text: 'Transferencias' },
    ],
  },
  {
    id: 'finanzas',
    title: 'Finanzas Real-Time',
    description: 'El motor económico. Responde: "¿Gané dinero?"',
    icon: TrendingUp,
    color: '#1B4D3E',
    image: '/images/micampo-finanzas.jpg',
    features: [
      { icon: Receipt, text: 'OCR de Facturas' },
      { icon: Landmark, text: 'Conciliación Bancaria' },
      { icon: TrendingUp, text: 'Márgenes en Vivo' },
      { icon: Globe, text: 'Multi-Moneda' },
    ],
  },
  {
    id: 'maquinaria',
    title: 'Maquinaria Conectada',
    description: 'Garantía de tiempo de actividad (Uptime).',
    icon: Tractor,
    color: '#8B5A3C',
    image: '/images/micampo-maquinaria.jpg',
    features: [
      { icon: MapPin, text: 'Telemática GPS' },
      { icon: Cpu, text: 'Mantenimiento Predictivo' },
      { icon: Wrench, text: 'Órdenes de Taller' },
      { icon: TrendingUp, text: 'Eficiencia de Uso' },
    ],
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Automatización del cumplimiento regulatorio.',
    icon: Leaf,
    color: '#4A7C59',
    image: '/images/micampo-sostenibilidad.jpg',
    features: [
      { icon: Globe, text: 'Huella de Carbono' },
      { icon: Receipt, text: 'Recetas Agronómicas' },
      { icon: Landmark, text: 'Certificaciones' },
      { icon: Globe, text: 'Cumplimiento EUDR' },
    ],
  },
];

export default function Modulos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setActiveModulo] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.modulo-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.section-header',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="modulos" className="py-24 lg:py-32 bg-[#F5F2ED] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5A3C]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B4D3E]/10 rounded-full mb-4">
            <Cpu className="w-4 h-4 text-[#1B4D3E]" />
            <span className="text-sm font-medium text-[#1B4D3E]">6 Módulos Integrados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3436] mb-4">
            El <span className="text-[#1B4D3E]">Cerebro</span> de MiCampo
          </h2>
          <p className="text-lg text-[#2D3436]/70 max-w-2xl mx-auto">
            Cada módulo está diseñado para trabajar en perfecta sincronía, 
            creando un sistema nervioso que conecta toda tu operación.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((modulo) => (
            <div
              key={modulo.id}
              className="modulo-card group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setActiveModulo(modulo.id)}
              onMouseLeave={() => setActiveModulo(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={modulo.image}
                  alt={modulo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 opacity-60 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${modulo.color}, transparent)` }}
                />
                {/* Icon badge */}
                <div 
                  className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: modulo.color }}
                >
                  <modulo.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2D3436] mb-2 group-hover:text-[#1B4D3E] transition-colors">
                  {modulo.title}
                </h3>
                <p className="text-sm text-[#2D3436]/60 mb-4">
                  {modulo.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {modulo.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#2D3436]/70"
                    >
                      <feature.icon className="w-3 h-3" style={{ color: modulo.color }} />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Expand indicator */}
                <div className="mt-4 pt-4 border-t border-[#2D3436]/10 flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: modulo.color }}>
                    Explorar módulo
                  </span>
                  <ArrowRight 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    style={{ color: modulo.color }}
                  />
                </div>
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  boxShadow: `inset 0 0 60px ${modulo.color}20`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Connection lines visualization */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#2D3436]/50 mb-4">
            Todos los módulos se sincronizan automáticamente
          </p>
          <div className="flex justify-center items-center gap-4">
            {modulos.slice(0, 4).map((modulo, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full animate-neural-pulse"
                  style={{ backgroundColor: modulo.color, animationDelay: `${i * 0.3}s` }}
                />
                {i < 3 && (
                  <div className="w-16 h-px bg-gradient-to-r from-[#2D3436]/20 to-[#2D3436]/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
