import React from 'react';
import { 
  Plus, 
  Sprout, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Droplets,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '@/components/agronomia/MetricCard';
import { DistribucionChart } from '@/components/charts/DistribucionChart';
import { cn } from '@/lib/utils';
import type { Cultivo } from '@/types';

const mockCultivos: Cultivo[] = [
  {
    id: '1',
    nombre: 'Maíz',
    variedad: 'Semill semilla',
    loteId: '1',
    loteNombre: 'LOTE 4 (Maíz)',
    hectareas: 120,
    fechaSiembra: '2020-09-03',
    estadoFenologico: 'V6 - Vegetativo',
    progreso: 40,
    densidad: 300,
    semilla: 'Semill semilla',
    genetica: 'DK-7210',
    inversion: 30000,
    costoActual: 260,
    rendimientoEstimado: 8.5,
    precioEstimado: 180,
    margenEstimado: 1200,
    ndvi: 0.85,
    aguaUtil: 60,
    estadoSanitario: 'SALUDABLE',
    ultimaVisita: 'Hace 2 días',
    proximaAccion: 'Fertilización',
  },
  {
    id: '2',
    nombre: 'Soja',
    variedad: 'Semill semilla',
    loteId: '2',
    loteNombre: 'LOTE 5 (Soja)',
    hectareas: 85,
    fechaSiembra: '2020-06-01',
    estadoFenologico: 'V6 - Vegetativo',
    progreso: 60,
    densidad: 200,
    semilla: 'Semill semilla',
    genetica: 'SY 5x1',
    inversion: 25000,
    costoActual: 200,
    rendimientoEstimado: 3.2,
    precioEstimado: 320,
    margenEstimado: 800,
    ndvi: 0.72,
    aguaUtil: 45,
    estadoSanitario: 'VIGILANCIA',
    ultimaVisita: 'Hace 5 días',
    proximaAccion: 'Monitoreo',
  },
];

const distribucionData = [
  { name: 'Maíz', value: 120, color: '#27AE60' },
  { name: 'Soja', value: 85, color: '#3498DB' },
  { name: 'Sorgo', value: 30, color: '#F39C12' },
];

function CultivoCard({ cultivo }: { cultivo: Cultivo }) {
  const estadoColors = {
    SALUDABLE: 'border-l-[#27AE60]',
    VIGILANCIA: 'border-l-[#F39C12]',
    TRATAMIENTO: 'border-l-[#E74C3C]',
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#2D3436] rounded-2xl p-5 border border-[#E5E5E5] dark:border-[#404040] border-l-4",
      estadoColors[cultivo.estadoSanitario || 'SALUDABLE']
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#2D3436] dark:text-white">{cultivo.loteNombre}</h3>
            <Badge variant="outline" className="text-xs">
              {cultivo.hectareas} Has | Activo
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-xs mt-1">
            <Plus className="w-3 h-3 mr-1" /> Nueva Tarea
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Siembra */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#95A5A6]">
            <Sprout className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Siembra</span>
          </div>
          <p className="text-sm text-[#2D3436] dark:text-white">
            {new Date(cultivo.fechaSiembra).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="text-xs text-[#636E72] space-y-1">
            <p>Semilla: {cultivo.semilla}</p>
            <p>Densidad: {cultivo.densidad} kpa</p>
            <p className="text-[#E74C3C]">Inversión: ${cultivo.inversion?.toLocaleString()}</p>
          </div>
        </div>

        {/* Proceso */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#95A5A6]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Proceso</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={cultivo.progreso} className="flex-1 h-2" />
            <span className="text-xs font-medium">{cultivo.progreso}%</span>
          </div>
          <p className="text-xs text-[#2D3436] dark:text-white">{cultivo.estadoFenologico}</p>
          <div className="flex items-center gap-2 text-xs text-[#636E72]">
            <Droplets className="w-3 h-3 text-[#3498DB]" />
            <span>Agua acumulada: 140 mm</span>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-xs bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/20">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Ult: {cultivo.proximaAccion}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Próx: Monitoreo
            </Badge>
          </div>
        </div>

        {/* Cosecha */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#95A5A6]">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Cosecha</span>
          </div>
          <p className="text-sm text-[#636E72]">Soja | Est. 06/10/2021</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#27AE60]">Rinde (IA):</span>
            <span className="text-lg font-bold text-[#27AE60]">{cultivo.rendimientoEstimado} Tn/Ha</span>
            <TrendingUp className="w-4 h-4 text-[#27AE60]" />
          </div>
          <p className="text-xs text-[#636E72]">Destino: Por definir</p>
        </div>
      </div>
    </div>
  );
}

export default function AgronomiaCultivos() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2D3436] dark:text-white">Agronomía</h1>
          <p className="text-[#636E72] dark:text-[#B2BEC3]">Campo Digital</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#1B4D3E] text-[#1B4D3E]">
            Plan de Siembra
          </Button>
          <Button className="bg-[#27AE60] hover:bg-[#229954]">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cosecha
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="cultivos" className="w-full">
        <TabsList className="bg-white dark:bg-[#2D3436] border border-[#E5E5E5] dark:border-[#404040]">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="lotes">Lotes</TabsTrigger>
          <TabsTrigger value="labores">Labores</TabsTrigger>
          <TabsTrigger value="cultivos">Cultivos</TabsTrigger>
          <TabsTrigger value="enfermedades">Detección Enfermedades</TabsTrigger>
          <TabsTrigger value="planificador">Planificador de Siembras</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Superficie Sembrada" value="235 Ha" icon={<Sprout className="w-5 h-5" />} color="green" />
        <MetricCard title="Cosecha Total" value="2.300 Tn" icon={<TrendingUp className="w-5 h-5" />} color="blue" />
        <MetricCard title="Próxima Cosecha" value="Lote 5" icon={<Calendar className="w-5 h-5" />} color="yellow" />
        <MetricCard title="Lotes Listos" value="3" icon={<CheckCircle2 className="w-5 h-5" />} color="green" />
        <MetricCard title="Lotes Vacíos" value="5" icon={<Sprout className="w-5 h-5" />} color="gray" />
      </div>

      {/* Sub-tabs */}
      <Tabs defaultValue="estados" className="w-full">
        <TabsList className="bg-transparent border-0 p-0">
          <TabsTrigger value="estados" className="data-[state=active]:bg-[#1B4D3E] data-[state=active]:text-white">
            Estados
          </TabsTrigger>
          <TabsTrigger value="planificador" className="data-[state=active]:bg-[#1B4D3E] data-[state=active]:text-white">
            Planificador de Siembra
          </TabsTrigger>
          <TabsTrigger value="suelo" className="data-[state=active]:bg-[#1B4D3E] data-[state=active]:text-white">
            Análisis de Suelo
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de cultivos */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white">Estados de los Cultivos</h3>
          {mockCultivos.map(cultivo => (
            <CultivoCard key={cultivo.id} cultivo={cultivo} />
          ))}
        </div>

        {/* Distribución */}
        <DistribucionChart 
          data={distribucionData} 
          total={235} 
          unit="Ha" 
          height={250}
        />
      </div>
    </div>
  );
}