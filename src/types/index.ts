// Enums
export type EstadoLote = 'PREPARACION' | 'SIEMBRA' | 'DESARROLLO' | 'COSECHA' | 'BARBECHO';
export type EstadoLabor = 'PROGRAMADA' | 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA' | 'BLOQUEADA';
export type TipoLabor = 'SIEMBRA' | 'FUMIGACION' | 'FERTILIZACION' | 'RIEGO' | 'COSECHA' | 'ARADO' | 'PULVERIZACION';
export type Severidad = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
export type TipoAlerta = 'CLIMA' | 'SANITARIA' | 'LOGISTICA' | 'ECONOMICA';

// Interfaces principales
export interface Campo {
  id: string;
  nombre: string;
  ubicacion: string;
  areaTotal: number;
  lotes: Lote[];
}

export interface Lote {
  id: string;
  nombre: string;
  campoId: string;
  campo?: string;
  hectareas: number;
  cultivo?: string;
  variedad?: string;
  estado: EstadoLote;
  ndvi?: number;
  aguaUtil?: number;
  estadoFenologico?: string;
  fechaSiembra?: string;
  fechaCosechaEst?: string;
  rendimientoEst?: number;
  coordenadas?: [number, number][];
  
  // Datos financieros
  inversionTotal?: number;
  costoPorHectarea?: number;
  margenBruto?: number;
  
  // Datos técnicos
  ultimoRiego?: string;
  proximoRiego?: string;
  plagasDetectadas?: number;
  alertasActivas?: number;
}

export interface Labor {
  id: string;
  titulo: string;
  tipo: TipoLabor;
  estado: EstadoLabor;
  loteId?: string;
  loteNombre?: string;
  fechaProgramada: string;
  fechaEjecucion?: string;
  operario?: string;
  maquinaria?: string;
  insumos?: string[];
  observaciones?: string;
  costo?: number;
  
  // Para UI
  icono?: string;
  color?: string;
}

export interface Cultivo {
  id: string;
  nombre: string;
  variedad: string;
  loteId: string;
  loteNombre: string;
  hectareas: number;
  fechaSiembra: string;
  estadoFenologico: string;
  progreso: number;
  
  // Datos técnicos
  densidad?: number;
  semilla?: string;
  genetica?: string;
  
  // Datos económicos
  inversion?: number;
  costoActual?: number;
  rendimientoEstimado?: number;
  precioEstimado?: number;
  margenEstimado?: number;
  
  // Estado
  ndvi?: number;
  aguaUtil?: number;
  estadoSanitario?: 'SALUDABLE' | 'VIGILANCIA' | 'TRATAMIENTO';
  ultimaVisita?: string;
  proximaAccion?: string;
}

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  severidad: Severidad;
  titulo: string;
  descripcion: string;
  loteId?: string;
  loteNombre?: string;
  fecha: string;
  accionRecomendada?: string;
  riesgoEconomico?: number;
  atendida?: boolean;
}

export interface PlagaDeteccion {
  id: string;
  loteId: string;
  loteNombre: string;
  tipo: string;
  nombreCientifico: string;
  confianzaIA: number;
  severidad: Severidad;
  hectareasAfectadas: number;
  fechaDeteccion: string;
  imagenUrl?: string;
  estado: 'ACTIVA' | 'CONTROLADA' | 'RESUELTA';
  
  // Tratamiento
  tratamientoSugerido?: string;
  productoSugerido?: string;
  dosis?: string;
  costoEstimado?: number;
}

export interface PlanSiembra {
  id: string;
  nombre: string;
  cultivo: string;
  variedad: string;
  lotes: string[];
  hectareasTotales: number;
  fechaMeta: string;
  estado: 'BORRADOR' | 'INSUMOS' | 'ASIGNACION' | 'LISTO' | 'EJECUTANDO' | 'COMPLETADO';
  progreso: number;
  inversionEstimada: number;
  
  // Pasos del plan
  pasos: {
    nombre: string;
    completado: boolean;
    fecha?: string;
  }[];
}

export interface RecomendacionIA {
  id: string;
  tipo: 'ROTACION' | 'COBERTURA' | 'NITROGENO' | 'RIEGO' | 'TRATAMIENTO';
  titulo: string;
  descripcion: string;
  confianza: number;
  lotesAfectados: string[];
  beneficioEsperado: string;
  ahorroEstimado?: number;
  razonamiento: string[];
  aceptada?: boolean;
}

export interface AnalisisSuelo {
  id: string;
  loteId: string;
  loteNombre: string;
  fecha: string;
  profundidad: string;
  
  // Macronutrientes
  nitrogeno: number;
  fosforo: number;
  potasio: number;
  
  // Otros parámetros
  ph: number;
  materiaOrganica: number;
  conductividad?: number;
  
  // Estado
  estadoGeneral: 'OPTIMO' | 'BUENO' | 'REGULAR' | 'CRITICO';
  recomendaciones?: string[];
}

export interface CalculoDosis {
  id: string;
  nombre: string;
  fecha: string;
  lote: string;
  cultivo: string;
  hectareas: number;
  
  // Mezcla
  productos: {
    nombre: string;
    dosis: number;
    unidad: string;
    color: string;
  }[];
  
  costoTotal: number;
  costoPorHectarea: number;
}

export interface ClimaData {
  temperatura: number;
  humedad: number;
  viento: number;
  direccionViento: string;
  deltaT: number;
  presion: number;
  descripcion: string;
  icono: string;
  uv?: number;
  visibilidad?: number;
}

export interface PronosticoDia {
  fecha: string;
  diaSemana: string;
  tempMin: number;
  tempMax: number;
  descripcion: string;
  icono: string;
  probLluvia: number;
  mmLluvia?: number;
  viento?: number;
  
  // Para agricultura
  aptoPulverizar: boolean;
  aptoSiembra: boolean;
  alerta?: string;
}

export interface VentanaPulverizacion {
  hora: string;
  temperatura: number;
  viento: number;
  deltaT: number;
  humedad: number;
  estado: 'OPTIMO' | 'ADECUADO' | 'MARGINAL' | 'NO_APTO';
}

export interface Actividad {
  id: string;
  tipo: 'labor' | 'alerta' | 'monitoreo' | 'clima' | 'sistema';
  titulo: string;
  descripcion: string;
  usuario?: string;
  avatar?: string;
  fecha: string;
  hora: string;
  icono?: string;
  color?: string;
}

// Tipos para gráficos
export interface SerieGrafico {
  nombre: string;
  data: number[];
  color?: string;
}

export interface DatoGrafico {
  label: string;
  value: number;
  color?: string;
  porcentaje?: number;
}