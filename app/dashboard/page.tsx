"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePlus2, FolderOpen, Sparkles, Download, Copy, PencilLine } from 'lucide-react';
import { getSessionUser, logoutUser } from '@/lib/auth';
import { deleteResume, duplicateResume, listResumes, seedDemoResumes } from '@/lib/resume-store';
import type { ResumeRecord } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);

  useEffect(() => {
    const load = async () => {
      const user = await getSessionUser();
      if (!user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);
      setName(user.name);
      await seedDemoResumes(user);
      const items = await listResumes(user.id);
      setResumes(items);
    };

    load().catch(() => setResumes([]));
  }, [router]);

  const refresh = async () => {
    if (!userId) return;
    const items = await listResumes(userId);
    setResumes(items);
  };

  const handleDuplicate = async (id: string) => {
    await duplicateResume(id, userId);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteResume(id, userId);
    await refresh();
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
  };

  return (
    <main className="page-shell pb-16">
      <section className="glass-panel rounded-[32px] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Dashboard</p>
            <h1 className="display-font mt-3 text-4xl font-semibold md:text-5xl">Welcome back, {name || 'creator'}.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">
              Manage versions, duplicate a winning CV, and launch AI tailoring from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleLogout} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">Log out</button>
            <Link href="/dashboard/resumes/new" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">New CV</Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [FolderOpen, 'Saved CVs', `${resumes.length} version${resumes.length === 1 ? '' : 's'} in your workspace`],
          [Sparkles, 'AI Match', 'Paste a job description and generate the tailored draft'],
          [Download, 'PDF Export', 'Render a printable résumé and save it as PDF']
        ].map(([Icon, title, copy]) => (
          <article key={title as string} className="glass-panel rounded-[28px] p-6">
            <Icon size={22} className="text-coral" />
            <h2 className="mt-4 text-lg font-semibold">{title as string}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">{copy as string}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {resumes.map((resume) => (
          <article key={resume.id} className="glass-panel rounded-[28px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/45">{resume.template}</p>
                <h2 className="mt-2 text-2xl font-semibold">{resume.title}</h2>
                <p className="mt-1 text-sm text-ink/60">Updated {formatDate(resume.updatedAt)}</p>
              </div>
              <button onClick={() => handleDelete(resume.id)} className="rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink/70">
                Delete
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/dashboard/resumes/${resume.id}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
                <PencilLine size={16} /> Edit
              </Link>
              <button onClick={() => handleDuplicate(resume.id)} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold">
                <Copy size={16} /> Duplicate
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/templates" className="glass-panel rounded-[28px] p-6 transition hover:-translate-y-1">
          <FilePlus2 size={22} className="text-moss" />
          <h2 className="mt-4 text-lg font-semibold">Template gallery</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">Browse the four core CV templates and preview how each profile renders.</p>
        </Link>
        <Link href="/dashboard/job-matcher" className="glass-panel rounded-[28px] p-6 transition hover:-translate-y-1">
          <Sparkles size={22} className="text-coral" />
          <h2 className="mt-4 text-lg font-semibold">AI job matching</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">Paste a job post and generate a targeted CV plus a cover letter.</p>
        </Link>
        <Link href="/dashboard/resumes/new" className="glass-panel rounded-[28px] p-6 transition hover:-translate-y-1">
          <FolderOpen size={22} className="text-sky" />
          <h2 className="mt-4 text-lg font-semibold">Resume builder</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">Create a new CV from structured sections and save multiple versions.</p>
        </Link>
      </section>
    </main>
  );
}