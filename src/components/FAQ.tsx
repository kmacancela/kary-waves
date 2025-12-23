import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const steps = [
  {
    step: '01',
    title: 'Connect',
    description: 'Share your vision with us. We listen carefully and understand your brand, timeline, and goals.',
    icon: '💬',
  },
  {
    step: '02',
    title: 'Develop',
    description: 'We create patterns and samples together. You review, refine, and approve each detail.',
    icon: '✏️',
  },
  {
    step: '03',
    title: 'Produce',
    description: 'Manufacturing begins with regular updates and quality control at every stage.',
    icon: '⚡',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Final inspection, careful packaging, and delivery. Ready for your customers.',
    icon: '📦',
  },
]

const FAQ = () => {
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
      id="faq"
      ref={sectionRef}
      className={`section-lg transition-colors duration-300 ${
        isDark ? 'bg-[--color-espresso]' : 'bg-[--color-cream]'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="reveal max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="line-accent" />
            <span className="eyebrow">How We Work</span>
          </div>
          <h2 className={`display-lg mb-4 ${isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'}`}>
            Simple. <em className="italic text-[--color-terracotta]">Transparent.</em>
          </h2>
          <p className={`text-lg md:text-xl ${isDark ? 'text-[--color-cream]/85' : 'text-[--color-stone]'}`}>
            Our process ensures clear communication and exceptional results at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="reveal relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={`hidden lg:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px ${
                  isDark ? 'bg-[--color-cream]/20' : 'bg-[--color-espresso]/10'
                }`} />
              )}

              {/* Step Number */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                  isDark ? 'border-[--color-cream]/40' : 'border-[--color-espresso]/30'
                }`}>
                  <span className="text-[--color-terracotta] text-base font-semibold">{item.step}</span>
                </div>
                <span className="text-2xl">{item.icon}</span>
              </div>

              <h3 className={`text-xl md:text-2xl font-[Instrument_Serif] mb-3 ${
                isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
              }`}>
                {item.title}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-[--color-cream]/80' : 'text-[--color-stone]'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`reveal text-center mt-14 pt-10 border-t-2 ${
          isDark ? 'border-[--color-cream]/15' : 'border-[--color-espresso]/10'
        }`}>
          <p className={`mb-5 text-lg md:text-xl ${isDark ? 'text-[--color-cream]/85' : 'text-[--color-stone]'}`}>
            Ready to bring your vision to life with our family team?
          </p>
          <a href="#contact" className="btn btn-primary">
            <span>Start a Project</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
