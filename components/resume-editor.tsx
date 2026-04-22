"use client";

import { Plus, Trash2, CalendarDays, Sparkles } from 'lucide-react';
import { useMemo, useState, useRef, useEffect } from 'react';
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
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const dateRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const skillsText = useMemo(() => data.skills.join(', '), [data.skills]);

  const fetchSuggestedSkills = async (jobTitle: string) => {
    if (!jobTitle.trim()) {
      setSuggestedSkills([]);
      return;
    }
    
    setLoadingSuggestions(true);
    try {
      const response = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle })
      });
      
      if (response.ok) {
        const result = await response.json() as { skills: string[] };
        // Filter out skills already added
        const newSkills = result.skills.filter(skill => !data.skills.includes(skill));
        setSuggestedSkills(newSkills);
      }
    } catch (error) {
      console.error('Failed to fetch skill suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Debounce skill suggestions - fetch when any job title changes
  useEffect(() => {
    const latestJobTitle = data.experience[data.experience.length - 1]?.role || '';
    const debounceTimer = setTimeout(() => {
      if (latestJobTitle) {
        fetchSuggestedSkills(latestJobTitle);
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [data.experience.map(e => e.role).join(','), data.skills]);

  const openDatePicker = (refKey: string) => {
    const input = dateRefs.current[refKey];
    if (input) input.showPicker();
  };

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
      experience: [...current.experience, { company: '', role: '', location: '', employmentType: '', start: '', end: '', highlights: [''] }]
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!data.hasExperience}
                onChange={(event) => setData({ ...data, hasExperience: !event.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-ink/70">Never been employed</span>
            </label>
          </div>
          {data.hasExperience ? (
            <>
              <div className="flex items-center gap-2 mb-2">
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
                    <input value={experience.role} onChange={(event) => updateExperience(index, 'role', event.target.value)} placeholder="Job Title" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <input value={experience.location} onChange={(event) => updateExperience(index, 'location', event.target.value)} placeholder="Location" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <input value={experience.employmentType} onChange={(event) => updateExperience(index, 'employmentType', event.target.value)} placeholder="Full-time, Part-time, etc" className="rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 outline-none" />
                    <div className="relative">
                      <input
                        ref={(el) => { dateRefs.current[`exp-${index}-start`] = el; }}
                        type="date"
                        value={experience.start}
                        onChange={(event) => updateExperience(index, 'start', event.target.value)}
                        placeholder="Start date"
                        className="date-picker-input w-full rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 pr-10 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => openDatePicker(`exp-${index}-start`)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink/70 hover:text-ink transition"
                      >
                        <CalendarDays size={18} />
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        ref={(el) => { dateRefs.current[`exp-${index}-end`] = el; }}
                        type="date"
                        value={experience.end}
                        onChange={(event) => updateExperience(index, 'end', event.target.value)}
                        placeholder="End date"
                        className="date-picker-input w-full rounded-2xl border border-ink/10 bg-paper/50 px-4 py-3 pr-10 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => openDatePicker(`exp-${index}-end`)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink/70 hover:text-ink transition"
                      >
                        <CalendarDays size={18} />
                      </button>
                    </div>
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
            </>
          ) : (
            <p className="text-sm text-ink/60 italic">You've indicated you have no work experience. You can still add skills, education, and projects to your CV.</p>
          )}
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
          
          {suggestedSkills.length > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-sky/5 border border-sky/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-sky-600" />
                <p className="text-sm font-semibold text-ink/70">Suggested skills based on your jobs:</p>
                {loadingSuggestions && <span className="text-xs text-ink/50">Loading...</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      setData({ ...data, skills: [...data.skills, skill] });
                      setSuggestedSkills(suggestedSkills.filter(s => s !== skill));
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-200 transition"
                  >
                    <Plus size={14} /> {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
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