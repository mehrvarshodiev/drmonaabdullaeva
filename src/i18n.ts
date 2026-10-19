import ru from './locales/ru.json'
import tg from './locales/tg.json'
import kg from './locales/kg.json'
import uz from './locales/uz.json'
import kz from './locales/kz.json'

export const locales = ['ru', 'tg', 'kg', 'uz', 'kz'] as const
export type Locale = (typeof locales)[number]

export const localeMeta: Record<Locale, { code: string; flag: string; nativeName: string; htmlLang: string; label: string }> = {
  ru: { code: 'RU', flag: '🇷🇺', nativeName: 'Русский', htmlLang: 'ru', label: 'Язык сайта' },
  tg: { code: 'TG', flag: '🇹🇯', nativeName: 'Тоҷикӣ', htmlLang: 'tg', label: 'Забони сомона' },
  kg: { code: 'KG', flag: '🇰🇬', nativeName: 'Кыргызча', htmlLang: 'ky', label: 'Сайттын тили' },
  uz: { code: 'UZ', flag: '🇺🇿', nativeName: 'O‘zbekcha', htmlLang: 'uz', label: 'Sayt tili' },
  kz: { code: 'KZ', flag: '🇰🇿', nativeName: 'Қазақша', htmlLang: 'kk', label: 'Сайт тілі' },
}

export const messages = { ru, tg, kg, uz, kz } as const
export type Messages = typeof ru

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

export function localeFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0]?.toLowerCase()
  return isLocale(segment) && segment !== 'ru' ? segment : segment === 'ru' ? 'ru' : null
}

export function localeFromBrowser(language?: string): Locale {
  const normalized = (language || 'ru').toLowerCase()
  if (normalized.startsWith('tg') || normalized.startsWith('tj')) return 'tg'
  if (normalized.startsWith('ky') || normalized.startsWith('kg')) return 'kg'
  if (normalized.startsWith('uz')) return 'uz'
  if (normalized.startsWith('kk') || normalized.startsWith('kz')) return 'kz'
  if (normalized.startsWith('ru')) return 'ru'
  return 'ru'
}

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ru'
  const fromPath = localeFromPath(window.location.pathname)
  if (fromPath) return fromPath
  try {
    const saved = window.localStorage.getItem('dr-mona-locale')
    if (isLocale(saved)) return saved
  } catch {
    // Continue with browser language if storage is unavailable.
  }
  return localeFromBrowser(window.navigator.languages?.[0] || window.navigator.language)
}

export function localizedPath(locale: Locale): string {
  const currentPath = window.location.pathname
  const segments = currentPath.split('/').filter(Boolean)
  if (segments[0] && isLocale(segments[0])) segments.shift()
  const rest = segments.length ? `/${segments.join('/')}` : ''
  const suffix = rest + window.location.search + window.location.hash
  return locale === 'ru' ? (suffix || '/') : `/${locale}${suffix}`
}
