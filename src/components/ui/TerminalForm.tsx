import { useState, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

type FormStep = 'name' | 'email' | 'message' | 'submitting' | 'done'

const fieldVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const PROCESS_LINES = [
  '> Encrypting payload...',
  '> Establishing secure channel...',
  '> Handshake complete.',
  '> Locating recipient...',
  '> ✓ Message delivered. Connection closed.',
]

export function TerminalForm() {
  const [step, setStep]     = useState<FormStep>('name')
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [processLines, setProcessLines] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const advance = (from: 'name' | 'email') => {
    if (!values[from].trim()) return
    setStep(from === 'name' ? 'email' : 'message')
    // Focus the next field after the transition renders
    setTimeout(() => {
      if (from === 'name') inputRef.current?.focus()
      else textareaRef.current?.focus()
    }, 80)
  }

  const handleSubmit = async () => {
    if (!values.message.trim()) return
    setStep('submitting')
    setProcessLines([])

    for (const line of PROCESS_LINES) {
      await new Promise<void>((r) => setTimeout(r, 650))
      setProcessLines((prev) => [...prev, line])
    }

    await new Promise<void>((r) => setTimeout(r, 800))
    setStep('done')
  }

  const onKeyDown = (
    e: React.KeyboardEvent,
    field: 'name' | 'email' | 'message',
  ) => {
    if (e.key === 'Enter' && field !== 'message') {
      e.preventDefault()
      advance(field as 'name' | 'email')
    }
    if (e.key === 'Enter' && e.ctrlKey && field === 'message') {
      handleSubmit()
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-border-subtle focus:border-terminal-green text-text-primary outline-none py-1.5 caret-terminal-green transition-colors placeholder:text-text-secondary/40 font-mono text-sm'

  return (
    <div className="font-mono text-sm space-y-6">
      {/* Terminal header line */}
      <p className="text-text-secondary text-xs">
        <span className="text-terminal-green">daniel@portfolio</span>
        <span className="text-text-secondary">:~$ </span>
        <span className="text-text-primary">initiate_connection</span>
      </p>
      <p className="text-text-secondary text-xs">
        Gathering communication parameters...
      </p>

      {/* 01 — Name */}
      <AnimatePresence>
        <motion.div key="name" variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block font-mono text-xs text-terminal-green uppercase mb-2 tracking-widest">
            01_Identity
          </label>
          {step === 'name' ? (
            <input
              ref={inputRef}
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              onKeyDown={(e) => onKeyDown(e, 'name')}
              className={inputClass}
              placeholder="Full Name..."
            />
          ) : (
            <p className="text-text-primary py-1.5 text-sm border-b border-border-subtle/30">
              {values.name}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 02 — Email */}
      {step !== 'name' && (
        <AnimatePresence>
          <motion.div key="email" variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block font-mono text-xs text-terminal-green uppercase mb-2 tracking-widest">
              02_Endpoint
            </label>
            {step === 'email' ? (
              <input
                ref={inputRef}
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onKeyDown={(e) => onKeyDown(e, 'email')}
                className={inputClass}
                placeholder="email@server.com"
              />
            ) : (
              <p className="text-text-primary py-1.5 text-sm border-b border-border-subtle/30">
                {values.email}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* 03 — Message */}
      {(step === 'message' || step === 'submitting' || step === 'done') && (
        <AnimatePresence>
          <motion.div key="message" variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block font-mono text-xs text-terminal-green uppercase mb-2 tracking-widest">
              03_Payload{' '}
              <span className="text-text-secondary normal-case">
                (Ctrl+Enter to send)
              </span>
            </label>
            {step === 'message' ? (
              <>
                <textarea
                  ref={textareaRef}
                  rows={4}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  onKeyDown={(e) => onKeyDown(e, 'message')}
                  className="w-full bg-transparent border border-border-subtle focus:border-terminal-green text-text-primary outline-none p-2 caret-terminal-green resize-none transition-colors placeholder:text-text-secondary/40 font-mono text-sm"
                  placeholder="Enter message text here..."
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full py-3 border border-terminal-green text-terminal-green font-mono font-bold tracking-widest hover:bg-terminal-green hover:text-bg-deep transition-all flex items-center justify-center gap-2 text-sm"
                >
                  [TRANSMIT_MESSAGE ▶]
                </button>
              </>
            ) : (
              <p className="text-text-primary py-1.5 text-sm whitespace-pre-wrap border-b border-border-subtle/30">
                {values.message}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Process animation */}
      {step === 'submitting' && (
        <div className="space-y-1 text-xs">
          {processLines.map((line, i) => (
            <motion.p
              key={i}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className={line.includes('✓') ? 'text-terminal-green' : 'text-text-secondary'}
            >
              {line}
            </motion.p>
          ))}
        </div>
      )}

      {/* Done */}
      {step === 'done' && (
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="text-terminal-green text-xs"
        >
          {'>'} Connection terminated. Talk soon.
        </motion.p>
      )}
    </div>
  )
}
