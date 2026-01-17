import { useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'

const texts = [
  'Pattern Development',
  'Sample Making',
  'Small Batch',
  'Full Production',
  'Alteration',
  'Quality Control',
  'Rivets',
  'Grommets',
  'Snaps',
  'Eyelets',
  'Tech Pack',
]

const icons = ['◆', '✦']

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const Marquee = () => {
  const { isDark } = useTheme()

  const shuffledItems = useMemo(() => {
    return shuffleArray(texts).map((text, i) => ({
      text,
      icon: icons[i % 2],
    }))
  }, [])

  const renderItems = () =>
    shuffledItems.map((item, i) => (
      <span key={i} className="inline-flex items-center whitespace-nowrap px-10">
        <span className="text-[--color-terracotta] text-base mr-4">{item.icon}</span>
        <span className={`text-base uppercase tracking-[0.15em] font-medium ${
          isDark ? 'text-[--color-cream]' : 'text-[--color-espresso]'
        }`}>
          {item.text}
        </span>
      </span>
    ))

  return (
    <div className={`border-y py-6 overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-[#13110F] border-[--color-cream]/10'
        : 'bg-[#E8E4DE] border-[--color-espresso]/10'
    }`}>
      <div className="marquee flex">
        <div className="flex shrink-0">{renderItems()}</div>
        <div className="flex shrink-0">{renderItems()}</div>
      </div>
    </div>
  )
}

export default Marquee
