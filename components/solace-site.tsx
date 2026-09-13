'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Award,
  CalendarDays,
  Check,
  CheckCircle,
  ChevronDown,
  CircleArrowRight,
  Clock3,
  Crown,
  DollarSign,
  Heart,
  Lightbulb,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import {
  APPOINTMENT_STEPS,
  CLINIC_CONFIG,
  FAQ_ITEMS,
  NAVIGATION,
  POPULAR_SERVICES,
  SERVICES,
  TEAM_MEMBERS,
  TRUST_POINTS,
  VALUES,
} from '@/lib/config'
import { Button } from '@/components/ui/button'

/* ---------------------------------------------------------------------- */
/*  Helpers                                                                */
/* ---------------------------------------------------------------------- */

function whatsappLink(message?: string) {
  const number = CLINIC_CONFIG.contact.whatsapp?.replace(/\D/g, '')
  if (!number) return '#'
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

function phoneHrefFor(phone: string) {
  return phone.startsWith('[') ? undefined : `tel:${phone.replace(/\s/g, '')}`
}

/**
 * Image map — all photos live in /public/pix/
 * Update the assignments here to swap which photo appears where.
 */
const PIX = {
  hero: '/pix/IMG_0545.jpg',
  aboutPrimary: '/pix/IMG_0541.jpg',
  aboutSecondary: '/pix/IMG_0544.jpg',
  serviceCleaning: '/pix/IMG_0539.jpg',
  serviceWhitening: '/pix/IMG_0546.jpg',
  serviceCheckup: '/pix/IMG_0547.jpg',
  // Team portraits
  teamOne: '/pix/AKML9604 - Copy.jpg',
  teamTwo: '/pix/AKML9628.jpg',
  teamThree: '/pix/AKML9679.jpg',
  teamFour: '/pix/AKML9686.jpg',
  missionBg: '/pix/IMG_0550.jpg',
  visionBg: '/pix/IMG_0553.jpg',
}

const iconMap = {
  Award,
  CheckCircle,
  Crown,
  DollarSign,
  Heart,
  Lightbulb,
  Search,
  Shield,
  Sparkles,
  Users,
  Wrench,
  Zap,
}

type IconName = keyof typeof iconMap

function Icon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name as IconName] || Sparkles
  return <IconComponent aria-hidden="true" className={className} />
}

/* ---------------------------------------------------------------------- */
/*  Shared motifs — a recurring "smile curve" is the one distinctive mark */
/*  this site leans on, echoing the brand's actual subject matter.        */
/* ---------------------------------------------------------------------- */

function SmileMark({ className = 'size-4 text-secondary' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 16" fill="none" className={className} aria-hidden="true">
      <path d="M2 2c2.5 9 8.5 12 14 12s11.5-3 14-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="13.5" r="1.6" fill="currentColor" />
    </svg>
  )
}

function Eyebrow({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={`flex items-center gap-2 text-sm font-semibold ${tone === 'dark' ? 'text-secondary' : 'text-secondary'}`}>
      <SmileMark className="size-4" />
      {children}
    </p>
  )
}

function SmileDivider({ flip = false, tone = 'background' }: { flip?: boolean; tone?: 'background' | 'muted' }) {
  const fill = tone === 'muted' ? 'fill-muted' : 'fill-background'
  return (
    <div aria-hidden="true" className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={`h-10 w-full ${fill}`}>
        <path d="M0,0 C240,55 400,55 600,30 C800,5 960,5 1200,45 L1200,60 L0,60 Z" />
      </svg>
    </div>
  )
}

/**
 * Reveal — a lightweight scroll-triggered fade/slide-in wrapper.
 * Wraps any section content so it animates into view the first time
 * it crosses into the viewport, then stays put (no re-triggering, no jank).
 */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // If the browser doesn't support IntersectionObserver, just show it.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Solace Dentalcare home">
      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <Image
          src="/pix/solaceLogo.PNG"
          alt="Solace Dentalcare logo"
          width={40}
          height={40}
          className="size-full object-contain"
        />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-lg font-bold tracking-tight text-primary">solace</span>
        <span className="mt-1 block text-[10px] font-medium tracking-[0.2em] text-muted-foreground">dentalcare</span>
      </span>
    </Link>
  )
}

