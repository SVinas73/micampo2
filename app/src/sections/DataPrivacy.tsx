import { useEffect, useRef } from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const privacyFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Your data is encrypted at rest and in transit',
  },
  {
    icon: Eye,
    title: 'Full Transparency',
    description: 'You control what is shared and with whom',
  },
  {
    icon: FileCheck,
    title: 'GDPR Compliant',
    description: 'We follow strict data protection regulations',
  },
];

export default function DataPrivacy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shield pulse animation
      gsap.fromTo(
        '.privacy-shield',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        '.privacy-text',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards
      gsap.fromTo(
        '.privacy-feature',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.privacy-features',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d3320 0%, #1a5c3a 50%, #0d3320 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Shield Icon */}
          <div className="flex justify-center">
            <div className="privacy-shield relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 animate-pulse-glow">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-[#1a8f3d]/30 absolute -inset-8" />
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#1a8f3d]/20 absolute -inset-16" />
              </div>

              {/* Main shield */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-[#1a8f3d] to-[#147a33] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#1a8f3d]/30">
                <Shield className="w-24 h-24 sm:w-32 sm:h-32 text-white" strokeWidth={1.5} />
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white absolute" />
              </div>

              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-[#1a8f3d] rounded-full animate-float" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-8 w-3 h-3 bg-[#8f6c1a] rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-white">
            <h2 className="privacy-text text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Data
              <br />
              <span className="text-[#1a8f3d]">privacy</span>
            </h2>

            <p className="privacy-text text-lg sm:text-xl text-white/80 mb-4 leading-relaxed">
              As the owner of your information, you have the right to privacy.
            </p>

            <p className="privacy-text text-base text-white/60 mb-8 leading-relaxed">
              With AgriTech Pro, you control what is shared and with whom, ensuring transparency. We prioritize protecting your privacy and maintaining your control over information. Our platform is built with security at its core.
            </p>

            {/* Privacy Features */}
            <div className="privacy-features grid sm:grid-cols-3 gap-4">
              {privacyFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="privacy-feature p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <feature.icon className="w-6 h-6 text-[#1a8f3d] mb-3" />
                  <h4 className="font-semibold text-sm text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-white/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
