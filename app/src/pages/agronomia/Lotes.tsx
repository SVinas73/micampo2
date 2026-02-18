import { useState } from 'react';
import { 
  Map, 
  List, 
  Plus, 
  Search, 
  Filter,
  Sprout,
  TrendingUp,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LotesTable } from '@/components/agronomia/LotesTable';
import { MetricCard } from '@/components/agronomia/MetricCard';
import type { Lote } from '@/types';

const mockLotes: Lote[] = [
  {
    id: '1',
    nombre: 'Lote 4 - El Bajo',
    campo: 'ESTANCIA LA SOÑADA',
    campoId: '1',
    hectareas: 125,
    cultivo: 'Maíz Tardío',
    variedad: 'DK-7210',
    estado: 'DESARROLLO',
    estadoFenologico: 'V6 - Vegetativo',
    ndvi: 0.85,
    aguaUtil: 60,
    costoPorHectarea: 260,
    inversionTotal: 400,
    margenBruto: 140,
    rendimientoEst: 9.5,
    fechaCosechaEst: '15/Mar',
    ultimoRiego: 'Hace 2 días',
    plagasDetectadas: 0,
    alertasActivas: 0,
  },
  {
    id: '2',
    nombre: 'Lote 7 - La Loma',
    campo: 'ESTANCIA EL REFUGIO',
    campoId: '2',
    hectareas: 90,
    cultivo: 'Soja de Primera',
    variedad: 'DM-40R',
    estado: 'DESARROLLO',
    estadoFenologico: 'R3 - Form. Vainas',
    ndvi: 0.72,
    aguaUtil: 45,
    costoPorHectarea: 200,
    inversionTotal: 235,
    margenBruto: 35,
    rendimientoEst: 3.2,
    fechaCosechaEst: '20/Abr',
    ultimoRiego: 'Hace 5 días',
    plagasDetectadas: 2,
    alertasActivas: 1,
  },
  {
    id: '3',
    nombre: 'Lote 2 - El Canal',
    campo: 'ESTANCIA LOS MOLINOS',
    campoId: '3',
    hectareas: 180,
    cultivo: 'Trigo Ciclo Largo',
    variedad: 'BIO-INTA 300',
    estado: 'DESARROLLO',
    estadoFenologico: 'Z31 - Primer Nudo',
    ndvi: 0.91,
    aguaUtil: 75,
    costoPorHectarea: 150,
    inversionTotal: 380,
    margenBruto: 230,
    rendimientoEst: 5.1,
    fechaCosechaEst: '10/Dic',
    ultimoRiego: 'Ayer',
    plagasDetectadas: 0,
    alertasActivas: 0,
  },
  {
    id: '4',
    nombre: 'Lote 5 - El Refugio',
    campo: 'ESTANCIA EL REFUGIO',
    campoId: '2',
    hectareas: 95,
    cultivo: 'Soja de Primera',
    variedad: 'SY 5x1',
    estado: 'DESARROLLO',
    estadoFenologico: 'R3 - Form. Vainas',
    ndvi: 0.68,
    aguaUtil: 40,
    costoPorHectarea: 210,
    inversionTotal: 240,
    margenBruto: 30,
    rendimientoEst: 3.3,
    fechaCosechaEst: '22/Abr',
    ultimoRiego: 'Hace 3 días',
    plagasDetectadas: 1,
    alertasActivas: 1,
  },
];

