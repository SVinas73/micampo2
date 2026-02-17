import { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Plus,
  MoreHorizontal,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFarm } from '@/context/FarmContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AgriculturaModule() {
  const { data, addLote, addTarea, updateTarea } = useFarm();
  const [newLote, setNewLote] = useState({ nombre: '', hectareas: '', cultivo: '' });
  const [newTarea, setNewTarea] = useState({ titulo: '', descripcion: '', fecha: '' });

  const handleAddLote = () => {
    if (newLote.nombre && newLote.hectareas) {
      addLote({
        nombre: newLote.nombre,
        hectareas: Number(newLote.hectareas),
        cultivo: newLote.cultivo || undefined,
      });
      setNewLote({ nombre: '', hectareas: '', cultivo: '' });
    }
  };

  const handleAddTarea = () => {
    if (newTarea.titulo) {
      addTarea({
        titulo: newTarea.titulo,
        descripcion: newTarea.descripcion,
        estado: 'pendiente',
        fecha: newTarea.fecha || new Date().toISOString().split('T')[0],
      });
      setNewTarea({ titulo: '', descripcion: '', fecha: '' });
    }
  };

  const getNDVIColor = (ndvi?: number) => {
    if (!ndvi) return 'bg-gray-200';
    if (ndvi >= 0.8) return 'bg-green-500';
    if (ndvi >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Agricultura de Precisión</h2>
          <p className="text-[#2D3436]/60">Gestión de lotes y cultivos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1B4D3E] hover:bg-[#143d31] rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Lote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo lote</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Nombre del lote</Label>
                <Input 
                  placeholder="Ej: Lote 4 - Norte"
                  value={newLote.nombre}
                  onChange={(e) => setNewLote({...newLote, nombre: e.target.value})}
                />
              </div>
              <div>
                <Label>Hectáreas</Label>
                <Input 
                  type="number"
                  placeholder="150"
                  value={newLote.hectareas}
                  onChange={(e) => setNewLote({...newLote, hectareas: e.target.value})}
                />
              </div>
              <div>
                <Label>Cultivo (opcional)</Label>
                <Input 
                  placeholder="Ej: Soja"
                  value={newLote.cultivo}
                  onChange={(e) => setNewLote({...newLote, cultivo: e.target.value})}
                />
              </div>
              <Button onClick={handleAddLote} className="w-full bg-[#1B4D3E]">
                Guardar Lote
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Total hectáreas</p>
          <p className="text-3xl font-bold text-[#2D3436]">
            {data.lotes.reduce((sum, l) => sum + l.hectareas, 0)}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">NDVI promedio</p>
          <p className="text-3xl font-bold text-[#1B4D3E]">
            {(data.lotes.reduce((sum, l) => sum + (l.ndvi || 0), 0) / data.lotes.length).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Tareas pendientes</p>
          <p className="text-3xl font-bold text-[#C9A227]">
            {data.tareas.filter(t => t.estado !== 'completada').length}
          </p>
        </div>
      </div>

      {/* Lotes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.lotes.map((lote) => (
          <div key={lote.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#1B4D3E]/10 rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-[#1B4D3E]" />
              </div>
              <button className="p-1 hover:bg-[#F5F2ED] rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-[#2D3436]/40" />
              </button>
            </div>
            
            <h3 className="font-bold text-[#2D3436] mb-1">{lote.nombre}</h3>
            <p className="text-sm text-[#2D3436]/60 mb-4">
              {lote.hectareas} hectáreas {lote.cultivo && `· ${lote.cultivo}`}
            </p>

            {lote.ndvi && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#2D3436]/60">NDVI</span>
                  <span className="font-medium">{lote.ndvi}</span>
                </div>
                <div className="h-2 bg-[#2D3436]/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getNDVIColor(lote.ndvi)}`}
                    style={{ width: `${(lote.ndvi / 1) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {lote.ultimoRiego && (
              <div className="flex items-center gap-2 text-sm text-[#2D3436]/60">
                <Droplets className="w-4 h-4" />
                Último riego: {lote.ultimoRiego}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tareas */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#2D3436]">Tareas del campo</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Plus className="w-4 h-4 mr-1" />
                Nueva tarea
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar tarea</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Título</Label>
                  <Input 
                    placeholder="Ej: Fumigar Lote 1"
                    value={newTarea.titulo}
                    onChange={(e) => setNewTarea({...newTarea, titulo: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Input 
                    placeholder="Detalles de la tarea"
                    value={newTarea.descripcion}
                    onChange={(e) => setNewTarea({...newTarea, descripcion: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Fecha</Label>
                  <Input 
                    type="date"
                    value={newTarea.fecha}
                    onChange={(e) => setNewTarea({...newTarea, fecha: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddTarea} className="w-full bg-[#1B4D3E]">
                  Agregar Tarea
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {data.tareas.map((tarea) => (
            <div 
              key={tarea.id} 
              className="flex items-center gap-3 p-3 bg-[#F5F2ED] rounded-xl"
            >
              <button
                onClick={() => updateTarea(tarea.id, { estado: tarea.estado === 'completada' ? 'pendiente' : 'completada' })}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  tarea.estado === 'completada' 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-[#2D3436]/20 hover:border-[#1B4D3E]'
                }`}
              >
                {tarea.estado === 'completada' && <TrendingUp className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${tarea.estado === 'completada' ? 'line-through text-[#2D3436]/40' : 'text-[#2D3436]'}`}>
                  {tarea.titulo}
                </p>
                <p className="text-sm text-[#2D3436]/50">{tarea.descripcion}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2D3436]/40">
                <Calendar className="w-4 h-4" />
                {tarea.fecha}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
