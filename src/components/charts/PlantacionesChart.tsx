import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface PlantacionesChartProps {
  data: DataPoint[];
  height?: number;
}

const defaultData: DataPoint[] = [
  { name: 'Sorgo', value: 120, color: '#27AE60' },
  { name: 'Alfalfa', value: 45, color: '#27AE60' },
  { name: 'Soja', value: 30, color: '#27AE60' },
  { name: 'Maíz', value: 25, color: '#27AE60' },
  { name: 'Trigo', value: 100, color: '#27AE60' },
  { name: 'Girasol', value: 75, color: '#27AE60' },
  { name: 'Trébol', value: 20, color: '#27AE60' },
  { name: 'Vacío', value: 20, color: '#27AE60' },
  { name: 'Seco', value: 5, color: '#27AE60' },
];

export function PlantacionesChart({ data = defaultData, height = 300 }: PlantacionesChartProps) {
  return (
    <div className="w-full bg-white dark:bg-[#2D3436] rounded-2xl p-6 border border-[#E5E5E5] dark:border-[#404040]">
      <h3 className="text-lg font-semibold text-[#2D3436] dark:text-white mb-6">
        Tipos de Plantaciones
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#636E72', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#636E72', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#F5F2ED' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E5E5',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => [`${value} ha`, 'Hectáreas']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlantacionesChart;