// Componente de Mapa Simulado
function MapaLotes() {
  return (
    <div className="relative w-full h-[600px] bg-[#E8F5E9] dark:bg-[#1a2f1a] rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-[#404040]">
      {/* Simulación de mapa satelital */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <rect width="800" height="600" fill="#C8E6C9" />
          <polygon points="50,50 250,50 250,200 50,200" fill="#4CAF50" opacity="0.8" stroke="#2E7D32" strokeWidth="2" />
          <polygon points="300,50 500,50 500,200 300,200" fill="#66BB6A" opacity="0.8" stroke="#2E7D32" strokeWidth="2" />
          <polygon points="550,50 750,50 750,250 550,250" fill="#43A047" opacity="0.8" stroke="#2E7D32" strokeWidth="2" />
          <polygon points="50,250 300,250 300,450 50,450" fill="#81C784" opacity="0.8" stroke="#2E7D32" strokeWidth="2" />
          <polygon points="350,250 550,250 550,400 350,400" fill="#A5D6A7" opacity="0.8" stroke="#2E7D32" strokeWidth="2" />
          <line x1="275" y1="0" x2="275" y2="600" stroke="#8D6E63" strokeWidth="8" />
          <line x1="525" y1="0" x2="525" y2="600" stroke="#8D6E63" strokeWidth="8" />
          <line x1="0" y1="225" x2="800" y2="225" stroke="#8D6E63" strokeWidth="8" />
          <line x1="0" y1="425" x2="800" y2="425" stroke="#8D6E63" strokeWidth="8" />
        </svg>
      </div>

      {/* Controles del mapa */}
      <div className="absolute top-4 left-4 bg-white dark:bg-[#2D3436] rounded-xl shadow-lg p-2">
        <Button variant="ghost" size="icon" className="block mb-1">+</Button>
        <Button variant="ghost" size="icon" className="block">-</Button>
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-[#2D3436] rounded-xl shadow-lg p-4">
        <h4 className="font-semibold text-sm mb-2">Modo de Visualización</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4CAF50] rounded" />
            <span>NDVI Alto (0.8+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F39C12] rounded" />
            <span>NDVI Medio (0.6-0.8)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E74C3C] rounded" />
            <span>NDVI Bajo (&lt;0.6)</span>
          </div>
        </div>
      </div>

      {/* Ficha técnica flotante */}
      <div className="absolute top-4 right-4 w-80 bg-white dark:bg-[#2D3436] rounded-2xl shadow-xl border border-[#E5E5E5] dark:border-[#404040] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Ficha Técnica del Lote</h3>
          <Badge className="bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20">
            Saludable
          </Badge>
        </div>

        <div className="mb-4">
          <p className="text-xs text-[#95A5A6] uppercase tracking-wide">LOTE 4 - LA LOMA</p>
          <p className="text-sm text-[#636E72]">125.4 Has | Maíz Tardío</p>
          <Badge variant="outline" className="mt-1">Propio</Badge>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="default" size="sm" className="flex-1 bg-[#1B4D3E]">Resumen</Button>
          <Button variant="ghost" size="sm" className="flex-1">Historial</Button>
          <Button variant="ghost" size="sm" className="flex-1">Suelo</Button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-[#F8F9FA] dark:bg-[#404040] rounded-lg">
            <p className="text-xs text-[#95A5A6]">NDVI</p>
            <p className="font-bold text-[#27AE60]">0.75 ↗</p>
          </div>
          <div className="text-center p-2 bg-[#F8F9FA] dark:bg-[#404040] rounded-lg">
            <p className="text-xs text-[#95A5A6]">Agua Útil</p>
            <p className="font-bold text-[#3498DB]">60% ↓</p>
          </div>
          <div className="text-center p-2 bg-[#F8F9FA] dark:bg-[#404040] rounded-lg">
            <p className="text-xs text-[#95A5A6]">Estado</p>
            <p className="font-bold text-[#27AE60]">V6 (Veg)</p>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] dark:border-[#404040] pt-4">
          <p className="text-xs text-[#95A5A6] mb-2">Clima Local (7 días)</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold">45mm</span>
            <span className="text-xs text-[#95A5A6]">Acumulados</span>
          </div>
          <div className="flex justify-between text-xs">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, i) => (
              <div key={dia} className="text-center">
                <div className="w-6 bg-[#3498DB] rounded-sm mx-auto mb-1" style={{
                  height: `${[20, 35, 45, 15, 25, 10, 5][i]}px`,
                  opacity: 0.3 + (i * 0.1)
                }} />
                <span className="text-[#95A5A6]">{dia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#F39C12]/10 border border-[#F39C12]/20 rounded-lg">
          <p className="text-xs text-[#F39C12] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            Oruga Bolillera detectada (Hace 2 días)
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AgronomiaLotes() {
  const [vista, setVista] = useState<'mapa' | 'lista'>('mapa');
  const [busqueda, setBusqueda] = useState('');

  const lotesFiltrados = mockLotes.filter(lote =>
    lote.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    lote.cultivo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2D3436] dark:text-white">Agronomía</h1>
          <p className="text-[#636E72] dark:text-[#B2BEC3]">Campo Digital</p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-[#27AE60] hover:bg-[#229954]">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Campo
          </Button>
          <Button variant="outline" className="border-[#E74C3C] text-[#E74C3C] hover:bg-[#E74C3C]/10">
            Eliminar Campo
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="lotes" className="w-full">
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
        <MetricCard title="Total de Campos" value="2" icon={<MapPin className="w-5 h-5" />} />
        <MetricCard title="Total de Lotes" value="120" icon={<Sprout className="w-5 h-5" />} color="green" />
        <MetricCard title="Hectáreas Totales" value="10.521 Ha" icon={<TrendingUp className="w-5 h-5" />} />
        <MetricCard title="Lotes sin Asignar" value="0" icon={<AlertTriangle className="w-5 h-5" />} color="gray" />
        <MetricCard title="Marcadores" value="1" icon={<MapPin className="w-5 h-5" />} color="blue" />
      </div>

      {/* Controles de vista */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 bg-white dark:bg-[#2D3436] p-1 rounded-xl border border-[#E5E5E5] dark:border-[#404040]">
          <Button
            variant={vista === 'mapa' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setVista('mapa')}
            className={vista === 'mapa' ? 'bg-[#1B4D3E]' : ''}
          >
            <Map className="w-4 h-4 mr-2" />
            Vista Mapa
          </Button>
          <Button
            variant={vista === 'lista' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setVista('lista')}
            className={vista === 'lista' ? 'bg-[#1B4D3E]' : ''}
          >
            <List className="w-4 h-4 mr-2" />
            Vista Lista
          </Button>
        </div>

        <div className="flex-1 flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#95A5A6]" />
            <Input
              placeholder="Buscar lotes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Contenido según vista */}
      {vista === 'mapa' ? (
        <MapaLotes />
      ) : (
        <LotesTable lotes={lotesFiltrados} />
      )}
    </div>
  );
}