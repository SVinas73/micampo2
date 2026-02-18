import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Lazy load de páginas de Agronomía
const AgronomiaLayout = lazy(() => import('@/pages/agronomia/AgronomiaLayout'));
const AgronomiaResumen = lazy(() => import('@/pages/agronomia/Resumen'));
const AgronomiaLotes = lazy(() => import('@/pages/agronomia/Lotes'));
const AgronomiaLabores = lazy(() => import('@/pages/agronomia/Labores'));
const AgronomiaCultivos = lazy(() => import('@/pages/agronomia/Cultivos'));
const AgronomiaEnfermedades = lazy(() => import('@/pages/agronomia/Enfermedades'));

// Componente de carga
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4D3E]"></div>
    </div>
  );
}

// Placeholder para submódulos en desarrollo
function SubmodulePlaceholder({ nombre }: { nombre: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-[#2D3436] rounded-2xl border border-[#E5E5E5] dark:border-[#404040]">
      <p className="text-lg font-medium text-[#2D3436] dark:text-white">{nombre}</p>
      <p className="text-[#636E72] dark:text-[#B2BEC3] mt-2">En desarrollo</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Redirección por defecto a Agronomía */}
          <Route path="/" element={<Navigate to="agronomia" replace />} />

          {/* Rutas de Agronomía con layout compartido (tabs) */}
          <Route path="agronomia" element={<AgronomiaLayout />}>
            <Route index element={<AgronomiaResumen />} />
            <Route path="lotes" element={<AgronomiaLotes />} />
            <Route path="labores" element={<AgronomiaLabores />} />
            <Route path="cultivos" element={<AgronomiaCultivos />} />
            <Route path="enfermedades" element={<AgronomiaEnfermedades />} />
            <Route path="planificador" element={<SubmodulePlaceholder nombre="Planificador de Siembras" />} />
          </Route>

          {/* Rutas de Agronomía - submódulos del sidebar (sin tabs) */}
          <Route path="agronomia/dosis" element={<SubmodulePlaceholder nombre="Calculadora de Dosis" />} />
          <Route path="agronomia/clima" element={<SubmodulePlaceholder nombre="Clima" />} />
          <Route path="agronomia/riego" element={<SubmodulePlaceholder nombre="Plan de Riego" />} />

          {/* Placeholders para otros módulos */}
          <Route path="ganaderia" element={<div className="p-8 text-center">Módulo Ganadería - En desarrollo</div>} />
          <Route path="logistica" element={<div className="p-8 text-center">Módulo Logística - En desarrollo</div>} />
          <Route path="finanzas" element={<div className="p-8 text-center">Módulo Finanzas - En desarrollo</div>} />
          <Route path="maquinaria" element={<div className="p-8 text-center">Módulo Maquinaria - En desarrollo</div>} />
          <Route path="sostenibilidad" element={<div className="p-8 text-center">Módulo Sostenibilidad - En desarrollo</div>} />
          <Route path="calendario" element={<div className="p-8 text-center">Calendario - En desarrollo</div>} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="agronomia" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}