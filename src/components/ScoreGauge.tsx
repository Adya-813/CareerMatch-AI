import React from 'react';

interface ScoreGaugeProps {
  score: number | null;
  label: string;
  statusText?: string;
  onViewDetails?: () => void;
  accentColor?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label,
  statusText,
  onViewDetails,
}) => {
  const isScored = score !== null && score !== undefined && score > 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const safeScore = score ?? 0;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  let colorClass = 'stroke-teal-400';
  let badgeColor = 'text-teal-300';
  if (safeScore >= 80) {
    colorClass = 'stroke-emerald-400';
    badgeColor = 'text-emerald-400';
  } else if (safeScore >= 60) {
    colorClass = 'stroke-amber-400';
    badgeColor = 'text-amber-300';
  } else if (isScored) {
    colorClass = 'stroke-rose-400';
    badgeColor = 'text-rose-300';
  }

  return (
    <div className="flex-1 bg-[#0f201d]/90 border border-[#1a3832] rounded-xl p-5 flex items-center justify-between transition-all hover:border-[#28574d] hover:bg-[#122622]">
      <div className="flex items-center gap-5">
        {/* Circular Progress Gauge */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-[#152e29]"
            />
            {isScored && (
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={`${colorClass} transition-all duration-1000 ease-out`}
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {isScored ? (
              <>
                <span className="text-xl font-bold text-white tracking-tight leading-none">
                  {score}
                </span>
                <span className="text-[10px] text-teal-400/80 font-mono mt-0.5">/ 100</span>
              </>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-400 leading-none">—</span>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5">/ 100</span>
              </>
            )}
          </div>
        </div>

        {/* Labels & Status */}
        <div className="flex flex-col">
          <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-semibold mb-1">
            {label}
          </span>
          <span className={`text-sm font-medium ${isScored ? badgeColor : 'text-gray-400'}`}>
            {isScored ? (statusText || `${score}% Match`) : 'Not scored'}
          </span>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="mt-2 text-xs text-teal-300 hover:text-teal-100 flex items-center gap-1 font-medium transition-colors text-left group"
            >
              <span>View details</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
