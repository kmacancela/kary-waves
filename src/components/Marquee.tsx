import { useTheme } from '../context/ThemeContext'

const Marquee = () => {
  const { isDark } = useTheme()

  return (
    <div className={`border-y py-6 overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-[#13110F] border-[--color-cream]/10'
        : 'bg-[#E8E4DE] border-[--color-espresso]/10'
    }`}>
      <div className="marquee flex">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex shrink-0">
            {[
              { text: 'Pattern Development', icon: '◆' },
              { text: 'Sample Making', icon: '✦' },
              { text: 'Small Batch', icon: '◆' },
              { text: 'Full Production', icon: '✦' },
              { text: 'Fabric Sourcing', icon: '◆' },
              { text: 'Quality Control', icon: '✦' },
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center mx-10">
                <span className="text-[--color-terracotta] text-base mr-4">{item.icon}</span>
                <span className={`text-base uppercase tracking-[0.15em] font-medium ${
                  isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
                }`}>
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
