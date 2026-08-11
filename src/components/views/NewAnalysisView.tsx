import React, { useState } from 'react';
import {
  FlaskConical,
  Bluetooth,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { SampleInfo, SensorFingerprint } from '../../types/chemist';
import { DEMO_SAMPLES_PRESETS } from '../../data/chemicals';

interface NewAnalysisViewProps {
  onRunAnalysis: (sampleInfo: SampleInfo, sensorData: SensorFingerprint) => void;
  isDarkMode: boolean;
}

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  onRunAnalysis,
  isDarkMode,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Form state
  const [sampleId, setSampleId] = useState(`SMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [sampleName, setSampleName] = useState('Laboratory Ethanol Sample');
  const [batchNumber, setBatchNumber] = useState('BATCH-2026-A');
  const [source, setSource] = useState('Chemical Research Cell A');
  const [operator, setOperator] = useState('Dr. S. Vance');
  const [notes, setNotes] = useState('Sample collected for E-Tongue fingerprint verification.');

  // Device & Mode State
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Current live sensor values
  const [sensorValues, setSensorValues] = useState<SensorFingerprint>({
    ph: 6.82,
    ec: 0.12,
    tds: 60,
    temperature: 25.0,
    colorRgb: { r: 245, g: 248, b: 252 },
    voc: 680,
  });

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const preset = DEMO_SAMPLES_PRESETS[index];
    setSampleName(preset.name);
    setSensorValues(preset.sensorData);
  };

  const handleStartAnalysis = () => {
    const info: SampleInfo = {
      sampleId,
      sampleName,
      batchNumber,
      source,
      operator,
      notes,
      timestamp: new Date().toISOString(),
      isDemoMode,
    };
    onRunAnalysis(info, sensorValues);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Workflow Steps Indicator */}
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <FlaskConical className="w-5 h-5 text-[#4F8F3A]" />
            New Chemical Sample Analysis
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Record sample metadata, stream live E-Tongue sensor readings, and run ChemistAI identification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold font-tight ${
              step === 1
                ? 'bg-[#4F8F3A] text-white border-[#4F8F3A]'
                : isDarkMode
                ? 'bg-[#151515] text-[#9AA397] border-[#292D29]'
                : 'bg-[#F6F7F3] text-[#667064] border-[#DDE5D8]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              1
            </span>
            Sample Metadata
          </div>

          <div className={`w-4 h-px ${isDarkMode ? 'bg-[#292D29]' : 'bg-[#DDE5D8]'}`} />

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold font-tight ${
              step === 2
                ? 'bg-[#4F8F3A] text-white border-[#4F8F3A]'
                : isDarkMode
                ? 'bg-[#151515] text-[#9AA397] border-[#292D29]'
                : 'bg-[#F6F7F3] text-[#667064] border-[#DDE5D8]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              2
            </span>
            Connect & Read Sensors
          </div>
        </div>
      </div>

      {/* STEP 1: SAMPLE INFORMATION */}
      {step === 1 && (
        <div
          className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <h3 className="text-sm font-bold font-tight">Step 1 — Chemical Sample Information</h3>
            <span className={`text-xs font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Date: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Sample ID
              </label>
              <input
                type="text"
                value={sampleId}
                onChange={(e) => setSampleId(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-lg border font-mono outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Sample Name / Description
              </label>
              <input
                type="text"
                value={sampleName}
                onChange={(e) => setSampleName(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Batch Number
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-lg border font-mono outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Source / Origin
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Operator Name
              </label>
              <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Analysis Date & Time
              </label>
              <input
                type="text"
                readOnly
                value={new Date().toLocaleString()}
                className={`w-full p-2.5 text-xs rounded-lg border font-mono ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064]'
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`block text-xs font-bold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Laboratory Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>
          </div>

          <div className={`flex justify-end pt-4 border-t ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-sm flex items-center gap-2 font-tight"
            >
              Proceed to E-Tongue Connection →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CONNECT E-TONGUE & READ SENSORS */}
      {step === 2 && (
        <div
          className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          {/* Demo Mode Notice Banner */}
          {isDemoMode && (
            <div className="p-3 bg-[#D97706]/10 border border-[#D97706]/30 rounded-xl flex items-center justify-between text-xs text-[#D97706]">
              <div className="flex items-center gap-2 font-bold font-tight">
                <AlertCircle className="w-4 h-4 text-[#D97706]" />
                <span>DEMO MODE ACTIVE — SIMULATED SENSOR READINGS</span>
              </div>
              <span className="text-[10px] font-mono bg-[#D97706]/20 px-2 py-0.5 rounded font-bold">
                SIMULATED DATA — NOT REAL HARDWARE
              </span>
            </div>
          )}

          {/* E-Tongue Hardware Connectivity Bar */}
          <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] rounded-lg">
                <Bluetooth className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold flex items-center gap-2 font-tight">
                  Chemist AI E-Tongue (ESP32)
                  <span className="w-2 h-2 rounded-full bg-[#4F8F3A] animate-pulse-glow" />
                </h4>
                <p className={`text-[11px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                  Device ID: ESP32-ETONGUE-88A | BLE Signal: -64 dBm | Battery: 92%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors font-tight ${
                  isDemoMode
                    ? 'bg-[#D97706]/20 text-[#D97706] border-[#D97706]/40'
                    : 'bg-[#24451F] text-[#78A85A] border-[#4F8F3A]/40'
                }`}
              >
                {isDemoMode ? 'Toggle Direct Mode' : 'Toggle Demo Mode'}
              </button>
            </div>
          </div>

          {/* Preset Sample Selector in Demo Mode */}
          {isDemoMode && (
            <div>
              <label className={`block text-xs font-bold mb-2 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Select Chemical Preset Sample for Hardware Simulation:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEMO_SAMPLES_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(idx)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      selectedPresetIndex === idx
                        ? 'bg-[#24451F] border-[#4F8F3A] text-white shadow-xs'
                        : isDarkMode
                        ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                        : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="block font-bold truncate font-tight">{preset.name}</span>
                    <span className="block text-[10px] font-mono text-[#4F8F3A] mt-0.5">
                      pH {preset.sensorData.ph} | EC {preset.sensorData.ec} mS
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Measured Sensor Telemetry Gauges */}
          <div>
            <h4 className="text-xs font-bold mb-3 flex items-center justify-between font-tight">
              <span>Current Measured E-Tongue Fingerprint</span>
              <span className="text-[10px] text-[#4F8F3A] font-mono font-bold">● LIVE TELEMETRY</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>pH Level</span>
                <span className="text-xl font-bold font-mono text-[#4F8F3A] block mt-1">
                  {sensorValues.ph.toFixed(2)}
                </span>
                <span className="text-[9px] text-[#667064] font-mono">ADS1115</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>EC Conduct</span>
                <span className="text-xl font-bold font-mono block mt-1">
                  {sensorValues.ec.toFixed(2)}
                </span>
                <span className="text-[9px] text-[#667064] font-mono">mS/cm</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>TDS Conc</span>
                <span className="text-xl font-bold font-mono block mt-1">
                  {sensorValues.tds}
                </span>
                <span className="text-[9px] text-[#667064] font-mono">ppm</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Temperature</span>
                <span className="text-xl font-bold font-mono text-[#4F8F3A] block mt-1">
                  {sensorValues.temperature.toFixed(1)}°C
                </span>
                <span className="text-[9px] text-[#667064] font-mono">DS18B20</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Color RGB</span>
                <div
                  className="w-4 h-4 mx-auto my-1 rounded border border-[#667064]"
                  style={{
                    backgroundColor: `rgb(${sensorValues.colorRgb.r}, ${sensorValues.colorRgb.g}, ${sensorValues.colorRgb.b})`,
                  }}
                />
                <span className="text-[9px] text-[#667064] font-mono">TCS3200</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>VOC Gas</span>
                <span className="text-xl font-bold font-mono text-[#78A85A] block mt-1">
                  {sensorValues.voc}
                </span>
                <span className="text-[9px] text-[#667064] font-mono">MQ-135</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <button
              onClick={() => setStep(1)}
              className={`px-4 py-2 rounded-lg border text-xs font-bold transition-colors font-tight ${
                isDarkMode
                  ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                  : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
              }`}
            >
              ← Back to Metadata
            </button>

            <button
              onClick={handleStartAnalysis}
              className="px-6 py-3 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-md flex items-center gap-2 font-tight"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Run AI Chemical Classification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

