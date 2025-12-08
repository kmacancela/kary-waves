import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
// import Installations from './components/Installations'
import Lookbook from './components/Lookbook'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Marquee from './components/Marquee'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="grain">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          {/* <Installations /> */}
          <Lookbook />
          <FAQ />
          <Contact />
        </main>
        <Marquee />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
