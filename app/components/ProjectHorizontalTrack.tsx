'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import ProjectCard, { ProjectCardProps } from './ProjectCard'

export interface TrackSection {
  number: string
  title: string
  question: string
  support: string
  accent: string
  projects: ProjectCardProps[]
}

interface ProjectHorizontalTrackProps {
  tracks: TrackSection[]
}

export default function ProjectHorizontalTrack({ tracks }: ProjectHorizontalTrackProps) {
  const t = useTranslations('home.selectedWork')
  const runwayRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [progressPercent, setProgressPercent] = useState(0)

  // Flatten all projects into a continuous sequence with track metadata attached
  const allItems = tracks.flatMap((track) =>
    track.projects.map((p) => ({
      ...p,
      trackNumber: track.number,
      trackTitle: track.title,
      trackAccent: track.accent,
    }))
  )

  const totalProjects = allItems.length

  useEffect(() => {
    let animationFrameId: number

    const handleScroll = () => {
      if (!runwayRef.current || !trackRef.current) return

      const runwayRect = runwayRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const totalScrollableDistance = runwayRect.height - viewportHeight

      if (totalScrollableDistance <= 0) return

      // Scrolled distance within the runway container (0 when top enters viewport top)
      const scrolled = -runwayRect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance))
      setProgressPercent(Math.round(progress * 100))

      const itemElements = trackRef.current.querySelectorAll<HTMLElement>('[data-project-index]')
      if (itemElements.length === 0) return

      const firstItem = itemElements[0]
      const lastItem = itemElements[itemElements.length - 1]

      // Distance from first card's position to last card's position
      const distanceBetweenFirstAndLast = lastItem.offsetLeft - firstItem.offsetLeft

      // Allow dwell time at beginning and end
      // 0.00 -> 0.05: Frame is pinned on Project 01
      // 0.05 -> 0.90: Moves smoothly through all projects 01 -> 08
      // 0.90 -> 1.00: Frame stays pinned on Project 08 for reading before unpinning
      const startDwell = 0.04
      const endDwell = 0.92

      let animProgress = 0
      if (progress <= startDwell) {
        animProgress = 0
      } else if (progress >= endDwell) {
        animProgress = 1
      } else {
        animProgress = (progress - startDwell) / (endDwell - startDwell)
      }

      const currentTranslateX = animProgress * distanceBetweenFirstAndLast
      trackRef.current.style.transform = `translate3d(-${currentTranslateX}px, 0, 0)`

      // Determine which project is currently active and update smooth progressive exposure on each card
      const viewportWidth = window.innerWidth
      const focalPoint = viewportWidth * 0.38
      let closestIndex = 0
      let minDistance = Infinity

      itemElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect()
        const elementCenter = rect.left + rect.width / 2
        const distance = Math.abs(elementCenter - focalPoint)

        // As the card moves in from the right edge toward the focal point:
        // Continuous progressive reveal from dark/negative (0.0) to full photographic positive (1.0)
        const enterEdge = viewportWidth * 0.95
        let exposure = 0
        if (elementCenter >= enterEdge) {
          exposure = 0
        } else if (elementCenter <= focalPoint) {
          exposure = 1
        } else {
          const t = (enterEdge - elementCenter) / (enterEdge - focalPoint)
          // Smooth S-curve development transition
          exposure = t * t * (3 - 2 * t)
        }

        el.style.setProperty('--exposure', exposure.toFixed(3))

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = idx
        }
      })

      setActiveProjectIndex(closestIndex)
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    // Initial positioning
    onScrollOrResize()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [totalProjects])

  const currentActiveProject = allItems[activeProjectIndex] || allItems[0]

  return (
    /* ── VERTICAL SCROLL RUNWAY ───────────────────────────────────────────── */
    <div
      ref={runwayRef}
      id="work-runway"
      style={{
        position: 'relative',
        // Total runway height: gives comfortable vertical scroll budget to view every single project
        height: `calc(100dvh + ${totalProjects * 85}dvh + 40dvh)`,
        width: '100%',
      }}
    >
      {/* ── STICKY VIEWING FRAME ────────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          overflow: 'visible',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(4.5rem, 8vh, 5.5rem) 0 clamp(1.5rem, 3vh, 2.5rem)',
          zIndex: 10,
          backgroundColor: 'var(--bg)',
        }}
      >
        {/* Frame Top Header HUD: Track Title, Active Counter, and Progress Bar */}
        <div
          style={{
            padding: '0 clamp(1.5rem, 5vw, 4rem)',
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.75rem',
            }}
          >
            {/* Active Track / Project Context */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  color: currentActiveProject?.trackAccent || 'var(--accent)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {t('track')} {currentActiveProject?.trackNumber}
              </span>
              <span style={{ color: 'var(--border)' }}>/</span>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {currentActiveProject?.trackTitle}
              </span>
            </div>

            {/* Spatial Position Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text)',
                  letterSpacing: '0.15em',
                }}
              >
                <span style={{ color: currentActiveProject?.trackAccent || 'var(--accent)' }}>
                  {String(activeProjectIndex + 1).padStart(2, '0')}
                </span>
                {' / '}
                <span style={{ color: 'var(--muted)' }}>
                  {String(totalProjects).padStart(2, '0')}
                </span>
              </span>

              {/* Linear Progress Indicator */}
              <div
                style={{
                  width: '90px',
                  height: '2px',
                  backgroundColor: 'var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: currentActiveProject?.trackAccent || 'var(--accent)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL PROJECT TRACK (THE APERTURE) ─────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'visible',
            padding: '0.5rem 0',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
              paddingRight: 'clamp(2rem, 8vw, 10rem)',
              willChange: 'transform',
            }}
          >
            {allItems.map((project, idx) => {
              const isActive = idx === activeProjectIndex

              return (
                <div
                  key={project.index}
                  data-project-index={idx}
                  style={{
                    width: 'clamp(340px, 60vw, 840px)',
                    height: 'auto',
                    minHeight: '340px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: isActive
                      ? '1px solid rgba(255, 255, 255, 0.22)'
                      : '1px solid var(--border)',
                    borderRadius: '16px',
                    backgroundColor: '#090909',
                    transition: 'border-color 0.25s ease',
                    overflow: 'hidden',
                  }}
                >
                  <ProjectCard {...project} layout="split" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Frame Bottom Status / Navigation Cue */}
        <div
          style={{
            padding: '0 clamp(1.5rem, 5vw, 4rem)',
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {t('scrollCue')} · {activeProjectIndex === totalProjects - 1 ? t('continuedToLabs') : t('horizontalSequence')}
          </p>

          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: currentActiveProject?.trackAccent || 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {currentActiveProject?.title}
          </p>
        </div>
      </div>
    </div>
  )
}
