import { useEffect, useRef } from 'react';
import { 
  Brain, 
  Eye, 
  MessageSquare, 
  Wrench, 
  Apple,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iaFeatures = [
  {
    title: 'Modelos Predictivos',
    description: 'Algoritmos que analizan datos históricos y climáticos para predecir rendimientos, plagas y flujo de caja.',
    icon: Brain,
    color: '#6366F1',
  },
  {
    title: 'Visión Computacional',
    description: 'Análisis automático de imágenes de drones y satélites para detectar malezas y estrés hídrico.',
    icon: Eye,
    color: '#8B5A3C',
  },
  {
    title: 'Asistente Conversacional',
    description: 'Interfaz de lenguaje natural. "MiCampo, ¿cuántas hectáreas de maíz me faltan sembrar?"',
    icon: MessageSquare,
    color: '#1B4D3E',
  },
  {
    title: 'Mantenimiento Predictivo',
    description: 'IA que analiza vibraciones y temperaturas para predecir fallas mecánicas antes de que ocurran.',
    icon: Wrench,
    color: '#C9A227',
  },
  {
    title: 'Nutrición Animal IA',
    description: 'Algoritmos que formulan la dieta más económica que cumple requerimientos nutricionales exactos.',
    icon: Apple,
    color: '#4A7C59',
  },
];

// Neural Network Canvas Component
const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const nodeCount = 25;
    const connectionDistance = 120;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6366F1';
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default function IA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ia-header',
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
        '.ia-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.ia-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ia" className="py-24 lg:py-32 bg-[#0f1214] relative overflow-hidden">
      {/* Neural Network Background */}
      <NeuralNetworkCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2ED] via-transparent to-[#F5F2ED] opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B4D3E]/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="ia-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1]/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span className="text-sm font-medium text-[#6366F1]">Inteligencia Artificial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            El <span className="text-[#6366F1]">Cerebro</span> de MiCampo
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            La IA no es un añadido, es el motor que impulsa cada decisión. 
            De lo reactivo a lo predictivo.
          </p>
        </div>

        {/* IA Features Grid */}
        <div className="ia-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {iaFeatures.map((feature, idx) => (
            <div
              key={feature.title}
              className="ia-card group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6366F1] transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 40px ${feature.color}10` }}
              />

              {/* Neural connection line */}
              {idx < iaFeatures.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <Brain className="w-5 h-5 text-[#6366F1]" />
            <span className="text-white/80 text-sm">
              MiCampo aprende de tus datos y mejora sus predicciones cada día
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
