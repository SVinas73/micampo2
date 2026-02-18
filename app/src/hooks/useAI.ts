import { useState, useCallback } from 'react';
import { API_KEYS, API_URLS, DEFAULTS } from '@/config/api';
import { useFarm } from '@/context/FarmContext';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de MiCampo. Puedo ayudarte con información sobre tus lotes, animales, clima, y responder preguntas sobre tu operación. ¿Qué necesitas saber?',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data } = useFarm();

  const sendMessage = useCallback(async (content: string) => {
    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Preparar contexto de la finca
      const farmContext = `
        Contexto de la finca:
        - Lotes: ${data.lotes.map(l => `${l.nombre} (${l.hectareas} ha, ${l.cultivo || 'Sin cultivo'}, NDVI: ${l.ndvi || 'N/A'})`).join('; ')}
        - Animales: ${data.animales.length} animales registrados
        - Insumos: ${data.insumos.map(i => `${i.nombre}: ${i.cantidad} ${i.unidad}`).join('; ')}
        - Tareas pendientes: ${data.tareas.filter(t => t.estado !== 'completada').length}
      `;

      // Verificar si la API key está configurada
      if (API_KEYS.OPENAI === 'TU_API_KEY_DE_OPENAI_AQUI') {
        // Modo demo: respuestas simuladas
        await simulateDemoResponse(content);
        return;
      }

      const response = await fetch(`${API_URLS.OPENAI}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS.OPENAI}`,
        },
        body: JSON.stringify({
          model: DEFAULTS.OPENAI_MODEL,
          messages: [
            {
              role: 'system',
              content: `Eres un asistente experto en agricultura y ganadería llamado MiCampo AI. Tienes acceso a los datos de la finca del usuario. Responde de manera concisa y práctica, enfocándote en ayudar con decisiones operativas. ${farmContext}`,
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la IA');
      }

      const data_response = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data_response.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Agregar mensaje de error
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, verifica tu conexión e intenta nuevamente.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, data]);

  // Función para simular respuestas en modo demo
  const simulateDemoResponse = async (query: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerQuery = query.toLowerCase();
    let response = '';

    // Respuestas predefinidas basadas en palabras clave
    if (lowerQuery.includes('lote') && lowerQuery.includes('rendimiento')) {
      const lote = data.lotes[0];
      response = `Basándome en los datos del ${lote.nombre}, con un NDVI de ${lote.ndvi} y ${lote.hectareas} hectáreas de ${lote.cultivo}, estimo un rendimiento potencial de ${Math.round(lote.hectareas * (lote.ndvi || 0.7) * 35)} kg. Te recomiendo monitorear la humedad del suelo para optimizar el riego.`;
    } else if (lowerQuery.includes('animal') || lowerQuery.includes('vaca')) {
      const produccionTotal = data.animales.reduce((sum, a) => sum + (a.produccionLeche || 0), 0);
      response = `Tienes ${data.animales.length} animales registrados. La producción total de leche es de ${produccionTotal} litros/día. El animal con RFID ${data.animales[0]?.rfid} está produciendo ${data.animales[0]?.produccionLeche}L diarios.`;
    } else if (lowerQuery.includes('insumo') || lowerQuery.includes('stock')) {
      const insumosBajos = data.insumos.filter(i => i.cantidad < i.stockMinimo);
      if (insumosBajos.length > 0) {
        response = `⚠️ Alerta: Los siguientes insumos están por debajo del stock mínimo: ${insumosBajos.map(i => `${i.nombre} (${i.cantidad} ${i.unidad})`).join(', ')}. Te recomiendo hacer un pedido pronto.`;
      } else {
        response = `Todos los insumos están en niveles adecuados. Tienes: ${data.insumos.map(i => `${i.nombre}: ${i.cantidad} ${i.unidad}`).join(', ')}.`;
      }
    } else if (lowerQuery.includes('tarea') || lowerQuery.includes('pendiente')) {
      const tareasPendientes = data.tareas.filter(t => t.estado !== 'completada');
      response = `Tienes ${tareasPendientes.length} tareas pendientes: ${tareasPendientes.map(t => `${t.titulo} (${t.estado})`).join(', ')}.`;
    } else if (lowerQuery.includes('clima') || lowerQuery.includes('pronostico')) {
      response = `Te recomiendo revisar el módulo de Clima para ver el pronóstico detallado. En general, las condiciones parecen favorables para las labores de campo en los próximos días.`;
    } else if (lowerQuery.includes('hola') || lowerQuery.includes('buenos')) {
      response = '¡Hola! ¿En qué puedo ayudarte hoy con tu operación?';
    } else {
      response = `Entiendo tu consulta sobre "${query}". Como asistente de MiCampo, puedo ayudarte con información sobre tus lotes, animales, insumos, tareas y clima. ¿Te gustaría que profundice en algún aspecto específico de tu operación?`;
    }

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  const clearMessages = useCallback(() => {
    setMessages([{
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de MiCampo. ¿En qué puedo ayudarte?',
      timestamp: new Date(),
    }]);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
}
