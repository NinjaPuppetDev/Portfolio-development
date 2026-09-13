'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VIMEO_URL     = 'https://drive.google.com/file/d/1XhNZ-JZM1RA1e2w3drjRMUo0DidQGWO_/preview'
const LIVE_SITE_URL = 'https://next-step-ten-teal.vercel.app/'
const DEMO_VIDEO_URL = '/work/nextstep/NextStepVideo.mp4'
const LOGO_URL       = '/work/nextstep/NextStepLogo.png'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DELIVERABLES = [
  { label: 'Brand Identity',      note: 'Logo system, type scale, neon-on-black color language, iconography' },
  { label: 'The static concept.', note: 'Full e-commerce UI — hero with 3D-rendered product, product grid with colorways, interactive customizer (Color → Material → Fit), feature breakdown, lifestyle gallery, process steps, and waitlist CTA. Built entirely in Figma as a UI mockup, before the live Three.js configurator replaced it.' },
  { label: 'Email Newsletter',    note: 'Marketing email with problem / solution narrative and product feature breakdown' },
  { label: 'Social Media Pitch',  note: 'PAC framework doc (Problem → Agitation → Solution) with process flow and campaign visuals' },
  { label: '3D Rendering',        note: 'Shoe renders in Blender — multiple colorways, floating product hero, exploded-sole view' },
  { label: 'Brand Film',          note: 'Horizontal brand video produced in Canva, uploaded to Vimeo' },
]

