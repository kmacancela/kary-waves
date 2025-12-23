import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const services = [
  {
    title: 'Consultation',
    description: 'One-on-one guidance to bring your vision to life. We sit down with you to understand your brand, refine your concept, select the right materials, and map out a realistic production timeline. Whether you\'re launching your first collection or scaling an established line, we\'ll help you navigate every decision.',
  },
  {
    title: 'Pattern Development',
    description: 'Expert pattern making for the perfect fit. Our skilled pattern makers translate your designs into precise, production-ready patterns that scale flawlessly across sizes. We account for fabric behavior, construction methods, and fit adjustments to ensure consistency from sample to final garment.',
  },
  {
    title: 'Sample Making',
    description: 'Transform sketches into tangible prototypes. Our sample room brings your designs to life with meticulous attention to detail. We work through multiple iterations if needed, refining fit, construction, and finishing until your sample is exactly right and ready for production approval.',
  },
  {
    title: 'Production',
    description: 'From small batch to full scale, we handle it all. Low minimums make us ideal for emerging labels, while our capacity supports larger runs for established brands. Every piece receives the same precision, quality control, and transparent communication—regardless of volume.',
  },
  {
    title: 'Alterations',
    description: 'Precision alterations to perfect the fit. From minor adjustments like hemming and taking in seams to complete garment reworks, our experienced tailors handle it all. We work with individuals, designers, and brands who need expert alterations done right.',
  },
  {
    title: 'Hardware Installation',
    description: 'Professional installation of eyelets, rivets, grommets, and snaps. We use industrial-grade equipment to ensure secure, clean, and consistent placement on any garment or accessory. Bring your pieces to us or include hardware installation as part of your production run.',
  },
]

// Card styles based on section background
const cardStyles = {
  // When section has light (cream) background - use dark cards for contrast
  forLightBg: {
    card: { backgroundColor: '#242120', borderColor: 'rgba(26, 22, 20, 0.1)' },
    title: { color: 'var(--color-cream)' },
    description: { color: 'rgba(250, 248, 245, 0.8)' },
  },
  // When section has dark (espresso) background - use light cards for contrast
  forDarkBg: {
    card: { backgroundColor: '#D5CFC6', borderColor: 'rgba(250, 248, 245, 0.1)' },
    title: { color: 'var(--color-espresso)' },
    description: { color: 'var(--color-stone)' },
  },
}

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()

  // This section inverts the global theme for visual contrast
  const hasLightBackground = isDark
  const styles = hasLightBackground ? cardStyles.forLightBg : cardStyles.forDarkBg

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible')
              }, i * 100)
            })
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
    <section
      id="services"
      ref={sectionRef}
      className={`transition-colors duration-300 ${
        hasLightBackground ? 'bg-[--color-cream]' : 'bg-[--color-espresso]'
      }`}
    >
      <div className="section-lg">
        <div className="container mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="reveal max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="line-accent" />
              <span className="eyebrow">Our Craft</span>
            </div>
            <h2 className={`display-lg mb-4 ${hasLightBackground ? 'text-[--color-espresso]' : 'text-[--color-cream]'}`}>
              From concept <em className="italic text-[--color-terracotta]">to creation.</em>
            </h2>
            <p className={`text-lg md:text-xl ${hasLightBackground ? 'text-[--color-stone]' : 'text-[--color-cream]/85'}`}>
              Comprehensive manufacturing services tailored to your brand's unique needs—backed by two generations of expertise.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card reveal px-8 py-14 rounded-2xl border transition-all duration-300 ease-out cursor-default shadow-sm hover:shadow-xl"
                style={styles.card}
              >
                <h3
                  className="text-2xl md:text-[1.75rem] font-[Instrument_Serif] mb-4"
                  style={styles.title}
                >
                  {service.title}
                </h3>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={styles.description}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services
