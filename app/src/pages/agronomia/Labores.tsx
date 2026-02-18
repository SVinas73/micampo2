import React, { useState } from 'react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Wind,
  Droplets,
  Tractor,
  Sprout,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/agronomia/MetricCard';
import { cn } from '@/lib/utils';
import type { Labor } from '@/types';

const mockLabores: Labor[] = [
  {
    id: '1',
    titulo: 'Pulverización',
    tipo: 'FUMIGACION',
    estado: 'EN_PROGRESO',
    loteNombre: 'Lote 2 - Norte',
    fechaProgramada: '2024-02-18',
    operario: 'Juan Pérez',
    maquinaria: 'Pulverizadora Metalfor',
    icono: '💨',
    color: '#3498DB',
  },
  {
    id: '2',
    titulo: 'Siembra Maíz',
    tipo: 'SIEMBRA',
    estado: 'PENDIENTE',
    loteNombre: 'Lote 4 - El Bajo',
    fechaProgramada: '2024-02-18',
    operario: 'M. Gómez',
    maquinaria: 'John Deere 8R',
    icono: '🌱',
    color: '#27AE60',
  },
  {
    id: '3',
    titulo: 'Fertilización',
    tipo: 'FERTILIZACION',
    estado: 'PROGRAMADA',
    loteNombre: 'Lote 1 - Norte',
    fechaProgramada: '2024-02-19',
    operario: 'Carlos López',
    icono: '⚡',
    color: '#F39C12',
  },
];

const mockLaboresBloqueadas: Labor[] = [
  {
    id: '4',
    titulo: 'Pulverización',
    tipo: 'FUMIGACION',
    estado: 'BLOQUEADA',
    loteNombre: 'Lote 2 - Norte',
    fechaProgramada: '2024-02-18',
    observaciones: 'Viento: 32 km/h - Riesgo de Deriva',
    icono: '💨',
    color: '#3498DB',
  },
  {
    id: '5',
    titulo: 'Siembra Maíz',
    tipo: 'SIEMBRA',
    estado: 'BLOQUEADA',
    loteNombre: 'Lote 4 - El Bajo',
    fechaProgramada: '2024-02-18',
    observaciones: 'Sin Stock: Semilla - Faltan 20 bolsas',
    icono: '🌱',
    color: '#27AE60',
  },
  {
    id: '6',
    titulo: 'Cosecha Soja',
    tipo: 'COSECHA',
    estado: 'BLOQUEADA',
    loteNombre: 'Lote 7 - Sur',
    fechaProgramada: '2024-02-18',
    observaciones: 'Cosechadora Averiada - En taller mecánico',
    icono: '🌾',
    color: '#E67E22',
  },
];

const estadoConfig = {
  PROGRAMADA: { label: 'Programada', color: 'bg-[#95A5A6]', textColor: 'text-[#95A5A6]' },
  PENDIENTE: { label: 'Pendiente', color: 'bg-[#F39C12]', textColor: 'text-[#F39C12]' },
  EN_PROGRESO: { label: 'En Progreso', color: 'bg-[#3498DB]', textColor: 'text-[#3498DB]' },
  COMPLETADA: { label: 'Completada', color: 'bg-[#27AE60]', textColor: 'text-[#27AE60]' },
  BLOQUEADA: { label: 'Bloqueada', color: 'bg-[#E74C3C]', textColor: 'text-[#E74C3C]' },
};

