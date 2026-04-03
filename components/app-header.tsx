"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { logoutUser } from '@/lib/auth';

export function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getSessionUser>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessionUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
  };

  return (
    <header className="page-shell flex items-center justify-between py-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="TailorCV" width={40} height={40} className="h-10 w-10" />
        <span className="display-font text-2xl font-semibold tracking-tight">TailorCV</span>
      </Link>
      <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-ink/75">
        {!loading && !user ? (
          <>
            <Link href="/business">Business</Link>
            <Link href="/who-we-are">Who we are</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/login" className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 transition hover:border-ink/20 hover:bg-white">
              Log in
            </Link>
            <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-paper transition hover:bg-ink/90">
              Get started for free
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/templates">Templates</Link>
            <Link href="/dashboard/job-matcher">AI Matcher</Link>
            <button type="button" onClick={() => handleLogout().catch(() => undefined)} className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 transition hover:border-ink/20 hover:bg-white">
              Log out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}