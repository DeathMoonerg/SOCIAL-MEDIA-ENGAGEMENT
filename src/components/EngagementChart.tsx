import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EngagementData {
  date: string;
  engagement: number;
}

interface EngagementChartProps {
  data: EngagementData[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#1a73e8"
            strokeWidth={2}
            dot={{ fill: '#1a73e8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 