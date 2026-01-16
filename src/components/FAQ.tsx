import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const steps = [
  {
    step: '01',
    title: 'Connect',
    description: 'Share your vision with us. We listen carefully and understand your brand, timeline, and goals.',
  },
  {
    step: '02',
    title: 'Develop',
    description: 'We create patterns and samples together. You review, refine, and approve each detail.',
  },
  {
    step: '03',
    title: 'Produce',
    description: 'Manufacturing begins with regular updates and quality control at every stage.',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Final inspection, careful packaging, and delivery. Ready for your customers.',
  },
]

const faqs = [
  {
    question: 'What is the overview of the apparel production?',
    answer: 'The initial meeting will be used to discuss the requirements of the project and plan samples. After samples are made and approved, we will need to gather the materials needed.',
  },
  {
    question: 'What is your Minimum Order Quantity (MOQ)?',
    answer: 'No minimum nor maximum! We can discuss on the timeline when we have our initial meeting.',
  },
  {
    question: 'What is your return policy?',
    answer: 'There is no returns/refunds on any service.',
  },
  {
    question: 'What is the cost of a production?',
    answer: 'Production costs vary based on fabric type, quantity, and garment construction. This price is usually determined after we create a sample of your garment.',
  },
]

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [arrowsRevealed, setArrowsRevealed] = useState([false, false, false])

  useEffect(() => {
    if (hasRevealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true)

            // Reveal arrows last, left to right
            setTimeout(() => setArrowsRevealed([true, false, false]), 600)
            setTimeout(() => setArrowsRevealed([true, true, false]), 750)
            setTimeout(() => setArrowsRevealed([true, true, true]), 900)
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasRevealed])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
        <div className={`reveal max-w-2xl mb-12 ${hasRevealed ? 'visible' : ''}`}>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Background arrows - positioned between each step, visible only on lg screens */}
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src="/images/arrow-right.png"
              alt=""
              className={`reveal-arrow hidden lg:block absolute pointer-events-none ${arrowsRevealed[i] ? 'visible' : ''}`}
              style={{
                width: '150px',
                left: `${22 + i * 25}%`,
                top: '45%',
                transform: 'translate(-50%, -50%)',
                filter: isDark ? 'invert(1) brightness(1.5)' : 'none',
                zIndex: 0,
              }}
            />
          ))}

          {steps.map((item) => (
            <div key={item.step} className={`reveal relative ${hasRevealed ? 'visible' : ''}`} style={{ zIndex: 1 }}>
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

        {/* FAQ Accordion */}
        <div className={`reveal mt-16 pt-12 border-t ${hasRevealed ? 'visible' : ''} ${
          isDark ? 'border-[--color-cream]/15' : 'border-[--color-espresso]/10'
        }`}>
          <h3 className={`text-2xl md:text-3xl font-[Instrument_Serif] mb-8 ${
            isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
          }`}>
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden transition-colors duration-200"
                  style={{
                    backgroundColor: isOpen
                      ? isDark ? 'rgba(250, 248, 245, 0.08)' : 'rgba(26, 22, 20, 0.08)'
                      : undefined
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = isDark
                        ? 'rgba(250, 248, 245, 0.1)'
                        : 'rgba(26, 22, 20, 0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-200 ${
                      isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                    }`}
                  >
                    <span className="text-lg font-medium pr-4">{faq.question}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[--color-terracotta] text-white'
                        : isDark
                          ? 'bg-[--color-cream]/10'
                          : 'bg-[--color-espresso]/10'
                    }`}>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className={`px-5 pb-5 text-base leading-relaxed ${
                        isDark ? 'text-[--color-cream]/75' : 'text-[--color-stone]'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={`reveal text-center mt-14 pt-10 border-t-2 ${hasRevealed ? 'visible' : ''} ${
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
