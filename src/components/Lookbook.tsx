import { useRef, useState, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'

const imageData = [
  {
    src: '/images/lookbook/scarf.jpg',
    alt: 'Elegant scarf design',
  },
  {
    src: '/images/lookbook/fashion-shoot.webp',
    alt: 'Fashion shoot look',
  },
  {
    src: '/images/lookbook/custom-garment.jpg',
    alt: 'Custom garment piece',
  },
  {
    src: '/images/lookbook/celebrity-jacket.jpg',
    alt: 'Celebrity jacket design',
  },
  {
    src: '/images/lookbook/handcrafted-design.jpg',
    alt: 'Handcrafted design',
  },
  {
    src: '/images/lookbook/lolita-bell-jeans.jpg',
    alt: 'Lolita bell jeans',
  },
  {
    src: '/images/lookbook/editorial-fashion.jpg',
    alt: 'Editorial fashion shot',
  },
  {
    src: '/images/lookbook/fashion-showcase.webp',
    alt: 'Fashion design showcase',
  },
  {
    src: '/images/lookbook/design-in-progress.png',
    alt: 'Design in progress',
  },
  {
    src: '/images/lookbook/lolita-jeans.jpg',
    alt: 'Lolita jeans design',
  },
  {
    src: '/images/lookbook/professional-photoshoot.jpg',
    alt: 'Professional photoshoot',
  },
  {
    src: '/images/lookbook/tailored-piece.jpg',
    alt: 'Tailored piece',
  },
]

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const Lookbook = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  // Shuffle images once on initial render
  const images = useMemo(() => shuffleArray(imageData), [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const openModal = (image: { src: string; alt: string }) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section id="lookbook" className={`section-lg overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[--color-cream-dark]' : 'bg-[--color-espresso]'
      }`}>
        <div className="container mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="line-accent" />
                <span className="eyebrow">Portfolio</span>
              </div>
              <h2 className={`display-md mb-3 ${isDark ? 'text-[--color-espresso]' : 'text-[--color-cream]'}`}>
                Our <em className="italic text-[--color-terracotta]">Lookbook</em>
              </h2>
              <p className={`text-base md:text-lg max-w-md ${isDark ? 'text-[--color-stone]' : 'text-[--color-cream]/80'}`}>
                A curated collection of garments crafted by Kary Waves.
              </p>
            </div>

            {/* Instagram Link */}
            <a
              href="https://instagram.com/karywaves"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 transition-opacity hover:opacity-70 ${
                isDark ? 'text-[--color-espresso]' : 'text-[--color-cream]'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-medium">@karywaves</span>
            </a>
          </div>
        </div>

        {/* Image Carousel with Side Arrows - breaks out of section padding */}
        <div className="relative -mx-6 md:-mx-8 lg:-mx-12">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
              isDark
                ? 'bg-[--color-espresso]/80 text-[--color-cream] hover:bg-[--color-espresso]'
                : 'bg-[--color-cream]/80 text-[--color-espresso] hover:bg-[--color-cream]'
            } shadow-lg backdrop-blur-sm`}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
              isDark
                ? 'bg-[--color-espresso]/80 text-[--color-cream] hover:bg-[--color-espresso]'
                : 'bg-[--color-cream]/80 text-[--color-espresso] hover:bg-[--color-cream]'
            } shadow-lg backdrop-blur-sm`}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container - edge to edge */}
          <div
            ref={scrollRef}
            className="horizontal-scroll gap-5 scroll-smooth"
          >
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => openModal(image)}
                onContextMenu={(e) => e.preventDefault()}
                className="w-[300px] md:w-[380px] lg:w-[420px] aspect-[3/4] relative cursor-pointer group flex-shrink-0 select-none"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90 pointer-events-none"
                />
                {/* Protective overlay - prevents direct image interaction */}
                <div className="absolute inset-0 bg-[--color-espresso]/0 group-hover:bg-[--color-espresso]/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-[--color-espresso]/80 text-[--color-cream]' : 'bg-[--color-cream]/80 text-[--color-espresso]'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="max-w-[90vw] max-h-[90vh] relative select-none"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              draggable={false}
              className="max-w-full max-h-[90vh] object-contain pointer-events-none"
            />
            {/* Transparent overlay to prevent direct image access */}
            <div className="absolute inset-0" />
          </div>
        </div>
      )}
    </>
  )
}

export default Lookbook
