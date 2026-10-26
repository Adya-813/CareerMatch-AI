import React, { useState, useEffect } from 'react';
import { StoryBankData } from '../types';
import { Mic, Copy, Check, Clock, Play, RotateCcw, Award, BookOpen } from 'lucide-react';

interface StoryBankViewProps {
  data: StoryBankData;
}

export const StoryBankView: React.FC<StoryBankViewProps> = ({ data }) => {
  const [copiedPitch, setCopiedPitch] = useState<'30' | '60' | 'why' | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTarget, setTimerTarget] = useState<30 | 60>(30);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const startTimer = (target: 30 | 60) => {
    setTimerTarget(target);
    setTimerSeconds(target);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(timerTarget);
  };

  const copyText = (text: string, type: '30' | '60' | 'why') => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(type);
    setTimeout(() => setCopiedPitch(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Story Bank & Executive Pitches</h2>
          <p className="text-sm text-gray-400 mt-1">
            Pre-packaged STAR accomplishment stories, elevator hooks, and customized "Why Us" narratives.
          </p>
        </div>

        {/* Practice Timer Widget */}
        <div className="bg-[#0b1816] border border-[#16332c] px-4 py-2 rounded-xl flex items-center gap-3 self-start">
          <div className="flex items-center gap-1.5 text-xs font-mono text-teal-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Rehearsal Timer:</span>
          </div>
          <span
            className={`text-sm font-mono font-bold ${
              timerSeconds <= 5 && isTimerRunning ? 'text-rose-400 animate-pulse' : 'text-white'
            }`}
          >
            {timerSeconds}s
          </span>
          <div className="flex items-center gap-1">
            {!isTimerRunning ? (
              <button
                onClick={() => startTimer(timerTarget)}
                className="p-1 hover:bg-[#142925] rounded text-teal-400 transition-colors"
                title="Start timer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                onClick={() => setIsTimerRunning(false)}
                className="px-1.5 py-0.5 bg-[#142925] rounded text-[11px] font-mono text-amber-300"
              >
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              className="p-1 hover:bg-[#142925] rounded text-gray-400 hover:text-white transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Elevator Pitches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 30s Pitch */}
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-teal-400 uppercase font-semibold flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" />
                <span>30-SECOND ELEVATOR PITCH</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startTimer(30)}
                  className="text-[11px] font-mono text-gray-400 hover:text-teal-300 transition-colors"
                >
                  Timed (30s)
                </button>
                <button
                  onClick={() => copyText(data.elevatorPitch30s, '30')}
                  className="flex items-center gap-1 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#173831] px-2 py-0.5 rounded cursor-pointer"
                >
                  {copiedPitch === '30' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedPitch === '30' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-sans bg-[#081312] p-4 rounded-lg border border-[#142925]">
              "{data.elevatorPitch30s}"
            </p>
          </div>
          <p className="text-[11px] text-gray-400 mt-3 font-mono">
            Best used: Quick networking introductions, career fairs, or fast recruiter screening calls.
          </p>
        </div>

        {/* 60s Pitch */}
        <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" />
                <span>60-SECOND EXECUTIVE PITCH</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startTimer(60)}
                  className="text-[11px] font-mono text-gray-400 hover:text-teal-300 transition-colors"
                >
                  Timed (60s)
                </button>
                <button
                  onClick={() => copyText(data.elevatorPitch60s, '60')}
                  className="flex items-center gap-1 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#173831] px-2 py-0.5 rounded cursor-pointer"
                >
                  {copiedPitch === '60' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedPitch === '60' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-sans bg-[#081312] p-4 rounded-lg border border-[#142925]">
              "{data.elevatorPitch60s}"
            </p>
          </div>
          <p className="text-[11px] text-gray-400 mt-3 font-mono">
            Best used: "Tell me about yourself" opening question in technical interviews.
          </p>
        </div>
      </div>

      {/* Why This Company */}
      <div className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-amber-300 uppercase font-semibold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>"WHY THIS COMPANY?" TAILORED ANSWER</span>
          </span>
          <button
            onClick={() => copyText(data.whyThisCompanyPitch, 'why')}
            className="flex items-center gap-1 text-xs font-mono text-teal-300 hover:text-white bg-[#081312] border border-[#173831] px-2.5 py-1 rounded cursor-pointer"
          >
            {copiedPitch === 'why' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedPitch === 'why' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <p className="text-xs text-gray-200 leading-relaxed font-sans bg-[#081312] p-4 rounded-lg border border-[#142925]">
          "{data.whyThisCompanyPitch}"
        </p>
      </div>

      {/* Core STAR Stories */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-400" />
          <span>Core STAR Accomplishment Bank ({data.starStories.length} stories)</span>
        </h3>

        <div className="space-y-4">
          {data.starStories.map((story) => (
            <div
              key={story.storyId}
              className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 transition-all hover:border-[#1d433b]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[#142925]">
                <h4 className="text-sm font-bold text-white">{story.storyTitle}</h4>
                <div className="flex flex-wrap gap-1">
                  {story.matchedThemes.map((theme, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#081312] text-teal-300 border border-[#173831]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAR Quadrants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-0.5">
                    [S] SITUATION
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{story.situation}</p>
                </div>

                <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                  <span className="text-[10px] font-mono text-teal-400 font-bold block mb-0.5">
                    [T] TASK
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{story.task}</p>
                </div>

                <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                  <span className="text-[10px] font-mono text-teal-300 font-bold block mb-0.5">
                    [A] ACTION
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{story.action}</p>
                </div>

                <div className="bg-[#081312] p-3 rounded-lg border border-[#142925]">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                    [R] RESULT & PUNCHLINE
                  </span>
                  <p className="text-xs text-emerald-200 font-medium leading-relaxed">{story.result}</p>
                </div>
              </div>

              {/* Punchline metric badge */}
              <div className="p-2.5 bg-[#091816] rounded-lg border border-teal-500/20 text-xs font-mono text-teal-200 flex items-center gap-2">
                <span className="text-teal-400 font-bold">Punchline Metric:</span>
                <span className="text-white font-semibold">{story.punchlineMetric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
