import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const payload = await request.json() as RegisterPayload;
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password || '';

  if (!name || !email || password.length < 6) {
    return NextResponse.json({ error: 'Provide name, email, and a password with at least 6 characters.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: name }
  });

  if (error || !data.user) {
    const message = error?.message || 'Unable to create account.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  await supabaseAdmin.from('profiles').upsert(
    {
      id: data.user.id,
      email,
      full_name: name
    },
    { onConflict: 'id' }
  );

  return NextResponse.json({ ok: true });
}
