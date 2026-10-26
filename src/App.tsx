import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewView } from './components/OverviewView';
import { JDAnalysisView } from './components/JDAnalysisView';
import { CVAnalysisView } from './components/CVAnalysisView';
import { FitScoreView } from './components/FitScoreView';
import { StrengthsGapsView } from './components/StrengthsGapsView';
import { CVOptimizerView } from './components/CVOptimizerView';
import { InterviewQuestionsView } from './components/InterviewQuestionsView';
import { CaseInterviewPrepView } from './components/CaseInterviewPrepView';
import { CompanyResearchView } from './components/CompanyResearchView';
import { IndustryResearchView } from './components/IndustryResearchView';
import { StoryBankView } from './components/StoryBankView';
import { PreparationPlanView } from './components/PreparationPlanView';
import { InterviewReadinessView } from './components/InterviewReadinessView';
import { ExportReportModal } from './components/ExportReportModal';
import { NewAnalysisModal } from './components/NewAnalysisModal';
import { ReportSwitcher } from './components/ReportSwitcher';
import { WAYFAIR_INITIAL_REPORT } from './data/sampleProfiles';
import { CareerMatchReport, StepStatus } from './types';
import {
  loadSavedReports,
  saveReportToStorage,
  deleteReportFromStorage,
  getActiveReportId,
  setActiveReportId,
} from './utils/storage';

