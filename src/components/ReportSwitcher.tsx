import React, { useState, useRef, useEffect } from 'react';
import { CareerMatchReport } from '../types';
import { Briefcase, ChevronDown, Check, Trash2, History } from 'lucide-react';

interface ReportSwitcherProps {
  currentReport: CareerMatchReport;
  savedReports: CareerMatchReport[];
  onSelectReport: (report: CareerMatchReport) => void;
  onDeleteReport: (reportId: string) => void;
}

export const ReportSwitcher: React.FC<ReportSwitcherProps> = ({
  currentReport,
  savedReports,
  onSelectReport,
  onDeleteReport,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0e211e] hover:bg-[#142e2a] border border-[#1d433b] text-gray-200 text-xs font-medium transition-all shadow-xs cursor-pointer"
        title="Switch between saved job application reports"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/50" />
        <Briefcase className="w-3.5 h-3.5 text-teal-400" />
        <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[200px]">
          {currentReport.overview.company}
        </span>
        <span className="text-gray-400 text-[11px] truncate hidden md:inline max-w-[120px]">
          • {currentReport.overview.targetRole.split('-')[0].trim()}
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-950 text-teal-300 border border-teal-700/50">
          {currentReport.overview.jobFitScore}%
        </span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-80 sm:w-96 rounded-xl bg-[#091614] border border-[#1b433a] shadow-2xl z-50 overflow-hidden animate-fadeIn">
          <div className="p-3 bg-[#0c1e1a] border-b border-[#15342d] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-semibold">
              <History className="w-3.5 h-3.5" />
              <span>SAVED REPORTS ({savedReports.length}/3)</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Instant Local Switch</span>
          </div>

          <div className="p-1 divide-y divide-[#132c26]">
            {savedReports.map((item) => {
              const isSelected = item.id === currentReport.id;
              const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-[#122b26] border border-[#1d4d42]' : 'hover:bg-[#0d211d]'
                  }`}
                >
                  <div
                    onClick={() => {
                      onSelectReport(item);
                      setIsOpen(false);
                    }}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white truncate">
                        {item.overview.company}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/40">
                        {item.overview.jobFitScore}/100 Fit
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono text-teal-400 flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-teal-400" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-300 truncate">
                      {item.overview.targetRole}
                    </div>

                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Analyzed {dateStr} • ATS {item.overview.atsScore}%
                    </div>
                  </div>

                  {savedReports.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(item.id);
                      }}
                      className="p-1.5 rounded text-gray-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Remove from saved history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-[#061210] border-t border-[#122924] text-[11px] text-gray-400/90 leading-tight">
            💡 Local storage holds up to 3 reports so you can switch applications without waiting or re-running analysis.
          </div>
        </div>
      )}
    </div>
  );
};
