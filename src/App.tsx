import { useState, useCallback, useRef } from 'react'
import { Navbar }     from './components/layout/Navbar'
import { Footer }     from './components/layout/Footer'
import { Hero }       from './components/sections/Hero'
import { About }      from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { TechStack }  from './components/sections/TechStack'
import { Education }  from './components/sections/Education'
import { Contact }    from './components/sections/Contact'
import { NAV_HEIGHT } from './lib/constants'

export default function App() {
  const [highlightedExperienceId, setHighlightedExperienceId] = useState<string | null>(null)
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCompanyClick = useCallback((companyId: string) => {
    // Clear any existing highlight timer
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current)

    setHighlightedExperienceId(companyId)

    // Scroll to experience section with navbar offset
    const section = document.getElementById('experience')
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
      window.scrollTo({ top, behavior: 'smooth' })
    }

    // Auto-clear highlight after 3 s
    highlightTimerRef.current = setTimeout(() => {
      setHighlightedExperienceId(null)
    }, 3000)
  }, [])

  return (
    <>
      {/* CRT scanlines overlay */}
      <div className="scanlines" aria-hidden="true" />

      <Navbar />

      <main className="pt-16">
        <Hero />
        <About />
        <Experience highlightedId={highlightedExperienceId} />
        <TechStack onCompanyClick={handleCompanyClick} />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
