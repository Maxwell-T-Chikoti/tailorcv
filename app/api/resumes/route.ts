import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import type { ResumeData, TemplateName } from '@/lib/types';
import { toRecord, toStableUuid, type ResumeRow } from './shared';

type SavePayload = {
  id?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  title: string;
  template: TemplateName;
  data: ResumeData;
};

type DeletePayload = {
  id: string;
  userId: string;
};

async function ensureProfile(userId: string, userName?: string, userEmail?: string) {
  if (!supabaseAdmin) return;
  const profileId = toStableUuid(userId);

  await supabaseAdmin
    .from('profiles')
    .upsert(
      {
        id: profileId,
        full_name: userName || 'TailorCV User',
        email: userEmail || `${userId}@tailorcv.local`
      },
      { onConflict: 'id' }
    );
}

export async function GET(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
  }

  const profileId = toStableUuid(userId);
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .select('id,user_id,title,template,content,created_at,updated_at')
    .eq('user_id', profileId)
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data as ResumeRow[]).map(toRecord));
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const payload = await request.json() as SavePayload;

  await ensureProfile(payload.userId, payload.userName, payload.userEmail);

  const profileId = toStableUuid(payload.userId);
  const now = new Date().toISOString();
  const row = {
    id: payload.id,
    user_id: profileId,
    title: payload.title,
    template: payload.template,
    content: payload.data,
    updated_at: now
  };

  const { data, error } = payload.id
    ? await supabaseAdmin
        .from('resumes')
        .update(row)
        .eq('id', payload.id)
        .eq('user_id', profileId)
        .select('id,user_id,title,template,content,created_at,updated_at')
        .single()
    : await supabaseAdmin
        .from('resumes')
      .insert({ ...row, id: crypto.randomUUID(), created_at: now })
        .select('id,user_id,title,template,content,created_at,updated_at')
        .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(toRecord(data as ResumeRow));
}

export async function DELETE(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const payload = await request.json() as DeletePayload;
  const profileId = toStableUuid(payload.userId);
  const { error } = await supabaseAdmin
    .from('resumes')
    .delete()
    .eq('id', payload.id)
    .eq('user_id', profileId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
