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
    question: 'How long does production typically take?',
    answer: "Timeline depends on complexity, quantity, and current workload. A small run might take days to weeks after sample approval, while larger orders require extra time. We'll give you a realistic timeline during our initial consultation.",
  },
  {
    question: 'Do I need to provide my own fabric, or can you source it?',
    answer: 'We ask clients to bring their own materials, but we can provide recommendations to trusted fabric suppliers in the Garment District and can help source what you need.',
  },
  {
    question: 'What if I only have a sketch or idea—no tech pack?',
    answer: "That's okay! Many clients come to us at the concept stage. We can help develop your design into a production-ready pattern and tech pack.",
  },
  {
    question: 'What types of garments do you specialize in?',
    answer: "We work across categories—dresses, tops, pants, outerwear, and more. Whether it's streetwear, contemporary fashion, or formal pieces, we have the expertise.",
  },
  {
    question: 'Can you replicate or recreate an existing garment?',
    answer: 'Yes, we can reverse-engineer an existing piece to create patterns and reproduce it.',
  },
  {
    question: 'Do you work with clients outside of New York?',
    answer: 'Yes, we work with brands nationwide. Samples and production can be shipped, and we communicate via video calls and email.',
  },
  {
    question: 'How many sample rounds are included?',
    answer: 'Typically we include one round of revisions in our sample pricing. Additional rounds can be arranged as needed.',
  },
  {
    question: 'What is the cost of a production?',
    answer: 'Production costs vary based on fabric type, quantity, and garment construction. This price is usually determined after we create a sample of your garment.',
  },
  {
    question: 'What is your return policy?',
    answer: 'There is no returns/refunds on any service.',
  },
]

const VISIBLE_COUNT = 4

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [arrowsRevealed, setArrowsRevealed] = useState([false, false, false])
  const [startIndex, setStartIndex] = useState(0)

  const canScrollUp = startIndex > 0
  const canScrollDown = startIndex < faqs.length - VISIBLE_COUNT

  const scrollUp = () => {
    if (canScrollUp) {
      setStartIndex(startIndex - 1)
      setOpenIndex(null)
    }
  }

  const scrollDown = () => {
    if (canScrollDown) {
      setStartIndex(startIndex + 1)
      setOpenIndex(null)
    }
  }

  useEffect(() => {
    if (hasRevealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true)

            // Reveal arrows left to right
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
          {/* Decorative arrows between steps - visible only on lg screens */}
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

        {/* FAQ Section - Two Column Layout */}
        <div className={`reveal mt-16 pt-12 ${hasRevealed ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Title */}
            <div className="lg:pr-8">
              <h3 className={`text-3xl md:text-4xl lg:text-[2.75rem] font-[Instrument_Serif] leading-tight mb-5 ${
                isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
              }`}>
                Frequently Asked<br />Questions
              </h3>
              <p className={`text-base md:text-lg leading-relaxed ${
                isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'
              }`}>
                We compiled a list of answers to address your most pressing questions regarding our services. If you have any additional inquiries, please don't hesitate to reach out to us directly.
              </p>
            </div>

            {/* Right Column - Carousel */}
            <div className="relative">
              {/* Up Arrow - only show when can scroll up */}
              {canScrollUp && (
                <button
                  onClick={scrollUp}
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full transition-all duration-200 ${
                    isDark
                      ? 'text-[--color-cream]/80 hover:text-[--color-cream] hover:bg-[#1E1B19]'
                      : 'text-[--color-stone] hover:text-[--color-espresso] hover:bg-[#F5F5F5]'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              )}

              {/* FAQ Container */}
              <div className={`space-y-3 overflow-hidden ${canScrollUp ? 'pt-8' : 'pt-0'} ${canScrollDown ? 'pb-8' : 'pb-0'}`}>
                {faqs.slice(startIndex, startIndex + VISIBLE_COUNT).map((faq, idx) => {
                  const actualIndex = startIndex + idx
                  const isOpen = openIndex === actualIndex
                  return (
                    <div
                      key={actualIndex}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isDark
                          ? `border-[#3D3835] ${isOpen ? 'bg-[#1E1B19]' : 'bg-transparent hover:bg-[#1E1B19]/50'}`
                          : `border-[#E5E5E5] ${isOpen ? 'bg-[#F8F8F8]' : 'bg-white hover:bg-[#FAFAFA]'}`
                      }`}
                      style={{
                        animation: 'fadeSlideIn 0.3s ease-out'
                      }}
                    >
                      <button
                        onClick={() => toggleFaq(actualIndex)}
                        className={`w-full flex items-center justify-between px-6 py-5 text-left ${
                          isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                        }`}
                      >
                        <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                        <span className={`flex-shrink-0 text-xl font-light transition-colors duration-200 ${
                          isDark ? 'text-[--color-cream]/60' : 'text-[--color-stone]'
                        }`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <p className={`px-6 pb-5 text-base leading-relaxed ${
                            isDark ? 'text-[--color-cream]/70' : 'text-[--color-stone]'
                          }`}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Down Arrow and Progress - only show when can scroll down */}
              {canScrollDown && (
                <div className="flex flex-col items-center mt-2">
                  <button
                    onClick={scrollDown}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isDark
                        ? 'text-[--color-cream]/80 hover:text-[--color-cream] hover:bg-[#1E1B19]'
                        : 'text-[--color-stone] hover:text-[--color-espresso] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Progress indicator */}
                  <div className={`flex justify-center gap-1.5 mt-2 ${isDark ? 'text-[--color-cream]/50' : 'text-[--color-stone]/50'}`}>
                    <span className="text-sm">{startIndex + 1}</span>
                    <span className="text-sm">—</span>
                    <span className="text-sm">{Math.min(startIndex + VISIBLE_COUNT, faqs.length)}</span>
                    <span className="text-sm">of</span>
                    <span className="text-sm">{faqs.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
