import React from 'react';
import { JDAnalysisData } from '../types';
import { Check, Cpu, Sparkles, UserCheck, Eye, Target } from 'lucide-react';

interface JDAnalysisViewProps {
  data: JDAnalysisData;
}

export const JDAnalysisView: React.FC<JDAnalysisViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Job Description Analysis</h2>
        <p className="text-sm text-gray-400 mt-1">
          Deep structural breakdown of requirements, hidden expectations, and the hiring team's priorities.
        </p>
      </div>

      {/* Role Profile Card */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#142925]">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-semibold">ROLE SPECIFICATION</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{data.jobTitle}</h3>
            <p className="text-sm text-teal-300/80 font-medium">{data.company} • {data.level}</p>
          </div>
          <div className="flex items-center gap-2 bg-[#081312] border border-[#173831] px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300">
            <Target className="w-3.5 h-3.5 text-teal-400" />
            <span>Target Competency: AI-First / Full-Stack</span>
          </div>
        </div>

        {/* Ideal Candidate Profile & Hiring Manager Persona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#081312] border border-[#142925] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-semibold mb-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>IDEAL CANDIDATE PROFILE</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {data.idealCandidateProfile}
            </p>
          </div>

          <div className="bg-[#081312] border border-[#142925] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>HIRING MANAGER PERSONA</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {data.hiringManagerPersona}
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>Required Technologies & Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.requiredTechStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#0f2420] text-teal-200 border border-[#1a453c]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Preferred / Bonus Qualifications</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.preferredQualifications.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#132219] text-emerald-200 border border-[#1e4835]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-3">Key Responsibilities</h4>
        <div className="space-y-2.5">
          {data.keyResponsibilities.map((resp, i) => (
            <div key={i} className="flex items-start gap-3 p-2.5 bg-[#081312] rounded-lg border border-[#142925]">
              <span className="w-5 h-5 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center shrink-0 text-xs font-mono mt-0.5 border border-teal-800/40">
                <Check className="w-3 h-3" />
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">{resp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Expectations & Unwritten Rules */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <h4 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
          <span>Hidden Expectations (Read Between the Lines)</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.hiddenExpectations.map((exp, i) => (
            <div key={i} className="p-3 bg-amber-950/20 border border-amber-600/30 rounded-lg text-xs text-amber-200/90 leading-relaxed">
              <span className="font-semibold text-amber-300 block mb-1">Insight #{i + 1}:</span>
              {exp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
