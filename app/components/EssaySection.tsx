'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import EssayCard from './EssayCard'
import { essays } from '../../lib/essays'

// Placed after Contact on the landing page, deliberately. This section is
// for people who scroll past the CTA looking for more, and for search —
// it isn't meant to compete with the case studies for a founder's attention
// mid-funnel. Not in the header nav for the same reason.
export default function EssaySection() {
  const t = useTranslations('home.writing')
  if (essays.length === 0) return null

  // Sort essays descending by date (latest first)
  const sortedEssays = [...essays].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featuredEssay = sortedEssays[0]
  const archiveEssays = sortedEssays.slice(1, 4) // Displays up to 3 older essays in compact view

  return (
    <section
      id="writing"
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid var(--border)',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            opacity: 0.7,
            margin: 0,
          }}
        >
          {t('label')}
        </p>
        <Link
          href="/writing"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            textDecoration: 'none',
          }}
        >
          {t('allEssays')} →
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Featured Latest Essay */}
        {featuredEssay && (
          <EssayCard essay={featuredEssay} variant="featured" />
        )}

        {/* Older Archive Essays (Compact Rows) */}
        {archiveEssays.length > 0 && (
          <div
            style={{
              paddingTop: '1rem',
              marginTop: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {archiveEssays.map(essay => (
              <EssayCard key={essay.slug} essay={essay} variant="compact" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}