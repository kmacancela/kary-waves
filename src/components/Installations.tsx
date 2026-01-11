import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const Installations = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible')
              }, i * 80)
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="installations"
      ref={sectionRef}
      className={`transition-colors duration-300 ${
        isDark ? 'bg-[--color-espresso-light]' : 'bg-[--color-cream-dark]'
      }`}
    >
      {/* Hero Banner */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=80"
          alt="Sewing machine and garment details"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[--color-espresso]/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 animate-fade-up">
              <span className="text-[--color-gold-light] text-sm uppercase tracking-widest font-medium">Professional Service</span>
            </div>
            <h2 className="display-md text-[--color-cream] mb-4 animate-fade-up delay-100">
              Hardware <em className="italic text-[--color-terracotta-light]">Installations</em>
            </h2>
            <p className="text-[--color-cream]/90 text-lg md:text-xl max-w-lg mx-auto animate-fade-up delay-200">
              Expert snaps, eyelets & rivets for the perfect finishing touch
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-lg">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="reveal flex items-center gap-3 mb-6">
                <div className="line-accent" />
                <span className="eyebrow">Installation Services</span>
              </div>

              <h3 className={`reveal text-2xl md:text-3xl font-[Instrument_Serif] mb-6 ${
                isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
              }`}>
                A professional touch for your garments
              </h3>

              <div className="reveal space-y-5 mb-8">
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-stone]'}`}>
                  Bring your garments to our store where we offer installation services
                  for snaps, eyelets, and rivets. Our goal is to provide a quick and
                  seamless process with professional results.
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-stone]'}`}>
                  Whether you need a few pieces finished or bulk hardware installation,
                  we have the equipment and expertise to deliver quality work—<strong className="text-[--color-terracotta]">a father's precision with a daughter's attention to modern trends</strong>.
                </p>
              </div>

              {/* Services List */}
              <div className="reveal flex flex-wrap items-center gap-3 mb-8">
                {['Snaps', 'Eyelets', 'Rivets', 'Grommets'].map((item, index) => (
                  <div key={item} className="flex items-center">
                    <div className={`px-5 py-3 border-2 ${
                      isDark ? 'border-[--color-cream]/40 text-[--color-cream]' : 'border-[--color-espresso]/30 text-[--color-espresso]'
                    }`}>
                      <span className="text-base font-medium">{item}</span>
                    </div>
                    {index < 3 && (
                      <span className="text-[--color-terracotta] mx-3 text-lg">✦</span>
                    )}
                  </div>
                ))}
              </div>

              <a href="#contact" className="reveal btn btn-primary">
                <span>Schedule Service</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Image Grid */}
            <div className="reveal grid grid-cols-2 gap-4">
              <div className="img-hover aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
                  alt="Sewing machine close-up"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-hover aspect-square mt-8">
                <img
                  src="https://images.unsplash.com/photo-1558171813-01ed289cd449?auto=format&fit=crop&w=600&q=80"
                  alt="Jacket with metal snap buttons"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-hover aspect-square -mt-8">
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80"
                  alt="Metal hardware details"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-hover aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80"
                  alt="Finished garment with hardware"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Installations
