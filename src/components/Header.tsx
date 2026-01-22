import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false) // For blur effect
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggle } = useTheme()
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll handler to run at most once per frame (60fps)
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        // Blur appears as soon as user scrolls (scrollY > 0)
        setHasScrolled(window.scrollY > 0)

        // Get the hero section element and check if we've scrolled past it
        const heroSection = document.getElementById('hero')
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
          // Change header color when scrolled past the hero section (minus header height ~80px)
          setIsScrolled(window.scrollY > heroBottom - 80)
        } else {
          // Fallback to 90vh if hero not found
          setIsScrolled(window.scrollY > window.innerHeight * 0.9)
        }

        ticking.current = false
      })
    }
    // Run once on mount to set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle body class for mobile menu push effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    return () => document.body.classList.remove('mobile-menu-open')
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    // { href: '#installations', label: 'Installations' },
    { href: '#lookbook', label: 'Lookbook' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  // Determine text color based on scroll state and theme
  // When over hero (not scrolled), ALWAYS use white/cream regardless of theme
  const getTextColor = () => {
    if (isScrolled) {
      return isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
    }
    // Over hero - always white with shadow for visibility
    return 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
  }

  const getHeaderBg = () => {
    if (isScrolled) {
      return isDark ? 'bg-[--color-espresso]/95' : 'bg-[--color-cream]/95'
    }
    return 'bg-transparent'
  }

  // Mobile menu lines - always white when over hero
  const getMenuLineColor = () => {
    if (isScrolled) {
      // Use explicit hex colors for better Tailwind compatibility
      return isDark ? 'bg-[#FAF8F5]' : 'bg-[#1A1614]'
    }
    return 'bg-white'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBg()} ${
        hasScrolled ? 'backdrop-blur-sm' : ''
      } ${isScrolled ? 'py-4' : 'py-5'} ${isMobileMenuOpen ? 'max-lg:opacity-0 max-lg:pointer-events-none' : ''}`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group relative flex items-center">
          <span className={`text-2xl md:text-3xl relative z-10 logo-stitch ${
            isScrolled
              ? isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
              : 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
          }`}>
            Kary Waves
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-70 ${getTextColor()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Theme toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={`p-2 transition-colors ${getTextColor()} ${isMobileMenuOpen ? 'max-lg:hidden' : ''}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              // Sun icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className={`hidden md:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-70 ${getTextColor()}`}
          >
            <span>Work With Us</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 -mr-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - rendered via portal to body so it's not affected by #root transform */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 ${
            isMobileMenuOpen ? '' : 'pointer-events-none'
          }`}
          style={{ zIndex: 60 }}
        >
          {/* Clickable overlay to close menu */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          />
          {/* Menu panel */}
          <nav className={`absolute right-0 top-0 bottom-0 w-[85%] sm:w-[70%] px-6 sm:px-8 pt-28 flex flex-col gap-5 sm:gap-6 transition-transform duration-300 ease-out ${
            isDark ? 'bg-[#0D0B0A]' : 'bg-[#E8E4DF]'
          } ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Top right buttons */}
            <div className="absolute top-5 right-6 flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                className={`w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70 ${
                  isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-10 h-10 flex items-center justify-center border-[0.5px] transition-opacity hover:opacity-70 ${
                  isDark ? 'border-[--color-cream]/30 text-[--color-cream]' : 'border-[--color-espresso]/30 text-[--color-espresso]'
                }`}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-[Outfit] font-light tracking-wide transition-opacity hover:opacity-70 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-auto pb-8">
              {/* Contact icons */}
              <div className="flex justify-center gap-8 mb-6">
                <a
                  href="tel:+16466751500"
                  className={`p-2 transition-opacity hover:opacity-70 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
                  aria-label="Call us"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a
                  href="mailto:info@karywaves.com"
                  className={`p-2 transition-opacity hover:opacity-70 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
                  aria-label="Email us"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/karywaves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 transition-opacity hover:opacity-70 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary w-full justify-center"
              >
                Work With Us
              </a>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  )
}

export default Header
