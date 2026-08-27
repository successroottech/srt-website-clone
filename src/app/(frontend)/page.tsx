import configPromise from '@payload-config'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Braces,
  Check,
  CloudCog,
  CodeXml,
  DatabaseZap,
  ExternalLink,
  GraduationCap,
  Medal,
  Network,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { FAQList } from '@/components/FAQList'

const programs = [
  {
    slug: 'full-stack-developer-course-chennai',
    title: 'Full Stack Development',
    detail:
      'React JS, Node.js, Express.js, MongoDB, APIs, deployment, hands-on assignments, and live projects.',
    icon: Braces,
    label: 'Featured',
  },
  {
    slug: 'data-analytics-course-chennai',
    title: 'Data Analytics',
    detail:
      'Excel, SQL, Power BI, Python, dashboards, business analysis, practical assignments, and portfolio projects.',
    icon: DatabaseZap,
    label: 'Featured',
  },
  {
    slug: 'ai-engineering-llm-applications',
    title: 'AI Engineering & LLM Apps',
    detail:
      'Python, prompt engineering, RAG, vector databases, evaluation, and production AI applications.',
    icon: BrainCircuit,
    label: 'AI track',
  },
  {
    slug: 'agentic-ai-business-automation',
    title: 'Agentic AI & Automation',
    detail:
      'Design tool-using agents, multi-step workflows, MCP integrations, guardrails, and business automation.',
    icon: Bot,
    label: 'Trending',
  },
  {
    slug: 'cloud-devops-mlops',
    title: 'Cloud, DevOps & MLOps',
    detail:
      'Containers, CI/CD, cloud platforms, model serving, monitoring, and reliable AI operations.',
    icon: CloudCog,
    label: 'Advanced',
  },
  {
    slug: 'cybersecurity-modern-systems',
    title: 'Cybersecurity for the AI Era',
    detail:
      'Security fundamentals, cloud security, threat analysis, AI risk, and secure application practices.',
    icon: ShieldCheck,
    label: 'High demand',
  },
]

const placementCandidates = [
  { name: 'Sasri I', image: '/placements/students/sasri-i.png' },
  { name: 'Kumari', image: '/placements/students/kumari.png' },
  { name: 'Aaisha', image: '/placements/students/aaisha.png' },
  { name: 'Mala', image: '/placements/students/mala.png' },
  { name: 'Vinoth', image: '/placements/students/vinoth.png' },
  { name: 'Anuja', image: '/placements/students/anuja.png' },
  { name: 'Kokila', image: '/placements/students/kokila.png' },
  { name: 'Banu', image: '/placements/students/banu.png' },
  { name: 'Jancy', image: '/placements/students/jancy.png' },
  { name: 'Deepika', image: '/placements/students/deepika.png' },
  { name: 'Priyanka', image: '/placements/students/priyanka.png' },
  { name: 'Manju', image: '/placements/students/manju.png' },
  { name: 'Kokila', image: '/placements/students/kokila-2.png' },
  { name: 'Maha', image: '/placements/students/maha.png' },
  { name: 'Janani', image: '/placements/students/janani.png' },
  { name: 'Boomiya', image: '/placements/students/boomiya.png' },
]

const googleReviews = [
  {
    name: 'Sonia Anbu Selvam',
    rating: 5,
    quote:
      'Great learning experience. The trainer explained concepts clearly, and the hands-on practice helped me understand Data Analytics very well.',
  },
  {
    name: 'Padmanaban',
    rating: 5,
    quote: 'Very helpful to get placement and learn new things with the help of the staff members.',
  },
  {
    name: 'Akila Sukumaaran',
    rating: 5,
    quote: 'Nice teaching by teachers and good response.',
  },
]

const googleBusinessUrl =
  'https://www.google.com/maps/place/Success+Root+Technologies/data=!4m2!3m1!1s0x0:0x9c2349a6ebbe3e99'

