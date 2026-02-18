import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Puzzle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const extensions = [
  {
    id: 1,
    name: 'Weather Pro',
    description: 'Real-time weather tracking and forecasts',
    image: '/images/extension-1.jpg',
  },
  {
    id: 2,
    name: 'Irrigation Control',
    description: 'Smart water management system',
    image: '/images/extension-2.jpg',
  },
  {
    id: 3,
    name: 'Crop Health AI',
    description: 'AI-powered crop monitoring',
    image: '/images/extension-3.jpg',
  },
];

export default function Extensions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phone animation
      gsap.fromTo(
        '.extension-phone',
        { opacity: 0, y: 50, rotateZ: -10 },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards fan out animation
      const cards = cardsRef.current?.querySelectorAll('.extension-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotateZ: (i) => (i - 1) * -5 },
          {
            opacity: 1,
            y: 0,
            rotateZ: (i) => (i - 1) * 5,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content animation
      gsap.fromTo(
        '.extension-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="platform" className="py-20 lg:py-32 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Phone and Cards */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            {/* Phone */}
            <div className="extension-phone relative z-10">
              <div className="relative w-64 sm:w-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-[#333]">
                <img
                  src="/images/feature-phone.jpg"
                  alt="AgriTech Pro Mobile App"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Extension Cards */}
            <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
              {extensions.map((ext, index) => (
                <div
                  key={ext.id}
                  className="extension-card absolute w-40 sm:w-48 rounded-xl overflow-hidden shadow-xl pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300"
                  style={{
                    top: `${20 + index * 25}%`,
                    left: index % 2 === 0 ? '-5%' : '65%',
                    transform: `rotate(${(index - 1) * 8}deg)`,
                    zIndex: 20 - index,
                  }}
                >
                  <img
                    src={ext.image}
                    alt={ext.name}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-[#1a8f3d]/10 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#8f6c1a]/10 rounded-full blur-3xl" />
          </div>

          {/* Right: Content */}
          <div className="extension-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1a8f3d]/10 rounded-xl flex items-center justify-center">
                <Puzzle className="w-5 h-5 text-[#1a8f3d]" />
              </div>
              <span className="text-sm font-medium text-[#1a8f3d]">Extensions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
              Leverage{' '}
              <span className="text-[#1a8f3d]">extensions</span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#333]/80 mb-6">
              Simplify workflows and unify your company's digital tools
            </h3>
            <p className="text-lg text-[#333]/70 mb-8 leading-relaxed">
              Optimize processes by connecting all your apps and digital solutions in one comprehensive platform. Our extension ecosystem allows you to customize your experience and add powerful capabilities tailored to your specific needs.
            </p>

            <div className="space-y-4 mb-8">
              {extensions.map((ext) => (
                <div
                  key={ext.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <img
                    src={ext.image}
                    alt={ext.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333] group-hover:text-[#1a8f3d] transition-colors">
                      {ext.name}
                    </h4>
                    <p className="text-sm text-[#333]/60">{ext.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#333]/40 group-hover:text-[#1a8f3d] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="border-2 border-[#1a8f3d] text-[#1a8f3d] hover:bg-[#1a8f3d] hover:text-white rounded-full px-6 py-5 transition-all duration-300 group"
            >
              Learn more about Extensions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
