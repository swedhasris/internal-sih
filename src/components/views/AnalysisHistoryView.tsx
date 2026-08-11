import React, { useState } from 'react';
import { History, Search, FileText, ArrowUpRight } from 'lucide-react';
import { AnalysisResult } from '../../types/chemist';

interface AnalysisHistoryViewProps {
  historyResults: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onViewReport: (result: AnalysisResult) => void;
  isDarkMode: boolean;
}

export const AnalysisHistoryView: React.FC<AnalysisHistoryViewProps> = ({
  historyResults,
  onSelectResult,
  onViewReport,
  isDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredHistory = historyResults.filter((item) => {
    const chemName = item.primaryMatch.chemical?.name || 'Unknown';
    const matchesSearch =
      chemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sampleInfo.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sampleInfo.operator.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <History className="w-5 h-5 text-[#4F8F3A]" />
            Analysis History & Audit Logs
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Historic log of E-Tongue sensor telemetry, AI classification outputs, and generated lab reports
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3 top-3 pointer-events-none ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by chemical, sample ID, operator..."
            className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border outline-none ${
              isDarkMode
                ? 'bg-[#151515] border-[#292D29] text-white focus:border-[#4F8F3A]'
                : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Identified', 'Low Confidence', 'Unknown'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors font-tight ${
                statusFilter === st
                  ? 'bg-[#4F8F3A] text-white'
                  : isDarkMode
                  ? 'bg-[#151515] text-[#9AA397] hover:text-white border border-[#292D29]'
                  : 'bg-white text-[#667064] hover:text-[#0A0A0A] border border-[#DDE5D8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className={`p-5 rounded-2xl border overflow-x-auto ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className={`border-b text-[10px] uppercase font-mono font-bold ${isDarkMode ? 'border-[#292D29] text-[#9AA397]' : 'border-[#DDE5D8] text-[#667064]'}`}>
              <th className="p-3">Test / Sample ID</th>
              <th className="p-3">Identified Chemical</th>
              <th className="p-3">Formula</th>
              <th className="p-3">AI Confidence</th>
              <th className="p-3">Operator</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-[#292D29]' : 'divide-[#DDE5D8]'}`}>
            {filteredHistory.map((item) => {
              const chem = item.primaryMatch.chemical;
              const isUnknown = item.primaryMatch.isUnknown;

              return (
                <tr key={item.id} className={`transition-colors ${isDarkMode ? 'hover:bg-[#0A0A0A]' : 'hover:bg-[#F6F7F3]'}`}>
                  <td className="p-3 font-mono font-bold">
                    {item.sampleInfo.sampleId}
                  </td>
                  <td className="p-3 font-bold font-tight">
                    {isUnknown ? 'Unknown Compound' : chem?.name}
                  </td>
                  <td className="p-3 font-mono text-[#4F8F3A] font-bold">
                    {isUnknown ? 'N/A' : chem?.formula}
                  </td>
                  <td className="p-3 font-mono font-bold text-[#78A85A]">
                    {item.primaryMatch.confidence.toFixed(1)}%
                  </td>
                  <td className={`p-3 ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>{item.sampleInfo.operator}</td>
                  <td className={`p-3 font-mono text-[11px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold font-tight ${
                        item.status === 'Identified'
                          ? 'bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40'
                          : 'bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectResult(item)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isDarkMode
                            ? 'bg-[#24451F] text-[#78A85A] hover:bg-[#4F8F3A] hover:text-white border-[#4F8F3A]/40'
                            : 'bg-[#F6F7F3] text-[#4F8F3A] hover:bg-[#4F8F3A] hover:text-white border-[#DDE5D8]'
                        }`}
                        title="View Identification Details"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onViewReport(item)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isDarkMode
                            ? 'bg-[#0A0A0A] text-[#9AA397] hover:text-white border-[#292D29]'
                            : 'bg-[#F6F7F3] text-[#667064] hover:text-[#0A0A0A] border-[#DDE5D8]'
                        }`}
                        title="View Lab Report"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