export default function App() {
  const [savedReports, setSavedReports] = useState<CareerMatchReport[]>(() => loadSavedReports());
  const [report, setReport] = useState<CareerMatchReport>(() => {
    const loaded = loadSavedReports();
    const activeId = getActiveReportId();
    if (activeId) {
      const found = loaded.find((r) => r.id === activeId);
      if (found) return found;
    }
    return loaded[0] || WAYFAIR_INITIAL_REPORT;
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState<boolean>(false);
  const [practiceQuestion, setPracticeQuestion] = useState<string>('');

  const abortControllerRef = useRef<AbortController | null>(null);

  // Tab statuses derived from steps
  const tabStatuses: Record<string, 'done' | 'working' | 'waiting'> = {
    overview: 'done',
    'jd-analysis': report.steps[0]?.status === 'Done' ? 'done' : report.steps[0]?.status === 'Working' ? 'working' : 'waiting',
    'cv-analysis': report.steps[0]?.status === 'Done' ? 'done' : report.steps[0]?.status === 'Working' ? 'working' : 'waiting',
    'fit-score': report.steps[1]?.status === 'Done' ? 'done' : report.steps[1]?.status === 'Working' ? 'working' : 'waiting',
    'strengths-gaps': report.steps[1]?.status === 'Done' ? 'done' : report.steps[1]?.status === 'Working' ? 'working' : 'waiting',
    'cv-optimizer': report.steps[2]?.status === 'Done' ? 'done' : report.steps[2]?.status === 'Working' ? 'working' : 'waiting',
    'interview-questions': report.steps[4]?.status === 'Done' && report.steps[5]?.status === 'Done' ? 'done' : (report.steps[4]?.status === 'Working' || report.steps[5]?.status === 'Working') ? 'working' : 'waiting',
    'case-interview': report.steps[6]?.status === 'Done' ? 'done' : report.steps[6]?.status === 'Working' ? 'working' : 'waiting',
    'company-research': report.steps[3]?.status === 'Done' ? 'done' : report.steps[3]?.status === 'Working' ? 'working' : 'waiting',
    'industry-research': report.steps[3]?.status === 'Done' ? 'done' : report.steps[3]?.status === 'Working' ? 'working' : 'waiting',
    'story-bank': report.steps[7]?.status === 'Done' ? 'done' : report.steps[7]?.status === 'Working' ? 'working' : 'waiting',
    'prep-plan': report.steps[8]?.status === 'Done' ? 'done' : report.steps[8]?.status === 'Working' ? 'working' : 'waiting',
    readiness: report.steps[8]?.status === 'Done' ? 'done' : report.steps[8]?.status === 'Working' ? 'working' : 'waiting',
  };

  const completedStepsCount = report.steps.filter((s) => s.status === 'Done').length;
  const totalStepsCount = report.steps.length;

  const handleSelectReport = (selected: CareerMatchReport) => {
    setReport(selected);
    setActiveReportId(selected.id);
    setActiveTab('overview');
  };

  const handleDeleteReport = (reportId: string) => {
    const { updatedList, nextActiveId } = deleteReportFromStorage(reportId);
    setSavedReports(updatedList);
    if (report.id === reportId && nextActiveId) {
      const nextReport = updatedList.find((r) => r.id === nextActiveId);
      if (nextReport) setReport(nextReport);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsProcessing(false);
    setReport((prev) => {
      const updated = {
        ...prev,
        steps: prev.steps.map((s) => (s.status === 'Working' ? { ...s, status: 'Done' as StepStatus } : s)),
      };
      saveReportToStorage(updated);
      setSavedReports(loadSavedReports());
      return updated;
    });
  };

  const handlePracticeQuestion = (questionText: string) => {
    setPracticeQuestion(questionText);
    setActiveTab('readiness');
  };

  // Launch fast analysis pipeline
  const handleStartAnalysis = async (jd: string, cv: string) => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsProcessing(true);
    setActiveTab('overview');

    const newReportId = `rep-${Date.now()}`;

    // Reset steps to initial state
    const initialSteps = [
      { id: 'step-1', name: 'Reading the JD and CV', status: 'Working' as StepStatus },
      { id: 'step-2', name: 'Scoring job fit', status: 'Waiting' as StepStatus },
      { id: 'step-3', name: 'Optimising the CV', status: 'Waiting' as StepStatus },
      { id: 'step-4', name: 'Researching the company on the web', status: 'Waiting' as StepStatus },
      { id: 'step-5', name: 'Interview questions, part 1', status: 'Waiting' as StepStatus },
      { id: 'step-6', name: 'Interview questions, part 2', status: 'Waiting' as StepStatus },
      { id: 'step-7', name: 'Case interview prep', status: 'Waiting' as StepStatus },
      { id: 'step-8', name: 'Story bank and pitches', status: 'Waiting' as StepStatus },
      { id: 'step-9', name: 'Preparation plan and readiness', status: 'Waiting' as StepStatus },
    ];

    const interimReport: CareerMatchReport = {
      ...report,
      id: newReportId,
      createdAt: new Date().toISOString(),
      steps: initialSteps,
      overview: {
        ...report.overview,
        jobFitScore: 0,
        atsScore: 0,
        interviewReadinessScore: 0,
        topStrengths: [],
        gapsToAddress: [],
      },
    };

    setReport(interimReport);

    try {
      // Step 1: Stage 1 Fast Parse
      const stage1Res = await fetch('/api/analyze/stage1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jdText: jd, cvText: cv }),
        signal,
      });

      if (!stage1Res.ok) throw new Error('Stage 1 failed');
      const stage1Data = await stage1Res.json();

      setReport((prev) => ({
        ...prev,
        overview: {
          ...prev.overview,
          ...stage1Data,
        },
        steps: prev.steps.map((s, idx) =>
          idx === 0
            ? { ...s, status: 'Done' }
            : idx === 1
            ? { ...s, status: 'Working' }
            : s
        ),
      }));

      // Step 2 & 3 in parallel
      const stage2Promise = fetch('/api/analyze/stage2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jdText: jd, cvText: cv, overview: stage1Data }),
        signal,
      }).then((r) => r.json());

      const stage3Promise = fetch('/api/analyze/stage3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jdText: jd, cvText: cv, overview: stage1Data }),
        signal,
      }).then((r) => r.json());

      const [stage2Data, stage3Data] = await Promise.all([stage2Promise, stage3Promise]);

      setReport((prev) => {
        const finalized: CareerMatchReport = {
          ...prev,
          jdAnalysis: stage2Data.jdAnalysis || prev.jdAnalysis,
          cvAnalysis: stage2Data.cvAnalysis || prev.cvAnalysis,
          fitScore: stage2Data.fitScore || prev.fitScore,
          strengthsGaps: stage2Data.strengthsGaps || prev.strengthsGaps,
          cvOptimizer: stage2Data.cvOptimizer || prev.cvOptimizer,
          interviewQuestions: stage3Data.interviewQuestions || prev.interviewQuestions,
          caseInterviewPrep: stage3Data.caseInterviewPrep || prev.caseInterviewPrep,
          companyResearch: stage3Data.companyResearch || prev.companyResearch,
          industryResearch: stage3Data.industryResearch || prev.industryResearch,
          storyBank: stage3Data.storyBank || prev.storyBank,
          prepPlan: stage3Data.prepPlan || prev.prepPlan,
          readiness: stage3Data.readiness || prev.readiness,
          steps: prev.steps.map((s) => ({ ...s, status: 'Done' as StepStatus })),
        };

        // Persist to localStorage (automatically caps to recent 3)
        const updatedList = saveReportToStorage(finalized);
        setSavedReports(updatedList);
        return finalized;
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Analysis aborted by user');
      } else {
        console.error('Analysis error:', err);
        setReport(WAYFAIR_INITIAL_REPORT);
      }
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-[#071312] text-gray-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Header */}
      <Header
        completedStepsCount={completedStepsCount}
        totalStepsCount={totalStepsCount}
        isProcessing={isProcessing}
        onStop={handleStop}
        onExport={() => setIsExportOpen(true)}
        onNewAnalysis={() => setIsNewAnalysisOpen(true)}
        currentReport={report}
        savedReports={savedReports}
        onSelectReport={handleSelectReport}
        onDeleteReport={handleDeleteReport}
      />

      {/* Mobile Switcher Bar */}
      <div className="sm:hidden px-4 py-2 bg-[#091514] border-b border-[#142925] flex items-center justify-between">
        <span className="text-[11px] font-mono text-gray-400">Application:</span>
        <ReportSwitcher
          currentReport={report}
          savedReports={savedReports}
          onSelectReport={handleSelectReport}
          onDeleteReport={handleDeleteReport}
        />
      </div>

      {/* Main Workspace with Fixed Sidebar and Scrolling Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          tabStatuses={tabStatuses}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-5xl overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewView
              overview={report.overview}
              steps={report.steps}
              isProcessing={isProcessing}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'jd-analysis' && <JDAnalysisView data={report.jdAnalysis} />}

          {activeTab === 'cv-analysis' && <CVAnalysisView data={report.cvAnalysis} />}

          {activeTab === 'fit-score' && <FitScoreView data={report.fitScore} />}

          {activeTab === 'strengths-gaps' && <StrengthsGapsView data={report.strengthsGaps} />}

          {activeTab === 'cv-optimizer' && <CVOptimizerView data={report.cvOptimizer} />}

          {activeTab === 'interview-questions' && (
            <InterviewQuestionsView
              data={report.interviewQuestions}
              onPracticeQuestion={handlePracticeQuestion}
            />
          )}

          {activeTab === 'case-interview' && (
            <CaseInterviewPrepView data={report.caseInterviewPrep} />
          )}

          {activeTab === 'company-research' && (
            <CompanyResearchView data={report.companyResearch} />
          )}

          {activeTab === 'industry-research' && (
            <IndustryResearchView data={report.industryResearch} />
          )}

          {activeTab === 'story-bank' && <StoryBankView data={report.storyBank} />}

          {activeTab === 'prep-plan' && <PreparationPlanView data={report.prepPlan} />}

          {activeTab === 'readiness' && (
            <InterviewReadinessView
              data={report.readiness}
              prefilledQuestion={practiceQuestion}
              companyName={report.overview.company}
              targetRole={report.overview.targetRole}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {isExportOpen && (
        <ExportReportModal
          report={report}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      <NewAnalysisModal
        isOpen={isNewAnalysisOpen}
        onClose={() => setIsNewAnalysisOpen(false)}
        onStartAnalysis={handleStartAnalysis}
      />
    </div>
  );
}
