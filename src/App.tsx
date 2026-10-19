import { memo, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, Check, ChevronDown, Clock3, Instagram,
  MapPin, Menu, MessageCircle, Moon, MoveUpRight, ShieldCheck, Sparkles, Sun, X
} from 'lucide-react'

const whatsappMessage = 'Здравствуйте, хочу записаться на бесплатную диагностику к доктору Моне Абдуллаевой.'
const whatsappPhone = '79966551719'
const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`

type DentalCase = { number: string; title: string; subtitle: string; time: string; complexity: string; before: string; after: string; tag: string }
type DentalService = { number: string; title: string; description: string; note: string; icon: LucideIcon }

const cases: DentalCase[] = [
  {
    number: '01',
    title: 'Эстетическая реставрация',
    subtitle: 'Восстановление формы и естественного оттенка',
    time: '1 визит',
    complexity: 'Высокая',
    before: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85',
    after: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1100&q=85',
    tag: 'ЭСТЕТИКА',
  },
  {
    number: '02',
    title: 'Коррекция прикуса',
    subtitle: 'Путь к гармоничной улыбке с ортодонтией',
    time: 'Индивидуально',
    complexity: 'Комплексная',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1100&q=85',
    after: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85',
    tag: 'ОРТОДОНТИЯ',
  },
  {
    number: '03',
    title: 'Лечение кариеса',
    subtitle: 'Бережное восстановление с вниманием к деталям',
    time: '1 визит*',
    complexity: 'По результатам осмотра',
    before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1100&q=85',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1100&q=85',
    tag: 'ТЕРАПИЯ',
  },
]

const services: DentalService[] = [
  {
    number: '01',
    title: 'Эстетическое восстановление',
    description: 'Анатомичные реставрации, которые деликатно возвращают зубам форму, оттенок и естественный вид.',
    note: 'Точность в каждой детали',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Лечение зубов',
    description: 'Современный подход к лечению кариеса и восстановлению зубов с заботой о вашем комфорте.',
    note: 'Бережно и внимательно',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Ортодонтия',
    description: 'Планирование коррекции прикуса и подбор брекет-систем с учётом вашей клинической ситуации.',
    note: 'План для вашей улыбки',
    icon: ArrowDownRight,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] ${light ? 'text-white/65' : 'text-sage'}`}>
      <span className={`h-px w-7 ${light ? 'bg-white/50' : 'bg-sage/60'}`} />
      {children}
    </div>
  )
}

