import { motion, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { TerminalWindow } from '../ui/TerminalWindow'
import { TerminalForm } from '../ui/TerminalForm'
import { SECTION_IDS } from '../../lib/constants'

interface ContactProps {
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const socialLinks = [
  { label: 'linkedin', href: 'https://linkedin.com/in/danielniebles' },
  { label: 'github',   href: 'https://github.com/danielniebles' },
  { label: 'terminal', href: `#${SECTION_IDS.contact}` },
]

export function Contact({ className = '' }: ContactProps) {
  const [ref, inView] = useInView()

  return (
    <motion.section
      id={SECTION_IDS.contact}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-section bg-surface relative ${className}`}
    >
      {/* Subtle green glow */}
      <div className="absolute inset-0 bg-linear-to-t from-terminal-green/2 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">

        {/* Section heading */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-terminal-green font-mono text-sm mb-2">// initiate_connection</p>
          <h2 className="text-4xl font-bold tracking-tighter">Contact</h2>
        </motion.div>

        {/* Terminal form window */}
        <motion.div variants={itemVariants}>
          <TerminalWindow title="SSH: daniel@portfolio_remote">
            <TerminalForm />
          </TerminalWindow>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="mt-8 space-y-2">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-terminal-green transition-colors group"
            >
              <span className="text-terminal-green">$</span>
              <span className="group-hover:underline underline-offset-2">
                open {label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
