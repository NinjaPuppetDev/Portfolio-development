import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { essays, getEssay } from '../../../../lib/essays'

const locales = ['en', 'es'] as const

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    essays.map((e) => ({ locale, slug: e.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const essay = getEssay(slug, locale)
  if (!essay) return {}
  return {
    title: `${essay.title} — David Raigoza`,
    description: essay.dek,
    alternates: {
      canonical: `https://davidraigoza.design/${locale}/writing/${essay.slug}`,
    },
  }
}

// Helper function to render bold tags (**text**) cleanly without raw markdown
function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--text)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const essay = getEssay(slug, locale)
  if (!essay) return notFound()

  // Split raw essay body by double line breaks into distinct content blocks
  const blocks = essay.body
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
      }}
    >
      <article style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Link
          href={`/${locale}/writing`}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '3rem',
            transition: 'color 0.2s ease',
          }}
        >
          ← All writing
        </Link>

        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          {essay.displayDate}
        </p>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.15,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}
        >
          {essay.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1.2rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '3.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border)',
            fontWeight: 300,
          }}
        >
          {essay.dek}
        </p>

        {/* Dynamic Essay Body Renderer */}
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.88)',
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          {blocks.map((block, idx) => {
            // Horizontal rule
            if (block === '---') {
              return (
                <hr
                  key={idx}
                  style={{
                    border: 'none',
                    borderTop: '1px solid var(--border)',
                    margin: '3rem 0',
                  }}
                />
              )
            }

            // Subheadings (###)
            if (block.startsWith('###')) {
              const headingText = block.replace(/^###\s*/, '')
              return (
                <h3
                  key={idx}
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '1.35rem',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginTop: '2.5rem',
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {headingText}
                </h3>
              )
            }

            // Bullet Lists (* item)
            if (block.includes('\n* ') || block.startsWith('* ')) {
              const listItems = block
                .split('\n')
                .map(item => item.replace(/^\*\s*/, '').trim())
                .filter(Boolean)

              return (
                <ul
                  key={idx}
                  style={{
                    marginBottom: '2rem',
                    paddingLeft: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  {listItems.map((item, i) => (
                    <li key={i} style={{ color: 'rgba(255, 255, 255, 0.88)' }}>
                      {renderFormattedText(item)}
                    </li>
                  ))}
                </ul>
              )
            }

            // Standard Paragraph
            return (
              <p key={idx} style={{ marginBottom: '1.75rem' }}>
                {renderFormattedText(block)}
              </p>
            )
          })}
        </div>

        {essay.mediumUrl && (
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              marginTop: '5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            Also on{' '}
            <a
              href={essay.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              Medium ↗
            </a>
          </p>
        )}
      </article>
    </main>
  )
}