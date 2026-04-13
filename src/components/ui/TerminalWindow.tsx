import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
  highlighted?: boolean
  animate?: boolean
}

const variants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function TerminalWindow({
  title = 'terminal',
  children,
  className = '',
  highlighted = false,
  animate = false,
}: TerminalWindowProps) {
  return (
    <motion.div
      variants={animate ? variants : undefined}
      className={[
        'bg-surface border border-border-subtle flex flex-col',
        highlighted ? 'card-highlighted' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-bg-deep/70 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-[10px] text-text-secondary tracking-widest uppercase truncate">
          {title}
        </span>
      </div>

      {/* Content slot */}
      <div className="p-5 flex-1 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
