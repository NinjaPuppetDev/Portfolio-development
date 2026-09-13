import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const COOKIE_NAME = 'portfolio_ab_variant'
const VARIANTS = ['A', 'B'] as const
const localeCookie = 'NEXT_LOCALE'
const locales = ['en', 'es'] as const
const defaultLocale = 'en'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function proxy(request: NextRequest) {
  const pathLocale = request.nextUrl.pathname.match(/^\/(en|es)(?:\/|$)/)?.[1]
  const cookieLocale = request.cookies.get(localeCookie)?.value

  const response = intlMiddleware(request)

  const activeLocale =
    pathLocale && locales.includes(pathLocale as (typeof locales)[number])
      ? (pathLocale as (typeof locales)[number])
      : cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])
      ? (cookieLocale as (typeof locales)[number])
      : defaultLocale

  response.cookies.set(localeCookie, activeLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  if (request.nextUrl.pathname === '/') {
    const hasVariant = request.cookies.has(COOKIE_NAME)

    if (!hasVariant) {
      const assignedVariant = Math.random() < 0.5 ? VARIANTS[0] : VARIANTS[1]
      response.cookies.set(COOKIE_NAME, assignedVariant, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}