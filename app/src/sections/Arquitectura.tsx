import { useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Cloud, 
  Server, 
  Cpu, 
  Zap,
  WifiOff,
  MessageCircle,
  Globe,
  Shield,
  Plug,
  Database,
  Users
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pipelineSteps = [
  { icon: Smartphone, label: 'Dispositivos', color: '#8B5A3C' },
  { icon: WifiOff, label: 'Edge', color: '#C9A227' },
  { icon: Cloud, label: 'Cloud', color: '#1B4D3E' },
  { icon: Cpu, label: 'IA', color: '#6366F1' },
  { icon: Zap, label: 'Acción', color: '#4A7C59' },
];

const features = [
  {
    icon: WifiOff,
    title: 'Offline-First',
    description: '100% operativo sin internet. Sincronización inteligente cuando recupera red.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integrado',
    description: 'Bot de alertas configurables. Los avisos críticos llegan donde está la atención.',
  },
  {
    icon: Server,
    title: 'Microservicios',
    description: 'Arquitectura modular. Si un módulo falla, el resto sigue funcionando.',
  },
  {
    icon: Plug,
    title: 'API Abierta',
    description: 'Marketplace de integraciones. Conecta drones, laboratorios, fintechs.',
  },
  {
    icon: Database,
    title: 'Base de Datos Híbrida',
    description: 'SQL para finanzas, Series de Tiempo para sensores, Vectorial para IA.',
  },
  {
    icon: Shield,
    title: 'Soberanía de Datos',
    description: 'Tus datos te pertenecen. Encriptación end-to-end y exportación completa.',
  },
  {
    icon: Globe,
    title: 'Multi-Idioma',
    description: 'Preparado para escalar internacionalmente: Español, Inglés, Portugués.',
  },
  {
    icon: Users,
    title: 'Multi-Tenant',
    description: 'Infraestructura que sirve desde pequeños productores hasta grandes corporaciones.',
  },
];

export default function Arquitectura() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arq-header',
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

      // Pipeline animation
      gsap.fromTo(
        '.pipeline-step',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.pipeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.pipeline-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.3,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pipeline',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.arq-feature',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.arq-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="arquitectura" className="py-24 lg:py-32 bg-[#F5F2ED] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="arq-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1]/10 rounded-full mb-4">
            <Server className="w-4 h-4 text-[#6366F1]" />
            <span className="text-sm font-medium text-[#6366F1]">Arquitectura Técnica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3436] mb-4">
            La Base <span className="text-[#6366F1]">Invisible</span> que lo Hace Funcionar
          </h2>
          <p className="text-lg text-[#2D3436]/70 max-w-2xl mx-auto">
            Tecnología de punta diseñada para el campo real. Robusta, escalable y siempre disponible.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="pipeline mb-20">
          <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-0">
            {pipelineSteps.map((step, idx) => (
              <div key={step.label} className="flex items-center">
                <div 
                  className="pipeline-step flex flex-col items-center p-4 lg:p-6"
                >
                  <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <span className="text-sm font-medium text-[#2D3436]">{step.label}</span>
                </div>
                
                {idx < pipelineSteps.length - 1 && (
                  <div className="pipeline-connector hidden lg:flex items-center px-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#2D3436]/20 to-[#2D3436]/40 rounded-full relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-4 bg-white/50 animate-data-flow" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-[#2D3436]/50 mt-6">
            Flujo de datos: desde el campo hasta la decisión inteligente
          </p>
        </div>

        {/* Features Grid */}
        <div className="arq-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="arq-feature group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B4D3E]/10 flex items-center justify-center mb-3 group-hover:bg-[#1B4D3E] transition-colors">
                <feature.icon className="w-5 h-5 text-[#1B4D3E] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-[#2D3436] mb-1 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-[#2D3436]/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Standards badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['ISOBUS', 'Shapefiles', 'GeoJSON', 'OData', 'REST API', 'GraphQL'].map((std) => (
            <span 
              key={std}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#2D3436]/70 shadow-sm"
            >
              {std}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
