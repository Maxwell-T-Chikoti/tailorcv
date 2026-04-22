import type { ResumeData, TemplateName } from '@/lib/types';

export const templateMeta: Record<TemplateName, { name: string; description: string; accent: string }> = {
  modern: { name: 'Modern', description: 'Bold header, clean spacing, high contrast sections.', accent: 'from-coral to-sky' },
  minimal: { name: 'Minimal', description: 'Quiet layout with emphasis on readability and structure.', accent: 'from-moss to-ink' },
  corporate: { name: 'Corporate', description: 'Formal presentation optimized for recruiters and ATS.', accent: 'from-ink to-sky' },
  creative: { name: 'Creative', description: 'Editorial style with stronger visual hierarchy.', accent: 'from-coral to-moss' }
};

export const defaultResume: ResumeData = {
  name: 'Maxwell Hart',
  title: 'Product Designer',
  email: 'maxwell@example.com',
  phone: '+1 (555) 014-2910',
  location: 'Berlin, Germany',
  summary: 'Design systems thinker with a record of shipping clear, conversion-focused product experiences.',
  hasExperience: true,
  experience: [
    {
      company: 'Northstar Labs',
      role: 'Senior Product Designer',
      location: 'Berlin, Germany',
      employmentType: 'Full-time',
      start: '2022',
      end: 'Present',
      highlights: ['Led redesign of the onboarding funnel', 'Improved activation by 18%', 'Built a cross-product component system']
    },
    {
      company: 'Blue Harbor',
      role: 'Product Designer',
      location: 'London, UK',
      employmentType: 'Full-time',
      start: '2019',
      end: '2022',
      highlights: ['Collaborated with PMs and engineers', 'Simplified enterprise workflows', 'Created user interview synthesis templates']
    }
  ],
  education: [{ school: 'University of Leeds', degree: 'BA in Graphic Design', year: '2018' }],
  skills: ['Figma', 'Design Systems', 'Accessibility', 'Prototyping', 'UX Writing', 'Research Synthesis'],
  projects: [{ name: 'Flowkit', description: 'Internal design system for a distributed SaaS team.' }]
};