import type { User } from '@supabase/supabase-js';
import type { SessionUser } from '@/lib/types';
import { supabase } from '@/lib/supabase';

function mapUser(user: User): SessionUser {
  const fullName = typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : '';
  const name = fullName.trim() || user.email?.split('@')[0] || 'User';
  return {
    id: user.id,
    name,
    email: user.email || ''
  };
}

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const client = assertSupabase();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  return mapUser(data.user);
}

export async function registerUser(name: string, email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email: normalizedEmail, password })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Unable to create account.' }));
    throw new Error(body.error || 'Unable to create account.');
  }

  return loginUser(normalizedEmail, password);
}

export async function loginUser(email: string, password: string) {
  const client = assertSupabase();
  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });

  if (error || !data.user) {
    const message = (error?.message || 'Invalid email or password.').toLowerCase();
    if (message.includes('email rate limit')) {
      throw new Error('Email provider rate limit reached. Please wait a few minutes and try again.');
    }
    if (message.includes('email not confirmed')) {
      throw new Error('Your account email is not confirmed. For development, use a newly created account from the register page.');
    }
    throw new Error(error?.message || 'Invalid email or password.');
  }

  return mapUser(data.user);
}

export async function logoutUser() {
  const client = assertSupabase();
  const { error } = await client.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}