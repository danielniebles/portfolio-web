import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { THEMES, FIRST_VISIT_KEY, type ThemeId } from '../../lib/themes'
import { applyTheme, loadSavedTheme, saveTheme } from '../../lib/applyTheme'

interface ThemeSwitcherProps {
  /** compact=true renders larger swatches for the mobile menu */
  compact?: boolean
}

export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const [active, setActive]       = useState<ThemeId>('terminal_green')
  const [scanning, setScanning]   = useState(false)

  // On mount: restore saved theme + trigger first-visit scan animation
  useEffect(() => {
    const saved = loadSavedTheme()
    applyTheme(saved)
    setActive(saved)

    try {
      if (!localStorage.getItem(FIRST_VISIT_KEY)) {
        const t = setTimeout(() => {
          setScanning(true)
          setTimeout(() => {
            setScanning(false)
            localStorage.setItem(FIRST_VISIT_KEY, '1')
          }, THEMES.length * 120 + 300)
        }, 800)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const handleSelect = (id: ThemeId) => {
    applyTheme(id)
    saveTheme(id)
    setActive(id)
  }

  const swatchSize = compact ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <div className={`flex items-center gap-1.5 ${compact ? 'py-1' : ''}`}>
      <span className="font-mono text-[10px] text-text-secondary select-none shrink-0">
        theme:
      </span>

      {THEMES.map((theme, i) => {
        const isActive  = theme.id === active
        const isLight   = theme.isLight

        return (
          <motion.button
            key={theme.id}
            type="button"
            title={theme.label}
            aria-label={`Switch to ${theme.label} theme`}
            aria-pressed={isActive}
            onClick={() => handleSelect(theme.id)}
            // First-visit scan: pulse each swatch in sequence
            animate={scanning ? { opacity: [1, 0.3, 1] } : {}}
            transition={scanning ? { delay: i * 0.12, duration: 0.35 } : {}}
            className={[
              swatchSize,
              'rounded-full shrink-0 transition-[outline] duration-150 cursor-pointer',
              'flex items-center justify-center',
              // Active ring uses the current accent var so it follows the theme
              isActive
                ? 'outline outline-2 outline-offset-2 outline-[color:var(--color-terminal-green)]'
                : 'outline outline-1 outline-offset-1 outline-transparent hover:outline-[color:var(--color-terminal-green)]/40',
            ].join(' ')}
            style={
              isLight
                ? { backgroundColor: theme.swatch, border: '1px solid var(--color-border-subtle)' }
                : { backgroundColor: theme.swatch }
            }
          >
            {/* Sun symbol for light mode swatch */}
            {isLight && (
              <span className="text-[8px] leading-none text-[#3D6B58] select-none">☀</span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
