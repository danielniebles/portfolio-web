import { motion, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { ExperienceCarousel } from '../ui/ExperienceCarousel'
import { SECTION_IDS } from '../../lib/constants'

interface ExperienceProps {
  highlightedId?: string | null
  className?: string
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Experience({ highlightedId, className = '' }: ExperienceProps) {
  const [ref, inView] = useInView()

  return (
    <section
      id={SECTION_IDS.experience}
      className={`py-section dot-grid ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 md:ml-4"
        >
          <p className="text-terminal-green font-mono text-sm mb-2">// selected_experience</p>
          <h2 className="text-5xl font-bold tracking-tighter uppercase">Experience</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <ExperienceCarousel highlightedId={highlightedId} />
        </motion.div>
      </div>
    </section>
  )
}
