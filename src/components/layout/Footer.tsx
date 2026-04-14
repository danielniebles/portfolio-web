const links = [
  { label: 'GITHUB',   href: 'https://github.com/danielniebles' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/danielniebles' },
  { label: 'TERMINAL', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="w-full py-7 bg-bg-deep border-t border-border-subtle/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
        <p className="font-mono text-xs text-text-primary/40 tracking-widest">
          © 2026 daniel_niebles // root_access.granted
        </p>
        <nav className="flex gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs text-text-primary/40 hover:text-terminal-green transition-colors tracking-widest"
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
