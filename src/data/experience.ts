export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
  tech: string[]
}

export const experienceData: ExperienceEntry[] = [
  {
    id: 'whirlpool',
    company: 'Whirlpool Corporation',
    role: 'Tech Lead / Frontend Engineer',
    period: '2024 – Present',
    location: 'Remote',
    description: 'Promoted to Tech Lead after one year — now leading the top-of-funnel experience across 8 brands and 6 countries.',
    highlights: [
      'Pioneered a monorepo architecture for multi-brand in VTEX — new ground even for the platform itself.',
      'Integrated a design token system across brands into Faststore components — one codebase, every brand.',
      'Took the first market live last week: 80/20 traffic split to 100% on the new platform in Colombia.',
    ],
    tech: ['VTEX IO', 'Faststore', 'React', 'TypeScript', 'Design Tokens'],
  },
  {
    id: 'aditi',
    company: 'Aditi Consulting',
    role: 'Tech Lead & Fullstack Engineer',
    period: '2022 – 2024',
    location: 'Remote',
    description: 'Two product lines, one team, two agencies, three timezones.',
    highlights: [
      'Shipped a React component library via microfrontend into a legacy .NET shell.',
      'Demo presented at IT Nation 2023 — contributed directly to new license sales.',
      'Managed delivery accountability across a local team and an India-based agency.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Fastify', 'RabbitMQ', 'GraphQL', 'MUI'],
  },
  {
    id: 'instaleap',
    company: 'Instaleap',
    role: 'Frontend Developer',
    period: '2021 – 2022',
    location: 'Medellín',
    description: 'Full customer journey ownership on a white-label ecommerce platform processing 100k+ orders.',
    highlights: [
      'Redesigned the product card using a decorator pattern — one component, fully stylable per brand.',
      'Covered the entire frontend of the site across all steps of the shopping journey.',
      'Delivered features with full test coverage — E2E with Cypress, unit with React Testing Library.',
    ],
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Cypress', 'React Testing Library'],
  },
  {
    id: 'cidenet',
    company: 'Cidenet',
    role: 'Junior Fullstack Developer',
    period: '2021',
    location: 'Medellín',
    description: 'First dev role — built a healthcare CRM from scratch as the bridge from support engineering to software development.',
    highlights: [
      'Implemented a staging-phase CRM for healthcare using Vue 3, NestJS and Firestore.',
      'Wrote API E2E tests with Supertest and unit tests with Jest from day one.',
    ],
    tech: ['Vue 3', 'TypeScript', 'NestJS', 'Firestore'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Fullstack Developer',
    period: '2020 – Present',
    location: 'Remote',
    description: 'Independent client work running in parallel with full-time roles — see Projects.',
    highlights: [
      'Landing pages, internal tools, and platforms for clients across Colombia.',
      'End-to-end ownership — from architecture decisions to production deployment.',
    ],
    tech: ['React', 'Next.js', 'Vue', 'Node.js', 'MongoDB'],
  },
]
