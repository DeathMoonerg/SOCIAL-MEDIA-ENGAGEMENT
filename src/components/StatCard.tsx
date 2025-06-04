import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
  timeRange: string;
}

export default function StatCard({ title, value, icon, change, timeRange }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
      <p className="text-sm text-green-600 mt-2">{change} from last {timeRange}</p>
    </div>
  );
} 