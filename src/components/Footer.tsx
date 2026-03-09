import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'About' },
  { url: '/work', label: 'Work' },
  { url: '/blog', label: 'Blog' },
  { url: '/contact', label: 'Contact' },
]

const contacts = [
  { icon: Github, href: 'https://github.com/hradiluhung', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/hradiluhung/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/hradiluhung', label: 'Instagram' },
  { icon: Mail, href: 'mailto:hakamra107@gmail.com', label: 'Email' },
]

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta',
    hour12: false,
  }).format(new Date())

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [localTime, setLocalTime] = useState('')
  const year = new Date().getFullYear()

  useEffect(() => {
    const interval = setInterval(() => setLocalTime(format()), 1000)
    return () => clearInterval(interval)
  }, [])

  const getVisitorClock = () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Jakarta') return null
    return {
      time: new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: tz,
        hour12: false,
      }).format(new Date()),
      tz,
    }
  }

  const [visitorClock, setVisitorClock] = useState<{ time: string; tz: string } | null>(
    getVisitorClock,
  )

  useEffect(() => {
    const visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (visitorTimezone === 'Asia/Jakarta') return

    const interval = setInterval(() => {
      setVisitorClock({
        time: new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: visitorTimezone,
          hour12: false,
        }).format(new Date()),
        tz: visitorTimezone,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useGSAP(
    () => {
      gsap.from('.footer-col', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    },
    { scope: footerRef },
  )

  return (
    <div
      ref={footerRef}
      className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x bg-background"
    >
      {/* Identity + Social */}
      <div className="footer-col bg-background border-b sm:border-b lg:border-b-0 sm:border-r p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm">Hakam Royhan Adiluhung</span>
          <span className="text-xs text-secondary-foreground leading-relaxed">
            Frontend developer & visual thinker based in Indonesia.
          </span>
        </div>
        <div className="flex gap-3">
          {contacts.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-secondary-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <span className="text-xs text-secondary-foreground mt-auto">© {year} Adi</span>
      </div>

      {/* Pages */}
      <div className="footer-col bg-background border-b lg:border-b-0 lg:border-r p-8 flex flex-col gap-3">
        <span className="text-xs text-secondary-foreground uppercase tracking-widest mb-2">
          Pages
        </span>
        {pages.map((page) => (
          <Link
            key={page.url}
            to={page.url}
            className="text-sm text-secondary-foreground hover:text-foreground transition-colors hover:underline"
          >
            {page.label}
          </Link>
        ))}
      </div>

      {/* Availability */}
      <div className="footer-col bg-background border-b sm:border-b-0 sm:border-r p-8 flex flex-col gap-4">
        <span className="text-xs text-secondary-foreground uppercase tracking-widest">
          Availability
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-sm">Open for work</span>
        </div>
        <p className="text-xs text-secondary-foreground leading-relaxed">
          Currently available for freelance projects or just a good conversation.
        </p>
        <Link
          to="/contact"
          className="text-sm underline underline-offset-4 hover:text-secondary-foreground transition-colors mt-auto"
        >
          Get in touch →
        </Link>
      </div>

      {/* Local Time */}
      <div className="footer-col bg-background p-8 flex flex-col gap-4">
        <span className="text-xs text-secondary-foreground uppercase tracking-widest">
          Local Time
        </span>
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-3xl sm:text-4xl font-bold tabular-nums">{localTime}</span>
            <p className="text-xs text-secondary-foreground mt-1">Jakarta — WIB (UTC+7)</p>
          </div>
          {visitorClock && (
            <div>
              <span className="text-3xl sm:text-4xl font-bold tabular-nums text-secondary-foreground">
                {visitorClock.time}
              </span>
              <p className="text-xs text-secondary-foreground mt-1">
                Your time — {visitorClock.tz}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
