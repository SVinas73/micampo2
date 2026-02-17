import { useState } from 'react';
import { 
  Beef, 
  Plus, 
  Search,
  Syringe,
  MoreHorizontal
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

export default function GanaderiaModule() {
  const { data, addAnimal } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [newAnimal, setNewAnimal] = useState({
    rfid: '',
    nombre: '',
    tipo: 'bovino' as const,
    peso: '',
    produccionLeche: '',
  });

  const handleAddAnimal = () => {
    if (newAnimal.rfid) {
      addAnimal({
        rfid: newAnimal.rfid,
        nombre: newAnimal.nombre || undefined,
        tipo: newAnimal.tipo,
        peso: Number(newAnimal.peso) || 0,
        produccionLeche: newAnimal.produccionLeche ? Number(newAnimal.produccionLeche) : undefined,
      });
      setNewAnimal({ rfid: '', nombre: '', tipo: 'bovino', peso: '', produccionLeche: '' });
    }
  };

  const filteredAnimals = data.animales.filter(a => 
    a.rfid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProduccion = data.animales.reduce((sum, a) => sum + (a.produccionLeche || 0), 0);
  const promedioPeso = data.animales.length > 0 
    ? data.animales.reduce((sum, a) => sum + a.peso, 0) / data.animales.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Ganadería Inteligente</h2>
          <p className="text-[#2D3436]/60">Gestión individual de animales</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#8B5A3C] hover:bg-[#6d4830] rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Animal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar nuevo animal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>RFID / Caravana</Label>
                <Input 
                  placeholder="Ej: AR-001-999"
                  value={newAnimal.rfid}
                  onChange={(e) => setNewAnimal({...newAnimal, rfid: e.target.value})}
                />
              </div>
              <div>
                <Label>Nombre (opcional)</Label>
                <Input 
                  placeholder="Ej: Luna"
                  value={newAnimal.nombre}
                  onChange={(e) => setNewAnimal({...newAnimal, nombre: e.target.value})}
                />
              </div>
              <div>
                <Label>Tipo</Label>
                <select 
                  className="w-full p-2 border rounded-xl"
                  value={newAnimal.tipo}
                  onChange={(e) => setNewAnimal({...newAnimal, tipo: e.target.value as any})}
                >
                  <option value="bovino">Bovino</option>
                  <option value="ovino">Ovino</option>
                  <option value="porcino">Porcino</option>
                </select>
              </div>
              <div>
                <Label>Peso (kg)</Label>
                <Input 
                  type="number"
                  placeholder="450"
                  value={newAnimal.peso}
                  onChange={(e) => setNewAnimal({...newAnimal, peso: e.target.value})}
                />
              </div>
              <div>
                <Label>Producción lechera (L/día)</Label>
                <Input 
                  type="number"
                  placeholder="25"
                  value={newAnimal.produccionLeche}
                  onChange={(e) => setNewAnimal({...newAnimal, produccionLeche: e.target.value})}
                />
              </div>
              <Button onClick={handleAddAnimal} className="w-full bg-[#8B5A3C]">
                Guardar Animal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Total animales</p>
          <p className="text-3xl font-bold text-[#2D3436]">{data.animales.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Producción total</p>
          <p className="text-3xl font-bold text-[#8B5A3C]">{totalProduccion} <span className="text-lg">L/día</span></p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Peso promedio</p>
          <p className="text-3xl font-bold text-[#1B4D3E]">{promedioPeso.toFixed(0)} <span className="text-lg">kg</span></p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#2D3436]/60">Productividad</p>
          <p className="text-3xl font-bold text-[#C9A227]">
            {data.animales.filter(a => a.produccionLeche && a.produccionLeche > 20).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D3436]/40" />
        <Input
          placeholder="Buscar por RFID o nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 rounded-xl"
        />
      </div>

      {/* Animals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.map((animal) => (
          <div key={animal.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#8B5A3C]/10 rounded-xl flex items-center justify-center">
                <Beef className="w-6 h-6 text-[#8B5A3C]" />
              </div>
              <button className="p-1 hover:bg-[#F5F2ED] rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-[#2D3436]/40" />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-[#2D3436]">{animal.nombre || 'Sin nombre'}</h3>
              <p className="text-sm text-[#2D3436]/60 font-mono">{animal.rfid}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#F5F2ED] rounded-xl">
                <p className="text-xs text-[#2D3436]/50">Peso</p>
                <p className="font-semibold text-[#2D3436]">{animal.peso} kg</p>
              </div>
              {animal.produccionLeche && (
                <div className="p-3 bg-[#F5F2ED] rounded-xl">
                  <p className="text-xs text-[#2D3436]/50">Leche</p>
                  <p className="font-semibold text-[#8B5A3C]">{animal.produccionLeche} L</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-[#2D3436]/50">
              <Syringe className="w-4 h-4" />
              <span>Última vacuna: {animal.ultimaVacuna || 'Pendiente'}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-12 text-[#2D3436]/50">
          <Beef className="w-16 h-16 mx-auto mb-4" />
          <p>No se encontraron animales</p>
        </div>
      )}
    </div>
  );
}
