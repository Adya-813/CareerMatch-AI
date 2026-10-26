import { CareerMatchReport } from '../types';

export const WAYFAIR_SAMPLE_JD = `Role: Software Engineer - Intern (AI-First & GenAI Focus)
Company: Wayfair
Location: Boston, MA / Remote Hybrid
Duration: 6 Months (8th Semester)

About Wayfair:
Wayfair is one of the world's largest home goods e-commerce destinations. We are driving an AI-First transformation, integrating Generative AI, LLMs, and agentic workflows across catalog discovery, 3D room styling, customer support automation, and internal developer tooling.

Responsibilities:
- Build robust, scalable web services and data pipelines using Python, TypeScript/React, and Java/Go.
- Design and integrate Generative AI agents and LLM orchestration (LangChain, LlamaIndex, Gemini, Claude) into high-throughput e-commerce workflows.
- Implement RAG (Retrieval-Augmented Generation) systems with vector databases (Pinecone, Milvus, pgvector) to power visual search and conversational shopping assistants.
- Collaborate with Machine Learning Platform engineers to evaluate model hallucinations, latency benchmarks, and cost efficiency.
- Participate in code reviews, CI/CD pipeline automation, and automated unit/integration test coverage.

Requirements:
- Currently enrolled in 7th semester of B.E./B.Tech or M.S. in Computer Science or related engineering discipline, available full-time for 8th semester internship.
- Strong proficiency in Python or TypeScript with solid understanding of Data Structures and Algorithms.
- Hands-on experience with LLM APIs, prompt engineering, embeddings, or agentic frameworks.
- Familiarity with cloud platforms (GCP or AWS), containerization (Docker, Kubernetes), and RESTful APIs.
- Passion for shipping customer-centric AI features with strong communication and analytical skills.`;

export const WAYFAIR_SAMPLE_CV = `Adyasha Mahapatra
Computer Science Engineering, 7th Semester (B.Tech)
Email: adyasha.dev@example.com | GitHub: github.com/adyasha | LinkedIn: linkedin.com/in/adyasha

EDUCATION:
Bachelor of Technology in Computer Science & Engineering
CGPA: 8.85/10.0 | Expected Graduation: 2027

TECHNICAL SKILLS:
- Languages: Python, TypeScript, JavaScript, Java, C++, SQL
- AI/GenAI: Google Gemini API, LangChain, OpenAI API, HuggingFace, RAG pipelines, Vector Embeddings (FAISS, ChromaDB)
- Frameworks & Libraries: React 19, Next.js, FastAPI, Node.js/Express, Tailwind CSS, PyTorch
- Tools & Cloud: Docker, Git, GCP, PostgreSQL, Redis, REST APIs, CI/CD GitHub Actions

PROJECTS:
1. ShopGenie - Multimodal E-Commerce AI Assistant
- Built an autonomous shopping advisor using Gemini Multimodal API and FastAPI, allowing customers to upload room photos and receive catalog furniture recommendations.
- Implemented hybrid vector search using ChromaDB and text embeddings, reducing item search latency by 42%.
- Integrated real-time streaming chat responses with SSE, improving user engagement time by 3.5x.

2. CodePulse - Automated Code Review & Bug Triage Bot
- Created an automated developer workflow tool utilizing LLMs to summarize pull requests and identify potential security antipatterns.
- Reduced manual PR initial triage time by ~30% across a 25-contributor student open-source team.

3. Distributed Cache & High-Throughput API Gateway
- Developed an in-memory caching layer in Go and Redis handling 5,000+ requests per second with sub-5ms p99 latency.
- Authored automated integration test suites achieving 91% code coverage.

EXPERIENCE:
Software Engineering Intern - CloudCraft Tech (Summer 2025)
- Collaborated with senior engineers to migrate monolith REST microservices to containerized Docker containers on Google Cloud Run.
- Optimized database SQL queries on PostgreSQL, decreasing slow query alerts by 28%.`;

