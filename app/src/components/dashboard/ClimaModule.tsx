import { useState } from 'react';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeather } from '@/hooks/useWeather';

export default function ClimaModule() {
  const { weather, forecast, loading, error, refetch } = useWeather();
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // En una implementación completa, buscaría coordenadas de la ciudad
    refetch();
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3436]">Clima y Pronóstico</h2>
          <p className="text-[#2D3436]/60">Información meteorológica en tiempo real</p>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D3436]/40" />
              <Input
                placeholder="Buscar ciudad..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </form>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={loading}
            className="rounded-xl"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          Error al cargar el clima: {error}
        </div>
      )}

      {weather && (
        <>
          {/* Current weather */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1B4D3E] to-[#143d31] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {weather.ciudad}, {weather.pais}
                  </p>
                  <p className="text-6xl font-bold mt-2">{weather.temp}°C</p>
                  <p className="text-white/70 capitalize text-lg">{weather.descripcion}</p>
                  <p className="text-white/50 mt-1">Sensación térmica: {weather.feels_like}°C</p>
                </div>
                <img 
                  src={getWeatherIcon(weather.icono)}
                  alt={weather.descripcion}
                  className="w-32 h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <Sunrise className="w-5 h-5 text-[#C9A227]" />
                  <div>
                    <p className="text-xs text-white/50">Amanecer</p>
                    <p className="font-medium">
                      {new Date(weather.amanecer * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sunset className="w-5 h-5 text-[#8B5A3C]" />
                  <div>
                    <p className="text-xs text-white/50">Atardecer</p>
                    <p className="font-medium">
                      {new Date(weather.atardecer * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-[#2D3436]/60">Humedad</p>
                </div>
                <p className="text-2xl font-bold text-[#2D3436]">{weather.humedad}%</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Wind className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-sm text-[#2D3436]/60">Viento</p>
                </div>
                <p className="text-2xl font-bold text-[#2D3436]">{weather.viento} <span className="text-sm font-normal">km/h</span></p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-sm text-[#2D3436]/60">Presión</p>
                </div>
                <p className="text-2xl font-bold text-[#2D3436]">{weather.presion} <span className="text-sm font-normal">hPa</span></p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-sm text-[#2D3436]/60">Visibilidad</p>
                </div>
                <p className="text-2xl font-bold text-[#2D3436]">10 <span className="text-sm font-normal">km</span></p>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-[#2D3436] mb-4">Pronóstico 5 días</h3>
            <div className="grid grid-cols-5 gap-4">
              {forecast.map((day, idx) => (
                <div key={idx} className="text-center p-4 bg-[#F5F2ED] rounded-xl">
                  <p className="text-sm font-medium text-[#2D3436] mb-2">{day.fecha}</p>
                  <img 
                    src={getWeatherIcon(day.icono)}
                    alt={day.descripcion}
                    className="w-12 h-12 mx-auto"
                  />
                  <p className="text-xs text-[#2D3436]/60 capitalize mb-2">{day.descripcion}</p>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="font-bold">{day.temp_max}°</span>
                    <span className="text-[#2D3436]/40">{day.temp_min}°</span>
                  </div>
                  {day.probLluvia > 0 && (
                    <p className="text-xs text-blue-500 mt-1">{day.probLluvia}% lluvia</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Alertas para el campo
            </h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Condiciones favorables para pulverización en los próximos 2 días</li>
              <li>• Probabilidad de lluvia el miércoles - planificar labores en consecuencia</li>
              <li>• Temperaturas óptimas para el desarrollo del cultivo</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
