"use client";

import { Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ResumeData, TemplateName } from '@/lib/types';
import { defaultResume } from '@/lib/templates';
import { TemplateGallery } from '@/components/template-gallery';
import { TemplatePreview } from '@/components/template-preview';

type Props = {
  initialData?: ResumeData;
  initialTemplate?: TemplateName;
  initialTitle?: string;
  onSave: (payload: { title: string; template: TemplateName; data: ResumeData }) => void;
};

export function ResumeEditor({ initialData = defaultResume, initialTemplate = 'modern', initialTitle = 'Untitled CV', onSave }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [template, setTemplate] = useState<TemplateName>(initialTemplate);
  const [data, setData] = useState<ResumeData>(initialData);

  const skillsText = useMemo(() => data.skills.join(', '), [data.skills]);

  const updateExperience = (index: number, key: keyof ResumeData['experience'][number], value: string) => {
    setData((current) => {
      const experience = [...current.experience];
      experience[index] = { ...experience[index], [key]: value };
      return { ...current, experience };
    });
  };

  const updateHighlight = (expIndex: number, highlightIndex: number, value: string) => {
    setData((current) => {
      const experience = [...current.experience];
      const highlights = [...experience[expIndex].highlights];
      highlights[highlightIndex] = value;
      experience[expIndex] = { ...experience[expIndex], highlights };
      return { ...current, experience };
    });
  };

  const addExperience = () => {
    setData((current) => ({
      ...current,
      experience: [...current.experience, { company: '', role: '', start: '', end: '', highlights: [''] }]
    }));
  };

  const removeExperience = (index: number) => {
    setData((current) => ({
      ...current,
      experience: current.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setData((current) => ({
      ...current,
      education: [...current.education, { school: '', degree: '', year: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setData((current) => ({
      ...current,
      education: current.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setData((current) => ({ ...current, projects: [...current.projects, { name: '', description: '', link: '' }] }));
  };

  const removeProject = (index: number) => {
    setData((current) => ({
      ...current,
      projects: current.projects.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setData((current) => ({
      ...current,
      skills: [...current.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setData((current) => ({
      ...current,
      skills: current.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setData((current) => {
      const skills = [...current.skills];
      skills[index] = value;
      return { ...current, skills };
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="glass-panel rounded-[28px] p-6">
          <label className="block text-sm font-semibold text-ink/70">CV title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-ink/30"
          />
          <label className="mt-5 block text-sm font-semibold text-ink/70">Choose a template</label>
          <div className="mt-3">
            <TemplateGallery selected={template} onSelect={setTemplate} />
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <h2 className="display-font text-2xl font-semibold">Personal details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(['name', 'title', 'email', 'phone', 'location'] as const).map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-semibold text-ink/70 capitalize">{field}</span>
                <input
                  value={data[field]}
                  onChange={(event) => setData({ ...data, [field]: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-ink/30"
                />
              </label>
            ))}
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-ink/70">Summary</span>
            <textarea
              rows={4}
              value={data.summary}
              onChange={(event) => setData({ ...data, summary: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-ink/30"
            />
          </label>
        </div>

        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-font text-2xl font-semibold">Experience</h2>
            <button type="button" onClick={addExperience} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">
              <Plus size={16} /> Add role
            </button>
          </div>
          <div className="space-y-4">
            {data.experience.map((experience, index) => (
              <div key={`${index}-${experience.company}`} className="rounded-[24px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="grid gap-3 flex-1 md:grid-cols-2">
                    <input value={experience.company} onChange={(event) => updateExperience(index, 'company', event.target.value)} placeholder="Company" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <input value={experience.role} onChange={(event) => updateExperience(index, 'role', event.target.value)} placeholder="Role" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <input value={experience.start} onChange={(event) => updateExperience(index, 'start', event.target.value)} placeholder="Start" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <input value={experience.end} onChange={(event) => updateExperience(index, 'end', event.target.value)} placeholder="End" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                  </div>
                  <button type="button" onClick={() => removeExperience(index)} className="mt-1 p-2 text-coral hover:bg-coral/10 rounded-xl transition">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {experience.highlights.map((highlight, highlightIndex) => (
                    <input
                      key={highlightIndex}
                      value={highlight}
                      onChange={(event) => updateHighlight(index, highlightIndex, event.target.value)}
                      placeholder={`Highlight ${highlightIndex + 1}`}
                      className="w-full rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-font text-2xl font-semibold">Skills</h2>
            <button type="button" onClick={addSkill} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">
              <Plus size={16} /> Add skill
            </button>
          </div>
          <div className="space-y-2">
            {data.skills.map((skill, index) => (
              <div key={`skill-${index}`} className="flex gap-2 items-center">
                <input
                  value={skill}
                  onChange={(event) => updateSkill(index, event.target.value)}
                  placeholder="Enter skill"
                  className="flex-1 rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none"
                />
                <button type="button" onClick={() => removeSkill(index)} className="p-2 text-coral hover:bg-coral/10 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-font text-2xl font-semibold">Education</h2>
            <button type="button" onClick={addEducation} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">
              <Plus size={16} /> Add education
            </button>
          </div>
          <div className="space-y-3">
            {data.education.map((education, index) => (
              <div key={`${education.school}-${index}`} className="flex gap-2 items-start">
                <div className="grid gap-3 flex-1 md:grid-cols-3">
                  <input value={education.school} onChange={(event) => {
                    const next = [...data.education];
                    next[index] = { ...education, school: event.target.value };
                    setData({ ...data, education: next });
                  }} placeholder="School" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none" />
                  <input value={education.degree} onChange={(event) => {
                    const next = [...data.education];
                    next[index] = { ...education, degree: event.target.value };
                    setData({ ...data, education: next });
                  }} placeholder="Degree" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none" />
                  <input value={education.year} onChange={(event) => {
                    const next = [...data.education];
                    next[index] = { ...education, year: event.target.value };
                    setData({ ...data, education: next });
                  }} placeholder="Year" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none" />
                </div>
                <button type="button" onClick={() => removeEducation(index)} className="mt-1 p-2 text-coral hover:bg-coral/10 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-font text-2xl font-semibold">Projects</h2>
            <button type="button" onClick={addProject} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">
              <Plus size={16} /> Add project
            </button>
          </div>
          {data.projects.map((project, index) => (
            <div key={`${project.name}-${index}`} className="rounded-[24px] border border-ink/10 bg-white p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="grid gap-3 flex-1 md:grid-cols-2">
                  <input value={project.name} onChange={(event) => {
                    const next = [...data.projects];
                    next[index] = { ...project, name: event.target.value };
                    setData({ ...data, projects: next });
                  }} placeholder="Project name" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                  <input value={project.link || ''} onChange={(event) => {
                    const next = [...data.projects];
                    next[index] = { ...project, link: event.target.value };
                    setData({ ...data, projects: next });
                  }} placeholder="Link" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                </div>
                <button type="button" onClick={() => removeProject(index)} className="mt-1 p-2 text-coral hover:bg-coral/10 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
              <textarea value={project.description} onChange={(event) => {
                const next = [...data.projects];
                next[index] = { ...project, description: event.target.value };
                setData({ ...data, projects: next });
              }} placeholder="Description" className="w-full min-h-28 rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onSave({ title, template, data })}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink/90"
        >
          Save CV
        </button>
      </div>

      <div className="lg:sticky lg:top-6 lg:h-fit">
        <div className="glass-panel rounded-[28px] p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Live preview</p>
          <TemplatePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}