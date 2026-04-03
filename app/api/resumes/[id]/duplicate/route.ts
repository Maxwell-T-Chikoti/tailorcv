import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { toRecord, toStableUuid, type ResumeRow } from '../../shared';

type DuplicatePayload = {
  userId: string;
};

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const params = await context.params;
  const payload = await request.json() as DuplicatePayload;
  const profileId = toStableUuid(payload.userId);

  const source = await supabaseAdmin
    .from('resumes')
    .select('id,user_id,title,template,content,created_at,updated_at')
    .eq('id', params.id)
    .eq('user_id', profileId)
    .single();

  if (source.error || !source.data) {
    return NextResponse.json({ error: source.error?.message || 'Resume not found.' }, { status: 404 });
  }

  const now = new Date().toISOString();
  const cloned = await supabaseAdmin
    .from('resumes')
    .insert({
      id: crypto.randomUUID(),
      user_id: profileId,
      title: `${source.data.title} Copy`,
      template: source.data.template,
      content: source.data.content,
      created_at: now,
      updated_at: now
    })
    .select('id,user_id,title,template,content,created_at,updated_at')
    .single();

  if (cloned.error || !cloned.data) {
    return NextResponse.json({ error: cloned.error?.message || 'Failed to duplicate resume.' }, { status: 500 });
  }

  return NextResponse.json(toRecord(cloned.data as ResumeRow));
}
