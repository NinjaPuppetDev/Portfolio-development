'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import VeraButton from './VeraButton'

interface NavItem {
  label: string
  href: string
}

interface Theme {
  isLightPage: boolean
  textPrimary: string
  textMuted: string
}

interface DesktopNavigationProps {
  theme: Theme
  navItems: NavItem[]
  pathname: string
  showActiveState: boolean
  languageSwitcher: ReactNode
}

export default function DesktopNavigation({ theme, navItems, pathname, showActiveState, languageSwitcher }: DesktopNavigationProps) {
  const { isLightPage, textPrimary, textMuted } = theme

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '1100px',
      boxSizing: 'border-box',
      padding: '0.7rem 1.75rem',
      pointerEvents: 'all',

      backgroundColor: isLightPage ? 'rgba(247, 244, 238, 0.7)' : 'rgba(20, 20, 20, 0.92)',
      borderTop: isLightPage ? '1px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.16)',
      borderLeft: isLightPage ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.09)',
      borderRight: isLightPage ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid rgba(0, 0, 0, 0.6)',
      borderBottom: isLightPage ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.8)',
      borderRadius: '40px',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',

      boxShadow: isLightPage
        ? `
          0 24px 48px -12px rgba(40, 30, 20, 0.08),
          0 8px 16px -4px rgba(40, 30, 20, 0.04),
          inset 0 1px 0px rgba(255, 255, 255, 0.8)
        `
        : `
          0 24px 48px -12px rgba(0, 0, 0, 0.85),
          0 8px 16px -4px rgba(0, 0, 0, 0.9),
          0 0 32px rgba(255, 255, 255, 0.03),
          inset 0 1px 1px rgba(255, 255, 255, 0.08)
        `,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: showActiveState ? 'translateY(0)' : 'translateY(-4px)',
    }}>

      {/* IDENTITY BLOCK */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: textPrimary,
            fontWeight: 700,
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
          }}>
            DR
          </span>
        </Link>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.55rem',
          color: textMuted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: isLightPage ? 0.6 : 0.3,
          borderLeft: isLightPage ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
          paddingLeft: '1.25rem',
          transition: 'all 0.3s ease',
        }}>
          SYS.OP // 2026
        </span>
      </div>

      {/* INTERACTION LINKS (MILLEDOUT TRAY) */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: isLightPage ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.4)',
        border: isLightPage ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(0, 0, 0, 0.5)',
        borderBottomColor: isLightPage ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.03)',
        borderRightColor: isLightPage ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.02)',
        padding: '0.25rem',
        borderRadius: '20px',
        boxShadow: isLightPage ? 'inset 0 1px 2px rgba(0,0,0,0.04)' : 'inset 0 2px 4px rgba(0,0,0,0.6)',
        transition: 'all 0.3s ease',
      }}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={(e) => {
              if (item.href.startsWith('/#') && pathname === '/') {
                const targetId = item.href.replace('/#', '')
                const element = document.getElementById(targetId)
                if (element) {
                  e.preventDefault()
                  element.scrollIntoView({ behavior: 'smooth' })
                  window.history.pushState(null, '', item.href)
                }
              }
            }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: textMuted,
              padding: '0.35rem 0.85rem',
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isLightPage ? '#000000' : '#FFFFFF'
              e.currentTarget.style.backgroundColor = isLightPage
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.boxShadow = isLightPage
                ? '0 1px 0 rgba(255,255,255,0.8), inset 0 1px 1px rgba(0,0,0,0.02)'
                : '0 1px 0 rgba(255,255,255,0.05), inset 0 1px 1px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textMuted
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {item.label}
          </Link>
        ))}
        {languageSwitcher}
      </div>

      {/* NEUMORPHIC BUTTON EXTENSION (PRIMARY CTA) */}
      <VeraButton theme={theme} variant="desktop" />
    </nav>
  )
}