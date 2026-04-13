import { motion, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { SkillBar } from '../ui/SkillBar'
import { skillsData, type SkillGroup } from '../../data/skills'
import { SECTION_IDS } from '../../lib/constants'

interface TechStackProps {
  onCompanyClick: (companyId: string) => void
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const groups: { key: SkillGroup; label: string }[] = [
  { key: 'frontend',   label: 'frontend/' },
  { key: 'backend',    label: 'backend/' },
  { key: 'cloud_infra', label: 'cloud_infra/' },
]

export function TechStack({ onCompanyClick, className = '' }: TechStackProps) {
  const [ref, inView] = useInView()

  return (
    <motion.section
      id={SECTION_IDS.stack}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-section bg-bg-deep/80 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
          <div>
            <p className="text-terminal-green font-mono text-sm mb-2">&gt; tech_stack --verbose</p>
            <h2 className="text-4xl font-bold tracking-tighter">Core Arsenal</h2>
          </div>
          <p className="font-mono text-xs text-text-secondary/40" aria-hidden="true">
            LATENCY: 14ms | UPTIME: 99.9%
          </p>
        </motion.div>

        {/* File-tree grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {groups.map(({ key, label }) => (
            <motion.div key={key} variants={itemVariants} className="space-y-1">
              {/* Group header */}
              <div className="flex items-center gap-2 text-terminal-green mb-3">
                <span className="text-xs">▸</span>
                <span className="material-symbols-outlined text-base leading-none" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>folder_open</span>
                <span className="font-mono text-sm font-bold tracking-widest uppercase">
                  {label}
                </span>
              </div>

              {/* Skills — stagger handled by SkillBar's own variants */}
              <div className="pl-3 border-l border-border-subtle space-y-0.5">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {skillsData[key].map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={i}
                      onCompanyClick={onCompanyClick}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
