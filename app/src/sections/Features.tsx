import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'efficiency',
    badge: 'More Efficiency, Less time',
    title: 'Save time',
    titleHighlight: 'and boost efficiency',
    description:
      'Automate the management of large volumes of data on a single platform, measure results, and gain actionable insights to maximize resource performance.',
    image: '/images/feature-laptop.jpg',
    icon: Zap,
    reverse: false,
  },
  {
    id: 'collaboration',
    badge: 'More productivity, Less uncertainty',
    title: 'Enhance collaboration',
    titleHighlight: 'and productivity',
    description:
      'Streamline teamwork—even from the heart of the field. Centralize tracking of fields, clients, and crops, monitor progress, and share reliable information across all departments.',
    image: '/images/feature-collab.jpg',
    icon: Users,
    reverse: true,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      features.forEach((feature) => {
        const featureEl = document.querySelector(`#feature-${feature.id}`);
        const imageEl = featureEl?.querySelector('.feature-image');
        const contentEl = featureEl?.querySelector('.feature-content');

        if (imageEl && contentEl) {
          gsap.fromTo(
            imageEl,
            {
              opacity: 0,
              x: feature.reverse ? 50 : -50,
              rotateY: feature.reverse ? -15 : 15,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: featureEl,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            contentEl,
            {
              opacity: 0,
              x: feature.reverse ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: featureEl,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="py-20 lg:py-32 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#1a8f3d]/10 text-[#1a8f3d] rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            Transform Your Agricultural Operations
          </h2>
          <p className="text-lg text-[#333]/70 max-w-2xl mx-auto">
            Discover how our platform helps you make data-driven decisions and optimize every aspect of your farm management.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={`feature-${feature.id}`}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                feature.reverse ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Image */}
              <div
                className={`feature-image relative ${feature.reverse ? 'lg:order-2' : ''}`}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Badge */}
                <div
                  className={`absolute -bottom-6 ${
                    feature.reverse ? '-left-6' : '-right-6'
                  } bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float`}
                >
                  <div className="w-12 h-12 bg-[#1a8f3d]/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#1a8f3d]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#333]">{feature.badge.split(',')[0]}</div>
                    <div className="text-xs text-[#333]/60">{feature.badge.split(',')[1]}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`feature-content ${feature.reverse ? 'lg:order-1' : ''}`}>
                <span className="inline-block px-3 py-1 bg-[#1a8f3d]/10 text-[#1a8f3d] rounded-full text-xs font-medium mb-4">
                  {feature.badge}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#333] mb-4">
                  {feature.title}{' '}
                  <span className="text-[#1a8f3d]">{feature.titleHighlight}</span>
                </h3>
                <p className="text-lg text-[#333]/70 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-[#1a8f3d] text-[#1a8f3d] hover:bg-[#1a8f3d] hover:text-white rounded-full px-6 py-5 transition-all duration-300 group"
                >
                  Discover our platform
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

