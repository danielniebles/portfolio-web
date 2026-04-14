import { motion, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { TerminalWindow } from '../ui/TerminalWindow'
import { educationData } from '../../data/education'

interface EducationProps {
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export function Education({ className = '' }: EducationProps) {
  const [ref, inView] = useInView()

  return (
    <motion.section
      id="education"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-section dot-grid bg-surface ${className}`}
    >
      <div className="max-w-3xl mx-auto px-6">

        {/* Section heading */}
        <motion.div variants={itemVariants} className="mb-12 border-b border-border-subtle/30 pb-4">
          <p className="text-terminal-green font-mono text-sm mb-2">git log --all --graph --decorate</p>
          <h2 className="text-4xl font-bold tracking-tighter">Education</h2>
        </motion.div>

        {/* Commit timeline */}
        <div className="relative space-y-10">
          {/* Vertical connector line */}
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-border-subtle/60" />

          {educationData.map((entry) => (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              className="relative pl-10 group"
            >
              {/* Commit node */}
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-terminal-green border-4 border-surface group-hover:scale-125 transition-transform duration-200" />

              {/* Commit meta */}
              <p className="font-mono text-xs text-accent-dim mb-2">
                <span className="text-text-secondary">commit </span>
                {entry.commit}{' '}
                {entry.tags.map((tag) => (
                  <span key={tag} className="text-terminal-green/70">
                    ({tag}){' '}
                  </span>
                ))}
              </p>

              <TerminalWindow title={`${entry.id}.log`}>
                <div className="space-y-1">
                  <h3 className="text-base font-bold uppercase tracking-tight text-text-primary">
                    {entry.institution}
                  </h3>
                  <p className="font-mono text-sm text-text-secondary">{entry.degree}</p>
                  <p className="font-mono text-xs text-text-secondary">
                    {entry.location} • {entry.period}
                  </p>
                  <p className="font-mono text-xs text-terminal-green/60 mt-2 italic">
                    {entry.note}
                  </p>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
