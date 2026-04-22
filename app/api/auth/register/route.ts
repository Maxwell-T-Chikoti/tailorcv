import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { toStableUuid } from '@/app/api/resumes/shared';

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

  const profileId = toStableUuid(data.user.id);
  const { data: existing } = await supabaseAdmin.from('profiles').select('id').eq('id', profileId).single();

  if (existing) {
    // Profile exists, update it
    const { error: updateError } = await supabaseAdmin.from('profiles').update({
      email,
      full_name: name
    }).eq('id', profileId);

    if (updateError) {
      return NextResponse.json({ error: `Failed to update profile: ${updateError.message}` }, { status: 500 });
    }
  } else {
    // Profile doesn't exist, create it
    const { error: insertError } = await supabaseAdmin.from('profiles').insert({
      id: profileId,
      email,
      full_name: name
    });

    if (insertError) {
      return NextResponse.json({ error: `Failed to create profile: ${insertError.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
