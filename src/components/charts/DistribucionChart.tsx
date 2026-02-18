import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface DistribucionChartProps {
  data: DataPoint[];
  total: number;
  unit?: string;
  height?: number;
}

const defaultData: DataPoint[] = [
  { name: 'Maíz', value: 120, color: '#27AE60' },
  { name: 'Soja', value: 85, color: '#3498DB' },
  { name: 'Sorgo', value: 30, color: '#F39C12' },
];

export function DistribucionChart({ 
  data = defaultData, 
  total = 235, 
  unit = 'Ha',
  height = 300 
}: DistribucionChartProps) {
  return (
    <div className="w-full bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]">
      <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white mb-2">
        Resumen
      </h3>
      
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E5E5',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value, name) => [`${value} ${unit}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Total Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center mt-20">
            <span className="text-3xl font-bold text-[#2D3436] dark:text-white">{total}</span>
            <p className="text-sm text-[#636E72] dark:text-[#B2BEC3]">{unit} Totales</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="w-full space-y-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-[#2D3436] dark:text-white">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-[#636E72] dark:text-[#B2BEC3]">
                {item.value} {unit} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}