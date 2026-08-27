export type CatalogCategory = 'development' | 'data' | 'programming' | 'ai' | 'security' | 'business'

export type CatalogCourse = {
  slug: string
  title: string
  description: string
  category: CatalogCategory
  badge?: string
  icon: 'code' | 'chart' | 'python' | 'java' | 'dashboard' | 'brain' | 'shield' | 'marketing'
  outcomes: string[]
}

export const popularCourses: CatalogCourse[] = [
  { slug: 'full-stack-developer-course-chennai', title: 'Full Stack Development', description: 'Build modern web applications with React JS, Node.js, Express.js and MongoDB.', category: 'development', badge: 'Most Popular', icon: 'code', outcomes: ['Frontend & backend', 'REST APIs', 'Live projects'] },
  { slug: 'data-analytics-course-chennai', title: 'Data Analytics', description: 'Analyze business data with Advanced Excel, SQL, Power BI and Python.', category: 'data', badge: 'Career Program', icon: 'chart', outcomes: ['Business analysis', 'Interactive dashboards', 'Portfolio projects'] },
  { slug: 'python-training-program-2', title: 'Python Programming', description: 'Learn Python fundamentals, problem solving and practical application development.', category: 'programming', badge: 'Beginner Friendly', icon: 'python', outcomes: ['Core Python', 'Problem solving', 'Practical exercises'] },
  { slug: 'java-programming-training', title: 'Java Programming', description: 'Build strong programming foundations with Java and object-oriented concepts.', category: 'programming', badge: 'Beginner Friendly', icon: 'java', outcomes: ['Java fundamentals', 'OOP concepts', 'Hands-on coding'] },
  { slug: 'power-bi-training-program', title: 'Power BI Training', description: 'Transform data into clear reports, models and interactive business dashboards.', category: 'data', badge: 'Trending', icon: 'dashboard', outcomes: ['Data modelling', 'DAX & reports', 'Dashboard projects'] },
  { slug: 'machine-learning-applied-data-science', title: 'AI & Machine Learning', description: 'Learn Python-based machine learning, model evaluation and applied data science.', category: 'ai', badge: 'Advanced Skills', icon: 'brain', outcomes: ['Machine learning', 'Model evaluation', 'Applied projects'] },
  { slug: 'cybersecurity-modern-systems', title: 'Cyber Security', description: 'Learn practical network, application, cloud and modern system security.', category: 'security', badge: 'Career Program', icon: 'shield', outcomes: ['Security foundations', 'Defensive labs', 'Risk assessment'] },
  { slug: 'digital-marketing-training', title: 'Digital Marketing', description: 'Develop practical skills across SEO, content, advertising and campaign analytics.', category: 'business', badge: 'Hands-on Projects', icon: 'marketing', outcomes: ['SEO & content', 'Paid campaigns', 'Marketing analytics'] },
]

export type SpecialistCourse = { slug?: string; title: string; note?: string; guidance?: boolean }
export type LinkedCourse = SpecialistCourse & { slug: string }
export type CourseCategoryGroup = {
  id: CatalogCategory
  label: string
  heading: string
  description: string
  flagship: LinkedCourse
  specializations: SpecialistCourse[]
  relatedLabel?: string
  related?: SpecialistCourse[]
  combos?: LinkedCourse[]
}

