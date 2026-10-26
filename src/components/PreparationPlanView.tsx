import React, { useState } from 'react';
import { PreparationPlanData } from '../types';
import { Calendar, CheckSquare, Square, Clock, Flag, Award } from 'lucide-react';

interface PreparationPlanViewProps {
  data: PreparationPlanData;
}

export const PreparationPlanView: React.FC<PreparationPlanViewProps> = ({ data }) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '0-1': true,
  });

  const toggleTask = (dayIdx: number, taskIdx: number) => {
    const key = `${dayIdx}-${taskIdx}`;
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate overall task completion
  let totalTasks = 0;
  let completedCount = 0;
  data.dailyPlan.forEach((day, dIdx) => {
    day.actionItems.forEach((_, tIdx) => {
      totalTasks++;
      if (completedItems[`${dIdx}-${tIdx}`]) completedCount++;
    });
  });
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">7-Day Sprint Preparation Plan</h2>
          <p className="text-sm text-gray-400 mt-1">
            Structured daily curriculum designed to maximize recall and performance before your interview loop.
          </p>
        </div>

        {/* Progress Tracker Widget */}
        <div className="bg-[#0b1816] border border-[#16332c] px-4 py-2.5 rounded-xl flex items-center gap-4 self-start">
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase">Preparation Progress</div>
            <div className="text-base font-bold text-white font-mono">
              {completedCount}/{totalTasks} tasks ({progressPercent}%)
            </div>
          </div>
          <div className="w-16 bg-[#081312] h-2 rounded-full overflow-hidden border border-[#142925]">
            <div
              className="bg-teal-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Cards */}
      <div className="space-y-4">
        {data.dailyPlan.map((day, dayIdx) => (
          <div
            key={day.dayNumber}
            className="bg-[#0b1816] border border-[#16332c] rounded-xl p-5 hover:border-[#1e443c] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#142925]">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0e2420] text-teal-300 font-mono font-bold text-xs flex items-center justify-center border border-[#1c493f]">
                  D{day.dayNumber}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{day.title}</h4>
                  <p className="text-xs text-gray-400">{day.targetFocus}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-teal-300/80 bg-[#081312] px-2.5 py-1 rounded border border-[#142925] self-start sm:self-auto">
                <Flag className="w-3 h-3 text-teal-400" />
                <span>Milestone: {day.dailyMilestone}</span>
              </div>
            </div>

            {/* Task list with interactive checkboxes */}
            <div className="space-y-2 mt-3">
              {day.actionItems.map((task, taskIdx) => {
                const isChecked = !!completedItems[`${dayIdx}-${taskIdx}`];
                return (
                  <div
                    key={taskIdx}
                    onClick={() => toggleTask(dayIdx, taskIdx)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      isChecked
                        ? 'bg-[#091a17]/60 border-emerald-900/40 text-gray-400'
                        : 'bg-[#081312] border-[#142925] hover:border-[#1d433b] text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span className={`text-xs ${isChecked ? 'line-through text-gray-400' : ''}`}>
                        {task.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{task.durationMinutes}m</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
