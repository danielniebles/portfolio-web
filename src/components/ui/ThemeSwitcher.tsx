import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { THEMES, FIRST_VISIT_KEY, type ThemeId } from '../../lib/themes'
import { applyTheme, loadSavedTheme, saveTheme } from '../../lib/applyTheme'

interface ThemeSwitcherProps {
  /** compact=true renders larger swatches for the mobile menu */
  compact?: boolean
}

export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  // Lazy initializer reads localStorage once at first render — avoids calling
  // setActive synchronously inside an effect (which triggers cascade warnings).
  const [active, setActive] = useState<ThemeId>(() => loadSavedTheme())
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    // Apply CSS vars only if the anti-flash inline script in index.html
    // didn't already set data-theme (i.e. vars are already correct).
    if (!document.documentElement.getAttribute('data-theme')) {
      applyTheme(active)
    }

    // First-visit scan animation
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
  // active intentionally excluded — we only need the mount-time value for the
  // fallback applyTheme call; subsequent changes go through handleSelect directly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (id: ThemeId) => {
    applyTheme(id)
    saveTheme(id)
    setActive(id)
  }

  const swatchSize = compact ? 'w-5 h-5' : 'w-4 h-4'
  // Compact mode: pad each button so the tap area meets the 44×44px minimum
  // while keeping the visual swatch its intended size
  const tapArea = compact ? 'p-[10px]' : ''

  return (
    <div className={`flex items-center ${compact ? 'gap-0' : 'gap-2'}`}>
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
              // tapArea expands the touch target to 44×44px in compact/mobile mode
              tapArea,
              'rounded-full shrink-0 cursor-pointer',
              'flex items-center justify-center',
            ].join(' ')}
          >
            {/* Visual swatch — separate from the tap-area wrapper */}
            <span
              className={[
                swatchSize,
                'rounded-full flex items-center justify-center transition-[outline] duration-150',
                isActive
                  ? 'outline-2 outline-offset-2 outline-terminal-green'
                  : 'outline-1 outline-offset-1 outline-transparent group-hover:outline-border-subtle hover:outline-border-subtle',
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
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
