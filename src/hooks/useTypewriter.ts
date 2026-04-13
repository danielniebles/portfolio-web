import { useState, useEffect } from 'react'
import { ANIMATION } from '../lib/constants'

interface UseTypewriterOptions {
  text: string
  speed?: number
  startDelay?: number
  loop?: boolean
}

export function useTypewriter({
  text,
  speed = ANIMATION.typewriterMs,
  startDelay = ANIMATION.typewriterDelay,
  loop = false,
}: UseTypewriterOptions) {
  // Single numeric state — avoids calling two sync setStates in the effect body.
  // displayText and isDone are derived so the effect only ever calls setCharCount.
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let index = 0
    let typeTimer: ReturnType<typeof setTimeout>

    const type = () => {
      if (cancelled) return
      if (index < text.length) {
        index++
        setCharCount(index)
        typeTimer = setTimeout(type, speed)
      } else if (loop) {
        typeTimer = setTimeout(() => {
          if (cancelled) return
          index = 0
          setCharCount(0)
          typeTimer = setTimeout(type, speed)
        }, 2000)
      }
    }

    const startTimer = setTimeout(type, startDelay)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      clearTimeout(typeTimer)
      // Reset in cleanup (not in the effect body) to avoid sync setState cascade
      setCharCount(0)
    }
  }, [text, speed, startDelay, loop])

  return {
    displayText: text.slice(0, charCount),
    isDone: charCount === text.length,
  }
}
