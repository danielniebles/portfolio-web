import { useInView as useIntersectionObserver } from 'react-intersection-observer'
import type { CSSProperties } from 'react'
import { ANIMATION } from '../lib/constants'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useInView(options: UseInViewOptions = {}) {
  const {
    threshold = ANIMATION.inViewThreshold,
    triggerOnce = true,
    rootMargin = '0px',
  } = options

  return useIntersectionObserver({ threshold, triggerOnce, rootMargin })
}

// Returns inline style for staggered animation delay
export function staggerDelay(index: number, baseMs = ANIMATION.staggerMs): CSSProperties {
  return {
    transitionDelay: `${index * baseMs}ms`,
    animationDelay:  `${index * baseMs}ms`,
  }
}
