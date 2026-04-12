export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  commit: string
  tags: string[]
  note: string
}

export const educationData: EducationEntry[] = [
  {
    id: 'udea',
    institution: 'Universidad de Antioquia',
    degree: 'B.Sc. Electronic Engineering',
    period: '2012 – 2017',
    location: 'Medellín, Colombia',
    commit: 'b67f12a',
    tags: ['HEAD -> master', 'origin/master'],
    note: '/* Root foundation of software paradigms & systems theory */',
  },
  {
    id: 'huawei-seeds',
    institution: 'Huawei Global Seeds for the Future',
    degree: 'Technology & Leadership Program',
    period: '2016',
    location: 'Shenzhen, China',
    commit: 'c88a321',
    tags: ['tag: v1.1.0'],
    note: '/* Intensive training in networking, cloud computing & leadership */',
  },
  {
    id: 'blcu',
    institution: 'Beijing Language & Culture University',
    degree: 'Mandarin Language Studies',
    period: '2016',
    location: 'Beijing, China',
    commit: 'e4f5g6h',
    tags: ['origin/blcu-2016'],
    note: '/* Third language acquired: Mandarin — 普通话 */',
  },
]
