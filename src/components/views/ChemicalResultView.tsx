import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Atom,
} from 'lucide-react';
import { AnalysisResult } from '../../types/chemist';
import { MoleculeViewer3D } from '../3d/MoleculeViewer3D';
import { MoleculeViewer2D } from '../2d/MoleculeViewer2D';

interface ChemicalResultViewProps {
  result: AnalysisResult;
  onViewReport: (result: AnalysisResult) => void;
  isDarkMode: boolean;
}

type TabKey =
  | 'overview'
  | 'structure'
  | 'bonds'
  | 'elements'
  | 'properties'
  | 'safety'
  | 'fingerprint'
  | 'ai-explanation';

export const ChemicalResultView: React.FC<ChemicalResultViewProps> = ({
  result,
  onViewReport,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [structureView, setStructureView] = useState<'3d' | '2d'>('3d');

  const chem = result.primaryMatch.chemical;
  const isUnknown = result.primaryMatch.isUnknown;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* IDENTIFIED CHEMICAL HERO HEADER */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden ${
          isUnknown
            ? 'bg-[#151515] border-[#DC2626]/40 text-white'
            : isDarkMode
            ? 'bg-[#151515] border-[#292D29] text-[#F5F7F3]'
            : 'bg-white border-[#DDE5D8] text-[#0A0A0A] shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs uppercase tracking-widest text-[#4F8F3A] font-bold">
                E-TONGUE ANALYSIS RESULT
              </span>
              <span className={isDarkMode ? 'text-[#667064]' : 'text-[#9AA397]'}>•</span>
              <span className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Sample: {result.sampleInfo.sampleId}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3 font-tight">
              {isUnknown ? 'UNKNOWN / UNCERTAIN CHEMICAL' : chem?.name}
              {!isUnknown && chem && (
                <span className="text-lg md:text-2xl font-mono text-[#78A85A] font-bold px-3 py-1 rounded-lg bg-[#24451F] border border-[#4F8F3A]/40">
                  {chem.formula}
                </span>
              )}
            </h1>

            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              {isUnknown
                ? 'The sensor fingerprint collected from the E-Tongue device does not sufficiently match any trained compound in the chemical dataset. Additional spectrographic or chromatographic analysis is required.'
                : chem?.description}
            </p>
          </div>

          {/* AI Confidence Gauge Badge */}
          <div className={`flex flex-col items-center justify-center p-4 rounded-xl border min-w-[160px] text-center shadow-xs ${
            isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 font-tight ${
              isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'
            }`}>
              <Sparkles className="w-3 h-3 text-[#4F8F3A]" /> AI CONFIDENCE
            </span>
            <span
              className={`text-3xl font-extrabold font-mono ${
                isUnknown
                  ? 'text-[#DC2626]'
                  : result.primaryMatch.confidence > 85
                  ? 'text-[#4F8F3A]'
                  : 'text-[#D97706]'
              }`}
            >
              {result.primaryMatch.confidence.toFixed(1)}%
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 font-tight ${
                isUnknown
                  ? 'bg-[#DC2626]/20 text-[#DC2626]'
                  : 'bg-[#24451F] text-[#78A85A]'
              }`}
            >
              {isUnknown ? 'Low Confidence' : 'Verified Match'}
            </span>
          </div>
        </div>
      </div>

      {/* LOW CONFIDENCE ALERT BANNER IF UNKNOWN */}
      {isUnknown && (
        <div className="p-4 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center gap-3 text-xs text-[#DC2626]">
          <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
          <div>
            <span className="font-bold block font-tight">LOW CONFIDENCE — ADDITIONAL LABORATORY ANALYSIS REQUIRED</span>
            <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              The E-Tongue AI classification model will not force a false chemical identification when confidence is below threshold. Please recalibrate sensors or perform GC-MS analysis.
            </p>
          </div>
        </div>
      )}

      {/* ALTERNATIVE MATCHES BREAKDOWN TABLE */}
      <div
        className={`p-6 rounded-2xl border ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <h3 className={`text-xs font-bold mb-3 uppercase tracking-wider font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
          Top AI Classifier Probability Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          {result.alternativeMatches.map((match, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center justify-between ${
                idx === 0 && !isUnknown
                  ? 'bg-[#24451F] border-[#4F8F3A] text-white'
                  : isDarkMode
                  ? 'bg-[#0A0A0A] border-[#292D29]'
                  : 'bg-[#F6F7F3] border-[#DDE5D8]'
              }`}
            >
              <div>
                <span className="block font-bold text-xs font-tight">{match.chemicalName}</span>
                <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                  {match.formula}
                </span>
              </div>
              <span className="text-xs font-bold text-[#4F8F3A]">
                {match.confidence.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MOLECULAR EXPLORER CONTAINER (2D & 3D VISUALIZER) */}
      {!isUnknown && chem && (
        <div
          className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <div className="flex items-center gap-2 font-tight">
              <Atom className="w-5 h-5 text-[#4F8F3A]" />
              <h3 className="text-sm font-bold">
                Molecular Structure Centerpiece
              </h3>
            </div>

            <div className={`flex items-center gap-2 p-1 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <button
                onClick={() => setStructureView('3d')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors font-tight ${
                  structureView === '3d'
                    ? 'bg-[#4F8F3A] text-white'
                    : isDarkMode
                    ? 'text-[#9AA397] hover:text-white'
                    : 'text-[#667064] hover:text-[#0A0A0A]'
                }`}
              >
                Interactive 3D Structure
              </button>
              <button
                onClick={() => setStructureView('2d')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors font-tight ${
                  structureView === '2d'
                    ? 'bg-[#4F8F3A] text-white'
                    : isDarkMode
                    ? 'text-[#9AA397] hover:text-white'
                    : 'text-[#667064] hover:text-[#0A0A0A]'
                }`}
              >
                2D Skeletal Formula
              </button>
            </div>
          </div>

          {structureView === '3d' ? (
            <MoleculeViewer3D
              atoms={chem.atoms3D}
              bonds={chem.bonds3D}
              chemicalName={chem.name}
              formula={chem.formula}
            />
          ) : (
            <MoleculeViewer2D chemical={chem} />
          )}
        </div>
      )}

      {/* SCIENTIFIC INFORMATION TABS SYSTEM */}
      {!isUnknown && chem && (
        <div
          className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          {/* Tab Navigation Header */}
          <div className={`flex items-center gap-2 border-b pb-3 overflow-x-auto custom-scrollbar ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'structure', label: 'Bonds & Groups' },
              { id: 'elements', label: 'Elemental Composition' },
              { id: 'properties', label: 'Physical & Chemical Properties' },
              { id: 'safety', label: 'GHS Safety & Hazards' },
              { id: 'fingerprint', label: 'Sensor Fingerprint' },
              { id: 'ai-explanation', label: 'AI Rationale' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as TabKey)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap font-tight ${
                  activeTab === t.id
                    ? 'bg-[#4F8F3A] text-white shadow-xs'
                    : isDarkMode
                    ? 'text-[#9AA397] hover:text-white hover:bg-[#0A0A0A]'
                    : 'text-[#667064] hover:text-[#0A0A0A] hover:bg-[#F6F7F3]'
                }`}
              >
                {t.label}
              </button>
            ))}

            <button
              onClick={() => onViewReport(result)}
              className="ml-auto px-4 py-2 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs font-tight"
            >
              <FileText className="w-3.5 h-3.5" /> View Lab Report
            </button>
          </div>

          {/* TAB CONTENT PANELS */}
          <div className="pt-5">
            {/* 1. OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                    Chemical Identity Parameters
                  </h4>
                  <div className={`p-4 border rounded-xl space-y-2 text-xs font-mono ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Chemical Name:</span>
                      <span className="font-bold">{chem.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>IUPAC Name:</span>
                      <span className="text-[#4F8F3A] font-bold">{chem.iupacName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Chemical Formula:</span>
                      <span className="font-bold">{chem.formula}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>CAS Registry No:</span>
                      <span className="font-bold">{chem.casNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Molecular Weight:</span>
                      <span className="font-bold">{chem.molecularWeight} g/mol</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Monoisotopic Mass:</span>
                      <span className="font-bold">{chem.monoisotopicMass} Da</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>PubChem CID:</span>
                      <span className="text-[#78A85A] font-bold">{chem.pubChemCid}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                    Synonyms & Common Names
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {chem.commonNames.map((syn, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-tight ${
                          isDarkMode ? 'bg-[#0A0A0A] border-[#292D29] text-[#F5F7F3]' : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#0A0A0A]'
                        }`}
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. BONDS & GROUPS */}
            {activeTab === 'structure' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                  Chemical Bond Analysis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chem.bonds.map((bond, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}
                    >
                      <div className="p-2 rounded-lg bg-[#24451F] text-[#78A85A] font-bold font-mono text-xs border border-[#4F8F3A]/40">
                        {bond.count}x
                      </div>
                      <div>
                        <h5 className="text-xs font-bold font-tight">{bond.type}</h5>
                        <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>{bond.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ELEMENTAL COMPOSITION */}
            {activeTab === 'elements' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                  Elemental Mass Breakdown
                </h4>
                <div className="space-y-3">
                  {chem.elementComposition.map((elem, idx) => (
                    <div
                      key={idx}
                      className={`p-3 border rounded-xl flex items-center justify-between gap-4 ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-white text-xs shadow-xs"
                          style={{ backgroundColor: elem.color }}
                        >
                          {elem.symbol}
                        </span>
                        <div>
                          <span className="text-xs font-bold block font-tight">{elem.element}</span>
                          <span className={`text-[10px] font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                            {elem.count} atom{elem.count > 1 ? 's' : ''} | Atomic Mass: {elem.atomicMass}
                          </span>
                        </div>
                      </div>

                      <div className="w-48">
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Weight %</span>
                          <span className="text-[#4F8F3A] font-bold">{elem.weightPercentage}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#292D29]' : 'bg-[#DDE5D8]'}`}>
                          <div
                            className="h-full bg-[#4F8F3A]"
                            style={{ width: `${elem.weightPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PHYSICAL & CHEMICAL PROPERTIES */}
            {activeTab === 'properties' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider mb-3 font-tight">
                    Physical Properties
                  </h4>
                  <div className={`p-4 border rounded-xl space-y-2 text-xs font-mono ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Physical State:</span>
                      <span>{chem.physicalProperties.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Appearance:</span>
                      <span>{chem.physicalProperties.appearance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Density:</span>
                      <span>{chem.physicalProperties.density}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Melting Point:</span>
                      <span>{chem.physicalProperties.meltingPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Boiling Point:</span>
                      <span>{chem.physicalProperties.boilingPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Solubility in Water:</span>
                      <span className="text-[#4F8F3A] font-bold">{chem.physicalProperties.solubilityWater}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider mb-3 font-tight">
                    Chemical Properties
                  </h4>
                  <div className={`p-4 border rounded-xl space-y-2 text-xs font-mono ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>pKa Dissociation:</span>
                      <span className="text-[#78A85A] font-bold">{chem.chemicalProperties.pKa || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Acidity/Basicity:</span>
                      <span>{chem.chemicalProperties.acidityBasicity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Reactivity:</span>
                      <span>{chem.chemicalProperties.reactivity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}>Stability:</span>
                      <span className="text-[#4F8F3A] font-bold">{chem.chemicalProperties.stability}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. GHS SAFETY */}
            {activeTab === 'safety' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="text-xs font-bold text-[#DC2626] uppercase tracking-wider font-tight">
                    GHS Safety Classification — Signal Word: {chem.safety.signalWord}
                  </h4>
                </div>

                <div className={`p-4 border rounded-xl space-y-3 text-xs ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                  <div>
                    <span className="font-bold block mb-1 font-tight">Hazard Statements</span>
                    <ul className={`list-disc list-inside space-y-1 font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                      {chem.safety.hazardStatements.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold block mb-1 font-tight">Recommended PPE</span>
                    <div className="flex flex-wrap gap-2">
                      {chem.safety.recommendedPPE.map((ppe, i) => (
                        <span key={i} className={`px-2.5 py-1 rounded border text-xs font-mono ${
                          isDarkMode ? 'bg-[#151515] border-[#292D29] text-[#F5F7F3]' : 'bg-white border-[#DDE5D8] text-[#0A0A0A]'
                        }`}>
                          {ppe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. SENSOR FINGERPRINT COMPARISON */}
            {activeTab === 'fingerprint' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                  Sample E-Tongue Fingerprint vs Verified Reference Compound
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
                  <div className={`p-3 border rounded-xl text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>pH Level</span>
                    <span className="font-bold">{result.sensorReading.ph.toFixed(2)}</span>
                    <span className="text-[9px] text-[#4F8F3A] block">Ref: {chem.referenceFingerprint.ph}</span>
                  </div>

                  <div className={`p-3 border rounded-xl text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>EC Conduct</span>
                    <span className="font-bold">{result.sensorReading.ec.toFixed(2)}</span>
                    <span className="text-[9px] text-[#4F8F3A] block">Ref: {chem.referenceFingerprint.ec}</span>
                  </div>

                  <div className={`p-3 border rounded-xl text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>TDS Salt</span>
                    <span className="font-bold">{result.sensorReading.tds}</span>
                    <span className="text-[9px] text-[#4F8F3A] block">Ref: {chem.referenceFingerprint.tds}</span>
                  </div>

                  <div className={`p-3 border rounded-xl text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Temp (°C)</span>
                    <span className="font-bold">{result.sensorReading.temperature.toFixed(1)}</span>
                    <span className="text-[9px] text-[#4F8F3A] block">Ref: {chem.referenceFingerprint.temperature}</span>
                  </div>

                  <div className={`p-3 border rounded-xl text-center ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>MQ-135 VOC</span>
                    <span className="font-bold">{result.sensorReading.voc}</span>
                    <span className="text-[9px] text-[#4F8F3A] block">Ref: {chem.referenceFingerprint.voc}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. AI EXPLANATION */}
            {activeTab === 'ai-explanation' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#4F8F3A] uppercase tracking-wider font-tight">
                  Why did ChemistAI predict {chem.name}?
                </h4>

                <div className="space-y-3">
                  {result.featureContributions.map((fc, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 border rounded-xl flex items-center justify-between gap-4 text-xs ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}
                    >
                      <div>
                        <div className="flex items-center gap-2 font-tight">
                          <span className="font-bold">{fc.feature}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] font-bold">
                            {fc.importanceLevel} Importance
                          </span>
                        </div>
                        <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>{fc.explanation}</p>
                      </div>

                      <span className="font-mono font-bold text-[#4F8F3A] text-sm">
                        {fc.contribution}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

