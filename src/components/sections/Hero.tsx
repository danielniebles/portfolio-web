import { motion, type Variants } from 'framer-motion'
import { TypewriterText } from '../ui/TypewriterText'
import { SECTION_IDS } from '../../lib/constants'

interface HeroProps {
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export function Hero({ className = '' }: HeroProps) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Animated dot-grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-10%] dot-grid-drift opacity-40" />
        {/* Radial vignette */}
        <div className="absolute inset-0 radial-fade" />
      </div>

      {/* Background glow blob */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-green opacity-[0.025] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full px-6"
      >
        {/* Eyebrow */}
        <motion.p variants={itemVariants} className="font-mono text-terminal-green text-sm md:text-base opacity-80 mb-4">
          // system_init: protocol_portfolio
        </motion.p>

        {/* Name — typewriter */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-8"
        >
          <span className="text-text-secondary mr-3">&gt;</span>
          <TypewriterText
            text="DANIEL FELIPE NIEBLES REYES"
            startDelay={400}
            showCursor
            cursorChar="_"
          />
        </motion.h1>

        {/* Subtitle + tagline */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
          <div className="bg-surface border border-border-subtle px-4 py-2 font-mono text-sm md:text-base text-terminal-green">
            // Tech Lead &amp; Frontend Engineer
          </div>
          <p className="font-mono text-sm text-text-secondary italic">
            /* Building adaptive platforms at enterprise scale */
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
          <a
            href={`#${SECTION_IDS.experience}`}
            className="relative group border border-terminal-green text-terminal-green px-8 py-3 font-mono text-sm hover:bg-terminal-green/10 transition-all duration-300"
          >
            <span className="relative z-10">[./view_work]</span>
            <div className="absolute inset-0 bg-terminal-green/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href={`#${SECTION_IDS.contact}`}
            className="border border-border-subtle text-text-secondary px-8 py-3 font-mono text-sm hover:border-terminal-green hover:text-terminal-green transition-all duration-300"
          >
            [./contact_me]
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