function BeforeAfterCard({ item }: { item: DentalCase }) {
  const [position, setPosition] = useState(50)

  return (
    <motion.article
      variants={fadeUp}
      className="group overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/4.3] overflow-hidden bg-ivory">
        <img src={item.before} alt={`Иллюстративное изображение до процедуры: ${item.title}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={item.after} alt={`Иллюстративное изображение результата: ${item.title}`} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(28,26,23,.12)]" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-espresso shadow-md">
            <span className="text-xs tracking-[-.2em]">‹ ›</span>
          </span>
        </div>
        <div className="absolute left-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.15em] text-espresso backdrop-blur">До</div>
        <div className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.15em] text-espresso backdrop-blur">После</div>
        <input
          aria-label={`Сравнить до и после: ${item.title}`}
          type="range" min="0" max="100" value={position}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPosition(Number(event.target.value))}
          className="absolute inset-x-0 bottom-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/40 to-transparent px-4 pb-4 pt-10 text-[9px] font-semibold uppercase tracking-[.16em] text-white/90">
          <span>Переместите ползунок</span><span>{item.tag}</span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between text-[10px] font-medium tracking-[.14em] text-stone-400">
          <span>КЕЙС {item.number}</span>
          <span className="flex items-center gap-1.5"><Clock3 size={12} /> {item.time}</span>
        </div>
        <h3 className="font-serif text-[23px] leading-tight tracking-[-.025em] text-espresso">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-500">{item.subtitle}</p>
        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-xs">
          <span className="text-stone-400">Сложность</span><span className="font-medium text-espresso">{item.complexity}</span>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-stone-400">Изображения демонстрационные. Реальные результаты индивидуальны.</p>
      </div>
    </motion.article>
  )
}

const CLINIC_MAP_URL = 'https://yandex.ru/maps/?ll=37.502687%2C55.741186&z=17&pt=37.502687%2C55.741186%2Cpm2rdm'
const CLINIC_ROUTE_URL = 'https://yandex.ru/maps/?rtext=~55.741186%2C37.502687&rtt=auto'
const YANDEX_MAP_FALLBACK_URL = 'https://yandex.ru/map-widget/v1/?ll=37.502687%2C55.741186&z=17&pt=37.502687%2C55.741186%2Cpm2rdm&l=map'

const YandexMap = memo(function YandexMap() {
  const [mapInteractive, setMapInteractive] = useState(false)
  const [balloonOpen, setBalloonOpen] = useState(false)

  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-[#ECEFE8] sm:h-[520px]">
      <iframe
        title="Интерактивная Яндекс Карта — клиника Dr. Mona Abdullaeva, Москва, улица Барклая, 8"
        src={YANDEX_MAP_FALLBACK_URL}
        width="100%"
        height="100%"
        frameBorder="0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={`clinic-map-fallback absolute inset-0 block h-full w-full ${mapInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      />
      {!mapInteractive && (
        <button
          type="button"
          onClick={() => setMapInteractive(true)}
          className="absolute inset-0 z-[5] flex items-end justify-center bg-transparent p-4 text-center"
          aria-label="Активировать управление картой"
        >
          <span className="rounded-full border border-white/80 bg-white/95 px-4 py-3 text-xs font-medium text-espresso shadow-lg backdrop-blur">
            Нажмите на карту, чтобы перемещать и масштабировать
          </span>
        </button>
      )}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setBalloonOpen((open) => !open)
          setMapInteractive(true)
        }}
        className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-sage shadow-[0_5px_20px_rgba(35,45,32,.3)] transition hover:scale-105"
        aria-label="Показать информацию о клинике"
        aria-expanded={balloonOpen}
      >
        <span className="h-3 w-3 rounded-full bg-white" />
      </button>
      {balloonOpen && (
        <div className="absolute left-1/2 top-[calc(50%-4.25rem)] z-20 w-[min(290px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-stone-200/80 bg-white/95 p-4 shadow-[0_12px_40px_rgba(28,26,23,.15)] backdrop-blur">
          <button type="button" onClick={() => setBalloonOpen(false)} aria-label="Закрыть информацию о клинике" className="absolute right-3 top-3 text-stone-400 hover:text-espresso"><X size={15} /></button>
          <p className="pr-4 font-serif text-lg leading-tight text-espresso">Dr. Mona Abdullaeva</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">Клиника эстетической стоматологии Dr. Mona Abdullaeva</p>
          <p className="mt-2 text-[11px] leading-4 text-sage">ТЦ «Старая Горбушка» · 4-й этаж</p>
          <a href={CLINIC_MAP_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-espresso underline decoration-stone-300 underline-offset-4">Открыть в Яндекс Картах <MoveUpRight size={12} /></a>
        </div>
      )}
      <a href={CLINIC_MAP_URL} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-3 text-xs font-semibold text-espresso shadow-lg backdrop-blur transition hover:-translate-y-0.5">
        Открыть карту <MoveUpRight size={13} />
      </a>
    </div>
  )
})

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = window.localStorage.getItem('dr-mona-theme')
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    } catch { /* Storage may be unavailable in private browsing. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [headerVisible, setHeaderVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const programmaticNavigationRef = useRef(false)
  const navigationResetTimerRef = useRef<number | null>(null)
  const [form, setForm] = useState<{ name: string; phone: string; service: string }>({ name: '', phone: '', service: 'Бесплатная диагностика' })
  const [submitted, setSubmitted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => {
      try {
        if (window.localStorage.getItem('dr-mona-theme')) return
      } catch { /* Fall back to the live system preference. */ }
      setTheme(preference.matches ? 'dark' : 'light')
    }
    preference.addEventListener('change', syncSystemTheme)
    return () => preference.removeEventListener('change', syncSystemTheme)
  }, [])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try { window.localStorage.setItem('dr-mona-theme', next) } catch { /* Theme still changes for this session. */ }
      return next
    })
  }

  useEffect(() => {
    let previousY = window.scrollY
    let ticking = false

    const updateScrollState = () => {
      const currentY = window.scrollY
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollableHeight > 0 ? Math.min(1, Math.max(0, currentY / scrollableHeight)) : 0)

      if (programmaticNavigationRef.current || currentY <= 24) {
        setHeaderVisible(true)
      } else if (menuOpen || currentY < previousY - 2) {
        setHeaderVisible(true)
      } else if (currentY > previousY + 2) {
        setHeaderVisible(false)
      }
      previousY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateScrollState()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [menuOpen])

  useEffect(() => {
    const preloader = document.getElementById('app-preloader')
    if (!preloader) return

    const fadeTimer = window.setTimeout(() => {
      preloader.classList.add('app-preloader--hidden')
    }, 180)
    const removeTimer = window.setTimeout(() => preloader.remove(), 630)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  const reveal = reduceMotion ? {} : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: 0.15 }, variants: fadeUp }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = [
      'Здравствуйте! Хочу записаться к доктору Моне Абдуллаевой.',
      `Имя: ${form.name.trim()}`,
      `Телефон: ${form.phone.trim()}`,
      `Услуга: ${form.service}`,
    ].join('\n')
    setSubmitted(true)
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div
      className="min-h-screen bg-alabaster text-espresso"
      onClick={(event) => {
        // One navigation path for every same-page anchor across desktop, mobile, and footer.
        if (event.defaultPrevented) return
        const target = event.target
        if (!(target instanceof Element)) return
        const anchor = target.closest('a[href^="#"]')
        if (!(anchor instanceof HTMLAnchorElement)) return
        const href = anchor.getAttribute('href')
        if (!href || href === '#') return

        let section: HTMLElement | null = null
        try {
          section = document.getElementById(decodeURIComponent(href.slice(1)))
        } catch {
          return
        }
        if (!section) return

        event.preventDefault()
        const menuWasOpen = menuOpen
        setMenuOpen(false)
        setHeaderVisible(true)
        programmaticNavigationRef.current = true
        if (navigationResetTimerRef.current !== null) {
          window.clearTimeout(navigationResetTimerRef.current)
        }
        if (window.location.hash !== href) window.history.replaceState(null, '', href)

        const scrollToTarget = () => {
          const top = href === '#home'
            ? 0
            : Math.max(0, section!.getBoundingClientRect().top + window.scrollY - 104)
          window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
          navigationResetTimerRef.current = window.setTimeout(() => {
            programmaticNavigationRef.current = false
            navigationResetTimerRef.current = null
          }, 1800)
        }

        // Wait until the mobile menu's exit animation has finished so its height
        // cannot shift the destination while the browser is scrolling.
        if (menuWasOpen) {
          window.setTimeout(scrollToTarget, 320)
        } else {
          window.requestAnimationFrame(scrollToTarget)
        }
      }}
    >
      <div
        className="scroll-progress-track"
        role="progressbar"
        aria-label="Прогресс прокрутки страницы"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
      >
        <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div className="border-b border-stone-200/70 bg-ivory px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[.17em] text-stone-500 sm:text-[10px]">
        Эстетическая стоматология · Москва · Забота, которую видно в деталях
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-stone-200/70 bg-alabaster/90 backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${headerVisible || menuOpen ? 'translate-y-0' : '-translate-y-[110%]'}`}
        style={{ willChange: 'transform' }}
      >
        <div className="section-wrap flex h-[72px] items-center justify-between gap-4">
          <a href="#home" className="group flex shrink-0 flex-col leading-none" aria-label="Dr. Mona Abdullaeva — на главную">
            <span className="font-serif text-[17px] tracking-[.09em] sm:text-[19px]">DR. MONA</span>
            <span className="mt-1.5 text-[8px] font-semibold tracking-[.24em] text-stone-500 sm:text-[9px]">ABDULLAEVA</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            <a className="text-xs text-stone-600 transition hover:text-sage" href="#home">Главная</a>
            <a className="text-xs text-stone-600 transition hover:text-sage" href="#services">Услуги</a>
            <a className="text-xs text-stone-600 transition hover:text-sage" href="#cases">Кейсы</a>
            <a className="text-xs text-stone-600 transition hover:text-sage" href="#approach">Подход</a>
            <a className="text-xs text-stone-600 transition hover:text-sage" href="#contacts">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-sage transition duration-300 hover:border-sage hover:bg-sage/10 focus-visible:outline-offset-4"
            >
              {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-sage px-5 py-3 text-[11px] font-semibold text-white transition hover:bg-sage-dark sm:inline-flex">
              <MessageCircle size={14} /> Записаться <ArrowRight size={13} />
            </a>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 lg:hidden" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-stone-200 bg-alabaster lg:hidden">
              <div className="section-wrap flex flex-col py-3">
                {[
                  ['Главная', '#home'],
                  ['Услуги', '#services'],
                  ['Кейсы до/после', '#cases'],
                  ['Подход', '#approach'],
                  ['Контакты', '#contacts'],
                ].map(([label, href]) => (
                  <a key={href} href={href}  className="border-b border-stone-100 py-4 text-sm">{label}</a>
                ))}
                <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu} className="my-4 flex items-center justify-center gap-2 rounded-full bg-sage py-3.5 text-sm font-semibold text-white"><MessageCircle size={16} /> Записаться в WhatsApp</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="section-wrap grid items-center gap-10 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:min-h-[660px] lg:grid-cols-[1.03fr_.97fr] lg:gap-16 lg:py-16">
          <motion.div {...reveal} className="relative z-10">
            <Eyebrow>Улыбка, в которой вы — это вы</Eyebrow>
            <h1 className="max-w-[650px] font-serif text-[clamp(2.9rem,8vw,5.8rem)] leading-[.99] tracking-[-.055em] text-espresso">
              Твоя идеальная улыбка <span className="italic text-sage">начинается здесь.</span>
            </h1>
            <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-stone-600 sm:mt-7 sm:text-base sm:leading-8">
              Эстетическая стоматология и ортодонтия с вниманием к каждой детали. Лечение кариеса, эстетические реставрации и брекет-системы — с заботой о вашем комфорте.
            </p>
            <div className="mt-6 flex max-w-md items-start gap-3 rounded-2xl border border-sage/15 bg-[#F1F3EE] p-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-white"><Check size={14} /></span>
              <div><p className="text-sm font-semibold text-espresso">Бесплатная диагностика и снимок</p><p className="mt-1 text-xs leading-5 text-stone-500">На первом приёме — по предварительной записи и при наличии показаний.</p></div>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contacts" className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-sage px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(91,107,84,.2)] transition hover:-translate-y-0.5 hover:bg-sage-dark">
                Записаться на бесплатный осмотр <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a href="#cases" className="inline-flex min-h-[48px] items-center justify-center gap-2 text-sm font-medium text-stone-600 transition hover:text-sage">Посмотреть работы <ArrowDownRight size={15} /></a>
            </div>
            <div className="mt-9 flex items-center gap-4 border-t border-stone-200 pt-5">
              <div className="flex -space-x-2">
                {['photo-1559839734-2b71ea197ec2','photo-1612349317150-e413f6a5b16d','photo-1582750433449-648ed127bb54'].map((id) => <img key={id} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&h=80&q=75`} alt="" className="h-9 w-9 rounded-full border-2 border-alabaster object-cover" />)}
              </div>
              <p className="text-xs leading-5 text-stone-500"><span className="font-semibold text-espresso">Индивидуальный подход</span><br />План лечения начинается с диалога</p>
            </div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, .36, 1] }} className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full border border-taupe/50 sm:-right-7 sm:-top-7 sm:h-36 sm:w-36" />
            <div className="relative grid grid-cols-[1fr_.34fr] gap-3 sm:gap-4">
              <div className="image-grain relative aspect-[.79] overflow-hidden rounded-t-[45%] rounded-b-[1.6rem] bg-ivory">
                <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=90" alt="Светлый современный стоматологический кабинет" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
                <div className="absolute inset-x-4 bottom-5 z-10 text-white sm:inset-x-6 sm:bottom-7">
                  <span className="text-[9px] uppercase tracking-[.2em] text-white/75">Ваш комфорт — в центре</span>
                  <p className="mt-2 max-w-[240px] font-serif text-2xl leading-tight sm:text-3xl">Естественная красота в деталях</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-12 sm:gap-4 sm:pt-16">
                <div className="aspect-[.8] overflow-hidden rounded-[1.25rem] bg-[#E7E5DA]">
                  <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=500&q=85" alt="Демонстрационное фото стоматологической эстетики" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col justify-center rounded-[1.25rem] bg-ivory p-3 sm:p-4">
                  <Sparkles size={20} strokeWidth={1.4} className="text-sage" />
                  <p className="mt-3 font-serif text-xl leading-tight sm:text-2xl">Бережно.</p>
                  <p className="mt-1 font-serif text-xl italic leading-tight text-sage sm:text-2xl">Продуманно.</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border border-stone-200/70 bg-white/95 p-3 shadow-soft backdrop-blur sm:bottom-5 sm:-left-8 sm:p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-sage"><ShieldCheck size={19} /></span>
              <div><p className="text-xs font-semibold">План лечения — для вас</p><p className="mt-1 text-[10px] text-stone-500">Обсуждаем каждый этап</p></div>
            </div>
          </motion.div>
        </section>

        <section id="cases" className="bg-ivory py-16 sm:py-24">
          <div className="section-wrap">
            <motion.div {...reveal} className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
              <div><Eyebrow>Портфолио улыбок</Eyebrow><h2 className="max-w-2xl font-serif text-4xl leading-[1.06] tracking-[-.04em] sm:text-5xl lg:text-6xl">Маленькие детали.<br /><span className="italic text-sage">Большая разница.</span></h2></div>
              <p className="max-w-xs text-sm leading-6 text-stone-500">Каждый случай уникален. Сравните изображения и узнайте больше о подходе к лечению.</p>
            </motion.div>
            <motion.div variants={{ visible: { transition: { staggerChildren: .12 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .1 }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cases.map((item) => <BeforeAfterCard key={item.number} item={item} />)}
            </motion.div>
            <p className="mt-5 text-[11px] leading-5 text-stone-400">*Сроки и объём лечения определяются после очного осмотра. Представленные изображения — визуальные примеры дизайна, не подтверждённые клинические кейсы.</p>
          </div>
        </section>

        <section id="services" className="section-wrap py-16 sm:py-24">
          <motion.div {...reveal} className="mb-9 sm:mb-12">
            <Eyebrow>Чем я могу помочь</Eyebrow>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="max-w-2xl font-serif text-4xl leading-[1.06] tracking-[-.04em] sm:text-5xl lg:text-6xl">Здоровье зубов —<br /><span className="italic text-sage">основа уверенности.</span></h2>
              <p className="max-w-sm text-sm leading-6 text-stone-500">Современные методы, понятные рекомендации и план, который учитывает именно вашу ситуацию.</p>
            </div>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map(({ number, title, description, note, icon: Icon }, index) => (
              <motion.article key={number} {...reveal} transition={{ duration: .5, delay: index * .08 }} className="group flex min-h-[285px] flex-col rounded-[1.5rem] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sage/30 hover:shadow-soft sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-sm text-stone-400">{number}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-sage transition duration-300 group-hover:bg-sage group-hover:text-white"><Icon size={19} strokeWidth={1.5} /></span>
                </div>
                <h3 className="mt-8 max-w-[260px] font-serif text-[27px] leading-[1.1] tracking-[-.025em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-5 mt-6">
                  <span className="text-[10px] uppercase tracking-[.12em] text-stone-400">{note}</span>
                  <a href="#contacts" aria-label={`Записаться: ${title}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 transition group-hover:border-sage group-hover:bg-sage group-hover:text-white"><MoveUpRight size={15} /></a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="approach" className="section-wrap pb-16 sm:pb-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#263027] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10 sm:-right-6 sm:-top-36 sm:h-[430px] sm:w-[430px]" />
            <div className="absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/10 sm:right-12 sm:-top-24 sm:h-[300px] sm:w-[300px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
              <div>
                <Eyebrow light>В основе — доверие</Eyebrow>
                <h2 className="max-w-2xl font-serif text-4xl leading-[1.06] tracking-[-.04em] sm:text-5xl lg:text-6xl">Не просто лечение.<br /><span className="italic text-[#C6D0BE]">Внимание к вам.</span></h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Объясняю варианты простым языком, отвечаю на вопросы и помогаю принимать решения без спешки. Ваш комфорт начинается с открытого разговора.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['01', 'Диалог до лечения'], ['02', 'Понятный план'], ['03', 'Внимание к деталям'], ['04', 'Поддержка на этапах']].map(([n, label]) => <div key={n} className="rounded-2xl border border-white/15 bg-white/[.04] p-4 sm:p-5"><span className="text-[10px] tracking-[.16em] text-[#C6D0BE]">{n}</span><p className="mt-5 text-sm leading-5 text-white/90">{label}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="bg-ivory py-16 sm:py-24">
          <div className="section-wrap grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <motion.div {...reveal}>
              <Eyebrow>Первый шаг — простой</Eyebrow>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-.04em] sm:text-5xl lg:text-6xl">Давайте знакомиться <span className="italic text-sage">и улыбаться.</span></h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-stone-500">Оставьте контакты и выберите, что вас интересует. Мы подготовим сообщение для записи в WhatsApp.</p>
              <div className="mt-8 space-y-4">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-sage/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EEE5] text-sage"><MessageCircle size={19} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">Запись в WhatsApp</span><span className="mt-1 block text-xs text-stone-500">Напишите удобным для вас способом</span></span><ArrowRight size={16} className="text-stone-400" />
                </a>
                <a href="https://www.instagram.com/drmonaabdullaeva/" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-sage/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0E8E0] text-[#8B725D]"><Instagram size={19} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">Instagram</span><span className="mt-1 block text-xs text-stone-500">@drmonaabdullaeva</span></span><MoveUpRight size={16} className="text-stone-400" />
                </a>
              </div>
              <a href="https://yandex.ru/maps/?text=Москва%2C%20ул.%20Барклая%2C%20д.%208%2C%20ТЦ%20Старая%20Горбушка%2C%204-й%20этаж" target="_blank" rel="noreferrer" className="mt-5 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-sage/40"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9EEE5] text-sage"><MapPin size={18} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold uppercase tracking-[.14em] text-sage">Адрес приёма</span><span className="mt-1 block text-sm leading-6 text-espresso">Москва, ул. Барклая, д. 8<br />ТЦ «Старая Горбушка», 4-й этаж</span><span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">Открыть в Яндекс Картах <MoveUpRight size={13} /></span></span></a>
            </motion.div>

            <motion.div {...reveal} className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_15px_50px_rgba(28,26,23,.04)] sm:p-8 lg:p-10">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-sage">Запись на приём</span><h3 className="mt-2 font-serif text-3xl tracking-[-.03em]">Расскажите о себе</h3></div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-sage"><ArrowDownRight size={19} /></span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium text-stone-600">Ваше имя</label>
                  <input id="name" name="name" autoComplete="name" required minLength={2} value={form.name} onChange={(e: ChangeEvent<HTMLInputElement>) => { setForm({ ...form, name: e.target.value }); setSubmitted(false) }} placeholder="Как к вам обращаться?" className="h-13 w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-sage focus:bg-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-medium text-stone-600">Номер телефона</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} value={form.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => { setForm({ ...form, phone: e.target.value }); setSubmitted(false) }} placeholder="+7 (___) ___-__-__" className="w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-sage focus:bg-white" />
                </div>
                <div>
                  <label htmlFor="service" className="mb-2 block text-xs font-medium text-stone-600">Что вас интересует?</label>
                  <div className="relative">
                    <select id="service" name="service" value={form.service} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setForm({ ...form, service: e.target.value }); setSubmitted(false) }} className="w-full appearance-none rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3.5 pr-10 text-sm text-espresso outline-none transition focus:border-sage focus:bg-white">
                      <option>Бесплатная диагностика</option><option>Эстетическое восстановление</option><option>Лечение зубов</option><option>Ортодонтия / брекеты</option><option>Другая услуга</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-[11px] leading-5 text-stone-500">
                  <input type="checkbox" required className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#5B6B54]" />
                  <span>Я согласен(на) на обработку персональных данных для связи по заявке и ознакомлен(а) с <a href="#privacy-note" className="underline underline-offset-2 hover:text-sage">условиями конфиденциальности</a>.</span>
                </label>
                <button type="submit" className="group flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-sage px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sage-dark active:translate-y-0">
                  {submitted ? <><Check size={17} /> Сообщение подготовлено</> : <>Записаться на приём <ArrowRight size={16} className="transition group-hover:translate-x-1" /></>}
                </button>
                <p id="privacy-note" className="text-center text-[10px] leading-5 text-stone-400">После нажатия откроется WhatsApp с подготовленным сообщением. Данные не отправляются на сервер этого сайта.</p>
              </form>
            </motion.div>
          </div>
          <motion.div {...reveal} className="section-wrap mt-12 sm:mt-16">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_18px_60px_rgba(28,26,23,.06)]">
              <div className="grid lg:grid-cols-[.82fr_1.18fr]">
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
                  <Eyebrow>Как нас найти</Eyebrow>
                  <h3 className="max-w-md font-serif text-4xl leading-[1.04] tracking-[-.045em] sm:text-5xl">Будем рады <span className="italic text-sage">вас видеть.</span></h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-stone-500">Приходите на консультацию — поможем подобрать бережный и понятный план заботы о вашей улыбке.</p>

                  <div className="mt-7 flex items-start gap-4 border-t border-stone-100 pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9EEE5] text-sage"><MapPin size={19} /></span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sage">Адрес клиники</p>
                      <p className="mt-2 text-sm leading-6 text-espresso">Москва, ул. Барклая, д. 8<br />ТЦ «Старая Горбушка», 4-й этаж</p>
                      <a href={CLINIC_MAP_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 transition hover:text-sage">Открыть адрес в Яндекс Картах <MoveUpRight size={12} /></a>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-4 border-t border-stone-100 pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0E8E0] text-[#8B725D]"><MessageCircle size={18} /></span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sage">Связаться с нами</p>
                      <a href="tel:+79966551719" className="mt-2 inline-flex text-base font-medium tracking-wide text-espresso transition hover:text-sage">+7 (996) 655-17-19</a>
                      <p className="mt-1 text-xs text-stone-500">Запись и вопросы по WhatsApp</p>
                    </div>
                  </div>

                  <a href={CLINIC_ROUTE_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 self-start rounded-full bg-sage px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(91,107,84,.18)] transition hover:-translate-y-0.5 hover:bg-sage-dark">
                    Проложить маршрут <ArrowRight size={15} />
                  </a>
                </div>
                <div className="relative min-h-[300px] bg-[#ECEFE8] lg:min-h-[520px]">
                  <YandexMap />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/25 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-alabaster">
        <div className="section-wrap">
          <div className="flex flex-col gap-7 border-b border-stone-200 py-8 sm:flex-row sm:items-center sm:justify-between">
            <a href="#home" className="flex flex-col leading-none"><span className="font-serif text-lg tracking-[.09em]">DR. MONA</span><span className="mt-1.5 text-[8px] font-semibold tracking-[.24em] text-stone-500">ABDULLAEVA</span></a>
            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-stone-500"><a href="#home" className="hover:text-sage">Главная</a><a href="#services" className="hover:text-sage">Услуги</a><a href="#cases" className="hover:text-sage">Кейсы</a><a href="#approach" className="hover:text-sage">Подход</a><a href="#contacts" className="hover:text-sage">Контакты</a></nav>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/drmonaabdullaeva/" target="_blank" rel="noreferrer" aria-label="Instagram доктора Моны" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition hover:border-sage hover:text-sage"><Instagram size={16} /></a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Запись в WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition hover:border-sage hover:text-sage"><MessageCircle size={16} /></a>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-5 text-[10px] leading-5 text-stone-400 sm:flex-row sm:items-start sm:justify-between">
            <p>© {new Date().getFullYear()} Dr. Mona Abdullaeva. Все права защищены.</p>
            <p className="max-w-2xl sm:text-right">Информация на сайте не является медицинской рекомендацией и не заменяет консультацию специалиста. План лечения, показания, стоимость и сроки определяются врачом после очного осмотра. Изображения в портфолио — демонстрационные и не подтверждают реальные результаты лечения.</p>
          </div>
        </div>
      </footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-sage px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(37,54,34,.28)] transition hover:-translate-y-1 hover:bg-sage-dark sm:bottom-6 sm:right-6" aria-label="Записаться в WhatsApp">
        <MessageCircle size={19} /><span>Записаться</span>
      </a>
    </div>
  )
}

export default App
