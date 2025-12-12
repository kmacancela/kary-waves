import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const About = () => {
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
      id="about"
      ref={sectionRef}
      className={`section-lg transition-colors duration-300 ${
        isDark ? 'bg-[--color-espresso]' : 'bg-[--color-cream]'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Family Heritage Header */}
        <div className="reveal text-center mb-16">
          {/* <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-[--color-gold]" />
            <span className="heritage-badge">Family Legacy</span>
            <div className="w-12 h-px bg-[--color-gold]" />
          </div> */}
          <h2 className={`display-lg mb-4 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
            Three generations. <em className="italic text-[--color-terracotta]">One vision.</em>
          </h2>
          {/* <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-espresso]/90'}`}>
            Where a father's decades of mastery meets a daughter's fresh creative vision.
          </p> */}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-stretch">
          {/* Video with family story overlay */}
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-lg h-full min-h-[400px]">
              <video
                src="/videos/about.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.15]"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="eyebrow">Our Story</span>
            </div>

            <div className="reveal mb-6">
              <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                <strong className="text-[--color-terracotta]">Kary Waves</strong> is a New York City garment manufacturing studio where father and daughter work together in transforming your designs into launch-ready collections.
              </p>
            </div>

            <div className="reveal space-y-5 mb-8">
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-stone]'}`}>
                From your initial concept to the finished piece, we handle every step of production with precision and care. Our services span <span className="font-semibold">pattern development</span>, <span className="font-semibold">sample making</span>, and <span className="font-semibold">full-scale manufacturing</span>—plus specialized hardware installations including snaps, rivets, eyelets, and more.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-stone]'}`}>
                With over <span className="text-[--color-terracotta] font-semibold">20 years of expertise</span>, we've partnered with hundreds of brands—from emerging designers launching their first collection to established labels scaling their production. Each collaboration is unique, and we adapt to your specific vision and requirements.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-stone]'}`}>
                Our promise is simple: a <span className="font-semibold">personal, hassle-free experience</span> that lets you focus on your creative vision while we bring it to life with craftsmanship you can trust.
              </p>
            </div>

            {/* Stats */}
            <div className={`reveal grid grid-cols-3 gap-6 pt-8 border-t ${
              isDark ? 'border-[--color-cream]/20' : 'border-[--color-espresso]/10'
            }`}>
              <div>
                <div className={`text-3xl md:text-4xl font-[Instrument_Serif] ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>100K+</div>
                <div className={`text-sm uppercase tracking-wider mt-1 font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Garments Made</div>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-[Instrument_Serif] ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>37th</div>
                <div className={`text-sm uppercase tracking-wider mt-1 font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Street, NYC</div>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-[Instrument_Serif] ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>24h</div>
                <div className={`text-sm uppercase tracking-wider mt-1 font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
