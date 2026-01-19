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
      className={`section-lg transition-colors duration-300 scroll-mt-20 md:scroll-mt-24 ${
        isDark ? 'bg-[--color-espresso]' : 'bg-[--color-cream]'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Family Heritage Header */}
        <div className="reveal text-center mb-8 md:mb-16">
          {/* <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-[--color-gold]" />
            <span className="heritage-badge">Family Legacy</span>
            <div className="w-12 h-px bg-[--color-gold]" />
          </div> */}
          <h2 className={`display-lg mb-4 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
            Three generations.<br className="md:hidden" /> <em className="italic text-[--color-terracotta]">One vision.</em>
          </h2>
          {/* <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-[--color-cream]/90' : 'text-[--color-espresso]/90'}`}>
            Where a father's decades of mastery meets a daughter's fresh creative vision.
          </p> */}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-stretch">
          {/* Video with family story overlay */}
          <div className="reveal">
            <div className="relative overflow-hidden rounded-none md:rounded-lg aspect-[4/3] md:aspect-auto md:min-h-[350px] lg:min-h-[400px] -mx-12 w-[calc(100%+6rem)] md:mx-0 md:w-full">
              <video
                src="/videos/about.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-110 sm:scale-110 lg:scale-[1.15]"
              />
            </div>
            {/* Values - Tablet/Desktop only */}
            <div className="hidden md:grid reveal grid-cols-3 gap-3 pt-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/hands-heart.png"
                  alt="Ethically-Made"
                  className={`w-14 h-14 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Ethically<br/>Made</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/head-leaf.png"
                  alt="Sustainability Conscious"
                  className={`w-14 h-14 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Sustainability<br/>Conscious</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/needle-thread.png"
                  alt="Handmade"
                  className={`w-14 h-14 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Handmade<br/>with Care</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="reveal mb-6">
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                Kary Waves is a New York City garment manufacturing studio where father and daughter work together in transforming your designs into launch-ready collections.
              </p>
            </div>

            <div className="reveal space-y-5 mb-8">
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                From your initial concept to the finished piece, we handle every step of production with precision and care. Our services include <span className="font-semibold">pattern development</span>, <span 
                className="font-semibold">sample making</span>, <span className="font-semibold">garment manufacturing</span>, and <span className="font-semibold">custom alterations</span>—plus specialized hardware installations including snaps, rivets, eyelets, and more.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                With <span className="text-[--color-terracotta] font-semibold">three generations of expertise</span>, we've partnered with hundreds of brands—from emerging designers launching their first collection to established labels scaling their production. Each collaboration is unique, and we adapt to your specific vision and requirements.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
                Our promise is simple: a <span className="font-semibold">personal, hassle-free experience</span> that lets you focus on your creative vision while we bring it to life with generational craftsmanship you can trust.
              </p>
            </div>

            {/* Values - Mobile only */}
            <div className="reveal grid grid-cols-3 gap-3 pt-2 md:hidden">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/hands-heart.png"
                  alt="Ethically-Made"
                  className={`w-14 h-14 md:w-16 md:h-16 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Ethically<br/>Made</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/head-leaf.png"
                  alt="Sustainability Conscious"
                  className={`w-14 h-14 md:w-16 md:h-16 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Sustainability<br/>Conscious</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/needle-thread.png"
                  alt="Handmade"
                  className={`w-14 h-14 md:w-16 md:h-16 mb-3 ${isDark ? 'brightness-0 invert opacity-70' : 'brightness-0 opacity-60'}`}
                />
                <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'}`}>Handmade<br/>with Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
