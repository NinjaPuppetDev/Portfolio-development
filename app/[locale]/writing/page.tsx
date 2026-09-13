import type { Metadata } from 'next'
import EssayCard from '../../components/EssayCard'
import { essays } from '../../../lib/essays'

export const metadata: Metadata = {
  title: 'Writing — David Raigoza',
  description:
    'Essays on product design, engineering, and the systems behind them, by David Raigoza.',
  alternates: {
    canonical: 'https://davidraigoza.design/writing',
  },
}

export default function WritingIndexPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Writing
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '3rem',
          }}
        >
          Essays.
        </h1>

        <div>
          {essays.map(essay => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
          {essays.length === 0 && (
            <p style={{ fontFamily: 'var(--sans)', color: 'var(--muted)', fontSize: '0.9rem' }}>
              Nothing published yet.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}