"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2, Sparkles, Target } from 'lucide-react';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await loginUser(email, password);
      router.push('/dashboard');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to log in.');
    }
  };

  return (
    <main className="page-shell relative min-h-[78vh] py-10">
      <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative grid items-stretch gap-6 rounded-[34px] border border-white/45 bg-white/65 p-4 backdrop-blur-md lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
        <section className="rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 p-7 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
            <Image src="/logo.png" alt="TailorCV" width={28} height={28} className="h-7 w-7 rounded-md bg-white/90 p-0.5" />
            TailorCV
          </Link>
          <h1 className="display-font mt-6 text-4xl font-semibold leading-tight">Welcome back to your interview engine.</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/88">
            Continue tailoring role-specific CVs, track opportunities, and keep your applications sharp for every submission.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'AI-powered CV tailoring in seconds',
              'ATS optimization insights on every draft',
              'Export polished templates ready to submit'
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-white/12 px-3 py-2.5">
                <CheckCircle2 size={16} className="mt-0.5" />
                <p className="text-sm text-white/95">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/80">Average match</p>
              <p className="mt-1 text-2xl font-bold">85%</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/80">Users helped</p>
              <p className="mt-1 text-2xl font-bold">10k+</p>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="glass-panel rounded-[28px] p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TailorCV" width={36} height={36} className="h-9 w-9" />
              <span className="display-font text-xl font-semibold">TailorCV</span>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Secure Login</span>
          </div>

          <h2 className="display-font text-4xl font-semibold">Log in</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">Pick up exactly where you left off.</p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink/70">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/70">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Log in <Target size={16} />
            </button>
            <Link href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-blue-600">
              Create an account <Sparkles size={15} />
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}