function CalendarioSemanal() {
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const fechas = [17, 18, 19, 20, 21, 22, 23];
  const hoy = 18;

  return (
    <div className="bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white">Calendario</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
          <span className="text-sm font-medium">Febrero 2024</span>
          <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dias.map((dia, i) => (
          <div key={dia} className="text-center">
            <p className="text-xs text-[#95A5A6] mb-1">{dia}</p>
            <div className={cn(
              "w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium",
              fechas[i] === hoy 
                ? "bg-[#1B4D3E] text-white" 
                : "text-[#2D3436] dark:text-white hover:bg-[#F5F2ED] dark:hover:bg-[#404040]"
            )}>
              {fechas[i]}
            </div>
          </div>
        ))}
      </div>

      {/* Eventos del calendario */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 p-2 bg-[#27AE60]/10 rounded-lg">
          <div className="w-2 h-2 bg-[#27AE60] rounded-full" />
          <span className="text-sm flex-1">Siembra Maíz - Lote 4</span>
          <span className="text-xs text-[#95A5A6]">Todo el día</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#3498DB]/10 rounded-lg">
          <div className="w-2 h-2 bg-[#3498DB] rounded-full" />
          <span className="text-sm flex-1">Pulverización - Lote 2</span>
          <span className="text-xs text-[#95A5A6]">08:00 - 12:00</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#F39C12]/10 rounded-lg">
          <div className="w-2 h-2 bg-[#F39C12] rounded-full" />
          <span className="text-sm flex-1">Cosecha Soja</span>
          <span className="text-xs text-[#95A5A6]">14:00 - 18:00</span>
        </div>
      </div>
    </div>
  );
}

export default function AgronomiaLabores() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2D3436] dark:text-white">Agronomía</h1>
          <p className="text-[#636E72] dark:text-[#B2BEC3]">Campo Digital</p>
        </div>
        
        <Button className="bg-[#27AE60] hover:bg-[#229954]">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="labores" className="w-full">
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
        <MetricCard title="Programados" value="20" icon={<CalendarIcon className="w-5 h-5" />} color="blue" />
        <MetricCard title="Pendientes" value="15" icon={<Clock className="w-5 h-5" />} color="yellow" />
        <MetricCard 
          title="Atrasados" 
          value="5" 
          icon={<AlertTriangle className="w-5 h-5" />} 
          color="red"
          trend="up"
          trendValue="+2 desde ayer"
        />
        <MetricCard title="% Completadas" value="3%" icon={<CheckCircle2 className="w-5 h-5" />} color="green" />
        <MetricCard title="Completadas este Mes" value="32" icon={<CheckCircle2 className="w-5 h-5" />} color="gray" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tareas para Hoy */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white">Tareas para Hoy</h3>
          
          {mockLabores.map((labor) => {
            const estado = estadoConfig[labor.estado];
            return (
              <div 
                key={labor.id}
                className="bg-white dark:bg-[#2D3436] rounded-2xl p-4 border border-[#E5E5E5] dark:border-[#404040] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${labor.color}20` }}
                  >
                    {labor.icono}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#2D3436] dark:text-white">{labor.titulo}</h4>
                      <Badge className={cn("text-xs", estado.color.replace('bg-', 'bg-opacity-20 text-'))}>
                        {estado.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">{labor.loteNombre}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#95A5A6]">
                      {labor.operario && (
                        <span className="flex items-center gap-1">
                          👤 {labor.operario}
                        </span>
                      )}
                      {labor.maquinaria && (
                        <span className="flex items-center gap-1">
                          🚜 {labor.maquinaria}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Iniciar
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Pausar
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-[#27AE60] text-white hover:bg-[#229954]">
                        Finalizar
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Labores Bloqueadas */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white mb-4">
              Labores Bloqueadas / Alertas
            </h3>
            
            {mockLaboresBloqueadas.map((labor) => (
              <div 
                key={labor.id}
                className="bg-white dark:bg-[#2D3436] rounded-2xl p-4 border border-[#E74C3C]/20 dark:border-[#E74C3C]/30 mb-3"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${labor.color}20` }}
                  >
                    {labor.icono}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#2D3436] dark:text-white">{labor.titulo}</h4>
                      <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20">
                        Bloqueada
                      </Badge>
                    </div>
                    <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">{labor.loteNombre}</p>
                    
                    <div className="flex items-center gap-2 mt-2 p-2 bg-[#E74C3C]/5 rounded-lg">
                      {labor.observaciones?.includes('Viento') && <Wind className="w-4 h-4 text-[#E74C3C]" />}
                      {labor.observaciones?.includes('Stock') && <Droplets className="w-4 h-4 text-[#E74C3C]" />}
                      {labor.observaciones?.includes('Cosechadora') && <Tractor className="w-4 h-4 text-[#E74C3C]" />}
                      <span className="text-xs text-[#E74C3C]">{labor.observaciones}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="text-xs">
                    {labor.observaciones?.includes('Viento') ? 'Reprogramar' : 
                     labor.observaciones?.includes('Stock') ? 'Solicitar' : 'Ver Detalle'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario */}
        <CalendarioSemanal />
      </div>
    </div>
  );
}