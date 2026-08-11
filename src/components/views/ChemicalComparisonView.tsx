import React from 'react';
import { GitCompare, X, Plus } from 'lucide-react';
import { Chemical, NavigationTab } from '../../types/chemist';

interface ChemicalComparisonViewProps {
  selectedForCompare: Chemical[];
  setSelectedForCompare: React.Dispatch<React.SetStateAction<Chemical[]>>;
  setActiveTab: (tab: NavigationTab) => void;
  onSelectChemical: (chem: Chemical) => void;
  isDarkMode: boolean;
}

export const ChemicalComparisonView: React.FC<ChemicalComparisonViewProps> = ({
  selectedForCompare,
  setSelectedForCompare,
  setActiveTab,
  isDarkMode,
}) => {
  const removeChemical = (id: string) => {
    setSelectedForCompare(selectedForCompare.filter((c) => c.id !== id));
  };

  if (selectedForCompare.length === 0) {
    return (
      <div className={`p-12 text-center rounded-2xl max-w-xl mx-auto my-12 space-y-4 border ${
        isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
      }`}>
        <GitCompare className="w-12 h-12 text-[#4F8F3A] mx-auto" />
        <h3 className="text-lg font-bold font-tight">No Compounds Selected for Comparison</h3>
        <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
          Select 2 or 3 chemicals from the database to compare their formulas, molecular weights, physical properties, chemical properties, and sensor fingerprints side-by-side.
        </p>
        <button
          onClick={() => setActiveTab('chemical-database')}
          className="px-5 py-2.5 bg-[#4F8F3A] hover:bg-[#3F762F] text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-xs font-tight"
        >
          Browse Chemical Database →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <GitCompare className="w-5 h-5 text-[#4F8F3A]" />
            Chemical Property & Sensor Comparison
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Side-by-side scientific matrix comparison across chemical properties and E-Tongue signatures
          </p>
        </div>

        <button
          onClick={() => setActiveTab('chemical-database')}
          className={`px-4 py-2 border rounded-lg text-xs font-bold flex items-center gap-2 font-tight ${
            isDarkMode
              ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
              : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
          }`}
        >
          <Plus className="w-4 h-4 text-[#4F8F3A]" /> Add Compound
        </button>
      </div>

      {/* Comparison Table Matrix */}
      <div
        className={`p-6 rounded-2xl border overflow-x-auto ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
              <th className={`p-3 font-bold uppercase w-48 text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Parameter</th>
              {selectedForCompare.map((chem) => (
                <th key={chem.id} className="p-3 font-bold min-w-[220px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-extrabold font-tight">{chem.name}</span>
                      <span className="text-xs font-mono text-[#4F8F3A] font-bold">{chem.formula}</span>
                    </div>
                    <button
                      onClick={() => removeChemical(chem.id)}
                      className={`p-1 rounded ${isDarkMode ? 'hover:bg-[#292D29] text-[#9AA397] hover:text-red-400' : 'hover:bg-[#F6F7F3] text-[#667064] hover:text-red-600'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-[#292D29]' : 'divide-[#DDE5D8]'}`}>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>IUPAC Name</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono text-[#4F8F3A] font-bold">{c.iupacName}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>CAS Registry No</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono">{c.casNumber}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Molecular Weight</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono font-bold">{c.molecularWeight} g/mol</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Class Category</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-tight">{c.classCategory}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Functional Groups</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3">{c.functionalGroups.join(', ')}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Density</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono">{c.physicalProperties.density}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Boiling Point</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono">{c.physicalProperties.boilingPoint}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Melting Point</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono">{c.physicalProperties.meltingPoint}</td>
              ))}
            </tr>
            <tr>
              <td className={`p-3 font-semibold ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>pKa Dissociation</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono text-[#78A85A] font-bold">{c.chemicalProperties.pKa || 'N/A'}</td>
              ))}
            </tr>
            <tr className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F6F7F3]'}>
              <td className="p-3 font-bold text-[#4F8F3A] uppercase font-tight">Reference pH Fingerprint</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono font-bold text-[#4F8F3A]">{c.referenceFingerprint.ph}</td>
              ))}
            </tr>
            <tr className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F6F7F3]'}>
              <td className="p-3 font-bold text-[#4F8F3A] uppercase font-tight">Reference EC Fingerprint</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono font-bold">{c.referenceFingerprint.ec} mS/cm</td>
              ))}
            </tr>
            <tr className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F6F7F3]'}>
              <td className="p-3 font-bold text-[#4F8F3A] uppercase font-tight">Reference VOC Gas Response</td>
              {selectedForCompare.map((c) => (
                <td key={c.id} className="p-3 font-mono font-bold text-[#78A85A]">{c.referenceFingerprint.voc}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

