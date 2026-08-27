export type FeaturedCourse = {
  slug: string
  title: string
  shortTitle: string
  description: string
  duration: string
  level: string
  image: string
  keywords: string[]
  tools: string[]
  modules: string[]
  outcomes: string[]
}

export const featuredCourses: FeaturedCourse[] = [
  {
    slug: 'ai-engineering-llm-applications',
    title: 'AI Engineering & LLM Applications',
    shortTitle: 'AI Engineering & LLM Apps',
    description:
      'Build production-ready AI applications with Python, prompt engineering, RAG, vector databases, evaluation, and responsible AI practices.',
    duration: '16 weeks',
    level: 'Beginner to advanced',
    image: '/courses/data-science-with-python-training-basic.png',
    keywords: ['AI engineering course', 'LLM training', 'RAG course', 'generative AI training Chennai'],
    tools: ['OpenAI API', 'Python', 'LangChain', 'LlamaIndex', 'pgvector'],
    modules: [
      'Python foundations for AI engineering',
      'Prompt engineering and structured outputs',
      'Embeddings, vector databases, and semantic search',
      'Retrieval-augmented generation systems',
      'LLM evaluation, observability, and guardrails',
      'Production AI application capstone',
    ],
    outcomes: [
      'Design and build complete LLM-powered applications',
      'Create reliable RAG pipelines using private data',
      'Evaluate model quality, cost, safety, and latency',
      'Deploy an AI portfolio project for interviews',
    ],
  },
  {
    slug: 'agentic-ai-business-automation',
    title: 'Agentic AI & Business Automation',
    shortTitle: 'Agentic AI & Automation',
    description:
      'Create tool-using AI agents, MCP integrations, multi-step workflows, guardrails, and reliable business automation.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: '/courses/python-training-program-2.png',
    keywords: ['agentic AI course', 'AI agents training', 'MCP training', 'business automation course'],
    tools: ['OpenAI Agents SDK', 'MCP', 'LangGraph', 'n8n', 'Python'],
    modules: [
      'Agent architecture and reasoning patterns',
      'Tools, function calling, and structured workflows',
      'Model Context Protocol integrations',
      'Memory, planning, orchestration, and handoffs',
      'Human approval, security, and guardrails',
      'Business automation capstone',
    ],
    outcomes: [
      'Build agents that safely use business tools',
      'Automate multi-step operational workflows',
      'Connect models to APIs, databases, and documents',
      'Monitor and improve agent reliability',
    ],
  },
  {
    slug: 'full-stack-development-with-ai',
    title: 'Full Stack Development with AI',
    shortTitle: 'Full Stack + AI',
    description:
      'Master TypeScript, React, Next.js, Python APIs, PostgreSQL, deployment, and embedded AI features through real products.',
    duration: '20 weeks',
    level: 'Beginner friendly',
    image: '/courses/full-stack-web-development-react-python-fastapi-and-mongodb.png',
    keywords: ['full stack course Chennai', 'Next.js course', 'React Python training', 'AI full stack development'],
    tools: ['GitHub Copilot', 'OpenAI API', 'Vercel AI SDK', 'Next.js', 'FastAPI'],
    modules: [
      'HTML, CSS, JavaScript, and TypeScript',
      'React and modern Next.js applications',
      'Python APIs with FastAPI',
      'PostgreSQL data modeling and authentication',
      'AI features, testing, and secure integration',
      'Cloud deployment and product capstone',
    ],
    outcomes: [
      'Build responsive full-stack web applications',
      'Design secure APIs and relational databases',
      'Add useful AI features to modern products',
      'Deploy a complete portfolio application',
    ],
  },
  {
    slug: 'data-analytics-course-chennai',
    title: 'Data Analytics Course in Chennai',
    shortTitle: 'Data Analytics with AI',
    description: 'Learn Advanced Excel, SQL, Power BI, Python and AI-assisted analytics through practical, project-based training.',
    duration: '16 weeks',
    level: 'Beginner friendly',
    image: '/courses/job-ready-analytics-combo-course.png',
    keywords: ['data analytics course Chennai', 'Power BI training', 'SQL Python analytics', 'AI data analytics'],
    tools: ['Copilot in Power BI', 'Microsoft Copilot', 'ChatGPT', 'Python', 'Pandas'],
    modules: [
      'Advanced Excel for business analysis',
      'SQL querying and relational data',
      'Power BI modeling, DAX, and dashboards',
      'Python with Pandas for analytics',
      'Predictive and AI-assisted analysis',
      'Business intelligence portfolio capstone',
    ],
    outcomes: [
      'Clean, analyze, and explain business data',
      'Build interactive Power BI dashboards',
      'Use SQL and Python for repeatable analysis',
      'Present insights through a job-ready portfolio',
    ],
  },
  {
    slug: 'cloud-devops-mlops',
    title: 'Cloud, DevOps & MLOps',
    shortTitle: 'Cloud, DevOps & MLOps',
    description:
      'Ship scalable applications and AI models with Docker, CI/CD, cloud infrastructure, observability, and model operations.',
    duration: '14 weeks',
    level: 'Intermediate',
    image: '/courses/web-development-python-django.png',
    keywords: ['DevOps course Chennai', 'cloud training', 'MLOps course', 'Docker CI CD training'],
    tools: ['GitHub Copilot', 'Docker', 'GitHub Actions', 'MLflow', 'Cloud AI services'],
    modules: [
      'Linux, networking, and cloud foundations',
      'Docker containers and application packaging',
      'Continuous integration and deployment',
      'Infrastructure, secrets, and environment design',
      'Model serving, monitoring, and MLOps',
      'Production deployment capstone',
    ],
    outcomes: [
      'Containerize and deploy modern applications',
      'Create reliable CI/CD delivery pipelines',
      'Monitor services and machine-learning systems',
      'Apply cloud security and operational practices',
    ],
  },
  {
    slug: 'cybersecurity-modern-systems',
    title: 'Cybersecurity for Modern Systems',
    shortTitle: 'Cybersecurity for the AI Era',
    description:
      'Learn network, application, cloud, and AI security through hands-on defensive labs and practical risk analysis.',
    duration: '14 weeks',
    level: 'Beginner to intermediate',
    image: '/courses/java-programming-training.png',
    keywords: ['cybersecurity course Chennai', 'cloud security training', 'application security', 'AI security course'],
    tools: ['Microsoft Security Copilot', 'GitHub Copilot', 'Burp Suite', 'OWASP GenAI guidance'],
    modules: [
      'Security foundations and threat modeling',
      'Network and endpoint defense',
      'Web application and API security',
      'Cloud identity, access, and hardening',
      'AI risk, prompt attacks, and data protection',
      'Security assessment capstone',
    ],
    outcomes: [
      'Identify and prioritize common security risks',
      'Secure applications, APIs, and cloud services',
      'Investigate threats using practical workflows',
      'Document a professional security assessment',
    ],
  },
  {
    slug: 'generative-ai-prompt-engineering',
    title: 'Generative AI & Prompt Engineering',
    shortTitle: 'Generative AI & Prompting',
    description:
      'Use modern generative AI effectively through prompt design, structured outputs, multimodal workflows, evaluation, and responsible usage.',
    duration: '8 weeks',
    level: 'Beginner friendly',
    image: '/courses/python-and-power-bi-data-visualization.png',
    keywords: ['prompt engineering course Chennai', 'generative AI training', 'ChatGPT course', 'AI tools course'],
    tools: ['ChatGPT', 'OpenAI Playground', 'Microsoft Copilot', 'Canva Magic Studio'],
    modules: [
      'Generative AI and large language model foundations',
      'Prompt patterns, context, and reusable templates',
      'Structured outputs and document workflows',
      'Image, audio, and multimodal prompting',
      'Quality evaluation, safety, and responsible use',
      'Role-specific prompt portfolio capstone',
    ],
    outcomes: [
      'Create reliable prompts for professional workflows',
      'Build reusable AI assistants for common tasks',
      'Evaluate responses for accuracy and safety',
      'Present a practical generative AI portfolio',
    ],
  },
  {
    slug: 'rag-vector-database-engineering',
    title: 'RAG & Vector Database Engineering',
    shortTitle: 'RAG & Vector Databases',
    description:
      'Build grounded AI systems that search private knowledge using embeddings, retrieval pipelines, vector databases, reranking, and evaluation.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: '/courses/python-and-sql-for-data-analytics-training.png',
    keywords: ['RAG course Chennai', 'vector database training', 'embeddings course', 'enterprise AI search'],
    tools: ['OpenAI API', 'LangChain', 'LlamaIndex', 'pgvector', 'Qdrant'],
    modules: [
      'Embeddings and semantic search foundations',
      'Document loading, chunking, and metadata design',
      'Vector databases and hybrid retrieval',
      'Reranking, citations, and grounded generation',
      'RAG evaluation, observability, and security',
      'Private knowledge assistant capstone',
    ],
    outcomes: [
      'Design reliable document retrieval pipelines',
      'Select and operate a vector database',
      'Improve answer relevance with reranking and evaluation',
      'Deploy a cited knowledge assistant',
    ],
  },
  {
    slug: 'machine-learning-applied-data-science',
    title: 'Machine Learning & Applied Data Science',
    shortTitle: 'Machine Learning & Data Science',
    description:
      'Learn data preparation, supervised and unsupervised learning, model evaluation, feature engineering, deep learning foundations, and deployment.',
    duration: '18 weeks',
    level: 'Beginner to advanced',
    image: '/courses/data-science-with-python-training-basic.png',
    keywords: ['machine learning course Chennai', 'data science training', 'Python ML course', 'deep learning foundations'],
    tools: ['Python', 'Jupyter', 'scikit-learn', 'TensorFlow', 'PyTorch'],
    modules: [
      'Python, statistics, and data preparation',
      'Regression, classification, and model selection',
      'Clustering and unsupervised learning',
      'Feature engineering and explainability',
      'Neural networks and deep learning foundations',
      'End-to-end machine learning capstone',
    ],
    outcomes: [
      'Prepare real datasets for machine learning',
      'Train and evaluate predictive models',
      'Explain model behavior and business impact',
      'Deploy a documented data science project',
    ],
  },
  {
    slug: 'multimodal-ai-computer-vision',
    title: 'Multimodal AI & Computer Vision',
    shortTitle: 'Multimodal AI & Vision',
    description:
      'Create AI applications that understand images and documents using computer vision, multimodal models, OCR, visual search, and responsible evaluation.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: '/courses/python-training-program-2.png',
    keywords: ['computer vision course Chennai', 'multimodal AI training', 'OpenCV course', 'vision AI applications'],
    tools: ['OpenAI vision models', 'OpenCV', 'PyTorch', 'Hugging Face', 'Python'],
    modules: [
      'Image processing and computer vision foundations',
      'Classification, detection, and segmentation',
      'OCR and intelligent document processing',
      'Multimodal prompting and visual reasoning',
      'Visual search, evaluation, privacy, and safety',
      'Vision application capstone',
    ],
    outcomes: [
      'Process and analyze image data with Python',
      'Build practical vision and document workflows',
      'Integrate multimodal models into applications',
      'Evaluate accuracy, privacy, and failure modes',
    ],
  },
  {
    slug: 'ai-digital-marketing-content',
    title: 'AI for Digital Marketing & Content',
    shortTitle: 'AI Digital Marketing',
    description:
      'Plan, create, test, and optimize campaigns using generative AI for research, SEO, content, creative production, advertising, and analytics.',
    duration: '10 weeks',
    level: 'Beginner friendly',
    image: '/courses/digital-marketing-training.png',
    keywords: ['AI digital marketing course', 'AI content creation training', 'SEO AI tools', 'marketing automation Chennai'],
    tools: ['ChatGPT', 'Canva Magic Studio', 'Google Ads AI', 'Meta Advantage+', 'GA4'],
    modules: [
      'AI-assisted market and audience research',
      'SEO briefs, content systems, and quality review',
      'Creative generation with brand consistency',
      'AI-assisted advertising and campaign testing',
      'Marketing automation, analytics, and attribution',
      'Integrated campaign portfolio capstone',
    ],
    outcomes: [
      'Build repeatable AI-assisted content workflows',
      'Create and test campaign assets efficiently',
      'Use analytics to improve marketing decisions',
      'Present a complete digital campaign portfolio',
    ],
  },
  {
    slug: 'ai-office-productivity-no-code-automation',
    title: 'AI Office Productivity & No-Code Automation',
    shortTitle: 'AI Productivity & Automation',
    description:
      'Use AI across documents, spreadsheets, presentations, email, meetings, research, and no-code workflows to improve everyday business productivity.',
    duration: '8 weeks',
    level: 'Beginner friendly',
    image: '/courses/ms-office-training.png',
    keywords: ['Microsoft Copilot course', 'AI office tools training', 'no-code automation course', 'AI productivity Chennai'],
    tools: ['Microsoft 365 Copilot', 'ChatGPT', 'Power Automate', 'n8n', 'Zapier AI'],
    modules: [
      'Responsible AI use for office workflows',
      'AI-assisted documents, email, and meetings',
      'Spreadsheet analysis and formula assistance',
      'Presentations, research, and knowledge synthesis',
      'No-code workflow and approval automation',
      'Business productivity automation capstone',
    ],
    outcomes: [
      'Save time across common office workflows',
      'Analyze and communicate information with AI support',
      'Automate repetitive tasks without heavy coding',
      'Document safe and repeatable business processes',
    ],
  },
  {
    slug: 'responsible-ai-llm-evaluation-governance',
    title: 'Responsible AI, LLM Evaluation & Governance',
    shortTitle: 'Responsible AI & Evaluation',
    description:
      'Test AI quality, safety, bias, privacy, security, and compliance using practical evaluation frameworks, red teaming, monitoring, and governance.',
    duration: '10 weeks',
    level: 'Intermediate',
    image: '/courses/advanced-excel-and-power-bi-training.png',
    keywords: ['responsible AI course', 'LLM evaluation training', 'AI governance course', 'AI safety training Chennai'],
    tools: ['OpenAI Evals', 'promptfoo', 'LangSmith', 'OWASP GenAI guidance', 'NIST AI RMF'],
    modules: [
      'Responsible AI principles and risk classification',
      'Evaluation datasets, metrics, and test design',
      'Bias, hallucination, privacy, and robustness testing',
      'Prompt injection, red teaming, and security controls',
      'Monitoring, incident response, and governance',
      'AI assurance assessment capstone',
    ],
    outcomes: [
      'Design repeatable AI evaluation programs',
      'Test LLM applications for quality and safety',
      'Document risks, controls, and governance decisions',
      'Create an AI assurance portfolio assessment',
    ],
  },
  {
    slug: 'ai-product-management-business-transformation',
    title: 'AI Product Management & Business Transformation',
    shortTitle: 'AI Product Management',
    description:
      'Identify valuable AI opportunities, define responsible product requirements, prototype workflows, measure outcomes, and lead adoption across teams.',
    duration: '8 weeks',
    level: 'Beginner to intermediate',
    image: '/courses/internship-training-program-skill-based-courses.webp',
    keywords: ['AI product management course', 'AI business transformation training', 'AI strategy course Chennai', 'AI adoption'],
    tools: ['ChatGPT', 'Microsoft Copilot', 'Figma AI', 'Notion AI', 'Product analytics'],
    modules: [
      'AI opportunity discovery and use-case selection',
      'Data readiness, feasibility, risk, and economics',
      'AI product requirements and rapid prototyping',
      'Human experience, trust, and responsible design',
      'Metrics, experimentation, rollout, and adoption',
      'AI transformation roadmap capstone',
    ],
    outcomes: [
      'Prioritize AI use cases by value and feasibility',
      'Define measurable AI product requirements',
      'Lead responsible prototypes and stakeholder reviews',
      'Present an adoption and transformation roadmap',
    ],
  },
]

