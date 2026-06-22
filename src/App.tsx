import { lazy, Suspense, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'

// Lazy load below-fold components for better initial page load
const Lookbook = lazy(() => import('./components/Lookbook'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Marquee = lazy(() => import('./components/Marquee'))
const Footer = lazy(() => import('./components/Footer'))

const getHashTargetId = () => {
  const { hash } = window.location
  if (!hash || hash === '#') return null

  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return hash.slice(1)
  }
}

const useHashScroll = () => {
  useEffect(() => {
    let observer: MutationObserver | null = null
    let timeoutId: number | null = null
    let frameId: number | null = null

    const cleanupWaitForTarget = () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    const cleanupPendingScroll = () => {
      cleanupWaitForTarget()

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    const scrollToCurrentHash = (behavior: ScrollBehavior = 'smooth') => {
      cleanupPendingScroll()

      const targetId = getHashTargetId()
      if (!targetId) return

      const scrollToTarget = () => {
        const target = document.getElementById(targetId)
        if (!target) return false

        frameId = window.requestAnimationFrame(() => {
          frameId = null
          target.scrollIntoView({ block: 'start', behavior })
        })

        return true
      }

      if (scrollToTarget()) return

      observer = new MutationObserver(() => {
        if (scrollToTarget()) {
          cleanupWaitForTarget()
        }
      })

      observer.observe(document.body, { childList: true, subtree: true })

      timeoutId = window.setTimeout(() => {
        cleanupPendingScroll()
      }, 5000)
    }

    scrollToCurrentHash('auto')

    const handleHashChange = () => scrollToCurrentHash()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      cleanupPendingScroll()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
}

function App() {
  useHashScroll()

  return (
    <ThemeProvider>
      <div className="grain">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Suspense fallback={null}>
            <Lookbook />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Marquee />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
