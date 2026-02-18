import { useEffect, useRef, useState } from 'react';
import { Quote, TrendingUp, Users, Globe, Sprout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: 'M+', label: 'Hectáreas monitoreadas', icon: Sprout },
  { value: 500, suffix: 'K+', label: 'Animales trazados', icon: TrendingUp },
  { value: 15, suffix: 'K+', label: 'Productores activos', icon: Users },
  { value: 12, suffix: '', label: 'Países', icon: Globe },
];

const testimonials = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    role: 'Productor Agrícola',
    location: 'Buenos Aires, Argentina',
    image: '/images/micampo-testimonial-1.jpg',
    quote: 'MiCampo transformó completamente nuestra operación. Pasamos de planillas Excel a tener todo integrado en una plataforma que nos anticipa problemas antes de que ocurran.',
  },
  {
    id: 2,
    name: 'María González',
    role: 'Agrónoma',
    location: 'Córdoba, Argentina',
    image: '/images/micampo-testimonial-2.jpg',
    quote: 'La precisión de los mapas NDVI y las alertas de plagas nos han permitido reducir el uso de agroquímicos en un 25% manteniendo los mismos rendimientos.',
  },
  {
    id: 3,
    name: 'Roberto Silva',
    role: 'Ganadero',
    location: 'São Paulo, Brasil',
    image: '/images/micampo-testimonial-3.jpg',
    quote: 'La trazabilidad individual de cada animal y el control de producción lechera nos dio visibilidad que nunca tuvimos. Ahora sabemos exactamente cuál es nuestra rentabilidad por cabeza.',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-section',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.testimonial-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="precios" className="py-24 lg:py-32 bg-[#F5F2ED] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1B4D3E]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1B4D3E] transition-colors">
                <stat.icon className="w-6 h-6 text-[#1B4D3E] group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-[#1B4D3E] mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[#2D3436]/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonial-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3436] mb-4">
              Lo que dicen los <span className="text-[#1B4D3E]">productores</span>
            </h2>
            <p className="text-lg text-[#2D3436]/60 max-w-xl mx-auto">
              Miles de agricultores y ganaderos ya operan con inteligencia predictiva.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Cards */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-[#1B4D3E]/20">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1B4D3E] rounded-full flex items-center justify-center">
                            <Quote className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          <p className="text-lg lg:text-xl text-[#2D3436] mb-6 leading-relaxed italic">
                            "{testimonial.quote}"
                          </p>
                          <div>
                            <h4 className="font-bold text-[#2D3436]">{testimonial.name}</h4>
                            <p className="text-sm text-[#2D3436]/60">
                              {testimonial.role} · {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-[#1B4D3E] w-8'
                      : 'bg-[#2D3436]/20 hover:bg-[#2D3436]/40 w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
