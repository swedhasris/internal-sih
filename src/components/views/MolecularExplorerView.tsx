import React, { useState } from 'react';
import { Atom, Info } from 'lucide-react';
import { Chemical } from '../../types/chemist';
import { VERIFIED_CHEMICALS } from '../../data/chemicals';
import { MoleculeViewer3D } from '../3d/MoleculeViewer3D';
import { MoleculeViewer2D } from '../2d/MoleculeViewer2D';

interface MolecularExplorerViewProps {
  selectedChemical: Chemical;
  onSelectChemical: (chem: Chemical) => void;
  isDarkMode: boolean;
}

export const MolecularExplorerView: React.FC<MolecularExplorerViewProps> = ({
  selectedChemical,
  onSelectChemical,
  isDarkMode,
}) => {
  const [viewType, setViewType] = useState<'3d' | '2d'>('3d');
  const [selectedAtom, setSelectedAtom] = useState<number | null>(null);

  const activeAtom = selectedChemical.atoms3D.find((a) => a.id === selectedAtom);

  return (
    <div className="space-y-6">
      {/* Top Selector Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <Atom className="w-5 h-5 text-[#4F8F3A]" />
            Interactive Molecular Explorer
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Render 3D ball-and-stick, space-filling models and 2D skeletal formulas for verified chemical compounds
          </p>
        </div>

        {/* Chemical Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className={`text-xs font-bold font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Select Compound:</label>
          <select
            value={selectedChemical.id}
            onChange={(e) => {
              const chem = VERIFIED_CHEMICALS.find((c) => c.id === e.target.value);
              if (chem) onSelectChemical(chem);
            }}
            className={`p-2 text-xs rounded-lg border font-bold outline-none font-tight ${
              isDarkMode
                ? 'bg-[#151515] border-[#292D29] text-white focus:border-[#4F8F3A]'
                : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
            }`}
          >
            {VERIFIED_CHEMICALS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.formula})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 3D / 2D Canvas Viewer */}
        <div
          className={`lg:col-span-2 p-5 sm:p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 font-tight">
                {selectedChemical.name}
                <span className="text-xs font-mono text-[#78A85A] px-2 py-0.5 rounded bg-[#24451F] border border-[#4F8F3A]/40 font-bold">
                  {selectedChemical.formula}
                </span>
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>IUPAC: {selectedChemical.iupacName}</p>
            </div>

            <div className={`flex items-center gap-2 p-1 rounded-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <button
                onClick={() => setViewType('3d')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors font-tight ${
                  viewType === '3d'
                    ? 'bg-[#4F8F3A] text-white'
                    : isDarkMode
                    ? 'text-[#9AA397] hover:text-white'
                    : 'text-[#667064] hover:text-[#0A0A0A]'
                }`}
              >
                3D Interactive Model
              </button>
              <button
                onClick={() => setViewType('2d')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors font-tight ${
                  viewType === '2d'
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

          {viewType === '3d' ? (
            <MoleculeViewer3D
              atoms={selectedChemical.atoms3D}
              bonds={selectedChemical.bonds3D}
              chemicalName={selectedChemical.name}
              formula={selectedChemical.formula}
            />
          ) : (
            <MoleculeViewer2D chemical={selectedChemical} />
          )}
        </div>

        {/* Right Col: Atom & Bond Parameters Sidebar */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
          }`}
        >
          <h3 className={`text-sm font-bold flex items-center gap-2 border-b pb-3 font-tight ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
            <Info className="w-4 h-4 text-[#4F8F3A]" />
            Atomic & Bond Coordinates
          </h3>

          <div>
            <span className={`text-xs font-bold block mb-2 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Atom Nodes ({selectedChemical.atoms3D.length})
            </span>
            <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
              {selectedChemical.atoms3D.map((atom) => (
                <button
                  key={atom.id}
                  onClick={() => setSelectedAtom(atom.id)}
                  className={`w-full p-2 rounded-lg border text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    selectedAtom === atom.id
                      ? 'bg-[#24451F] border-[#4F8F3A] text-white font-bold'
                      : isDarkMode
                      ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                      : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span className="font-bold">Atom #{atom.id}: {atom.element}</span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                    X:{atom.x} Y:{atom.y} Z:{atom.z}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activeAtom && (
            <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/40 rounded-xl text-xs space-y-1">
              <span className="text-[10px] text-[#78A85A] font-bold uppercase block font-tight">Selected Atom Details</span>
              <p className="text-white font-bold">Element: {activeAtom.element}</p>
              <p className="text-[#9AA397] font-mono">3D Vector: ({activeAtom.x}, {activeAtom.y}, {activeAtom.z})</p>
            </div>
          )}

          <div>
            <span className={`text-xs font-bold block mb-2 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Chemical Bond List</span>
            <div className="space-y-1.5">
              {selectedChemical.bonds.map((bond, idx) => (
                <div key={idx} className={`p-2.5 border rounded-lg text-xs ${
                  isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'
                }`}>
                  <span className="font-bold block font-tight">{bond.type}</span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>{bond.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

