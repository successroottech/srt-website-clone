import type { Metadata } from 'next'
import {
  BriefcaseBusiness,
  CalendarCheck2,
  Clock3,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  MonitorCheck,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import styles from './contact.module.css'

const phone = '+918939069135'
const whatsapp = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent('Hi SRT, I would like more information.')}`
const directions =
  'https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai+600033'

export const metadata: Metadata = {
  title: 'Contact Success Root Technologies in Chennai',
  description:
    'Call, WhatsApp, email or visit Success Root Technologies in West Mambalam, Chennai for course, placement support and software development enquiries.',
  alternates: { canonical: '/contact-us/' },
  openGraph: {
    title: 'Contact Success Root Technologies in Chennai',
    description:
      'Speak with the SRT team about training courses, workshops and software development.',
    url: '/contact-us/',
  },
}

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Success Root Technologies',
    telephone: '+91 89390 69135',
    email: 'contact@successroottech.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Old No. 8/1, New No. 15/1, First Floor, Rajaji Street',
      addressLocality: 'West Mambalam, Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600033',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Su 09:00-21:00',
  }
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className={styles.hero}>
        <div className="container">
          <span>CONTACT SUCCESS ROOT TECHNOLOGIES</span>
          <h1>Let’s Talk About Your Next Step</h1>
          <p>
            Contact our Chennai team for course guidance, workshop support, placement assistance or
            software development enquiries.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={`tel:${phone}`}>
              <Phone size={18} /> Call Now
            </a>
            <a href={whatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon height={18} width={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      <section className={styles.contactSection}>
        <div className={`container ${styles.grid}`}>
          <a className={styles.card} href={`tel:${phone}`}>
            <span>
              <Phone />
            </span>
            <div>
              <small>CALL US</small>
              <h2>+91 89390 69135</h2>
              <p>Speak directly with our team.</p>
            </div>
          </a>
          <a className={styles.card} href={whatsapp} target="_blank" rel="noreferrer">
            <span>
              <WhatsAppIcon />
            </span>
            <div>
              <small>WHATSAPP</small>
              <h2>Chat with SRT</h2>
              <p>Get quick course and batch details.</p>
            </div>
          </a>
          <a className={styles.card} href="mailto:contact@successroottech.com">
            <span>
              <Mail />
            </span>
            <div>
              <small>EMAIL</small>
              <h2>contact@successroottech.com</h2>
              <p>Send us your detailed enquiry.</p>
            </div>
          </a>
          <a className={styles.card} href={directions} target="_blank" rel="noreferrer">
            <span>
              <MapPin />
            </span>
            <div>
              <small>VISIT OUR OFFICE</small>
              <h2>West Mambalam, Chennai</h2>
              <p>Open directions in Google Maps.</p>
            </div>
          </a>
        </div>
      </section>
      <section className={styles.visit}>
        <div className={`container ${styles.visitGrid}`}>
          <div>
            <span className={styles.kicker}>OUR CHENNAI OFFICE</span>
            <h2>Visit Success Root Technologies</h2>
            <p>
              <strong>
                Old No. 8/1, New No. 15/1, First Floor,
                <br />
                Rajaji Street, West Mambalam,
                <br />
                Chennai, Tamil Nadu 600033, India
              </strong>
            </p>
            <p className={styles.hours}>
              <Clock3 size={18} /> Monday to Sunday · 9:00 AM–9:00 PM IST
            </p>
            <a
              className={styles.directionButton}
              href={directions}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} /> Get Directions
            </a>
          </div>
          <div className={styles.help}>
            <span className={styles.helpKicker}>PERSONAL GUIDANCE FROM SRT</span>
            <h2>What can we help you with?</h2>
            <p className={styles.helpIntro}>
              Tell us what you need and our team will connect you with the right person.
            </p>
            <div className={styles.helpList}>
              <div className={styles.helpItem}>
                <span><GraduationCap size={21} /></span>
                <div><strong>Course guidance</strong><small>Fees, syllabus and upcoming batches</small></div>
              </div>
              <div className={styles.helpItem}>
                <span><MonitorCheck size={21} /></span>
                <div><strong>Training options</strong><small>Classroom and online learning support</small></div>
              </div>
              <div className={styles.helpItem}>
                <span><CalendarCheck2 size={21} /></span>
                <div><strong>Workshop support</strong><small>Registration, schedules and payments</small></div>
              </div>
              <div className={styles.helpItem}>
                <span><BriefcaseBusiness size={21} /></span>
                <div><strong>Placement assistance</strong><small>Career guidance and candidate enquiries</small></div>
              </div>
              <div className={styles.helpItem}>
                <span><Code2 size={21} /></span>
                <div><strong>Software development</strong><small>Discuss your business or project requirements</small></div>
              </div>
            </div>
            <div className={styles.safetyNote}>
              <ShieldCheck size={22} />
              <p><strong>Payment safety</strong><span>Share only your registration and transaction reference. SRT will never ask for your OTP, PIN, CVV or banking password.</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.final}>
        <div className="container">
          <h2>Ready to Speak With Our Team?</h2>
          <p>Call or WhatsApp SRT and we’ll guide you to the right service.</p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={`tel:${phone}`}>
              <Phone size={18} /> +91 89390 69135
            </a>
            <a href={whatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon height={18} width={18} /> WhatsApp SRT
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
