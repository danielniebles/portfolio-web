import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { TerminalWindow } from '../ui/TerminalWindow'
import { GitGraph, GRAPH_ROW_H, GRAPH_PAD_T } from '../ui/GitGraph'
import { projectsData, type Project } from '../../data/projects'
import { SECTION_IDS } from '../../lib/constants'

interface ProjectsProps {
  className?: string
}

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const STATUS_MAP: Record<Project['status'], { label: string; cls: string }> = {
  active:   { label: 'LIVE',     cls: 'text-terminal-green border-terminal-green' },
  wip:      { label: 'WIP',      cls: 'text-accent-dim border-accent-dim' },
  archived: { label: 'ARCHIVED', cls: 'text-text-secondary border-border-subtle' },
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const { label, cls } = STATUS_MAP[status]
  return (
    <span className={`font-mono text-[9px] border px-1.5 py-0.5 uppercase tracking-widest shrink-0 ${cls}`}>
      {label}
    </span>
  )
}

export function Projects({ className = '' }: ProjectsProps) {
  const [selected, setSelected] = useState(0)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [ref, inView] = useInView()

  const project = projectsData[selected]
  const showPreview = previewId === project.id
  const displayName = (name: string) => name.replace(/-/g, '_').toUpperCase()

  return (
    <motion.section
      id={SECTION_IDS.projects}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-section dot-grid bg-surface ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading — git log command style */}
        <motion.div variants={itemVariants} className="mb-12 border-b border-border-subtle/30 pb-4">
          <h2 className="text-xl font-mono font-bold tracking-widest text-terminal-green">
            git log --all --graph --projects
          </h2>
        </motion.div>

        {/* Split pane: commit list + graph  |  project card */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

          {/* LEFT — SVG graph + commit list */}
          <motion.div variants={itemVariants} className="flex items-start">
            <GitGraph count={projectsData.length} selectedIndex={selected} />

            {/* Commit rows — height matches GRAPH_ROW_H so dots pixel-align */}
            <div className="flex-1 min-w-0" style={{ paddingTop: GRAPH_PAD_T }}>
              {projectsData.map((p, i) => {
                const isSelected = i === selected
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(i)}
                    style={{ height: GRAPH_ROW_H }}
                    aria-pressed={isSelected}
                    className={[
                      'w-full text-left flex flex-col justify-center px-3 min-w-0',
                      'border-l-2 transition-colors duration-150',
                      isSelected
                        ? 'border-terminal-green bg-bg-deep/50'
                        : 'border-border-subtle/30 hover:border-terminal-green/50',
                    ].join(' ')}
                  >
                    {/* Hash + branch badge */}
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-mono text-[10px] text-terminal-green shrink-0">
                        {p.commitHash}
                      </span>
                      <span className="font-mono text-[9px] border border-accent-dim text-accent-dim px-1 shrink-0">
                        ({p.branch})
                      </span>
                    </div>

                    {/* Project name */}
                    <span className="font-mono text-sm font-bold text-text-primary leading-tight">
                      {displayName(p.name)}
                    </span>

                    {/* Summary */}
                    <span className="font-mono text-[10px] text-text-secondary truncate mt-0.5">
                      {p.summary}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT — expanded project card */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } }}
              >
                <TerminalWindow title={`~/${project.name}.sh`}>
                  <div className="space-y-5">

                    {/* Commit metadata header */}
                    <p className="font-mono text-xs text-text-secondary">
                      <span className="text-terminal-green">commit </span>
                      {project.commitHash}
                      <span className="ml-3 border border-accent-dim text-accent-dim font-mono text-[9px] px-1.5 py-0.5">
                        ({project.branch})
                      </span>
                    </p>

                    {/* Title + status */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-mono text-xl font-bold uppercase text-text-primary tracking-tight">
                        {displayName(project.name)}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>

                    {/* Summary one-liner */}
                    <p className="font-mono text-sm text-accent-dim italic leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] border border-border-subtle text-text-secondary px-2 py-0.5 uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      {project.access === 'request' && (
                        <a
                          href={`#${SECTION_IDS.contact}`}
                          className="font-mono text-xs font-bold bg-terminal-green text-bg-deep px-4 py-1.5 hover:scale-95 transition-transform duration-100"
                        >
                          [./request_access]
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs border border-border-subtle text-text-secondary px-4 py-1.5 hover:border-terminal-green hover:text-terminal-green transition-colors"
                        >
                          [./view_repo]
                        </a>
                      )}
                      {project.image && (
                        <button
                          type="button"
                          onClick={() => setPreviewId(showPreview ? null : project.id)}
                          className="font-mono text-xs border border-border-subtle text-text-secondary px-4 py-1.5 hover:border-terminal-green hover:text-terminal-green transition-colors"
                        >
                          {showPreview ? '[./hide_preview]' : '[./show_preview]'}
                        </button>
                      )}
                    </div>

                    {/* Preview — mounts only when toggled, so the GIF loads on demand */}
                    <AnimatePresence initial={false}>
                      {showPreview && project.image && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-border-subtle/30">
                            <div className="border border-border-subtle overflow-hidden aspect-video">
                              <img
                                src={project.image}
                                alt={`${displayName(project.name)} — demo preview`}
                                className="photo-bw w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </TerminalWindow>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}
