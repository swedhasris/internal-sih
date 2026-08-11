import React, { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode }) => {
  const [labName, setLabName] = useState('Central Chemical Analytics Laboratory');
  const [operator, setOperator] = useState('Dr. S. Vance');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <Settings className="w-5 h-5 text-[#4F8F3A]" />
            Chemist AI System Settings
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Configure laboratory metadata, AI confidence thresholds, thermal units, and reporting defaults
          </p>
        </div>
      </div>

      <div
        className={`p-6 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        {saved && (
          <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/50 text-[#78A85A] rounded-xl text-xs font-semibold flex items-center gap-2 font-tight">
            <CheckCircle2 className="w-4 h-4 text-[#4F8F3A]" /> System preferences saved successfully!
          </div>
        )}

        {/* Lab Profile Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
            1. Laboratory Profile & Accreditation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Laboratory Facility Name
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border outline-none font-tight ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Default Lead Analyst / Operator
              </label>
              <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border outline-none font-tight ${
                  isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                    : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* AI & Measurement Settings */}
        <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <h3 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
            2. AI Classifier Thresholds & Units
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`text-xs font-semibold font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Minimum AI Identification Confidence Threshold
              </label>
              <span className="text-xs font-mono font-bold text-[#4F8F3A]">
                {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-[#4F8F3A]"
            />
            <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Classifications below {confidenceThreshold}% confidence will be flagged as "Low Confidence / Unknown Compound".
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-bold block font-tight">Temperature Scale Unit</span>
              <span className={`text-[11px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>DS18B20 probe reading display unit</span>
            </div>
            <div className={`flex items-center gap-2 p-1 rounded-xl border ${
              isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'
            }`}>
              <button
                onClick={() => setTempUnit('C')}
                className={`px-3 py-1 text-xs font-bold rounded-lg font-tight transition-colors ${
                  tempUnit === 'C' ? 'bg-[#4F8F3A] text-white' : isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'
                }`}
              >
                °Celsius
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-3 py-1 text-xs font-bold rounded-lg font-tight transition-colors ${
                  tempUnit === 'F' ? 'bg-[#4F8F3A] text-white' : isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'
                }`}
              >
                °Fahrenheit
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={`pt-4 border-t flex justify-end ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-xs font-tight"
          >
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

