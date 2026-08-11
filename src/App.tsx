import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NavigationTab, AnalysisResult, Chemical, SampleInfo, SensorFingerprint } from './types/chemist';
import { VERIFIED_CHEMICALS } from './data/chemicals';

// Views
import { DashboardView } from './components/views/DashboardView';
import { NewAnalysisView } from './components/views/NewAnalysisView';
import { LiveSensorsView } from './components/views/LiveSensorsView';
import { ChemicalResultView } from './components/views/ChemicalResultView';
import { ChemicalDatabaseView } from './components/views/ChemicalDatabaseView';
import { ChemicalComparisonView } from './components/views/ChemicalComparisonView';
import { MolecularExplorerView } from './components/views/MolecularExplorerView';
import { AnalysisHistoryView } from './components/views/AnalysisHistoryView';
import { ReportView } from './components/views/ReportView';
import { CalibrationView } from './components/views/CalibrationView';
import { DeviceManagementView } from './components/views/DeviceManagementView';
import { AIModelView } from './components/views/AIModelView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AIAssistantView } from './components/views/AIAssistantView';
import { SettingsView } from './components/views/SettingsView';

// Pipeline Modal
import { AnalysisPipelineModal } from './components/common/AnalysisPipelineModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Active chemical result for Result & Report views
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // Active chemical for Molecular Explorer
  const [selectedChemical, setSelectedChemical] = useState<Chemical>(VERIFIED_CHEMICALS[0]);

  // Selected chemicals for comparison
  const [selectedForCompare, setSelectedForCompare] = useState<Chemical[]>([
    VERIFIED_CHEMICALS[0],
    VERIFIED_CHEMICALS[1],
  ]);

  // Pipeline modal state
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pendingSample, setPendingSample] = useState<{
    info: SampleInfo;
    sensor: SensorFingerprint;
  } | null>(null);

  // History state
  const [historyResults, setHistoryResults] = useState<AnalysisResult[]>([
    {
      id: 'RES-9941',
      sampleInfo: {
        sampleId: 'SMP-8821',
        sampleName: 'Laboratory Ethanol Sample A',
        batchNumber: 'BATCH-2026-A',
        source: 'Chemical Cell 1',
        operator: 'Dr. S. Vance',
        notes: 'Sample collected for E-Tongue fingerprint verification.',
        timestamp: new Date().toISOString(),
        isDemoMode: true,
      },
      sensorReading: {
        ph: 6.82,
        ec: 0.12,
        tds: 60,
        temperature: 25.0,
        colorRgb: { r: 245, g: 248, b: 252 },
        voc: 680,
      },
      primaryMatch: {
        chemical: VERIFIED_CHEMICALS[0], // Ethanol
        confidence: 94.6,
        isUnknown: false,
      },
      alternativeMatches: [
        { chemicalId: 'chem-1', chemicalName: 'Ethanol', formula: 'C2H6O', confidence: 94.6 },
        { chemicalId: 'chem-2', chemicalName: 'Methanol', formula: 'CH4O', confidence: 3.2 },
        { chemicalId: 'chem-3', chemicalName: 'Isopropanol', formula: 'C3H8O', confidence: 1.4 },
        { chemicalId: 'chem-4', chemicalName: 'Unknown Compound', formula: 'N/A', confidence: 0.8 },
      ],
      featureContributions: [
        { feature: 'VOC Response', importanceLevel: 'High', contribution: 38, explanation: 'Strong volatile organic compound signal characteristic of short-chain alcohols.' },
        { feature: 'pH', importanceLevel: 'High', contribution: 28, explanation: 'Neutral pH 6.82 matches pure ethanol aqueous solution.' },
        { feature: 'EC/TDS', importanceLevel: 'Medium', contribution: 22, explanation: 'Low electrical conductivity indicates non-ionic neutral organic solvent.' },
        { feature: 'Color Response', importanceLevel: 'Low', contribution: 12, explanation: 'Colorless liquid matches high RGB reflectance baseline.' },
      ],
      timestamp: new Date().toISOString(),
      status: 'Identified',
      modelVersion: 'ChemistAI Classifier v1.2',
    },
  ]);

  // Start analysis pipeline
  const handleStartAnalysisPipeline = (info: SampleInfo, sensor: SensorFingerprint) => {
    setPendingSample({ info, sensor });
    setIsPipelineRunning(true);
  };

  // Pipeline finish callback
  const handlePipelineComplete = (result: AnalysisResult) => {
    setIsPipelineRunning(false);
    setCurrentResult(result);
    setHistoryResults((prev) => [result, ...prev]);
    setActiveTab('chemical-result');
  };

  // Quick helper to view lab report
  const handleViewReport = (result: AnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('report');
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors ${isDarkMode ? 'dark bg-[#0A0A0A] text-[#F5F7F3]' : 'bg-[#F6F7F3] text-[#0A0A0A]'}`}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onSelectChemical={(chem) => {
            setSelectedChemical(chem);
            setActiveTab('molecular-explorer');
          }}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onSelectResult={(res) => {
                setCurrentResult(res);
                setActiveTab('chemical-result');
              }}
              onSelectChemical={(chem) => {
                setSelectedChemical(chem);
                setActiveTab('molecular-explorer');
              }}
              recentResults={historyResults}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'new-analysis' && (
            <NewAnalysisView
              onRunAnalysis={handleStartAnalysisPipeline}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'live-sensors' && (
            <LiveSensorsView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'chemical-result' && (
            currentResult ? (
              <ChemicalResultView
                result={currentResult}
                onViewReport={handleViewReport}
                isDarkMode={isDarkMode}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400">No active analysis result selected.</p>
                <button
                  onClick={() => setActiveTab('new-analysis')}
                  className="mt-4 px-4 py-2 bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold rounded-lg shadow-xs font-tight"
                >
                  Start New Analysis →
                </button>
              </div>
            )
          )}

          {activeTab === 'chemical-database' && (
            <ChemicalDatabaseView
              onSelectChemical={(chem) => setSelectedChemical(chem)}
              setActiveTab={setActiveTab}
              selectedForCompare={selectedForCompare}
              setSelectedForCompare={setSelectedForCompare}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'chemical-comparison' && (
            <ChemicalComparisonView
              selectedForCompare={selectedForCompare}
              setSelectedForCompare={setSelectedForCompare}
              setActiveTab={setActiveTab}
              onSelectChemical={(chem) => setSelectedChemical(chem)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'molecular-explorer' && (
            <MolecularExplorerView
              selectedChemical={selectedChemical}
              onSelectChemical={setSelectedChemical}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'analysis-history' && (
            <AnalysisHistoryView
              historyResults={historyResults}
              onSelectResult={(res) => {
                setCurrentResult(res);
                setActiveTab('chemical-result');
              }}
              onViewReport={handleViewReport}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'report' && (
            currentResult ? (
              <ReportView result={currentResult} isDarkMode={isDarkMode} />
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400">No active lab report selected.</p>
                <button
                  onClick={() => setActiveTab('analysis-history')}
                  className="mt-4 px-4 py-2 bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold rounded-lg shadow-xs font-tight"
                >
                  View Analysis History →
                </button>
              </div>
            )
          )}

          {activeTab === 'calibration' && (
            <CalibrationView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'device-management' && (
            <DeviceManagementView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'ai-model' && (
            <AIModelView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'ai-assistant' && (
            <AIAssistantView
              isDarkMode={isDarkMode}
              currentResult={currentResult}
              selectedChemical={selectedChemical}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          )}
        </main>
      </div>

      {/* AI Pipeline Modal Overlay */}
      {isPipelineRunning && pendingSample && (
        <AnalysisPipelineModal
          isOpen={isPipelineRunning}
          sensorData={pendingSample.sensor}
          onComplete={handlePipelineComplete}
          onClose={() => setIsPipelineRunning(false)}
        />
      )}
    </div>
  );
}
