import React, { useState } from 'react';
import { StrengthsGapsData } from '../types';
import { Badge } from './Badge';
import { CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react';

interface StrengthsGapsViewProps {
  data: StrengthsGapsData;
}

export const StrengthsGapsView: React.FC<StrengthsGapsViewProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'strengths' | 'gaps'>('all');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Strengths and Gaps Analysis</h2>
          <p className="text-sm text-gray-400 mt-1">
            Verified matches with cited evidence, alongside actionable remediations for every missing element.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-[#0b1816] p-1 rounded-lg border border-[#16332c] self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#183630] text-teal-200'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All ({data.strengths.length + data.gaps.length})
          </button>
          <button
            onClick={() => setFilter('strengths')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'strengths'
                ? 'bg-[#183630] text-emerald-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Strengths ({data.strengths.length})
          </button>
          <button
            onClick={() => setFilter('gaps')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'gaps'
                ? 'bg-[#183630] text-amber-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Gaps ({data.gaps.length})
          </button>
        </div>
      </div>

      {/* Strengths Section */}
      {(filter === 'all' || filter === 'strengths') && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>High-Impact Strengths</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.strengths.map((item, i) => (
              <div
                key={i}
                className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 hover:border-[#204a40] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                    <Badge type={item.badge} />
                  </div>

                  <div className="bg-[#081312] p-3 rounded-lg border border-[#142925] mb-3">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
                      CV / JD Evidence
                    </span>
                    <p className="text-xs text-teal-200/90 font-mono italic">
                      "{item.evidence}"
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#142925] text-xs text-gray-300">
                  <span className="text-teal-400 font-semibold font-mono text-[11px] block">
                    Strategic Value:
                  </span>
                  {item.impactOnRole}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gaps Section */}
      {(filter === 'all' || filter === 'gaps') && (
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Addressable Gaps & Remediation Tactics</span>
          </h3>

          <div className="space-y-4">
            {data.gaps.map((gap, i) => (
              <div
                key={i}
                className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 hover:border-[#204a40] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{gap.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-600/40 uppercase">
                      {gap.severity} priority
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(gap.addTag, i)}
                    className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-teal-100 bg-[#081312] border border-[#173831] px-2.5 py-1 rounded transition-colors self-start cursor-pointer"
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied snippet</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy snippet tag</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  {gap.gapDetail}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#081312] p-3.5 rounded-lg border border-[#142925]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block mb-1">
                      Suggested Tag Placeholder
                    </span>
                    <span className="text-xs font-mono text-amber-300 bg-amber-950/50 px-2 py-1 rounded border border-amber-600/30 block">
                      {gap.addTag}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-teal-400 font-semibold block mb-1">
                      How to Bridge in Interview
                    </span>
                    <p className="text-xs text-gray-300">
                      {gap.actionToBridge}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
