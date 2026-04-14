export interface Project {
  id: string
  name: string
  branch: string
  summary: string
  description: string
  tech: string[]
  status: 'active' | 'wip' | 'archived'
  media: string | null
  repo: string | null
  access: 'request' | 'public' | null
  commitHash: string,
  liveUrl?: string,
}

export const projectsData: Project[] = [
  {
    id: 'terra-azul-web',
    name: 'terra-azul-web',
    branch: 'feature/terra-azul',
    summary: 'Landing page for a Bogotá architecture & construction firm — built for search from the ground up.',
    description: 'A production Next.js site engineered for SEO from day one. SSR throughout, JSON-LD schema markup, auto-generated sitemap, and dedicated pages per service and project — every route designed to rank.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'JSON-LD', 'SSR'],
    status: 'active',
    media: null,
    repo: 'public',
    access: 'public',
    commitHash: 'd5a8f2g',
    liveUrl: "https://terra-azul-web-git-feature-design-17e258-danielniebles-projects.vercel.app/"
  },
  {
    id: 'english-adventure',
    name: 'english-adventure',
    branch: 'feature/ed',
    summary: 'AI-powered kahoot-like platform for elementary school language teachers.',
    description:
      'A session-based learning platform where teachers run live language games powered by AI. Built for classrooms, designed for engagement.',
    tech: ['NextJS', 'Express', 'OpenAI', 'TypeScript'],
    status: 'active',
    media: '/english-adventure.gif',
    repo: null,
    access: 'request',
    commitHash: 'c4a8f2e',
  },
  {
    id: 'aec-project-hub',
    name: 'aec-project-hub',
    branch: 'feature/aec',
    summary: 'Project management hub for AEC — APUs, quotations, and invoices in one place.',
    description:
      'End-to-end project tracking for architecture and construction firms. Handles budget breakdowns, quote generation, and invoice management.',
    tech: ['NextJS', 'NestJS', 'TypeScript', 'AuroraDB', 'TailwindCSS'],
    status: 'active',
    media: null,
    repo: null,
    access: 'request',
    commitHash: 'b2e7d1f',
  },
  {
    id: 'finance-lab',
    name: 'finance-lab',
    branch: 'feature/fl',
    summary: 'Personal finance tracker with Money Lover sync — expenses, installments and loans.',
    description:
      'A modular finance dashboard that connects to Money Lover and adds what it lacks — installment tracking, loan management, and a clear picture of where money actually goes.',
    tech: ['NextJS', 'Postgres', 'TypeScript', 'TailwindCSS'],
    status: 'active',
    media: 'https://3am315i8bl0hrb68.public.blob.vercel-storage.com/finance-lab.mp4',
    repo: null,
    access: 'request',
    commitHash: 'd5f3e1a',
  },
]
