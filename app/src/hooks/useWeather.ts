import { useState, useEffect, useCallback } from 'react';
import { API_KEYS, API_URLS, DEFAULTS } from '@/config/api';

export interface WeatherData {
  temp: number;
  feels_like: number;
  humedad: number;
  presion: number;
  viento: number;
  descripcion: string;
  icono: string;
  ciudad: string;
  pais: string;
  amanecer: number;
  atardecer: number;
}

export interface ForecastDay {
  fecha: string;
  temp_min: number;
  temp_max: number;
  descripcion: string;
  icono: string;
  probLluvia: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat?: number, lon?: number) => {
    // Verificar si la API key está configurada
    if (API_KEYS.OPENWEATHER === 'TU_API_KEY_DE_OPENWEATHER_AQUI') {
      // Usar datos de demo si no hay API key
      setWeather({
        temp: 24,
        feels_like: 26,
        humedad: 65,
        presion: 1013,
        viento: 12,
        descripcion: 'Parcialmente nublado',
        icono: '02d',
        ciudad: DEFAULTS.WEATHER_CITY,
        pais: 'AR',
        amanecer: Date.now() / 1000 - 21600,
        atardecer: Date.now() / 1000 + 21600,
      });
      setForecast([
        { fecha: 'Hoy', temp_min: 18, temp_max: 28, descripcion: 'Parcialmente nublado', icono: '02d', probLluvia: 20 },
        { fecha: 'Mañana', temp_min: 17, temp_max: 27, descripcion: 'Soleado', icono: '01d', probLluvia: 10 },
        { fecha: 'Miércoles', temp_min: 19, temp_max: 29, descripcion: 'Lluvia ligera', icono: '10d', probLluvia: 60 },
        { fecha: 'Jueves', temp_min: 18, temp_max: 26, descripcion: 'Nublado', icono: '03d', probLluvia: 30 },
        { fecha: 'Viernes', temp_min: 16, temp_max: 25, descripcion: 'Soleado', icono: '01d', probLluvia: 5 },
      ]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const latitude = lat || DEFAULTS.WEATHER_LAT;
      const longitude = lon || DEFAULTS.WEATHER_LON;

      // Clima actual
      const weatherRes = await fetch(
        `${API_URLS.OPENWEATHER}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS.OPENWEATHER}&units=metric&lang=es`
      );
      
      if (!weatherRes.ok) throw new Error('Error al obtener el clima');
      
      const weatherData = await weatherRes.json();
      
      setWeather({
        temp: Math.round(weatherData.main.temp),
        feels_like: Math.round(weatherData.main.feels_like),
        humedad: weatherData.main.humidity,
        presion: weatherData.main.pressure,
        viento: weatherData.wind.speed,
        descripcion: weatherData.weather[0].description,
        icono: weatherData.weather[0].icon,
        ciudad: weatherData.name,
        pais: weatherData.sys.country,
        amanecer: weatherData.sys.sunrise,
        atardecer: weatherData.sys.sunset,
      });

      // Pronóstico 5 días
      const forecastRes = await fetch(
        `${API_URLS.OPENWEATHER}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEYS.OPENWEATHER}&units=metric&lang=es`
      );
      
      if (!forecastRes.ok) throw new Error('Error al obtener el pronóstico');
      
      const forecastData = await forecastRes.json();
      
      // Procesar pronóstico - agrupar por día
      const dailyForecast: ForecastDay[] = [];
      const processedDays = new Set();
      
      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && dailyForecast.length < 5) {
          processedDays.add(dayKey);
          dailyForecast.push({
            fecha: date.toLocaleDateString('es-ES', { weekday: 'short' }),
            temp_min: Math.round(item.main.temp_min),
            temp_max: Math.round(item.main.temp_max),
            descripcion: item.weather[0].description,
            icono: item.weather[0].icon,
            probLluvia: item.pop * 100,
          });
        }
      }
      
      setForecast(dailyForecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar clima al montar el componente
  useEffect(() => {
    fetchWeather();
    // Actualizar cada 30 minutos
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return {
    weather,
    forecast,
    loading,
    error,
    refetch: fetchWeather,
  };
}
