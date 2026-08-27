import Image from 'next/image'
import styles from './full-stack.module.css'

const googleReviewsUrl =
  'https://www.google.com/search?q=Success+Root+Technologies+West+Mambalam+Chennai+reviews'

const learningPhotos = [
  {
    src: '/course-trust/srt-classroom-training-2026.jpg',
    alt: 'Instructor-led classroom training at Success Root Technologies in Chennai',
    caption: 'Instructor-led classroom sessions',
  },
  {
    src: '/course-trust/srt-practical-lab-2026.jpg',
    alt: 'Students completing practical computer exercises at Success Root Technologies',
    caption: 'Hands-on practical learning',
  },
  {
    src: '/course-trust/srt-training-centre-2026.jpg',
    alt: 'Success Root Technologies training centre classroom in West Mambalam Chennai',
    caption: 'Our West Mambalam training centre',
  },
]

const milestonePhotos = [
  ['/course-trust/srt-student-certificate-01.jpg', 'Student receiving a course completion certificate at Success Root Technologies'],
  ['/course-trust/srt-student-certificate-02.jpg', 'Course completion milestone at Success Root Technologies'],
  ['/course-trust/srt-student-certificate-03.jpg', 'Student certificate presentation at Success Root Technologies'],
  ['/course-trust/srt-student-certificate-04.jpg', 'Student and family at a Success Root Technologies certificate presentation'],
  ['/course-trust/srt-student-certificate-05.jpg', 'Student achievement celebrated at Success Root Technologies'],
]

const reviews = {
  'full-stack': [
    {
      name: 'Murali Lakshmanan',
      text: 'I am very happy to share that I received my Front-End Developer job offer letter today. A heartfelt thank you to Success Root Technologies.',
    },
    {
      name: 'Padmanaban',
      text: 'Very helpful to get placement and learn new things with the help of the staff members.',
    },
    {
      name: 'B Dhanashree',
      text: 'I’m really happy with my experience with Success Root Technologies. They provided excellent placement support and guidance.',
    },
  ],
  'data-analytics': [
    {
      name: 'Sonia Anbu Selvam',
      text: 'Great learning experience. The trainer explained concepts clearly, and the hands-on practice helped me understand Data Analytics very well.',
    },
    {
      name: 'Raja K',
      text: 'I recently completed the Excel and Power BI training program at Success Root Technologies, and it exceeded my expectations.',
    },
    {
      name: 'Dharshini Venkatesan',
      text: 'Interactive classes, good platform to gain knowledge.',
    },
  ],
} as const

export function CourseTrustProof({ course }: { course: keyof typeof reviews }) {
  return (
    <>
      <section className={styles.learningSection} id="srt-student-stories">
        <div className="container">
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>REAL SRT CLASSROOMS · 2026</span>
            <h2>Students Learning at Success Root Technologies</h2>
            <p>
              See the real training environment where learners attend instructor-led sessions,
              practise on computers and build job-ready skills in West Mambalam, Chennai.
            </p>
          </div>
          <div className={styles.learningGallery}>
            {learningPhotos.map((photo, index) => (
              <figure className={index === 0 ? styles.learningFeature : ''} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? '(max-width: 800px) 100vw, 60vw' : '(max-width: 800px) 100vw, 40vw'} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewHeading}>
            <div>
              <span className={styles.eyebrow}>VERIFIED GOOGLE REVIEWS</span>
              <h2>What Our Students Say</h2>
              <p>Recent feedback shared by learners on the official SRT Google Business Profile.</p>
            </div>
            <a className={styles.ratingBadge} href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="View Success Root Technologies reviews on Google">
              <span><strong>4.8</strong> <span className={styles.stars} aria-label="4.8 out of 5 stars">★★★★★</span></span>
              <small>Based on 74 Google reviews</small>
              <em>Verified August 2026</em>
            </a>
          </div>
          <div className={styles.reviewGrid}>
            {reviews[course].map((review) => (
              <article key={review.name}>
                <div className={styles.reviewStars} aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{review.text}”</blockquote>
                <footer>
                  <span className={styles.reviewerInitial}>{review.name.charAt(0)}</span>
                  <span><strong>{review.name}</strong><small>Google review · 2026</small></span>
                </footer>
              </article>
            ))}
          </div>
          <a className={styles.googleLink} href={googleReviewsUrl} target="_blank" rel="noreferrer">View reviews on Google →</a>
        </div>
      </section>

      <section className={styles.milestonesSection}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>STUDENT MILESTONES · 2026</span>
            <h2>Celebrating Course Completions</h2>
            <p>Real learners marking an important step in their practical training journey at SRT.</p>
          </div>
          <div className={styles.milestoneGallery}>
            {milestonePhotos.map(([src, alt]) => (
              <figure key={src}>
                <Image src={src} alt={alt} fill sizes="(max-width: 600px) 70vw, (max-width: 1000px) 33vw, 20vw" />
              </figure>
            ))}
          </div>
          <p className={styles.outcomeNote}>Course completion and career-support outcomes vary by learner. Placement assistance does not guarantee employment.</p>
        </div>
      </section>
    </>
  )
}
