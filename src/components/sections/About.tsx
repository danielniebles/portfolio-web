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
  { key: 'systems_built',   value: '> 50+' },
  { key: 'languages_spoken', value: '> 3' },
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
            <p className="text-terminal-green font-mono text-xs opacity-60">
              // access_granted: user_history
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base leading-relaxed text-text-secondary">
            With over{' '}
            <span className="text-terminal-green">7 years</span> of deep-dive experience in digital
            craftsmanship, I've evolved from writing clean scripts to orchestrating complex enterprise
            ecosystems. At <span className="text-terminal-green">Whirlpool</span>, I currently steer
            technical vision — ensuring high-scale platforms stay as robust as they are intuitive.
            Trilingual, globally experienced (Colombia, China), and obsessed with the craft.
          </motion.p>

          {/* Stat counters */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            {stats.map(({ key, value }) => (
              <div key={key} className="bg-surface border border-border-subtle p-4">
                <p className="text-terminal-green font-mono text-xl font-bold">{value}</p>
                <p className="text-[10px] uppercase tracking-widest text-text-secondary/60 font-mono mt-1">
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
