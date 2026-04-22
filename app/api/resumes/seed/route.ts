import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { toStableUuid } from '../shared';

type SeedPayload = {
  userId: string;
  userName?: string;
  userEmail?: string;
};

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
  }

  const payload = await request.json() as SeedPayload;
  const profileId = toStableUuid(payload.userId);
  const email = payload.userEmail || `${payload.userId}@tailorcv.local`;

  const { data: existingProfile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('id', profileId)
    .single();

  if (existingProfile) {
    // Profile exists, update it
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name: payload.userName || 'TailorCV User',
        email
      })
      .eq('id', profileId);

    if (updateError) {
      return NextResponse.json({ error: `Failed to update profile: ${updateError.message}` }, { status: 500 });
    }
  } else {
    // Profile doesn't exist, create it
    const { error: insertError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: profileId,
        full_name: payload.userName || 'TailorCV User',
        email
      });

    if (insertError) {
      return NextResponse.json({ error: `Failed to create profile: ${insertError.message}` }, { status: 500 });
    }
  }

  const existingResumes = await supabaseAdmin
    .from('resumes')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', profileId);

  if ((existingResumes.count || 0) > 0) {
    return NextResponse.json({ ok: true, seeded: false });
  }

  const now = new Date().toISOString();
  const { error: insertError } = await supabaseAdmin.from('resumes').insert({
    id: crypto.randomUUID(),
    user_id: profileId,
    title: 'Product Designer CV',
    template: 'modern',
    content: {
      name: 'Maxwell Hart',
      title: 'Product Designer',
      email: 'maxwell@example.com',
      phone: '+1 (555) 014-2910',
      location: 'Berlin, Germany',
      summary: 'Design systems thinker with a record of shipping clear, conversion-focused product experiences.',
      hasExperience: true,
      experience: [
        {
          company: 'Northstar Labs',
          role: 'Senior Product Designer',
          location: 'Berlin, Germany',
          employmentType: 'Full-time',
          start: '2022',
          end: 'Present',
          highlights: ['Led redesign of the onboarding funnel', 'Improved activation by 18%', 'Built a cross-product component system']
        }
      ],
      education: [{ school: 'University of Leeds', degree: 'BA in Graphic Design', year: '2018' }],
      skills: ['Figma', 'Design Systems', 'Accessibility', 'Prototyping', 'UX Writing'],
      projects: [{ name: 'Flowkit', description: 'Internal design system for a distributed SaaS team.' }]
    },
    created_at: now,
    updated_at: now
  });

  if (insertError) {
    return NextResponse.json({ error: `Failed to seed resumes: ${insertError.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, seeded: true });
}
