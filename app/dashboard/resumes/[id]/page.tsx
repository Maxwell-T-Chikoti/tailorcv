"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeEditor } from '@/components/resume-editor';
import { PdfExportButton } from '@/components/pdf-export-button';
import { TemplatePreview } from '@/components/template-preview';
import { getSessionUser } from '@/lib/auth';
import { getResume, saveResume } from '@/lib/resume-store';
import type { ResumeRecord } from '@/lib/types';

export default function ResumeDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [resume, setResume] = useState<ResumeRecord | null>(null);

  useEffect(() => {
    getSessionUser().then((user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      getResume(params.id, user.id)
        .then((item) => setResume(item))
        .catch(() => setResume(null));
    });
  }, [params.id, router]);

  if (!resume) {
    return (
      <main className="page-shell pb-16">
        <section className="glass-panel rounded-[32px] p-8">Resume not found.</section>
      </main>
    );
  }

  return (
    <main className="page-shell pb-16">
      <section className="glass-panel rounded-[32px] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Edit CV</p>
            <h1 className="display-font mt-3 text-4xl font-semibold md:text-5xl">{resume.title}</h1>
          </div>
          <PdfExportButton targetId="resume-preview" fileName={`${resume.title}.pdf`} />
        </div>
      </section>

      <div className="mt-8 space-y-8">
        <ResumeEditor
          initialData={resume.data}
          initialTemplate={resume.template}
          initialTitle={resume.title}
          onSave={async ({ title, template, data }) => {
            const user = await getSessionUser();
            if (!user) return;
            const saved = await saveResume({
              id: resume.id,
              userId: user.id,
              userName: user.name,
              userEmail: user.email,
              title,
              template,
              data
            });
            setResume(saved);
          }}
        />
        <div className="glass-panel rounded-[28px] p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Printable preview</p>
          <TemplatePreview id="resume-preview" data={resume.data} template={resume.template} />
        </div>
      </div>
    </main>
  );
}