import React from 'react';

export interface NavItem {
  id: string;
  num: string;
  label: string;
  status: 'done' | 'working' | 'waiting';
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (id: string) => void;
  tabStatuses: Record<string, 'done' | 'working' | 'waiting'>;
}

export const NAV_ITEMS: Array<{ id: string; num: string; label: string }> = [
  { id: 'overview', num: '01', label: 'Overview' },
  { id: 'jd-analysis', num: '02', label: 'JD Analysis' },
  { id: 'cv-analysis', num: '03', label: 'CV Analysis' },
  { id: 'fit-score', num: '04', label: 'Fit Score' },
  { id: 'strengths-gaps', num: '05', label: 'Strengths and Gaps' },
  { id: 'cv-optimizer', num: '06', label: 'CV Optimizer' },
  { id: 'interview-questions', num: '07', label: 'Interview Questions' },
  { id: 'case-interview', num: '08', label: 'Case Interview Prep' },
  { id: 'company-research', num: '09', label: 'Company Research' },
  { id: 'industry-research', num: '10', label: 'Industry Research' },
  { id: 'story-bank', num: '11', label: 'Story Bank' },
  { id: 'prep-plan', num: '12', label: 'Preparation Plan' },
  { id: 'readiness', num: '13', label: 'Interview Readiness' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  tabStatuses,
}) => {
  return (
    <aside className="w-64 lg:w-72 bg-[#091514] border-r border-[#142925] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 overflow-y-auto">
      {/* Navigation List */}
      <nav className="p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const status = tabStatuses[item.id] || 'done';

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#122824] text-white font-medium border border-[#1d423b]'
                  : 'text-gray-300 hover:bg-[#0d1f1c] hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-medium ${
                    isActive ? 'text-teal-400' : 'text-teal-600/70'
                  }`}
                >
                  {item.num}
                </span>
                <span className="text-xs tracking-tight font-medium">
                  {item.label}
                </span>
              </div>

              {/* Status indicator dot */}
              <div className="flex items-center pl-2">
                {status === 'done' ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/30" />
                ) : status === 'working' ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-600/70" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Disclaimer */}
      <div className="p-4 border-t border-[#142925] bg-[#071110]">
        <p className="text-[11px] text-gray-400/80 leading-relaxed font-normal">
          Scores are AI estimates of how well a CV matches a job description. They are not a prediction of being hired.
        </p>
      </div>
    </aside>
  );
};
