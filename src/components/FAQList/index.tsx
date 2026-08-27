import React from 'react'

export type FAQListItem = {
  answer: string
  category?: string | null
  id?: number | string
  question: string
  slug?: string | null
}

export function FAQList({
  className = '',
  faqs,
}: {
  className?: string
  faqs: FAQListItem[]
}) {
  return (
    <div className={`faq-list ${className}`.trim()}>
      {faqs.map((faq, index) => (
        <details className="faq-item" key={faq.id || faq.slug || faq.question}>
          <summary>
            <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{faq.question}</span>
            <i aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
