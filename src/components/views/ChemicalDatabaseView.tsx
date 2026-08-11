import React, { useState } from 'react';
import { Search, Database, Atom, GitCompare, Check } from 'lucide-react';
import { Chemical, NavigationTab } from '../../types/chemist';
import { VERIFIED_CHEMICALS } from '../../data/chemicals';

interface ChemicalDatabaseViewProps {
  onSelectChemical: (chem: Chemical) => void;
  setActiveTab: (tab: NavigationTab) => void;
  selectedForCompare: Chemical[];
  setSelectedForCompare: React.Dispatch<React.SetStateAction<Chemical[]>>;
  isDarkMode: boolean;
}

export const ChemicalDatabaseView: React.FC<ChemicalDatabaseViewProps> = ({
  onSelectChemical,
  setActiveTab,
  selectedForCompare,
  setSelectedForCompare,
  isDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Alcohols', 'Carboxylic Acids', 'Ketones', 'Inorganic Salts', 'Alkaloids', 'Aromatics & Acids'];

  const filteredChemicals = VERIFIED_CHEMICALS.filter((chem) => {
    const matchesSearch =
      chem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.casNumber.includes(searchTerm) ||
      chem.iupacName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || chem.classCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const toggleCompare = (chem: Chemical) => {
    if (selectedForCompare.find((c) => c.id === chem.id)) {
      setSelectedForCompare(selectedForCompare.filter((c) => c.id !== chem.id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, chem]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <Database className="w-5 h-5 text-[#4F8F3A]" />
            Verified Chemical Database
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Search trained reference compounds, molecular formulas, CAS numbers, and sensor fingerprints
          </p>
        </div>

        {selectedForCompare.length > 0 && (
          <button
            onClick={() => setActiveTab('chemical-comparison')}
            className="px-4 py-2 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight"
          >
            <GitCompare className="w-4 h-4" />
            Compare {selectedForCompare.length} Compounds →
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3 top-3 pointer-events-none ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chemical name, formula, CAS registry..."
            className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border outline-none ${
              isDarkMode
                ? 'bg-[#151515] border-[#292D29] text-white focus:border-[#4F8F3A]'
                : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors font-tight ${
                categoryFilter === cat
                  ? 'bg-[#4F8F3A] text-white'
                  : isDarkMode
                  ? 'bg-[#151515] text-[#9AA397] hover:text-white border border-[#292D29]'
                  : 'bg-white text-[#667064] hover:text-[#0A0A0A] border border-[#DDE5D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chemical Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChemicals.map((chem) => {
          const isSelectedCompare = selectedForCompare.some((c) => c.id === chem.id);

          return (
            <div
              key={chem.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold flex items-center gap-2 font-tight">
                      {chem.name}
                      <span className="text-xs font-mono text-[#78A85A] px-2 py-0.5 rounded bg-[#24451F] border border-[#4F8F3A]/40 font-bold">
                        {chem.formula}
                      </span>
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>IUPAC: {chem.iupacName}</p>
                  </div>

                  <span className={`text-[10px] px-2 py-1 rounded border font-mono ${
                    isDarkMode ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397]' : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064]'
                  }`}>
                    CAS {chem.casNumber}
                  </span>
                </div>

                <p className={`text-xs line-clamp-2 mt-3 leading-relaxed ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                  {chem.description}
                </p>

                <div className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-mono ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
                  <div>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Mol. Weight</span>
                    <span className="font-bold">{chem.molecularWeight} g/mol</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Reference pH</span>
                    <span className="text-[#4F8F3A] font-bold">{chem.referenceFingerprint.ph}</span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-2 pt-3 border-t ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
                <button
                  onClick={() => {
                    onSelectChemical(chem);
                    setActiveTab('molecular-explorer');
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 font-tight ${
                    isDarkMode
                      ? 'bg-[#24451F] text-[#78A85A] hover:bg-[#4F8F3A] hover:text-white'
                      : 'bg-[#F6F7F3] text-[#4F8F3A] hover:bg-[#4F8F3A] hover:text-white border border-[#DDE5D8]'
                  }`}
                >
                  <Atom className="w-3.5 h-3.5" /> Explore Molecule
                </button>

                <button
                  onClick={() => toggleCompare(chem)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 font-tight ${
                    isSelectedCompare
                      ? 'bg-[#4F8F3A] border-[#4F8F3A] text-white'
                      : isDarkMode
                      ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                      : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
                  }`}
                  title="Select for Side-by-Side Comparison"
                >
                  {isSelectedCompare ? <Check className="w-3.5 h-3.5" /> : <GitCompare className="w-3.5 h-3.5" />}
                  {isSelectedCompare ? 'Selected' : 'Compare'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

