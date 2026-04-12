export const ANIMATION = {
  typewriterMs:    80,
  typewriterDelay: 600,
  fadeMs:          300,
  slideMs:         500,
  carouselMs:      5000,
  staggerMs:       80,
  inViewThreshold: 0.12,
} as const

export const SECTION_IDS = {
  about:      'about',
  experience: 'experience',
  stack:      'stack',
  education:  'education',
  contact:    'contact',
} as const

export const NAV_HEIGHT = 64 // px — matches h-16 navbar
