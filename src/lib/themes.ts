export type ThemeId =
  | 'terminal_green'
  | 'cyber_blue'
  | 'neon_purple'
  | 'toxic_amber'
  | 'light_mode'

export interface Theme {
  id: ThemeId
  label: string
  swatch: string   // color shown in the swatch circle
  isLight?: boolean
  vars: Record<string, string>
}

export const THEMES: Theme[] = [
  {
    id: 'terminal_green',
    label: 'terminal_green',
    swatch: '#00FF87',
    vars: {
      '--color-bg-deep':         '#090D0B',
      '--color-surface':         '#0E1410',
      '--color-terminal-green':  '#00FF87',
      '--color-accent-dim':      '#1A6B45',
      '--color-text-primary':    '#E8EDE9',
      '--color-text-secondary':  '#6B8F7A',
      '--color-border-subtle':   '#1A2E22',
      '--color-dot-grid':        '#3b4b3d',
      '--color-accent-glow-50':  'rgba(0,255,135,0.5)',
      '--color-accent-glow-08':  'rgba(0,255,135,0.08)',
      '--color-accent-glow-04':  'rgba(0,255,135,0.04)',
    },
  },
  {
    id: 'cyber_blue',
    label: 'cyber_blue',
    swatch: '#00D4FF',
    vars: {
      '--color-bg-deep':         '#080D12',
      '--color-surface':         '#0C1420',
      '--color-terminal-green':  '#00D4FF',
      '--color-accent-dim':      '#0A4A6B',
      '--color-text-primary':    '#E0EEF5',
      '--color-text-secondary':  '#5A8FA8',
      '--color-border-subtle':   '#102030',
      '--color-dot-grid':        '#1a3040',
      '--color-accent-glow-50':  'rgba(0,212,255,0.5)',
      '--color-accent-glow-08':  'rgba(0,212,255,0.08)',
      '--color-accent-glow-04':  'rgba(0,212,255,0.04)',
    },
  },
  {
    id: 'neon_purple',
    label: 'neon_purple',
    swatch: '#BF5FFF',
    vars: {
      '--color-bg-deep':         '#0A080F',
      '--color-surface':         '#110D18',
      '--color-terminal-green':  '#BF5FFF',
      '--color-accent-dim':      '#4A1A6B',
      '--color-text-primary':    '#EDE0F5',
      '--color-text-secondary':  '#8A6A9A',
      '--color-border-subtle':   '#221030',
      '--color-dot-grid':        '#2a1a3a',
      '--color-accent-glow-50':  'rgba(191,95,255,0.5)',
      '--color-accent-glow-08':  'rgba(191,95,255,0.08)',
      '--color-accent-glow-04':  'rgba(191,95,255,0.04)',
    },
  },
  {
    id: 'toxic_amber',
    label: 'toxic_amber',
    swatch: '#FFB800',
    vars: {
      '--color-bg-deep':         '#0D0B06',
      '--color-surface':         '#181408',
      '--color-terminal-green':  '#FFB800',
      '--color-accent-dim':      '#6B4A00',
      '--color-text-primary':    '#F5EDD0',
      '--color-text-secondary':  '#9A8A5A',
      '--color-border-subtle':   '#302208',
      '--color-dot-grid':        '#3a2e10',
      '--color-accent-glow-50':  'rgba(255,184,0,0.5)',
      '--color-accent-glow-08':  'rgba(255,184,0,0.08)',
      '--color-accent-glow-04':  'rgba(255,184,0,0.04)',
    },
  },
  {
    id: 'light_mode',
    label: 'light_mode',
    swatch: '#F0F4F2',
    isLight: true,
    vars: {
      '--color-bg-deep':         '#F0F4F2',
      '--color-surface':         '#E2EBE6',
      '--color-terminal-green':  '#00875A',
      '--color-accent-dim':      '#A8C9BB',
      '--color-text-primary':    '#0D1F17',
      '--color-text-secondary':  '#3D6B58',
      '--color-border-subtle':   '#B0C9BC',
      '--color-dot-grid':        '#C8DDD5',
      '--color-accent-glow-50':  'rgba(0,135,90,0.5)',
      '--color-accent-glow-08':  'rgba(0,135,90,0.08)',
      '--color-accent-glow-04':  'rgba(0,135,90,0.04)',
    },
  },
]

export const DEFAULT_THEME: ThemeId = 'terminal_green'
export const STORAGE_KEY  = 'portfolio_theme'
export const FIRST_VISIT_KEY = 'portfolio_theme_intro_done'
