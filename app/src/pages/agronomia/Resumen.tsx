import {
  Sprout,
  AlertTriangle,
  Calendar,
  ClipboardList,
  MapPin,
  TrendingUp,
  Droplets,
  Sun,
  Wind,
} from 'lucide-react';
import { MetricCard } from '@/components/agronomia/MetricCard';
import { PlantacionesChart } from '@/components/charts/PlantacionesChart';
import { AlertasPanel } from '@/components/agronomia/AlertasPanel';
import { ActividadesPanel } from '@/components/agronomia/ActividadesPanel';
import type { Alerta, Actividad } from '@/types';

// Datos de ejemplo
const mockAlertas: Alerta[] = [
  {
    id: '1',
    tipo: 'SANITARIA',
    severidad: 'ALTA',
    titulo: 'Alerta Sanitaria - Lote 1',
    descripcion: 'Posible Roya detectada por satélite en sector norte',
    loteNombre: 'Lote 1 - Norte',
    fecha: '2024-02-18',
    riesgoEconomico: 4500,
  },
  {
    id: '2',
    tipo: 'CLIMA',
    severidad: 'ALTA',
    titulo: 'Riesgo Climático - Lote 4',
    descripcion: 'Alerta de granizo para esta tarde',
    loteNombre: 'Lote 4 - Sur',
    fecha: '2024-02-18',
  },
  {
    id: '3',
    tipo: 'LOGISTICA',
    severidad: 'MEDIA',
    titulo: 'Atraso Siembra - Lote 3',
    descripcion: '2 días de retraso vs. planificado',
    loteNombre: 'Lote 3 - Este',
    fecha: '2024-02-17',
  },
  {
    id: '4',
    tipo: 'ECONOMICA',
    severidad: 'MEDIA',
    titulo: 'Stock Bajo - Fertilizante Urea',
    descripcion: 'Quedan menos de 500kg',
    fecha: '2024-02-17',
  },
  {
    id: '5',
    tipo: 'SANITARIA',
    severidad: 'BAJA',
    titulo: 'Sacar foto al terreno - Lote 2',
    descripcion: 'Para validar emergencia del cultivo',
    loteNombre: 'Lote 2 - Centro',
    fecha: '2024-02-16',
  },
];

const mockActividades: Actividad[] = [
  {
    id: '1',
    tipo: 'clima',
    titulo: 'Registro de lluvia',
    descripcion: 'Santiago registró 20mm de lluvia en Lote 2 🌧️',
    usuario: 'Santiago',
    fecha: 'Hoy',
    hora: '14:30',
  },
  {
    id: '2',
    tipo: 'labor',
    titulo: 'Siembra finalizada',
    descripcion: 'Joaquín finalizó Siembra en Lote 1 🚜',
    usuario: 'Joaquín',
    fecha: 'Hoy',
    hora: '11:15',
  },
  {
    id: '3',
    tipo: 'alerta',
    titulo: 'Detección de plaga',
    descripcion: 'Sistema detectó Alerta de Isoca en Lote 3 🐛',
    fecha: 'Ayer',
    hora: '16:45',
  },
  {
    id: '4',
    tipo: 'monitoreo',
    titulo: 'Foto de cultivo',
    descripcion: 'Santiago cargó Foto de Cultivo en Lote 4 📷',
    usuario: 'Santiago',
    fecha: 'Ayer',
    hora: '09:20',
  },
];

const plantacionesData = [
  { name: 'Sorgo', value: 120, color: '#27AE60' },
  { name: 'Alfalfa', value: 45, color: '#27AE60' },
  { name: 'Soja', value: 30, color: '#27AE60' },
  { name: 'Maíz', value: 25, color: '#27AE60' },
  { name: 'Trigo', value: 100, color: '#27AE60' },
  { name: 'Girasol', value: 75, color: '#27AE60' },
  { name: 'Trébol', value: 20, color: '#27AE60' },
  { name: 'Vacío', value: 20, color: '#95A5A6' },
  { name: 'Seco', value: 5, color: '#E74C3C' },
];

export default function AgronomiaResumen() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Hectáreas"
          value="1.000 Ha"
          icon={<MapPin className="w-5 h-5" />}
          color="green"
        />
        <MetricCard
          title="Alertas Sanitarias"
          value="1"
          subtitle="Roya detectada"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
          trend="up"
          trendValue="+1 desde ayer"
        />
        <MetricCard
          title="Siembras Programadas"
          value="2"
          icon={<Calendar className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Labores Pendientes"
          value="3"
          icon={<ClipboardList className="w-5 h-5" />}
          color="yellow"
        />
        <MetricCard
          title="Lotes sin Plantaciones"
          value="7"
          icon={<Sprout className="w-5 h-5" />}
          color="gray"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PlantacionesChart data={plantacionesData} height={350} />
        </div>

        {/* Weather Mini Widget */}
        <div className="bg-gradient-to-br from-[#1B4D3E] to-[#2E7D32] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Clima Actual</h3>
            <Sun className="w-6 h-6 text-[#F39C12]" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">28.6°C</p>
                <p className="text-white/80">Parcialmente nublado</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Sensación térmica</p>
                <p className="text-xl font-semibold">31°C</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <Droplets className="w-5 h-5 mx-auto mb-1 text-[#3498DB]" />
                <p className="text-xs text-white/60">Humedad</p>
                <p className="font-semibold">65%</p>
              </div>
              <div className="text-center">
                <Wind className="w-5 h-5 mx-auto mb-1 text-[#95A5A6]" />
                <p className="text-xs text-white/60">Viento</p>
                <p className="font-semibold">18 km/h</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-[#F39C12]" />
                <p className="text-xs text-white/60">Delta T</p>
                <p className="font-semibold">5.2</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3 mt-4">
              <p className="text-sm font-medium mb-2">Pronóstico próximas horas</p>
              <div className="flex justify-between text-sm">
                <span>14:00</span>
                <span>17:00</span>
                <span>20:00</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[#F39C12]">29°C ☀️</span>
                <span className="text-[#3498DB]">26°C 🌤️</span>
                <span className="text-[#95A5A6]">22°C ☁️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ActividadesPanel actividades={mockActividades} />
        <AlertasPanel alertas={mockAlertas} />
      </div>
    </div>
  );
}