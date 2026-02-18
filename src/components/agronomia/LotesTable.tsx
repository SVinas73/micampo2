import { 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  Bug, 
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Lote } from '@/types';

interface LotesTableProps {
  lotes: Lote[];
  className?: string;
}

const estadoConfig: Record<string, { color: string; icon: React.ElementType }> = {
  SALUDABLE: { color: 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20', icon: CheckCircle2 },
  VIGILANCIA: { color: 'bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/20', icon: AlertCircle },
  TRATAMIENTO: { color: 'bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20', icon: AlertTriangle },
};

export function LotesTable({ lotes, className }: LotesTableProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-[#2D3436] rounded-2xl border border-[#E5E5E5] dark:border-[#404040] overflow-hidden",
      className
    )}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F9FA] dark:bg-[#404040]">
            <tr>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Identidad
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Cultivo
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Finanzas
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Salud
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Monitoreo
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Proyección
              </th>
              <th className="text-left text-xs font-semibold text-[#636E72] dark:text-[#B2BEC3] uppercase tracking-wider px-6 py-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#404040]">
            {lotes.map((lote) => {
              const estado = estadoConfig[lote.estado || 'SALUDABLE'];
              const EstadoIcon = estado.icon;

              return (
                <tr
                  key={lote.id}
                  className="hover:bg-[#F8F9FA] dark:hover:bg-[#404040]/50 transition-colors"
                >
                  {/* Identidad */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#1B4D3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sprout className="w-5 h-5 text-[#1B4D3E]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#95A5A6] dark:text-[#636E72] uppercase tracking-wide">
                          {lote.campo || 'ESTANCIA LA SOÑADA'}
                        </p>
                        <h4 className="font-semibold text-[#2D3436] dark:text-white flex items-center gap-1">
                          <span className="text-[#E74C3C]">📍</span>
                          {lote.nombre}
                        </h4>
                        <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">
                          {lote.hectareas} Hectáreas
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cultivo */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌽</span>
                        <span className="font-medium text-[#2D3436] dark:text-white">
                          {lote.cultivo || 'Maíz Tardío'}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs bg-[#F8F9FA] dark:bg-[#404040]">
                        {lote.estadoFenologico || 'V6 - Vegetativo'}
                      </Badge>
                      <p className="text-xs text-[#95A5A6] dark:text-[#636E72]">
                        🧬 Genética: {lote.variedad || 'DK-7210'}
                      </p>
                    </div>
                  </td>

                  {/* Finanzas */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#E5E5E5] dark:bg-[#404040] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3498DB] rounded-full"
                            style={{ width: `${Math.min(((lote.costoPorHectarea || 260) / 400) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-[#636E72] dark:text-[#B2BEC3]">
                          {Math.round(((lote.costoPorHectarea || 260) / 400) * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-[#2D3436] dark:text-white">
                        ${lote.costoPorHectarea || 260} / ${lote.inversionTotal || 400} USD
                      </p>
                      <p className={cn(
                        "text-xs font-medium",
                        (lote.margenBruto || 140) > 0 ? "text-[#27AE60]" : "text-[#E74C3C]"
                      )}>
                        Disp: ${lote.margenBruto || 140}/Ha
                      </p>
                    </div>
                  </td>

                  {/* Salud */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#27AE60]" />
                        <span className="text-sm text-[#2D3436] dark:text-white">
                          NDVI {lote.ndvi && lote.ndvi > 0.7 ? 'Alto' : 'Medio'}
                        </span>
                        {lote.ndvi && lote.ndvi > 0.5 && (
                          <TrendingUp className="w-3 h-3 text-[#27AE60]" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#636E72] dark:text-[#B2BEC3]">
                        <Droplets className="w-4 h-4" />
                        Agua: {lote.aguaUtil || 60}%
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#95A5A6]" />
                        <span className="text-[#636E72] dark:text-[#B2BEC3]">
                          Visita: {lote.ultimoRiego || 'Hace 2 días'}
                        </span>
                      </div>
                      <Badge className={cn("text-xs", estado.color)}>
                        <EstadoIcon className="w-3 h-3 mr-1" />
                        {lote.plagasDetectadas && lote.plagasDetectadas > 0 ? (
                          <><Bug className="w-3 h-3 mr-1" /> {lote.plagasDetectadas} Plaga(s)</>
                        ) : (
                          lote.estado || 'SALUDABLE'
                        )}
                      </Badge>
                    </div>
                  </td>

                  {/* Monitoreo */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-[#2D3436] dark:text-white">
                        {lote.rendimientoEst || 9.5} Tn/Ha
                      </p>
                      <div className="flex items-center gap-1 text-xs">
                        {(lote.rendimientoEst || 9.5) > 8 ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-[#27AE60]" />
                            <span className="text-[#27AE60]">+5% vs Prom</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-3 h-3 text-[#E74C3C]" />
                            <span className="text-[#E74C3C]">-2% vs Prom</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-[#95A5A6] dark:text-[#636E72]">
                        📅 Est: {lote.fechaCosechaEst || '15/Mar'}
                      </p>
                    </div>
                  </td>

                  {/* Proyección - columna vacía del original, la mantenemos */}
                  <td className="px-6 py-4" />

                  {/* Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-full"
                      >
                        <span className="mr-1">+</span> Tarea
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                          <DropdownMenuItem>Historial</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}