export const categoryGroups: CourseCategoryGroup[] = [
  {
    id: 'development', label: 'Development', heading: 'Full Stack Development',
    description: 'Build frontend, backend and database skills through practical web application projects.',
    flagship: { slug: 'full-stack-developer-course-chennai', title: 'Full Stack Developer Course' },
    specializations: [
      { slug: 'full-stack-developer-course-chennai', title: 'MERN Stack' },
      { title: 'Java Full Stack', guidance: true },
      { title: 'Python Full Stack', guidance: true },
      { slug: 'web-development-training-program-2', title: 'Web Development' },
    ],
  },
  {
    id: 'data', label: 'Data & Analytics', heading: 'Data Analytics & Business Intelligence',
    description: 'Start with the complete Data Analytics path, then deepen a specialist business intelligence skill.',
    flagship: { slug: 'data-analytics-course-chennai', title: 'Data Analytics Course in Chennai' },
    specializations: [
      { slug: 'advanced-excel-training', title: 'Advanced Excel' },
      { slug: 'sql-training-program', title: 'SQL' },
      { slug: 'power-bi-training-program', title: 'Power BI' },
      { slug: 'python-and-sql-for-data-analytics-training', title: 'Python for Data Analytics' },
      { slug: 'data-science-with-python-training-basic', title: 'Data Science' },
    ],
    combos: [
      { slug: 'advanced-excel-and-power-bi-training', title: 'Advanced Excel + Power BI' },
      { slug: 'python-and-power-bi-data-visualization', title: 'Python + Power BI' },
      { slug: 'job-ready-analytics-combo-course', title: 'Job-Ready Analytics Combo' },
    ],
  },
  {
    id: 'programming', label: 'Programming', heading: 'Programming Foundations',
    description: 'Develop logical thinking and practical coding confidence with focused language training.',
    flagship: { slug: 'python-training-program-2', title: 'Python Programming' },
    specializations: [{ slug: 'java-programming-training', title: 'Java Programming' }],
    relatedLabel: 'Related database skills',
    related: [
      { slug: 'sql-training-program', title: 'SQL' },
      { slug: 'mysql-training-program', title: 'MySQL' },
    ],
  },
  {
    id: 'ai', label: 'AI', heading: 'AI & Machine Learning',
    description: 'Build machine learning foundations before moving into specialist LLM and automation programs.',
    flagship: { slug: 'machine-learning-applied-data-science', title: 'AI & Machine Learning' },
    specializations: [
      { slug: 'generative-ai-prompt-engineering', title: 'Generative AI' },
      { slug: 'ai-engineering-llm-applications', title: 'AI Engineering & LLM Applications' },
      { slug: 'agentic-ai-business-automation', title: 'Agentic AI & Business Automation' },
    ],
  },
  {
    id: 'security', label: 'Cyber Security', heading: 'Cyber Security & Cloud',
    description: 'Learn defensive security and modern deployment operations through existing focused programs.',
    flagship: { slug: 'cybersecurity-modern-systems', title: 'Cyber Security Training' },
    specializations: [{ slug: 'cloud-devops-mlops', title: 'Cloud, DevOps & MLOps' }],
  },
  {
    id: 'business', label: 'Business Skills', heading: 'Business & Digital Skills',
    description: 'Build practical marketing, office productivity and workflow automation capabilities.',
    flagship: { slug: 'digital-marketing-training', title: 'Digital Marketing Training' },
    specializations: [
      { slug: 'ms-office-training', title: 'MS Office Training' },
      { slug: 'ai-office-productivity-no-code-automation', title: 'AI Office Productivity & No-Code Automation' },
    ],
  },
]

export const advancedAIPrograms: LinkedCourse[] = [
  { slug: 'ai-engineering-llm-applications', title: 'AI Engineering & LLM Applications' },
  { slug: 'generative-ai-prompt-engineering', title: 'Generative AI & Prompt Engineering' },
  { slug: 'agentic-ai-business-automation', title: 'Agentic AI & Business Automation' },
  { slug: 'rag-vector-database-engineering', title: 'RAG & Vector Database Engineering' },
  { slug: 'multimodal-ai-computer-vision', title: 'Multimodal AI & Computer Vision' },
  { slug: 'responsible-ai-llm-evaluation-governance', title: 'Responsible AI, Evaluation & Governance' },
  { slug: 'ai-product-management-business-transformation', title: 'AI Product Management & Business Transformation' },
  { slug: 'ai-office-productivity-no-code-automation', title: 'AI Productivity & No-Code Automation' },
]
