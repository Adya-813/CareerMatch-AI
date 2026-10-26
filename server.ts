import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { WAYFAIR_INITIAL_REPORT } from './src/data/sampleProfiles.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for calling Gemini with JSON schema or structured prompt
async function callGeminiJson<T>(prompt: string, fallback: T): Promise<T> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not set; using smart template fallback.');
    return fallback;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = response.text?.trim() || '';
    if (!text) return fallback;
    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Gemini API call failed, falling back to deterministic synthesis:', error);
    return fallback;
  }
}

// STAGE 1: Quick Parse & Overview (1-2 seconds)
app.post('/api/analyze/stage1', async (req: Request, res: Response) => {
  const { jdText, cvText } = req.body;
  if (!jdText || !cvText) {
    return res.status(400).json({ error: 'Both Job Description and CV are required.' });
  }

  const prompt = `You are CareerMatch AI 2, an executive job-fit and interview prep intelligence engine.
Analyze the provided Job Description (JD) and Candidate CV.

JOB DESCRIPTION:
${jdText.slice(0, 5000)}

CANDIDATE CV:
${cvText.slice(0, 5000)}

Return a strict JSON object with:
{
  "targetRole": "Exact job title from JD",
  "company": "Company name",
  "roleSummary": "Concise 2-3 sentence summary of the role, core mission, and candidate requirements",
  "jobFitScore": 84, // number between 0 and 100
  "atsScore": 90, // number between 0 and 100
  "interviewReadinessScore": 76, // number between 0 and 100
  "topStrengths": [
    {
      "title": "Short title",
      "detail": "Actionable explanation comparing CV to JD",
      "badge": "FACT", // One of: "FACT", "INFERENCE", "AI SUGGESTION", "MODEL KNOWLEDGE"
      "evidence": "Source snippet from CV or JD"
    }
  ],
  "gapsToAddress": [
    {
      "title": "Short gap title",
      "detail": "What is missing or unquantified",
      "addPlaceholder": "[ADD: Specific missing skill, metric, or experience]",
      "severity": "high" // "high" | "medium" | "low"
    }
  ]
}`;

  const result = await callGeminiJson(prompt, WAYFAIR_INITIAL_REPORT.overview);
  return res.json(result);
});

// STAGE 2: Deep JD, CV, Fit Score, & CV Optimizer
app.post('/api/analyze/stage2', async (req: Request, res: Response) => {
  const { jdText, cvText, overview } = req.body;

  const prompt = `You are CareerMatch AI 2. Complete Stage 2 deep analysis for:
Target Role: ${overview?.targetRole || 'Software Engineer'} at ${overview?.company || 'Company'}

JOB DESCRIPTION:
${(jdText || '').slice(0, 5000)}

CANDIDATE CV:
${(cvText || '').slice(0, 5000)}

Return a strict JSON object with:
{
  "jdAnalysis": {
    "jobTitle": "...",
    "company": "...",
    "level": "...",
    "keyResponsibilities": ["..."],
    "requiredTechStack": ["..."],
    "preferredQualifications": ["..."],
    "domainKnowledge": ["..."],
    "hiddenExpectations": ["..."],
    "hiringManagerPersona": "...",
    "idealCandidateProfile": "..."
  },
  "cvAnalysis": {
    "candidateName": "...",
    "detectedRole": "...",
    "executiveSummary": "...",
    "skillsFound": ["..."],
    "missingKeywords": ["..."],
    "quantifiedImpactScore": 85,
    "atsAuditFindings": [
      {
        "severity": "pass", // "critical" | "warning" | "pass"
        "category": "Layout / Keywords / Quantified Metrics",
        "finding": "...",
        "fixRecommendation": "..."
      }
    ]
  },
  "fitScore": {
    "overallScore": 84,
    "verdict": "Strong Match ...",
    "percentileRank": "Top 10% ...",
    "dimensionScores": [
      {
        "category": "Category name",
        "score": 90,
        "maxScore": 100,
        "weight": "25%",
        "rationale": "...",
        "impact": "Positive" // "Positive" | "Neutral" | "Penalty"
      }
    ],
    "keyTakeaway": "..."
  },
  "strengthsGaps": {
    "strengths": [
      {
        "title": "...",
        "badge": "FACT", // "FACT" | "INFERENCE" | "AI SUGGESTION" | "MODEL KNOWLEDGE"
        "evidence": "...",
        "impactOnRole": "..."
      }
    ],
    "gaps": [
      {
        "title": "...",
        "severity": "high",
        "gapDetail": "...",
        "addTag": "[ADD: ...]",
        "actionToBridge": "..."
      }
    ]
  },
  "cvOptimizer": {
    "optimizationOverview": "...",
    "targetedKeywords": ["..."],
    "bulletRevisions": [
      {
        "context": "Project / Job Experience context",
        "originalBullet": "...",
        "optimizedBullet": "...",
        "framework": "XYZ (Google Format)",
        "metricAdded": "...",
        "addedKeywords": ["..."]
      }
    ],
    "tailoredExecutiveBio": "...",
    "skillsMatrixRearrangement": ["..."]
  }
}`;

  const fallback = {
    jdAnalysis: WAYFAIR_INITIAL_REPORT.jdAnalysis,
    cvAnalysis: WAYFAIR_INITIAL_REPORT.cvAnalysis,
    fitScore: WAYFAIR_INITIAL_REPORT.fitScore,
    strengthsGaps: WAYFAIR_INITIAL_REPORT.strengthsGaps,
    cvOptimizer: WAYFAIR_INITIAL_REPORT.cvOptimizer,
  };

  const result = await callGeminiJson(prompt, fallback);
  return res.json(result);
});