export const metadata: Metadata = {
  title: 'IT Training & Placement Support in Chennai | SRT',
  description:
    'Success Root Technologies provides job-ready IT training, practical projects and placement support in Chennai, plus custom software development for businesses.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const siteURL = getServerSideURL()
  const payload = await getPayload({ config: configPromise })
  const latest = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })
  const featuredFAQs = await payload.find({
    collection: 'faqs',
    depth: 0,
    draft: false,
    limit: 5,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    where: {
      and: [{ _status: { equals: 'published' } }, { featured: { equals: true } }],
    },
    select: {
      answer: true,
      question: true,
      slug: true,
    },
  })

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteURL}/#organization`,
    name: 'Success Root Technologies',
    url: siteURL,
    slogan: 'Build. Automate. Lead the Future.',
    telephone: '+91-8939069135',
    email: 'contact@successroottech.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'AI Agents',
      'Data Science',
      'Cloud Computing',
      'Cybersecurity',
      'Full Stack Development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Training and Software Services',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Technology Training with Placement Support' },
        { '@type': 'OfferCatalog', name: 'Custom Software Development and AI Automation' },
      ],
    },
  }
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteURL}/#website`,
    name: 'Success Root Technologies',
    alternateName: 'SRT',
    url: siteURL,
    publisher: {
      '@id': `${siteURL}/#organization`,
    },
  }

  return (
    <main className="ai-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <section className="home-primary-hero">
        <h1 className="sr-only">IT Training &amp; Placement Support in Chennai</h1>
        <div className="home-full-banner home-full-image-only">
          <Image
            alt="IT Training and Placement Support in Chennai at Success Root Technologies, with Full Stack, Data Analytics, Python, Java, AI and Power BI courses"
            fill
            priority
            sizes="100vw"
            src="/home/srt-it-training-placement-chennai-banner-v2.png"
          />
          <div className="home-full-image-overlay">
            <div className="home-full-banner-actions">
              <Link className="ai-button ai-button-gold" href="/it-training-courses-chennai/">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link
                className="ai-button home-banner-secondary"
                href="/contact-us/?intent=course-details"
              >
                Get Fees &amp; Batch Details <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="ai-proof home-full-banner-proof">
          <div>
            <Users />
            <span>
              <strong>100+</strong>
              <b>Students placed</b>
              <small>Successful IT careers</small>
            </span>
          </div>
          <div>
            <Building2 className="trust-icon-gold" />
            <span>
              <strong>20+</strong>
              <b>Partner companies</b>
              <small>Hiring our students</small>
            </span>
          </div>
          <div>
            <Medal />
            <span>
              <strong>3+</strong>
              <b>Years of excellence</b>
              <small>Trusted since 2022</small>
            </span>
          </div>
          <div>
            <span className="google-g" aria-hidden="true">
              G
            </span>
            <span>
              <strong>4.8/5</strong>
              <b>
                Google rating{' '}
                <span className="google-stars" aria-label="5 stars">
                  ★★★★★
                </span>
              </b>
              <small>Based on 74 reviews</small>
            </span>
          </div>
        </div>
      </section>

      <section className="ai-section business-pillars">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">One technology partner · Three ways to grow</span>
              <h2>Learn skills. Launch careers. Build software.</h2>
            </div>
            <p>
              We connect practical talent development with product engineering, automation, data,
              and AI implementation.
            </p>
          </div>
          <div className="business-pillar-grid">
            <article className="business-pillar training-pillar">
              <div className="business-pillar-icon">
                <GraduationCap />
              </div>
              <span>For students, freshers & professionals</span>
              <h3>Training with placement support</h3>
              <p>
                Instructor-led AI and technology programs, live projects, portfolio development,
                resume preparation, mock interviews, and placement guidance.
              </p>
              <ul>
                <li>
                  <Check size={15} /> 31 detailed career-focused courses
                </li>
                <li>
                  <Check size={15} /> Current AI tools included in every track
                </li>
                <li>
                  <Check size={15} /> Placement preparation and employer connections
                </li>
              </ul>
              <Link href="/it-training-courses-chennai/">
                Explore training programs <ArrowRight size={17} />
              </Link>
            </article>
            <article className="business-pillar career-pillar">
              <div className="business-pillar-icon">
                <BriefcaseBusiness />
              </div>
              <span>For freshers, career changers & job seekers</span>
              <h3>Job-ready skills and placement preparation</h3>
              <p>
                Build demonstrable skills, complete portfolio projects, improve your resume, and
                prepare for technical and HR interviews with structured career guidance.
              </p>
              <ul>
                <li>
                  <Check size={15} /> Resume, LinkedIn, GitHub, and portfolio preparation
                </li>
                <li>
                  <Check size={15} /> Mock interviews and project walkthrough practice
                </li>
                <li>
                  <Check size={15} /> Placement assistance for eligible candidates
                </li>
              </ul>
              <Link href="/it-job-placement-training-chennai/">
                Explore placement support <ArrowRight size={17} />
              </Link>
            </article>
            <article className="business-pillar development-pillar">
              <div className="business-pillar-icon">
                <CodeXml />
              </div>
              <span>For startups, SMEs & enterprise teams</span>
              <h3>Software development & AI automation</h3>
              <p>
                Custom web applications, business platforms, AI agents, workflow automation,
                integrations, dashboards, modernization, and cloud delivery.
              </p>
              <ul>
                <li>
                  <Check size={15} /> Product discovery through production deployment
                </li>
                <li>
                  <Check size={15} /> Secure APIs, data platforms, and AI workflows
                </li>
                <li>
                  <Check size={15} /> Ongoing enhancement and technical support
                </li>
              </ul>
              <Link href="/software-development">
                Explore software services <ArrowRight size={17} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="ai-section ai-programs" id="programs">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">Programs engineered for now</span>
              <h2>Choose your IT career path</h2>
            </div>
            <p>
              Every track combines fundamentals, current tools, mentor reviews, and portfolio-grade
              projects.
            </p>
          </div>
          <div className="ai-program-grid">
            {programs.map(({ slug, title, detail, icon: Icon, label }, index) => (
              <article
                className={`ai-program-card${index < 2 ? ' ai-program-card-featured' : ''}`}
                key={title}
              >
                <div className="program-card-top">
                  <span className="program-icon">
                    <Icon />
                  </span>
                  <small>
                    0{index + 1} · {label}
                  </small>
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
                <Link href={`/courses/${slug}`}>
                  View course details <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
          <div className="all-ai-courses-link">
            <Link className="ai-button ai-button-gold" href="/it-courses-chennai/">
              Explore all courses <ArrowRight size={18} />
            </Link>
            <span>
              Full Stack, Data Analytics, Python, Java, Power BI, AI, cloud, cybersecurity, and
              more.
            </span>
          </div>
        </div>
      </section>

      <section className="home-course-advisor-cta">
        <div className="container home-course-advisor-inner">
          <div>
            <span className="ai-kicker">PERSONAL COURSE GUIDANCE</span>
            <h2>Not sure which course is right for you?</h2>
            <p>
              Talk to our course advisor and get course fees, syllabus and upcoming batch details.
            </p>
          </div>
          <div>
            <Link className="ai-button ai-button-gold" href="/contact-us/?intent=course-details">
              Get Course Details <ArrowRight size={18} />
            </Link>
            <a className="ai-button ai-button-ghost" href="tel:+918939069135">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="ai-section ai-tracks home-compact-learning" id="tracks">
        <div className="container ai-track-grid">
          <div>
            <span className="ai-kicker">PRACTICAL LEARNING JOURNEY</span>
            <h2>From fundamentals to job-ready projects</h2>
            <p>
              Build skills step by step through instructor-led lessons, hands-on practice, real
              projects and focused career preparation.
            </p>
            <div className="track-list">
              {[
                [
                  '01',
                  'Learn',
                  'Understand core concepts and tools with structured trainer guidance.',
                ],
                [
                  '02',
                  'Practise',
                  'Strengthen each skill through guided exercises and practical assignments.',
                ],
                [
                  '03',
                  'Build',
                  'Create portfolio-ready projects that demonstrate what you can do.',
                ],
                [
                  '04',
                  'Prepare',
                  'Improve your resume, project explanation and interview confidence.',
                ],
              ].map(([number, title, text]) => (
                <div className={`track-step track-step-${number}`} key={number}>
                  <b>{number}</b>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
          <div className="ai-architecture">
            <div className="architecture-scan" aria-hidden="true" />
            <div className="architecture-orb architecture-orb-one" aria-hidden="true" />
            <div className="architecture-orb architecture-orb-two" aria-hidden="true" />
            <div className="architecture-topbar">
              <div className="architecture-title">
                <Network size={18} /> Skills you build at SRT
              </div>
              <span className="architecture-live">
                <i /> Practical learning
              </span>
            </div>
            <div className="architecture-flow" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="architecture-layer layer-experience">
              <small>FOUNDATIONS</small>
              <span>Programming</span>
              <span>Data</span>
              <span>Web</span>
              <span>AI</span>
            </div>
            <div className="architecture-layer highlighted layer-intelligence">
              <small>COURSE TRACKS</small>
              <span>Full Stack</span>
              <span>Data Analytics</span>
              <span>Python</span>
              <span>Java</span>
            </div>
            <div className="architecture-layer layer-data">
              <small>TOOLS & PROJECTS</small>
              <span>React</span>
              <span>Node.js</span>
              <span>SQL</span>
              <span>Power BI</span>
            </div>
            <div className="architecture-layer layer-scale">
              <small>CAREER READINESS</small>
              <span>Portfolio</span>
              <span>Resume</span>
              <span>Interviews</span>
              <span>Placement Support</span>
            </div>
            <div className="architecture-signal">
              <i />
              <span>Instructor-led and project-based</span>
              <strong>JOB-READY PATH</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section trust-section" id="placements">
        <div className="container">
          <div className="ai-section-head trust-section-head">
            <div>
              <span className="ai-kicker">Real people · Real progress</span>
              <h2>Placement stories that build confidence</h2>
            </div>
            <p>
              Meet learners featured in our 2025 placement highlights and read feedback published by
              students on the previous Success Root Technologies website.
            </p>
          </div>

          <div className="trust-credential-showcase">
            <div className="trust-credential-glow" aria-hidden="true" />
            <div className="trust-certified-panel">
              <span className="trust-certified-label">
                <BadgeCheck size={15} /> Trusted training partner
              </span>
              <div className="trust-certified-image">
                <Image
                  alt="Success Root Technologies certified training partner"
                  fill
                  sizes="(max-width: 760px) 70vw, 380px"
                  src="/trust/certified-stamp.png"
                />
              </div>
              <p>
                Career-focused training backed by recognized quality standards and practical
                placement preparation.
              </p>
            </div>

            <div className="trust-credential-details">
              <div className="trust-credential-title">
                <span className="ai-kicker">Recognized foundations</span>
                <h3>Built on quality, credibility, and learner outcomes</h3>
                <p>
                  Recognitions carried forward from Success Root Technologies&apos; established
                  training and recruitment operations.
                </p>
              </div>

              <div className="trust-logo-grid" aria-label="Accreditations and registrations">
                <figure>
                  <div>
                    <Image
                      alt="ISO 9001:2015 certified"
                      fill
                      sizes="150px"
                      src="/trust/iso-9001.png"
                    />
                  </div>
                  <figcaption>ISO 9001:2015</figcaption>
                </figure>
                <figure>
                  <div>
                    <Image
                      alt="International Accreditation Forum"
                      fill
                      sizes="180px"
                      src="/trust/iaf-accreditation.webp"
                    />
                  </div>
                  <figcaption>International recognition</figcaption>
                </figure>
                <figure>
                  <div>
                    <Image
                      alt="MSME registered business"
                      fill
                      sizes="150px"
                      src="/trust/msme.png"
                    />
                  </div>
                  <figcaption>MSME registered</figcaption>
                </figure>
              </div>

              <div className="trust-metric-grid">
                <div>
                  <strong>100+</strong>
                  <span>Students placed</span>
                </div>
                <div>
                  <strong>20+</strong>
                  <span>Partner companies</span>
                </div>
                <div>
                  <strong>3+</strong>
                  <span>Years of experience</span>
                </div>
              </div>
            </div>
          </div>

          <section className="placement-success-wall" aria-labelledby="placement-wall-title">
            <div className="placement-wall-year" aria-hidden="true">
              2025
            </div>
            <div className="placement-story-heading">
              <div className="placement-heading-lockup">
                <span className="placement-trophy">
                  <Trophy size={25} />
                </span>
                <div>
                  <span className="ai-kicker">Class of 2025</span>
                  <h3 id="placement-wall-title">Celebrating our placed candidates</h3>
                </div>
              </div>
              <span>
                <BadgeCheck size={16} /> Published placement highlights
              </span>
            </div>
            <p className="placement-wall-intro">
              Every portrait represents progress—from guided learning and portfolio preparation to
              interview confidence and a new career opportunity.
            </p>
            <div className="candidate-story-grid">
              {placementCandidates.slice(0, 8).map((candidate, index) => (
                <article className="candidate-story-card" key={`${candidate.name}-${index}`}>
                  <span className="candidate-success-mark">
                    <BadgeCheck size={13} /> Placed
                  </span>
                  <Image
                    alt={`${candidate.name}, a candidate featured in Success Root Technologies 2025 placement highlights`}
                    fill
                    sizes="(max-width: 520px) 50vw, (max-width: 900px) 25vw, 150px"
                    src={candidate.image}
                  />
                  <div>
                    <strong>{candidate.name}</strong>
                    <span>Success Root Technologies · 2025</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="placement-wall-footer">
              <span>
                <i /> Training
              </span>
              <span>
                <i /> Portfolio
              </span>
              <span>
                <i /> Interview preparation
              </span>
              <span>
                <i /> Placement support
              </span>
            </div>
          </section>

          <div className="google-review-panel">
            <div className="google-review-summary">
              <span className="google-review-label">Google Reviews</span>
              <div className="google-score">
                <strong>4.8</strong>
                <span>
                  <span className="google-stars" aria-label="4.8 out of 5 on Google">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star fill="currentColor" key={star} size={17} />
                    ))}
                  </span>
                  <small>Based on 74 public Google reviews · Verified August 2026</small>
                </span>
              </div>
              <p>
                Recent feedback displayed from the public Success Root Technologies Google Business
                profile.
              </p>
              <a href={googleBusinessUrl} rel="noopener noreferrer" target="_blank">
                View all reviews on Google <ExternalLink size={15} />
              </a>
            </div>
            <div className="google-review-grid">
              {googleReviews.map((review) => (
                <article className="google-review-card" key={review.name}>
                  <div className="google-review-card-top">
                    <span>
                      {review.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>Google review</small>
                    </div>
                    <BadgeCheck size={17} />
                  </div>
                  <div
                    className="google-review-stars"
                    aria-label={`${review.rating} out of 5 rating`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        fill={star <= review.rating ? 'currentColor' : 'none'}
                        key={star}
                        size={14}
                      />
                    ))}
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section ai-insights">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">LATEST INSIGHTS</span>
              <h2>Practical ideas for your technology career</h2>
            </div>
            <Link href="/blog/">
              View All Insights <ArrowRight size={17} />
            </Link>
          </div>
          <div className="home-insight-grid" aria-label="Three latest insights">
            {latest.docs.map((post, index) => (
              <article key={post.id}>
                <div className="blog-number">{String(index + 1).padStart(2, '0')}</div>
                <small>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        dateStyle: 'medium',
                      })
                    : 'Latest'}
                </small>
                <h3>
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p>
                  {post.meta?.description ||
                    'Practical ideas for learning and building with today’s technology.'}
                </p>
                <Link href={`/${post.slug}/`}>
                  Read insight <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section home-faq">
        <div className="container home-faq-grid">
          <div className="home-faq-intro">
            <span className="ai-kicker">Frequently asked questions</span>
            <h2>Everything you need to move forward confidently</h2>
            <p>
              Clear answers about courses, AI-enabled learning, placement assistance, enrollment and
              working with our software development team.
            </p>
            <Link className="ai-button ai-button-ghost" href="/faq/">
              View all FAQs <ArrowRight size={17} />
            </Link>
          </div>
          <FAQList faqs={featuredFAQs.docs} />
        </div>
      </section>

      <section className="ai-final">
        <div className="container ai-final-inner">
          <div>
            <span className="ai-kicker">Your IT career starts here</span>
            <h2>Ready to build your IT career?</h2>
          </div>
          <div>
            <p>Tell us your goal. We’ll recommend the right course, projects, and learning path.</p>
            <a className="ai-button ai-button-gold" href="https://wa.me/918939069135">
              Talk to a course advisor <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
