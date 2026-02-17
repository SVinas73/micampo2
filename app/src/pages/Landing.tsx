// Landing Page
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Modulos from '@/sections/Modulos';
import Diferenciadores from '@/sections/Diferenciadores';
import IA from '@/sections/IA';
import Arquitectura from '@/sections/Arquitectura';
import Stats from '@/sections/Stats';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Navbar />
      <main>
        <Hero />
        <Modulos />
        <Diferenciadores />
        <IA />
        <Arquitectura />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