export const WAYFAIR_INITIAL_REPORT: CareerMatchReport = {
  id: 'rep-wayfair-001',
  createdAt: new Date().toISOString(),
  steps: [
    { id: 'step-1', name: 'Reading the JD and CV', status: 'Done' },
    { id: 'step-2', name: 'Scoring job fit', status: 'Done' },
    { id: 'step-3', name: 'Optimising the CV', status: 'Done' },
    { id: 'step-4', name: 'Researching the company on the web', status: 'Done' },
    { id: 'step-5', name: 'Interview questions, part 1', status: 'Done' },
    { id: 'step-6', name: 'Interview questions, part 2', status: 'Done' },
    { id: 'step-7', name: 'Case interview prep', status: 'Done' },
    { id: 'step-8', name: 'Story bank and pitches', status: 'Done' },
    { id: 'step-9', name: 'Preparation plan and readiness', status: 'Done' }
  ],
  overview: {
    targetRole: 'Software Engineer - Intern (AI-First & GenAI Focus)',
    company: 'Wayfair',
    roleSummary: 'Wayfair is seeking a Software Engineer Intern with an AI-First and GenAI focus to develop applications, web services, and data systems across various engineering teams. The role centers on embedding Generative AI and machine learning across the entire SDLC and e-commerce ecosystem to enhance customer experiences and operational platforms. Candidates must be in their 7th semester of a B.E./B.Tech program in Computer Science and available during their 8th semester.',
    jobFitScore: 84,
    atsScore: 91,
    interviewReadinessScore: 78,
    topStrengths: [
      {
        title: 'Direct Multimodal & E-Commerce GenAI Experience',
        detail: 'Candidate built "ShopGenie", a multimodal shopping advisor using Gemini API and ChromaDB, directly mirroring Wayfair\'s AI-driven catalog and room visualization objectives.',
        badge: 'FACT',
        evidence: 'ShopGenie project built with Gemini Multimodal API and vector search'
      },
      {
        title: 'Full-Stack Proficiency Across Target Technologies',
        detail: 'Deep familiarity with Python, FastAPI, TypeScript/React, Docker, and GCP matches 100% of the core backend and UI stack listed in the JD.',
        badge: 'FACT',
        evidence: 'Python, TypeScript, React 19, FastAPI, Docker, and GCP in technical skills'
      },
      {
        title: 'Academic Timing & Eligibility Fit',
        detail: 'Currently in 7th semester of B.Tech CSE with 8th semester internship availability, satisfying Wayfair\'s strict university hiring criteria.',
        badge: 'FACT',
        evidence: '7th semester B.Tech CS candidate with 8th semester availability'
      },
      {
        title: 'High Engineering Autonomy & System Latency Focus',
        detail: 'Demonstrated initiative in benchmark metrics (e.g. 42% latency reduction, 5k req/s API gateway) indicating strong production-oriented engineering instinct.',
        badge: 'INFERENCE',
        evidence: 'Project metric claims highlighting latency benchmarks and code coverage'
      }
    ],
    gapsToAddress: [
      {
        title: 'Production LLM Hallucination & Evaluation Frameworks',
        detail: 'JD specifically highlights evaluating model hallucinations, latency vs cost trade-offs, and guardrails, which is currently unquantified in the CV.',
        addPlaceholder: '[ADD: Experience with Ragas, TruLens, or LLM evaluation metrics in ShopGenie]',
        severity: 'high'
      },
      {
        title: 'Enterprise High-Scale Distributed Systems (Java/Go/Kafka)',
        detail: 'Wayfair manages millions of catalog products with high concurrency. While the candidate has Go experience, streaming systems like Kafka or enterprise Java should be highlighted.',
        addPlaceholder: '[ADD: Mention message queues (Kafka/RabbitMQ) or event-driven patterns]',
        severity: 'medium'
      },
      {
        title: 'Cloud Production Monitoring & Observability',
        detail: 'Need concrete proof of telemetry (Prometheus, Datadog, OpenTelemetry, or GCP Cloud Logging) in production microservices.',
        addPlaceholder: '[ADD: Mention Prometheus/Datadog or OpenTelemetry monitoring metrics]',
        severity: 'low'
      }
    ]
  },
  jdAnalysis: {
    jobTitle: 'Software Engineer - Intern (AI-First & GenAI Focus)',
    company: 'Wayfair',
    level: 'Internship / University Grad (8th Semester)',
    keyResponsibilities: [
      'Design, prototype, and ship GenAI-driven features for customer-facing e-commerce catalog discovery.',
      'Construct scalable RAG pipelines and vector search integrations across millions of product SKUs.',
      'Implement automated developer tooling and GenAI testing utilities across the engineering SDLC.',
      'Evaluate latency, cost per token, and factual grounding across state-of-the-art LLMs.'
    ],
    requiredTechStack: ['Python', 'TypeScript', 'React', 'FastAPI / Express', 'GCP / AWS', 'Docker', 'Vector Databases (Pinecone/pgvector)'],
    preferredQualifications: [
      'Prior internship experience in software or cloud development.',
      'Understanding of retrieval strategies (hybrid BM25 + dense embedding re-ranking).',
      'Knowledge of prompt guardrails, structured JSON outputs, and agentic function-calling.'
    ],
    domainKnowledge: ['E-commerce customer journey', 'Product search relevance', 'Latency-sensitive web services', 'Distributed systems'],
    hiddenExpectations: [
      'Hiring managers want interns who will not just glue together APIs, but understand latency bottlenecks, caching tokens, and cost optimization.',
      'Strong ownership mindset: interns at Wayfair are treated as full software engineers with peer PR reviews and on-call shadow rotations.'
    ],
    hiringManagerPersona: 'Technical Lead in Wayfair Customer Experience or AI Foundation team seeking a curious, agile builder who is already coding with modern AI tooling and thinks in terms of business impact.',
    idealCandidateProfile: 'A high-achieving CS student with proven project initiative, solid CS fundamentals, hands-on LLM vector experience, and clean code hygiene.'
  },
  cvAnalysis: {
    candidateName: 'Adyasha Mahapatra',
    detectedRole: 'Software Engineer / AI Systems Builder',
    executiveSummary: '7th-semester Computer Science undergraduate with proven experience building multimodal AI applications, microservices on GCP, and high-throughput backend services.',
    skillsFound: ['Python', 'TypeScript', 'React 19', 'FastAPI', 'Gemini API', 'LangChain', 'ChromaDB', 'Docker', 'GCP', 'PostgreSQL', 'Redis'],
    missingKeywords: ['Model Hallucination Evaluation', 'Kafka / Event Streaming', 'Kubernetes', 'A/B Testing Frameworks', 'Pinecone / Milvus'],
    quantifiedImpactScore: 88,
    atsAuditFindings: [
      {
        severity: 'pass',
        category: 'Readability & Layout',
        finding: 'Standard single-column chronological structure, clean headers, and parseable date formats.',
        fixRecommendation: 'Maintain clear UTF-8 text formatting and avoid complex multi-column tables.'
      },
      {
        severity: 'warning',
        category: 'Keyword Density',
        finding: 'GenAI terminology is present in projects, but missing from the Professional Experience section.',
        fixRecommendation: 'Infuse GenAI workflow keywords (e.g. LLM-assisted debugging or prompt tuning) into CloudCraft internship bullet points.'
      },
      {
        severity: 'pass',
        category: 'Metrics & Quantified Results',
        finding: 'Excellent quantification across projects (42% latency reduction, 3.5x engagement, 5000+ rps).',
        fixRecommendation: 'Keep this benchmark-first writing style.'
      }
    ]
  },
  fitScore: {
    overallScore: 84,
    verdict: 'Strong Match (Tier 1 Candidate for Interview Callback)',
    percentileRank: 'Top 8% of early-career applicants',
    dimensionScores: [
      {
        category: 'Core GenAI & LLM Tooling',
        score: 95,
        maxScore: 100,
        weight: '30%',
        rationale: 'Outstanding alignment with Multimodal LLM integration, embeddings, and RAG architectures.',
        impact: 'Positive'
      },
      {
        category: 'Software Engineering & CS Fundamentals',
        score: 88,
        maxScore: 100,
        weight: '25%',
        rationale: 'Demonstrated DSA proficiency, Go high-concurrency API gateway, and 91% automated test coverage.',
        impact: 'Positive'
      },
      {
        category: 'Cloud & Infrastructure (GCP/Docker)',
        score: 82,
        maxScore: 100,
        weight: '20%',
        rationale: 'Hands-on Google Cloud Run containerization and database optimization from summer internship.',
        impact: 'Positive'
      },
      {
        category: 'E-commerce & Production Scale',
        score: 72,
        maxScore: 100,
        weight: '15%',
        rationale: 'Project matches e-commerce domain, but lacks large-scale multi-million SKU production deployment experience.',
        impact: 'Neutral'
      },
      {
        category: 'Academic Timing & Availability',
        score: 100,
        maxScore: 100,
        weight: '10%',
        rationale: 'Exact 7th/8th semester timeline match requested by university recruitment.',
        impact: 'Positive'
      }
    ],
    keyTakeaway: 'The candidate has an exceptionally strong portfolio tailored for Wayfair\'s AI-First transformation. Bridging the gap on LLM evaluation frameworks will turn this into an inevitable offer.'
  },
  strengthsGaps: {
    strengths: [
      {
        title: 'Direct E-Commerce Multimodal AI Prototype',
        badge: 'FACT',
        evidence: 'ShopGenie project implemented visual catalog search via Gemini API and ChromaDB.',
        impactOnRole: 'Eliminates ramp-up time; candidate can contribute to Wayfair\'s visual shopping team from week one.'
      },
      {
        title: 'High Concurrency & System Performance Focus',
        badge: 'FACT',
        evidence: 'Built Go & Redis caching layer supporting 5,000+ RPS with sub-5ms latency.',
        impactOnRole: 'Shows engineering rigor beyond AI wrappers, proving candidate cares about throughput and scalability.'
      },
      {
        title: 'Strong Practical Grasp of LLM Latency Optimization',
        badge: 'INFERENCE',
        evidence: 'Implemented Server-Sent Events (SSE) streaming and hybrid vector indexing for 42% latency cut.',
        impactOnRole: 'Key to solving Wayfair\'s high-traffic search responsiveness requirements.'
      },
      {
        title: 'Modern Tooling Alignment with Wayfair\'s Cloud Stack',
        badge: 'MODEL KNOWLEDGE',
        evidence: 'Wayfair heavily leverages Google Cloud Platform and containerized services for catalog intelligence.',
        impactOnRole: 'Candidate already has hands-on GCP Cloud Run and PostgreSQL experience.'
      }
    ],
    gaps: [
      {
        title: 'Absence of Automated LLM Evaluation (Evals)',
        severity: 'high',
        gapDetail: 'Wayfair requires engineers to test for model hallucinations and accuracy drift before production deployment.',
        addTag: '[ADD: Mention automated eval pipeline using Ragas or LLM-as-a-judge for ShopGenie]',
        actionToBridge: 'Prepare a 60-second explanation of how you would benchmark search hallucination and precision@k.'
      },
      {
        title: 'Enterprise Message Queues & Streaming Pipelines',
        severity: 'medium',
        gapDetail: 'E-commerce inventory and search catalogs require asynchronous event buses like Apache Kafka or Google Pub/Sub.',
        addTag: '[ADD: Note any experience with asynchronous message queues or Pub/Sub]',
        actionToBridge: 'Familiarize with Kafka architecture and event-driven microservice orchestration.'
      },
      {
        title: 'A/B Testing & Production Business Metrics',
        severity: 'low',
        gapDetail: 'Lack of explicit mention of conversion rate impact or CTR metrics in project descriptions.',
        addTag: '[ADD: Include projected e-commerce KPI improvements (e.g. +14% click-through rate)]',
        actionToBridge: 'Frame project outcomes using business KPIs during behavioral interview rounds.'
      }
    ]
  },
  cvOptimizer: {
    optimizationOverview: 'Your CV has outstanding technical depth, but can be elevated to elite tier by restructuring bullet points using Google\'s XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" and embedding Wayfair-specific terminology.',
    targetedKeywords: ['Retrieval-Augmented Generation (RAG)', 'Vector Embeddings', 'Hallucination Mitigation', 'Google Cloud Run', 'Hybrid Search', 'Latency Optimization', 'SSE Streaming', 'PostgreSQL Indexing'],
    bulletRevisions: [
      {
        context: 'ShopGenie Project - Multimodal Search',
        originalBullet: 'Built an autonomous shopping advisor using Gemini Multimodal API and FastAPI, allowing customers to upload room photos and receive catalog furniture recommendations.',
        optimizedBullet: 'Architected an end-to-end multimodal e-commerce assistant leveraging Google Gemini API and FastAPI, enabling visual room styling that boosted catalog discovery engagement by 3.5x.',
        framework: 'XYZ (Google Format)',
        metricAdded: '3.5x engagement boost, sub-300ms time-to-first-token',
        addedKeywords: ['Multimodal E-Commerce', 'Catalog Discovery', 'Google Gemini API']
      },
      {
        context: 'ShopGenie Project - Vector Search',
        originalBullet: 'Implemented hybrid vector search using ChromaDB and text embeddings, reducing item search latency by 42%.',
        optimizedBullet: 'Engineered hybrid dense-sparse vector retrieval using ChromaDB and embeddings, slashing query latency by 42% while improving Top-5 catalog relevance to 94.2%.',
        framework: 'STAR Impact Format',
        metricAdded: '94.2% Top-5 catalog recommendation relevance',
        addedKeywords: ['Dense-Sparse Vector Retrieval', 'Relevance Metrics', 'Query Optimization']
      },
      {
        context: 'Summer Internship at CloudCraft Tech',
        originalBullet: 'Optimized database SQL queries on PostgreSQL, decreasing slow query alerts by 28%.',
        optimizedBullet: 'Spearheaded database query optimization and composite index tuning on PostgreSQL, reducing slow query alerts by 28% across 10M+ transaction records.',
        framework: 'XYZ (Google Format)',
        metricAdded: '10M+ transaction records scale benchmark',
        addedKeywords: ['Composite Index Tuning', 'Transaction Records', 'PostgreSQL']
      }
    ],
    tailoredExecutiveBio: 'Forward-thinking Computer Science student with specialized experience building production-grade Generative AI agents, low-latency microservices, and hybrid vector search systems. Proven record of slashing service latency by 42% and building high-concurrency systems handling 5,000+ RPS.',
    skillsMatrixRearrangement: [
      'GenAI & Search: Gemini API, RAG Pipelines, Vector DBs (ChromaDB, Pinecone), Prompt Engineering, SSE Streaming',
      'Backend & Microservices: Python (FastAPI), TypeScript (Node.js), Go, Java, REST APIs, Redis Caching',
      'Data & Cloud: Google Cloud Platform (Cloud Run), Docker, PostgreSQL, CI/CD GitHub Actions'
    ]
  },
  interviewQuestions: {
    technical: [
      {
        question: 'How would you architect a low-latency RAG system for Wayfair\'s 30-million product catalog without running into memory or token cost explosion?',
        whyAsked: 'Tests architectural trade-offs between dense embeddings, keyword search (BM25), chunking strategy, and caching.',
        interviewerExpectedDepth: 'Expects candidate to discuss 2-stage retrieval: lightweight candidate generation (BM25 + Annoy/HNSW) followed by cross-encoder re-ranking, and caching frequent queries in Redis.',
        recommendedStarAnswer: {
          situation: 'In my ShopGenie e-commerce assistant project, querying full product descriptions across hundreds of categories introduced unacceptable 1.8s response latencies.',
          task: 'I needed to lower latency below 400ms while keeping high semantic precision for room visual matches.',
          action: 'I decoupled candidate generation into a hybrid retrieval pipeline: fast lexical filtering combined with ChromaDB vector search for top-50 items, followed by a lightweight re-ranker. I also implemented semantic caching in Redis for top category queries.',
          result: 'Achieved a 42% latency reduction (p95 drop from 1.8s to 620ms) and reduced LLM token consumption by 55%.'
        },
        redFlagsToAvoid: 'Suggesting to send raw database dumps into LLM prompt context or ignoring rate limits and token costs.',
        followUpProbabilities: [
          'What happens when a product price or stock status updates in real-time? How do you invalidate vector embeddings?',
          'How do you measure if the retrieved context was actually helpful or if the model hallucinated?'
        ]
      },
      {
        question: 'Explain how you handle streaming responses (SSE or WebSockets) in a React frontend when generating AI recommendations.',
        whyAsked: 'Wayfair emphasizes seamless user experience and perceived latency in conversational e-commerce.',
        interviewerExpectedDepth: 'Candidate should describe Server-Sent Events, ReadableStream readers, chunk decoding, and state update throttling to avoid React re-render thrashing.',
        recommendedStarAnswer: {
          situation: 'When generating long room-styling narratives with Gemini API, users faced a 4-second blank spinner.',
          task: 'Implement real-time word-by-word streaming to deliver an instantaneous conversational experience.',
          action: 'Configured FastAPI to stream via SSE and consumed the stream in React using ReadableStream with requestAnimationFrame throttling for smooth markdown rendering.',
          result: 'Time-to-first-token perceived latency plummeted from 4.1s to under 380ms, boosting session completion by 3.5x.'
        },
        redFlagsToAvoid: 'Using polling or accumulating full strings before updating React state.',
        followUpProbabilities: [
          'How do you handle connection drops or reconnect logic midway through a stream?',
          'How do you render markdown or syntax highlighting while the stream is still appending tokens?'
        ]
      }
    ],
    behavioral: [
      {
        question: 'Tell me about a time you worked on a project with ambiguous requirements and had to make an engineering decision without senior guidance.',
        coreCompetency: 'Ownership & Dealing with Ambiguity (Wayfair Core Principle)',
        whyAsked: 'Interns in fast-moving GenAI teams must balance experimentation with pragmatic delivery.',
        recommendedStarAnswer: {
          situation: 'During my summer internship, the team wanted to test automated PR triage, but had no specification for which pull requests to classify first.',
          task: 'I had to independently define the scope, success criteria, and pilot group within a 2-week sprint.',
          action: 'I interviewed 4 senior contributors, identified that dependency update PRs were causing 60% of review backlog fatigue, built an LLM triage bot specifically for npm/pip security advisories, and presented the prototype at the weekly demo.',
          result: 'Adopted across 3 teams, saving approximately 15 developer hours weekly.'
        },
        commonPitfall: 'Blaming the team for lack of documentation or waiting for someone else to assign tasks.'
      },
      {
        question: 'Describe a situation where you had a disagreement with a peer or teammate over technical architecture.',
        coreCompetency: 'Collaborative Disagreement & Teamwork',
        whyAsked: 'Assesses whether the candidate can argue with data, listen empathetically, and commit to the best outcome.',
        recommendedStarAnswer: {
          situation: 'In my capstone project, my teammate wanted to use a graph database for product relationships, while I advocated for PostgreSQL with JSONB and pgvector.',
          task: 'Resolve the architectural stalemate without delaying the development milestone.',
          action: 'I proposed a quick 1-day benchmark spikes test comparing query latency, team learning curve, and deployment complexity on GCP. The benchmark revealed Postgres fulfilled 95% of our relationship queries with 3x less ops overhead.',
          result: 'We mutually agreed on Postgres, met the project deadline 3 days early, and documented the trade-off decision in our ADR (Architecture Decision Record).'
        },
        commonPitfall: 'Saying you "convinced them because you were right" without showing empathy, benchmarks, or collaborative decision-making.'
      }
    ]
  },
  caseInterviewPrep: {
    scenarioTitle: 'Wayfair "Visual Room Redesign" AI Architecture',
    clientContext: 'A Wayfair shopper uploads a smartphone picture of their living room and asks: "Make this room mid-century modern with a budget under $2,500, keeping my existing oak flooring."',
    businessProblem: 'Deliver personalized, in-stock furniture recommendations in under 2 seconds, maintaining aesthetic coherence, budget constraints, and high image generation fidelity.',
    architectureFramework: [
      '1. Image Ingestion & Room Decomposition (Object detection + Gemini Multimodal bounding boxes)',
      '2. Constraint Extraction (Budget $2500, Style: Mid-century modern, Fixed: Oak flooring)',
      '3. Hybrid Catalog Retrieval (HNSW Vector embeddings + Elastic/Solr SQL filters for in-stock inventory)',
      '4. Coherence Scoring & Bundle Optimization (Knapsack solver with LLM style validation)',
      '5. Output Rendering (Dynamic shopping cart bundle + visual layout overlay)'
    ],
    stepByStepSolution: [
      {
        phase: 'Step 1: Visual Semantic Decomposition',
        proposal: 'Pass the user image to Gemini Multimodal with structured schema output to extract existing furniture types, room dimensions, color palette, and preserved elements.',
        tradeoffsConsidered: 'Using specialized computer vision models (YOLO/Mask-RCNN) vs Unified Multimodal LLM. Chosen: Multimodal LLM for richer style understanding with fallback caching.'
      },
      {
        phase: 'Step 2: Dual-Stage Catalog Matching',
        proposal: 'Query Wayfair vector database for items tagged "mid_century_modern" within price bands, combined with hard SQL filters for local warehouse availability.',
        tradeoffsConsidered: 'Pure vector similarity often suggests out-of-stock items; combining vector distance with strict relational inventory filters guarantees immediate fulfillment.'
      },
      {
        phase: 'Step 3: Knapsack Budget Optimization',
        proposal: 'Run a fast dynamic programming optimizer to select the highest aesthetic compatibility bundle that strictly satisfies the $2,500 budget ceiling.',
        tradeoffsConsidered: 'Letting LLM guess prices leads to math hallucinations; delegating price summation to deterministic code prevents pricing errors.'
      }
    ],
    keyMetricsAndMonitoring: [
      'P95 Latency < 1.8s for complete visual recommendation package',
      'Cart Add Rate (target > 18% of session interactions)',
      'Price Accuracy (0% hallucinated prices via deterministic database lookup)',
      'Catalog Inventory Freshness (cache TTL <= 15 minutes)'
    ],
    interviewerSurprisePivot: 'What if the customer suddenly changes their mind and says: "Actually make it Scandinavian style instead"? How do you reuse cached computations to respond in under 500ms?'
  },
  companyResearch: {
    company: 'Wayfair Inc. (NYSE: W)',
    industry: 'E-Commerce / Home Goods & Interior Technology',
    headquarters: 'Boston, Massachusetts, USA',
    missionStatement: 'To help everyone, anywhere create their feeling of home through world-class technology, logistics, and customer experience.',
    coreBusinessLines: [
      'Wayfair.com (Core US and European consumer marketplace)',
      'Luxury & Specialty Brands (Joss & Main, AllModern, Birch Lane, Perigold)',
      'Castlegate Logistics (Proprietary international freight and rapid fulfillment network)',
      'Wayfair Professional (B2B interior procurement for commercial spaces and hotels)'
    ],
    recentTechInitiatives: [
      'Aggressive AI-First organizational transition across all engineering squads.',
      'Deployment of proprietary 3D image rendering and GenAI room styling tools.',
      'Migration towards unified Google Cloud Platform infrastructure and modern microservices.',
      'Generative AI developer copilots integrated directly into internal CI/CD pipelines.'
    ],
    engineeringCultureSignals: [
      '"Think Big, Move Fast": High tolerance for smart experimentation paired with strong analytical measurement.',
      'Pragmatic Tech Choices: Deep respect for cost-efficiency, observability, and clean software architecture.',
      'Collaborative & Inclusive: Transparent post-mortems and strong mentorship culture for interns.'
    ],
    talkingPointsForCandidate: [
      '"I was particularly inspired by Wayfair\'s transition to embedding GenAI not just as an external customer chat gadget, but across the entire logistics and visual rendering pipeline."',
      '"My background building ShopGenie with Gemini Multimodal API aligns directly with Wayfair\'s visual shopping vision."',
      '"I prioritize measuring latency and token economics, which I know is paramount when serving Wayfair\'s millions of active shoppers."'
    ],
    interviewQuestionsToAskThem: [
      'How does the engineering team balance rapid GenAI experimentation with production latency constraints when millions of shoppers are browsing concurrently?',
      'What does a successful 6-month internship deliverable look like for this AI-First squad?',
      'How are engineers at Wayfair currently utilizing automated LLM evaluation tools in their CI/CD pipelines?'
    ]
  },
  industryResearch: {
    sector: 'Global E-Commerce & Retail Technology',
    marketDynamics: [
      'Transition from traditional keyword search ("blue sofa") to multimodal visual intent ("a couch that fits this cozy apartment").',
      'High return rates in home furnishings (often 20-30%) being dramatically reduced through accurate AI room styling and 3D scale verification.',
      'Intense focus on gross margin profitability, driving demand for developer productivity improvements via GenAI.'
    ],
    majorCompetitors: ['Amazon Home', 'IKEA', 'Target', 'Williams-Sonoma / West Elm', 'Houzz'],
    genAiDisruptionVectors: [
      'Virtual Staging: Replacing expensive multi-thousand dollar photoshoots with photorealistic diffusion & multimodal generation.',
      'Conversational Commerce: Shopping agents that act as high-end interior designers 24/7.',
      'Dynamic Pricing & Supply Chain Forecasting based on real-time consumer trend analysis.'
    ],
    macroEconomicTrends: [
      'Housing market fluctuations impacting furniture sales cycles, making customer retention and personalization critical.',
      'Shoppers demanding lightning-fast site speeds; every 100ms delay drops e-commerce conversion by ~1%.'
    ],
    candidateInsiderTips: [
      'Emphasize how GenAI directly reduces return rates in furniture — this is Wayfair\'s golden metric.',
      'Mention that latency is king: conversational tools that lag beyond 2 seconds cause shopper abandonment.'
    ]
  },
  storyBank: {
    elevatorPitch30s: 'I\'m a 7th-semester Computer Science student with a passionate focus on AI-first software engineering. Recently, I built ShopGenie, a multimodal shopping advisor using Gemini API and vector embeddings that reduced search latency by 42% while boosting user engagement 3.5x. I\'m excited to bring my hands-on full-stack and GenAI skillset to Wayfair\'s engineering squad this semester.',
    elevatorPitch60s: 'I am a 7th-semester Computer Science engineering student specializing in building high-performance, AI-driven web systems. Over the past year, I\'ve engineered multimodal applications like ShopGenie, combining Google Gemini, vector databases, and real-time streaming architectures to solve visual discovery challenges. During my summer internship at CloudCraft, I containerized microservices on Google Cloud Run and optimized PostgreSQL databases to support 10M+ transaction records with a 28% reduction in latency. What excites me most about Wayfair is your bold AI-First transformation—I don\'t just want to write code; I want to build intelligent systems that delight millions of homeowners while maintaining rock-solid production scalability.',
    whyThisCompanyPitch: 'Wayfair is in a unique position where e-commerce meets spatial computing and Generative AI. Unlike companies where GenAI is just a tacked-on chatbot, Wayfair is embedding AI directly into visual room styling, catalog search, and backend logistics. Given my hands-on experience building multimodal shopping advisors and low-latency APIs on GCP, Wayfair is the exact place where my skills and passions intersect to deliver measurable customer impact.',
    starStories: [
      {
        storyId: 'story-1',
        storyTitle: 'ShopGenie: Slashing Multimodal RAG Latency by 42%',
        matchedThemes: ['Technical Problem Solving', 'GenAI Architecture', 'Performance Optimization'],
        situation: 'Building a multimodal e-commerce assistant where users uploaded room photos to find matching furniture, but initial response latency hovered at 2.4 seconds.',
        task: 'Optimize the search and generation pipeline to achieve responsive sub-second interactions.',
        action: 'Analyzed the bottleneck and split the architecture into a two-tier retrieval pipeline: used lightweight vector embeddings with ChromaDB for candidate generation, introduced semantic caching in Redis for repeated queries, and streamed responses with SSE.',
        result: 'Cut end-to-end query latency by 42%, reduced LLM API token costs by 55%, and increased average user session duration by 3.5x.',
        punchlineMetric: '42% latency cut, 3.5x user session duration increase.'
      },
      {
        storyId: 'story-2',
        storyTitle: 'Automated PR Triage: Dealing with Ambiguity in Developer Tooling',
        matchedThemes: ['Initiative', 'Dealing with Ambiguity', 'Impact'],
        situation: 'Open source repository contributors were overwhelmed with backlogged pull requests and repetitive dependency review comments.',
        task: 'Autonomously design and ship a solution without a predefined product requirements document.',
        action: 'Interviewed 4 senior maintainers, scoped common pain points, and built an LLM triage bot using GitHub webhooks and structured JSON schemas to classify PR severity and detect common antipatterns.',
        result: 'Decreased initial review triage time by 30% across 25 active contributors, earning commendation from senior project maintainers.',
        punchlineMetric: '30% triage speedup adopted by 25 contributors.'
      },
      {
        storyId: 'story-3',
        storyTitle: 'CloudCraft Database Optimization: 28% Query Latency Drop',
        matchedThemes: ['Software Engineering Fundamentals', 'Database Optimization', 'Production Rigor'],
        situation: 'During summer internship, production dashboards on PostgreSQL began triggering slow query alarms during peak hours.',
        task: 'Diagnose and remediate slow queries without causing system downtime or degrading read traffic.',
        action: 'Used EXPLAIN ANALYZE to identify unindexed table scans on 10M+ transaction rows, designed composite B-tree indexes, and restructured ORM queries to eliminate N+1 query patterns.',
        result: 'Decreased slow query alerts by 28% and reduced database CPU utilization by 19% under high load.',
        punchlineMetric: '28% fewer slow query alerts, 19% CPU reduction on 10M+ rows.'
      }
    ]
  },
  prepPlan: {
    totalEstimatedHours: 24,
    dailyPlan: [
      {
        dayNumber: 1,
        title: 'Job Description Deconstruction & CV Bullet Alignment',
        targetFocus: 'Ensure your resume bullets mirror Wayfair\'s XYZ format and rehearse your 30s & 60s elevator pitch.',
        actionItems: [
          { description: 'Review optimized CV bullets and update LinkedIn/CV with quantified metrics.', durationMinutes: 60, completed: true },
          { description: 'Memorize and record your 60-second "Tell me about yourself" elevator pitch 3 times.', durationMinutes: 45, completed: true },
          { description: 'Review the 3 key gaps identified in this report and formulate bridging talking points.', durationMinutes: 45, completed: false }
        ],
        dailyMilestone: 'Flawless 60-second opening hook and updated ATS-ready CV.'
      },
      {
        dayNumber: 2,
        title: 'Core Technical Architecture: RAG & Vector Systems',
        targetFocus: 'Deep dive into retrieval-augmented generation, embeddings, vector indexing, and caching.',
        actionItems: [
          { description: 'Practice explaining 2-tier retrieval (lexical BM25 + dense HNSW) on a whiteboard.', durationMinutes: 90, completed: false },
          { description: 'Review trade-offs between Pinecone, ChromaDB, and pgvector for e-commerce scale.', durationMinutes: 60, completed: false },
          { description: 'Code a quick Python script showing streaming SSE response handling with Gemini.', durationMinutes: 60, completed: false }
        ],
        dailyMilestone: 'Can articulate end-to-end RAG architecture with trade-offs without hesitation.'
      },
      {
        dayNumber: 3,
        title: 'Wayfair Case Interview: E-Commerce System Design',
        targetFocus: 'Master the "Visual Room Redesign" architectural framework provided in this prep guide.',
        actionItems: [
          { description: 'Walk through the step-by-step case interview solution step by step out loud.', durationMinutes: 75, completed: false },
          { description: 'Draft mathematical calculations for catalog storage: 30M items * 1536-dim embeddings.', durationMinutes: 45, completed: false },
          { description: 'Prepare answers for the surprise interviewer pivot (handling Scandinavian style swap).', durationMinutes: 45, completed: false }
        ],
        dailyMilestone: 'Ready to lead a 45-minute interactive system design case interview.'
      },
      {
        dayNumber: 4,
        title: 'Data Structures & Algorithms Rapid Polish',
        targetFocus: 'High-frequency LeetCode patterns for Wayfair (Graphs, Trees, HashMaps, Sliding Window).',
        actionItems: [
          { description: 'Solve 3 medium graph/BFS/DFS problems (e.g., Course Schedule, Word Ladder).', durationMinutes: 120, completed: false },
          { description: 'Solve 2 sliding window/heap problems relevant to stream processing.', durationMinutes: 60, completed: false }
        ],
        dailyMilestone: 'Solidified DSA problem-solving rhythm under 25-minute mock timer.'
      },
      {
        dayNumber: 5,
        title: 'Behavioral Mastery & STAR Story Bank Rehearsal',
        targetFocus: 'Rehearse your 3 core stories (ShopGenie, CodePulse, CloudCraft) across multiple prompt questions.',
        actionItems: [
          { description: 'Practice the STAR framework for "Dealing with Ambiguity" and "Technical Conflict".', durationMinutes: 60, completed: false },
          { description: 'Refine your punchline metrics so numbers roll off your tongue naturally.', durationMinutes: 45, completed: false },
          { description: 'Review Wayfair\'s leadership values ("Think Big, Move Fast, Foster Community").', durationMinutes: 45, completed: false }
        ],
        dailyMilestone: 'Seamless storytelling without robotic memorization.'
      },
      {
        dayNumber: 6,
        title: 'Company & Industry Deep Dive',
        targetFocus: 'Internalize Wayfair\'s business model, Castlegate logistics, and AI transformation objectives.',
        actionItems: [
          { description: 'Read Wayfair\'s latest shareholder letter and tech blog entries on GenAI.', durationMinutes: 60, completed: false },
          { description: 'Refine the 3 high-impact questions to ask the interviewer at the end of the round.', durationMinutes: 45, completed: false }
        ],
        dailyMilestone: 'Demonstrate domain authority and genuine company alignment.'
      },
      {
        dayNumber: 7,
        title: 'Final Mock Simulation & Readiness Check',
        targetFocus: 'Full dress-rehearsal mock interview under realistic timing conditions.',
        actionItems: [
          { description: 'Run a full 45-minute AI interactive mock session using the readiness widget.', durationMinutes: 60, completed: false },
          { description: 'Double check audio, webcam, quiet environment, and clean screen-share setup.', durationMinutes: 30, completed: false },
          { description: 'Rest, hydrate, and do a quick 15-minute high-level notes review before bedtime.', durationMinutes: 30, completed: false }
        ],
        dailyMilestone: '100% confidence score and interview readiness achieved.'
      }
    ]
  },
  readiness: {
    overallReadinessScore: 88,
    readinessVerdict: 'High Readiness (Competitive Advantage in Interview Rounds)',
    categories: [
      {
        name: 'Technical Depth (AI & Systems)',
        score: 92,
        status: 'Ready',
        advice: 'You have solid answers for vector retrieval and low-latency caching. Be ready to defend latency numbers.'
      },
      {
        name: 'Behavioral & Leadership Stories',
        score: 86,
        status: 'Ready',
        advice: 'STAR stories are crisp. Emphasize teamwork and what you learned from project failures.'
      },
      {
        name: 'Company Knowledge & Curiosity',
        score: 90,
        status: 'Ready',
        advice: 'Your tailored questions for the interviewer will set you apart from 90% of other intern applicants.'
      },
      {
        name: 'Edge Case & Hallucination Mitigation',
        score: 78,
        status: 'Review needed',
        advice: 'Spend 30 minutes reading up on automated eval metrics like Ragas or semantic precision@k.'
      }
    ],
    rapidFirePracticeQuestions: [
      'Why Wayfair over other tech companies that are also doing GenAI?',
      'How would you handle a prompt injection attack on a customer-facing shopping assistant?',
      'What is your favorite recent paper or breakthrough in LLM reasoning or multimodal models?',
      'Walk me through a bug you introduced in production and how you caught and resolved it.'
    ],
    finalDayChecklist: [
      'Resume printed / easily viewable on second monitor',
      'GitHub links & live ShopGenie demo ready in browser tabs',
      'Quiet room, solid internet connection, tested microphone',
      'Notepad and pen ready for system design notes'
    ]
  }
};
