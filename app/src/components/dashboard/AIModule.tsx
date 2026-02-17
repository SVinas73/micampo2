import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Trash2,
  Sprout,
  Beef,
  Cloud,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAI } from '@/hooks/useAI';

const quickQuestions = [
  { icon: Sprout, text: '¿Qué rinde estiman mis lotes?' },
  { icon: Beef, text: '¿Cuántos litros de leche produzco?' },
  { icon: Cloud, text: '¿Debo regar hoy?' },
  { icon: TrendingUp, text: '¿Qué insumos están bajos?' },
];

export default function AIModule() {
  const { messages, loading, sendMessage, clearMessages } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    await sendMessage(input);
    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#4f46e5] rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D3436]">MiCampo AI</h2>
            <p className="text-sm text-[#2D3436]/50">Tu asistente inteligente de campo</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearMessages}
          className="text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Limpiar
        </Button>
      </div>

      {/* Quick questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickQuestions.map((q) => (
          <button
            key={q.text}
            onClick={() => handleQuickQuestion(q.text)}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-full text-sm text-[#2D3436]/70 hover:bg-[#1B4D3E] hover:text-white transition-colors shadow-sm"
          >
            <q.icon className="w-4 h-4" />
            {q.text}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-[#1B4D3E]' 
                    : 'bg-gradient-to-br from-[#6366F1] to-[#4f46e5]'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div 
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-[#1B4D3E] text-white rounded-tr-sm'
                    : 'bg-[#F5F2ED] text-[#2D3436] rounded-tl-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/50' : 'text-[#2D3436]/40'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#4f46e5] rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#F5F2ED] p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[#2D3436]/10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6366F1]" />
              <Input
                placeholder="Pregúntame sobre tu campo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-10 pr-4 py-6 rounded-xl border-[#2D3436]/10 focus:border-[#6366F1] focus:ring-[#6366F1]"
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-[#6366F1] hover:bg-[#4f46e5] text-white rounded-xl px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-[#2D3436]/40 mt-2 text-center">
            MiCampo AI puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </div>
    </div>
  );
}
