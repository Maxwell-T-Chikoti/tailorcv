import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ResumeData } from '@/lib/types';

function fallback(resume: ResumeData, jobDescription: string) {
  return {
    coverLetter: `Dear Hiring Team,\n\nI am writing to express interest in this opportunity. My background in ${resume.skills.slice(0, 3).join(', ')} and my work across product delivery make me a strong fit for the role described below.\n\n${jobDescription.slice(0, 320)}\n\nSincerely,\n${resume.name}`
  };
}

export async function POST(request: Request) {
  const body = await request.json() as { resume: ResumeData; jobDescription: string };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallback(body.resume, body.jobDescription));
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'Write a concise, personalized cover letter. Return JSON with a single key coverLetter.' },
      { role: 'user', content: JSON.stringify(body) }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{}';
  return NextResponse.json(JSON.parse(content));
}