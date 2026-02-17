import { 
  Cpu, 
  Mail, 
  Phone,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  MessageCircle
} from 'lucide-react';

const footerLinks = {
  producto: {
    title: 'Producto',
    links: [
      { name: 'Agricultura', href: '#modulos' },
      { name: 'Ganadería', href: '#modulos' },
      { name: 'Logística', href: '#modulos' },
      { name: 'Finanzas', href: '#modulos' },
      { name: 'Precios', href: '#precios' },
    ],
  },
  empresa: {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nosotros', href: '#' },
      { name: 'Carreras', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Prensa', href: '#' },
    ],
  },
  recursos: {
    title: 'Recursos',
    links: [
      { name: 'Documentación', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Soporte', href: '#' },
      { name: 'Academy', href: '#' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacidad', href: '#' },
      { name: 'Términos', href: '#' },
      { name: 'Cookies', href: '#' },
      { name: 'GDPR', href: '#' },
    ],
  },
};

const offices = [
  {
    country: 'Argentina',
    address: 'Buenos Aires',
    flag: '🇦🇷',
  },
  {
    country: 'Brasil',
    address: 'São Paulo',
    flag: '🇧🇷',
  },
  {
    country: 'Uruguay',
    address: 'Montevideo',
    flag: '🇺🇾',
  },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Neural pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="white" />
              <line x1="40" y1="40" x2="80" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="40" x2="0" y2="80" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-[#1B4D3E] rounded-xl" />
                <Cpu className="absolute inset-0 m-auto w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A227] rounded-full animate-neural-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">MiCampo</span>
                <span className="text-[10px] text-[#8B5A3C] tracking-wider">SISTEMA NERVIOSO</span>
              </div>
            </a>
            <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
              El Sistema Operativo Integral que conecta agricultura, ganadería, 
              logística y finanzas en una inteligencia predictiva única.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hola@micampo.com" className="flex items-center gap-3 text-white/60 hover:text-[#1B4D3E] transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>hola@micampo.com</span>
              </a>
              <a href="tel:+541123456789" className="flex items-center gap-3 text-white/60 hover:text-[#1B4D3E] transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+54 11 2345 6789</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-[#1B4D3E] transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6">
            {offices.map((office) => (
              <div key={office.country} className="flex items-center gap-2 text-white/50 text-sm">
                <span className="text-lg">{office.flag}</span>
                <span>{office.country}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/40">{office.address}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} MiCampo. Todos los derechos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1B4D3E] transition-colors group"
                >
                  <social.icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
