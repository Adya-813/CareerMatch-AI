import React from 'react';
import { IndustryResearchData } from '../types';
import { Compass, TrendingUp, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface IndustryResearchViewProps {
  data: IndustryResearchData;
}

export const IndustryResearchView: React.FC<IndustryResearchViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Industry & Market Intelligence</h2>
        <p className="text-sm text-gray-400 mt-1">
          Macro-economic shifts, competitive landscape, and domain-level AI disruption opportunities.
        </p>
      </div>

      {/* Sector Overview Hero */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase font-semibold mb-2">
          <Compass className="w-4 h-4" />
          <span>MARKET SECTOR</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{data.sector}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#081312] p-4 rounded-lg border border-[#142925]">
            <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block mb-2">
              MARKET DYNAMICS
            </span>
            <ul className="space-y-2 text-xs text-gray-300">
              {data.marketDynamics.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-400 font-mono">✦</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#081312] p-4 rounded-lg border border-[#142925]">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-2">
              MAJOR COMPETITIVE LANDSCAPE
            </span>
            <div className="flex flex-wrap gap-2">
              {data.majorCompetitors.map((comp, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#0f2420] text-teal-200 border border-[#183a33]"
                >
                  {comp}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#142925]">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">
                MACRO DRIVERS:
              </span>
              <ul className="space-y-1 text-xs text-gray-400 font-normal">
                {data.macroEconomicTrends.map((trend, i) => (
                  <li key={i}>• {trend}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* GenAI Disruption Vectors */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-teal-300 mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-teal-400" />
          <span>Generative AI Disruption Vectors in this Space</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.genAiDisruptionVectors.map((vec, i) => (
            <div key={i} className="p-3.5 bg-[#081312] rounded-lg border border-[#142925] text-xs text-gray-200">
              <span className="text-teal-400 font-mono font-semibold block mb-1">Vector #{i + 1}</span>
              {vec}
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Insider Strategy Tips */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Candidate Strategic Edge (What 99% of Applicants Don't Know)</span>
        </h4>
        <div className="space-y-2.5">
          {data.candidateInsiderTips.map((tip, i) => (
            <div key={i} className="p-3 bg-emerald-950/20 border border-emerald-600/30 rounded-lg text-xs text-emerald-200 leading-relaxed flex items-start gap-2.5">
              <span className="font-mono text-emerald-400 font-bold">✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
