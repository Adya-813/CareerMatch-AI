import React from 'react';
import { CaseInterviewPrepData } from '../types';
import { Briefcase, Layers, TrendingUp, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface CaseInterviewPrepViewProps {
  data: CaseInterviewPrepData;
}

export const CaseInterviewPrepView: React.FC<CaseInterviewPrepViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Case Interview & System Architecture Prep</h2>
        <p className="text-sm text-gray-400 mt-1">
          End-to-end framework and trade-off defense for company-specific architectural design rounds.
        </p>
      </div>

      {/* Case Scenario Hero */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase font-semibold mb-2">
          <Briefcase className="w-4 h-4" />
          <span>CASE CHALLENGE</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{data.scenarioTitle}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#081312] p-4 rounded-lg border border-[#142925]">
            <span className="text-[10px] font-mono uppercase text-teal-300 font-bold block mb-1">
              CLIENT / USER CONTEXT
            </span>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {data.clientContext}
            </p>
          </div>

          <div className="bg-[#081312] p-4 rounded-lg border border-[#142925]">
            <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
              CORE SYSTEM PROBLEM
            </span>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {data.businessProblem}
            </p>
          </div>
        </div>

        {/* High-level Framework Steps */}
        <div className="mt-4 pt-4 border-t border-[#142925]">
          <span className="text-xs font-mono uppercase text-teal-400 font-bold block mb-2">
            RECOMMENDED 5-STAGE WHITEBOARD FRAMEWORK:
          </span>
          <div className="flex flex-col gap-2">
            {data.architectureFramework.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 bg-[#091715] rounded border border-[#16332d] text-xs font-mono text-teal-100"
              >
                <span className="w-5 h-5 rounded bg-teal-950 text-teal-400 flex items-center justify-center shrink-0 text-[11px] font-bold border border-teal-800/40">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step by Step Solution */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Step-by-Step Architectural Solution</span>
        </h4>

        <div className="space-y-4">
          {data.stepByStepSolution.map((sol, i) => (
            <div key={i} className="bg-[#081312] p-4 rounded-lg border border-[#142925] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sol.phase}</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed pl-6">
                {sol.proposal}
              </p>
              <div className="pl-6 pt-1 text-[11px] font-mono text-gray-400">
                <span className="text-amber-400 font-semibold">Trade-offs Examined:</span> {sol.tradeoffsConsidered}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics and Pivot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-teal-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span>Success & Reliability Metrics to Propose</span>
          </h4>
          <ul className="space-y-2">
            {data.keyMetricsAndMonitoring.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-200 p-2 bg-[#081312] rounded border border-[#142925]">
                <span className="text-teal-400 font-mono font-bold">►</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Interviewer Surprise Curveball / Pivot</span>
          </h4>
          <div className="p-3.5 bg-amber-950/20 rounded-lg border border-amber-600/30 text-xs text-amber-200 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1">Pivot Scenario:</p>
            {data.interviewerSurprisePivot}
          </div>
        </div>
      </div>
    </div>
  );
};
