// Dashboard Home Component
import { 
  Sprout, 
  Beef, 
  Package, 
  TrendingUp, 
  Cloud,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';
import { useWeather } from '@/hooks/useWeather';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const { data } = useFarm();
  const { weather, forecast } = useWeather();

  const stats = [
    { 
      label: 'Lotes activos', 
      value: data.lotes.length, 
      icon: Sprout, 
      color: '#1B4D3E',
      link: '/dashboard/agricultura'
    },
    { 
      label: 'Animales', 
      value: data.animales.length, 
      icon: Beef, 
      color: '#8B5A3C',
      link: '/dashboard/ganaderia'
    },
    { 
      label: 'Insumos', 
      value: data.insumos.length, 
      icon: Package, 
      color: '#C9A227',
      link: '/dashboard/logistica'
    },
    { 
      label: 'Tareas pendientes', 
      value: data.tareas.filter(t => t.estado !== 'completada').length, 
      icon: TrendingUp, 
      color: '#6366F1',
      link: '/dashboard/agricultura'
    },
  ];

  // Alertas de stock bajo
  const alertasStock = data.insumos.filter(i => i.cantidad < i.stockMinimo);
  
  // Tareas urgentes
  const tareasUrgentes = data.tareas.filter(t => t.estado === 'pendiente').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1B4D3E] to-[#143d31] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Buen día!</h2>
        <p className="text-white/70">
          Tu sistema está operando con normalidad. Tienes {tareasUrgentes.length} tareas pendientes 
          y {alertasStock.length} alertas de stock.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#2D3436]/60 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#2D3436]">{stat.value}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-[#1B4D3E] opacity-0 group-hover:opacity-100 transition-opacity">
              Ver detalles <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Clima */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#2D3436]">Clima hoy</h3>
            <Link to="/dashboard/clima" className="text-sm text-[#1B4D3E]">Ver más</Link>
          </div>
          
          {weather ? (
            <div className="text-center">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icono}@4x.png`}
                alt={weather.descripcion}
                className="w-24 h-24 mx-auto"
              />
              <p className="text-4xl font-bold text-[#2D3436]">{weather.temp}°C</p>
              <p className="text-[#2D3436]/60 capitalize">{weather.descripcion}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#2D3436]/10">
                <div>
                  <p className="text-xs text-[#2D3436]/50">Humedad</p>
                  <p className="font-semibold">{weather.humedad}%</p>
                </div>
                <div>
                  <p className="text-xs text-[#2D3436]/50">Viento</p>
                  <p className="font-semibold">{weather.viento} km/h</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#2D3436]/50">
              <Cloud className="w-12 h-12 mx-auto mb-2" />
              <p>Cargando clima...</p>
            </div>
          )}

          {/* Pronóstico */}
          {forecast.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#2D3436]/10">
              <div className="flex justify-between">
                {forecast.slice(0, 3).map((day) => (
                  <div key={day.fecha} className="text-center">
                    <p className="text-xs text-[#2D3436]/50">{day.fecha}</p>
                    <img 
                      src={`https://openweathermap.org/img/wn/${day.icono}.png`}
                      alt={day.descripcion}
                      className="w-8 h-8 mx-auto"
                    />
                    <p className="text-xs font-semibold">{day.temp_max}°</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alertas y Tareas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alertas */}
          {alertasStock.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-amber-800">Alertas de Stock</h3>
              </div>
              <div className="space-y-2">
                {alertasStock.map((insumo) => (
                  <div key={insumo.id} className="flex items-center justify-between text-sm">
                    <span className="text-amber-700">{insumo.nombre}</span>
                    <span className="text-amber-600 font-medium">
                      {insumo.cantidad} {insumo.unidad} (mín: {insumo.stockMinimo})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tareas */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#2D3436]">Tareas pendientes</h3>
              <Link to="/dashboard/agricultura" className="text-sm text-[#1B4D3E]">Ver todas</Link>
            </div>
            
            {tareasUrgentes.length > 0 ? (
              <div className="space-y-3">
                {tareasUrgentes.map((tarea) => (
                  <div 
                    key={tarea.id} 
                    className="flex items-center gap-3 p-3 bg-[#F5F2ED] rounded-xl"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      tarea.estado === 'en-progreso' ? 'bg-[#C9A227]' : 'bg-[#6366F1]'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-[#2D3436]">{tarea.titulo}</p>
                      <p className="text-sm text-[#2D3436]/50">{tarea.descripcion}</p>
                    </div>
                    <span className="text-xs text-[#2D3436]/40">{tarea.fecha}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-[#2D3436]/50">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>¡Todas las tareas completadas!</p>
              </div>
            )}
          </div>

          {/* Resumen de lotes */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#2D3436]">Estado de lotes</h3>
              <Link to="/dashboard/agricultura" className="text-sm text-[#1B4D3E]">Ver mapa</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.lotes.slice(0, 3).map((lote) => (
                <div key={lote.id} className="p-4 bg-[#F5F2ED] rounded-xl">
                  <p className="font-medium text-[#2D3436]">{lote.nombre}</p>
                  <p className="text-sm text-[#2D3436]/50">{lote.cultivo || 'Sin cultivo'}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#2D3436]/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1B4D3E] rounded-full"
                        style={{ width: `${(lote.ndvi || 0.5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">NDVI: {lote.ndvi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
