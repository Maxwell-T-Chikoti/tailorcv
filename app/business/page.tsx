import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, FileCheck2, Sparkles, Target } from 'lucide-react';

const featureCards = [
  {
    title: 'Tailor to Job Description',
    description: 'Paste a role and instantly rewrite your summary, skills, and highlights for better fit.',
    icon: Target,
    span: 'md:col-span-2'
  },
  {
    title: 'ATS Optimization',
    description: 'Get keyword and structure guidance so your CV passes filters and reaches real people.',
    icon: FileCheck2,
    span: 'md:row-span-2'
  },
  {
    title: 'Professional Templates',
    description: 'Switch between polished layouts for creative, corporate, minimal, and modern roles.',
    icon: BriefcaseBusiness,
    span: ''
  },
  {
    title: 'AI Match Meter',
    description: 'Preview how strongly your CV aligns with a target role before you apply.',
    icon: Sparkles,
    span: ''
  }
];

const templateShowcase = ['Modern', 'Minimal', 'Corporate', 'Creative', 'ATS Focus', 'Executive'];

const successBubbles = [
  'Landed an interview at Google in 6 days.',
  'Got 3 callbacks in my first week applying.',
  'Switched careers with a tailored CV + cover letter.',
  'Finally passed ATS filters for product roles.'
];

export default function BusinessPage() {
  return (
    <main className="page-shell relative overflow-hidden py-14">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(26,43,61,0.04)_1px,transparent_1px)] [background-size:18px_18px]" />

      <section className="relative grid gap-8 rounded-[32px] border border-white/55 bg-white/65 p-8 backdrop-blur-md lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">For Job Seekers</p>
          <h1 className="display-font mt-3 max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
            <span className="block">Land your next role with an</span>
            <span className="mt-2 inline-block bg-gradient-to-r from-blue-600 via-teal-500 to-coral bg-clip-text text-transparent">
              AI-tailored CV
            </span>
            <span className="block">that actually gets noticed.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/75 md:text-lg">
            Upload once, tailor for every job, and apply with confidence. TailorCV helps you turn generic resumes into targeted applications that recruiters actually notice.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink/90">
              Get started for free <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard/job-matcher" className="rounded-full border border-ink/15 bg-white/80 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              Try AI match demo
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-2xl font-bold text-ink">85%</p>
              <p className="mt-1 text-sm text-ink/65">average ATS match boost</p>
            </article>
            <article className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-2xl font-bold text-ink">10k+</p>
              <p className="mt-1 text-sm text-ink/65">job seekers supported</p>
            </article>
            <article className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-2xl font-bold text-ink">3x</p>
              <p className="mt-1 text-sm text-ink/65">more interview callbacks</p>
            </article>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/45">Before vs After</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Before</p>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-2/3 rounded bg-ink/15" />
                <div className="h-2 w-1/2 rounded bg-ink/10" />
                <div className="h-2 w-4/5 rounded bg-ink/10" />
                <div className="h-2 w-3/5 rounded bg-ink/10" />
                <div className="h-2 w-2/5 rounded bg-ink/10" />
              </div>
              <p className="mt-4 text-xs text-ink/55">Generic bullets, weak keywords, low role fit.</p>
            </div>

            <div className="rounded-2xl border border-coral/30 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">After TailorCV</p>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-4/5 rounded bg-coral/45" />
                <div className="h-2 w-3/5 rounded bg-sky/40" />
                <div className="h-2 w-5/6 rounded bg-coral/35" />
                <div className="h-2 w-2/3 rounded bg-sky/35" />
                <div className="h-2 w-4/5 rounded bg-coral/35" />
              </div>
              <p className="mt-4 text-xs text-ink/65">Role-specific highlights, clean layout, strong ATS signal.</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-ink/10 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">ATS Match Meter</p>
              <span className="rounded-full bg-moss/15 px-2.5 py-1 text-[11px] font-semibold text-ink">85% Match</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-ink/10">
              <div className="h-1.5 w-[85%] rounded-full bg-gradient-to-r from-sky to-coral" />
            </div>
            <p className="mt-2 text-xs text-ink/60">Senior Developer Role - optimized keywords detected.</p>
          </div>
        </div>
      </section>

      <section className="relative mt-10 rounded-[24px] border border-white/45 bg-white/60 px-6 py-4 backdrop-blur-md">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/45">Users have been hired at</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold tracking-wide text-ink/45">
          <span>GOOGLE</span>
          <span>SHOPIFY</span>
          <span>STRIPE</span>
          <span>MICROSOFT</span>
          <span>AIRBNB</span>
        </div>
      </section>

      <section className="relative mt-10 grid gap-6 md:grid-cols-3">
        {featureCards.map(({ title, description, icon: Icon, span }) => (
          <article
            key={title}
            className={`group rounded-[28px] border border-ink/10 bg-white/70 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-coral/45 hover:shadow-soft ${span}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={24} className="text-coral drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] transition group-hover:text-sky" />
              {title === 'AI Match Meter' ? (
                <span className="rounded-full bg-coral/15 px-2.5 py-1 text-[11px] font-semibold text-ink">Live Score</span>
              ) : null}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>

            {title === 'AI Match Meter' ? (
              <div className="mt-4 h-1.5 rounded-full bg-ink/10">
                <div className="h-1.5 w-1/3 animate-pulse rounded-full bg-coral transition-all duration-500 group-hover:w-[85%]" />
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="relative mt-12 rounded-[28px] border border-ink/10 bg-white/70 p-8 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Template Showcase</p>
          <Link href="/dashboard/templates" className="text-sm font-semibold text-ink/70 hover:text-ink">
            Explore all templates
          </Link>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {templateShowcase.map((template, index) => (
            <article key={template} className="min-w-48 flex-shrink-0 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">{template}</p>
                <span className="text-xs text-ink/45">0{index + 1}</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded bg-ink/20" />
                <div className="h-2 w-2/3 rounded bg-ink/15" />
                <div className="h-2 w-4/5 rounded bg-ink/15" />
                <div className="h-12 rounded bg-gradient-to-br from-paper to-white" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mt-12 rounded-[28px] border border-ink/10 bg-white/70 p-8 backdrop-blur-md">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Success Stories</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {successBubbles.map((quote, idx) => (
            <article key={quote} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4">
              <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-sky/30 to-coral/30" />
              <div>
                <p className="text-sm leading-6 text-ink/75">{quote}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">User #{idx + 1}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
