export type TemplateName = 'modern' | 'minimal' | 'corporate' | 'creative';

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  year: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  link?: string;
};

export type ResumeData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
};

export type ResumeRecord = {
  id: string;
  userId: string;
  title: string;
  template: TemplateName;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
};

export type UserAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SessionUser = Pick<UserAccount, 'id' | 'name' | 'email'>;

export type TailorResult = {
  summary: string;
  keywords: string[];
  tailoredSkills: string[];
  tailoredExperience: string[];
  coverLetter: string;
};