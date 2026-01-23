import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { isDark } = useTheme()

  return (
    <footer className={`transition-colors duration-300 ${
      isDark
        ? 'bg-[#13110F] text-[--color-cream]'
        : 'bg-[#E8E4DE] text-[--color-espresso]'
    }`}>
      <div className="container mx-auto px-6 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="inline-block mb-5">
              <span className={`text-3xl font-[Instrument_Serif] logo-stitch ${
                isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
              }`}>
                Kary Waves
              </span>
            </a>
            <p className={`text-base max-w-sm leading-relaxed mb-6 ${
              isDark ? 'text-[--color-cream]/80' : 'text-[--color-espresso]/70'
            }`}>
              A <strong className={isDark ? 'text-[--color-gold-light]' : 'text-[--color-terracotta]'}>father & daughter</strong> garment manufacturing studio
              in NYC's Garment District.
            </p>
            <a
              href="https://instagram.com/karywaves"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 hover:opacity-70 transition-all ${isDark ? 'text-[--color-cream]/60' : 'text-[--color-espresso]/50'}`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80" />
                    <stop offset="25%" stopColor="#FCAF45" />
                    <stop offset="50%" stopColor="#F77737" />
                    <stop offset="75%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-base link-underline">@karywaves</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            {/* <h4 className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-5 font-semibold">Navigate</h4> */}
            <ul className="space-y-3">
              {[
                { href: '#about', label: 'Our Story' },
                { href: '#services', label: 'Services' },
                // { href: '#installations', label: 'Installations' },
                { href: '#lookbook', label: 'Lookbook' },
                { href: '#faq', label: 'FAQ' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-base transition-colors ${
                      isDark
                        ? 'text-[--color-cream]/80 hover:text-[--color-cream]'
                        : 'text-[--color-espresso]/70 hover:text-[--color-espresso]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            {/* <h4 className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-5 font-semibold">Contact</h4> */}
            <ul className={`space-y-3 text-base ${isDark ? 'text-[--color-cream]/80' : 'text-[--color-espresso]/70'}`}>
              <li>
                <a
                  href="https://maps.app.goo.gl/xjYkXNeMAz9V9d339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${isDark ? 'hover:text-[--color-cream]' : 'hover:text-[--color-espresso]'}`}
                >
                  265 W 37th St, #650
                  <br />
                  New York, NY 10018
                </a>
              </li>
              <li>
                <a href="tel:+16466751500" className={`transition-colors ${isDark ? 'hover:text-[--color-cream]' : 'hover:text-[--color-espresso]'}`}>
                  (646) 675-1500
                </a>
              </li>
              <li>
                <a href="mailto:info@karywaves.com" className={`transition-colors ${isDark ? 'hover:text-[--color-cream]' : 'hover:text-[--color-espresso]'}`}>
                  info@karywaves.com
                </a>
              </li>
            </ul>
            {/* Instagram - mobile only */}
            <a
              href="https://instagram.com/karywaves"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex sm:hidden items-center gap-2 mt-4 hover:opacity-70 transition-all ${isDark ? 'text-[--color-cream]/60' : 'text-[--color-espresso]/50'}`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="instagram-gradient-mobile" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80" />
                    <stop offset="25%" stopColor="#FCAF45" />
                    <stop offset="50%" stopColor="#F77737" />
                    <stop offset="75%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient-mobile)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-base link-underline">@karywaves</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`border-t ${isDark ? 'border-[--color-cream]/10' : 'border-[--color-espresso]/10'}`}>
        <div className="container mx-auto px-6 md:px-8 py-6">
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-sm ${
            isDark ? 'text-[--color-cream]/70' : 'text-[--color-espresso]/60'
          }`}>
            <p>&copy; {currentYear} Kary Waves LLC • All rights reserved</p>
            <p className="flex items-center gap-3">
              <span className="text-[--color-gold]">★</span>
              <span>The Garment District's Best Kept Secret</span>
              <span className="text-[--color-gold]">★</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
