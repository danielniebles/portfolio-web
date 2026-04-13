import { useState, useEffect } from 'react'
import { TerminalWindow } from './TerminalWindow'

interface Line {
  type: 'cmd' | 'output'
  text: string
}

// Each entry: the command to type + its output lines
const SESSION: Array<{ cmd: string; outputs: string[] }> = [
  {
    cmd:     'whoami',
    outputs: ['daniel_felipe // electronic engineer turned tech lead'],
  },
  {
    cmd:     'pwd',
    outputs: ['/medellín/colombia'],
  },
  {
    cmd:     'uptime',
    outputs: ['7+ years in production'],
  },
  {
    cmd:     'cat current_role.txt',
    outputs: [
      'Tech Lead @ Whirlpool Corporation',
      'Unifying global brands under one platform',
    ],
  },
  {
    cmd:     'ls skills/',
    outputs: ['react/  vtex-io/  nestjs/  aws/  leadership/'],
  },
  {
    cmd:     'ping status',
    outputs: ['● open to interesting problems'],
  },
]

const CHAR_CMD    = 48   // ms per character — commands
const CHAR_OUT    = 20   // ms per character — output
const PRE_TYPE    = 350  // pause on idle prompt before typing starts
const PAUSE_CMD   = 320  // pause after command fully typed, before output
const PAUSE_BLOCK = 1600 // pause after last output line, before next command
const CLEAR_MS    = 320  // fade-out duration on clear

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export function TerminalSession({ className = '' }: { className?: string }) {
  // Lines already committed to history
  const [completedLines, setCompletedLines] = useState<Line[]>([])
  // The line currently being typed (null = brief transition gap)
  const [activeLine, setActiveLine] = useState<{ type: 'cmd' | 'output'; text: string } | null>({
    type: 'cmd',
    text: '',
  })
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      while (!cancelled) {
        // ── Reset to a fresh empty session ──────────────────────────────
        setCompletedLines([])
        setActiveLine({ type: 'cmd', text: '' })
        setIsClearing(false)

        for (const { cmd, outputs } of SESSION) {
          if (cancelled) return

          // Show idle prompt briefly before typing
          setActiveLine({ type: 'cmd', text: '' })
          await sleep(PRE_TYPE)

          // Type command character by character
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled) return
            setActiveLine({ type: 'cmd', text: cmd.slice(0, i) })
            await sleep(CHAR_CMD)
          }

          // Brief pause — "Enter pressed"
          await sleep(PAUSE_CMD)

          // Commit command to history
          setCompletedLines((prev) => [...prev, { type: 'cmd', text: cmd }])
          setActiveLine(null)

          // Type each output line
          for (let oi = 0; oi < outputs.length; oi++) {
            const out = outputs[oi]
            if (cancelled) return

            await sleep(55) // tiny beat before output appears

            for (let i = 0; i <= out.length; i++) {
              if (cancelled) return
              setActiveLine({ type: 'output', text: out.slice(0, i) })
              if (i < out.length) await sleep(CHAR_OUT)
            }

            // Pause between multi-line outputs; none before commit
            if (oi < outputs.length - 1) await sleep(180)
            setCompletedLines((prev) => [...prev, { type: 'output', text: out }])
            setActiveLine(null)
          }

          // Hold before next command
          await sleep(PAUSE_BLOCK)
        }

        // ── Clear flash then loop ────────────────────────────────────────
        setIsClearing(true)
        await sleep(CLEAR_MS + 80) // extra 80ms so fade finishes
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <TerminalWindow title="daniel@portfolio:~$" className={`min-h-[400px] ${className}`}>
      <div
        style={{ transition: `opacity ${CLEAR_MS}ms ease` }}
        className={isClearing ? 'opacity-0' : 'opacity-100'}
      >
        <div className="space-y-[2px] text-xs leading-5 font-mono">

          {/* ── Committed history ───────────────────────────────────────── */}
          {completedLines.map((line, i) => (
            <p key={i} className={line.type === 'output' ? 'text-text-secondary pl-4' : ''}>
              {line.type === 'cmd' && (
                <span className="text-terminal-green select-none mr-1.5">&gt;</span>
              )}
              {line.type === 'output' && line.text.startsWith('●') ? (
                <>
                  <span className="text-terminal-green">●</span>
                  {line.text.slice(1)}
                </>
              ) : (
                line.text
              )}
            </p>
          ))}

          {/* ── Active / currently-typing line ──────────────────────────── */}
          {activeLine !== null && (
            <p className={activeLine.type === 'output' ? 'text-text-secondary pl-4' : ''}>
              {activeLine.type === 'cmd' && (
                <span className="text-terminal-green select-none mr-1.5">&gt;</span>
              )}
              <span className={activeLine.type === 'cmd' ? 'text-text-primary' : ''}>
                {activeLine.text}
              </span>
              <span className="text-terminal-green animate-blink">_</span>
            </p>
          )}

        </div>
      </div>
    </TerminalWindow>
  )
}
