'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import MobileMenu from './MobileMenu'

interface NavItem {
  label: string
  href: string
}

interface Theme {
  isLightPage: boolean
  textPrimary: string
  textMuted: string
}

interface MobileNavigationProps {
  theme: Theme
  navItems: NavItem[]
  pathname: string
  showActiveState: boolean
  languageSwitcher: ReactNode
}

export default function MobileNavigation({ theme, navItems, pathname, showActiveState, languageSwitcher }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isLightPage, textPrimary } = theme

  return (
    <>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        padding: '0.75rem 1.25rem',
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
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: textPrimary,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            DR
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {languageSwitcher}
          <button
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              margin: '-0.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ width: '18px', height: '1.5px', backgroundColor: textPrimary }} />
            <span style={{ width: '18px', height: '1.5px', backgroundColor: textPrimary }} />
            <span style={{ width: '12px', height: '1.5px', backgroundColor: textPrimary }} />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        theme={theme}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  )
}