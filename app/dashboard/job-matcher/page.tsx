"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { listResumes } from '@/lib/resume-store';
import type { ResumeRecord, TailorResult } from '@/lib/types';

export default function JobMatcherPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<TailorResult | null>(null);
  const selectedResume = useMemo(() => resumes.find((resume) => resume.id === selectedResumeId) ?? null, [resumes, selectedResumeId]);

  useEffect(() => {
    getSessionUser().then((user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);
      listResumes(user.id)
        .then((items) => {
          setResumes(items);
          setSelectedResumeId(items[0]?.id || '');
        })
        .catch(() => {
          setResumes([]);
          setSelectedResumeId('');
        });
    });
  }, [router]);

  const handleGenerate = async () => {
    if (!selectedResume) return;

    const response = await fetch('/api/ai/tailor', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ resume: selectedResume.data, jobDescription })
    });

    if (!response.ok) {
      throw new Error('Unable to generate tailored content.');
    }

    setResult((await response.json()) as TailorResult);
  };

  return (
    <main className="page-shell pb-16">
      <section className="glass-panel rounded-[32px] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">AI job matching</p>
        <h1 className="display-font mt-3 text-4xl font-semibold md:text-5xl">Paste a job description and tailor a CV around it.</h1>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[28px] p-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink/70">Choose a resume</span>
            <select value={selectedResumeId} onChange={(event) => setSelectedResumeId(event.target.value)} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none">
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>{resume.title}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink/70">Job description</span>
            <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} rows={16} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none" placeholder="Paste the job description here." />
          </label>
          <button onClick={() => handleGenerate().catch(() => undefined)} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">Generate match</button>
        </div>

        <div className="space-y-6">
          <section className="glass-panel rounded-[28px] p-6">
            <h2 className="text-lg font-semibold">Tailored output</h2>
            {result ? (
              <div className="mt-4 space-y-4 text-sm leading-6 text-ink/72">
                <div>
                  <p className="font-semibold text-ink">Summary</p>
                  <p className="mt-1">{result.summary}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Keywords</p>
                  <p className="mt-1">{result.keywords.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Skills</p>
                  <p className="mt-1">{result.tailoredSkills.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Experience prompts</p>
                  <ul className="mt-1 space-y-1">
                    {result.tailoredExperience.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-ink/60">Your tailored summary and cover letter will appear here.</p>
            )}
          </section>
          <section className="glass-panel rounded-[28px] p-6">
            <h2 className="text-lg font-semibold">Cover letter</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink/72">{result?.coverLetter || 'Generate a matching cover letter from the same job description.'}</p>
          </section>
        </div>
      </div>
    </main>
  );
}