import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos de datos
export interface Lote {
  id: string;
  nombre: string;
  hectareas: number;
  cultivo?: string;
  ndvi?: number;
  ultimoRiego?: string;
}

export interface Animal {
  id: string;
  rfid: string;
  nombre?: string;
  tipo: 'bovino' | 'ovino' | 'porcino';
  peso: number;
  produccionLeche?: number;
  ultimaVacuna?: string;
}

export interface Insumo {
  id: string;
  nombre: string;
  categoria: 'semilla' | 'fertilizante' | 'quimico' | 'combustible';
  cantidad: number;
  unidad: string;
  stockMinimo: number;
}

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en-progreso' | 'completada';
  fecha: string;
  loteId?: string;
}

export interface FarmData {
  lotes: Lote[];
  animales: Animal[];
  insumos: Insumo[];
  tareas: Tarea[];
  clima: {
    temp: number;
    humedad: number;
    descripcion: string;
    icono: string;
    pronostico: any[];
  } | null;
}

interface FarmContextType {
  data: FarmData;
  addLote: (lote: Omit<Lote, 'id'>) => void;
  updateLote: (id: string, updates: Partial<Lote>) => void;
  addAnimal: (animal: Omit<Animal, 'id'>) => void;
  updateAnimal: (id: string, updates: Partial<Animal>) => void;
  addInsumo: (insumo: Omit<Insumo, 'id'>) => void;
  consumirInsumo: (id: string, cantidad: number) => void;
  addTarea: (tarea: Omit<Tarea, 'id'>) => void;
  updateTarea: (id: string, updates: Partial<Tarea>) => void;
  updateClima: (clima: FarmData['clima']) => void;
}

const defaultData: FarmData = {
  lotes: [
    { id: '1', nombre: 'Lote 1 - Norte', hectareas: 150, cultivo: 'Soja', ndvi: 0.82 },
    { id: '2', nombre: 'Lote 2 - Sur', hectareas: 200, cultivo: 'Maíz', ndvi: 0.75 },
    { id: '3', nombre: 'Lote 3 - Este', hectareas: 120, cultivo: 'Trigo', ndvi: 0.68 },
  ],
  animales: [
    { id: '1', rfid: 'AR-001-234', tipo: 'bovino', peso: 450, produccionLeche: 25 },
    { id: '2', rfid: 'AR-001-235', tipo: 'bovino', peso: 420, produccionLeche: 22 },
    { id: '3', rfid: 'AR-001-236', tipo: 'bovino', peso: 380 },
  ],
  insumos: [
    { id: '1', nombre: 'Semilla de Soja', categoria: 'semilla', cantidad: 5000, unidad: 'kg', stockMinimo: 1000 },
    { id: '2', nombre: 'Fertilizante NPK', categoria: 'fertilizante', cantidad: 2000, unidad: 'kg', stockMinimo: 500 },
    { id: '3', nombre: 'Gasoil', categoria: 'combustible', cantidad: 3000, unidad: 'L', stockMinimo: 1000 },
  ],
  tareas: [
    { id: '1', titulo: 'Fumigar Lote 1', descripcion: 'Aplicar herbicida', estado: 'pendiente', fecha: '2024-02-20', loteId: '1' },
    { id: '2', titulo: 'Cosechar Lote 3', descripcion: 'Maquinaria lista', estado: 'en-progreso', fecha: '2024-02-18', loteId: '3' },
  ],
  clima: null,
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FarmData>(() => {
    const saved = localStorage.getItem('micampo_farm_data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('micampo_farm_data', JSON.stringify(data));
  }, [data]);

  const addLote = (lote: Omit<Lote, 'id'>) => {
    const newLote = { ...lote, id: Date.now().toString() };
    setData(prev => ({ ...prev, lotes: [...prev.lotes, newLote] }));
  };

  const updateLote = (id: string, updates: Partial<Lote>) => {
    setData(prev => ({
      ...prev,
      lotes: prev.lotes.map(l => l.id === id ? { ...l, ...updates } : l),
    }));
  };

  const addAnimal = (animal: Omit<Animal, 'id'>) => {
    const newAnimal = { ...animal, id: Date.now().toString() };
    setData(prev => ({ ...prev, animales: [...prev.animales, newAnimal] }));
  };

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    setData(prev => ({
      ...prev,
      animales: prev.animales.map(a => a.id === id ? { ...a, ...updates } : a),
    }));
  };

  const addInsumo = (insumo: Omit<Insumo, 'id'>) => {
    const newInsumo = { ...insumo, id: Date.now().toString() };
    setData(prev => ({ ...prev, insumos: [...prev.insumos, newInsumo] }));
  };

  const consumirInsumo = (id: string, cantidad: number) => {
    setData(prev => ({
      ...prev,
      insumos: prev.insumos.map(i => 
        i.id === id ? { ...i, cantidad: Math.max(0, i.cantidad - cantidad) } : i
      ),
    }));
  };

  const addTarea = (tarea: Omit<Tarea, 'id'>) => {
    const newTarea = { ...tarea, id: Date.now().toString() };
    setData(prev => ({ ...prev, tareas: [...prev.tareas, newTarea] }));
  };

  const updateTarea = (id: string, updates: Partial<Tarea>) => {
    setData(prev => ({
      ...prev,
      tareas: prev.tareas.map(t => t.id === id ? { ...t, ...updates } : t),
    }));
  };

  const updateClima = (clima: FarmData['clima']) => {
    setData(prev => ({ ...prev, clima }));
  };

  return (
    <FarmContext.Provider value={{
      data,
      addLote,
      updateLote,
      addAnimal,
      updateAnimal,
      addInsumo,
      consumirInsumo,
      addTarea,
      updateTarea,
      updateClima,
    }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm debe usarse dentro de FarmProvider');
  }
  return context;
}
