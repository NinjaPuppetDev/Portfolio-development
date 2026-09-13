import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

const locales = ['en', 'es'] as const
const defaultLocale = 'en'

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale
  const locale =
    typeof requestedLocale === 'string' && hasLocale(locales, requestedLocale)
      ? requestedLocale
      : defaultLocale

  const messages = (await import(`../../messages/${locale}.json`)).default

  return {
    locale,
    messages,
  }
})
