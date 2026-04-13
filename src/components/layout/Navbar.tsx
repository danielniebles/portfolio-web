import { SECTION_IDS } from '../../lib/constants'

const navLinks = [
  { label: 'about',      href: `#${SECTION_IDS.about}` },
  { label: 'experience', href: `#${SECTION_IDS.experience}` },
  { label: 'stack',      href: `#${SECTION_IDS.stack}` },
  { label: 'contact',    href: `#${SECTION_IDS.contact}` },
]

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 h-16 bg-bg-deep/95 backdrop-blur-sm border-b border-border-subtle/40 shadow-[0_0_15px_rgba(0,255,135,0.04)]">
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto h-full">

        {/* Logo */}
        <a href="#" className="flex items-center font-mono font-bold text-lg tracking-tighter text-text-primary hover:text-terminal-green transition-colors">
          DANIEL_FELIPE
          <span className="text-text-secondary mx-1.5">|</span>
          <span className="text-terminal-green animate-blink">_</span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-sm text-text-primary/60 hover:text-terminal-green transition-colors hover:bg-surface px-2 py-1"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={`#${SECTION_IDS.contact}`}
          className="font-mono text-sm font-bold bg-terminal-green text-bg-deep px-4 py-1.5 hover:scale-95 transition-transform duration-100"
        >
          [contact_me]
        </a>
      </div>
    </header>
  )
}
