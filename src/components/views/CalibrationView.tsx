import React, { useState } from 'react';
import { SlidersHorizontal, Play } from 'lucide-react';

interface CalibrationViewProps {
  isDarkMode: boolean;
}

export const CalibrationView: React.FC<CalibrationViewProps> = ({ isDarkMode }) => {
  const [calibratingChannel, setCalibratingChannel] = useState<string | null>(null);

  const [sensorStatus, setSensorStatus] = useState({
    ph: { lastCal: '2026-08-07 14:20', status: 'Calibrated', offset: '+0.02 pH' },
    ec: { lastCal: '2026-08-07 14:22', status: 'Calibrated', offset: '1.002 K-factor' },
    temp: { lastCal: '2026-08-06 09:10', status: 'Calibrated', offset: '-0.1 °C' },
    color: { lastCal: '2026-08-05 11:45', status: 'Calibrated', offset: 'RGB White Balanced' },
    voc: { lastCal: '2026-08-07 14:25', status: 'Calibrated', offset: 'Ro 10.4 kOhm' },
  });

  const handleCalibrateChannel = (channel: string) => {
    setCalibratingChannel(channel);
    setTimeout(() => {
      setSensorStatus((prev) => ({
        ...prev,
        [channel]: {
          ...prev[channel as keyof typeof prev],
          lastCal: new Date().toLocaleString(),
          status: 'Calibrated',
        },
      }));
      setCalibratingChannel(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <SlidersHorizontal className="w-5 h-5 text-[#4F8F3A]" />
            E-Tongue Sensor Calibration Workspace
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Calibrate pH electrode buffer curves, conductivity cell constants, and gas baseline offsets
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* pH Sensor Calibration */}
        <div
          className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-tight">1. pH Glass Electrode (ADS1115 Ch0)</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-bold font-tight">
                {sensorStatus.ph.status}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Standard 2-Point Buffer Calibration (pH 4.01 & pH 7.00)
            </p>
            <p className={`text-[11px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Last Calibrated: {sensorStatus.ph.lastCal} | Zero Offset: {sensorStatus.ph.offset}
            </p>
          </div>

          <button
            onClick={() => handleCalibrateChannel('ph')}
            disabled={calibratingChannel === 'ph'}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight"
          >
            {calibratingChannel === 'ph' ? (
              'Calibrating Buffer...'
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Calibrate pH Buffer
              </>
            )}
          </button>
        </div>

        {/* EC Sensor Calibration */}
        <div
          className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-tight">2. EC / TDS Cell Constant</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-bold font-tight">
                {sensorStatus.ec.status}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              K-Factor Standard Calibration Solution (1413 µS/cm KCl)
            </p>
            <p className={`text-[11px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Last Calibrated: {sensorStatus.ec.lastCal} | Cell Constant K: {sensorStatus.ec.offset}
            </p>
          </div>

          <button
            onClick={() => handleCalibrateChannel('ec')}
            disabled={calibratingChannel === 'ec'}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight"
          >
            {calibratingChannel === 'ec' ? (
              'Calibrating Cell...'
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Calibrate K-Factor
              </>
            )}
          </button>
        </div>

        {/* Temperature Sensor Calibration */}
        <div
          className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-tight">3. DS18B20 Temperature Probe</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-bold font-tight">
                {sensorStatus.temp.status}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Ice-Bath Zero Point Thermal Offset Adjustment (0.0°C)
            </p>
            <p className={`text-[11px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Last Calibrated: {sensorStatus.temp.lastCal} | Temp Shift: {sensorStatus.temp.offset}
            </p>
          </div>

          <button
            onClick={() => handleCalibrateChannel('temp')}
            disabled={calibratingChannel === 'temp'}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight"
          >
            {calibratingChannel === 'temp' ? (
              'Calibrating Ice Point...'
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Zero Thermal Probe
              </>
            )}
          </button>
        </div>

        {/* TCS3200 Color Calibration */}
        <div
          className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-tight">4. TCS3200 Color Sensor</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-bold font-tight">
                {sensorStatus.color.status}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Deionized Water White Balance Reflectance Standard
            </p>
            <p className={`text-[11px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Last Calibrated: {sensorStatus.color.lastCal} | Gain: {sensorStatus.color.offset}
            </p>
          </div>

          <button
            onClick={() => handleCalibrateChannel('color')}
            disabled={calibratingChannel === 'color'}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight"
          >
            {calibratingChannel === 'color' ? (
              'White Balancing...'
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> White Balance RGB
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

