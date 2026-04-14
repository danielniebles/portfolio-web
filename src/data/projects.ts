export interface Project {
  id: string
  name: string
  branch: string
  summary: string
  description: string
  tech: string[]
  status: 'active' | 'wip' | 'archived'
  image: string | null
  repo: string | null
  access: 'request' | 'public' | null
  commitHash: string
}

export const projectsData: Project[] = [
  {
    id: 'english-adventure',
    name: 'english-adventure',
    branch: 'feature/ed',
    summary: 'AI-powered kahoot-like platform for elementary school language teachers.',
    description:
      'A session-based learning platform where teachers run live language games powered by AI. Built for classrooms, designed for engagement.',
    tech: ['React', 'Node.js', 'OpenAI', 'TypeScript'],
    status: 'active',
    image: '/english-adventure.gif',
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
    tech: ['Vue 3', 'NestJS', 'TypeScript', 'MongoDB'],
    status: 'active',
    image: null,
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
    tech: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    status: 'active',
    image: null,
    repo: null,
    access: 'request',
    commitHash: 'd5f3e1a',
  },
]
