import { motion, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { TerminalSession } from '../ui/TerminalSession'
import { SECTION_IDS } from '../../lib/constants'

interface AboutProps {
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stats = [
  { key: 'years_active',    value: '> 7+' },
  { key: 'countries_shipped',   value: '> 6+' },
  { key: 'languages', value: '> 3' },
]

export function About({ className = '' }: AboutProps) {
  const [ref, inView] = useInView()

  return (
    <motion.section
      id={SECTION_IDS.about}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-section bg-surface/50 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Terminal session panel — replaces static photo */}
        <motion.div variants={itemVariants}>
          <TerminalSession />
        </motion.div>

        {/* Bio column */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="border-l-4 border-terminal-green pl-6">
            <h2 className="text-4xl font-bold tracking-tight mb-1">BIO_DATA</h2>
            <p className="text-terminal-green font-mono text-xs opacity-60" aria-hidden="true">
              // access_granted: user_history
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base leading-relaxed text-text-secondary">
          I'm an Electronic Engineer who crossed over from{' '}
          <span className="text-terminal-green">telecom infrastructure</span> into frontend
          development and never looked back. Today I lead the team responsible for the
          top-of-funnel experience on the platform unifying{' '}
          <span className="text-terminal-green">Whirlpool's</span> storefronts across{' '}
          <span className="text-terminal-green">six countries</span> — one codebase that adapts
          to every brand, every market. I speak three languages, picked up{' '}
          <span className="text-terminal-green">Portuguese</span> on the job working with the
          Brazil team that drives the project. I care about shipping on time and doing it right
          — it's just how I work.
          </motion.p>

          {/* Stat counters */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            {stats.map(({ key, value }) => (
              <div key={key} className="bg-surface border border-border-subtle p-4 min-w-0 overflow-hidden">
                <p className="text-terminal-green font-mono text-xl font-bold">{value}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-text-secondary font-mono mt-1 truncate">
                  {key}
                </p>
              </div>
            ))}
          </motion.div>

          {/* LinkedIn link */}
          <motion.a
            variants={itemVariants}
            href="https://linkedin.com/in/danielniebles"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-terminal-green transition-colors border border-border-subtle hover:border-terminal-green px-4 py-2"
          >
            <span className="text-terminal-green">$</span> open linkedin
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}