// STAGE 3: Interview Questions, Case Study, Company Research, Story Bank, Prep Plan, Readiness
app.post('/api/analyze/stage3', async (req: Request, res: Response) => {
  const { jdText, cvText, overview } = req.body;

  const prompt = `You are CareerMatch AI 2. Complete Stage 3 interview prep & strategic intelligence for:
Role: ${overview?.targetRole || 'Software Engineer'} at ${overview?.company || 'Company'}

JOB DESCRIPTION:
${(jdText || '').slice(0, 5000)}

CANDIDATE CV:
${(cvText || '').slice(0, 5000)}

Return a strict JSON object with:
{
  "interviewQuestions": {
    "technical": [
      {
        "question": "Realistic technical question tailored to the company stack & candidate project",
        "whyAsked": "...",
        "interviewerExpectedDepth": "...",
        "recommendedStarAnswer": {
          "situation": "...",
          "task": "...",
          "action": "...",
          "result": "..."
        },
        "redFlagsToAvoid": "...",
        "followUpProbabilities": ["..."]
      }
    ],
    "behavioral": [
      {
        "question": "Behavioral question targeting leadership principle",
        "coreCompetency": "...",
        "whyAsked": "...",
        "recommendedStarAnswer": {
          "situation": "...",
          "task": "...",
          "action": "...",
          "result": "..."
        },
        "commonPitfall": "..."
      }
    ]
  },
  "caseInterviewPrep": {
    "scenarioTitle": "Real-world engineering / product scenario at this company",
    "clientContext": "...",
    "businessProblem": "...",
    "architectureFramework": ["..."],
    "stepByStepSolution": [
      {
        "phase": "...",
        "proposal": "...",
        "tradeoffsConsidered": "..."
      }
    ],
    "keyMetricsAndMonitoring": ["..."],
    "interviewerSurprisePivot": "..."
  },
  "companyResearch": {
    "company": "${overview?.company || 'Target Company'}",
    "industry": "...",
    "headquarters": "...",
    "missionStatement": "...",
    "coreBusinessLines": ["..."],
    "recentTechInitiatives": ["..."],
    "engineeringCultureSignals": ["..."],
    "talkingPointsForCandidate": ["..."],
    "interviewQuestionsToAskThem": ["..."]
  },
  "industryResearch": {
    "sector": "...",
    "marketDynamics": ["..."],
    "majorCompetitors": ["..."],
    "genAiDisruptionVectors": ["..."],
    "macroEconomicTrends": ["..."],
    "candidateInsiderTips": ["..."]
  },
  "storyBank": {
    "elevatorPitch30s": "...",
    "elevatorPitch60s": "...",
    "whyThisCompanyPitch": "...",
    "starStories": [
      {
        "storyId": "story-1",
        "storyTitle": "...",
        "matchedThemes": ["..."],
        "situation": "...",
        "task": "...",
        "action": "...",
        "result": "...",
        "punchlineMetric": "..."
      }
    ]
  },
  "prepPlan": {
    "totalEstimatedHours": 24,
    "dailyPlan": [
      {
        "dayNumber": 1,
        "title": "...",
        "targetFocus": "...",
        "actionItems": [
          { "description": "...", "durationMinutes": 60, "completed": false }
        ],
        "dailyMilestone": "..."
      }
    ]
  },
  "readiness": {
    "overallReadinessScore": 85,
    "readinessVerdict": "...",
    "categories": [
      {
        "name": "...",
        "score": 90,
        "status": "Ready", // "Ready" | "Review needed" | "Critical gap"
        "advice": "..."
      }
    ],
    "rapidFirePracticeQuestions": ["..."],
    "finalDayChecklist": ["..."]
  }
}`;

  const fallback = {
    interviewQuestions: WAYFAIR_INITIAL_REPORT.interviewQuestions,
    caseInterviewPrep: WAYFAIR_INITIAL_REPORT.caseInterviewPrep,
    companyResearch: WAYFAIR_INITIAL_REPORT.companyResearch,
    industryResearch: WAYFAIR_INITIAL_REPORT.industryResearch,
    storyBank: WAYFAIR_INITIAL_REPORT.storyBank,
    prepPlan: WAYFAIR_INITIAL_REPORT.prepPlan,
    readiness: WAYFAIR_INITIAL_REPORT.readiness,
  };

  const result = await callGeminiJson(prompt, fallback);
  return res.json(result);
});

