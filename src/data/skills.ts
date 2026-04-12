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
    { name: 'React',            usedIn: ['instaleap', 'resolvit', 'whirlpool', 'cidenet', 'freelance', 'colombia-telecom'], years: 4, status: 'active',   group: 'frontend' },
    { name: 'Vue.js',           usedIn: ['cidenet', 'freelance'],                                                            years: 3, status: 'recent',   group: 'frontend' },
    { name: 'TypeScript',       usedIn: ['instaleap', 'resolvit', 'whirlpool'],                                              years: 3, status: 'active',   group: 'frontend' },
    { name: 'VTEX IO',          usedIn: ['whirlpool'],                                                                       years: 1, status: 'active',   group: 'frontend' },
    { name: 'TailwindCSS',      usedIn: ['freelance'],                                                                       years: 2, status: 'active',   group: 'frontend' },
  ],
  backend: [
    { name: 'Node.js',          usedIn: ['cidenet', 'resolvit', 'freelance'],                                                years: 4, status: 'active',   group: 'backend' },
    { name: 'NestJS',           usedIn: ['cidenet', 'freelance'],                                                            years: 2, status: 'recent',   group: 'backend' },
    { name: 'Fastify',          usedIn: ['resolvit'],                                                                        years: 1, status: 'recent',   group: 'backend' },
    { name: 'GraphQL',          usedIn: ['instaleap'],                                                                       years: 2, status: 'recent',   group: 'backend' },
    { name: 'RabbitMQ',         usedIn: ['resolvit'],                                                                        years: 1, status: 'archived', group: 'backend' },
  ],
  cloud_infra: [
    { name: 'AWS',              usedIn: ['whirlpool', 'resolvit'],                                                           years: 2, status: 'active',   group: 'cloud_infra' },
    { name: 'GCP',              usedIn: ['instaleap'],                                                                       years: 2, status: 'recent',   group: 'cloud_infra' },
    { name: 'Docker',           usedIn: ['whirlpool'],                                                                       years: 1, status: 'active',   group: 'cloud_infra' },
    { name: 'Firestore',        usedIn: ['cidenet'],                                                                         years: 1, status: 'archived', group: 'cloud_infra' },
    { name: 'MongoDB',          usedIn: ['freelance'],                                                                       years: 2, status: 'recent',   group: 'cloud_infra' },
  ],
}