const legacyCourseImages: Record<string, string> = {
  'advanced-excel-and-power-bi-training': '/courses/advanced-excel-and-power-bi-training.png',
  'advanced-excel-training': '/courses/advanced-excel-training.png',
  'data-science-with-python-training-basic': '/courses/data-science-with-python-training-basic.png',
  'digital-marketing-training': '/courses/digital-marketing-training.png',
  'full-stack-developer-course-chennai':
    '/courses/full-stack-web-development-react-python-fastapi-and-mongodb.png',
  'internship-training-program-skill-based-courses':
    '/courses/internship-training-program-skill-based-courses.webp',
  'java-programming-training': '/courses/java-programming-training.png',
  'job-ready-analytics-combo-course': '/courses/job-ready-analytics-combo-course.png',
  'ms-office-training': '/courses/ms-office-training.png',
  'mysql-training-program': '/courses/mysql-training-program.png',
  'power-bi-training-program': '/courses/power-bi-training-program.jpg',
  'python-and-power-bi-data-visualization': '/courses/python-and-power-bi-data-visualization.png',
  'python-and-sql-for-data-analytics-training':
    '/courses/python-and-sql-for-data-analytics-training.png',
  'python-training-program-2': '/courses/python-training-program-2.png',
  'sql-training-program': '/courses/sql-training-program.png',
  'web-development-python-django': '/courses/web-development-python-django.png',
  'web-development-training-program-2': '/courses/web-development-training-program-2.png',
}