/* ---------------------------------- Navbar -------------------------------- */

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex size-4 items-center justify-center">
      <span
        className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
          open ? 'translate-y-0 rotate-45' : '-translate-y-[5px]'
        }`}
      />
      <span
        className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${
          open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
        }`}
      />
      <span
        className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
          open ? 'translate-y-0 -rotate-45' : 'translate-y-[5px]'
        }`}
      />
    </span>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-secondary after:transition-all after:duration-200 ${
        isActive
          ? 'text-primary after:w-full'
          : 'text-muted-foreground after:w-0 hover:text-primary hover:after:w-full'
      }`}
    >
      {label}
    </Link>
  )
}

/** Thin, animated progress bar tracking scroll position through the page. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-secondary shadow-[0_0_8px_theme(colors.secondary.DEFAULT)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const whatsappHref = whatsappLink()
  const phoneHref = phoneHrefFor(CLINIC_CONFIG.contact.phone)

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? 'border-border bg-background/95 shadow-sm backdrop-blur-lg' : 'border-transparent bg-background/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAVIGATION.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {phoneHref ? (
            <a
              href={phoneHref}
              aria-label="Call the clinic"
              className="flex size-11 items-center justify-center rounded-full border border-border text-primary transition-all duration-200 hover:scale-105 hover:border-secondary hover:text-secondary"
            >
              <Phone className="size-4" />
            </a>
          ) : null}
          <Link href="/contact#appointment">
            <Button className="group rounded-full px-5">
              Book an appointment
              <CircleArrowRight data-icon="inline-end" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className={`flex size-10 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden ${
            open ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-primary hover:border-secondary/50'
          }`}
          onClick={() => setOpen((value) => !value)}
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-primary/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <nav
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`relative z-40 grid overflow-hidden border-t bg-background transition-all duration-300 ease-out lg:hidden ${
          open ? 'grid-rows-[1fr] border-border opacity-100' : 'grid-rows-[0fr] border-transparent opacity-0'
        }`}
      >
        <div className="min-h-0 px-5 py-5">
          <div className="flex flex-col gap-1">
            {NAVIGATION.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${index * 40}ms` : '0ms' }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                    open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  } ${isActive ? 'bg-secondary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                >
                  {item.label}
                  {isActive ? <SmileMark className="size-4 text-secondary" /> : null}
                </Link>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
            <Link href="/contact#appointment" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-full">
                Book an appointment <CircleArrowRight data-icon="inline-end" />
              </Button>
            </Link>
            <a
              href={whatsappHref}
              target={whatsappHref === '#' ? undefined : '_blank'}
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold text-primary transition-colors hover:border-secondary/40 hover:bg-muted"
            >
              <MessageCircle className="size-4 text-secondary" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
  tone = 'light',
}: {
  eyebrow: string
  title: string
  body?: string
  centered?: boolean
  tone?: 'light' | 'dark'
}) {
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className={centered ? 'flex justify-center' : ''}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        className={`mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-balance ${
          tone === 'dark' ? 'text-primary-foreground' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-base leading-7 ${tone === 'dark' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {body}
        </p>
      )}
    </div>
  )
}

export function HeroSection() {
  const currentYear = new Date().getFullYear()
  const establishedYear = Number(CLINIC_CONFIG.established)
  const yearsOfCare =
    Number.isFinite(establishedYear) && establishedYear > 1900 && establishedYear <= currentYear
      ? currentYear - establishedYear
      : null

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8f8ff_0%,#eef7f7_100%)]">
      <div className="pointer-events-none absolute -left-24 top-10 hidden size-72 rounded-full border border-secondary/15 lg:block" />
      <div className="pointer-events-none absolute right-10 top-1/3 hidden size-40 animate-pulse rounded-full bg-accent/10 blur-2xl lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-20 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-background/70 px-4 py-2 text-xs font-semibold text-primary shadow-sm">
            <SmileMark className="size-4 text-secondary" /> Trusted family dental care since {CLINIC_CONFIG.established}
          </div>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Restoring your{' '}
            <span className="relative inline-block text-secondary">
              beautiful
              <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full text-secondary/40" fill="none" aria-hidden="true">
                <path d="M2 8c40-8 156-8 196 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{' '}
            smile
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{CLINIC_CONFIG.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact#appointment">
              <Button size="lg" className="group rounded-full px-6">
                Book an appointment <CircleArrowRight data-icon="inline-end" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary/20 bg-background/70 px-6 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore our services
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">
            {['Children & adults', 'Gentle approach', 'Modern dentistry'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="size-4 text-secondary" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative animate-slide-in-right">
          <div className="absolute -right-5 -top-5 size-28 rounded-full border border-secondary/20" />
          <div className="absolute -bottom-6 -left-6 size-20 rounded-2xl bg-accent/15" />
          <div className="group relative overflow-hidden rounded-[2rem] rounded-bl-[5rem] border-8 border-background shadow-2xl transition-transform duration-500 hover:-translate-y-1">
            <Image
              src={PIX.hero}
              alt="Dentist consulting with a patient at Solace Dentalcare"
              width={900}
              height={620}
              priority
              className="aspect-[1.25] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-background/90 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <Heart className="size-5 fill-current" />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary">Care that feels personal</p>
                  <p className="text-xs text-muted-foreground">Every visit, every smile</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-primary">
                <Star className="size-4 fill-accent text-accent" /> 5.0
              </div>
            </div>
            {yearsOfCare !== null && yearsOfCare > 0 && (
              <div className="absolute -left-4 top-6 flex size-20 -rotate-6 flex-col items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-xl transition-transform duration-300 group-hover:rotate-0">
                <span className="font-serif text-2xl font-bold leading-none">{yearsOfCare}+</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide">Years</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <SmileDivider />
    </section>
  )
}

export function QuickActions() {
  const whatsappHref = whatsappLink()
  const phoneHref = phoneHrefFor(CLINIC_CONFIG.contact.phone)
  const mapsHref =
    CLINIC_CONFIG.location.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${CLINIC_CONFIG.location.coordinates.lat},${CLINIC_CONFIG.location.coordinates.lng}`

  return (
    <section className="relative z-10 mx-auto -mt-4 max-w-7xl px-5 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl sm:grid-cols-3">
        <a
          href={whatsappHref}
          target={whatsappHref === '#' ? undefined : '_blank'}
          rel="noreferrer"
          className="group flex items-center gap-4 border-b border-border p-5 transition-colors hover:bg-muted sm:border-b-0 sm:border-r"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <MessageCircle />
          </span>
          <span>
            <span className="block text-sm font-bold text-primary">Talk to us</span>
            <span className="text-xs text-muted-foreground">WhatsApp inquiries</span>
          </span>
        </a>

        <a
          href={phoneHref}
          className="group flex items-center gap-4 border-b border-border p-5 transition-colors hover:bg-muted sm:border-b-0 sm:border-r"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Phone />
          </span>
          <span>
            <span className="block text-sm font-bold text-primary">Call the clinic</span>
            <span className="text-xs text-muted-foreground">{CLINIC_CONFIG.contact.phone}</span>
          </span>
        </a>

        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 p-5 transition-colors hover:bg-muted"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <MapPin />
          </span>
          <span>
            <span className="block text-sm font-bold text-primary">Find us</span>
            <span className="text-xs text-muted-foreground">{CLINIC_CONFIG.location.address}</span>
          </span>
        </a>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
      <Reveal className="relative">
        <div className="absolute -left-6 -top-6 size-24 rounded-3xl bg-secondary/10" />
        <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src={PIX.aboutPrimary}
            alt="Inside the Solace Dentalcare clinic"
            width={900}
            height={900}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-16">
            <p className="text-sm font-semibold text-secondary">Since {CLINIC_CONFIG.established}</p>
            <h3 className="mt-1 font-serif text-2xl leading-tight text-primary-foreground">
              A calmer, kinder way to care for your smile.
            </h3>
          </div>
        </div>
        <div className="absolute -bottom-8 -right-6 hidden w-48 overflow-hidden rounded-2xl border-4 border-background shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:block">
          <Image
            src={PIX.aboutSecondary}
            alt="Dental team at work"
            width={400}
            height={400}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="absolute -left-4 -top-4 flex size-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-lg">
          <Stethoscope className="size-7" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <SectionHeading
          eyebrow="About Solace Dentalcare"
          title="Gentle care. Healthy smiles. Better experiences."
          body="Solace Dentalcare provides professional dental services for children and adults, combining affordability, modern dentistry and compassionate patient care. We believe every visit should leave you feeling informed, comfortable and cared for."
        />
        <Link
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
        >
          Learn more about us <CircleArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading
          centered
          eyebrow="Our services"
          title="Comprehensive dental care for every smile"
          body="From prevention to restoration and cosmetic care, our team supports your oral health at every stage."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <article
                className={`group relative overflow-hidden rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 1 ? 'border-secondary/30 bg-primary text-primary-foreground' : 'border-border bg-card'
                }`}
              >
                {index === 1 && (
                  <span className="absolute right-6 top-6 z-10 rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary">
                    Most requested
                  </span>
                )}
                <div
                  className={`absolute -right-8 -top-8 size-24 rounded-full transition-transform duration-300 group-hover:scale-110 ${
                    index === 1 ? 'bg-secondary/15' : 'bg-secondary/5'
                  }`}
                />
                <span
                  className={`relative flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 ${
                    index === 1 ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  <Icon name={service.icon} className="size-6" />
                </span>
                <h3 className={`relative mt-7 font-serif text-2xl font-semibold ${index === 1 ? 'text-primary-foreground' : 'text-primary'}`}>
                  {service.name}
                </h3>
                <p className={`relative mt-3 leading-7 ${index === 1 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {service.description}
                </p>
                <ul className="relative mt-6 grid gap-3">
                  {service.items.slice(0, 4).map((item) => (
                    <li key={item} className={`flex items-center gap-2 text-sm ${index === 1 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      <Check className="size-4 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className={`group/link relative mt-7 inline-flex items-center gap-2 text-sm font-bold ${
                    index === 1 ? 'text-secondary' : 'text-primary'
                  }`}
                >
                  View all services{' '}
                  <CircleArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PopularServices() {
  const serviceImages = [PIX.serviceCleaning, PIX.serviceWhitening, PIX.serviceCheckup]

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Popular treatments"
        title="Small changes. Big confidence."
        body="Explore some of the ways our team can help you feel great about your smile."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {POPULAR_SERVICES.map((service, index) => (
          <Reveal key={service.id} delay={index * 100}>
            <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={serviceImages[index] ?? PIX.serviceCleaning}
                  alt={service.name}
                  width={600}
                  height={360}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl bg-background/90 text-secondary shadow-md backdrop-blur-sm">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <SmileMark className="absolute bottom-3 right-3 size-8 text-background/70" />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-4 flex items-center gap-1 rounded-full bg-background/95 px-4 py-2 text-xs font-bold text-primary shadow">
                    Learn more <CircleArrowRight className="size-3" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-primary">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.benefits.map((benefit) => (
                    <span key={benefit} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function TrustSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            tone="dark"
            eyebrow="The Solace difference"
            title="Why choose Solace Dentalcare?"
            body="Your comfort, trust and long-term oral health are at the heart of everything we do."
          />
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 80}>
                <div className="group border-l-2 border-secondary/30 pl-5 transition-colors duration-300 hover:border-secondary">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={point.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/65">{point.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        centered
        eyebrow="Your visit, simplified"
        title="A comfortable journey to better oral health"
        body="We make it easy to take the next step, with clear communication and personal attention from the moment you reach out."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-4">
        {APPOINTMENT_STEPS.map((item, index) => (
          <Reveal key={item.step} delay={index * 100}>
            <div className="group relative rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {index < APPOINTMENT_STEPS.length - 1 && (
                <div className="absolute left-full top-12 hidden h-px w-5 bg-secondary/30 md:block" />
              )}
              <span className="flex size-9 items-center justify-center rounded-full bg-secondary/10 font-serif text-lg font-semibold text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                {item.step}
              </span>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function ValuesSection() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeading
            eyebrow="What guides us"
            title="Care with purpose."
            body="Our work is grounded in a simple belief: everyone deserves excellent, compassionate oral healthcare."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MissionSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-[2rem] bg-secondary p-8 text-secondary-foreground transition-transform duration-500 hover:-translate-y-1 sm:p-12">
          <Image
            src={PIX.visionBg}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-25 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
            aria-hidden="true"
          />
          <div className="relative">
            <SmileMark className="absolute -right-3 -top-1 size-24 text-secondary-foreground/15" />
            <p className="text-sm font-semibold text-secondary-foreground/80">Our vision</p>
            <p className="mt-8 font-serif text-3xl leading-tight">
              To be the choice for quality, affordable oral health services in the country through continuous quality improvement.
            </p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm transition-transform duration-500 hover:-translate-y-1 sm:p-12">
          <Image
            src={PIX.missionBg}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-[0.07] transition-transform duration-700 group-hover:scale-105"
            aria-hidden="true"
          />
          <div className="relative">
            <SmileMark className="absolute -right-3 -top-1 size-24 text-secondary/10" />
            <p className="text-sm font-semibold text-secondary">Our mission</p>
            <p className="mt-8 font-serif text-3xl leading-tight text-primary">
              To deliver the best possible dental care and experience to our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TeamSection() {
  // Real team portraits from /public/pix/
  const teamImages = [PIX.teamOne, PIX.teamTwo, PIX.teamThree, PIX.teamFour]

  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading
          centered
          eyebrow="Our dental team"
          title="People who care about your smile"
          body="Meet the team behind Solace Dentalcare. Staff profiles and photographs will be added as information becomes available."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => (
            <Reveal key={member.id} delay={index * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
                  <Image
                    src={teamImages[index] ?? PIX.teamOne}
                    alt={member.name}
                    width={600}
                    height={750}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-secondary">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">{member.qualifications}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string | null>(compact ? FAQ_ITEMS[0].id : null)
  const [query, setQuery] = useState('')

  const items = compact
    ? FAQ_ITEMS.slice(0, 4)
    : FAQ_ITEMS.filter(
        (item) =>
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 lg:py-32">
      <SectionHeading
        centered
        eyebrow="FAQs"
        title="Questions, answered with care"
        body="Here are a few common questions. If you need more information, our team is happy to help."
      />

      {!compact && (
        <div className="relative mx-auto mt-10 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a question..."
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none ring-secondary/30 transition placeholder:text-muted-foreground/70 focus:border-secondary focus:ring-2"
          />
        </div>
      )}

      <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card px-6 shadow-sm">
        {items.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No questions match &ldquo;{query}&rdquo;. Try a different search, or reach out to our team directly.
          </p>
        )}
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <div key={item.id}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setActive(isActive ? null : item.id)}
                aria-expanded={isActive}
              >
                <span className="font-semibold text-primary">{item.question}</span>
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <ChevronDown className={`size-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-out ${
                  isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0">
                  <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {compact ? (
        <div className="mt-8 text-center">
          <Link href="/faqs" className="group inline-flex items-center gap-2 text-sm font-bold text-primary">
            View all FAQs <CircleArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-secondary/30 bg-secondary/5 p-8 text-center">
          <SmileMark className="size-6 text-secondary" />
          <p className="font-serif text-xl text-primary">Still have questions?</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Our team is happy to walk you through anything that isn&apos;t covered here.
          </p>
          <a href={whatsappLink('Hi, I have a question about your services.')} target="_blank" rel="noreferrer" className="mt-2">
            <Button className="rounded-full">
              <MessageCircle data-icon="inline-start" /> Ask on WhatsApp
            </Button>
          </a>
        </div>
      )}
    </section>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-primary">
      {label}
      {children}
    </label>
  )
}

const inputClass =
  'h-12 rounded-xl border border-border bg-background px-4 font-normal text-foreground outline-none ring-secondary/40 transition placeholder:text-muted-foreground/70 focus:border-secondary focus:ring-2'

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (submitted) {
    return (
      <div className="animate-fade-in-up rounded-[2rem] bg-secondary/10 p-8 text-center sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-primary">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Thank you. Your appointment request has been received. Our team will contact you to confirm your appointment.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-primary underline underline-offset-4">
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        if (submitting) return
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          setSubmitted(true)
        }, 700)
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name">
          <input required name="name" className={inputClass} placeholder="Your name" />
        </FormField>
        <FormField label="Phone number">
          <input required name="phone" className={inputClass} placeholder="Your phone number" />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email address">
          <input type="email" name="email" className={inputClass} placeholder="you@example.com" />
        </FormField>
        <FormField label="Preferred date">
          <input type="date" name="date" className={inputClass} />
        </FormField>
      </div>
      <FormField label="What can we help with?">
        <select name="service" className={inputClass}>
          <option value="">Select a service</option>
          {SERVICES.flatMap((service) => service.items).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Message">
        <textarea
          name="message"
          rows={4}
          className="resize-none rounded-xl border border-border bg-background px-4 py-3 font-normal text-foreground outline-none ring-secondary/40 transition placeholder:text-muted-foreground/70 focus:border-secondary focus:ring-2"
          placeholder="Tell us a little about your dental concern"
        />
      </FormField>
      <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full sm:w-fit">
        {submitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            Request appointment <CircleArrowRight data-icon="inline-end" />
          </>
        )}
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        This is a request, not an automatic confirmation. Our team will contact you to confirm availability.
      </p>
    </form>
  )
}

export function AppointmentSection() {
  return (
    <section id="appointment" className="bg-[linear-gradient(135deg,#edf7f7_0%,#f7f7ff_100%)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Start your journey"
            title="Ready for a healthier, happier smile?"
            body="Tell us what you need and our friendly team will be in touch to help you find the right next step."
          />
          <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-secondary" /> Flexible appointment requests
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="size-5 text-secondary" /> Clear communication before your visit
            </div>
            <div className="flex items-center gap-3">
              <Heart className="size-5 text-secondary" /> Care shaped around your comfort
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="rounded-[2rem] border border-border bg-card p-6 shadow-xl sm:p-10">
          <AppointmentForm />
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCTA() {
  const whatsappHref = whatsappLink('Hello Solace Dentalcare, I would like to book an appointment.')
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="absolute -right-10 -top-10 size-48 animate-pulse rounded-full border border-secondary/20" />
        <div className="absolute -bottom-20 -left-10 size-56 rounded-full border border-primary-foreground/10" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Your smile matters</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Professional, affordable and gentle dental care for you and your family.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact#appointment">
              <Button className="group rounded-full bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90">
                Book an Appointment{' '}
                <CircleArrowRight data-icon="inline-end" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <a href={whatsappHref} target={whatsappHref === '#' ? undefined : '_blank'} rel="noreferrer">
              <Button
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <MessageCircle data-icon="inline-start" /> Talk to Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const socials = [
    { href: CLINIC_CONFIG.social.tiktok, icon: Globe, label: 'TikTok' },
    { href: CLINIC_CONFIG.social.instagram, icon: Globe, label: 'Instagram' },
    { href: CLINIC_CONFIG.social.linkedin, icon: Globe, label: 'LinkedIn' },
  ].filter((social) => social.href)

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              {CLINIC_CONFIG.tagline}. Professional, affordable and gentle dental care for the whole family in Kampala.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, icon: SocialIcon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
                >
                  <SocialIcon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Explore</h3>
            <div className="mt-4 grid gap-3">
              {NAVIGATION.slice(0, 4).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Services</h3>
            <div className="mt-4 grid gap-3">
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services#${service.id}`} className="text-sm text-muted-foreground hover:text-primary">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <MapPin className="size-4 shrink-0 text-secondary" />
                {CLINIC_CONFIG.location.address}
              </p>
              <p className="flex gap-2">
                <Phone className="size-4 shrink-0 text-secondary" />
                {CLINIC_CONFIG.contact.phone}
              </p>
              <p className="flex gap-2">
                <Mail className="size-4 shrink-0 text-secondary" />
                {CLINIC_CONFIG.contact.email}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Solace Dentalcare. All rights reserved.</p>
          <p>Built around better patient experiences.</p>
        </div>
      </div>
    </footer>
  )
}

export function FloatingWhatsApp() {
  const href = whatsappLink('Hello Solace Dentalcare, I would like to inquire about your dental services.')
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel="noreferrer"
      aria-label="Contact Solace Dentalcare on WhatsApp"
      className="fixed bottom-5 right-5 z-30 hidden size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-xl transition-transform hover:scale-105 lg:flex"
    >
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/50" />
      <MessageCircle className="relative size-6" />
    </a>
  )
}

/** Small "scroll to top" button that fades in once the page has scrolled a bit. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-5 z-30 flex size-11 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-secondary hover:text-secondary lg:bottom-5 lg:right-24 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ChevronDown className="size-5 rotate-180" />
    </button>
  )
}

/** Mobile-only quick-action bar (Call / WhatsApp / Book) that appears once you start scrolling. */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const phoneHref = phoneHrefFor(CLINIC_CONFIG.contact.phone)
  const whatsappHref = whatsappLink('Hello Solace Dentalcare, I would like to book an appointment.')

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur-lg transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href={phoneHref}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-bold text-primary transition-colors hover:border-secondary hover:text-secondary"
      >
        <Phone className="size-4" /> Call
      </a>
      <a
        href={whatsappHref}
        target={whatsappHref === '#' ? undefined : '_blank'}
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
      <Link
        href="/contact#appointment"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <CalendarDays className="size-4" /> Book
      </Link>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <HeroSection />
        <QuickActions />
        <AboutSection />
        <ServicesSection />
        <PopularServices />
        <TrustSection />
        <TimelineSection />
        <ValuesSection />
        <MissionSection />
        <TeamSection />
        <FAQSection compact />
        <AppointmentSection />
        <FinalCTA />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <BackToTop />
      <StickyMobileCTA />
    </>
  )
}

