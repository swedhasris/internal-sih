import React, { useState } from 'react';
import {
  Search,
  Bluetooth,
  Sun,
  Moon,
  Bell,
  CheckCircle2,
  AlertCircle,
  X,
  User,
} from 'lucide-react';
import { NavigationTab, Chemical } from '../../types/chemist';
import { VERIFIED_CHEMICALS } from '../../data/chemicals';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onSelectChemical: (chemical: Chemical) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onSelectChemical,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Search filter
  const searchResults = searchQuery.trim()
    ? VERIFIED_CHEMICALS.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.casNumber.includes(searchQuery) ||
          c.iupacName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const tabTitleMap: Record<NavigationTab, string> = {
    dashboard: 'Laboratory Overview Dashboard',
    'new-analysis': 'New Chemical Sample Analysis',
    'live-sensors': 'Real-Time E-Tongue Sensor Telemetry',
    calibration: 'Sensor Calibration Workspace',
    'ai-identification': 'E-Tongue AI Identification & Spectral Analysis',
    'chemical-result': 'E-Tongue Chemical Identification Result',
    'chemical-database': 'Verified Chemical Database & Reference Fingerprints',
    'molecular-explorer': 'Interactive 2D & 3D Molecular Explorer',
    'chemical-properties': 'Chemical Properties & Molecular Bonding',
    'chemical-comparison': 'Multi-Compound Property Comparison',
    'analysis-history': 'Historic Analysis Logs & Audit Trail',
    reports: 'Laboratory Analysis Reports',
    report: 'Official Laboratory Analysis Report',
    'device-management': 'E-Tongue Hardware & Sensor Health',
    'ai-model': 'ChemistAI ML Model & Dataset Management',
    analytics: 'Lab Throughput & Sensor Stability Analytics',
    'ai-assistant': 'Chemist AI Intelligence Assistant',
    settings: 'Laboratory Preferences & Configuration',
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 border-b px-6 flex items-center justify-between transition-colors ${
        isDarkMode
          ? 'bg-[#0A0A0A]/95 border-[#292D29] backdrop-blur-md text-[#F5F7F3]'
          : 'bg-[#FFFFFF]/95 border-[#DDE5D8] backdrop-blur-md text-[#0A0A0A] shadow-xs'
      }`}
    >
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-extrabold text-[#4F8F3A] uppercase tracking-wider font-mono">
          CHEMIST AI
        </span>
        <span className={isDarkMode ? 'text-[#667064]' : 'text-[#9AA397]'}>/</span>
        <h2 className="text-sm font-bold truncate max-w-xs sm:max-w-md font-tight">
          {tabTitleMap[activeTab]}
        </h2>
      </div>

      {/* Global Search Bar */}
      <div className="relative hidden md:block w-72 lg:w-96">
        <div className="relative flex items-center">
          <Search className={`w-4 h-4 absolute left-3 pointer-events-none ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search chemicals, formulas, CAS numbers..."
            className={`w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border transition-all outline-none ${
              isDarkMode
                ? 'bg-[#151515] border-[#292D29] text-white focus:border-[#4F8F3A] placeholder-[#667064]'
                : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A] placeholder-[#9AA397]'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-[#9AA397] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Search Dropdown Results */}
        {isSearchFocused && searchResults.length > 0 && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-2xl overflow-hidden z-50 ${
              isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
            }`}
          >
            <div className={`p-2 border-b text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'border-[#292D29] text-[#9AA397]' : 'border-[#DDE5D8] text-[#667064]'}`}>
              Matching Reference Compounds ({searchResults.length})
            </div>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {searchResults.map((chem) => (
                <button
                  key={chem.id}
                  onClick={() => {
                    onSelectChemical(chem);
                    setActiveTab('molecular-explorer');
                    setSearchQuery('');
                  }}
                  className={`w-full text-left p-2.5 flex items-center justify-between transition-colors border-b last:border-0 ${
                    isDarkMode
                      ? 'border-[#292D29] hover:bg-[#242922] text-white'
                      : 'border-[#DDE5D8] hover:bg-[#F6F7F3] text-[#0A0A0A]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5 font-tight">
                      {chem.name}
                      <span className="text-[10px] text-[#4F8F3A] font-mono px-1.5 py-0.5 rounded bg-[#24451F]/30 border border-[#4F8F3A]/30">
                        {chem.formula}
                      </span>
                    </div>
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>CAS: {chem.casNumber}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isDarkMode ? 'bg-[#292D29] text-[#F5F7F3]' : 'bg-[#EAEFE8] text-[#0A0A0A]'}`}>
                    MW: {chem.molecularWeight} g/mol
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Tools Header */}
      <div className="flex items-center gap-3">
        {/* Bluetooth Device Pill */}
        <div
          onClick={() => setActiveTab('device-management')}
          className={`cursor-pointer px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
            isDarkMode
              ? 'bg-[#151515] border-[#292D29] hover:border-[#4F8F3A] text-white'
              : 'bg-[#F6F7F3] border-[#DDE5D8] hover:border-[#4F8F3A] text-[#0A0A0A]'
          }`}
        >
          <Bluetooth className="w-3.5 h-3.5 text-[#4F8F3A] animate-pulse" />
          <span className="hidden sm:inline text-xs font-tight">E-Tongue ESP32</span>
          <span className="w-2 h-2 rounded-full bg-[#4F8F3A] animate-pulse-glow" />
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg border transition-colors relative ${
              isDarkMode
                ? 'bg-[#151515] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4F8F3A]" />
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-2xl p-3 z-50 ${
                isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-2 mb-2 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
                <span className={`text-xs font-bold font-tight ${isDarkMode ? 'text-white' : 'text-[#0A0A0A]'}`}>System Alerts</span>
                <span className="text-[10px] text-[#4F8F3A] font-bold">2 Active</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className={`p-2.5 rounded-lg border flex items-start gap-2 ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4F8F3A] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#0A0A0A]'}`}>Sensor Array Calibrated</p>
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Ethanol / Water reference baseline verified</p>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg border flex items-start gap-2 ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                  <AlertCircle className="w-3.5 h-3.5 text-[#D97706] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#0A0A0A]'}`}>BLE Sensor Telemetry</p>
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Signal strength 98% (-54 dBm)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Mode Toggle Switch */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg border transition-colors ${
            isDarkMode
              ? 'bg-[#151515] border-[#292D29] text-[#78A85A] hover:bg-[#242922]'
              : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#24451F] hover:bg-[#EAEFE8]'
          }`}
          title={isDarkMode ? 'Switch to Light Laboratory Surface' : 'Switch to Dark Instrument Surface'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Avatar */}
        <div className={`flex items-center gap-2 pl-2 border-l ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <div className="w-8 h-8 rounded-lg bg-[#24451F] border border-[#4F8F3A]/40 flex items-center justify-center font-bold text-[#78A85A] text-xs shadow-xs font-mono">
            SV
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <span className={`block text-xs font-bold font-tight ${isDarkMode ? 'text-white' : 'text-[#0A0A0A]'}`}>Dr. S. Vance</span>
            <span className={`block text-[10px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Chief AI Chemist</span>
          </div>
        </div>
      </div>
    </header>
  );
};

