import React from 'react';
import { Chemical } from '../../types/chemist';

interface MoleculeViewer2DProps {
  chemical: Chemical;
}

export const MoleculeViewer2D: React.FC<MoleculeViewer2DProps> = ({ chemical }) => {
  return (
    <div className="w-full h-[380px] bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Structural Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">{chemical.name} — 2D Skeletal Formula</h4>
          <p className="text-xs text-slate-400">IUPAC: {chemical.iupacName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 bg-teal-950/80 border border-teal-500/30 text-teal-300 rounded-md font-mono">
            {chemical.formula}
          </span>
          <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md">
            MW: {chemical.molecularWeight} g/mol
          </span>
        </div>
      </div>

      {/* SVG Skeletal Structure Canvas */}
      <div className="my-auto py-4 flex items-center justify-center">
        <svg viewBox="-120 -100 240 200" className="w-full max-w-sm h-56">
          {/* Background grid dots for scientific blueprint feel */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#334155" opacity="0.4" />
          </pattern>
          <rect x="-120" y="-100" width="240" height="200" fill="url(#grid)" />

          {/* Render bonds based on chemical */}
          {chemical.bonds3D.map((bond, idx) => {
            const a1 = chemical.atoms3D.find((a) => a.id === bond.source);
            const a2 = chemical.atoms3D.find((a) => a.id === bond.target);
            if (!a1 || !a2) return null;

            // Scale 3D coordinates to 2D canvas
            const scale = 38;
            const x1 = a1.x * scale;
            const y1 = -a1.y * scale; // invert Y for SVG
            const x2 = a2.x * scale;
            const y2 = -a2.y * scale;

            if (bond.order === 2) {
              // Double bond parallel offset
              const dx = x2 - x1;
              const dy = y2 - y1;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = (-dy / len) * 3;
              const ny = (dx / len) * 3;

              return (
                <g key={`bond-${idx}`}>
                  <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} stroke="#38BDF8" strokeWidth="2.5" />
                  <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} stroke="#38BDF8" strokeWidth="2.5" />
                </g>
              );
            }

            if (bond.order === 1.5) {
              // Aromatic dashed bond
              return (
                <g key={`bond-${idx}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A855F7" strokeWidth="2.5" strokeDasharray="4 2" />
                </g>
              );
            }

            // Single bond
            return (
              <line
                key={`bond-${idx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#4F8F3A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Render atom nodes */}
          {chemical.atoms3D.map((atom) => {
            const scale = 38;
            const cx = atom.x * scale;
            const cy = -atom.y * scale;

            let bgColor = '#292D29';
            let textColor = '#F8FAFC';
            let borderColor = '#4F8F3A';

            if (atom.element === 'O') {
              bgColor = '#7F1D1D';
              textColor = '#FCA5A5';
              borderColor = '#EF4444';
            } else if (atom.element === 'N') {
              bgColor = '#1E3A8A';
              textColor = '#93C5FD';
              borderColor = '#3B82F6';
            } else if (atom.element === 'C') {
              bgColor = '#0F172A';
              textColor = '#E2E8F0';
              borderColor = '#475569';
            } else if (atom.element === 'Na' || atom.element === 'Cl') {
              bgColor = '#3B0764';
              textColor = '#E9D5FF';
              borderColor = '#A855F7';
            }

            // Don't render plain H text if we want skeletal style unless bound to O/N
            return (
              <g key={`atom-${atom.id}`}>
                <circle cx={cx} cy={cy} r="13" fill={bgColor} stroke={borderColor} strokeWidth="1.5" />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {atom.element}
                </text>
                {atom.charge && (
                  <text x={cx + 9} y={cy - 6} fill="#F43F5E" fontSize="9" fontWeight="bold">
                    {atom.charge > 0 ? `+${atom.charge}` : atom.charge}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Functional Group Badges Footer */}
      <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Functional Groups:</span>
          {chemical.functionalGroups.map((group, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700"
            >
              {group}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-slate-500 font-mono">CAS: {chemical.casNumber}</span>
      </div>
    </div>
  );
};
