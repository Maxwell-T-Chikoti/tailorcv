"use client";

import { useEffect } from 'react';
import { Bot, Brain, HeartHandshake, Sparkles, UserRound } from 'lucide-react';

const values = [
  {
    title: 'Clarity',
    description: 'Simple guidance and clean layouts so your strengths are easy to spot in seconds.',
    icon: Brain
  },
  {
    title: 'Intelligence',
    description: 'AI that augments your decisions, instead of replacing your voice and judgment.',
    icon: Sparkles
  },
  {
    title: 'Accessibility',
    description: 'Professional-quality tools that are intuitive for first-time applicants and experts alike.',
    icon: HeartHandshake
  }
];

const timeline = [
  {
    year: '2024',
    title: 'The problem became obvious',
    copy: 'We saw talented people rejected because formatting and keyword mismatches buried their potential.'
  },
  {
    year: '2025',
    title: 'TailorCV beta launched',
    copy: 'Early users tested our first AI tailoring engine and helped shape the template system.'
  },
  {
    year: '2026',
    title: '10k+ job seekers supported',
    copy: 'TailorCV now helps thousands of candidates create targeted applications with confidence.'
  }
];

export default function WhoWeArePage() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('translate-y-4', 'opacity-0');
          entry.target.classList.add('translate-y-0', 'opacity-100');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-shell relative overflow-hidden py-16">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-coral/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-sky/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(26,43,61,0.04)_1px,transparent_1px)] [background-size:18px_18px]" />

      <section data-reveal className="relative rounded-[32px] border border-white/55 bg-white/65 p-8 opacity-0 backdrop-blur-md transition duration-700">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Who We Are</p>
        <h1 className="display-font mt-3 text-4xl font-semibold leading-tight md:text-5xl">
          We believe your potential should never be hidden by a bad layout.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-ink/75">
          TailorCV was built by people who have felt the stress of job searching firsthand. We combine practical hiring knowledge with AI assistance so your application stays clear, authentic, and competitive.
        </p>
      </section>

      <section className="relative mt-10 grid gap-6 md:grid-cols-3">
        <article data-reveal className="rounded-[28px] border border-ink/10 bg-white/70 p-6 opacity-0 backdrop-blur-md transition duration-700 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Mission & Vision</p>
          <h2 className="mt-4 text-3xl font-semibold">Human confidence, AI precision.</h2>
          <p className="mt-4 max-w-3xl text-ink/75 leading-7">
            We are designing a future where every candidate can submit a focused, role-specific CV without wrestling with formatting or guessing what recruiters want.
          </p>
        </article>

        <article data-reveal className="rounded-[28px] border border-ink/10 bg-white/70 p-6 opacity-0 backdrop-blur-md transition duration-700">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Fun Fact</p>
          <p className="mt-4 text-4xl font-bold text-ink">500+</p>
          <p className="mt-2 text-sm text-ink/70">CVs improved by our users this year.</p>
        </article>

        <article data-reveal className="rounded-[28px] border border-ink/10 bg-white/70 p-6 opacity-0 backdrop-blur-md transition duration-700 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Core Values</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-ink/10 bg-white p-4">
                <Icon size={22} className="text-coral" />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section data-reveal className="relative mt-12 rounded-[28px] border border-ink/10 bg-white/70 p-8 opacity-0 backdrop-blur-md transition duration-700">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/45">Why We Started</p>
        <div className="relative mt-6 space-y-6 border-l-2 border-dashed border-ink/18 pl-7">
          {timeline.map((item) => (
            <article key={item.year} className="relative">
              <span className="absolute -left-[34px] top-1.5 h-3.5 w-3.5 rounded-full bg-coral" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/45">{item.year}</p>
              <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/72">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className="relative mt-12 grid gap-6 rounded-[28px] border border-ink/10 bg-white/70 p-8 opacity-0 backdrop-blur-md transition duration-700 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-semibold">Built for humans.</h2>
          <p className="mt-4 max-w-2xl text-ink/75 leading-7">
            TailorCV is intentionally designed so AI does the repetitive heavy lifting while you keep control of the message, tone, and story. Your experience stays human; your execution gets smarter.
          </p>
        </div>

        <div className="relative rounded-2xl border border-ink/10 bg-white p-5">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-coral/10" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-ink/45">AI + Human Balance</p>
          <div className="relative mt-5 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky/15 text-ink">
              <UserRound size={28} />
            </div>
            <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-sky to-coral" />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/15 text-ink">
              <Bot size={28} />
            </div>
          </div>
          <p className="relative mt-4 text-center text-sm text-ink/70">Human strategy + AI precision = stronger applications.</p>
        </div>
      </section>
    </main>
  );
}
