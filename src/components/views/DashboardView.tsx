import React from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Cpu,
  Activity,
  ArrowUpRight,
  Sparkles,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { NavigationTab, Chemical, AnalysisResult } from '../../types/chemist';

interface DashboardViewProps {
  setActiveTab: (tab: NavigationTab) => void;
  onSelectResult?: (res: AnalysisResult) => void;
  onSelectChemical: (chem: Chemical) => void;
  recentResults: AnalysisResult[];
  isDarkMode: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onSelectResult,
  onSelectChemical,
  recentResults,
  isDarkMode,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Welcome Hero Banner */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          isDarkMode
            ? 'bg-[#151515] border-[#292D29] text-[#F5F7F3]'
            : 'bg-white border-[#DDE5D8] text-[#0A0A0A] shadow-xs'
        }`}
      >
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] text-xs font-semibold font-tight">
            <Zap className="w-3.5 h-3.5" />
            CHEMIST AI E-Tongue Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-tight">
            CHEMIST <span className="text-[#4F8F3A]">AI</span>
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            AI-Powered Chemical Identification & Molecular Analysis Platform. Real-time multi-sensor telemetry with precision spectral classification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={() => setActiveTab('new-analysis')}
            className="px-5 py-3 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 font-tight"
          >
            <FlaskConical className="w-4 h-4" />
            Start New Analysis
          </button>
          <button
            onClick={() => setActiveTab('live-sensors')}
            className={`px-4 py-3 rounded-lg text-xs font-semibold border flex items-center gap-2 transition-all font-tight ${
              isDarkMode
                ? 'bg-[#1B1B1B] border-[#292D29] text-white hover:bg-[#242922]'
                : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] hover:bg-[#EAEFE8]'
            }`}
          >
            <Activity className="w-4 h-4 text-[#4F8F3A]" />
            Live Sensors
          </button>
        </div>

        {/* Subtle Ambient Decorative Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F8F3A]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Samples */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Samples Tested</span>
            <FlaskConical className="w-4 h-4 text-[#4F8F3A]" />
          </div>
          <p className="text-2xl font-bold mt-2 font-tight">1,284</p>
          <span className="text-[10px] text-[#4F8F3A] font-semibold flex items-center gap-0.5 mt-1 font-mono">
            +12 today
          </span>
        </div>

        {/* Card 2: Identified Chemicals */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Identified</span>
            <CheckCircle2 className="w-4 h-4 text-[#4F8F3A]" />
          </div>
          <p className="text-2xl font-bold mt-2 font-tight">1,247</p>
          <span className={`text-[10px] font-medium mt-1 font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>97.1% success rate</span>
        </div>

        {/* Card 3: AI Confidence */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>AI Confidence</span>
            <Sparkles className="w-4 h-4 text-[#78A85A]" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-extrabold text-[#4F8F3A] font-tight font-mono">94.6%</p>
            <span className="w-2 h-2 rounded-full bg-[#4F8F3A] animate-pulse-glow" />
          </div>
          <span className={`text-[10px] font-medium mt-1 font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>ChemistAI v1.2 Classifier</span>
        </div>

        {/* Card 4: Unknown Samples */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Unknown Samples</span>
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          </div>
          <p className="text-2xl font-bold mt-2 font-tight">37</p>
          <span className="text-[10px] text-[#D97706] font-medium mt-1 font-mono">Requires re-test</span>
        </div>

        {/* Card 5: Reports Generated */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Reports Generated</span>
            <FileCheck2 className="w-4 h-4 text-[#4F8F3A]" />
          </div>
          <p className="text-2xl font-bold mt-2 font-tight">892</p>
          <span className={`text-[10px] font-medium mt-1 font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>PDF / Print ready</span>
        </div>

        {/* Card 6: Device Status */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Device Status</span>
            <Cpu className="w-4 h-4 text-[#4F8F3A]" />
          </div>
          <p className="text-2xl font-bold mt-2 text-[#4F8F3A] flex items-center gap-1.5 font-tight">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F8F3A] animate-pulse-glow" />
            Active
          </p>
          <span className={`text-[10px] font-mono mt-1 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>BLE -64dBm | 92%</span>
        </div>
      </div>

      {/* Main Grid: Device Panel & Recent Chemical Identification Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Chemical Identifications */}
        <div
          className={`lg:col-span-2 p-6 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className={`flex items-center justify-between pb-4 border-b mb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2 font-tight">
                Recent Chemical Identifications
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#24451F] text-[#78A85A] font-mono font-bold">
                  LIVE FEED
                </span>
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                E-Tongue multi-sensor classifications from reference chemical database
              </p>
            </div>
            <button
              onClick={() => setActiveTab('analysis-history')}
              className="text-xs text-[#4F8F3A] hover:underline font-bold flex items-center gap-1 font-tight"
            >
              Full Audit History <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentResults.map((result) => {
              const chem = result.primaryMatch.chemical;
              const isUnknown = result.primaryMatch.isUnknown;

              return (
                <div
                  key={result.id}
                  onClick={() => onSelectResult && onSelectResult(result)}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer hover:border-[#4F8F3A] ${
                    isDarkMode
                      ? 'bg-[#0A0A0A] border-[#292D29] hover:bg-[#1B1B1B]'
                      : 'bg-[#F6F7F3] border-[#DDE5D8] hover:bg-[#EAEFE8]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg font-bold font-mono text-xs flex-shrink-0 ${
                        isUnknown
                          ? 'bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/30'
                          : 'bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40'
                      }`}
                    >
                      {isUnknown ? 'UNK' : chem?.formula}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold font-tight">
                        {isUnknown ? 'Unknown Compound' : chem?.name}
                      </h4>
                      <p className={`text-xs font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                        Sample ID: {result.sampleInfo.sampleId} | Operator: {result.sampleInfo.operator}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span
                        className={`text-xs font-bold font-mono ${
                          result.primaryMatch.confidence > 85
                            ? 'text-[#4F8F3A]'
                            : 'text-[#D97706]'
                        }`}
                      >
                        {result.primaryMatch.confidence.toFixed(1)}% Confidence
                      </span>
                      <span className={`block text-[10px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                        {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (chem) onSelectChemical(chem);
                        setActiveTab('molecular-explorer');
                      }}
                      className="p-2 rounded-lg bg-[#24451F] text-[#78A85A] hover:bg-[#4F8F3A] hover:text-white transition-colors"
                      title="Inspect Molecule"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Chemist AI E-Tongue Hardware Card */}
        <div
          className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
          }`}
        >
          <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4F8F3A] font-tight">
              E-TONGUE HARDWARE TELEMETRY
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#24451F] text-[#78A85A] font-mono font-bold">
              ● Connected
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs space-y-2 font-mono ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Device ID</span>
              <span className="font-bold">ESP32-ETONGUE-88A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Connection</span>
              <span className="text-[#4F8F3A]">Bluetooth BLE 5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Signal Strength</span>
              <span>-64 dBm (98%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Battery Level</span>
              <span className="text-[#4F8F3A]">92%</span>
            </div>
          </div>

          {/* Individual Sensor Health Checks */}
          <div>
            <h4 className={`text-xs font-bold mb-2.5 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Sensor Channel Diagnostics
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span>pH Glass Electrode</span>
                <span className="text-[#4F8F3A] text-[10px] font-bold">Ready</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span>EC/TDS Conductance</span>
                <span className="text-[#4F8F3A] text-[10px] font-bold">Ready</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span>DS18B20 Temp Probe</span>
                <span className="text-[#4F8F3A] text-[10px] font-bold">25.0 °C</span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                <span>MQ-135 VOC Sensor</span>
                <span className="text-[#4F8F3A] text-[10px] font-bold">Warmup OK</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('calibration')}
            className={`w-full py-2.5 rounded-lg text-xs font-bold border flex items-center justify-center gap-2 transition-all font-tight ${
              isDarkMode
                ? 'bg-[#1B1B1B] border-[#292D29] text-[#78A85A] hover:bg-[#242922]'
                : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#24451F] hover:bg-[#EAEFE8]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#4F8F3A]" />
            Calibrate Sensor Array
          </button>
        </div>
      </div>
    </div>
  );
};
