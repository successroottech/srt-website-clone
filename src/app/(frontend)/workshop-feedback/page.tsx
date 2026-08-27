import { BadgeCheck, Check, Download, Gift, IndianRupee, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

import { WorkshopFeedbackForm } from '@/components/WorkshopFeedbackForm'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI Workshop Feedback & Participant Offer',
  description:
    'Share feedback about the Success Root Technologies AI workshop and express interest in the Advanced Generative AI Career Program participant offer.',
  alternates: { canonical: '/workshop-feedback/' },
  robots: { follow: false, index: false },
}

const included = [
  '2 months of live online training',
  'Generative AI from basic to advanced',
  'ChatGPT and prompt engineering',
  'AI agents and automation',
  'AI API integration and Python basics',
  'Portfolio-ready AI projects',
  'Resume and interview preparation',
  'Certificate and placement assistance',
]

const bonuses = [
  '₹10,000 instant workshop discount',
  'Free AI prompt library',
  'Free project source code',
  'Free resume and LinkedIn review',
  'EMI / installment option available',
]

export default function WorkshopFeedbackPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.orbOne} aria-hidden="true" />
        <div className={styles.orbTwo} aria-hidden="true" />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.intro}>
            <span className={styles.kicker}><Sparkles size={15} /> AI workshop follow-up</span>
            <h1>Your feedback shapes our next learning experience.</h1>
            <p>
              Tell us what helped, what we can improve and whether you would like to continue your
              AI career journey with Success Root Technologies.
            </p>
            <div className={styles.trustRow}>
              <BadgeCheck size={22} />
              <div><strong>For registered workshop participants</strong><span>Your mobile number is used only to verify participation.</span></div>
            </div>
          </div>
          <div className={styles.formWrap}>
            <WorkshopFeedbackForm />
          </div>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className="container">
          <div className={styles.offerHeader}>
            <span><Gift size={17} /> Special workshop participant offer</span>
            <h2>Advanced Generative AI Career Program</h2>
            <p>Build practical AI, automation and application-development skills with career support.</p>
          </div>

          <div className={styles.offerGrid}>
            <article className={styles.priceCard}>
              <span>Workshop attendees only</span>
              <div className={styles.priceLine}>
                <small>Regular fee <del>₹29,999</del></small>
                <strong><IndianRupee size={33} />19,999</strong>
              </div>
              <div className={styles.saving}>You save ₹10,000</div>
              <p>Flexible EMI / installment options are available after counselling.</p>
              <a download href="/downloads/advanced-generative-ai-career-program.pdf">
                <Download size={18} /> Download full course brochure
              </a>
            </article>

            <article className={styles.detailsCard}>
              <div>
                <h3>What&apos;s included</h3>
                <ul>
                  {included.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
                </ul>
              </div>
              <div className={styles.bonusBlock}>
                <h3>Participant bonuses</h3>
                <ul>
                  {bonuses.map((item) => <li key={item}><Gift size={15} /> {item}</li>)}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
