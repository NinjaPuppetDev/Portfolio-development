'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const WALKTHROUGH_VIDEO_URL = '/work/virtual-portfolio-hub/vph-walkthrough.mp4'
const LIVE_APP_URL = 'https://aistudio.google.com/apps/a6a43dcb-0f83-4b02-aed2-169360546c3a?fullscreenApplet=true'

const ARCHITECTURE_ITEMS = [
  {
    title: 'AI-Assisted Authoring',
    detail: 'Transforms rough project notes into structured submissions aligned with the evaluation rubric.',
  },
  {
    title: 'Human-in-the-Loop Editing',
    detail: 'Every AI-generated section remains editable before publication.',
  },
  {
    title: 'Dual Interface Architecture',
    detail: 'Separate experiences were designed for participants and reviewers, each optimized for their specific workflow.',
  },
  {
    title: 'Deadline Management',
    detail: 'Submission windows are controlled centrally, automatically preventing modifications after the review cutoff.',
  },
  {
    title: 'AI Recommendation Engine',
    detail: 'Provides reviewers with an initial assessment while leaving scoring decisions entirely in human hands.',
  },
]

const IMPACT_POINTS = [
  'Participants spend less time formatting documentation.',
  'Reviewers receive standardized submissions.',
  'Bootcamp organizers maintain consistent evaluation criteria.',
  'Human judgment remains the final authority.',
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Career Portfolio Hub — AI-Assisted Submission & Evaluation Platform',
  description:
    'A full-stack platform that helps bootcamp participants transform rough project notes into structured portfolio submissions while giving reviewers a standardized workspace.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
}

export default function CareerPortfolioHubCaseStudy() {
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
            Full-Stack Platform · Gemini AI Integration · Evaluation Systems
          </p>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '2.5rem',
            ...fadeIn(0.2)
          }}>
            Career Portfolio Hub.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
              AI-Assisted Submission & Evaluation Platform
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--text)', maxWidth: '58ch', lineHeight: 1.5, fontWeight: 400, marginBottom: '2.5rem', ...fadeIn(0.3) }}>
            A full-stack platform that helps bootcamp participants transform rough project notes into structured portfolio submissions while giving reviewers a standardized workspace for evaluating projects against a shared rubric.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
            <a
              href="#walkthrough"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--text)',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Watch Build Walkthrough ↓
            </a>
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Open Live App →
            </a>
          </div>
        </section>

        {/* ── CHALLENGE & SOLUTION ───────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: '4rem clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>01 / The Challenge</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>Bootcamp evaluations are fragmented.</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
              Participants typically prepare their projects in documents, emails, and chat messages before manually assembling a final submission. Reviewers then receive inconsistent formats, making evaluation slower and more subjective.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65, fontStyle: 'italic' }}>
              The challenge was to design a workflow that standardized both submission and evaluation without replacing human judgment.
            </p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>02 / The Solution</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>AI assists both sides of the process.</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
              Participants begin with rough notes rather than polished documentation. The platform uses Gemini to transform those notes into structured project summaries aligned with the bootcamp's evaluation rubric. Participants remain in control, reviewing and editing the generated content before publishing.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              On the reviewer side, evaluators receive standardized submissions, AI-generated assessment suggestions, and dedicated scoring tools while retaining full authority over the final decision.
            </p>
          </div>
        </section>

        {/* ── WALKTHROUGH ─────────────────────────────────────────── */}
        <section id="walkthrough" style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <Label>Live Walkthrough</Label>
              <SectionTitle>Platform Demonstration</SectionTitle>
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '36ch', textAlign: 'right' }}>
              BUILT TO DEMONSTRATE HUMAN-IN-THE-LOOP AI WORKFLOWS AND STANDARDIZED EVALUATIONS.
            </p>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            border: '1px solid var(--border)',
            background: '#0a0a0a',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster="/work/virtual-portfolio-hub/hub-preview.png"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src={WALKTHROUGH_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* ── WORKFLOW ─────────────────────────────── */}
        <section id="workflow" style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>Dual-Sided Experience</Label>
          <SectionTitle>Product Workflow</SectionTitle>

          {/* Student Workspace Block */}
          <div style={{ marginTop: '3rem', marginBottom: '5rem' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
              Student Workspace
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 300 }}>
              The participant workspace allows students to enter rough notes, generate structured portfolio content with AI, manually edit every section, publish the submission, and continue making revisions until the evaluation deadline. Once closed, editing is automatically disabled to preserve evaluation integrity.
            </p>
            <div style={{
              border: '1px solid var(--border)',
              background: '#0a0a0a',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
              <img
                src="/work/virtual-portfolio-hub/studentworkspace.png"
                alt="Student Submission Center Workspace"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Reviewer Workspace Block */}
          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
              Reviewer Workspace
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 300 }}>
              Reviewers access a dedicated evaluation interface with standardized project summaries, AI-generated baseline recommendations, seven rubric scoring categories, reviewer notes, award nomination workflows, and submission locking after final approval.
            </p>
            <div style={{
              border: '1px solid var(--border)',
              background: '#0a0a0a',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
              <img
                src="/work/virtual-portfolio-hub/reviewerworkspace.png"
                alt="Reviewer Evaluation Workspace"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE ───────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>System Design</Label>
          <SectionTitle>Architecture</SectionTitle>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.7, marginTop: '1rem', marginBottom: '3rem', fontWeight: 300 }}>
            Designed around complete product execution rather than static prompt engineering.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {ARCHITECTURE_ITEMS.map((item, idx) => (
              <div key={item.title} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{idx + 1}</span>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── IMPACT ─────────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>Outcomes</Label>
          <SectionTitle>Measurable Impact</SectionTitle>

          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: 'var(--text)', maxWidth: '60ch', lineHeight: 1.5, marginTop: '1.5rem', marginBottom: '2.5rem', fontWeight: 300 }}>
            The platform demonstrates how AI can augment structured review processes without automating decision making.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {IMPACT_POINTS.map((point, index) => (
              <div key={index} style={{
                border: '1px solid var(--border)',
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent)', fontSize: '0.9rem' }}>✓</span>
                <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5, fontWeight: 300 }}>{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Ready to scale your product?
          </p>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '2.5rem', lineHeight: 1.05 }}>
            One Team. Zero Handoffs. Full Stack.
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/#contact"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--text)',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              Start a Project →
            </Link>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <Link href={`/${locale}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
            ← Back to All Case Studies
          </Link>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} David Raigoza Studio
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── SHARED HELPER COMPONENTS ──────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--accent)',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 300,
      color: 'var(--text)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    }}>
      {children}
    </h2>
  )
}