import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
  className?: string;
  onClick?: () => void;
}

const colorVariants = {
  green: 'bg-[#1B4D3E]/10 text-[#1B4D3E] border-[#1B4D3E]/20',
  yellow: 'bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/20',
  red: 'bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20',
  blue: 'bg-[#3498DB]/10 text-[#3498DB] border-[#3498DB]/20',
  gray: 'bg-[#95A5A6]/10 text-[#95A5A6] border-[#95A5A6]/20',
};

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = 'gray',
  className,
  onClick,
}: MetricCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white dark:bg-[#2D3436] rounded-2xl p-5 border border-[#E5E5E5] dark:border-[#404040] shadow-sm",
        "hover:shadow-md transition-all duration-200",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#636E72] dark:text-[#B2BEC3] mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-[#2D3436] dark:text-white">{value}</h3>
          
          {subtitle && (
            <p className="text-xs text-[#95A5A6] dark:text-[#636E72] mt-1">{subtitle}</p>
          )}
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && <TrendingUp className="w-3 h-3 text-[#27AE60]" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 text-[#E74C3C]" />}
              {trend === 'neutral' && <Minus className="w-3 h-3 text-[#95A5A6]" />}
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' && "text-[#27AE60]",
                trend === 'down' && "text-[#E74C3C]",
                trend === 'neutral' && "text-[#95A5A6]"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            colorVariants[color]
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}


