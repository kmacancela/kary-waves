const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] bg-[--color-espresso] overflow-hidden flex flex-col">
      {/* Background - Dramatic tailor workspace */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-background.jpg"
          alt="Fashion atelier workspace with fabric and sewing materials"
          className="w-full h-full object-cover object-[30%_center] sm:object-center scale-x-[-1]"
          fetchPriority="high"
        />
        {/* Stronger overlay for text readability */}
        <div className="absolute inset-0 bg-[--color-espresso]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-espresso] via-[--color-espresso]/85 to-[--color-espresso]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-6 md:px-8 pt-28 pb-20">
          <div className="max-w-3xl">
            {/* Heritage Badge */}
            <div className="flex items-center gap-4 mb-8 animate-fade-up">
              <span className="heritage-badge max-w-[250px] sm:max-w-none text-[0.5625rem] sm:text-[0.8125rem] px-2 py-1 sm:px-4 sm:py-2 gap-1 sm:gap-2 tracking-[0.03em] sm:tracking-[0.1em] leading-tight sm:leading-normal">
                <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Family-Owned Garment Manufacturer
              </span>
            </div>

            <h1 className="text-[4.5rem] sm:text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] font-[Instrument_Serif] text-white mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              <span className="block animate-fade-up delay-100">Where</span>
              <span className="block animate-fade-up delay-200">
                <em className="italic">fashion</em>
              </span>
              <span className="block animate-fade-up delay-300">is made.</span>
            </h1>

            <p className="text-white text-xl md:text-2xl max-w-xl mb-10 animate-fade-up delay-400 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              A <strong className="font-bold">father & daughter</strong> business
              crafting garments for brands in NYC's historic Garment District.
            </p>

            <div className="flex flex-wrap items-center gap-6 animate-fade-up delay-500">
              <a href="#contact" className="btn btn-light">
                <span>Start Your Project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#about" className="hidden sm:block text-white text-base uppercase tracking-wider hover:opacity-70 transition-opacity font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Our Story
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex justify-between sm:justify-start sm:gap-12 mt-16 animate-fade-up delay-600">
              <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-[Instrument_Serif] text-white">20+</div>
                <div className="text-white text-xs sm:text-sm uppercase tracking-wider mt-1 sm:mt-2 font-semibold">Years Operating</div>
              </div>
              <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-[Instrument_Serif] text-white">500+</div>
                <div className="text-white text-xs sm:text-sm uppercase tracking-wider mt-1 sm:mt-2 font-semibold">Brands Served</div>
              </div>
              <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-[Instrument_Serif] text-white">3</div>
                <div className="text-white text-xs sm:text-sm uppercase tracking-wider mt-1 sm:mt-2 font-semibold">Generations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8">
        <div className="container mx-auto px-6 md:px-8 flex justify-center">
          <a href="#services" className="flex flex-col items-center gap-3 text-white hover:opacity-70 transition-opacity animate-fade-up delay-600 group drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <span className="text-sm uppercase tracking-[0.2em] font-semibold">Discover Our Services</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
