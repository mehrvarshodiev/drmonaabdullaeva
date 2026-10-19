import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { localeMeta, locales, type Locale } from './i18n'

type LanguageSwitcherProps = {
  locale: Locale
  onChange: (locale: Locale) => void
  mobile?: boolean
}

export default function LanguageSwitcher({ locale, onChange, mobile = false }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = localeMeta[locale]

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${mobile ? 'w-full' : 'shrink-0'}`}>
      {mobile && <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-stone-400">{current.label}</p>}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${current.label}: ${current.nativeName}`}
        className={`group flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/60 text-xs font-semibold text-espresso shadow-sm backdrop-blur-xl transition duration-200 hover:border-sage/50 hover:bg-sage/10 focus-visible:outline-offset-4 dark:bg-white/5 ${mobile ? 'min-h-[48px] w-full justify-between rounded-2xl px-4' : 'h-10 px-3'}`}
      >
        <span className="flex items-center gap-2">
          <Globe size={15} className="text-sage" strokeWidth={1.8} />
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-stone-100 text-[13px] leading-none shadow-inner">{current.flag}</span>
          <span>{current.code}</span>
        </span>
        <ChevronDown size={14} className={`text-stone-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -7, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: .98 }}
            transition={{ duration: .18, ease: 'easeOut' }}
            role="listbox"
            aria-label="Выберите язык"
            className={`z-[80] overflow-hidden rounded-2xl border border-stone-200/80 bg-white/95 p-1.5 shadow-[0_18px_55px_rgba(28,26,23,.16)] backdrop-blur-2xl dark:bg-[#1E2330]/95 ${mobile ? 'mt-2 w-full' : 'absolute right-0 top-[calc(100%+10px)] w-48'}`}
          >
            {locales.map((item) => {
              const meta = localeMeta[item]
              const selected = item === locale
              return (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { setOpen(false); if (!selected) onChange(item) }}
                  className={`flex min-h-[43px] w-full items-center gap-3 rounded-xl px-3 text-left text-xs transition-colors duration-150 hover:bg-sage/10 focus-visible:outline-offset-[-2px] ${selected ? 'bg-sage/10 font-semibold text-sage' : 'text-espresso'}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-base shadow-inner">{meta.flag}</span>
                  <span className="flex-1">{meta.nativeName}</span>
                  <span className="text-[10px] tracking-wider text-stone-400">{meta.code}</span>
                  {selected && <Check size={14} className="text-sage" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
