import React from 'react';
import { BadgeType } from '../types';

interface BadgeProps {
  type: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'FACT':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border border-emerald-500/40 bg-emerald-950/60 text-emerald-300 shadow-sm ${className}`}
        >
          FACT
        </span>
      );
    case 'INFERENCE':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border border-amber-500/40 bg-amber-950/60 text-amber-300 shadow-sm ${className}`}
        >
          INFERENCE
        </span>
      );
    case 'AI SUGGESTION':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border border-teal-400/50 bg-teal-950/70 text-teal-200 shadow-sm ${className}`}
        >
          AI SUGGESTION
        </span>
      );
    case 'MODEL KNOWLEDGE':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border border-slate-500/40 bg-slate-900/80 text-slate-300 shadow-sm ${className}`}
        >
          MODEL KNOWLEDGE
        </span>
      );
    default:
      return null;
  }
};
