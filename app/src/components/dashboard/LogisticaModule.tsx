import { useState } from 'react';
import { 
  Package, 
  Plus, 
  AlertTriangle,
  Fuel,
  Wheat,
  Beaker,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFarm } from '@/context/FarmContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function LogisticaModule() {
  const { data, addInsumo, consumirInsumo } = useFarm();
  const [newInsumo, setNewInsumo] = useState({
    nombre: '',
    categoria: 'semilla' as const,
    cantidad: '',
    unidad: 'kg',
    stockMinimo: '',
  });

  const handleAddInsumo = () => {
    if (newInsumo.nombre && newInsumo.cantidad) {
      addInsumo({
        nombre: newInsumo.nombre,
        categoria: newInsumo.categoria,
        cantidad: Number(newInsumo.cantidad),
        unidad: newInsumo.unidad,
        stockMinimo: Number(newInsumo.stockMinimo) || 0,
      });
      setNewInsumo({ nombre: '', categoria: 'semilla', cantidad: '', unidad: 'kg', stockMinimo: '' });
    }
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'semilla': return Wheat;
      case 'fertilizante': return Beaker;
      case 'quimico': return Beaker;
      case 'combustible': return Fuel;
      default: return Package;
    }
  };

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'semilla': return '#1B4D3E';
      case 'fertilizante': return '#8B5A3C';
      case 'quimico': return '#E85D4E';
      case 'combustible': return '#C9A227';
      default: return '#6366F1';
    }
  };

  const alertasStock = data.insumos.filter(i => i.cantidad < i.stockMinimo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Logística e Inventarios</h2>
          <p className="text-[#2D3436]/60">Control de insumos y stock</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#C9A227] hover:bg-[#a88a20] rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Insumo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar insumo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Nombre</Label>
                <Input 
                  placeholder="Ej: Semilla de Maíz"
                  value={newInsumo.nombre}
                  onChange={(e) => setNewInsumo({...newInsumo, nombre: e.target.value})}
                />
              </div>
              <div>
                <Label>Categoría</Label>
                <select 
                  className="w-full p-2 border rounded-xl"
                  value={newInsumo.categoria}
                  onChange={(e) => setNewInsumo({...newInsumo, categoria: e.target.value as any})}
                >
                  <option value="semilla">Semilla</option>
                  <option value="fertilizante">Fertilizante</option>
                  <option value="quimico">Químico</option>
                  <option value="combustible">Combustible</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cantidad</Label>
                  <Input 
                    type="number"
                    placeholder="1000"
                    value={newInsumo.cantidad}
                    onChange={(e) => setNewInsumo({...newInsumo, cantidad: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Unidad</Label>
                  <Input 
                    placeholder="kg"
                    value={newInsumo.unidad}
                    onChange={(e) => setNewInsumo({...newInsumo, unidad: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Stock mínimo</Label>
                <Input 
                  type="number"
                  placeholder="200"
                  value={newInsumo.stockMinimo}
                  onChange={(e) => setNewInsumo({...newInsumo, stockMinimo: e.target.value})}
                />
              </div>
              <Button onClick={handleAddInsumo} className="w-full bg-[#C9A227]">
                Guardar Insumo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {alertasStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-800">Stock bajo</h3>
          </div>
          <div className="space-y-2">
            {alertasStock.map((insumo) => (
              <div key={insumo.id} className="flex items-center justify-between text-sm">
                <span className="text-amber-700">{insumo.nombre}</span>
                <span className="text-amber-600 font-medium">
                  {insumo.cantidad} / {insumo.stockMinimo} {insumo.unidad}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Total insumos</p>
          <p className="text-3xl font-bold text-[#2D3436]">{data.insumos.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Alertas</p>
          <p className="text-3xl font-bold text-amber-500">{alertasStock.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Combustible</p>
          <p className="text-3xl font-bold text-[#C9A227]">
            {data.insumos.find(i => i.categoria === 'combustible')?.cantidad || 0} L
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Valor estimado</p>
          <p className="text-3xl font-bold text-[#1B4D3E]">$45K</p>
        </div>
      </div>

      {/* Insumos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.insumos.map((insumo) => {
          const Icon = getCategoryIcon(insumo.categoria);
          const color = getCategoryColor(insumo.categoria);
          const isLow = insumo.cantidad < insumo.stockMinimo;

          return (
            <div key={insumo.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                {isLow && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    Bajo
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-[#2D3436] mb-1">{insumo.nombre}</h3>
              <p className="text-sm text-[#2D3436]/60 capitalize mb-4">{insumo.categoria}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#2D3436]/60">Stock</span>
                  <span className="font-medium">{insumo.cantidad} {insumo.unidad}</span>
                </div>
                <div className="h-2 bg-[#2D3436]/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(100, (insumo.cantidad / (insumo.stockMinimo * 2)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => consumirInsumo(insumo.id, 10)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#F5F2ED] rounded-lg text-sm hover:bg-[#2D3436]/10 transition-colors"
                >
                  <ArrowDown className="w-4 h-4" />
                  -10
                </button>
                <button 
                  onClick={() => consumirInsumo(insumo.id, 50)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#F5F2ED] rounded-lg text-sm hover:bg-[#2D3436]/10 transition-colors"
                >
                  <ArrowDown className="w-4 h-4" />
                  -50
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
