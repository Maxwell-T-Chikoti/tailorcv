import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ResumeData, TailorResult } from '@/lib/types';

function fallback(resume: ResumeData, jobDescription: string): TailorResult {
  const keywords = Array.from(new Set(jobDescription.toLowerCase().match(/[a-z][a-z-]{2,}/g) || [])).slice(0, 12);
  const tailoredSkills = resume.skills.filter((skill) => keywords.some((keyword) => skill.toLowerCase().includes(keyword)))
    .concat(resume.skills.slice(0, 3))
    .filter((skill, index, array) => array.indexOf(skill) === index)
    .slice(0, 8);

  return {
    summary: `${resume.summary} This version emphasizes the keywords and responsibilities surfaced in the target role.`,
    keywords,
    tailoredSkills: tailoredSkills.length ? tailoredSkills : resume.skills.slice(0, 6),
    tailoredExperience: resume.experience.flatMap((item) => item.highlights).slice(0, 5),
    coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for this role because it aligns with my experience in ${tailoredSkills.slice(0, 3).join(', ') || resume.skills.slice(0, 3).join(', ')}. I have attached a CV tailored to the job description and would welcome the opportunity to discuss how I can contribute.\n\nSincerely,\n${resume.name}`
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
      {
        role: 'system',
        content: 'You tailor CVs and write cover letters optimized for ATS and hiring managers. Return only valid JSON with keys summary, keywords, tailoredSkills, tailoredExperience, coverLetter.'
      },
      {
        role: 'user',
        content: JSON.stringify({ resume: body.resume, jobDescription: body.jobDescription })
      }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{}';
  return NextResponse.json(JSON.parse(content) as TailorResult);
}