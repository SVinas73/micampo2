import { useState } from 'react';
import { 
  Tractor, 
  MapPin,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Datos de ejemplo para maquinaria
const maquinarias = [
  {
    id: 1,
    nombre: 'Tractor John Deere 8R',
    tipo: 'Tractor',
    estado: 'activo',
    ubicacion: { lat: -34.6037, lng: -58.3816 },
    horometro: 2450,
    combustible: 85,
    proximoMantenimiento: '2024-03-15',
    alertas: [],
  },
  {
    id: 2,
    nombre: 'Cosechadora Case IH',
    tipo: 'Cosechadora',
    estado: 'en-mantenimiento',
    ubicacion: { lat: -34.6100, lng: -58.3900 },
    horometro: 1890,
    combustible: 45,
    proximoMantenimiento: '2024-02-25',
    alertas: ['Filtro de aceite al 90%'],
  },
  {
    id: 3,
    nombre: 'Pulverizadora Metalfor',
    tipo: 'Pulverizadora',
    estado: 'activo',
    ubicacion: { lat: -34.5950, lng: -58.3750 },
    horometro: 1200,
    combustible: 92,
    proximoMantenimiento: '2024-04-01',
    alertas: [],
  },
  {
    id: 4,
    nombre: 'Sembradora Pierobon',
    tipo: 'Sembradora',
    estado: 'inactivo',
    ubicacion: { lat: -34.6200, lng: -58.4000 },
    horometro: 890,
    combustible: 20,
    proximoMantenimiento: '2024-03-01',
    alertas: ['Stock de combustible bajo'],
  },
];

const ordenesTrabajo = [
  { id: 1, maquina: 'Cosechadora Case IH', tipo: 'Mantenimiento preventivo', estado: 'en-progreso', fecha: '2024-02-20' },
  { id: 2, maquina: 'Tractor John Deere 8R', tipo: 'Cambio de aceite', estado: 'pendiente', fecha: '2024-02-25' },
];

export default function MaquinariaModule() {
  const [selectedMaquina, setSelectedMaquina] = useState<number | null>(null);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-500';
      case 'en-mantenimiento': return 'bg-amber-500';
      case 'inactivo': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const activas = maquinarias.filter(m => m.estado === 'activo').length;
  const enMantenimiento = maquinarias.filter(m => m.estado === 'en-mantenimiento').length;
  const totalAlertas = maquinarias.reduce((sum, m) => sum + m.alertas.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Maquinaria Conectada</h2>
          <p className="text-[#2D3436]/60">Telemática y mantenimiento predictivo</p>
        </div>
        <Button className="bg-[#6366F1] hover:bg-[#4f46e5] rounded-xl">
          <Wrench className="w-4 h-4 mr-2" />
          Nueva orden
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Máquinas activas</p>
          <p className="text-3xl font-bold text-green-600">{activas}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">En mantenimiento</p>
          <p className="text-3xl font-bold text-amber-500">{enMantenimiento}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Alertas</p>
          <p className="text-3xl font-bold text-red-500">{totalAlertas}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Eficiencia</p>
          <p className="text-3xl font-bold text-[#6366F1]">87%</p>
        </div>
      </div>

      {/* Maquinaria Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {maquinarias.map((maquina) => (
          <div 
            key={maquina.id} 
            className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer ${
              selectedMaquina === maquina.id ? 'ring-2 ring-[#6366F1]' : ''
            }`}
            onClick={() => setSelectedMaquina(maquina.id === selectedMaquina ? null : maquina.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6366F1]/10 rounded-xl flex items-center justify-center">
                  <Tractor className="w-6 h-6 text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2D3436]">{maquina.nombre}</h3>
                  <p className="text-sm text-[#2D3436]/60">{maquina.tipo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getEstadoColor(maquina.estado)}`} />
                <span className="text-sm text-[#2D3436]/60 capitalize">{maquina.estado.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-[#F5F2ED] rounded-xl text-center">
                <p className="text-xs text-[#2D3436]/50">Horómetro</p>
                <p className="font-semibold text-[#2D3436]">{maquina.horometro}h</p>
              </div>
              <div className="p-3 bg-[#F5F2ED] rounded-xl text-center">
                <p className="text-xs text-[#2D3436]/50">Combustible</p>
                <p className={`font-semibold ${maquina.combustible < 30 ? 'text-red-500' : 'text-[#2D3436]'}`}>
                  {maquina.combustible}%
                </p>
              </div>
              <div className="p-3 bg-[#F5F2ED] rounded-xl text-center">
                <p className="text-xs text-[#2D3436]/50">Próx. mant.</p>
                <p className="font-semibold text-[#2D3436]">{maquina.proximoMantenimiento}</p>
              </div>
            </div>

            {/* Barra de combustible */}
            <div className="mb-3">
              <div className="h-2 bg-[#2D3436]/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${maquina.combustible < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${maquina.combustible}%` }}
                />
              </div>
            </div>

            {/* Alertas */}
            {maquina.alertas.length > 0 && (
              <div className="space-y-1">
                {maquina.alertas.map((alerta, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    {alerta}
                  </div>
                ))}
              </div>
            )}

            {/* Ubicación */}
            <div className="mt-3 flex items-center gap-2 text-sm text-[#2D3436]/50">
              <MapPin className="w-4 h-4" />
              <span>Lat: {maquina.ubicacion.lat.toFixed(4)}, Lng: {maquina.ubicacion.lng.toFixed(4)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Órdenes de trabajo */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#2D3436]">Órdenes de trabajo</h3>
          <Button variant="outline" size="sm" className="rounded-xl">
            Ver historial
          </Button>
        </div>

        <div className="space-y-3">
          {ordenesTrabajo.map((orden) => (
            <div key={orden.id} className="flex items-center gap-4 p-4 bg-[#F5F2ED] rounded-xl">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                orden.estado === 'en-progreso' ? 'bg-amber-100' : 'bg-blue-100'
              }`}>
                {orden.estado === 'en-progreso' ? (
                  <Clock className="w-5 h-5 text-amber-600" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#2D3436]">{orden.tipo}</p>
                <p className="text-sm text-[#2D3436]/50">{orden.maquina}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  orden.estado === 'en-progreso' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {orden.estado === 'en-progreso' ? 'En progreso' : 'Pendiente'}
                </span>
                <p className="text-xs text-[#2D3436]/40 mt-1">{orden.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
