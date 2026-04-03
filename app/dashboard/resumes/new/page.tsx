"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeEditor } from '@/components/resume-editor';
import { getSessionUser } from '@/lib/auth';
import { saveResume } from '@/lib/resume-store';

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    getSessionUser().then((user) => {
      if (!user) {
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <main className="page-shell pb-16">
      <section className="glass-panel rounded-[32px] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Resume builder</p>
        <h1 className="display-font mt-3 text-4xl font-semibold md:text-5xl">Create a new CV.</h1>
      </section>

      <div className="mt-8">
        <ResumeEditor
          onSave={async ({ title, template, data }) => {
            const user = await getSessionUser();
            if (!user) return;
            const saved = await saveResume({
              userId: user.id,
              userName: user.name,
              userEmail: user.email,
              title,
              template,
              data
            });
            router.push(`/dashboard/resumes/${saved.id}`);
          }}
        />
      </div>
    </main>
  );
}