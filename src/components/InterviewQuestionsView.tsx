import React, { useState } from 'react';
import { InterviewQuestionsData } from '../types';
import { HelpCircle, Code2, Users, AlertCircle, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface InterviewQuestionsViewProps {
  data: InterviewQuestionsData;
  onPracticeQuestion?: (questionText: string) => void;
}

export const InterviewQuestionsView: React.FC<InterviewQuestionsViewProps> = ({
  data,
  onPracticeQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');
  const [expandedIndices, setExpandedIndices] = useState<Record<string, boolean>>({
    'tech-0': true,
    'behav-0': true,
  });

  const toggleExpand = (key: string) => {
    setExpandedIndices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Interview Questions & Model Answers</h2>
          <p className="text-sm text-gray-400 mt-1">
            Real questions calibrated to this company's hiring loops, complete with STAR answers and traps to avoid.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-[#0b1816] p-1 rounded-lg border border-[#16332c] self-start">
          <button
            onClick={() => setActiveTab('technical')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeTab === 'technical'
                ? 'bg-[#183630] text-teal-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical & Architecture ({data.technical.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('behavioral')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeTab === 'behavioral'
                ? 'bg-[#183630] text-teal-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Behavioral & Culture ({data.behavioral.length})</span>
          </button>
        </div>
      </div>

      {/* Technical Questions */}
      {activeTab === 'technical' && (
        <div className="space-y-5">
          {data.technical.map((item, i) => {
            const key = `tech-${i}`;
            const isExpanded = expandedIndices[key] ?? false;

            return (
              <div
                key={i}
                className="bg-[#0b1816] border border-[#16332c] rounded-xl overflow-hidden transition-all hover:border-[#204a40]"
              >
                <div
                  onClick={() => toggleExpand(key)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-[#0c1c18]"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-6 h-6 rounded-md bg-teal-950 text-teal-300 flex items-center justify-center shrink-0 font-mono text-xs font-bold border border-teal-800/50 mt-0.5">
                      Q{i + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {item.question}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="text-teal-400 font-semibold font-mono">Why Asked:</span> {item.whyAsked}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {onPracticeQuestion && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPracticeQuestion(item.question);
                        }}
                        className="hidden sm:flex items-center gap-1 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#173831] px-2.5 py-1 rounded transition-colors"
                      >
                        <span>Practice</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-[#142925] space-y-4 bg-[#091513]">
                    {/* Expected Depth */}
                    <div className="bg-[#081312] p-3.5 rounded-lg border border-[#142925]">
                      <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block mb-1">
                        INTERVIEWER EXPECTED DEPTH
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.interviewerExpectedDepth}
                      </p>
                    </div>

                    {/* Model STAR Answer */}
                    <div>
                      <span className="text-xs font-mono uppercase text-teal-300 font-semibold block mb-2">
                        MODEL ANSWER (STAR FORMAT)
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-0.5">
                            [S] SITUATION
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.situation}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-teal-400 font-bold block mb-0.5">
                            [T] TASK
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.task}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-teal-300 font-bold block mb-0.5">
                            [A] ACTION
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.action}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                            [R] RESULT & METRIC
                          </span>
                          <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                            {item.recommendedStarAnswer.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Red Flags & Pitfalls */}
                    <div className="bg-rose-950/20 border border-rose-700/40 p-3 rounded-lg flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-rose-400 font-bold block">
                          TRAP TO AVOID:
                        </span>
                        <p className="text-xs text-rose-200/90 leading-relaxed mt-0.5">
                          {item.redFlagsToAvoid}
                        </p>
                      </div>
                    </div>

                    {/* Follow up probes */}
                    {item.followUpProbabilities && (
                      <div className="bg-[#081312] p-3.5 rounded-lg border border-[#142925]">
                        <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-1">
                          PROBABLE FOLLOW-UP QUESTIONS:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-xs text-teal-200/90 font-mono">
                          {item.followUpProbabilities.map((f, fidx) => (
                            <li key={fidx}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Behavioral Questions */}
      {activeTab === 'behavioral' && (
        <div className="space-y-5">
          {data.behavioral.map((item, i) => {
            const key = `behav-${i}`;
            const isExpanded = expandedIndices[key] ?? false;

            return (
              <div
                key={i}
                className="bg-[#0b1816] border border-[#16332c] rounded-xl overflow-hidden transition-all hover:border-[#204a40]"
              >
                <div
                  onClick={() => toggleExpand(key)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-[#0c1c18]"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-6 h-6 rounded-md bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 font-mono text-xs font-bold border border-amber-800/50 mt-0.5">
                      BQ{i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase bg-[#081513] text-teal-300 px-2 py-0.5 rounded border border-[#183932]">
                          Competency: {item.coreCompetency}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {item.question}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="text-teal-400 font-semibold font-mono">Intent:</span> {item.whyAsked}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {onPracticeQuestion && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPracticeQuestion(item.question);
                        }}
                        className="hidden sm:flex items-center gap-1 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#173831] px-2.5 py-1 rounded transition-colors"
                      >
                        <span>Practice</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-[#142925] space-y-4 bg-[#091513]">
                    {/* Recommended STAR */}
                    <div>
                      <span className="text-xs font-mono uppercase text-teal-300 font-semibold block mb-2">
                        TAILORED STAR RESPONSE
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-0.5">
                            [S] SITUATION
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.situation}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-teal-400 font-bold block mb-0.5">
                            [T] TASK
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.task}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-teal-300 font-bold block mb-0.5">
                            [A] ACTION
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed font-normal">
                            {item.recommendedStarAnswer.action}
                          </p>
                        </div>

                        <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                          <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                            [R] RESULT & LEARNING
                          </span>
                          <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                            {item.recommendedStarAnswer.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Common Pitfall */}
                    <div className="bg-amber-950/20 border border-amber-600/40 p-3 rounded-lg flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-amber-400 font-bold block">
                          PITFALL TO WATCH OUT FOR:
                        </span>
                        <p className="text-xs text-amber-200/90 leading-relaxed mt-0.5">
                          {item.commonPitfall}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