export function InnerPage({ type }: { type: 'about' | 'services' | 'team' | 'faqs' | 'contact' }) {
  const content = {
    about: { eyebrow: 'About Solace Dentalcare', title: 'Care that puts people first.', body: CLINIC_CONFIG.description },
    services: {
      eyebrow: 'Our services',
      title: 'Comprehensive care for every smile.',
      body: 'Explore preventive, restorative and cosmetic dental services for children and adults.',
    },
    team: {
      eyebrow: 'Our dental team',
      title: 'Meet the people behind your care.',
      body: 'Our team information will be updated as staff profiles become available.',
    },
    faqs: {
      eyebrow: 'FAQs',
      title: 'Questions, answered with care.',
      body: 'Find helpful information about common dental concerns and visiting our clinic.',
    },
    contact: {
      eyebrow: 'Contact Solace Dentalcare',
      title: 'Have a question or need dental care?',
      body: "We're here to help. Reach out to our team and we'll help you find the right next step.",
    },
  }[type]
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8f8ff_0%,#eef7f7_100%)]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <SectionHeading eyebrow={content.eyebrow} title={content.title} body={content.body} />
          </div>
          <SmileDivider />
        </section>
        {type === 'about' && (
          <>
            <AboutSection />
            <ValuesSection />
            <MissionSection />
          </>
        )}
        {type === 'services' && (
          <>
            <ServicesSection />
            <PopularServices />
          </>
        )}
        {type === 'team' && <TeamSection />}
        {type === 'faqs' && <FAQSection />}
        {type === 'contact' && <AppointmentSection />}
      </main>
      <FinalCTA />
      <SiteFooter />
      <FloatingWhatsApp />
      <BackToTop />
      <StickyMobileCTA />
    </>
  )
}

