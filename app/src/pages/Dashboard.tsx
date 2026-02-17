import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Cpu, 
  LayoutDashboard, 
  Satellite, 
  Beef, 
  Package, 
  TrendingUp, 
  Tractor, 
  Cloud,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Importar componentes de módulos
import DashboardHome from '@/components/dashboard/DashboardHome';
import AgriculturaModule from '@/components/dashboard/AgriculturaModule';
import GanaderiaModule from '@/components/dashboard/GanaderiaModule';
import LogisticaModule from '@/components/dashboard/LogisticaModule';
import FinanzasModule from '@/components/dashboard/FinanzasModule';
import MaquinariaModule from '@/components/dashboard/MaquinariaModule';
import ClimaModule from '@/components/dashboard/ClimaModule';
import AIModule from '@/components/dashboard/AIModule';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
  { path: '/dashboard/agricultura', icon: Satellite, label: 'Agricultura' },
  { path: '/dashboard/ganaderia', icon: Beef, label: 'Ganadería' },
  { path: '/dashboard/logistica', icon: Package, label: 'Logística' },
  { path: '/dashboard/finanzas', icon: TrendingUp, label: 'Finanzas' },
  { path: '/dashboard/maquinaria', icon: Tractor, label: 'Maquinaria' },
  { path: '/dashboard/clima', icon: Cloud, label: 'Clima' },
  { path: '/dashboard/ia', icon: MessageSquare, label: 'Asistente IA' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex">
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#2D3436]/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#1B4D3E] rounded-xl" />
              <Cpu className="absolute inset-0 m-auto w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#2D3436]">MiCampo</span>
              <span className="text-[10px] text-[#8B5A3C] tracking-wider">SISTEMA NERVIOSO</span>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-[#2D3436]/5">
          <p className="text-sm font-medium text-[#2D3436]">{user?.name}</p>
          <p className="text-xs text-[#2D3436]/50">{user?.farmName || 'Mi Campo'}</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#1B4D3E] text-white' 
                    : 'text-[#2D3436]/70 hover:bg-[#1B4D3E]/5 hover:text-[#1B4D3E]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2D3436]/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#2D3436]/70 hover:bg-[#1B4D3E]/5 hover:text-[#1B4D3E] transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configuración</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-[#F5F2ED] rounded-xl"
              >
                <Menu className="w-6 h-6 text-[#2D3436]" />
              </button>
              <h1 className="text-xl font-bold text-[#2D3436]">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-[#F5F2ED] rounded-xl">
                <Bell className="w-5 h-5 text-[#2D3436]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 bg-[#1B4D3E] rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/agricultura" element={<AgriculturaModule />} />
            <Route path="/ganaderia" element={<GanaderiaModule />} />
            <Route path="/logistica" element={<LogisticaModule />} />
            <Route path="/finanzas" element={<FinanzasModule />} />
            <Route path="/maquinaria" element={<MaquinariaModule />} />
            <Route path="/clima" element={<ClimaModule />} />
            <Route path="/ia" element={<AIModule />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
