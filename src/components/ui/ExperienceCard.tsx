import { forwardRef } from 'react'
import { TerminalWindow } from './TerminalWindow'
import type { ExperienceEntry } from '../../data/experience'

interface ExperienceCardProps {
  entry: ExperienceEntry
  isHighlighted?: boolean
  className?: string
}

// forwardRef so the carousel can obtain a DOM ref for scroll targeting
export const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  ({ entry, isHighlighted = false, className = '' }, ref) => (
    <div ref={ref} className={`h-full ${className}`}>
      <TerminalWindow
        title={`~/${entry.id}.sh`}
        highlighted={isHighlighted}
        className="h-full"
      >
        <pre className="whitespace-pre-wrap text-xs leading-6 overflow-auto">
          <span className="text-text-secondary">{`// ${entry.company} — ${entry.period}\n`}</span>
          <span className="text-terminal-green">const </span>
          <span className="text-text-primary">experience</span>
          <span className="text-text-secondary"> = </span>
          <span className="text-text-secondary">{'{\n'}</span>

          <Field label="role"        value={entry.role} />
          <Field label="period"      value={entry.period} />
          <Field label="location"    value={entry.location} />
          <Field label="description" value={entry.description} />

          <span className="text-accent-dim">{'  highlights'}</span>
          <span className="text-text-secondary">{': [\n'}</span>
          {entry.highlights.map((h, i) => (
            <span key={i}>
              {'    '}
              <span className="text-text-secondary">"</span>
              <span className="text-text-primary">{h}</span>
              <span className="text-text-secondary">",</span>
              {'\n'}
            </span>
          ))}
          <span className="text-text-secondary">{'  ],\n'}</span>

          <span className="text-accent-dim">{'  tech'}</span>
          <span className="text-text-secondary">{': ['}</span>
          {entry.tech.map((t, i) => (
            <span key={i}>
              <span className="text-terminal-green">"{t}"</span>
              {i < entry.tech.length - 1 && <span className="text-text-secondary">, </span>}
            </span>
          ))}
          <span className="text-text-secondary">{']\n'}</span>
          <span className="text-text-secondary">{'}'}</span>
        </pre>
      </TerminalWindow>
    </div>
  )
)

ExperienceCard.displayName = 'ExperienceCard'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span>
      {'  '}
      <span className="text-accent-dim">{label}</span>
      <span className="text-text-secondary">: "</span>
      <span className="text-text-primary">{value}</span>
      <span className="text-text-secondary">",{'\n'}</span>
    </span>
  )
}
