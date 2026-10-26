import React from 'react';
import { SquareCheck, StopCircle, Download, Plus } from 'lucide-react';
import { CareerMatchReport } from '../types';
import { ReportSwitcher } from './ReportSwitcher';

interface HeaderProps {
  completedStepsCount: number;
  totalStepsCount: number;
  isProcessing: boolean;
  onStop: () => void;
  onExport: () => void;
  onNewAnalysis: () => void;
  currentReport: CareerMatchReport;
  savedReports: CareerMatchReport[];
  onSelectReport: (report: CareerMatchReport) => void;
  onDeleteReport: (reportId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedStepsCount,
  totalStepsCount,
  isProcessing,
  onStop,
  onExport,
  onNewAnalysis,
  currentReport,
  savedReports,
  onSelectReport,
  onDeleteReport,
}) => {
  return (
    <header className="h-16 bg-[#0a1514] border-b border-[#142925] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand & Job Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-[#062420] shadow-sm shadow-teal-500/20">
            <SquareCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CareerMatch AI 2
            </h1>
            <span className="text-xs text-teal-300/80 font-normal hidden lg:inline">
              Job-fit and interview prep
            </span>
          </div>
        </div>

        {/* Saved Reports Switcher */}
        <div className="hidden sm:block border-l border-[#183a33] pl-3">
          <ReportSwitcher
            currentReport={currentReport}
            savedReports={savedReports}
            onSelectReport={onSelectReport}
            onDeleteReport={onDeleteReport}
          />
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="flex items-center gap-4">
        {/* Progress Dots Bar */}
        <div className="hidden md:flex items-center gap-2 bg-[#0d1d1a] border border-[#18352f] rounded-lg px-3 py-1.5">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStepsCount }).map((_, i) => {
              const isFilled = i < completedStepsCount;
              const isCurrent = i === completedStepsCount && isProcessing;
              return (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isFilled
                      ? 'w-3.5 bg-amber-400'
                      : isCurrent
                      ? 'w-4 bg-teal-400 animate-pulse'
                      : 'w-2 bg-[#1b3a34]'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-xs font-mono text-gray-400 ml-1.5">
            {completedStepsCount}/{totalStepsCount}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isProcessing ? (
            <button
              onClick={onStop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-950/40 hover:bg-red-900/50 text-red-200 text-xs font-medium transition-colors cursor-pointer"
              title="Stop current analysis"
            >
              <StopCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={onStop}
              disabled
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e3d36] bg-[#0e211e] text-gray-500 text-xs font-medium cursor-not-allowed opacity-60"
            >
              <StopCircle className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          )}

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#21433c] bg-[#102421] hover:bg-[#16332e] text-gray-200 hover:text-white text-xs font-medium transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Export report</span>
          </button>

          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2dd4bf] hover:bg-[#3bf4dc] active:bg-[#20b8a4] text-[#05231e] text-xs font-semibold shadow-md shadow-teal-500/10 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New analysis</span>
          </button>
        </div>
      </div>
    </header>
  );
};
