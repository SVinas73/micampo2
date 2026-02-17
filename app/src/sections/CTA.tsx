import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating elements
      gsap.to('.cta-float-1', {
        y: -15,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.cta-float-2', {
        y: 15,
        rotation: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E] via-[#143d31] to-[#0d2820]" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift"
        style={{
          background: 'linear-gradient(45deg, #1B4D3E, #6366F1, #1B4D3E, #8B5A3C)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating elements */}
      <div className="cta-float-1 absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="cta-float-2 absolute bottom-20 right-20 w-48 h-48 bg-[#6366F1]/20 rounded-full blur-3xl" />

      {/* Neural pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="white" />
              <line x1="30" y1="30" x2="60" y2="0" stroke="white" strokeWidth="0.5" opacity="0.3" />
              <line x1="30" y1="30" x2="0" y2="60" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-content text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-8 backdrop-blur-sm">
            <Cpu className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Activa el Sistema Nervioso
            <br />
            <span className="text-[#C9A227]">de tu Campo</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Miles de productores ya operan con inteligencia predictiva. 
            Únete a la revolución del agro conectado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-[#1B4D3E] hover:bg-white/90 rounded-full px-10 py-7 text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 group"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Comenzar Gratis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 text-base font-semibold transition-all duration-300"
              >
                Hablar con Ventas
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 mb-6">
              Confían en MiCampo las principales empresas del agro
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {['AgroCorp', 'GreenField', 'RuralTech', 'FarmMax', 'Cultiva'].map((company) => (
                <span key={company} className="text-lg font-semibold text-white">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
