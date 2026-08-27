'use client'

import { ArrowRight, BarChart3, BrainCircuit, Code2, Coffee, Megaphone, Search, ShieldCheck, Terminal, X, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from './catalog.module.css'
import { categoryGroups, popularCourses, type CatalogCategory, type CatalogCourse, type SpecialistCourse } from './courseCatalog'

const brandIcons: Record<CatalogCourse['icon'], Array<{ src: string; title: string }>> = {
  code: [
    { src: '/tech-icons/react.svg', title: 'React' },
    { src: '/tech-icons/nodejs.svg', title: 'Node.js' },
    { src: '/tech-icons/mongodb.svg', title: 'MongoDB' },
  ],
  chart: [],
  python: [{ src: '/tech-icons/python.svg', title: 'Python' }],
  java: [{ src: '/tech-icons/java.svg', title: 'Java' }],
  dashboard: [],
  brain: [{ src: '/tech-icons/tensorflow.svg', title: 'TensorFlow' }],
  shield: [{ src: '/tech-icons/kali-linux.svg', title: 'Kali Linux' }],
  marketing: [{ src: '/tech-icons/google-ads.svg', title: 'Google Ads' }],
}

const fallbackIcons: Record<CatalogCourse['icon'], LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  python: Terminal,
  java: Coffee,
  dashboard: BarChart3,
  brain: BrainCircuit,
  shield: ShieldCheck,
  marketing: Megaphone,
}
const filters: Array<{ id: 'all' | CatalogCategory; label: string }> = [
  { id: 'all', label: 'All' }, { id: 'development', label: 'Development' }, { id: 'data', label: 'Data & Analytics' },
  { id: 'programming', label: 'Programming' }, { id: 'ai', label: 'AI' }, { id: 'security', label: 'Cyber Security' }, { id: 'business', label: 'Business Skills' },
]

function PopularCard({ course }: { course: CatalogCourse }) {
  return <article className={styles.popularCard}>
    <div className={styles.cardTop}><CourseIcon course={course} />{course.badge && <span className={styles.badge}>{course.badge}</span>}</div>
    <h3>{course.title}</h3><p>{course.description}</p>
    <ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
    <Link data-course={course.title} href={`/courses/${course.slug}/`}>View course <ArrowRight size={16} /></Link>
  </article>
}

function CourseIcon({ course }: { course: CatalogCourse }) {
  const [failed, setFailed] = useState(false)
  const icons = brandIcons[course.icon]
  const FallbackIcon = fallbackIcons[course.icon]

  if (failed || icons.length === 0) {
    return <span aria-label={`${course.title} icon`} className={styles.courseIcon} role="img"><FallbackIcon aria-hidden="true" className={styles.fallbackIcon} /></span>
  }

  return <span className={styles.courseIcon}>{icons.map((icon) => <Image alt={`${icon.title} logo`} className={styles.brandIcon} height={30} key={icon.src} onError={() => setFailed(true)} src={icon.src} title={icon.title} unoptimized width={30} />)}</span>
}

function CourseChip({ course }: { course: SpecialistCourse }) {
  if (course.slug) return <Link className={`${styles.courseChip} ${styles.clickableChip}`} data-course={course.title} href={`/courses/${course.slug}/`}>{course.title}</Link>
  return <a className={`${styles.courseChip} ${styles.guidanceChip}`} data-course={course.title} href="#course-guidance">{course.title}<span>Ask advisor</span></a>
}

export function CourseDiscovery() {
  const [filter, setFilter] = useState<'all' | CatalogCategory>('all')
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const visiblePopular = useMemo(() => popularCourses.filter((course) => (filter === 'all' || course.category === filter) && (!normalized || `${course.title} ${course.description} ${course.outcomes.join(' ')}`.toLowerCase().includes(normalized))), [filter, normalized])
  const visibleGroups = useMemo(() => categoryGroups.filter((group) => {
    if (filter !== 'all' && group.id !== filter) return false
    if (!normalized) return true
    return `${group.heading} ${group.description} ${group.flagship.title} ${group.specializations.map((item) => item.title).join(' ')} ${group.combos?.map((item) => item.title).join(' ') || ''}`.toLowerCase().includes(normalized)
  }), [filter, normalized])

  return <>
    <section className={styles.popularSection} id="popular-courses">
      <div className="container">
        <div className={styles.sectionHeading}><span>OUR POPULAR COURSES</span><h2>Learn In-Demand Skills. Build Your Future.</h2><p>Industry-focused training with real-world projects and placement support.</p></div>
        <div className={styles.searchPanel} aria-label="Course filters">
          <label><Search size={19} /><span className="sr-only">Search courses</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search Full Stack, Python, Power BI..." type="search" value={query} />{query && <button aria-label="Clear course search" onClick={() => setQuery('')} type="button"><X size={17} /></button>}</label>
          <div className={styles.filters} role="group" aria-label="Filter courses by category">{filters.map((item) => <button aria-pressed={filter === item.id} className={filter === item.id ? styles.activeFilter : ''} key={item.id} onClick={() => setFilter(item.id)} type="button">{item.label}</button>)}</div>
        </div>
        {visiblePopular.length > 0 ? <div className={styles.popularGrid}>{visiblePopular.map((course) => <PopularCard course={course} key={course.slug} />)}</div> : <div className={styles.emptyState}><h3>No flagship courses match that search.</h3><p>Try a broader term or explore the related programs below.</p></div>}
      </div>
    </section>

    <section className={styles.categorySection} id="course-categories">
      <div className="container">
        <div className={styles.sectionHeading}><span>EXPLORE COURSES BY CATEGORY</span><h2>One clear path, with focused specializations</h2><p>Start with a flagship career path, then choose specialist or combined programs where relevant.</p></div>
        {visibleGroups.length > 0 ? <div className={styles.categoryGrid}>{visibleGroups.map((group) => <article className={styles.categoryCard} id={`category-${group.id}`} key={group.id}>
          <div className={styles.categoryIntro}><span>{group.label}</span><h3>{group.heading}</h3><p>{group.description}</p></div>
          <div className={styles.hierarchy}>
            <div className={styles.flagship}><small>FLAGSHIP COURSE</small><Link data-course={group.flagship.title} href={`/courses/${group.flagship.slug}/`}>{group.flagship.title}<ArrowRight size={16} /></Link></div>
            <div><small>SPECIALIZATIONS</small><div className={styles.compactLinks}>{group.specializations.map((course) => <CourseChip course={course} key={`${course.slug || 'guidance'}-${course.title}`} />)}</div></div>
            {group.related && <div><small>{group.relatedLabel?.toUpperCase()}</small><div className={styles.compactLinks}>{group.related.map((course) => <CourseChip course={course} key={`${course.slug || 'guidance'}-${course.title}`} />)}</div></div>}
            {group.combos && <details className={styles.secondaryPrograms}><summary>View All Analytics Programs</summary><div className={styles.compactLinks}>{group.combos.map((course) => <CourseChip course={course} key={course.slug} />)}</div></details>}
          </div>
        </article>)}</div> : <div className={styles.emptyState}><h3>No category matches your search.</h3><button onClick={() => { setQuery(''); setFilter('all') }} type="button">Clear filters</button></div>}
      </div>
    </section>
  </>
}