const PROCESS = [
  {
    step: '01',
    label: 'Concept',
    description: 'Defined the brand proposition: 3D-printed custom footwear at the intersection of performance and identity. Chose a high-contrast dark system with neon green to signal tech and energy without falling into generic sportswear tropes.',
  },
  {
    step: '02',
    label: 'Modeling',
    description: 'Built product renders in Blender — floating hero shots, colorway variants (neon/black, yellow/purple, mono grey), and an exploded-sole cross-section showing the TPU structure for the features section.',
  },
  {
    step: '03',
    label: '3D Printing',
    description: 'Designed the customizer UX flow: Color → Material → Fit, with live price update and add-to-cart. Translated the physical build logic into a UI that mirrors the product\'s own production steps.',
  },
  {
    step: '04',
    label: 'Delivery',
    description: 'Produced the full marketing suite: landing page, email sequence, and social pitch doc — all locked to the same design language so the brand reads consistently across every touchpoint.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'NextStep — Brand & UI Design',
  description: 'Full brand identity, UI design, and marketing system for NextStep, a fictional 3D-printed custom footwear brand — evolved from a static Figma/Blender concept into a live real-time Three.js 3D configurator. Designed by David Raigoza.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
  dateCreated: '2024',
  keywords: 'NextStep, David Raigoza, brand design, UI design, Figma, Blender, Three.js, WebGL, Tripo AI, 3D printed shoes, footwear design, portfolio',
}

// ─── TOKENS ───────────────────────────────────────────────────────────────────
// NextStep palette — locked to the brand, overrides portfolio defaults locally
const NS = {
  bg:      '#000000',
  surface: '#111111',
  border:  '#1e1e1e',
  text:    '#ffffff',
  muted:   'rgba(255,255,255,0.45)',
  green:   '#39FF14',   // neon green — the brand accent
  mono:    'var(--mono)',
  sans:    'var(--sans)',
  serif:   'var(--serif)',
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function NextStepCaseStudy() {
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const fade = (delay = 0): React.CSSProperties => ({
    opacity:   mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  // ── section wrapper ────────────────────────────────────────────────────────
  const section = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    ...extra,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: NS.bg, color: NS.text, minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* green glow */}
          <div style={{
            position: 'absolute', top: '20%', right: '-5%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 65%)',
            pointerEvents: 'none', filter: 'blur(80px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: NS.mono, fontSize: '0.65rem', color: NS.green, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fade(0.1) }}>
              Case Study · Brand & UI Design · 2024–2026
            </p>

            {/* Logo mark */}
            <div style={{ marginBottom: '1.5rem', ...fade(0.15) }}>
              <Image
                src={LOGO_URL}
                alt="NextStep logo — extruded NS wordmark"
                width={260}
                height={140}
                style={{ width: 'clamp(140px, 20vw, 220px)', height: 'auto', display: 'block' }}
                priority
              />
            </div>

            {/* Logotype-style headline — mirrors the NS brand mark weight */}
            <h1 style={{ fontFamily: NS.sans, fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '1.25rem', ...fade(0.2) }}>
              NEXT<span style={{ color: NS.green }}>STEP</span>
            </h1>

            <p style={{ fontFamily: NS.mono, fontSize: '0.72rem', color: NS.muted, letterSpacing: '0.05em', maxWidth: '52ch', lineHeight: 1.7, marginBottom: '2rem', ...fade(0.28) }}>
              The mark itself carries the brand's arc: a flat, extruded wordmark next to a lowercase-weight "STEP" in neon —
              static form giving way to something with depth. Same idea the project ended up living out.
            </p>

            <p style={{ fontFamily: NS.sans, fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)', color: NS.muted, maxWidth: '54ch', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem', ...fade(0.35) }}>
              Full brand and UI system for a 3D-printed custom footwear brand,
              rebuilt from a static Figma concept into a live, real-time Three.js
              3D configurator — visual identity, e-commerce landing page, email
              newsletter, social pitch, and now a working WebGL product.
            </p>

            <p style={{ fontFamily: NS.mono, fontSize: '0.7rem', color: NS.muted, letterSpacing: '0.1em', marginBottom: '3rem', ...fade(0.4) }}>
              Figma · Blender · Three.js · WebGL · Tripo AI · Antigravity · Brand Systems · UI Design
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fade(0.5) }}>
              <a
                href={LIVE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: NS.mono, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: NS.bg, background: NS.green, padding: '0.85rem 2.25rem', textDecoration: 'none', fontWeight: 700, transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = NS.bg }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = NS.green; el.style.color = NS.bg }}
              >
                Visit the Website →
              </a>
            </div>
          </div>
        </section>

        {/* ── EVOLUTION ────────────────────────────────────────────── */}
        <section style={section({ borderTop: `1px solid ${NS.border}`, borderBottom: `1px solid ${NS.border}`, background: NS.surface })}>
          <NSLabel>From static to real-time</NSLabel>
          <NSSectionTitle>The rebuild.</NSSectionTitle>

          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}>
            <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', color: NS.muted, lineHeight: 1.8 }}>
              The original NextStep was a static design exercise — everything
              you see in the deliverables below was modeled in Blender by hand,
              laid out in Figma, and shipped as pictures of a product. The
              customizer flow was a UI mockup of an interaction, not the
              interaction itself.
            </p>
            <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', color: NS.muted, lineHeight: 1.8 }}>
              The rebuild replaces that with a working one. The shoe model
              was generated with Tripo AI and assembled in Antigravity instead
              of hand-modeled in Blender, then wired into a live Three.js /
              WebGL scene — real-time orbit, raycasting-based hit detection on
              the shoe itself, and instant colorway and material swaps. It's
              the same brief, but the deliverable stopped being a picture of
              a customizer and became one.
            </p>
          </div>

          <p style={{ fontFamily: NS.mono, fontSize: '0.68rem', color: NS.green, lineHeight: 1.8, marginTop: '1.75rem', opacity: 0.85 }}>
            Honest caveat: the Tripo-generated mesh hasn't been matured in
            Blender yet — that's the next pass. But the direction is already
            the point: less time spent presenting the product, more time
            spent shipping it.
          </p>

          {/* Live demo video — screen capture of the deployed build */}
          <div style={{
            marginTop: '2.5rem',
            border: `1px solid ${NS.border}`,
            background: '#050505',
            overflow: 'hidden',
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src={DEMO_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p style={{ fontFamily: NS.mono, fontSize: '0.58rem', color: NS.muted, letterSpacing: '0.08em', marginTop: '0.75rem', opacity: 0.5 }}>
            Screen capture — live rotation, colorway swap, and real-time model update inside the deployed Three.js build
          </p>

          <div style={{ marginTop: '1rem' }}>
            <a
              href={LIVE_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: NS.mono, fontSize: '0.6rem', color: NS.green, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            >
              Visit the Website →
            </a>
          </div>
        </section>

        {/* ── DELIVERABLES STRIP ───────────────────────────────────── */}
        <div style={{ borderBottom: `1px solid ${NS.border}`, background: NS.surface }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '0',
          }}>
            {DELIVERABLES.map((d, i) => (
              <div key={d.label} style={{
                padding: '1.5rem 1.75rem',
                borderRight: i < DELIVERABLES.length - 1 ? `1px solid ${NS.border}` : 'none',
                borderBottom: `1px solid ${NS.border}`,
              }}>
                <p style={{ fontFamily: NS.mono, fontSize: '0.55rem', color: NS.green, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', fontWeight: 600, color: NS.text, marginBottom: '0.4rem' }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: NS.sans, fontSize: '0.75rem', color: NS.muted, lineHeight: 1.6 }}>
                  {d.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BRAND FILM ───────────────────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${NS.border}` })}>
          <NSLabel>Brand film</NSLabel>
          <NSSectionTitle>Step into motion.</NSSectionTitle>

          <div style={{
            marginTop: '2.5rem',
            position: 'relative',
            paddingBottom: '56.25%',  // 16:9 horizontal
            height: 0,
            overflow: 'hidden',
            border: `1px solid ${NS.border}`,
            background: '#050505',
          }}>
            <iframe
              src={VIMEO_URL}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="NextStep — brand film"
            />
          </div>
          <p style={{ fontFamily: NS.mono, fontSize: '0.58rem', color: NS.muted, letterSpacing: '0.08em', marginTop: '0.75rem', opacity: 0.5 }}>
            Horizontal brand film — produced in Canva, hosted on Vimeo
          </p>
        </section>

        {/* ── LANDING PAGE SCREENSHOT ───────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${NS.border}` })}>
          <NSLabel>Web design</NSLabel>
          <NSSectionTitle>The static concept.</NSSectionTitle>

          <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', color: NS.muted, maxWidth: '56ch', lineHeight: 1.75, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            Full e-commerce UI — hero with 3D-rendered product, product grid with colorways, interactive customizer (Color → Material → Fit), feature breakdown, lifestyle gallery, process steps, and waitlist CTA. Built entirely in Figma as a UI mockup, before the live Three.js configurator replaced it.
          </p>

          <div style={{ border: `1px solid ${NS.border}`, overflow: 'hidden' }}>
            <Image
              src="/work/nextstep/NextStepLandingPage.png"
              alt="NextStep landing page — 3D Printed Shoes Designed around you, full page mockup"
              width={1440}
              height={2200}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={LIVE_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: NS.mono, fontSize: '0.6rem', color: NS.green, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            >
              Visit the Website →
            </a>
          </div>
        </section>

        {/* ── EMAIL NEWSLETTER ─────────────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${NS.border}` })}>
          <NSLabel>Email marketing</NSLabel>
          <NSSectionTitle>Newsletter</NSSectionTitle>

          <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', color: NS.muted, maxWidth: '56ch', lineHeight: 1.75, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            Marketing email built on the problem / solution framework —
            opens with a bold hero, contrasts generic footwear against NextStep,
            and closes with a direct CTA. Locked to the same dark design system as the site.
          </p>

          {/* Email shown at realistic email width, centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '680px', border: `1px solid ${NS.border}`, overflow: 'hidden' }}>
              <Image
                src="/work/nextstep/NextStepNewsletter.png"
                alt="NextStep email newsletter — Step Into Motion, custom 3D printed footwear marketing email"
                width={680}
                height={1200}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── SOCIAL MEDIA / PITCH DOC ─────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${NS.border}` })}>
          <NSLabel>Social media & campaign</NSLabel>
          <NSSectionTitle>The pitch.</NSSectionTitle>

          <p style={{ fontFamily: NS.sans, fontSize: '0.9rem', color: NS.muted, maxWidth: '56ch', lineHeight: 1.75, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            PAC framework campaign doc — Problem, Agitation, Solution —
            paired with phone mockups showing the brand in-feed and
            a process flow from concept to delivery. Built as a social
            pitch and brand onboarding asset in one.
          </p>

          <div style={{ border: `1px solid ${NS.border}`, overflow: 'hidden' }}>
            <Image
              src="/work/nextstep/NextStepSocialMedia.png"
              alt="NextStep social media pitch — Problem Agitation Solution framework with process flow and phone mockups"
              width={1200}
              height={1800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${NS.border}` })}>
          <NSLabel>How it was built</NSLabel>
          <NSSectionTitle>Process</NSSectionTitle>

          <div style={{ marginTop: '2.5rem', border: `1px solid ${NS.border}`, overflow: 'hidden' }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 2fr',
                gap: '2rem',
                padding: '2rem clamp(1.5rem, 3vw, 2.5rem)',
                borderBottom: i < PROCESS.length - 1 ? `1px solid ${NS.border}` : 'none',
                alignItems: 'start',
              }}>
                {/* Step number */}
                <span style={{ fontFamily: NS.mono, fontSize: '0.6rem', color: NS.green, letterSpacing: '0.2em', paddingTop: '0.2rem', opacity: 0.7 }}>
                  {p.step}
                </span>
                {/* Label */}
                <p style={{ fontFamily: NS.sans, fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: NS.text }}>
                  {p.label}
                </p>
                {/* Description */}
                <p style={{ fontFamily: NS.sans, fontSize: '0.875rem', color: NS.muted, lineHeight: 1.75 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Green glow under CTA */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <p style={{ fontFamily: NS.mono, fontSize: '0.65rem', color: NS.green, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            See the live build
          </p>

          <h2 style={{ fontFamily: NS.sans, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: NS.text, marginBottom: '0.5rem', lineHeight: 1 }}>
            VISIT THE
          </h2>
          <h2 style={{ fontFamily: NS.sans, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: NS.green, marginBottom: '3rem', lineHeight: 1 }}>
            WEBSITE
          </h2>

          <a
            href={LIVE_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: NS.mono, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: NS.bg, background: NS.green, padding: '1.1rem 3rem', textDecoration: 'none', fontWeight: 700, display: 'inline-block', transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = NS.bg }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = NS.green; el.style.color = NS.bg }}
          >
            Visit the Website →
          </a>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${NS.border}`,
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <Link href={`/${locale}`} style={{ fontFamily: NS.mono, fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = NS.green)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            ← All work
          </Link>
          <span style={{ fontFamily: NS.mono, fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} David Raigoza
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── LOCAL SHARED COMPONENTS ──────────────────────────────────────────────────
function NSLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: '#39FF14',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function NSSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--sans)',
      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      color: '#ffffff',
      lineHeight: 1.05,
    }}>
      {children}
    </h2>
  )
}