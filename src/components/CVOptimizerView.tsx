import React, { useState } from 'react';
import { CVOptimizerData } from '../types';
import { Sparkles, Copy, Check, ArrowRight, Wand2 } from 'lucide-react';

interface CVOptimizerViewProps {
  data: CVOptimizerData;
}

export const CVOptimizerView: React.FC<CVOptimizerViewProps> = ({ data }) => {
  const [copiedBulletIndex, setCopiedBulletIndex] = useState<number | null>(null);
  const [copiedBio, setCopiedBio] = useState(false);

  const copyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIndex(index);
    setTimeout(() => setCopiedBulletIndex(null), 2000);
  };

  const copyBio = () => {
    navigator.clipboard.writeText(data.tailoredExecutiveBio);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">CV & Resume Optimizer</h2>
        <p className="text-sm text-gray-400 mt-1">
          Precision rewrites using Google's XYZ formula, ATS keyword density tuning, and quantified impact upgrades.
        </p>
      </div>

      {/* Overview & Keywords */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase font-semibold mb-2">
          <Wand2 className="w-4 h-4" />
          <span>OPTIMIZATION DIRECTIVE</span>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed mb-4">
          {data.optimizationOverview}
        </p>

        <div>
          <span className="text-xs font-mono text-gray-400 uppercase font-semibold block mb-2">
            HIGH-VALUE ATS KEYWORDS INTEGRATED:
          </span>
          <div className="flex flex-wrap gap-2">
            {data.targetedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#081513] text-teal-300 border border-[#193a33]"
              >
                + {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tailored Executive Bio */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Tailored Resume Profile / Executive Summary</span>
          </h4>
          <button
            onClick={copyBio}
            className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-teal-100 bg-[#081312] border border-[#173831] px-3 py-1 rounded transition-colors cursor-pointer"
          >
            {copiedBio ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Bio</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Bio</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-[#081312] p-4 rounded-lg border border-[#142925] text-xs text-gray-200 leading-relaxed font-sans">
          "{data.tailoredExecutiveBio}"
        </div>
      </div>

      {/* Bullet Point Revisions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>Before vs. After Bullet Rewrites</span>
          <span className="text-xs font-mono text-teal-400 font-normal">
            {data.bulletRevisions.length} bullets upgraded
          </span>
        </h3>

        <div className="space-y-4">
          {data.bulletRevisions.map((rev, i) => (
            <div
              key={i}
              className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 transition-all hover:border-[#224b42]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#142925]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-300">{rev.context}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#102621] text-teal-400 border border-[#1b433a]">
                    {rev.framework}
                  </span>
                </div>

                <button
                  onClick={() => copyBullet(rev.optimizedBullet, i)}
                  className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#183a33] px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  {copiedBulletIndex === i ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Original */}
                <div className="bg-[#081312]/80 p-3.5 rounded-lg border border-[#182f2a]">
                  <span className="text-[10px] font-mono uppercase text-gray-400 font-semibold block mb-1">
                    Original Bullet (Unoptimized)
                  </span>
                  <p className="text-xs text-gray-400 line-through decoration-rose-500/60 leading-relaxed font-normal">
                    {rev.originalBullet}
                  </p>
                </div>

                {/* Optimized */}
                <div className="bg-[#0a1e1b] p-3.5 rounded-lg border border-teal-500/30 shadow-xs">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block mb-1 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upgraded High-Impact Bullet</span>
                  </span>
                  <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                    {rev.optimizedBullet}
                  </p>
                </div>
              </div>

              {/* Added keywords and metric pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-mono text-teal-400 font-medium">Metric Added:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-mono text-[11px]">
                  {rev.metricAdded}
                </span>

                <span className="text-[11px] font-mono text-teal-400 font-medium ml-2">Keywords:</span>
                {rev.addedKeywords.map((k, kidx) => (
                  <span
                    key={kidx}
                    className="px-2 py-0.5 rounded bg-[#081513] text-teal-300 border border-[#1a4138] font-mono text-[11px]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Skills Matrix Layout */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-3">
          Recommended Skills Section Layout for ATS Scanning
        </h4>
        <div className="space-y-2">
          {data.skillsMatrixRearrangement.map((sec, i) => (
            <div key={i} className="p-2.5 bg-[#081312] rounded border border-[#142925] text-xs font-mono text-teal-200">
              {sec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