export function ContactDetails() {
  return (
    <div className="grid gap-4 text-sm text-muted-foreground">
      <p className="flex gap-3">
        <MapPin className="size-5 shrink-0 text-secondary" />
        {CLINIC_CONFIG.location.address}
      </p>
      <p className="flex gap-3">
        <Phone className="size-5 shrink-0 text-secondary" />
        {CLINIC_CONFIG.contact.phone}
      </p>
      <p className="flex gap-3">
        <Mail className="size-5 shrink-0 text-secondary" />
        {CLINIC_CONFIG.contact.email}
      </p>
    </div>
  )
}

export function ContactPage() {
  return <InnerPage type="contact" />
}

export function ServicesPage() {
  return <InnerPage type="services" />
}
export function AboutPage() {
  return <InnerPage type="about" />
}
export function TeamPage() {
  return <InnerPage type="team" />
}
export function FAQsPage() {
  return <InnerPage type="faqs" />
}

export function EmptyTestimonials() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-10 text-center">
      <SmileMark className="mx-auto size-8 text-secondary/50" />
      <p className="mt-4 font-serif text-xl text-primary">Patient stories coming soon</p>
      <p className="mt-2 text-sm text-muted-foreground">Real testimonials will be added here once they are available.</p>
    </div>
  )
}

export { SERVICES, CLINIC_CONFIG }