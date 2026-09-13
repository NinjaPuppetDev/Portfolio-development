'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export interface LabProject {
  title: string
  description: string
  status: 'Active' | 'Beta' | 'In Development' | string
  link?: string
  linkLabel?: string
}

export interface LabsProps {
  projects?: LabProject[]
}

const defaultLabProjects: LabProject[] = [
  {
    title: 'Vera',
    description:
      'The conversational interface for navigating products, portfolios, and ideas.',
    status: 'Active',
    link: '#',
    linkLabel: 'Launch Vera',
  },
  {
    title: 'Common Ground',
    description:
      'An ontology-driven system for investigating market positioning through layered reasoning.',
    status: 'Beta',
  },
  {
    title: 'Web3 Builder',
    description:
      'An AI-assisted environment for designing, testing, and deploying smart contract systems.',
    status: 'In Development',
  },
]

export default function Labs({ projects = defaultLabProjects }: LabsProps) {
  const t = useTranslations('home.labs')
  const localizedProjects = t.raw('projects') as Array<{ title: string; description: string; status: string; linkLabel?: string }>
  const translatedProjects = projects.map((project) => {
    const translation = localizedProjects.find((item) => item.title === project.title)
    return translation ? { ...project, ...translation } : project
  })

  return (
    <section
      id="labs"
      aria-labelledby="labs-heading"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        color: 'var(--text, #FFFFFF)',
      }}
    >
      {/* SECTION HEADER */}
      <header
        style={{
          borderBottom: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
          paddingBottom: '3rem',
          marginBottom: '4rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '1.75rem',
          }}
        >
          <h2
            id="labs-heading"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text, #FFFFFF)',
              margin: 0,
            }}
          >
            {t('title')}
          </h2>
          <span
            style={{
              fontFamily: 'var(--mono, monospace)',
              fontSize: '0.7rem',
              color: 'var(--accent, #C8F04A)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {t('eyebrow')}
          </span>
        </div>

        {/* Introduction */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--muted, rgba(255, 255, 255, 0.65))',
            lineHeight: 1.6,
            maxWidth: '68ch',
            fontWeight: 300,
          }}
        >
          <p style={{ margin: 0, color: 'var(--text, #FFFFFF)' }}>
            {t('intro1')}
          </p>
          <p style={{ margin: 0 }}>
            {t('intro2')}
          </p>
          <p
            style={{
              margin: '0.5rem 0 0 0',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            }}
          >
            {t('intro3')}
          </p>
        </div>
      </header>

      {/* RESEARCH NOTEBOOK LIST */}
      <div
        role="list"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {translatedProjects.map((item) => (
          <article
            key={item.title}
            role="listitem"
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2rem 4rem',
              alignItems: 'baseline',
              padding: '2.5rem 0',
              borderBottom:
                '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            }}
          >
            {/* Title & Status Block */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: 'var(--text, #FFFFFF)',
                }}
              >
                {item.title}
              </h3>

              {/* Status Badge */}
              <span
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  border:
                    '1px solid var(--border-hi, rgba(255, 255, 255, 0.15))',
                  color:
                    item.status.toLowerCase() === 'active'
                      ? 'var(--accent, #C8F04A)'
                      : 'var(--muted, rgba(255, 255, 255, 0.6))',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                {item.status}
              </span>
            </div>

            {/* Description & Optional Link */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                alignItems: 'flex-start',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                  color: 'var(--muted, rgba(255, 255, 255, 0.7))',
                  margin: 0,
                  maxWidth: '55ch',
                }}
              >
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  onClick={(e) => {
                    if (item.title.toLowerCase() === 'vera') {
                      e.preventDefault()
                      window.dispatchEvent(new CustomEvent('open-vera'))
                    }
                  }}
                  style={{
                    fontFamily: 'var(--mono, monospace)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text, #FFFFFF)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  <span>{item.linkLabel || t('learnMore')}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* FOOTER / CLOSING THESIS */}
      <footer
        style={{
          marginTop: '5rem',
          maxWidth: '65ch',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
          lineHeight: 1.6,
          fontWeight: 300,
          color: 'var(--muted, rgba(255, 255, 255, 0.65))',
        }}
      >
        <p style={{ margin: 0, color: 'var(--text, #FFFFFF)' }}>
          {t('closing1')}
        </p>
        <p style={{ margin: 0 }}>
          {t('closing2')}
          <br />
          {t('closing3')}
        </p>
      </footer>
    </section>
  )
}