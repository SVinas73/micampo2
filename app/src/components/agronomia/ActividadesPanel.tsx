import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Actividad } from '@/types';

interface ActividadesPanelProps {
  actividades: Actividad[];
  className?: string;
}

const tipoConfig = {
  labor: { color: 'bg-[#1B4D3E]', icon: '🔧' },
  alerta: { color: 'bg-[#E74C3C]', icon: '⚠️' },
  monitoreo: { color: 'bg-[#3498DB]', icon: '📊' },
  clima: { color: 'bg-[#F39C12]', icon: '🌤️' },
  sistema: { color: 'bg-[#9B59B6]', icon: '🤖' },
};

export function ActividadesPanel({ actividades, className }: ActividadesPanelProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]",
      className
    )}>
      <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white mb-4">
        Últimas Actividades
      </h3>

      <div className="space-y-4">
        {actividades.map((actividad) => {
          const config = tipoConfig[actividad.tipo];
          
          return (
            <div key={actividad.id} className="flex items-start gap-3">
              {actividad.usuario ? (
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#1B4D3E] text-white text-sm">
                    {actividad.usuario.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-lg",
                  config.color
                )}>
                  {config.icon}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#2D3436] dark:text-white">
                  <span className="font-medium">{actividad.usuario || 'Sistema'}</span>{' '}
                  <span className="text-[#636E72] dark:text-[#B2BEC3]">{actividad.descripcion}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#95A5A6] dark:text-[#636E72]">
                    {actividad.fecha} • {actividad.hora}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}