'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export interface ProjectCardProps {
  index: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  year: string
  accent?: string
  variant?: 'web3' | 'brand' | 'product'
  image?: string
  layout?: 'split' | 'stacked'
}

export default function ProjectCard(props: ProjectCardProps) {
  const t = useTranslations('home.selectedWork')
  const {
    index,
    title,
    subtitle,
    tags,
    description,
    link,
    linkLabel,
    year,
    accent = 'var(--accent)',
    image,
    layout = 'split',
  } = props

  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const active = isMobile ? true : hovered
  const isExternal = link.startsWith('http')
  const isSplit = layout === 'split' && !isMobile

  const cardChassisStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: isSplit ? 'row' : 'column',
    position: 'relative',
    backgroundColor: '#090909',
    textDecoration: 'none',
    overflow: 'visible',
    height: '100%',
    minHeight: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    borderTop: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.08)',
    borderLeft: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
    borderRight: '1px solid rgba(0, 0, 0, 0.7)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.9)',
    borderRadius: '16px',
    boxShadow: hovered && !isMobile
      ? '0 32px 64px -16px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
      : '0 16px 36px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
    transform: hovered && !isMobile ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  const chassisProps = {
    onMouseEnter: () => !isMobile && setHovered(true),
    onMouseLeave: () => !isMobile && setHovered(false),
    style: cardChassisStyles,
  }

  const cardContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 'auto',
        width: '100%',
        padding: isMobile ? '1.25rem 1rem' : 'clamp(1.25rem, 2vw, 1.85rem)',
        backgroundColor: '#090909',
        boxSizing: 'border-box',
        gap: isMobile ? '1.25rem' : '0.85rem',
      }}
    >
      {/* ── TOP SECTION: IMAGE + PROJECT HEADER (SPLIT) ───────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: isSplit ? 'row' : 'column',
          gap: isSplit ? 'clamp(1.25rem, 2.5vw, 2rem)' : '1rem',
          alignItems: 'stretch',
          width: '100%',
          minWidth: 0,
        }}
      >
        {/* Left Side: Photographic Reveal Image */}
        <div
          style={{
            width: isSplit ? '46%' : '100%',
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: isSplit ? '46%' : 'auto',
            aspectRatio: isSplit ? '1 / 1' : '16 / 9',
            minHeight: isSplit ? '180px' : 'auto',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#040404',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {image ? (
            <>
              {/* Scroll-driven progressive developing image */}
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  zIndex: 1,
                  filter: isMobile
                    ? 'none'
                    : 'grayscale(calc((1 - var(--exposure, 0.2)) * 100%)) brightness(calc(0.25 + var(--exposure, 0.2) * 0.75)) contrast(calc(0.75 + var(--exposure, 0.2) * 0.35))',
                  transform: isMobile
                    ? 'none'
                    : 'scale(calc(0.97 + var(--exposure, 0.2) * 0.03))',
                }}
              />

              {/* Developing Veil (photographic negative to positive) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#040404',
                  opacity: isMobile ? 0 : 'calc((1 - var(--exposure, 0.2)) * 0.85)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              {/* Edge Vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  color: accent,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                {t('interactiveArtifact')}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Header Meta & Big Title */}
        <div
          style={{
            width: isSplit ? 'auto' : '100%',
            flex: isSplit ? '1 1 0' : '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minWidth: 0,
          }}
        >
          {/* Index / Year */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              color: accent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            {index} / {year}
          </div>

          {/* Artifact Tag */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: isMobile ? '0.5rem' : '1.25rem',
              opacity: 0.8,
            }}
          >
            {t('projectArtifact')} · {index}
          </div>

          {/* Main Title */}
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: isMobile ? '1.75rem' : 'clamp(1.65rem, 2.6vw, 2.45rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
              wordBreak: 'break-word',
            }}
          >
            {title}
          </h3>

          {/* Subtitle / Context */}
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.625rem',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: isMobile ? '0.75rem' : '1.25rem',
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Tech Badges */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginTop: isMobile ? '0.25rem' : '1rem',
              paddingTop: '0.5rem',
              minWidth: 0,
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '0.2rem 0.45rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: DESCRIPTION + CTA ROW ─────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: '0.85rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          width: '100%',
        }}
      >
        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: isMobile ? '0.875rem' : 'clamp(0.85rem, 0.95vw, 0.92rem)',
            color: 'rgba(255, 255, 255, 0.88)',
            lineHeight: 1.5,
            fontWeight: 300,
            maxWidth: isSplit ? '46ch' : '100%',
            margin: 0,
          }}
        >
          {description}
        </p>

        {/* CTA Link Container (Reserves vertical space if label is empty) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            paddingTop: isMobile ? '0.25rem' : '0',
            minHeight: '1.25rem',
          }}
        >
          {linkLabel && (
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              {linkLabel}
              <span
                style={{
                  transform: active ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease',
                }}
              >
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" {...chassisProps}>
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={link} {...chassisProps}>
      {cardContent}
    </Link>
  )
}