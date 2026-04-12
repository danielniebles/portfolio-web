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
    role: 'Tech Lead / Senior Frontend Engineer',
    period: '2024 – Present',
    location: 'Remote',
    description: 'Leading frontend architecture for enterprise-scale appliance ecosystem platforms.',
    highlights: [
      'Promoted from Senior Dev to Tech Lead within first year',
      'Architected micro-frontend shell with Module Federation',
      'Reduced legacy overhead 40% through modular architecture shifts',
      'Mentoring cross-functional team across 3 time zones',
    ],
    tech: ['React', 'TypeScript', 'VTEX IO', 'Module Federation', 'AWS'],
  },
  {
    id: 'resolvit',
    company: 'Resolvit',
    role: 'ConnectWise Tech Lead & Commio Fullstack Engineer',
    period: '2022 – 2024',
    location: 'Remote',
    description: 'Dual-track role: tech lead on ConnectWise integrations + fullstack on Commio VoIP platform.',
    highlights: [
      'Led ConnectWise PSA integration for managed service providers',
      'Built real-time WebSocket dashboards for Commio call analytics',
      'Introduced component library with Storybook across both products',
      'Delivered 12 production features across 2 product lines',
    ],
    tech: ['React', 'Node.js', 'Fastify', 'GraphQL', 'RabbitMQ', 'TypeScript'],
  },
  {
    id: 'instaleap',
    company: 'Instaleap',
    role: 'Frontend Developer',
    period: '2021 – 2022',
    location: 'Bogotá, Colombia',
    description: 'Developed shopper-side and operator tools for a last-mile logistics SaaS platform.',
    highlights: [
      'Rebuilt order management UI from scratch in 6 weeks',
      'Achieved 98 Lighthouse performance score',
      'Integrated Google Maps Platform with custom clustering',
    ],
    tech: ['React', 'TypeScript', 'GraphQL', 'Google Maps', 'Redux', 'GCP'],
  },
  {
    id: 'cidenet',
    company: 'Cidenet',
    role: 'Fullstack Developer',
    period: '2021',
    location: 'Medellín, Colombia',
    description: 'Delivered fullstack features for nearshore US clients on React + NestJS stack.',
    highlights: [
      'Built accessibility-compliant form library',
      'Contributed to design system token migration',
    ],
    tech: ['React', 'Vue.js', 'NestJS', 'Node.js', 'Firestore'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Full Stack Developer',
    period: '2020 – Present',
    location: 'Remote',
    description: 'Independent projects for startups and SMBs across LATAM and North America.',
    highlights: [
      'Shipped 15+ client projects end-to-end',
      'Specialized in React + Node.js + PostgreSQL + MongoDB stack',
    ],
    tech: ['React', 'Vue.js', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'TailwindCSS'],
  },
  {
    id: 'colombia-telecom',
    company: 'Colombia Telecomunicaciones',
    role: 'Frontend Developer',
    period: '2019 – 2020',
    location: 'Bogotá, Colombia',
    description: 'Built customer-facing web interfaces for Telefónica subsidiary.',
    highlights: [
      'Migrated jQuery legacy app to React',
      'Improved page load time by 60%',
    ],
    tech: ['React', 'JavaScript', 'SASS'],
  },
  {
    id: 'huawei',
    company: 'Huawei',
    role: 'Web Developer / Engineer Trainee',
    period: '2017 – 2019',
    location: 'Shenzhen, China',
    description: 'Worked on internal web tools and training programs at Huawei global HQ.',
    highlights: [
      'Selected for Seeds for the Future global talent program',
      'Developed internal tooling for network operations',
      'Studied Mandarin at Beijing Language & Culture University',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'Java'],
  },
]
