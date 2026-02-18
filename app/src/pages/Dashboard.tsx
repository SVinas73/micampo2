import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Lazy load de páginas de Agronomía
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

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Redirección por defecto a Agronomía */}
          <Route path="/" element={<Navigate to="/dashboard/agronomia" replace />} />
          
          {/* Rutas de Agronomía */}
          <Route path="/agronomia" element={<AgronomiaResumen />} />
          <Route path="/agronomia/lotes" element={<AgronomiaLotes />} />
          <Route path="/agronomia/labores" element={<AgronomiaLabores />} />
          <Route path="/agronomia/cultivos" element={<AgronomiaCultivos />} />
          <Route path="/agronomia/enfermedades" element={<AgronomiaEnfermedades />} />
          
          {/* Placeholders para otros módulos */}
          <Route path="/ganaderia" element={<div className="p-8 text-center">Módulo Ganadería - En desarrollo</div>} />
          <Route path="/logistica" element={<div className="p-8 text-center">Módulo Logística - En desarrollo</div>} />
          <Route path="/finanzas" element={<div className="p-8 text-center">Módulo Finanzas - En desarrollo</div>} />
          <Route path="/maquinaria" element={<div className="p-8 text-center">Módulo Maquinaria - En desarrollo</div>} />
          <Route path="/sostenibilidad" element={<div className="p-8 text-center">Módulo Sostenibilidad - En desarrollo</div>} />
          <Route path="/calendario" element={<div className="p-8 text-center">Calendario - En desarrollo</div>} />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard/agronomia" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}