import React, { useState } from 'react';
import { CompanyResearchData } from '../types';
import { Building2, Globe, Lightbulb, MessageSquareQuote, HelpCircle, Copy, Check } from 'lucide-react';

interface CompanyResearchViewProps {
  data: CompanyResearchData;
}

export const CompanyResearchView: React.FC<CompanyResearchViewProps> = ({ data }) => {
  const [copiedPointIndex, setCopiedPointIndex] = useState<number | null>(null);

  const copyTalkingPoint = (point: string, index: number) => {
    navigator.clipboard.writeText(point);
    setCopiedPointIndex(index);
    setTimeout(() => setCopiedPointIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Company Research & Strategy</h2>
        <p className="text-sm text-gray-400 mt-1">
          Internal business context, technical priorities, engineering culture, and reverse interview questions.
        </p>
      </div>

      {/* Company Profile Hero */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#142925]">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-semibold">COMPANY DOSSIER</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{data.company}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{data.industry}</span> • <span>{data.headquarters}</span>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-[11px] font-mono uppercase text-teal-400 font-bold block mb-1">
            MISSION STATEMENT
          </span>
          <p className="text-xs text-gray-200 italic bg-[#081312] p-3 rounded-lg border border-[#142925]">
            "{data.missionStatement}"
          </p>
        </div>

        <div className="mt-4">
          <span className="text-[11px] font-mono uppercase text-gray-400 font-bold block mb-2">
            CORE BUSINESS LINES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.coreBusinessLines.map((line, i) => (
              <div key={i} className="p-2.5 bg-[#081312] rounded border border-[#142925] text-xs text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Initiatives & Engineering Culture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-teal-300 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-teal-400" />
            <span>Recent Tech & AI Initiatives</span>
          </h4>
          <ul className="space-y-2.5">
            {data.recentTechInitiatives.map((init, i) => (
              <li key={i} className="p-2.5 bg-[#081312] rounded-lg border border-[#142925] text-xs text-gray-200 leading-relaxed flex items-start gap-2.5">
                <span className="text-teal-400 font-bold font-mono">#{i + 1}</span>
                <span>{init}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Engineering Culture & Signals</span>
          </h4>
          <ul className="space-y-2.5">
            {data.engineeringCultureSignals.map((signal, i) => (
              <li key={i} className="p-2.5 bg-[#081312] rounded-lg border border-[#142925] text-xs text-gray-200 leading-relaxed flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold font-mono">✦</span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Talking Points for Candidate */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-teal-400" />
          <span>Strategic Talking Points to Weave Into Your Interview</span>
        </h4>
        <div className="space-y-3">
          {data.talkingPointsForCandidate.map((point, i) => (
            <div
              key={i}
              className="p-3.5 bg-[#081312] rounded-lg border border-[#142925] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#1d433b] transition-all"
            >
              <p className="text-xs text-gray-200 font-sans italic leading-relaxed">
                {point}
              </p>
              <button
                onClick={() => copyTalkingPoint(point, i)}
                className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-white bg-[#0e211e] border border-[#183932] px-2.5 py-1 rounded transition-colors self-start sm:self-auto cursor-pointer"
              >
                {copiedPointIndex === i ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* High-Impact Questions to Ask Them */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Top Reverse Questions to Ask the Hiring Team</span>
        </h4>
        <div className="space-y-2.5">
          {data.interviewQuestionsToAskThem.map((q, i) => (
            <div key={i} className="p-3 bg-[#081312] rounded-lg border border-[#142925] flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold border border-amber-700/50 mt-0.5">
                {i + 1}
              </span>
              <p className="text-xs text-gray-200 font-medium leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
