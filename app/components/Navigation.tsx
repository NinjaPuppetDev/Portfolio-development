'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { useExperiment } from './ExperimentProvider'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import LanguageSuggestion from './LanguageSuggestion'

export default function Navigation() {
  const { variant } = useExperiment()
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Explicit structural check for the light canvas route
  const isLightPage = pathname === '/work/marigold-bloom'

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)

    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      media.removeEventListener('change', listener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!mounted) return null

  const isVariantB = variant === 'B'
  const showActiveState = scrolled || isVariantB

  // Dynamic token mapping based on route context — computed once here,
  // passed down so Desktop/Mobile/Menu/Button never diverge on theme.
  const theme = {
    isLightPage,
    textPrimary: isLightPage ? '#1A1A1A' : '#FFFFFF',
    textMuted: isLightPage ? 'rgba(0, 0, 0, 0.5)' : 'var(--muted)',
  }

  const switchLocale = (nextLocale: 'en' | 'es') => {
    if (nextLocale === locale) return

    const localizedPath = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
    window.localStorage.setItem('portfolio-language-preference', nextLocale)
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
    router.push(`/${nextLocale}${localizedPath}`)
  }

  const languageSwitcher: ReactNode = (
    <div
      aria-label="Language"
      role="group"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.1rem',
        marginLeft: '0.25rem',
        paddingLeft: '0.35rem',
        borderLeft: isLightPage ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {(['en', 'es'] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={locale === option}
          onClick={() => switchLocale(option)}
          style={{
            border: 'none',
            background: locale === option
              ? (isLightPage ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)')
              : 'transparent',
            color: locale === option ? theme.textPrimary : theme.textMuted,
            borderRadius: '12px',
            padding: '0.35rem 0.45rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            cursor: locale === option ? 'default' : 'pointer',
            opacity: locale === option ? 1 : 0.7,
          }}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )

  const navItems = [
    { label: t('work'), href: '/#work' },
    { label: t('home'), href: '/#home' },
    { label: t('workWithMe'), href: '/work-with-me' },
  ]

  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? '0.5rem' : '1.75rem',
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      padding: isMobile ? '0 1rem' : '0 1.5rem',
      pointerEvents: 'none',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}>
      {isMobile ? (
        <MobileNavigation
          theme={theme}
          navItems={navItems}
          pathname={pathname}
          showActiveState={showActiveState}
          languageSwitcher={languageSwitcher}
        />
      ) : (
        <DesktopNavigation
          theme={theme}
          navItems={navItems}
          pathname={pathname}
          showActiveState={showActiveState}
          languageSwitcher={languageSwitcher}
        />
      )}
      <LanguageSuggestion />
    </div>
  )
}