import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTION_IDS } from '../../lib/constants'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'

const navLinks = [
  { label: 'about',      href: `#${SECTION_IDS.about}` },
  { label: 'experience', href: `#${SECTION_IDS.experience}` },
  { label: 'stack',      href: `#${SECTION_IDS.stack}` },
  { label: 'contact',    href: `#${SECTION_IDS.contact}` },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header className="fixed top-0 w-full z-50 h-16 bg-bg-deep/95 backdrop-blur-sm border-b border-border-subtle/40" style={{ boxShadow: '0 0 15px var(--color-accent-glow-04)' }}>
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto h-full">

        {/* Logo */}
        <a
          href="#"
          className="flex items-center font-mono font-bold text-lg tracking-tighter text-text-primary hover:text-terminal-green transition-colors"
        >
          DANIEL_FELIPE
          <span className="text-text-secondary mx-1.5">|</span>
          <span className="text-terminal-green animate-blink">_</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-sm text-text-primary/60 hover:text-terminal-green transition-colors hover:bg-surface px-2 py-1"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side: theme switcher + CTA + hamburger */}
        <div className="flex items-center gap-4">
          {/* Theme switcher — large screens only (≥1024px); tablet uses hamburger menu */}
          <div className="hidden lg:flex">
            <ThemeSwitcher />
          </div>

          <a
            href={`#${SECTION_IDS.contact}`}
            onClick={close}
            className="font-mono text-sm font-bold bg-terminal-green text-bg-deep px-4 py-1.5 hover:scale-95 transition-transform duration-100"
          >
            [contact_me]
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0"
          >
            <span
              className={[
                'block h-px w-5 bg-terminal-green transition-all duration-200 origin-center',
                isOpen ? 'rotate-45 translate-y-[6px]' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-terminal-green transition-all duration-200',
                isOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-terminal-green transition-all duration-200 origin-center',
                isOpen ? '-rotate-45 -translate-y-[6px]' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — closes menu on tap-outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 top-16 bg-bg-deep/60 backdrop-blur-[2px] z-[-1]"
              aria-hidden="true"
              onClick={close}
            />

            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } }}
              className="md:hidden absolute top-16 left-0 right-0 bg-bg-deep border-b border-border-subtle"
            >
              {/* Theme switcher row */}
              <div className="px-6 pt-4 pb-3 border-b border-border-subtle/30">
                <ThemeSwitcher compact />
              </div>

              {/* Terminal prompt header */}
              <div className="px-6 pt-3 pb-2">
                <p className="font-mono text-[10px] text-text-secondary/50 tracking-widest uppercase">
                  <span className="text-terminal-green">daniel@portfolio</span>:~$ ls ./nav
                </p>
              </div>

              <div className="px-6 pb-5 space-y-0">
                {navLinks.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={close}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.2 } }}
                    className="flex items-center gap-3 font-mono text-sm text-text-primary/70 hover:text-terminal-green active:text-terminal-green transition-colors py-3.5 border-b border-border-subtle/30 last:border-0"
                  >
                    <span className="text-terminal-green text-xs shrink-0">$</span>
                    <span>cd ./{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
