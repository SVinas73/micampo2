import { AlertTriangle, AlertCircle, Info, MapPin, ChevronRight, Cloud, Package, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Alerta } from '@/types';

interface AlertasPanelProps {
  alertas: Alerta[];
  className?: string;
}

const severidadConfig = {
  CRITICA: { 
    color: 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C]',
    icon: AlertTriangle,
    label: 'Crítica'
  },
  ALTA: { 
    color: 'bg-[#F39C12]/10 border-[#F39C12]/20 text-[#F39C12]',
    icon: AlertCircle,
    label: 'Alta'
  },
  MEDIA: { 
    color: 'bg-[#3498DB]/10 border-[#3498DB]/20 text-[#3498DB]',
    icon: Info,
    label: 'Media'
  },
  BAJA: { 
    color: 'bg-[#95A5A6]/10 border-[#95A5A6]/20 text-[#95A5A6]',
    icon: Info,
    label: 'Baja'
  },
};

const tipoConfig: Record<string, { color: string; icon: React.ElementType }> = {
  SANITARIA: { color: 'bg-[#E74C3C]', icon: AlertTriangle },
  CLIMA: { color: 'bg-[#3498DB]', icon: Cloud },
  LOGISTICA: { color: 'bg-[#F39C12]', icon: Package },
  ECONOMICA: { color: 'bg-[#27AE60]', icon: DollarSign },
};

export function AlertasPanel({ alertas, className }: AlertasPanelProps) {
  const alertasPorSeveridad = {
    CRITICA: alertas.filter(a => a.severidad === 'CRITICA'),
    ALTA: alertas.filter(a => a.severidad === 'ALTA'),
    MEDIA: alertas.filter(a => a.severidad === 'MEDIA'),
    BAJA: alertas.filter(a => a.severidad === 'BAJA'),
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white">
          Focos de Atención
        </h3>
        <Badge variant="secondary" className="bg-[#E74C3C]/10 text-[#E74C3C]">
          {alertas.length} activas
        </Badge>
      </div>

      {/* Resumen por severidad */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(alertasPorSeveridad).map(([sev, items]) => items.length > 0 && (
          <Badge 
            key={sev} 
            className={severidadConfig[sev as keyof typeof severidadConfig].color}
          >
            {sev}: {items.length}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {alertas.slice(0, 5).map((alerta) => {
          const config = severidadConfig[alerta.severidad];
          const Icon = config.icon;
          const TipoIcon = tipoConfig[alerta.tipo]?.icon ?? AlertTriangle;
          const tipoColor = tipoConfig[alerta.tipo]?.color ?? 'bg-[#95A5A6]';

          return (
            <div 
              key={alerta.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer",
                config.color
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white",
                  tipoColor
                )}>
                  <TipoIcon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{alerta.titulo}</h4>
                    {alerta.loteNombre && (
                      <span className="text-xs opacity-75 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alerta.loteNombre}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1 opacity-90 line-clamp-2">
                    {alerta.descripcion}
                  </p>
                  
                  {alerta.riesgoEconomico && (
                    <p className="text-xs mt-2 font-medium">
                      Riesgo: ${alerta.riesgoEconomico.toLocaleString()} USD
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <Badge className={cn("text-xs", severidadConfig[alerta.severidad].color)}>
                    <Icon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Ver <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {alertas.length > 5 && (
        <Button variant="ghost" className="w-full mt-4 text-[#1B4D3E]">
          Ver todas las alertas ({alertas.length})
        </Button>
      )}
    </div>
  );
}