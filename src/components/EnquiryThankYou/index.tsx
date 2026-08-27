import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'

type Props = { courseName: string; coursePath: string }

export function EnquiryThankYou({ courseName, coursePath }: Props) {
  const whatsapp = `https://wa.me/918939069135?text=${encodeURIComponent(`Hi SRT, I just submitted an enquiry for the ${courseName} course.`)}`
  return <main className={styles.page}>
    <div className={styles.glowOne} aria-hidden="true" />
    <div className={styles.glowTwo} aria-hidden="true" />
    <section className={styles.card}>
      <div className={styles.successIcon}><Check size={34} strokeWidth={3} /></div>
      <span className={styles.eyebrow}>ENQUIRY RECEIVED</span>
      <h1>Thank You for Contacting SRT</h1>
      <p className={styles.lead}>Your {courseName} course enquiry has been submitted successfully.</p>
      <div className={styles.nextStep}><small>WHAT HAPPENS NEXT?</small><p>Our course advisor will contact you with the latest syllabus, fees and upcoming batch details.</p></div>
      <div className={styles.actions}>
        <a className={styles.primary} href="tel:+918939069135"><Phone size={18} /> Call +91 89390 69135</a>
        <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp SRT</a>
      </div>
      <Link className={styles.returnLink} href={coursePath}>Return to course page <ArrowRight size={16} /></Link>
      <div className={styles.footer}><strong>Success Root Technologies</strong><span>West Mambalam, Chennai</span></div>
    </section>
  </main>
}
