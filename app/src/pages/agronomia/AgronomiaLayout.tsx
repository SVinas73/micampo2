import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mapeo de tabs a rutas
const TAB_ROUTES: Record<string, string> = {
  resumen: '/dashboard/agronomia',
  lotes: '/dashboard/agronomia/lotes',
  labores: '/dashboard/agronomia/labores',
  cultivos: '/dashboard/agronomia/cultivos',
  enfermedades: '/dashboard/agronomia/enfermedades',
  planificador: '/dashboard/agronomia/planificador',
};

// Obtener tab activo desde la URL
function getActiveTab(pathname: string): string {
  if (pathname.endsWith('/lotes')) return 'lotes';
  if (pathname.endsWith('/labores')) return 'labores';
  if (pathname.endsWith('/cultivos')) return 'cultivos';
  if (pathname.endsWith('/enfermedades')) return 'enfermedades';
  if (pathname.endsWith('/planificador')) return 'planificador';
  return 'resumen';
}

export default function AgronomiaLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);

  const handleTabChange = (value: string) => {
    const route = TAB_ROUTES[value];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2D3436] dark:text-white">Agronomia</h1>
          <p className="text-[#636E72] dark:text-[#B2BEC3]">Campo Digital</p>
        </div>

        {/* Tabs de navegacion */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
          <TabsList className="bg-white dark:bg-[#2D3436] border border-[#E5E5E5] dark:border-[#404040]">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="lotes">Lotes</TabsTrigger>
            <TabsTrigger value="labores">Labores</TabsTrigger>
            <TabsTrigger value="cultivos">Cultivos</TabsTrigger>
            <TabsTrigger value="enfermedades" className="relative">
              Deteccion Enfermedades
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E74C3C] rounded-full" />
            </TabsTrigger>
            <TabsTrigger value="planificador">Planificador de Siembras</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Contenido de la subpagina */}
      <Outlet />
    </div>
  );
}
