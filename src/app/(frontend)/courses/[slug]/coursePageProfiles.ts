export type CourseProfile = {
  audiences: string[]
  careers: string[]
  duration?: string
  projects: string[]
  related: Array<{ slug: string; title: string }>
  skills: string[]
}

const developmentRelated = [
  { slug: 'python-training-program-2', title: 'Python Programming' },
  { slug: 'java-programming-training', title: 'Java Programming' },
  { slug: 'web-development-training-program-2', title: 'Web Development' },
]
const analyticsRelated = [
  { slug: 'advanced-excel-training', title: 'Advanced Excel' },
  { slug: 'sql-training-program', title: 'SQL' },
  { slug: 'power-bi-training-program', title: 'Power BI' },
]
const aiRelated = [
  { slug: 'python-training-program-2', title: 'Python Programming' },
  { slug: 'machine-learning-applied-data-science', title: 'Machine Learning & Data Science' },
  { slug: 'generative-ai-prompt-engineering', title: 'Generative AI' },
]

export const courseProfiles: Record<string, CourseProfile> = {
  'python-training-program-2': {
    audiences: [
      'Students and freshers',
      'Programming beginners',
      'Analysts learning automation',
      'Career switchers',
    ],
    careers: [
      'Python Developer',
      'Junior Software Developer',
      'Automation Associate',
      'Data-focused Python Programmer',
    ],
    projects: [
      'Guided command-line application',
      'File and data-processing exercises',
      'Database-connected Python project',
    ],
    skills: [
      'Python syntax',
      'Functions',
      'Object-oriented programming',
      'File handling',
      'Exception handling',
      'Database connectivity',
    ],
    related: developmentRelated,
  },
  'java-programming-training': {
    audiences: [
      'Students and freshers',
      'Programming beginners',
      'Developers strengthening Java',
      'Career switchers',
    ],
    careers: [
      'Java Developer',
      'Junior Backend Developer',
      'Application Support Developer',
      'Software Developer',
    ],
    projects: [
      'Object-oriented console application',
      'Collections and exception-handling exercises',
      'JDBC database application',
    ],
    skills: ['Core Java', 'OOP', 'Collections', 'Exception handling', 'JDBC', 'Multithreading'],
    related: developmentRelated,
  },
  'web-development-training-program-2': {
    audiences: [
      'Students and freshers',
      'Creative learners',
      'Programming beginners',
      'Career switchers',
    ],
    careers: ['Frontend Developer', 'Web Developer', 'UI Developer', 'Website Support Executive'],
    projects: [
      'Responsive multi-page website',
      'Interactive JavaScript interface',
      'Portfolio website',
    ],
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Responsive design',
      'Web deployment basics',
    ],
    related: developmentRelated,
  },
  'web-development-python-django': {
    audiences: [
      'Python learners',
      'Aspiring backend developers',
      'Students and freshers',
      'Career switchers',
    ],
    careers: [
      'Python Web Developer',
      'Django Developer',
      'Junior Backend Developer',
      'Web Application Developer',
    ],
    duration: '2 months weekday · 2.5 months weekend',
    projects: [
      'Database-backed Django application',
      'Authentication and form workflow',
      'CRUD web project',
    ],
    skills: ['Python', 'Django', 'Templates', 'ORM', 'Forms', 'Authentication'],
    related: developmentRelated,
  },
  'full-stack-development-with-ai': {
    audiences: [
      'Aspiring full-stack developers',
      'Students and freshers',
      'Frontend developers',
      'Career switchers',
    ],
    careers: [
      'Full Stack Developer',
      'React Developer',
      'Next.js Developer',
      'Junior AI Application Developer',
    ],
    projects: [
      'Responsive full-stack product',
      'Secure API and database workflow',
      'AI-enabled portfolio application',
    ],
    skills: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'AI API integration'],
    related: developmentRelated,
  },
  'advanced-excel-training': {
    audiences: [
      'Students and freshers',
      'MIS and operations teams',
      'Business professionals',
      'Aspiring analysts',
    ],
    careers: ['MIS Executive', 'Reporting Analyst', 'Operations Analyst', 'Junior Data Analyst'],
    projects: [
      'Business reporting workbook',
      'Data-cleaning exercises',
      'Interactive Excel dashboard',
    ],
    skills: [
      'Advanced formulas',
      'PivotTables',
      'Data cleaning',
      'Charts',
      'Lookups',
      'Dashboard reporting',
    ],
    related: analyticsRelated,
  },
  'sql-training-program': {
    audiences: ['Students and freshers', 'Aspiring analysts', 'Developers', 'Database beginners'],
    careers: [
      'SQL Developer',
      'Junior Data Analyst',
      'Database Support Associate',
      'Reporting Analyst',
    ],
    projects: [
      'Relational database exercises',
      'Business-query case study',
      'Reporting dataset project',
    ],
    skills: [
      'SQL queries',
      'Joins',
      'Subqueries',
      'Aggregations',
      'Database design',
      'Views and procedures',
    ],
    related: analyticsRelated,
  },
  'mysql-training-program': {
    audiences: [
      'Programming students',
      'Web developers',
      'Database beginners',
      'Support professionals',
    ],
    careers: [
      'MySQL Developer',
      'Database Support Associate',
      'Junior Backend Developer',
      'Application Support Engineer',
    ],
    projects: [
      'Relational schema design',
      'Query optimization exercises',
      'Application database project',
    ],
    skills: ['MySQL', 'CRUD queries', 'Joins', 'Indexes', 'Normalization', 'Stored routines'],
    related: analyticsRelated,
  },
  'power-bi-training-program': {
    audiences: [
      'Aspiring data analysts',
      'Excel users',
      'Business professionals',
      'Reporting teams',
    ],
    careers: ['Power BI Developer', 'BI Analyst', 'Reporting Analyst', 'Junior Data Analyst'],
    projects: [
      'Interactive business dashboard',
      'Data-model and DAX exercises',
      'Management reporting case study',
    ],
    skills: [
      'Power Query',
      'Data cleaning',
      'Data modelling',
      'DAX',
      'Visualizations',
      'Power BI Service',
    ],
    related: analyticsRelated,
  },
  'python-and-sql-for-data-analytics-training': {
    audiences: [
      'Aspiring data analysts',
      'Students and freshers',
      'Excel users moving into analytics',
      'Career switchers',
    ],
    careers: ['Junior Data Analyst', 'SQL Analyst', 'Python Data Analyst', 'Reporting Analyst'],
    duration: '2 months weekday · 2.5 months weekend',
    projects: [
      'SQL business analysis',
      'Python data-cleaning notebook',
      'Combined analytics case study',
    ],
    skills: [
      'Python',
      'Pandas',
      'SQL',
      'Data cleaning',
      'Exploratory analysis',
      'Business reporting',
    ],
    related: analyticsRelated,
  },
  'python-and-power-bi-data-visualization': {
    audiences: [
      'Aspiring analysts',
      'Power BI learners',
      'Python beginners',
      'Reporting professionals',
    ],
    careers: [
      'Data Visualization Analyst',
      'Power BI Developer',
      'Junior Data Analyst',
      'BI Associate',
    ],
    duration: '2 months weekday · 2.5 months weekend',
    projects: [
      'Python-prepared reporting dataset',
      'Interactive Power BI dashboard',
      'Visualization portfolio case study',
    ],
    skills: ['Python', 'Pandas', 'Power Query', 'DAX', 'Data modelling', 'Dashboard design'],
    related: analyticsRelated,
  },
  'data-science-with-python-training-basic': {
    audiences: [
      'Python learners',
      'Aspiring data scientists',
      'Data analysts',
      'Quantitative graduates',
    ],
    careers: [
      'Junior Data Scientist',
      'Python Data Analyst',
      'Machine Learning Intern',
      'Analytics Associate',
    ],
    duration: '2 months weekday · 2.5 months weekend',
    projects: [
      'Exploratory data-analysis notebook',
      'Introductory prediction model',
      'Documented data-science case study',
    ],
    skills: [
      'Python',
      'Pandas',
      'NumPy',
      'Statistics',
      'Data visualization',
      'Machine-learning basics',
    ],
    related: analyticsRelated,
  },
  'job-ready-analytics-combo-course': {
    audiences: [
      'Students and freshers',
      'Career switchers',
      'Non-IT graduates',
      'Working professionals',
    ],
    careers: ['Data Analyst', 'MIS Analyst', 'Power BI Analyst', 'Reporting Analyst'],
    duration: '2 months weekday · 2.5 months weekend',
    projects: ['Excel business analysis', 'SQL reporting exercise', 'Power BI portfolio dashboard'],
    skills: [
      'Advanced Excel',
      'SQL',
      'Power BI',
      'Python basics',
      'Business analysis',
      'Interview preparation',
    ],
    related: analyticsRelated,
  },
  'advanced-excel-and-power-bi-training': {
    audiences: ['Excel users', 'Aspiring analysts', 'MIS professionals', 'Business teams'],
    careers: [
      'MIS Analyst',
      'Power BI Analyst',
      'Reporting Executive',
      'Business Intelligence Associate',
    ],
    duration: '2 months weekday · 2.5 months weekend',
    projects: [
      'Excel reporting model',
      'Power BI management dashboard',
      'Combined reporting case study',
    ],
    skills: [
      'Advanced Excel',
      'Power Query',
      'Data modelling',
      'DAX',
      'Dashboards',
      'Business reporting',
    ],
    related: analyticsRelated,
  },
  'machine-learning-applied-data-science': {
    audiences: [
      'Python programmers',
      'Data analysts',
      'Engineering graduates',
      'Aspiring data scientists',
    ],
    careers: [
      'Machine Learning Associate',
      'Junior Data Scientist',
      'AI/ML Analyst',
      'Data Science Intern',
    ],
    projects: [
      'Supervised-learning model',
      'Clustering analysis',
      'End-to-end model evaluation project',
    ],
    skills: [
      'Python',
      'Data preparation',
      'Regression',
      'Classification',
      'Clustering',
      'Model evaluation',
    ],
    related: aiRelated,
  },
  'ai-engineering-llm-applications': {
    audiences: [
      'Python developers',
      'Software engineers',
      'AI learners',
      'Technical product builders',
    ],
    careers: [
      'AI Application Developer',
      'LLM Engineer',
      'AI Integration Developer',
      'Junior AI Engineer',
    ],
    projects: [
      'Structured-output AI application',
      'Private-data RAG assistant',
      'Evaluated LLM capstone',
    ],
    skills: ['Prompt engineering', 'LLM APIs', 'Embeddings', 'RAG', 'Evaluation', 'Guardrails'],
    related: aiRelated,
  },
  'agentic-ai-business-automation': {
    audiences: [
      'Python developers',
      'Automation professionals',
      'AI application builders',
      'Technical business analysts',
    ],
    careers: [
      'AI Automation Developer',
      'Agentic Workflow Developer',
      'Automation Consultant',
      'AI Integration Associate',
    ],
    projects: [
      'Tool-using AI agent',
      'Multi-step approval workflow',
      'Business automation capstone',
    ],
    skills: [
      'Agent architecture',
      'Function calling',
      'MCP',
      'Workflow orchestration',
      'Guardrails',
      'Human approval',
    ],
    related: aiRelated,
  },
  'generative-ai-prompt-engineering': {
    audiences: [
      'Students and professionals',
      'Content and marketing teams',
      'Business users',
      'AI beginners',
    ],
    careers: [
      'AI Content Specialist',
      'Prompt Workflow Associate',
      'Generative AI Assistant',
      'AI Productivity Specialist',
    ],
    projects: [
      'Reusable prompt library',
      'Document automation workflow',
      'Role-specific AI portfolio',
    ],
    skills: [
      'Prompt patterns',
      'Context design',
      'Structured outputs',
      'Multimodal prompting',
      'Evaluation',
      'Responsible AI',
    ],
    related: aiRelated,
  },
  'rag-vector-database-engineering': {
    audiences: ['Python developers', 'AI engineers', 'Backend developers', 'Data engineers'],
    careers: [
      'RAG Engineer',
      'AI Search Developer',
      'LLM Application Engineer',
      'Vector Database Developer',
    ],
    projects: [
      'Document ingestion pipeline',
      'Hybrid retrieval application',
      'Cited knowledge assistant',
    ],
    skills: [
      'Embeddings',
      'Chunking',
      'Vector databases',
      'Hybrid search',
      'Reranking',
      'RAG evaluation',
    ],
    related: aiRelated,
  },
  'multimodal-ai-computer-vision': {
    audiences: [
      'Python developers',
      'AI/ML learners',
      'Engineering graduates',
      'Application developers',
    ],
    careers: [
      'Computer Vision Associate',
      'Multimodal AI Developer',
      'Junior Vision Engineer',
      'AI Application Developer',
    ],
    projects: [
      'Image-processing workflow',
      'Document OCR application',
      'Multimodal vision capstone',
    ],
    skills: [
      'OpenCV',
      'Image processing',
      'OCR',
      'Visual reasoning',
      'Multimodal APIs',
      'Vision evaluation',
    ],
    related: aiRelated,
  },
  'responsible-ai-llm-evaluation-governance': {
    audiences: ['AI developers', 'QA and risk teams', 'Technical managers', 'Data professionals'],
    careers: [
      'AI Evaluation Analyst',
      'Responsible AI Associate',
      'AI Quality Specialist',
      'Model Risk Analyst',
    ],
    projects: ['LLM evaluation suite', 'Safety and quality test plan', 'Responsible-AI assessment'],
    skills: [
      'LLM evaluation',
      'Quality metrics',
      'Safety testing',
      'Bias review',
      'Governance',
      'Observability',
    ],
    related: aiRelated,
  },
  'ai-product-management-business-transformation': {
    audiences: [
      'Product managers',
      'Business analysts',
      'Team leaders',
      'Digital transformation professionals',
    ],
    careers: [
      'AI Product Associate',
      'Business Transformation Analyst',
      'AI Solutions Consultant',
      'Product Operations Specialist',
    ],
    projects: [
      'AI opportunity assessment',
      'Product requirements document',
      'Transformation roadmap',
    ],
    skills: [
      'AI product strategy',
      'Use-case discovery',
      'Requirements',
      'Value measurement',
      'Risk assessment',
      'Roadmapping',
    ],
    related: aiRelated,
  },
  'ai-office-productivity-no-code-automation': {
    audiences: ['Office professionals', 'Operations teams', 'Entrepreneurs', 'Business users'],
    careers: [
      'AI Productivity Specialist',
      'No-Code Automation Associate',
      'Operations Automation Executive',
      'Digital Workplace Coordinator',
    ],
    projects: [
      'Automated document workflow',
      'No-code business process',
      'AI productivity portfolio',
    ],
    skills: [
      'AI assistants',
      'Document automation',
      'No-code workflows',
      'Prompting',
      'Data handling',
      'Process design',
    ],
    related: [
      { slug: 'ms-office-training', title: 'MS Office Training' },
      { slug: 'agentic-ai-business-automation', title: 'Agentic AI & Automation' },
      { slug: 'digital-marketing-training', title: 'Digital Marketing' },
    ],
  },
  'ai-digital-marketing-content': {
    audiences: ['Digital marketers', 'Content creators', 'Business owners', 'Marketing students'],
    careers: [
      'AI Marketing Associate',
      'Content Marketing Executive',
      'Campaign Analyst',
      'Digital Marketing Specialist',
    ],
    projects: [
      'AI-assisted content workflow',
      'Campaign creative test',
      'Analytics-led marketing portfolio',
    ],
    skills: [
      'AI research',
      'SEO content',
      'Creative generation',
      'Campaign testing',
      'Marketing automation',
      'Analytics',
    ],
    related: [
      { slug: 'digital-marketing-training', title: 'Digital Marketing' },
      { slug: 'generative-ai-prompt-engineering', title: 'Generative AI' },
      { slug: 'ai-office-productivity-no-code-automation', title: 'AI Office Productivity' },
    ],
  },
  'cloud-devops-mlops': {
    audiences: [
      'Developers',
      'System administrators',
      'Cloud beginners',
      'Machine-learning engineers',
    ],
    careers: [
      'DevOps Associate',
      'Cloud Support Engineer',
      'Junior MLOps Engineer',
      'Deployment Engineer',
    ],
    projects: [
      'Containerized application',
      'CI/CD delivery pipeline',
      'Monitored model deployment',
    ],
    skills: ['Linux', 'Docker', 'CI/CD', 'Cloud foundations', 'Observability', 'Model operations'],
    related: [
      { slug: 'cybersecurity-modern-systems', title: 'Cyber Security' },
      { slug: 'full-stack-development-with-ai', title: 'Full Stack with AI' },
      { slug: 'machine-learning-applied-data-science', title: 'Machine Learning' },
    ],
  },
  'cybersecurity-modern-systems': {
    audiences: [
      'Students and freshers',
      'IT support professionals',
      'System administrators',
      'Developers learning security',
    ],
    careers: [
      'Security Operations Associate',
      'Junior Security Analyst',
      'Application Security Associate',
      'Cloud Security Support',
    ],
    projects: ['Threat-modelling exercise', 'Web security assessment', 'Defensive security report'],
    skills: [
      'Security foundations',
      'Networking',
      'Web security',
      'Cloud identity',
      'Risk assessment',
      'Incident analysis',
    ],
    related: [
      { slug: 'cloud-devops-mlops', title: 'Cloud, DevOps & MLOps' },
      { slug: 'web-development-training-program-2', title: 'Web Development' },
      { slug: 'responsible-ai-llm-evaluation-governance', title: 'Responsible AI' },
    ],
  },
  'digital-marketing-training': {
    audiences: [
      'Students and freshers',
      'Business owners',
      'Marketing professionals',
      'Career switchers',
    ],
    careers: [
      'Digital Marketing Executive',
      'SEO Executive',
      'Social Media Executive',
      'Campaign Analyst',
    ],
    duration: '1 month weekday · 1.5 months weekend',
    projects: [
      'SEO website audit',
      'Content and social campaign plan',
      'Advertising performance report',
    ],
    skills: [
      'SEO',
      'Content marketing',
      'Social media',
      'Paid advertising',
      'Email marketing',
      'Campaign analytics',
    ],
    related: [
      { slug: 'ai-digital-marketing-content', title: 'AI for Digital Marketing' },
      { slug: 'ms-office-training', title: 'MS Office' },
      { slug: 'ai-office-productivity-no-code-automation', title: 'AI Office Productivity' },
    ],
  },
  'ms-office-training': {
    audiences: ['Students and freshers', 'Office professionals', 'Job seekers', 'Business users'],
    careers: [
      'Office Administrator',
      'Back Office Executive',
      'Documentation Executive',
      'Operations Assistant',
    ],
    projects: [
      'Professional document set',
      'Excel office report',
      'Presentation and productivity assignment',
    ],
    skills: [
      'Microsoft Word',
      'Microsoft Excel',
      'PowerPoint',
      'Outlook basics',
      'Document formatting',
      'Office productivity',
    ],
    related: [
      { slug: 'advanced-excel-training', title: 'Advanced Excel' },
      { slug: 'ai-office-productivity-no-code-automation', title: 'AI Office Productivity' },
      { slug: 'digital-marketing-training', title: 'Digital Marketing' },
    ],
  },
  'internship-training-program-skill-based-courses': {
    audiences: [
      'College students',
      'Recent graduates',
      'Learners needing project exposure',
      'Entry-level job seekers',
    ],
    careers: [
      'Graduate Trainee',
      'Project Intern',
      'Junior Technical Associate',
      'Entry-level IT Professional',
    ],
    duration: '1 to 3 months',
    projects: [
      'Guided skill assignment',
      'Portfolio-oriented mini project',
      'Project presentation and review',
    ],
    skills: [
      'Practical exercises',
      'Project documentation',
      'Problem solving',
      'Tool usage',
      'Presentation',
      'Interview preparation',
    ],
    related: developmentRelated,
  },
}

export function getCourseProfile(slug: string): CourseProfile {
  return (
    courseProfiles[slug] || {
      audiences: ['Students and freshers', 'Working professionals', 'Career switchers'],
      careers: [
        'Entry-level technology roles',
        'Technical support roles',
        'Course-related specialist roles',
      ],
      projects: [
        'Hands-on exercises',
        'Guided practical assignment',
        'Portfolio-oriented project work',
      ],
      skills: ['Core concepts', 'Practical tool usage', 'Problem solving', 'Project application'],
      related: developmentRelated,
    }
  )
}
