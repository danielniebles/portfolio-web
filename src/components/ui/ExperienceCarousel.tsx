import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ExperienceCard } from './ExperienceCard'
import { experienceData } from '../../data/experience'
import { ANIMATION } from '../../lib/constants'

interface ExperienceCarouselProps {
  highlightedId?: string | null
  className?: string
}

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

export function ExperienceCarousel({ highlightedId, className = '' }: ExperienceCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => {
      setDirection(1)
      return (prev + 1) % experienceData.length
    })
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => {
      setDirection(-1)
      return (prev - 1 + experienceData.length) % experienceData.length
    })
  }, [])

  // Autoplay
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(next, ANIMATION.carouselMs)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next, isPaused])

  // Jump to highlighted card when triggered from TechStack
  // current is intentionally omitted from deps to prevent loop —
  // we only want to react to external highlight changes, not our own navigation
  useEffect(() => {
    if (!highlightedId) return
    const idx = experienceData.findIndex((e) => e.id === highlightedId)
    if (idx !== -1) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      goTo(idx, idx > current ? 1 : -1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedId])

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide viewport */}
      <div className="relative overflow-hidden h-[560px] md:h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ExperienceCard
              entry={experienceData[current]}
              isHighlighted={experienceData[current].id === highlightedId}
              className="h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-text-secondary hover:text-terminal-green transition-colors px-3 py-1 border border-border-subtle hover:border-terminal-green text-xs font-mono"
        >
          ◀
        </button>

        <div className="flex gap-2 items-center">
          {experienceData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                'h-1 transition-all duration-300',
                i === current
                  ? 'w-6 bg-terminal-green'
                  : 'w-2 bg-border-subtle hover:bg-text-secondary',
              ].join(' ')}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="text-text-secondary hover:text-terminal-green transition-colors px-3 py-1 border border-border-subtle hover:border-terminal-green text-xs font-mono"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
