import { useState } from 'react'; 
import { 
  Upload, 
  Bug, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  MapPin,
  Microscope,
  Droplets,
  Wind,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '@/components/agronomia/MetricCard';
import { cn } from '@/lib/utils';
import type { PlagaDeteccion } from '@/types';

const mockDetecciones: PlagaDeteccion[] = [
  {
    id: '1',
    loteId: '1',
    loteNombre: 'Lote 4 (Maíz)',
    tipo: 'Roya Común',
    nombreCientifico: 'Puccinia sorghi',
    confianzaIA: 0.98,
    severidad: 'ALTA',
    hectareasAfectadas: 15,
    fechaDeteccion: '2024-02-18',
    imagenUrl: '/placeholder-plaga.jpg',
    estado: 'ACTIVA',
    tratamientoSugerido: 'Aplicar Fungicida (Triazol)',
    productoSugerido: 'Fungicida Triazol + Estrob.',
    dosis: '400 cc/Ha',
    costoEstimado: 28,
  },
  {
    id: '2',
    loteId: '2',
    loteNombre: 'Lote 2 (Maíz)',
    tipo: 'Oruga Cogollera',
    nombreCientifico: 'Spodoptera frugiperda',
    confianzaIA: 0.85,
    severidad: 'MEDIA',
    hectareasAfectadas: 8,
    fechaDeteccion: '2024-02-17',
    estado: 'ACTIVA',
    tratamientoSugerido: 'Monitoreo + Insecticida',
    costoEstimado: 15,
  },
  {
    id: '3',
    loteId: '3',
    loteNombre: 'Lote 7 (Soja)',
    tipo: 'Mancha Marrón',
    nombreCientifico: 'Septoria glycines',
    confianzaIA: 0.72,
    severidad: 'BAJA',
    hectareasAfectadas: 20,
    fechaDeteccion: '2024-02-18',
    estado: 'ACTIVA',
    tratamientoSugerido: 'Monitoreo Intensivo',
    costoEstimado: 8,
  },
  {
    id: '4',
    loteId: '4',
    loteNombre: 'Lote 1 (Trigo)',
    tipo: 'Pulgón Verde',
    nombreCientifico: 'Schizaphis graminum',
    confianzaIA: 0.88,
    severidad: 'ALTA',
    hectareasAfectadas: 30,
    fechaDeteccion: '2024-02-17',
    estado: 'ACTIVA',
    tratamientoSugerido: 'Aplicar Insecticida Sistémico',
    costoEstimado: 22,
  },
  {
    id: '5',
    loteId: '5',
    loteNombre: 'Lote 5 (Girasol)',
    tipo: 'Escarabajo',
    nombreCientifico: 'Diabrotica speciosa',
    confianzaIA: 0.65,
    severidad: 'MEDIA',
    hectareasAfectadas: 12,
    fechaDeteccion: '2024-02-16',
    estado: 'ACTIVA',
    tratamientoSugerido: 'Evaluar Daño y Cosecha Anticipada',
    costoEstimado: 18,
  },
];

const severidadConfig: Record<string, { color: string; textColor: string; bgLight: string; border: string }> = {
  CRITICA: { color: 'bg-[#8E44AD]', textColor: 'text-[#8E44AD]', bgLight: 'bg-[#8E44AD]/10', border: 'border-[#8E44AD]/20' },
  ALTA: { color: 'bg-[#E74C3C]', textColor: 'text-[#E74C3C]', bgLight: 'bg-[#E74C3C]/10', border: 'border-[#E74C3C]/20' },
  MEDIA: { color: 'bg-[#F39C12]', textColor: 'text-[#F39C12]', bgLight: 'bg-[#F39C12]/10', border: 'border-[#F39C12]/20' },
  BAJA: { color: 'bg-[#3498DB]', textColor: 'text-[#3498DB]', bgLight: 'bg-[#3498DB]/10', border: 'border-[#3498DB]/20' },
};

function DetalleAnalisisIA() {
  return (
    <div className="bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white flex items-center gap-2">
          <Microscope className="w-5 h-5 text-[#1B4D3E]" />
          Resultados del Análisis
        </h3>
        <Badge className="bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20">
          <Sparkles className="w-3 h-3 mr-1" />
          IA Activa
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Imagen con detección */}
        <div className="relative">
          <div className="aspect-square bg-[#F5F2ED] dark:bg-[#404040] rounded-xl overflow-hidden relative">
            <img 
              src="/api/placeholder/400/400" 
              alt="Detección de plaga" 
              className="w-full h-full object-cover"
            />
            {/* Cajas de detección simuladas */}
            <div className="absolute top-[20%] left-[30%] w-16 h-20 border-2 border-[#E74C3C] rounded bg-[#E74C3C]/20" />
            <div className="absolute top-[40%] left-[50%] w-14 h-16 border-2 border-[#E74C3C] rounded bg-[#E74C3C]/20" />
            <div className="absolute top-[60%] left-[25%] w-12 h-14 border-2 border-[#E74C3C] rounded bg-[#E74C3C]/20" />
            <div className="absolute top-[35%] left-[65%] w-18 h-22 border-2 border-[#E74C3C] rounded bg-[#E74C3C]/20" />
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1">
              Cajas
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Mapa de Calor
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Alto Contraste
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="text-center p-6 bg-[#F8F9FA] dark:bg-[#404040] rounded-xl">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E5E5"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#27AE60"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${0.96 * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2D3436] dark:text-white">96%</span>
                <span className="text-xs text-[#95A5A6]">Confianza Global</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-[#2D3436] dark:text-white mb-1">
              Roya Común (Puccinia sorghi)
            </h4>
            <Badge className="bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/20">
              Severidad Media
            </Badge>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#636E72]">Lesión A (Foco Principal)</span>
                <span className="font-medium text-[#27AE60]">98%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#636E72]">Lesión B (Esporulación)</span>
                <span className="font-medium text-[#27AE60]">92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#636E72]">Lesión C (Inicial)</span>
                <span className="font-medium text-[#F39C12]">85%</span>
              </div>
            </div>

            <Button variant="link" className="text-[#1B4D3E] p-0 mt-2">
              Ver 5 detecciones más...
            </Button>
          </div>
        </div>
      </div>

      {/* Recomendación */}
      <div className="mt-6 p-4 bg-[#F8F9FA] dark:bg-[#404040] rounded-xl">
        <h4 className="font-semibold text-sm text-[#95A5A6] uppercase tracking-wide mb-3">
          Recomendación
        </h4>
        <div className="bg-white dark:bg-[#2D3436] rounded-xl p-4 border border-[#E5E5E5] dark:border-[#404040]">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Microscope className="w-6 h-6 text-[#1B4D3E]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#95A5A6] mb-1">Estrategia de Control Sugerida</p>
              <h5 className="font-semibold text-[#2D3436] dark:text-white">
                Fungicida (Triazol + Estrob.)
              </h5>
              <p className="text-xs text-[#636E72] mt-1">
                Tratamiento Prioritario para Roya
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#E5E5E5] dark:border-[#404040]">
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1 text-[#3498DB]" />
              <p className="text-lg font-bold text-[#2D3436] dark:text-white">400 cc/Ha</p>
              <p className="text-xs text-[#95A5A6]">Dosis</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto mb-1 text-[#F39C12]" />
              <p className="text-lg font-bold text-[#2D3436] dark:text-white">Prox. 4hs</p>
              <p className="text-xs text-[#95A5A6]">Venta Óptima</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-[#27AE60]" />
              <p className="text-lg font-bold text-[#2D3436] dark:text-white">$28/Ha</p>
              <p className="text-xs text-[#95A5A6]">Costo Estimado</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#1B4D3E]/5 rounded-lg">
            <p className="text-xs text-[#636E72]">
              <span className="font-semibold">Análisis IA:</span> Eficacia contra la roya en ensayos de campo. 
              La combinación Triazol + Estrobilurina ofrece protección preventiva, curativa y antiesporulante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgronomiaEnfermedades() {
  const [deteccionSeleccionada, setDeteccionSeleccionada] = useState<PlagaDeteccion | null>(null);

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
            <Upload className="w-4 h-4 mr-2" />
            Cargar Imagen de Lote
          </Button>
          <Button className="bg-[#E67E22] hover:bg-[#D35400]">
            <Bug className="w-4 h-4 mr-2" />
            Reportar Plaga
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="enfermedades" className="w-full">
        <TabsList className="bg-white dark:bg-[#2D3436] border border-[#E5E5E5] dark:border-[#404040]">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="lotes">Lotes</TabsTrigger>
          <TabsTrigger value="labores">Labores</TabsTrigger>
          <TabsTrigger value="cultivos">Cultivos</TabsTrigger>
          <TabsTrigger value="enfermedades">
            Detección Enfermedades
            <span className="ml-1 w-2 h-2 bg-[#E74C3C] rounded-full inline-block" />
          </TabsTrigger>
          <TabsTrigger value="planificador">Planificador de Siembras</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard 
          title="Alertas Activas" 
          value="5" 
          icon={<AlertTriangle className="w-5 h-5" />} 
          color="red"
          trend="up"
          trendValue="+2 nuevas"
        />
        <MetricCard 
          title="Confianza IA" 
          value="96%" 
          icon={<Sparkles className="w-5 h-5" />} 
          color="green"
        />
        <MetricCard 
          title="Vigor Promedio (NDVI)" 
          value="0.78 (Alto)" 
          icon={<TrendingUp className="w-5 h-5" />} 
          color="green"
        />
        <MetricCard 
          title="Riesgo Económico" 
          value="$1.250" 
          icon={<DollarSign className="w-5 h-5" />} 
          color="red"
        />
        <MetricCard 
          title="Monitoreo Semanal" 
          value="85%" 
          icon={<CheckCircle2 className="w-5 h-5" />} 
          color="blue"
        />
      </div>

      {/* Sub-tabs */}
      <Tabs defaultValue="informacion" className="w-full">
        <TabsList className="bg-transparent border-0 p-0">
          <TabsTrigger value="informacion" className="data-[state=active]:bg-[#1B4D3E] data-[state=active]:text-white">
            Información
          </TabsTrigger>
          <TabsTrigger value="analisis" className="data-[state=active]:bg-[#1B4D3E] data-[state=active]:text-white">
            Análisis IA
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de Alertas */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white">Alertas Activas</h3>
          
          {mockDetecciones.map((deteccion) => {
            const config = severidadConfig[deteccion.severidad];
            return (
              <div 
                key={deteccion.id}
                onClick={() => setDeteccionSeleccionada(deteccion)}
                className={cn(
                  "bg-white dark:bg-[#2D3436] rounded-2xl p-5 border-2 cursor-pointer transition-all hover:shadow-lg",
                  deteccionSeleccionada?.id === deteccion.id 
                    ? "border-[#1B4D3E] ring-2 ring-[#1B4D3E]/20" 
                    : "border-[#E5E5E5] dark:border-[#404040]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    config.bgLight
                  )}>
                    <Bug className={cn("w-6 h-6", config.textColor)} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#2D3436] dark:text-white">
                        {deteccion.loteNombre}
                      </h4>
                      <Badge className={cn("text-xs text-white", config.color)}>
                        {deteccion.severidad} ({Math.round(deteccion.confianzaIA * 100)}%)
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">
                      {deteccion.tipo} • {deteccion.nombreCientifico}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#95A5A6]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {deteccion.hectareasAfectadas} Ha afectadas
                      </span>
                      <span>Hace {Math.floor(Math.random() * 5) + 1}h</span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 p-2 bg-[#F8F9FA] dark:bg-[#404040] rounded-lg">
                      <DollarSign className="w-4 h-4 text-[#E74C3C]" />
                      <span className="text-sm">
                        <span className="text-[#95A5A6]">Riesgo Pérdida:</span>{' '}
                        <span className="font-semibold text-[#E74C3C]">
                          ${(deteccion.costoEstimado || 0) * deteccion.hectareasAfectadas * 10},000 USD
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Rec: {deteccion.tratamientoSugerido?.split(' ').slice(0, 2).join(' ')}
                    </Button>
                    <Button size="sm" className="bg-[#1B4D3E] text-xs">
                      Agregar a Labores
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          {/* Estrategia de Control */}
          <div className="bg-white dark:bg-[#2D3436] rounded-2xl p-5 border border-[#E5E5E5] dark:border-[#404040]">
            <h4 className="font-semibold text-[#2D3436] dark:text-white mb-4">
              Estrategia de Control Sugerida
            </h4>
            
            <div className="p-4 bg-[#F8F9FA] dark:bg-[#404040] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1B4D3E]/10 rounded-lg flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-[#1B4D3E]" />
                </div>
                <div>
                  <p className="text-xs text-[#95A5A6]">Estrategia de Control Sugerida</p>
                  <p className="font-semibold text-sm">Fungicida (Triazol + Estrob.)</p>
                </div>
              </div>
              
              <p className="text-xs text-[#636E72] mb-3">
                Tratamiento Prioritario para Roya
              </p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <Droplets className="w-4 h-4 mx-auto mb-1 text-[#3498DB]" />
                  <p className="text-sm font-semibold">400 cc/Ha</p>
                  <p className="text-xs text-[#95A5A6]">Dosis</p>
                </div>
                <div>
                  <Wind className="w-4 h-4 mx-auto mb-1 text-[#F39C12]" />
                  <p className="text-sm font-semibold">Prox. 4hs</p>
                  <p className="text-xs text-[#95A5A6]">Venta Óptima</p>
                </div>
                <div>
                  <DollarSign className="w-4 h-4 mx-auto mb-1 text-[#27AE60]" />
                  <p className="text-sm font-semibold">$28/Ha</p>
                  <p className="text-xs text-[#95A5A6]">Costo Estimado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Probabilidades */}
          <div className="bg-white dark:bg-[#2D3436] rounded-2xl p-5 border border-[#E5E5E5] dark:border-[#404040]">
            <h4 className="font-semibold text-[#2D3436] dark:text-white mb-4">
              Probabilidades
            </h4>
            
            <div className="space-y-3">
              {[
                { nombre: 'Roya Común (Puccinia sorghi)', prob: 88, tendencia: 'Alta', lotes: 'Lote 4, Lote 7' },
                { nombre: 'Tizón del Maíz (Exserohilum turcicum)', prob: 42, tendencia: 'Estable', lotes: 'Lote 2' },
                { nombre: 'Cercospora (Mancha Gris)', prob: 15, tendencia: 'Bajando', lotes: 'Lote 5 (Sector Norte)' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#2D3436] dark:text-white font-medium">
                      {i + 1}. {item.nombre}
                    </span>
                    <span className="font-bold">{item.prob}%</span>
                  </div>
                  <Progress value={item.prob} className="h-2" />
                  <div className="flex items-center gap-2 text-xs text-[#95A5A6]">
                    <TrendingUp className={cn(
                      "w-3 h-3",
                      item.tendencia === 'Alta' ? 'text-[#E74C3C]' : 
                      item.tendencia === 'Bajando' ? 'text-[#27AE60]' : 'text-[#F39C12]'
                    )} />
                    <span>Tendencia: {item.tendencia}</span>
                    <MapPin className="w-3 h-3 ml-2" />
                    <span>Lotes Afectados: {item.lotes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Análisis IA Detallado */}
      {deteccionSeleccionada && (
        <DetalleAnalisisIA />
      )}
    </div>
  );
}