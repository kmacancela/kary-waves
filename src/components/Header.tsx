import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false) // For blur effect
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      // Blur appears as soon as user scrolls (scrollY > 0)
      setHasScrolled(window.scrollY > 0)

      // Get the hero section element and check if we've scrolled past it
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        // Change header color when scrolled past the hero section (minus header height ~80px)
        setIsScrolled(window.scrollY > heroBottom - 80)
      } else {
        // Fallback to 90vh if hero not found
        setIsScrolled(window.scrollY > window.innerHeight * 0.9)
      }
    }
    // Run once on mount to set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      return isDark ? 'bg-[--color-cream]' : 'bg-[--color-espresso]'
    }
    return 'bg-white'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBg()} ${
        hasScrolled ? 'backdrop-blur-sm' : ''
      } ${isScrolled ? 'py-4' : 'py-5'}`}
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
            className={`p-2 transition-colors ${getTextColor()}`}
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
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
              />
              <span
                className={`block h-px transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-px transition-all duration-300 ${getMenuLineColor()} ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          isDark ? 'bg-[--color-espresso] border-[--color-stone]/20' : 'bg-[--color-cream] border-[--color-cream-dark]'
        } border-t ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xl font-[Instrument_Serif] ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
            >
              {link.label}
            </a>
          ))}
          <div className={`pt-4 border-t ${isDark ? 'border-[--color-stone]/20' : 'border-[--color-cream-dark]'}`}>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-primary"
            >
              Work With Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