const legacyCourseAITools: Record<string, string[]> = {
  'advanced-excel-and-power-bi-training': [
    'Copilot in Excel',
    'Copilot in Power BI',
    'ChatGPT for formulas',
    'AI-assisted DAX',
  ],
  'advanced-excel-training': [
    'Copilot in Excel',
    'ChatGPT for formulas',
    'AI data cleaning',
    'Automated insights',
  ],
  'data-science-with-python-training-basic': [
    'ChatGPT',
    'GitHub Copilot',
    'Jupyter AI',
    'scikit-learn',
  ],
  'digital-marketing-training': [
    'ChatGPT',
    'Canva Magic Studio',
    'Google Ads AI',
    'Meta Advantage+',
  ],
  'full-stack-developer-course-chennai': [
    'GitHub Copilot',
    'OpenAI API',
    'AI code review',
    'Prompt-driven prototyping',
  ],
  'internship-training-program-skill-based-courses': [
    'ChatGPT',
    'GitHub Copilot',
    'Microsoft Copilot',
    'Canva Magic Studio',
  ],
  'java-programming-training': [
    'GitHub Copilot',
    'ChatGPT for debugging',
    'AI-assisted testing',
    'Code explanation tools',
  ],
  'job-ready-analytics-combo-course': [
    'Copilot in Power BI',
    'Copilot in Excel',
    'ChatGPT for SQL',
    'Python AI libraries',
  ],
  'ms-office-training': [
    'Microsoft 365 Copilot',
    'Copilot in Excel',
    'Copilot in PowerPoint',
    'AI-assisted Outlook',
  ],
  'mysql-training-program': [
    'ChatGPT for SQL',
    'AI query explanation',
    'AI schema review',
    'Query optimization assistants',
  ],
  'power-bi-training-program': [
    'Copilot in Power BI',
    'AI-assisted DAX',
    'Natural-language insights',
    'Smart narratives',
  ],
  'python-and-power-bi-data-visualization': [
    'Copilot in Power BI',
    'ChatGPT',
    'Jupyter AI',
    'AI-assisted visual analysis',
  ],
  'python-and-sql-for-data-analytics-training': [
    'ChatGPT for SQL',
    'GitHub Copilot',
    'Jupyter AI',
    'AI-assisted data cleaning',
  ],
  'python-training-program-2': [
    'GitHub Copilot',
    'ChatGPT for debugging',
    'Jupyter AI',
    'OpenAI API basics',
  ],
  'sql-training-program': [
    'ChatGPT for SQL',
    'AI query explanation',
    'AI-assisted optimization',
    'Natural-language querying',
  ],
  'web-development-python-django': [
    'GitHub Copilot',
    'ChatGPT for debugging',
    'OpenAI API integration',
    'AI-assisted testing',
  ],
  'web-development-training-program-2': [
    'GitHub Copilot',
    'ChatGPT',
    'AI UI prototyping',
    'AI accessibility review',
  ],
}

export const getFeaturedCourse = (slug: string) =>
  featuredCourses.find((course) => course.slug === slug)

export const getLegacyCourseImage = (slug?: string | null) =>
  (slug && legacyCourseImages[slug]) || '/ai-first-career-training-banner.png'

export const getLegacyCourseAITools = (slug?: string | null) =>
  (slug && legacyCourseAITools[slug]) || [
    'ChatGPT',
    'Microsoft Copilot',
    'AI-assisted research',
    'Responsible AI practices',
  ]
