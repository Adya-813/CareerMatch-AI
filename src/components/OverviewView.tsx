import React from 'react';
import { OverviewData, AnalysisStep } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { Badge } from './Badge';
import { Loader2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface OverviewViewProps {
  overview: OverviewData;
  steps: AnalysisStep[];
  isProcessing: boolean;
  onNavigateToTab: (tabId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  overview,
  steps,
  isProcessing,
  onNavigateToTab,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Overview</h2>
        <p className="text-sm text-gray-400 mt-1">
          A summary of how this CV lines up with this job, and where to go next.
        </p>
      </div>

      {/* Target Role Card */}
      <div className="bg-[#0c1a17] border border-[#183630] rounded-xl p-6 transition-all hover:border-[#224b42]">
        <div className="text-[11px] font-mono tracking-widest text-teal-400 font-semibold uppercase mb-2">
          TARGET ROLE
        </div>
        <div className="text-xl font-bold text-white mb-3">
          {overview.targetRole}{' '}
          <span className="font-normal text-gray-300">at</span>{' '}
          <span className="text-teal-300 font-semibold">{overview.company}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed max-w-4xl font-normal">
          {overview.roleSummary}
        </p>
      </div>

      {/* 3 Score Gauges */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreGauge
            score={overview.jobFitScore}
            label="JOB FIT"
            statusText={overview.jobFitScore >= 80 ? 'Strong Match' : overview.jobFitScore >= 60 ? 'Moderate Fit' : 'Not scored'}
            onViewDetails={() => onNavigateToTab('fit-score')}
          />
          <ScoreGauge
            score={overview.atsScore}
            label="ATS READINESS"
            statusText={overview.atsScore >= 80 ? 'Optimized' : 'Needs tuning'}
            onViewDetails={() => onNavigateToTab('cv-optimizer')}
          />
          <ScoreGauge
            score={overview.interviewReadinessScore}
            label="INTERVIEW READINESS"
            statusText={overview.interviewReadinessScore >= 75 ? 'Well prepared' : 'In progress'}
            onViewDetails={() => onNavigateToTab('readiness')}
          />
        </div>
        <p className="text-xs text-gray-400/90 mt-3 text-center sm:text-left">
          Fit and ATS scores estimate how closely the CV matches this job description. They are decision support, not a prediction of whether you will be hired.
        </p>
      </div>

      {/* Top strengths and Gaps side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top strengths */}
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Top strengths</span>
              <span className="text-xs font-mono text-emerald-400 font-normal">
                {overview.topStrengths.length} identified
              </span>
            </h3>

            {isProcessing && overview.topStrengths.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
                <div>
                  <div className="text-sm font-semibold text-white">Scoring job fit...</div>
                  <div className="text-xs text-gray-400 mt-1 max-w-xs">
                    Google Gemini is writing this section. Each step usually takes 30–90 seconds.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {overview.topStrengths.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-[#0e211d] rounded-lg border border-[#1a3d35] hover:border-[#245449] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="text-sm font-semibold text-gray-100 flex-1">
                        {item.title}
                      </div>
                      <Badge type={item.badge} />
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {item.detail}
                    </p>
                    {item.evidence && (
                      <div className="mt-2 text-[11px] font-mono text-teal-300/80 bg-[#091513] px-2.5 py-1 rounded border border-[#142925]">
                        Proof: {item.evidence}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gaps to address first */}
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Gaps to address first</span>
              <span className="text-xs font-mono text-amber-400 font-normal">
                {overview.gapsToAddress.length} action points
              </span>
            </h3>

            {isProcessing && overview.gapsToAddress.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
                <div>
                  <div className="text-sm font-semibold text-white">Scoring job fit...</div>
                  <div className="text-xs text-gray-400 mt-1 max-w-xs">
                    Google Gemini is writing this section. Each step usually takes 30–90 seconds.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {overview.gapsToAddress.map((gap, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-[#0e211d] rounded-lg border border-[#1a3d35] hover:border-[#245449] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="text-sm font-semibold text-gray-100 flex-1 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{gap.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-600/40">
                        {gap.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-2">
                      {gap.detail}
                    </p>
                    {gap.addPlaceholder && (
                      <div className="text-xs font-mono font-medium text-amber-300 bg-amber-950/40 px-2.5 py-1.5 rounded border border-amber-500/30">
                        {gap.addPlaceholder}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis steps tracker (Image 2) */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4">Analysis steps</h3>
        <div className="divide-y divide-[#152e28]">
          {steps.map((step) => (
            <div
              key={step.id}
              className="py-3 flex items-center justify-between text-sm transition-colors hover:bg-[#0e211d]/50 px-2 rounded"
            >
              <div className="flex items-center gap-3">
                {step.status === 'Done' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : step.status === 'Working' ? (
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                )}
                <span
                  className={`${
                    step.status === 'Done'
                      ? 'text-gray-200'
                      : step.status === 'Working'
                      ? 'text-amber-200 font-medium'
                      : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Status pill badge */}
              <div>
                {step.status === 'Done' && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                    Done
                  </span>
                )}
                {step.status === 'Working' && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    Working
                  </span>
                )}
                {step.status === 'Waiting' && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#112421] text-gray-400 border border-[#1a3a34]">
                    Waiting
                  </span>
                )}
                {step.status === 'Error' && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700/50">
                    Error
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to read this report (Image 2) */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-3">How to read this report</h3>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-xs text-gray-300">
          <span className="text-gray-400 font-mono text-[11px]">Labels:</span>
          <div className="flex items-center gap-2">
            <Badge type="FACT" />
            <span className="text-gray-400">from your CV or the JD</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge type="INFERENCE" />
            <span className="text-gray-400">reasoned by the AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge type="AI SUGGESTION" />
            <span className="text-gray-400">recommendation</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge type="MODEL KNOWLEDGE" />
            <span className="text-gray-400">not a live source</span>
          </div>
        </div>

        <p className="text-xs text-gray-300/90 leading-relaxed bg-[#071312] p-3 rounded-lg border border-[#142925]">
          Text marked <span className="font-mono text-amber-300 font-semibold">[ADD: ...]</span> needs information only you can provide. CareerMatch never fills those gaps with invented facts.
        </p>
      </div>
    </div>
  );
};
