import { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign,
  Receipt,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Datos de ejemplo para finanzas
const transacciones = [
  { id: 1, concepto: 'Venta de granos', monto: 125000, tipo: 'ingreso', fecha: '2024-02-15', categoria: 'Ventas' },
  { id: 2, concepto: 'Fertilizante NPK', monto: -45000, tipo: 'gasto', fecha: '2024-02-14', categoria: 'Insumos' },
  { id: 3, concepto: 'Producción lechera', monto: 28000, tipo: 'ingreso', fecha: '2024-02-13', categoria: 'Ventas' },
  { id: 4, concepto: 'Combustible', monto: -12000, tipo: 'gasto', fecha: '2024-02-12', categoria: 'Logística' },
  { id: 5, concepto: 'Mantenimiento tractor', monto: -8500, tipo: 'gasto', fecha: '2024-02-10', categoria: 'Maquinaria' },
];

const margenPorLote = [
  { lote: 'Lote 1 - Norte', ingresos: 85000, gastos: 45000, margen: 47 },
  { lote: 'Lote 2 - Sur', ingresos: 120000, gastos: 62000, margen: 48 },
  { lote: 'Lote 3 - Este', ingresos: 65000, gastos: 38000, margen: 42 },
];

export default function FinanzasModule() {
  const [periodo, setPeriodo] = useState('mes');

  const totalIngresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((sum, t) => sum + t.monto, 0);
  const totalGastos = Math.abs(transacciones.filter(t => t.tipo === 'gasto').reduce((sum, t) => sum + t.monto, 0));
  const margenBruto = ((totalIngresos - totalGastos) / totalIngresos * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Finanzas Real-Time</h2>
          <p className="text-[#2D3436]/60">Control económico de tu operación</p>
        </div>
        <div className="flex gap-2">
          {['semana', 'mes', 'año'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                periodo === p 
                  ? 'bg-[#1B4D3E] text-white' 
                  : 'bg-white text-[#2D3436]/60 hover:bg-[#F5F2ED]'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D3436]/60">Ingresos</p>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">${totalIngresos.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D3436]/60">Gastos</p>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">${totalGastos.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D3436]/60">Margen bruto</p>
            <div className="w-8 h-8 bg-[#1B4D3E]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#1B4D3E]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1B4D3E]">{margenBruto}%</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D3436]/60">Cash flow</p>
            <div className="w-8 h-8 bg-[#C9A227]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#C9A227]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#C9A227]">${(totalIngresos - totalGastos).toLocaleString()}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Transacciones */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#2D3436]">Últimas transacciones</h3>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Receipt className="w-4 h-4 mr-1" />
              Ver todas
            </Button>
          </div>

          <div className="space-y-3">
            {transacciones.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-3 bg-[#F5F2ED] rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  t.tipo === 'ingreso' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {t.tipo === 'ingreso' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2D3436]">{t.concepto}</p>
                  <p className="text-sm text-[#2D3436]/50">{t.categoria}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${t.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.tipo === 'ingreso' ? '+' : ''}${Math.abs(t.monto).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#2D3436]/40">{t.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margen por lote */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#2D3436] mb-4">Margen por lote</h3>

          <div className="space-y-4">
            {margenPorLote.map((lote) => (
              <div key={lote.lote} className="p-4 bg-[#F5F2ED] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-[#2D3436]">{lote.lote}</p>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {lote.margen}%
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600">+${lote.ingresos.toLocaleString()}</span>
                  <span className="text-red-600">-${lote.gastos.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 bg-[#2D3436]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-[#1B4D3E] rounded-full"
                    style={{ width: `${lote.margen}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#1B4D3E] to-[#143d31] rounded-xl text-white">
            <p className="text-white/70 text-sm">Margen promedio</p>
            <p className="text-3xl font-bold">
              {(margenPorLote.reduce((sum, l) => sum + l.margen, 0) / margenPorLote.length).toFixed(1)}%
            </p>
            <p className="text-white/50 text-sm mt-1">
              Basado en {margenPorLote.length} lotes activos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
