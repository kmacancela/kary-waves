import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className={`transition-colors duration-300 ${
      isDark ? 'bg-[--color-espresso-light]' : 'bg-[--color-cream-dark]'
    }`}>
      {/* Header */}
      <div className="section relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className={`reveal ${isVisible ? 'visible' : ''} max-w-3xl`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="eyebrow">Let's Work Together</span>
            </div>
            <h2 className={`display-lg mb-4 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
              Ready to <em className="italic text-[--color-terracotta]">create?</em>
            </h2>
            <p className={`text-lg md:text-xl max-w-xl ${isDark ? 'text-[--color-cream]/85' : 'text-[--color-stone]'}`}>
              Whether you're launching your first collection or scaling production,
              our family team is here to help bring your vision to life.
            </p>
          </div>
        </div>
        {/* Decorative wavy line divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-12 md:h-16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M0,30
                  C60,30 80,30 120,30
                  C160,30 180,30 220,30
                  C260,30 280,10 300,10
                  C320,10 325,30 310,45
                  C295,60 280,45 290,30
                  C300,15 320,30 360,30
                  C440,30 520,30 580,30
                  C620,30 680,50 700,50
                  C720,50 730,30 720,15
                  C710,0 690,15 700,30
                  C710,45 740,30 780,30
                  C860,30 940,30 1020,30
                  C1060,30 1100,10 1120,10
                  C1140,10 1150,30 1140,45
                  C1130,60 1110,45 1115,30
                  C1120,15 1145,30 1180,30
                  C1260,30 1340,30 1440,30`}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={isDark ? 'text-[--color-cream]/20' : 'text-[--color-espresso]/15'}
            />
          </svg>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="section-lg">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info + Map */}
            <div>
              {/* Contact Info */}
              <div className={`reveal ${isVisible ? 'visible' : ''} grid sm:grid-cols-2 gap-10 mb-12`}>
                <div>
                  <div className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-3 font-semibold">Visit Us</div>
                  <p className={`mb-3 text-lg ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                    265 W 37th St, Suite 650
                    <br />
                    New York, NY 10018
                  </p>
                  <a
                    href="https://maps.app.goo.gl/xjYkXNeMAz9V9d339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-base hover:opacity-70 transition-opacity font-medium ${isDark ? 'text-[--color-cream]/80' : 'text-[--color-stone]'}`}
                  >
                    Get Directions →
                  </a>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-3 font-semibold">Contact</div>
                  <p className="mb-2">
                    <a href="tel:+16466751500" className={`text-lg hover:opacity-70 transition-opacity ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                      (646) 675-1500
                    </a>
                  </p>
                  <p>
                    <a href="mailto:info@karywaves.com" className={`text-lg hover:opacity-70 transition-opacity ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                      info@karywaves.com
                    </a>
                  </p>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-3 font-semibold">Hours</div>
                  <p className={`text-base ${isDark ? 'text-[--color-cream]/85' : 'text-[--color-stone]'}`}>
                    Mon — Fri: 9am — 6pm
                    <br />
                    Sat: By appointment
                  </p>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-widest text-[--color-terracotta] mb-3 font-semibold">Follow</div>
                  <a
                    href="https://instagram.com/karywaves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 hover:opacity-70 transition-opacity ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-lg link-underline font-medium">@karywaves</span>
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className={`reveal ${isVisible ? 'visible' : ''} aspect-[4/3] w-full`}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9917883!3d40.754022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fe13e706d9b%3A0x65964c9d62d74865!2sKary%20Waves%20Sample%20Room!5e0!3m2!1sen!2sus!4v1704825600000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kary Waves Location"
                  className="transition-all duration-500"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div className={`reveal ${isVisible ? 'visible' : ''} px-8 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 rounded-2xl ${isDark ? 'bg-[#13110F]' : 'bg-[#B83D0C]'}`}>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="name" className={`block text-[11px] uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-[#FAF8F5]/70' : 'text-white/90'}`}>
                    Name <span className={isDark ? 'text-[#B83D0C]' : 'text-white'}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl text-base focus:outline-none transition-all ${isDark ? 'bg-[#1E1B19] border border-[#3D3835] text-white placeholder-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]' : 'bg-white/95 border border-white/50 text-[#1A1614] placeholder-[#8A847D]'}`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-[11px] uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-[#FAF8F5]/70' : 'text-white/90'}`}>
                    Email <span className={isDark ? 'text-[#B83D0C]' : 'text-white'}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl text-base focus:outline-none transition-all ${isDark ? 'bg-[#1E1B19] border border-[#3D3835] text-white placeholder-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]' : 'bg-white/95 border border-white/50 text-[#1A1614] placeholder-[#8A847D]'}`}
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-[11px] uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-[#FAF8F5]/70' : 'text-white/90'}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`w-full px-4 py-3.5 rounded-xl text-base focus:outline-none transition-all ${isDark ? 'bg-[#1E1B19] border border-[#3D3835] text-white placeholder-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]' : 'bg-white/95 border border-white/50 text-[#1A1614] placeholder-[#8A847D]'}`}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="service" className={`block text-[11px] uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-[#FAF8F5]/70' : 'text-white/90'}`}>
                    Service <span className={isDark ? 'text-[#B83D0C]' : 'text-white'}>*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl text-base focus:outline-none transition-all ${isDark ? 'bg-[#1E1B19] border border-[#3D3835] text-white/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]' : 'bg-white/95 border border-white/50 text-[#8A847D]'}`}
                  >
                    <option value="">Select a service</option>
                    <option value="sample">Sample Making</option>
                    <option value="pattern">Pattern Development</option>
                    <option value="small-batch">Small Batch Production</option>
                    <option value="full-production">Full-Scale Production</option>
                    <option value="installations">Hardware Installations</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={`block text-[11px] uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-[#FAF8F5]/70' : 'text-white/90'}`}>
                    Message <span className={isDark ? 'text-[#B83D0C]' : 'text-white'}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`w-full px-4 py-3.5 rounded-xl text-base focus:outline-none transition-all resize-none ${isDark ? 'bg-[#1E1B19] border border-[#3D3835] text-white placeholder-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)]' : 'bg-white/95 border border-white/50 text-[#1A1614] placeholder-[#8A847D]'}`}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`px-6 py-3 text-sm font-medium tracking-wide rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-[#B83D0C] text-white hover:bg-[#D94F1A]' : 'bg-[#1A1614] text-white hover:bg-[#2D2926]'}`}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {status === 'success' && (
                  <p className="mt-4 text-green-500 text-sm">
                    Thank you! Your message has been sent.
                  </p>
                )}

                {status === 'error' && (
                  <p className="mt-4 text-red-500 text-sm">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
              </div>

              {/* Email note */}
              <div className={`mt-10 flex items-center gap-3 ${isDark ? 'text-[#FAF8F5]/60' : 'text-[#5C5650]'}`}>
                <div className={`h-px flex-1 ${isDark ? 'bg-[#FAF8F5]/20' : 'bg-[#1A1614]/20'}`} />
                <span className="text-sm">or email us directly at</span>
                <div className={`h-px flex-1 ${isDark ? 'bg-[#FAF8F5]/20' : 'bg-[#1A1614]/20'}`} />
              </div>
              <a
                href="mailto:info@karywaves.com"
                className={`mt-3 block text-center text-lg font-medium tracking-wide hover:opacity-80 transition-opacity ${isDark ? 'text-[#B83D0C]' : 'text-[#B83D0C]'}`}
              >
                info@karywaves.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
