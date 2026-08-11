import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Play, Pause, Download, Activity } from 'lucide-react';
import { SensorFingerprint } from '../../types/chemist';

interface LiveSensorsViewProps {
  isDarkMode: boolean;
}

export const LiveSensorsView: React.FC<LiveSensorsViewProps> = ({ isDarkMode }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [dataPoints, setDataPoints] = useState<
    (SensorFingerprint & { timeStr: string })[]
  >([]);

  useEffect(() => {
    // Generate initial live telemetry buffer
    const initialData = Array.from({ length: 15 }, (_, i) => {
      const now = new Date(Date.now() - (15 - i) * 1000);
      return {
        ph: Number((6.8 + Math.sin(i / 2) * 0.08).toFixed(2)),
        ec: Number((0.12 + Math.cos(i / 3) * 0.02).toFixed(2)),
        tds: Math.round(60 + Math.sin(i / 2) * 4),
        temperature: Number((25.0 + Math.sin(i / 4) * 0.2).toFixed(1)),
        colorRgb: { r: 245, g: 248, b: 252 },
        voc: Math.round(680 + Math.sin(i / 2) * 20),
        timeStr: now.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
      };
    });
    setDataPoints(initialData);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });

      setDataPoints((prev) => {
        const last = prev[prev.length - 1] || {
          ph: 6.82,
          ec: 0.12,
          tds: 60,
          temperature: 25.0,
          colorRgb: { r: 245, g: 248, b: 252 },
          voc: 680,
        };

        const newPoint = {
          ph: Number((last.ph + (Math.random() - 0.5) * 0.04).toFixed(2)),
          ec: Number(Math.max(0.01, last.ec + (Math.random() - 0.5) * 0.01).toFixed(2)),
          tds: Math.max(10, Math.round(last.tds + (Math.random() - 0.5) * 2)),
          temperature: Number((25.0 + (Math.random() - 0.5) * 0.1).toFixed(1)),
          colorRgb: { r: 245, g: 248, b: 252 },
          voc: Math.max(100, Math.round(last.voc + (Math.random() - 0.5) * 10)),
          timeStr,
        };

        return [...prev.slice(1), newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const latest = dataPoints[dataPoints.length - 1] || {
    ph: 6.82,
    ec: 0.12,
    tds: 60,
    temperature: 25.0,
    colorRgb: { r: 245, g: 248, b: 252 },
    voc: 680,
  };

  const exportCsv = () => {
    const headers = 'Timestamp,pH,EC(mS/cm),TDS(ppm),Temp(C),VOC\n';
    const rows = dataPoints
      .map((d) => `${d.timeStr},${d.ph},${d.ec},${d.tds},${d.temperature},${d.voc}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ETongue_LiveTelemetry_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Controls Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <Activity className="w-5 h-5 text-[#4F8F3A]" />
            Real-Time E-Tongue Sensor Telemetry
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            High-frequency multi-channel data stream from ESP32 ADC (pH, EC, Temp, RGB, VOC)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 font-tight transition-colors ${
              isRunning
                ? 'bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40'
                : 'bg-[#4F8F3A] text-white hover:bg-[#3F762F]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Telemetry
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Resume Stream
              </>
            )}
          </button>

          <button
            onClick={exportCsv}
            className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center gap-2 font-tight ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Numeric Live Sensor Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>pH Sensor</span>
          <span className="text-2xl font-black font-mono text-[#4F8F3A] mt-1 block">
            {latest.ph.toFixed(2)}
          </span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Electrode ADS1115</span>
        </div>

        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>EC Conduct</span>
          <span className="text-2xl font-black font-mono mt-1 block">
            {latest.ec.toFixed(2)}
          </span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>mS/cm</span>
        </div>

        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>TDS Salt</span>
          <span className="text-2xl font-black font-mono mt-1 block">
            {latest.tds}
          </span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>ppm eq</span>
        </div>

        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Temperature</span>
          <span className="text-2xl font-black font-mono text-[#78A85A] mt-1 block">
            {latest.temperature.toFixed(1)}°C
          </span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>DS18B20</span>
        </div>

        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Color RGB</span>
          <div
            className={`w-5 h-5 mx-auto my-1.5 rounded border shadow-inner ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}
            style={{
              backgroundColor: `rgb(${latest.colorRgb.r}, ${latest.colorRgb.g}, ${latest.colorRgb.b})`,
            }}
          />
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>TCS3200</span>
        </div>

        <div
          className={`p-4 rounded-xl border text-center ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <span className={`text-[10px] block font-bold uppercase font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>MQ-135 VOC</span>
          <span className="text-2xl font-black font-mono text-[#78A85A] mt-1 block">
            {latest.voc}
          </span>
          <span className={`text-[9px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>VOC Volatile</span>
        </div>
      </div>

      {/* Real-time Line Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* pH & EC Telemetry Chart */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-tight">pH Electrode & EC Conductivity Stream</h3>
            <span className="text-[10px] text-[#4F8F3A] font-mono font-bold">1 Hz Sampling</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#292D29' : '#DDE5D8'} />
                <XAxis dataKey="timeStr" stroke={isDarkMode ? '#9AA397' : '#667064'} fontSize={10} />
                <YAxis yAxisId="left" domain={[0, 14]} stroke="#4F8F3A" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#78A85A" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#151515' : '#FFFFFF',
                    borderColor: isDarkMode ? '#292D29' : '#DDE5D8',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ph"
                  stroke="#4F8F3A"
                  strokeWidth={2}
                  dot={false}
                  name="pH Level"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ec"
                  stroke="#78A85A"
                  strokeWidth={2}
                  dot={false}
                  name="EC (mS/cm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* VOC Gas & Temperature Telemetry Chart */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-tight">MQ-135 VOC & Temperature Stream</h3>
            <span className="text-[10px] text-[#78A85A] font-mono font-bold">DS18B20 Sync</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#292D29' : '#DDE5D8'} />
                <XAxis dataKey="timeStr" stroke={isDarkMode ? '#9AA397' : '#667064'} fontSize={10} />
                <YAxis yAxisId="left" domain={[0, 1500]} stroke="#78A85A" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" domain={[15, 35]} stroke="#4F8F3A" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#151515' : '#FFFFFF',
                    borderColor: isDarkMode ? '#292D29' : '#DDE5D8',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="voc"
                  stroke="#78A85A"
                  strokeWidth={2}
                  dot={false}
                  name="VOC Response"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#4F8F3A"
                  strokeWidth={2}
                  dot={false}
                  name="Temp (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

