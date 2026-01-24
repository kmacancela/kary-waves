import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'

const services = [
  {
    title: 'Consultation',
    description: 'One-on-one guidance to bring your vision to life. We sit down with you to understand your brand, refine your concept, select the right materials, and map out a realistic production timeline. Whether you\'re launching your first collection or scaling an established line, we\'ll help you navigate every decision.',
    shortDescription: 'One-on-one guidance to refine your concept, select materials, and map out a realistic production timeline.',
    backgroundImage: '/images/consultation.png',
    extendedDescription: `Our consultation process is designed to set your project up for success from day one. We begin by understanding your brand identity and creative vision. From there, we review, assist, and offer feedback.

By the end of our consultation, you'll have a clear roadmap: materials sourced, patterns planned, and a realistic timeline to bring your collection to life. Consultations need to be conducted in-person at our NYC studio.`,
  },
  {
    title: 'Pattern Making',
    description: 'Expert pattern making for the perfect fit. We translate your designs into precise, production-ready patterns that scale flawlessly across sizes. We account for fabric behavior, construction methods, and fit adjustments to ensure consistency from sample to final garment.',
    shortDescription: 'We translate your designs into precise, production-ready patterns that scale flawlessly across sizes.',
    backgroundImage: '/images/pattern-making.png',
    extendedDescription: `We start with your design—whether it's a detailed tech pack, a rough sketch, or even a reference garment you want to replicate. We draft the initial pattern, accounting for seam allowances, grain lines, notches, and construction sequence.

Once the base pattern is finished, we can grade it across your full size range. We also create detailed cut markers to minimize fabric waste during production, saving you money on materials. Every pattern can be digitized and archived, so future reorders or colorway additions are seamless.`,
  },
  {
    title: 'Sample Making',
    description: 'Transform sketches into tangible prototypes. Our sample room brings your designs to life with meticulous attention to detail. We work through multiple iterations if needed, refining fit, construction, and finishing until your sample is exactly right and ready for production approval.',
    shortDescription: 'Our sample room brings your designs to life, refining fit and construction until your sample is production-ready.',
    backgroundImage: '/images/sample-making.png',
    extendedDescription: `Our sample room is where your designs are born to life. This is a critical stage since the sample serves as the blueprint for your entire production run, so we approach it with careful precision.

We cut and sew your first prototype using the actual production fabrics whenever possible. This will let you evaluate not just the fit and silhouette, but also how the materials drape, stretch, and hold structure.

After the first sample, we conduct a  fit session with you in-person. If needed, we document additional adjustments and produce a revised sample incorporating all feedback. We move quickly but never rush because a perfect sample means a flawless production run.`,
  },
  {
    title: 'Production',
    description: 'From small batch to full scale, we handle it all. Low minimums make us ideal for emerging labels, while our capacity supports larger runs for established brands. Every piece receives the same precision, quality control, and transparent communication—regardless of volume.',
    shortDescription: 'From small batch to full scale with no minimums. Every piece receives the same precision and quality control.',
    backgroundImage: '/images/production-process.png',
    extendedDescription: `Production is where everything comes together. With your approved sample in hand, we scale up with the same attention to detail that went into your prototype.

There is no minimum order quantity, making us an ideal partner for emerging designers, limited drops, and made-to-order brands. At the same time, we can handle runs of hundreds of pieces for established labels.

Every production run follows a strict quality control process. When your order is ready, you'll have a ready collection including care labels and packaging if needed.`,
  },
  {
    title: 'Alterations',
    description: 'Precision alterations to perfect the fit. From minor adjustments like hemming and taking in seams to complete garment reworks, we handle it all. We work with individuals, designers, and brands who need expert alterations done right.',
    shortDescription: 'From hemming to complete reworks, we handle alterations for individuals and brands alike.',
    backgroundImage: '/images/alteration.png',
    extendedDescription: `Whether you're a designer perfecting a one-off piece, a stylist prepping for a shoot, or an individual who needs their favorite jacket taken in, we bring the same expertise we apply to production to individual garments.

We offer rapid-turnaround alterations and even same-day service when deadlines are tight and time allows. Every alteration is performed by us in-person. We preserve the integrity of the original garment while achieving the perfect fit.`,
  },
  {
    title: 'Hardware Installation',
    description: 'Professional installation of eyelets, rivets, grommets, and snaps. We use industrial-grade equipment to ensure secure, clean, and consistent placement on any garment or accessory. Bring your pieces to us or include hardware installation as part of your production run.',
    shortDescription: 'Professional installation of eyelets, rivets, grommets, and snaps with industrial-grade equipment.',
    backgroundImage: '/images/rivet-machine.png',
    backgroundSize: 'w-1/4 sm:w-1/3',
    modalBgSize: '35%',
    extendedDescription: `We know hardware installation requires specialized equipment and expertise that most sewers don't have. Our machines apply precise, consistent pressure, so hardware sits flush and holds permanently.

We work with a wide range of hardware: snaps, rivets, eyelets, grommets. If you have custom hardware, bring it in and we can likely install it.

This service is available as a standalone or as a part of a production run. We also offer sourcing assistance if you need help finding the right hardware for your design.`,
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
  const closeTimeoutRef = useRef<number | null>(null)
  const isClosingRef = useRef(false)
  const { isDark } = useTheme()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStartY = useRef<number | null>(null)

  // This section inverts the global theme for visual contrast
  const hasLightBackground = isDark
  const styles = hasLightBackground ? cardStyles.forLightBg : cardStyles.forDarkBg

  // Close modal with animation
  const closeModal = () => {
    if (isClosingRef.current) return // Prevent race condition (ref avoids stale closure)
    isClosingRef.current = true
    setIsClosing(true)
    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedService(null)
      setIsClosing(false)
      isClosingRef.current = false
      setDragY(0)
    }, 250) // Match animation duration
  }

  // Swipe down to close handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return
    const currentY = e.touches[0].clientY
    const diff = currentY - dragStartY.current
    // Only allow dragging down, not up
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    const shouldClose = dragY > 100
    // Reset drag state
    setDragY(0)
    setIsDragging(false)
    dragStartY.current = null
    // Close modal if dragged past threshold
    if (shouldClose) {
      closeModal()
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Handle body scroll lock and escape key when modal is open
  useEffect(() => {
    if (selectedService !== null) {
      // Cancel any pending close timeout when opening a new modal
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
        isClosingRef.current = false
        setIsClosing(false)
      }

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      const header = document.querySelector('header') as HTMLElement | null

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal()
      }
      window.addEventListener('keydown', handleEscape)

      return () => {
        window.removeEventListener('keydown', handleEscape)

        // Temporarily disable header transitions to prevent animated jump
        if (header) {
          const originalTransition = header.style.transition
          header.style.transition = 'none'
          header.style.paddingRight = ''
          // Force reflow to apply the non-transitioned change
          header.offsetHeight
          header.style.transition = originalTransition
        }

        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [selectedService])

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
      className={`scroll-mt-16 md:scroll-mt-10 transition-colors duration-300 ${
        hasLightBackground ? 'bg-[--color-cream]' : 'bg-[--color-espresso]'
      }`}
    >
      <div className="section-lg !pt-10 md:!pt-12 !pb-10 md:!pb-12">
        <div className="container mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="reveal max-w-2xl mb-12">
            <h2 className={`display-lg mb-4 ${hasLightBackground ? 'text-[--color-espresso]' : 'text-[--color-cream]'}`}>
              From concept <em className="italic">to creation.</em>
            </h2>
            <p className={`text-lg md:text-xl ${hasLightBackground ? 'text-[--color-stone]' : 'text-[--color-cream]/85'}`}>
              Experienced manufacturing services tailored to your brand's unique needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setSelectedService(index)}
                className="service-card reveal relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 md:py-14 rounded-2xl border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-xl active:scale-[0.98] sm:hover:scale-[1.02] text-left"
                style={styles.card}
              >
                {/* Stitch border SVG - hand-sewn dashed effect */}
                <svg
                  className="pointer-events-none absolute"
                  style={{
                    inset: '6px',
                    width: 'calc(100% - 12px)',
                    height: 'calc(100% - 12px)',
                  }}
                  fill="none"
                >
                  <rect
                    className={`stitch-rect ${hasLightBackground ? 'stroke-[#FAF8F5]/50' : 'stroke-[#1A1614]/50'}`}
                    x="1"
                    y="1"
                    rx="12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
                  />
                </svg>
                {/* Card background image */}
                {service.backgroundImage && (
                  <div
                    className={`absolute right-0 top-0 bottom-0 ${service.backgroundSize || 'w-1/3 sm:w-1/2'} pointer-events-none ${hasLightBackground ? 'opacity-35' : 'opacity-15'}`}
                    style={{
                      backgroundImage: `url(${service.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      maskImage: 'linear-gradient(to right, transparent, black 30%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)',
                    }}
                  />
                )}
                <div className="relative z-10">
                  <h3
                    className="text-[1.75rem] md:text-[2rem] font-[Instrument_Serif] mb-4"
                    style={styles.title}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed sm:hidden"
                    style={styles.description}
                  >
                    {service.shortDescription}
                  </p>
                  <p
                    className="hidden sm:block text-base md:text-lg leading-relaxed"
                    style={styles.description}
                  >
                    {service.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="reveal flex justify-center mt-12">
            <a href="#contact" className={`btn ${hasLightBackground ? 'btn-light' : 'btn-dark'}`}>
              Start Your Project
            </a>
          </div>

        </div>
      </div>

      {/* Service Modal - rendered via portal to escape #root stacking context */}
      {selectedService !== null && createPortal(
        <div
          className="fixed inset-0 z-[60] sm:flex sm:items-center sm:justify-center sm:p-6"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-[250ms] ${isClosing ? 'opacity-0' : 'opacity-100'}`} />

          {/* Modal Content - absolute bottom on mobile, centered on desktop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className={`absolute bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:max-w-2xl h-auto max-h-[100dvh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl ${
              isDragging ? '' : (isClosing ? 'animate-slide-down' : 'animate-slide-up')
            } sm:animate-none ${
              isDark ? 'bg-[#1A1614]' : 'bg-[#FAF8F5]'
            }`}
            style={{
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              marginBottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
              transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag area - mobile only, includes handle and title for swipe down to close */}
            <div
              className="sm:hidden touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className={`w-10 h-1 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/20'}`} />
              </div>
              {/* Title in drag area */}
              <h3
                id="service-modal-title-mobile"
                className={`text-2xl font-[Instrument_Serif] mb-4 px-5 ${
                  isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                }`}
              >
                {services[selectedService].title}
              </h3>
            </div>

            {/* Background image */}
            {services[selectedService].backgroundImage && (
              <div
                className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-20' : 'opacity-10'}`}
                style={{
                  backgroundImage: `url(${services[selectedService].backgroundImage})`,
                  backgroundSize: services[selectedService].modalBgSize || '50%',
                  backgroundPosition: 'right top',
                  backgroundRepeat: 'no-repeat',
                  maskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
                }}
              />
            )}

            {/* Close button - desktop only */}
            <button
              onClick={closeModal}
              className={`hidden sm:flex absolute top-4 right-4 z-20 w-10 h-10 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-[#1A1614]'
              }`}
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 px-5 pb-5 sm:p-8 md:p-10">
              {/* Title - desktop only (mobile title is in drag area above) */}
              <h3
                id="service-modal-title"
                className={`hidden sm:block text-4xl font-[Instrument_Serif] mb-6 ${
                  isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                }`}
              >
                {services[selectedService].title}
              </h3>

              <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[--color-cream]/85' : 'text-[--color-stone]'
              }`}>
                {services[selectedService].extendedDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-current/10 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="#contact"
                  onClick={closeModal}
                  className={`inline-flex items-center justify-center gap-2 font-medium transition-opacity hover:opacity-70 ${
                    isDark ? 'text-[#D94F1A]' : 'text-[#B83D0C]'
                  }`}
                >
                  Get started with {services[selectedService].title.toLowerCase()}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                {/* Close button - mobile only */}
                <button
                  onClick={closeModal}
                  className={`sm:hidden w-full py-3 rounded-xl font-medium transition-colors ${
                    isDark
                      ? 'bg-white/10 text-white active:bg-white/20'
                      : 'bg-black/10 text-[#1A1614] active:bg-black/20'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Services
