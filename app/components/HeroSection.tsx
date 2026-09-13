'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import GlitchWord from './GlitchWord'
import { useVeraStore } from '../store/veraStore'
import { useBodySignals } from '../hooks/useBodySignals'
import { useVeraAnchor } from '../hooks/useVeraAnchor'
import ScrollCue from './ScrollCue'

export default function HeroSection() {
  const t = useTranslations('home')
  useBodySignals()
  const anchorRef = useVeraAnchor('hero', 'dock') as React.RefObject<HTMLDivElement>
  const heroRef = anchorRef
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)

  useEffect(() => {
    setMounted(true)

    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      heroRef.current.style.setProperty('--py', `${window.scrollY * 0.15}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let raf = 0
    const onMouseMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        if (heroRef.current) {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          heroRef.current.style.setProperty('--mx', String(nx))
          heroRef.current.style.setProperty('--my', String(ny))
        }
        raf = 0
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isMobile])

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: isMobile ? '100dvh' : 'calc(100dvh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile
          ? '7rem 1.5rem 2rem 1.5rem'
          : 'clamp(5rem, 8vh, 7rem) clamp(2rem, 6vw, 6rem) clamp(3.5rem, 6vh, 5.5rem)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Conceptual Background Image — Reduced opacity for better copy readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          transform: 'translateY(var(--py, 0px))',
          pointerEvents: 'none',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 40%, transparent 90%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 40%, transparent 90%)',
        }}
      />

      {/* Premium Neutral Grid Overlay with top fade mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'translateY(var(--py, 0px))',
          pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 10%, black 25%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 10%, black 25%)',
        }}
      />

      {/* CONTENT WRAPPER */}
      <div style={{ marginLeft: 'clamp(0px, 18vw, 340px)' }}>

        {/* TEXT & COPY CONTAINER */}
        <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1400px' }}>
          {/* Active System Indicator Trigger */}
          <button
            type="button"
            aria-label="Activate Vera AI Assistant"
            onClick={(e) => {
              e.preventDefault()
              window.dispatchEvent(new CustomEvent('open-vera'))
              setTimeout(() => {
                const inputEl = document.querySelector('input') || document.querySelector('textarea')
                if (inputEl) inputEl.focus()
              }, 60)
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              opacity: isHovered ? 1 : 0.9,
              transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                display: 'inline-block',
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                boxShadow: isHovered ? '0 0 8px var(--accent)' : 'none',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6875rem',
                color: 'var(--text)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                margin: 0,
                userSelect: 'none',
                opacity: 0.9,
              }}
            >
              {t('eyebrow')}
            </p>
          </button>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 3.2vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: '1.75rem',
            }}
          >
            {mounted ? <GlitchWord word={t('headline.line1')} /> : t('headline.line1')}
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.95 }}>
              {mounted ? <GlitchWord word={t('headline.line2')} /> : t('headline.line2')}
            </span>
            <br />
            <span style={{ color: 'var(--text)', opacity: 0.85 }}>
              {mounted ? <GlitchWord word={t('headline.line3')} /> : t('headline.line3')}
            </span>
          </h1>

          {/* Value Proposition */}
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: isMobile ? '0.875rem' : 'clamp(1rem, 1.4vw, 1.1875rem)',
              color: 'var(--text)',
              opacity: 0.65,
              maxWidth: '52ch',
              lineHeight: 1.5,
              fontWeight: 300,
              margin: 0,
            }}
          >
            {t('intro')}
          </p>
        </div>

        {/* Structured Action Dock & High-Contrast Primary CTA Container */}
        <div style={{ marginTop: '2rem', width: '100%', zIndex: 4, maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="/work-with-me"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#000000',
                backgroundColor: 'var(--text, #ffffff)',
                border: '1px solid #ffffff',
                boxShadow: isCtaHovered
                  ? '0 0 20px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.5)'
                  : '0 0 10px rgba(255, 255, 255, 0.15), 0 2px 6px rgba(0, 0, 0, 0.4)',
                transform: isCtaHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span>{t('cta')}</span>
              <span
                aria-hidden="true"
                style={{
                  transform: isCtaHovered ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                →
              </span>
            </Link>
          </div>
        </div>

      </div>
      <ScrollCue />
    </section>
  )
}