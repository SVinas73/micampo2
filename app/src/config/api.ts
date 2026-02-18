// ============================================
// CONFIGURACIÓN DE APIs - MiCampo
// ============================================
// Solo necesitas reemplazar estas keys con las tuyas

export const API_KEYS = {
  // OpenWeather API - https://openweathermap.org/api
  // Obtén tu API key gratis en el link de arriba
  OPENWEATHER: 'TU_API_KEY_DE_OPENWEATHER_AQUI',
  
  // OpenAI API - https://platform.openai.com/api-keys
  // Obtén tu API key en el link de arriba
  OPENAI: 'TU_API_KEY_DE_OPENAI_AQUI',
};

// URLs base de APIs
export const API_URLS = {
  OPENWEATHER: 'https://api.openweathermap.org/data/2.5',
  OPENAI: 'https://api.openai.com/v1',
};

// Configuración por defecto
export const DEFAULTS = {
  // Ubicación por defecto para el clima (puedes cambiarla)
  WEATHER_LAT: -34.6037,  // Buenos Aires
  WEATHER_LON: -58.3816,
  WEATHER_CITY: 'Buenos Aires',
  
  // Modelo de OpenAI a usar
  OPENAI_MODEL: 'gpt-3.5-turbo',
};
