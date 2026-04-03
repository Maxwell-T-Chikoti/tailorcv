import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { toRecord, toStableUuid, type ResumeRow } from '../shared';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const params = await context.params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
  }

  const profileId = toStableUuid(userId);
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .select('id,user_id,title,template,content,created_at,updated_at')
    .eq('id', params.id)
    .eq('user_id', profileId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(toRecord(data as ResumeRow));
}
