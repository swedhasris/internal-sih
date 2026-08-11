import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  Activity,
  SlidersHorizontal,
  Database,
  Atom,
  Binary,
  GitCompare,
  History,
  FileText,
  Cpu,
  BrainCircuit,
  BarChart3,
  Bot,
  Settings as SettingsIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NavigationTab } from '../../types/chemist';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isDarkMode?: boolean;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isAi?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItemsMain: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-analysis', label: 'New Analysis', icon: FlaskConical, badge: 'Run' },
    { id: 'chemical-result', label: 'AI Identification', icon: Sparkles, badge: 'AI' },
    { id: 'live-sensors', label: 'Live Sensors', icon: Activity },
    { id: 'molecular-explorer', label: 'Molecular Explorer', icon: Atom },
  ];

  const navItemsDatabase: NavItem[] = [
    { id: 'chemical-database', label: 'Chemical Database', icon: Database },
    { id: 'chemical-comparison', label: 'Chemical Comparison', icon: GitCompare },
    { id: 'analysis-history', label: 'Analysis History', icon: History },
    { id: 'report', label: 'Laboratory Reports', icon: FileText },
    { id: 'device-management', label: 'Device Management', icon: Cpu },
    { id: 'calibration', label: 'Sensor Calibration', icon: SlidersHorizontal },
    { id: 'ai-model', label: 'AI Model & Dataset', icon: BrainCircuit, isAi: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-assistant', label: 'AI Chemistry Assistant', icon: Bot, isAi: true },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside
      className={`sticky top-0 h-screen z-40 transition-all duration-300 flex flex-col border-r bg-[#151515] border-[#292D29] text-[#F5F7F3] flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Brand Logo */}
      <div className="p-5 border-b border-[#292D29] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo Concept: Molecular Structure + AI Circuit with Leaf Green */}
          <div className="w-9 h-9 bg-[#24451F] border border-[#4F8F3A]/40 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm relative group">
            <Atom className="w-5 h-5 text-[#78A85A]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4F8F3A] animate-pulse-glow" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="font-extrabold text-white tracking-wider text-base font-tight block leading-tight">
                CHEMIST <span className="text-[#4F8F3A]">AI</span>
              </span>
              <span className="text-[10px] text-[#9AA397] tracking-wider uppercase font-mono block">
                Chemical Intelligence
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-[#242922] rounded-md text-[#9AA397] hover:text-white transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-3 overflow-y-auto custom-scrollbar space-y-1">
        {!isCollapsed && (
          <div className="px-5 pt-2 pb-1 text-[10px] uppercase tracking-widest text-[#667064] font-bold">
            Main Laboratory
          </div>
        )}
        {navItemsMain.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-5 py-2.5 text-xs font-medium transition-all relative ${
                isActive
                  ? 'bg-[#242922] text-white border-l-4 border-[#4F8F3A]'
                  : 'text-[#9AA397] hover:bg-[#1B1B1B] hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#4F8F3A]' : 'text-[#9AA397]'}`} />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/30 uppercase">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {!isCollapsed && (
          <div className="px-5 pt-4 pb-1 text-[10px] uppercase tracking-widest text-[#667064] font-bold">
            Database & Analysis
          </div>
        )}
        {navItemsDatabase.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-5 py-2.5 text-xs font-medium transition-all relative ${
                isActive
                  ? 'bg-[#242922] text-white border-l-4 border-[#4F8F3A]'
                  : 'text-[#9AA397] hover:bg-[#1B1B1B] hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#4F8F3A]' : 'text-[#9AA397]'}`} />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer device status */}
      <div className="p-4 border-t border-[#292D29] bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F8F3A] animate-pulse-glow"></div>
          {!isCollapsed && (
            <div className="text-xs text-white opacity-90 font-mono">
              E-Tongue Sensor: <span className="text-[#78A85A] font-bold">CONNECTED</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

