'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const LANGUAGE_PREFERENCE_KEY = 'portfolio-language-preference'

function browserPrefersSpanish() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages.some((language) => language?.toLowerCase().startsWith('es'))
}

export default function LanguageSuggestion() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('languageSuggestion')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (
      locale !== 'en' ||
      !browserPrefersSpanish() ||
      window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY)
    ) return

    setVisible(true)
  }, [locale])

  const chooseLanguage = (nextLocale: 'en' | 'es') => {
    window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, nextLocale)
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
    const localizedPath = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
    setVisible(false)
    if (nextLocale !== locale) router.push(`/${nextLocale}${localizedPath}`)
  }

  if (!visible) return null

  return (
    <aside
      role="status"
      aria-live="polite"
      className="pointer-events-auto fixed right-4 top-[4.75rem] z-40 w-[min(19rem,calc(100vw-2rem))] border border-white/10 bg-black/70 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--accent)]">
        {t('eyebrow')}
      </p>
      <p className="m-0 text-sm leading-6 text-[var(--text)]">
        {t('message')}
      </p>
      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => chooseLanguage('en')}
          className="min-h-9 border-0 bg-transparent px-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[var(--muted)] hover:text-[var(--text)]"
        >
          {t('keepEnglish')}
        </button>
        <button
          type="button"
          onClick={() => chooseLanguage('es')}
          className="min-h-9 border-0 bg-transparent px-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[var(--accent)]"
        >
          {t('continueSpanish')}
        </button>
      </div>
    </aside>
  )
}