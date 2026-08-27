export type FAQCategory =
  | 'training'
  | 'courses'
  | 'placement'
  | 'admissions'
  | 'software'
  | 'general'

export type FAQSeedItem = {
  answer: string
  category: FAQCategory
  featured?: boolean
  question: string
  slug: string
  sortOrder: number
}

export const faqCategoryLabels: Record<FAQCategory, string> = {
  training: 'Training experience',
  courses: 'Courses and learning',
  placement: 'Placement support',
  admissions: 'Admissions and fees',
  software: 'Software development',
  general: 'General information',
}

export const faqSeedData: FAQSeedItem[] = [
  {
    slug: 'what-training-courses-do-you-offer',
    question: 'What technology training courses do you offer?',
    answer:
      'Success Root Technologies offers career-focused programs in AI engineering, generative AI, AI agents, full-stack development, Python, Java, SQL, data analytics, Power BI, cloud, DevOps, cybersecurity, digital marketing, Microsoft Office and related modern technology skills.',
    category: 'courses',
    featured: true,
    sortOrder: 10,
  },
  {
    slug: 'are-courses-suitable-for-beginners',
    question: 'Are the courses suitable for beginners and non-IT students?',
    answer:
      'Yes. Many programs begin with the fundamentals and are suitable for freshers, career changers and learners without a computer science background. A course advisor can recommend the right starting level based on your education, experience and career goal.',
    category: 'courses',
    featured: true,
    sortOrder: 20,
  },
  {
    slug: 'how-ai-tools-are-included',
    question: 'How are AI tools included in your courses?',
    answer:
      'Relevant AI tools are integrated into each curriculum for research, coding, analysis, content creation, automation and quality checking. Students also learn responsible use, verification and when human judgment is required.',
    category: 'courses',
    featured: true,
    sortOrder: 30,
  },
  {
    slug: 'online-offline-hybrid-training',
    question: 'Do you provide online, classroom and hybrid training?',
    answer:
      'Yes. Program availability may include instructor-led classroom training in Chennai, live online sessions and hybrid learning. Delivery mode and schedules vary by course and batch.',
    category: 'training',
    featured: true,
    sortOrder: 40,
  },
  {
    slug: 'course-duration',
    question: 'How long does a training program take?',
    answer:
      'Duration depends on the subject and learning depth. Focused programs may take 8 to 12 weeks, while comprehensive career tracks may take 14 to 20 weeks. The course page and advisor will provide the current duration and weekly schedule.',
    category: 'training',
    sortOrder: 50,
  },
  {
    slug: 'practical-projects',
    question: 'Will I work on practical projects?',
    answer:
      'Yes. Programs emphasize guided exercises, real-world assignments and portfolio-ready projects. Advanced tracks include a capstone that demonstrates how you analyze, build, test and explain a complete solution.',
    category: 'training',
    featured: true,
    sortOrder: 60,
  },
  {
    slug: 'trainers-and-mentoring',
    question: 'Do students receive trainer and mentor support?',
    answer:
      'Students receive instructor guidance, doubt clarification and feedback during the program. The exact mentoring format, review frequency and support period depend on the selected course.',
    category: 'training',
    sortOrder: 70,
  },
  {
    slug: 'course-certificate',
    question: 'Will I receive a certificate after completing the course?',
    answer:
      'Eligible students receive a Success Root Technologies course completion certificate after meeting the applicable attendance, assignment and assessment requirements. A certificate supports your profile, while employers may also evaluate your skills, projects and interview performance.',
    category: 'training',
    sortOrder: 80,
  },
  {
    slug: 'placement-guarantee',
    question: 'Do you guarantee a job after training?',
    answer:
      'No ethical training provider can guarantee a job because hiring decisions belong to employers and depend on skills, eligibility, interview performance and market conditions. We provide structured placement assistance to help eligible students improve their opportunities.',
    category: 'placement',
    featured: true,
    sortOrder: 90,
  },
  {
    slug: 'placement-support-includes',
    question: 'What does placement support include?',
    answer:
      'Placement support may include career guidance, resume improvement, portfolio and profile preparation, mock interviews, aptitude or technical practice, job-search guidance and sharing suitable openings with eligible learners.',
    category: 'placement',
    featured: true,
    sortOrder: 100,
  },
  {
    slug: 'placement-eligibility',
    question: 'Who is eligible for placement assistance?',
    answer:
      'Eligibility normally depends on course completion, attendance, assignment and project quality, interview readiness, professional conduct and the requirements of available roles. The team will explain the criteria for your selected program.',
    category: 'placement',
    sortOrder: 110,
  },
  {
    slug: 'career-gap-or-career-change',
    question: 'Can you help learners with a career gap or career change?',
    answer:
      'Yes. We help learners position transferable experience, build current technical evidence and prepare a realistic job-search strategy. Outcomes depend on the learner’s effort, role requirements and hiring conditions.',
    category: 'placement',
    sortOrder: 120,
  },
  {
    slug: 'interview-preparation',
    question: 'Is interview preparation included?',
    answer:
      'Career-track programs include preparation relevant to the target role, such as technical questions, project walkthroughs, communication practice, resume discussion and mock interview feedback.',
    category: 'placement',
    sortOrder: 130,
  },
  {
    slug: 'how-to-enroll',
    question: 'How can I enroll in a course?',
    answer:
      'Choose a course and contact the Success Root Technologies admission team by phone, WhatsApp or the website enquiry option. An advisor will confirm your goal, recommend a program and share the current batch, schedule, fees and enrollment steps.',
    category: 'admissions',
    featured: true,
    sortOrder: 140,
  },
  {
    slug: 'demo-or-counselling-session',
    question: 'Can I attend a counselling or demo session before enrolling?',
    answer:
      'A course counselling session is available to help you understand the curriculum, prerequisites, learning format and expected outcomes. Demo availability can vary by course and upcoming batch.',
    category: 'admissions',
    sortOrder: 150,
  },
  {
    slug: 'course-fees',
    question: 'Where can I find the current course fees?',
    answer:
      'Fees can vary by program, duration, delivery mode and included support. Contact the admission team for the current fee, applicable offers, payment schedule and a clear list of what is included.',
    category: 'admissions',
    sortOrder: 160,
  },
  {
    slug: 'installment-options',
    question: 'Are installment payment options available?',
    answer:
      'Installment availability depends on the selected program and current admission policy. The admission team can confirm available payment options before enrollment.',
    category: 'admissions',
    sortOrder: 170,
  },
  {
    slug: 'weekday-weekend-batches',
    question: 'Are weekday and weekend batches available?',
    answer:
      'Batch schedules may include weekday and weekend options depending on trainer and classroom availability. Contact the team for the latest schedule and seat availability.',
    category: 'admissions',
    sortOrder: 180,
  },
  {
    slug: 'software-development-services',
    question: 'What software development services do you provide?',
    answer:
      'We build custom web applications, business portals, AI assistants and agents, workflow automation, APIs, integrations, data platforms, dashboards and cloud-ready solutions for organizations.',
    category: 'software',
    sortOrder: 190,
  },
  {
    slug: 'ai-automation-for-business',
    question: 'Can you automate business processes using AI?',
    answer:
      'Yes. We can assess repetitive workflows and design human-approved automation using AI models, agents, document processing, APIs and existing business tools. Solutions are scoped around measurable value, security and reliability.',
    category: 'software',
    sortOrder: 200,
  },
  {
    slug: 'existing-software-modernization',
    question: 'Can you improve or modernize an existing application?',
    answer:
      'Yes. After reviewing the current system, we can recommend phased improvements covering user experience, performance, architecture, integrations, security, deployment and maintainability.',
    category: 'software',
    sortOrder: 210,
  },
  {
    slug: 'software-project-quotation',
    question: 'How do I get a quotation for a software project?',
    answer:
      'Share your business problem, users, required features, current tools and target timeline. We will arrange a discovery discussion, clarify the scope and provide an appropriate proposal or phased estimate.',
    category: 'software',
    sortOrder: 220,
  },
  {
    slug: 'location-in-chennai',
    question: 'Where is Success Root Technologies located?',
    answer:
      'Success Root Technologies serves learners and businesses from Chennai, Tamil Nadu, with online and hybrid options for people outside the local area. Contact the team before visiting to confirm the current address and appointment time.',
    category: 'general',
    sortOrder: 230,
  },
  {
    slug: 'contact-success-root-technologies',
    question: 'How can I contact Success Root Technologies?',
    answer:
      'Call or WhatsApp +91 89390 69135, or email contact@successroottech.com. You can also use the enquiry links on the course and software development pages.',
    category: 'general',
    sortOrder: 240,
  },
]
