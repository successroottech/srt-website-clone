'use client'

import { Bot, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react'
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

type FAQRecord = {
  answer: string
  category?: string
  question: string
}

type ChatMessage = {
  id: number
  matchedQuestion?: string
  role: 'bot' | 'user'
  text: string
}

const quickQuestions = [
  'Which courses are suitable for beginners?',
  'What placement support do you provide?',
  'How can I enroll and check fees?',
  'What software services do you offer?',
]

const stopWords = new Set([
  'a',
  'about',
  'an',
  'and',
  'are',
  'can',
  'do',
  'does',
  'for',
  'how',
  'i',
  'in',
  'is',
  'me',
  'my',
  'of',
  'on',
  'the',
  'to',
  'what',
  'with',
  'you',
  'your',
])

const tokenize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word))

function findFAQReply(query: string, faqs: FAQRecord[]) {
  const normalized = query.toLowerCase().trim()

  if (/^(hi|hello|hey|good morning|good evening)\b/.test(normalized)) {
    return {
      answer:
        'Hello! I can help with courses, training modes, placement assistance, admissions, fees and software development. Choose a topic below or type your question.',
    }
  }

  if (/\b(contact|phone|call|whatsapp|email|talk|address)\b/.test(normalized)) {
    return {
      answer:
        'You can call or WhatsApp +91 89390 69135, or email contact@successroottech.com. Share your course interest or software requirement and the team will guide you.',
      matchedQuestion: 'How can I contact Success Root Technologies?',
    }
  }

  const queryTokens = tokenize(query)
  if (!queryTokens.length) return null

  const ranked = faqs
    .map((faq) => {
      const question = faq.question.toLowerCase()
      const answer = faq.answer.toLowerCase()
      const category = faq.category?.toLowerCase() || ''
      let score = 0

      queryTokens.forEach((token) => {
        if (question.includes(token)) score += 6
        if (category.includes(token)) score += 4
        if (answer.includes(token)) score += 1
      })

      if (question.includes(normalized) || normalized.includes(question)) score += 12
      return { faq, score }
    })
    .sort((a, b) => b.score - a.score)

  if (!ranked[0] || ranked[0].score < 3) return null

  return {
    answer: ranked[0].faq.answer,
    matchedQuestion: ranked[0].faq.question,
  }
}

export function FreeChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [faqs, setFAQs] = useState<FAQRecord[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'bot',
      text: 'Hi! I’m the SRT website guide. Ask me about courses, placement support, admissions or software development.',
    },
  ])
  const messageEndRef = useRef<HTMLDivElement>(null)
  const nextID = useRef(2)

  useEffect(() => {
    fetch('/api/faqs?limit=100&sort=sortOrder&depth=0')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setFAQs(data.docs || []))
      .catch(() => setFAQs([]))
  }, [])

  useEffect(() => {
    if (open) messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const ready = useMemo(() => faqs.length > 0, [faqs])

  const ask = (question: string) => {
    const cleanQuestion = question.trim()
    if (!cleanQuestion) return

    const userMessage: ChatMessage = {
      id: nextID.current++,
      role: 'user',
      text: cleanQuestion,
    }
    const reply = findFAQReply(cleanQuestion, faqs)
    const botMessage: ChatMessage = reply
      ? {
          id: nextID.current++,
          role: 'bot',
          text: reply.answer,
          matchedQuestion: reply.matchedQuestion,
        }
      : {
          id: nextID.current++,
          role: 'bot',
          text: ready
            ? 'I could not find a confident answer for that question. Please contact our team on WhatsApp or call +91 89390 69135 for accurate guidance.'
            : 'The FAQ guide is temporarily unavailable. Please contact our team on WhatsApp or call +91 89390 69135.',
        }

    setMessages((current) => [...current, userMessage, botMessage])
    setInput('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    ask(input)
  }

  return (
    <div className={`free-chatbot ${open ? 'free-chatbot--open' : ''}`}>
      {open && (
        <section aria-label="SRT website chatbot" className="chatbot-panel">
          <header className="chatbot-header">
            <span className="chatbot-avatar"><Bot size={21} /></span>
            <div>
              <strong>SRT Website Guide</strong>
              <span><i /> Free FAQ assistant · No AI fee</span>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} type="button">
              <X size={19} />
            </button>
          </header>

          <div aria-live="polite" className="chatbot-messages">
            {messages.map((message) => (
              <div className={`chatbot-message chatbot-message--${message.role}`} key={message.id}>
                {message.matchedQuestion && <small>{message.matchedQuestion}</small>}
                <p>{message.text}</p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {messages.length < 4 && (
            <div className="chatbot-quick-questions">
              <span><Sparkles size={12} /> Popular questions</span>
              <div>
                {quickQuestions.map((question) => (
                  <button key={question} onClick={() => ask(question)} type="button">
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chatbot-contact-row">
            <a href="https://wa.me/918939069135" rel="noopener noreferrer" target="_blank">
              WhatsApp
            </a>
            <a href="tel:+918939069135"><Phone size={13} /> Call advisor</a>
          </div>

          <form className="chatbot-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="chatbot-question">Ask a question</label>
            <input
              autoComplete="off"
              id="chatbot-question"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question…"
              value={input}
            />
            <button aria-label="Send question" disabled={!input.trim()} type="submit">
              <Send size={17} />
            </button>
          </form>
          <p className="chatbot-note">Answers come from published SRT FAQs. No external AI service is used.</p>
        </section>
      )}

      <button
        aria-expanded={open}
        aria-label={open ? 'Close website chat' : 'Open website chat'}
        className="chatbot-launcher"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X size={24} /> : <MessageCircle size={25} />}
        {!open && <span>Ask SRT</span>}
      </button>
    </div>
  )
}
