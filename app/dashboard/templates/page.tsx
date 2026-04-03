"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateGallery } from '@/components/template-gallery';
import { TemplatePreview } from '@/components/template-preview';
import { defaultResume } from '@/lib/templates';
import type { TemplateName } from '@/lib/types';
import { getSessionUser } from '@/lib/auth';

export default function TemplatesPage() {
  const router = useRouter();
  const [template, setTemplate] = useState<TemplateName>('modern');

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
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Templates</p>
        <h1 className="display-font mt-3 text-4xl font-semibold md:text-5xl">Choose a visual language for each application.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">Each template is a reusable React rendering strategy, so the same data can be presented differently for the role and company.</p>
      </section>

      <div className="mt-8 space-y-8">
        <TemplateGallery selected={template} onSelect={setTemplate} />
        <TemplatePreview data={defaultResume} template={template} />
      </div>
    </main>
  );
}