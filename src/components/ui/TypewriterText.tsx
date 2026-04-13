import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterTextProps {
  text: string
  speed?: number
  startDelay?: number
  showCursor?: boolean
  cursorChar?: string
  className?: string
}

export function TypewriterText({
  text,
  speed,
  startDelay,
  showCursor = true,
  cursorChar = '_',
  className = '',
}: TypewriterTextProps) {
  const { displayText, isDone } = useTypewriter({ text, speed, startDelay })

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={['text-terminal-green', isDone ? 'animate-blink' : 'opacity-100'].join(' ')}>
          {cursorChar}
        </span>
      )}
    </span>
  )
}
