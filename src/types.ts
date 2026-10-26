export type BadgeType = 'FACT' | 'INFERENCE' | 'AI SUGGESTION' | 'MODEL KNOWLEDGE';

export type StepStatus = 'Done' | 'Working' | 'Waiting' | 'Error';

export interface AnalysisStep {
  id: string;
  name: string;
  status: StepStatus;
  startedAt?: number;
  completedAt?: number;
}

export interface OverviewData {
  targetRole: string;
  company: string;
  roleSummary: string;
  jobFitScore: number;
  atsScore: number;
  interviewReadinessScore: number;
  topStrengths: Array<{
    title: string;
    detail: string;
    badge: BadgeType;
    evidence?: string;
  }>;
  gapsToAddress: Array<{
    title: string;
    detail: string;
    addPlaceholder?: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

export interface JDAnalysisData {
  jobTitle: string;
  company: string;
  level: string;
  keyResponsibilities: string[];
  requiredTechStack: string[];
  preferredQualifications: string[];
  domainKnowledge: string[];
  hiddenExpectations: string[];
  hiringManagerPersona: string;
  idealCandidateProfile: string;
}

export interface CVAnalysisData {
  candidateName: string;
  detectedRole: string;
  executiveSummary: string;
  skillsFound: string[];
  missingKeywords: string[];
  quantifiedImpactScore: number; // 0-100
  atsAuditFindings: Array<{
    severity: 'critical' | 'warning' | 'pass';
    category: string;
    finding: string;
    fixRecommendation: string;
  }>;
}

export interface FitScoreData {
  overallScore: number;
  verdict: string;
  percentileRank: string;
  dimensionScores: Array<{
    category: string;
    score: number;
    maxScore: number;
    weight: string;
    rationale: string;
    impact: 'Positive' | 'Neutral' | 'Penalty';
  }>;
  keyTakeaway: string;
}

export interface StrengthsGapsData {
  strengths: Array<{
    title: string;
    badge: BadgeType;
    evidence: string;
    impactOnRole: string;
  }>;
  gaps: Array<{
    title: string;
    severity: 'high' | 'medium' | 'low';
    gapDetail: string;
    addTag: string; // e.g. [ADD: Concrete GenAI fine-tuning metric]
    actionToBridge: string;
  }>;
}

export interface CVOptimizerData {
  optimizationOverview: string;
  targetedKeywords: string[];
  bulletRevisions: Array<{
    context: string;
    originalBullet: string;
    optimizedBullet: string;
    framework: string;
    metricAdded: string;
    addedKeywords: string[];
  }>;
  tailoredExecutiveBio: string;
  skillsMatrixRearrangement: string[];
}

export interface InterviewQuestionsData {
  technical: Array<{
    question: string;
    whyAsked: string;
    interviewerExpectedDepth: string;
    recommendedStarAnswer: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
    redFlagsToAvoid: string;
    followUpProbabilities: string[];
  }>;
  behavioral: Array<{
    question: string;
    coreCompetency: string;
    whyAsked: string;
    recommendedStarAnswer: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
    commonPitfall: string;
  }>;
}

export interface CaseInterviewPrepData {
  scenarioTitle: string;
  clientContext: string;
  businessProblem: string;
  problemStatement?: string;
  architectureFramework: string[];
  stepByStepSolution: Array<{
    phase: string;
    proposal: string;
    tradeoffsConsidered: string;
  }>;
  keyMetricsAndMonitoring: string[];
  interviewerSurprisePivot: string;
}

export interface CompanyResearchData {
  company: string;
  industry: string;
  headquarters: string;
  missionStatement: string;
  coreBusinessLines: string[];
  recentTechInitiatives: string[];
  engineeringCultureSignals: string[];
  talkingPointsForCandidate: string[];
  interviewQuestionsToAskThem: string[];
}

export interface IndustryResearchData {
  sector: string;
  marketDynamics: string[];
  majorCompetitors: string[];
  genAiDisruptionVectors: string[];
  macroEconomicTrends: string[];
  candidateInsiderTips: string[];
}

export interface StoryBankData {
  elevatorPitch30s: string;
  elevatorPitch60s: string;
  whyThisCompanyPitch: string;
  starStories: Array<{
    storyId: string;
    storyTitle: string;
    matchedThemes: string[];
    situation: string;
    task: string;
    action: string;
    result: string;
    punchlineMetric: string;
  }>;
  stories?: Array<{
    storyId: string;
    storyTitle: string;
    matchedThemes: string[];
    situation: string;
    task: string;
    action: string;
    result: string;
    punchlineMetric: string;
  }>;
}

export interface PreparationPlanData {
  totalEstimatedHours: number;
  dailyPlan: Array<{
    dayNumber: number;
    title: string;
    targetFocus: string;
    actionItems: Array<{
      description: string;
      durationMinutes: number;
      completed?: boolean;
    }>;
    dailyMilestone: string;
  }>;
}

export interface InterviewReadinessData {
  overallReadinessScore: number;
  readinessVerdict: string;
  categories: Array<{
    name: string;
    score: number;
    status: 'Ready' | 'Review needed' | 'Critical gap';
    advice: string;
  }>;
  rapidFirePracticeQuestions: string[];
  finalDayChecklist: string[];
}

export interface CareerMatchReport {
  id: string;
  createdAt: string;
  overview: OverviewData;
  jdAnalysis: JDAnalysisData;
  cvAnalysis: CVAnalysisData;
  fitScore: FitScoreData;
  strengthsGaps: StrengthsGapsData;
  cvOptimizer: CVOptimizerData;
  interviewQuestions: InterviewQuestionsData;
  caseInterviewPrep: CaseInterviewPrepData;
  companyResearch: CompanyResearchData;
  industryResearch: IndustryResearchData;
  storyBank: StoryBankData;
  prepPlan: PreparationPlanData;
  readiness: InterviewReadinessData;
  steps: AnalysisStep[];
}