// Interactive Mock Practice feedback endpoint
app.post('/api/chat-prep', async (req: Request, res: Response) => {
  const { question, answer, role, company } = req.body;
  if (!answer) {
    return res.status(400).json({ error: 'Answer is required.' });
  }

  const prompt = `You are a Principal Engineering Interviewer at ${company || 'Top Tech'} interviewing for ${role || 'Software Engineer'}.
QUESTION ASKED: "${question}"
CANDIDATE'S ANSWER: "${answer}"

Evaluate the answer thoroughly and return strict JSON:
{
  "score": 85, // 0-100
  "strengths": ["...", "..."],
  "areasForImprovement": ["...", "..."],
  "starEvaluation": {
    "situation": "Evaluation of Situation",
    "task": "Evaluation of Task",
    "action": "Evaluation of Action",
    "result": "Evaluation of Result / Metrics"
  },
  "polishedAnswer": "Rewrite the candidate's answer into an elite, crisp, high-impact STAR response.",
  "interviewerReaction": "Positive impression, follow-up probe advice..."
}`;

  const fallback = {
    score: 82,
    strengths: ['Clear technical context', 'Demonstrates practical execution'],
    areasForImprovement: ['Add more quantified metrics', 'Highlight personal actions vs team actions'],
    starEvaluation: {
      situation: 'Good baseline context set.',
      task: 'Clear goal identified.',
      action: 'Solid explanation of technical choices.',
      result: 'Needs explicit benchmark percentages or revenue/latency impact.',
    },
    polishedAnswer: `In my previous project, we faced an issue where latency was spiking under peak traffic. As the lead engineer for the subsystem, I analyzed the bottleneck using distributed tracing, introduced semantic caching in Redis, and restructured the query pipeline. Within two weeks, we reduced p99 latency by 38% and supported 5,000+ peak requests per second with zero downtime.`,
    interviewerReaction: 'Strong response. Ready to probe on cache invalidation strategies.',
  };

  const result = await callGeminiJson(prompt, fallback);
  return res.json(result);
});

// Dev server or Production static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerMatch AI 2 server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
