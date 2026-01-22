import { lazy, Suspense } from 'react'
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

function App() {
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
