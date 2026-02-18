import { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  Beef,
  Package, 
  DollarSign, 
  Tractor, 
  Leaf, 
  Calendar,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  CloudSun,
  Droplets,
  Calculator,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  subItems?: { label: string; path: string; icon: React.ElementType }[];
}

interface DashboardLayoutProps {
  children?: ReactNode;
}

const navItems: NavItem[] = [
  { 
    label: 'Inicio', 
    icon: LayoutDashboard, 
    path: '/dashboard' 
  },
  { 
    label: 'Agronomía', 
    icon: Sprout, 
    path: '/dashboard/agronomia',
    badge: 3,
    subItems: [
      { label: 'Campo Digital', path: '/dashboard/agronomia', icon: Map },
      { label: 'Calculadora de Dosis', path: '/dashboard/agronomia/dosis', icon: Calculator },
      { label: 'Clima', path: '/dashboard/agronomia/clima', icon: CloudSun },
      { label: 'Plan de Riego', path: '/dashboard/agronomia/riego', icon: Droplets },
    ]
  },
  { 
    label: 'Ganadería', 
    icon: Beef, 
    path: '/dashboard/ganaderia' 
  },
  { 
    label: 'Logística e Inventario', 
    icon: Package, 
    path: '/dashboard/logistica' 
  },
  { 
    label: 'Finanzas', 
    icon: DollarSign, 
    path: '/dashboard/finanzas' 
  },
  { 
    label: 'Maquinaria y MTM', 
    icon: Tractor, 
    path: '/dashboard/maquinaria' 
  },
  { 
    label: 'Sostenibilidad', 
    icon: Leaf, 
    path: '/dashboard/sostenibilidad' 
  },
  { 
    label: 'Calendario', 
    icon: Calendar, 
    path: '/dashboard/calendario' 
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>('Agronomía');
  const [darkMode, setDarkMode] = useState(false);
  const [cabinMode, setCabinMode] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location, isMobile]);

  useEffect(() => {
    if (cabinMode) {
      document.documentElement.classList.add('cabin-mode');
    } else {
      document.documentElement.classList.remove('cabin-mode');
    }
  }, [cabinMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#F5F2ED] transition-colors duration-300",
      darkMode && "dark bg-[#1a1a1a]",
      cabinMode && "cabin-mode"
    )}>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-white dark:bg-[#2D3436] border-r border-[#E5E5E5] dark:border-[#404040] transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-72" : "w-20",
        isMobile && !sidebarOpen && "-translate-x-full",
        isMobile && sidebarOpen && "w-72"
      )}>
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-[#E5E5E5] dark:border-[#404040]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B4D3E] to-[#2E7D32] rounded-xl flex items-center justify-center shadow-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-[#2D3436] dark:text-white text-lg leading-tight">MiCampo</span>
                <span className="text-xs text-[#636E72] dark:text-[#B2BEC3]">Campo Digital</span>
              </div>
            )}
          </div>
          {!isMobile && (
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto p-1.5 hover:bg-[#F5F2ED] dark:hover:bg-[#404040] rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="px-6 py-4 border-b border-[#E5E5E5] dark:border-[#404040]">
            <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">Bienvenido,</p>
            <p className="font-semibold text-[#2D3436] dark:text-white">[Nombre]</p>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 h-[calc(100vh-180px)]">
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const isExpanded = expandedItem === item.label;
              
              return (
                <div key={item.label}>
                  <NavLink
                    to={item.subItems ? '#' : item.path}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleExpand(item.label);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                      isActive 
                        ? "bg-[#1B4D3E]/10 text-[#1B4D3E] dark:bg-[#1B4D3E]/20 dark:text-[#4CAF50] font-medium" 
                        : "text-[#636E72] dark:text-[#B2BEC3] hover:bg-[#F5F2ED] dark:hover:bg-[#404040] hover:text-[#2D3436] dark:hover:text-white",
                      !sidebarOpen && "justify-center"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive && "text-[#1B4D3E] dark:text-[#4CAF50]"
                    )} />
                    
                    {sidebarOpen && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-[#E74C3C] text-white text-xs px-1.5 py-0">
                            {item.badge}
                          </Badge>
                        )}
                        {item.subItems && (
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isExpanded && "rotate-90"
                          )} />
                        )}
                      </>
                    )}
                    
                    {/* Tooltip para sidebar colapsado */}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-[#2D3436] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </NavLink>

                  {/* SubItems */}
                  {sidebarOpen && item.subItems && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#E5E5E5] dark:border-[#404040] pl-3">
                      {item.subItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                              isSubActive
                                ? "bg-[#1B4D3E]/5 text-[#1B4D3E] dark:text-[#4CAF50] font-medium"
                                : "text-[#636E72] dark:text-[#B2BEC3] hover:text-[#2D3436] dark:hover:text-white"
                            )}
                          >
                            <sub.icon className="w-4 h-4" />
                            {sub.label}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#E5E5E5] dark:border-[#404040] bg-white dark:bg-[#2D3436]">
          <div className={cn("flex items-center gap-2", !sidebarOpen && "justify-center")}>
            {sidebarOpen ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex-1"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setCabinMode(!cabinMode)}
                  className={cn("flex-1", cabinMode && "text-[#1B4D3E] bg-[#1B4D3E]/10")}
                >
                  <Sun className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-1">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-1">
                  <Settings className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarOpen ? "ml-72" : "ml-20",
        isMobile && "ml-0"
      )}>
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-[#2D3436]/80 backdrop-blur-md border-b border-[#E5E5E5] dark:border-[#404040] sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            )}
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-[#636E72] dark:text-[#B2BEC3]">
              <span className="hover:text-[#2D3436] dark:hover:text-white cursor-pointer">Inicio</span>
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-[#2D3436] dark:text-white">Agronomía</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Weather Widget */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F5F2ED] dark:bg-[#404040] rounded-lg">
              <CloudSun className="w-4 h-4 text-[#F39C12]" />
              <span className="text-sm font-medium">28°C</span>
              <span className="text-xs text-[#636E72] dark:text-[#B2BEC3]">Parcialmente nublado</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E74C3C] rounded-full" />
            </Button>

            {/* User Avatar */}
            <div className="w-9 h-9 bg-gradient-to-br from-[#1B4D3E] to-[#2E7D32] rounded-full flex items-center justify-center text-white font-medium text-sm">
              SV
            </div>
          </div>
        </header>

        {/* Page Content - usa children si se pasan, sino Outlet */}
        <div className="p-6">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}