"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerUser(name, email, password);
      router.push('/dashboard');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to create account.');
    }
  };

  return (
    <main className="page-shell relative min-h-[78vh] py-10">
      <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />

      <div className="relative grid items-stretch gap-6 rounded-[34px] border border-white/45 bg-white/65 p-4 backdrop-blur-md lg:grid-cols-[0.95fr_1.05fr] lg:p-6">
        <form onSubmit={handleSubmit} className="glass-panel order-2 rounded-[28px] p-8 lg:order-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TailorCV" width={36} height={36} className="h-9 w-9" />
              <span className="display-font text-xl font-semibold">TailorCV</span>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">Free to start</span>
          </div>

          <h1 className="display-font text-4xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm leading-6 text-ink/65">Set up your workspace and start building winning CVs in minutes.</p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink/70">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/70">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/70">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>
          </div>

          {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
              Create account <Rocket size={16} />
            </button>
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-teal-700">
              I already have an account <Sparkles size={15} />
            </Link>
          </div>
        </form>

        <section className="order-1 rounded-[28px] bg-gradient-to-br from-teal-500 via-sky-500 to-blue-600 p-7 text-white lg:order-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
            <Image src="/logo.png" alt="TailorCV" width={28} height={28} className="h-7 w-7 rounded-md bg-white/90 p-0.5" />
            TailorCV
          </Link>

          <h2 className="display-font mt-6 text-4xl font-semibold leading-tight">Build a CV that gets callbacks.</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/88">
            TailorCV helps you translate your experience into role-matching language with modern templates and intelligent guidance.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Tailor your CV for each job description',
              'Boost ATS compatibility with smart suggestions',
              'Generate polished cover letters in one click'
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-white/12 px-3 py-2.5">
                <CheckCircle2 size={16} className="mt-0.5" />
                <p className="text-sm text-white/95">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/15 p-4">
            <ShieldCheck size={20} />
            <p className="text-sm text-white/95">Secure authentication and cloud-synced resumes powered by Supabase.</p>
          </div>
        </section>
      </div>
    </main>
  );
}