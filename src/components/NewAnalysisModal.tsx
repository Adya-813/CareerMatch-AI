import React, { useState } from 'react';
import { X, Sparkles, Upload, ArrowRight, Zap } from 'lucide-react';
import { WAYFAIR_SAMPLE_JD, WAYFAIR_SAMPLE_CV } from '../data/sampleProfiles';

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (jd: string, cv: string) => void;
}

export const NewAnalysisModal: React.FC<NewAnalysisModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
}) => {
  const [jdText, setJdText] = useState(WAYFAIR_SAMPLE_JD);
  const [cvText, setCvText] = useState(WAYFAIR_SAMPLE_CV);

  if (!isOpen) return null;

  const handlePresetSelect = (preset: 'wayfair' | 'google' | 'stripe') => {
    if (preset === 'wayfair') {
      setJdText(WAYFAIR_SAMPLE_JD);
      setCvText(WAYFAIR_SAMPLE_CV);
    } else if (preset === 'google') {
      setJdText(`Role: Senior Frontend Engineer (Next.js & Design Systems)
Company: Google
Location: Mountain View, CA / Remote
Requirements:
- 5+ years building accessible, responsive, high-performance web applications using React/Next.js and TypeScript.
- Strong knowledge of Web Performance (Core Web Vitals), state management, and design systems.
- Experience with testing frameworks (Jest, Playwright) and CI/CD pipelines.`);
      setCvText(`Alex Rivera
Senior Software Engineer - 6 years experience
Technical Skills: React, Next.js, TypeScript, Tailwind CSS, Playwright, Node.js
Experience:
- Led frontend redesign for SaaS platform, improving Core Web Vitals (LCP from 3.2s to 1.1s) and conversion by 18%.
- Built reusable component design system adopted by 40+ engineering teams.`);
    } else if (preset === 'stripe') {
      setJdText(`Role: Infrastructure & Systems Engineer (Payments Platform)
Company: Stripe
Location: San Francisco, CA / Seattle / Remote
Requirements:
- Deep experience in distributed systems, high concurrency, and low-latency API design using Go, Java, or C++.
- Expertise with Kafka, Redis, PostgreSQL, and AWS/GCP cloud environments.
- Relentless focus on reliability (99.999% uptime) and idempotent transaction processing.`);
      setCvText(`Jordan Chen
Systems Software Engineer
Technical Skills: Go, Java, Kafka, PostgreSQL, Distributed Systems, Kubernetes, GCP
Experience:
- Engineered distributed payment ingestion pipeline handling 15,000 requests/sec with p99 < 12ms.
- Implemented idempotent settlement protocol preventing duplicate billing events.`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'jd' | 'cv') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        if (target === 'jd') setJdText(content);
        else setCvText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleRun = () => {
    if (!jdText.trim() || !cvText.trim()) return;
    onStartAnalysis(jdText, cvText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#0a1514] border border-[#1b3e37] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-[#142925] flex items-center justify-between bg-[#0c1a17]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Start New Fast Analysis</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-teal-950 text-teal-300 border border-teal-600/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-teal-400" />
                Gemini 3.8 Flash Accelerated
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Paste your target Job Description and Candidate CV or pick a pre-loaded preset.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#142925] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="p-4 bg-[#081312] border-b border-[#142925] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-mono text-[11px] mr-1">Quick Presets:</span>
          <button
            onClick={() => handlePresetSelect('wayfair')}
            className="px-3 py-1 rounded bg-[#102421] hover:bg-[#16332e] text-teal-300 border border-[#1c443b] font-medium transition-colors cursor-pointer"
          >
            Wayfair (GenAI Intern)
          </button>
          <button
            onClick={() => handlePresetSelect('google')}
            className="px-3 py-1 rounded bg-[#102421] hover:bg-[#16332e] text-teal-300 border border-[#1c443b] font-medium transition-colors cursor-pointer"
          >
            Google (Senior Frontend)
          </button>
          <button
            onClick={() => handlePresetSelect('stripe')}
            className="px-3 py-1 rounded bg-[#102421] hover:bg-[#16332e] text-teal-300 border border-[#1c443b] font-medium transition-colors cursor-pointer"
          >
            Stripe (Systems Infrastructure)
          </button>
        </div>

        {/* Form Inputs */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#071110]">
          {/* Job Description Column */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-teal-400 font-semibold">
                1. Job Description (JD)
              </label>
              <label className="text-[11px] text-gray-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Upload TXT</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={(e) => handleFileUpload(e, 'jd')}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={12}
              className="w-full flex-1 bg-[#091514] border border-[#173831] rounded-xl p-3.5 text-xs text-gray-200 font-mono leading-relaxed focus:outline-hidden focus:border-teal-400 resize-none"
              placeholder="Paste complete job description here..."
            />
          </div>

          {/* Candidate CV Column */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                2. Candidate Resume / CV
              </label>
              <label className="text-[11px] text-gray-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Upload TXT</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={(e) => handleFileUpload(e, 'cv')}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={12}
              className="w-full flex-1 bg-[#091514] border border-[#173831] rounded-xl p-3.5 text-xs text-gray-200 font-mono leading-relaxed focus:outline-hidden focus:border-teal-400 resize-none"
              placeholder="Paste candidate resume/CV content here..."
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#091513] border-t border-[#142925] flex items-center justify-between">
          <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
            ⚡ Runs in parallel across 9 intelligence modules
          </p>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleRun}
              disabled={!jdText.trim() || !cvText.trim()}
              className="flex items-center gap-2 bg-[#2dd4bf] hover:bg-[#3bf4dc] active:bg-[#20b8a4] text-[#05231e] font-semibold text-xs px-5 py-2 rounded-lg transition-all shadow-md shadow-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Fast Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
