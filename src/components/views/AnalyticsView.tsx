import React from 'react';
import { BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AnalyticsViewProps {
  isDarkMode: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ isDarkMode }) => {
  const throughputData = [
    { day: 'Mon', samples: 184 },
    { day: 'Tue', samples: 210 },
    { day: 'Wed', samples: 195 },
    { day: 'Thu', samples: 240 },
    { day: 'Fri', samples: 260 },
    { day: 'Sat', samples: 120 },
    { day: 'Sun', samples: 75 },
  ];

  const chemicalDistribution = [
    { name: 'Ethanol', value: 420, color: '#4F8F3A' },
    { name: 'Methanol', value: 280, color: '#78A85A' },
    { name: 'Acetic Acid', value: 210, color: '#3F762F' },
    { name: 'Saline NaCl', value: 190, color: '#9AA397' },
    { name: 'Others', value: 184, color: '#667064' },
  ];

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <BarChart3 className="w-5 h-5 text-[#4F8F3A]" />
            Laboratory Throughput & Sensor Stability Analytics
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Historical identification throughput, compound breakdown, and sensor channel drift metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Throughput Chart */}
        <div
          className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <h3 className="text-sm font-bold mb-4 font-tight">
            Daily Samples Analyzed (7-Day Throughput)
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#292D29' : '#DDE5D8'} />
                <XAxis dataKey="day" stroke={isDarkMode ? '#9AA397' : '#667064'} fontSize={11} />
                <YAxis stroke={isDarkMode ? '#9AA397' : '#667064'} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0A0A0A' : '#FFFFFF',
                    borderColor: isDarkMode ? '#292D29' : '#DDE5D8',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: isDarkMode ? '#FFFFFF' : '#0A0A0A',
                  }}
                />
                <Bar dataKey="samples" fill="#4F8F3A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Frequent Compounds Chart */}
        <div
          className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <h3 className="text-sm font-bold mb-4 font-tight">
            Identified Chemical Class Distribution
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chemicalDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {chemicalDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

