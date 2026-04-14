export type SkillStatus = 'active' | 'recent' | 'archived'
export type SkillGroup = 'frontend' | 'backend' | 'cloud_infra'

export interface Skill {
  name: string
  usedIn: string[]   // matches ExperienceEntry.id values
  years: number
  status: SkillStatus
  group: SkillGroup
}

export const skillsData: Record<SkillGroup, Skill[]> = {
  frontend: [
    { name: 'React', usedIn: ['instaleap', 'aditi', 'whirlpool', 'freelance'], years: 6, status: 'active', group: 'frontend' },
    { name: 'NextJS', usedIn: ['whirlpool', 'freelance'], years: 3, status: 'active', group: 'frontend' },
    { name: 'TypeScript', usedIn: ['instaleap', 'aditi', 'whirlpool'], years: 3, status: 'active', group: 'frontend' },
    { name: 'VTEX IO & Faststore', usedIn: ['whirlpool'], years: 3, status: 'active', group: 'frontend' },
    { name: 'TailwindCSS', usedIn: ['freelance'], years: 2, status: 'active', group: 'frontend' },
    { name: 'Vue.js', usedIn: ['cidenet', 'freelance'], years: 3, status: 'recent', group: 'frontend' },
  ],
  backend: [
    { name: 'Node.js', usedIn: ['cidenet', 'aditi', 'freelance'], years: 4, status: 'active', group: 'backend' },
    { name: 'NestJS', usedIn: ['cidenet', 'freelance'], years: 2, status: 'recent', group: 'backend' },
    { name: 'Fastify', usedIn: ['resolvit'], years: 1, status: 'recent', group: 'backend' },
    { name: 'GraphQL', usedIn: ['whirlpool', 'instaleap'], years: 4, status: 'recent', group: 'backend' },
    { name: 'RabbitMQ', usedIn: ['aditi'], years: 1, status: 'archived', group: 'backend' },
  ],
  cloud_infra: [
    { name: 'AWS', usedIn: ['freelance', 'aditi', 'instaleap'], years: 2, status: 'active', group: 'cloud_infra' },
    { name: 'GCP', usedIn: ['cidenet'], years: 2, status: 'recent', group: 'cloud_infra' },
    { name: 'Docker', usedIn: ['freelance'], years: 1, status: 'active', group: 'cloud_infra' },
    { name: 'Firestore', usedIn: ['cidenet'], years: 1, status: 'archived', group: 'cloud_infra' },
    { name: 'MongoDB', usedIn: ['freelance'], years: 2, status: 'recent', group: 'cloud_infra' },
    { name: 'Postgres', usedIn: ['freelance'], years: 4, status: 'recent', group: 'cloud_infra' }
  ],
}
