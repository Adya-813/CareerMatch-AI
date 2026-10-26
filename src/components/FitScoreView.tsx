import React from 'react';
import { FitScoreData } from '../types';
import { Award, CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react';

interface FitScoreViewProps {
  data: FitScoreData;
}

export const FitScoreView: React.FC<FitScoreViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Job Fit Score Breakdown</h2>
        <p className="text-sm text-gray-400 mt-1">
          Algorithmic multi-factor weighted scoring estimating alignment with the hiring benchmark.
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#142925]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#081513] border-4 border-teal-400 flex flex-col items-center justify-center text-center shadow-lg shadow-teal-500/10">
              <span className="text-3xl font-extrabold text-white leading-none tracking-tight">
                {data.overallScore}
              </span>
              <span className="text-[10px] text-teal-400 font-mono mt-0.5">/ 100</span>
            </div>
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase font-semibold">OVERALL VERDICT</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{data.verdict}</h3>
              <p className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{data.percentileRank}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#081312] border border-[#173831] p-4 rounded-xl max-w-sm">
            <span className="text-[11px] font-mono text-teal-300 font-semibold block mb-1">
              KEY STRATEGIC TAKEAWAY
            </span>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {data.keyTakeaway}
            </p>
          </div>
        </div>

        {/* Dimension Table */}
        <div className="mt-6">
          <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">
            WEIGHTED EVALUATION CRITERIA
          </h4>

          <div className="space-y-4">
            {data.dimensionScores.map((dim, i) => {
              const percentage = (dim.score / dim.maxScore) * 100;
              const isPositive = dim.impact === 'Positive';
              const isNeutral = dim.impact === 'Neutral';

              return (
                <div
                  key={i}
                  className="bg-[#081312] border border-[#142925] p-4 rounded-xl transition-all hover:border-[#1d443b]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      {isPositive ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isNeutral ? (
                        <MinusCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span className="text-sm font-bold text-white">{dim.category}</span>
                      <span className="text-[11px] font-mono text-gray-400 bg-[#0f2420] px-2 py-0.5 rounded border border-[#183932]">
                        Weight: {dim.weight}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-teal-300">
                        {dim.score} / {dim.maxScore} pts
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          isPositive
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                            : isNeutral
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-700/50'
                        }`}
                      >
                        {dim.impact}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#0c1a17] h-2 rounded-full overflow-hidden my-2 border border-[#122824]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        percentage >= 85
                          ? 'bg-emerald-400'
                          : percentage >= 70
                          ? 'bg-teal-400'
                          : percentage >= 50
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mt-1 font-normal">
                    {dim.rationale}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
