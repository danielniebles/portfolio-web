import { motion, type Variants } from 'framer-motion'
import type { Skill } from '../../data/skills'

interface SkillBarProps {
  skill: Skill
  index: number
  onCompanyClick: (companyId: string) => void
}

const rowVariants: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: 'easeOut' },
  }),
}

function StatusDot({ status }: { status: Skill['status'] }) {
  if (status === 'active') {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full bg-terminal-green animate-pulse-dot shrink-0"
        title="active"
      />
    )
  }
  if (status === 'recent') {
    return (
      <span
        className="inline-block w-2 h-2 rounded-full bg-accent-dim shrink-0"
        title="recent"
      />
    )
  }
  return (
    <span
      className="inline-block w-2 h-2 rounded-full border border-text-secondary shrink-0"
      title="archived"
    />
  )
}

export function SkillBar({ skill, index, onCompanyClick }: SkillBarProps) {
  const nameColor = skill.status === 'archived' ? 'text-text-secondary' : 'text-text-primary'

  return (
    <motion.div
      custom={index}
      variants={rowVariants}
      className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-1 text-xs font-mono"
    >
      <StatusDot status={skill.status} />

      {/* name */}
      <span className="text-terminal-green">[</span>
      <span className={`${nameColor} min-w-28`}>{skill.name}</span>
      <span className="text-terminal-green">]</span>

      {/* years */}
      <span className="text-text-secondary">years:</span>
      <span className="text-text-primary">{skill.years}</span>

      {/* used_in — clickable company ids */}
      <span className="text-text-secondary">used_in:</span>
      <span className="flex flex-wrap gap-1">
        {skill.usedIn.map((id, i) => (
          <span key={id}>
            <button
              onClick={() => onCompanyClick(id)}
              className="text-accent-dim hover:text-terminal-green underline underline-offset-2 transition-colors cursor-pointer bg-transparent border-none p-0 font-mono text-xs"
            >
              {id}
            </button>
            {i < skill.usedIn.length - 1 && (
              <span className="text-text-secondary">,</span>
            )}
          </span>
        ))}
      </span>
    </motion.div>
  )
}
