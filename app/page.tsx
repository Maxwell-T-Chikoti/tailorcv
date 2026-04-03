import Link from 'next/link';
import { ArrowRight, BadgeCheck, FileText, Sparkles, Upload } from 'lucide-react';
import { TemplatePreview } from '@/components/template-preview';
import { defaultResume } from '@/lib/templates';

export default function HomePage() {
  return (
    <main className="page-shell pb-20">
      <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
        <div className="space-y-7">
          <span className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-medium text-ink/70 shadow-sm">
            TailorCV for fast, polished job applications
          </span>
          <div className="space-y-5">
            <h1 className="display-font max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl">
              Build CVs that track the job, not the other way around.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/70 md:text-xl">
              Create multiple CVs, switch between modern templates, paste a job description, and generate a tailored CV plus a matching cover letter in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink/90">
              Start free <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-white">
              Explore dashboard
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Auth-ready', 'Log in, save profiles, and organize multiple CVs.'],
              ['AI matching', 'Rewrite experience and extract keywords from job posts.'],
              ['PDF export', 'Download polished output with one click.']
            ].map(([title, copy]) => (
              <div key={title} className="glass-panel rounded-[24px] p-4">
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-6 rounded-[36px] bg-coral/10 blur-3xl" />
          <div className="relative glass-panel rounded-[36px] p-4">
            <TemplatePreview data={defaultResume} template="modern" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          [Upload, 'Import your background', 'Capture personal details, work history, skills, education, and projects in a structured JSON model.'],
          [Sparkles, 'Tailor with AI', 'Paste the job description and generate keyword-rich CV and cover letter drafts.'],
          [FileText, 'Reuse templates', 'Create modern, minimal, corporate, and creative versions of the same profile.'],
          [BadgeCheck, 'Ship faster', 'Keep versions organized, duplicate winners, and export a clean PDF for each application.']
        ].map(([Icon, title, copy]) => (
          <article key={title as string} className="glass-panel rounded-[28px] p-6">
            <Icon className="text-coral" size={24} />
            <h2 className="mt-4 text-lg font-semibold">{title as string}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">{copy as string}</p>
          </article>
        ))}
      </section>
    </main>
  );
}