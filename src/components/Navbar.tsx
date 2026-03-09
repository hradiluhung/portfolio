import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import ButtonToggleTheme from './ButtonToggleTheme'

const items = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'About' },
  { url: '/works', label: 'Works' },
  { url: '/blogs', label: 'Blogs' },
  { url: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMenu = () => {
    gsap.to(mobileMenuRef.current, {
      opacity: 0,
      y: -8,
      scale: 0.97,
      duration: 0.2,
      ease: 'power2.in',
      pointerEvents: 'none',
      onComplete: () => setMobileOpen(false),
    })
  }

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
    },
    { scope: navRef },
  )

  useGSAP(
    () => {
      const activeEl = navRef.current?.querySelector('.nav-active')
      if (!activeEl) return
      gsap.from(activeEl, {
        scale: 0.85,
        duration: 0.3,
        ease: 'back.out(2)',
      })
    },
    { scope: navRef, dependencies: [location.pathname] },
  )

  useGSAP(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { opacity: 0, y: -8, scale: 0.97, pointerEvents: 'none' })
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: 'power2.out' })
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power2.out' })
  }

  const openMenu = () => {
    setMobileOpen(true)
    gsap.to(mobileMenuRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: 'power3.out',
      pointerEvents: 'auto',
    })
    gsap.fromTo(
      mobileMenuRef.current?.querySelectorAll('.mobile-nav-item') ?? [],
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out', delay: 0.05 },
    )
  }

  const toggleMenu = () => (mobileOpen ? closeMenu() : openMenu())

  return (
    <div
      ref={navRef}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-999 flex flex-col items-center gap-2"
    >
      {/* Desktop pill */}
      <div className="hidden sm:flex bg-white/10 gap-6 w-fit items-center rounded-full px-6 py-2 text-sm border border-sidebar-border backdrop-blur-sm shadow-lg">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            end={item.url === '/'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative py-1 text-sm"
          >
            {({ isActive }) => (
              <span className={`relative inline-block ${isActive ? 'nav-active' : ''}`}>
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-foreground rounded-full" />
                )}
              </span>
            )}
          </NavLink>
        ))}
        <div className="h-4 w-px bg-gray-400/50" />
        <ButtonToggleTheme />
      </div>

      {/* Mobile pill */}
      <div className="flex sm:hidden items-center gap-3 bg-white/10 rounded-full px-5 py-2 border border-sidebar-border backdrop-blur-sm shadow-lg">
        <ButtonToggleTheme />
        <div className="h-4 w-px bg-gray-400/50" />
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="flex items-center justify-center w-6 h-6 cursor-pointer"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={mobileMenuRef}
        className="flex sm:hidden flex-col bg-background/90 backdrop-blur-sm border border-sidebar-border rounded-2xl shadow-lg overflow-hidden w-44"
      >
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            end={item.url === '/'}
            onClick={closeMenu}
            className="mobile-nav-item"
          >
            {({ isActive }) => (
              <span
                className={`flex items-center justify-between px-5 py-3 text-sm transition-colors border-b border-border/50 last:border-b-0 ${
                  isActive
                    ? 'text-foreground font-medium bg-muted/50'
                    : 'text-secondary-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {item.label}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
