'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { useVeraStore } from '../store/veraStore'

const CONSENT_COOKIE = 'COOKIE_CONSENT'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function hasConsentChoice() {
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
}

function initializeAnalytics() {
  if (document.getElementById('google-analytics-consent')) return

  const analyticsScript = document.createElement('script')
  analyticsScript.id = 'google-analytics-consent'
  analyticsScript.async = true
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YQXEJSG71S'
  document.head.appendChild(analyticsScript)

  const analyticsConfig = document.createElement('script')
  analyticsConfig.id = 'google-analytics-config-consent'
  analyticsConfig.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YQXEJSG71S');
  `
  document.head.appendChild(analyticsConfig)

  const clarityScript = document.createElement('script')
  clarityScript.id = 'microsoft-clarity-consent'
  clarityScript.textContent = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","xc7iqvsl54");
  `
  document.head.appendChild(clarityScript)
}

export default function CookieBanner() {
  const t = useTranslations('cookie')
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const mode = useVeraStore((s) => s.mode)

  useEffect(() => {
    setMounted(true)
    if (hasConsentChoice()) {
      if (document.cookie.includes(`${CONSENT_COOKIE}=true`)) initializeAnalytics()
      return
    }
    
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const chooseConsent = (granted: boolean) => {
    document.cookie = `${CONSENT_COOKIE}=${granted}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    if (granted) initializeAnalytics()
    setVisible(false)
  }

  if (!mounted || !visible || mode === 'loading') return null

  return createPortal(
    <div className="fixed bottom-6 inset-x-0 z-[9999] flex justify-center px-4 pointer-events-none">
      <aside
        role="dialog"
        aria-live="polite"
        aria-label={t('title')}
        className="pointer-events-auto w-full max-w-lg rounded-2xl border border-border bg-surface/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-border text-text mt-0.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text font-semibold">
                {t('title')}
              </h2>
              <p className="m-0 text-[0.8rem] leading-[1.4] text-text/80 font-sans">
                {t('description')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/50">
            <button
              type="button"
              onClick={() => chooseConsent(false)}
              className="h-8 rounded-lg border border-border bg-transparent px-4 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-border-hi hover:text-text focus:outline-none focus:ring-2 focus:ring-accent/50 text-center"
            >
              {t('decline')}
            </button>
            <button
              type="button"
              onClick={() => chooseConsent(true)}
              className="h-8 rounded-lg border border-accent bg-accent px-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-bg transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent text-center"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  )
}