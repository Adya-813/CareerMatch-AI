import React from 'react';
import { CVAnalysisData } from '../types';
import { FileText, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

interface CVAnalysisViewProps {
  data: CVAnalysisData;
}

export const CVAnalysisView: React.FC<CVAnalysisViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">CV / Resume Analysis</h2>
        <p className="text-sm text-gray-400 mt-1">
          Detailed extraction of your profile, ATS audit findings, and keyword coverage.
        </p>
      </div>

      {/* Candidate Profile Summary Card */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#142925]">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-semibold">CANDIDATE DETECTED</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{data.candidateName}</h3>
            <p className="text-sm text-gray-300 font-medium">{data.detectedRole}</p>
          </div>

          <div className="flex items-center gap-4 bg-[#081312] border border-[#173831] px-4 py-2.5 rounded-xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-teal-400 font-medium">Quantified Impact Score</span>
              <span className="text-xl font-bold text-white">{data.quantifiedImpactScore}<span className="text-xs text-teal-400 font-mono">/100</span></span>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mt-4 font-normal">
          {data.executiveSummary}
        </p>
      </div>

      {/* Skills Matrix: Found vs Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Matched Keywords & Skills ({data.skillsFound.length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.skillsFound.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-700/40"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Missing Keywords to Target ({data.missingKeywords.length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.missingKeywords.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-amber-950/60 text-amber-300 border border-amber-600/40"
              >
                + {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ATS Audit Findings */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />
          <span>ATS System & Readability Audit Findings</span>
        </h4>

        <div className="space-y-3">
          {data.atsAuditFindings.map((finding, i) => {
            const isPass = finding.severity === 'pass';
            const isWarning = finding.severity === 'warning';
            return (
              <div
                key={i}
                className="p-4 bg-[#081312] rounded-lg border border-[#142925] flex flex-col md:flex-row md:items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  {isPass ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-gray-200">
                        {finding.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded uppercase ${
                          isPass
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                            : isWarning
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                            : 'bg-rose-950 text-rose-300 border border-rose-700/50'
                        }`}
                      >
                        {finding.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">{finding.finding}</p>
                    <p className="text-xs text-teal-300 font-medium mt-1">
                      Action: {finding.fixRecommendation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
