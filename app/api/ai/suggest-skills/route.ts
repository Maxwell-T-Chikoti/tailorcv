import { NextResponse } from 'next/server';
import OpenAI from 'openai';

function fallback(jobTitle: string): { skills: string[] } {
  const jobTitleLower = jobTitle.toLowerCase();
  
  const skillMap: Record<string, string[]> = {
    'designer': ['Figma', 'Ui/Ux Design', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
    'developer': ['JavaScript', 'Modern Web Development', 'Problem Solving', 'Clean Code', 'Git', 'APIs'],
    'manager': ['Leadership', 'Team Management', 'Strategic Planning', 'Communication', 'Project Management', 'Decision Making'],
    'marketing': ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Campaign Management', 'Social Media'],
    'engineer': ['Software Engineering', 'System Design', 'Debugging', 'Performance Optimization', 'Testing', 'Documentation'],
    'analyst': ['Data Analysis', 'SQL', 'Excel', 'Reporting', 'Critical Thinking', 'Problem Solving'],
    'sales': ['Negotiation', 'Communication', 'Customer Relationship', 'Sales Strategy', 'Pipeline Management', 'Forecasting'],
    'support': ['Customer Service', 'Problem Resolution', 'Communication', 'Patience', 'Technical Support', 'Documentation']
  };
  
  for (const [keyword, skills] of Object.entries(skillMap)) {
    if (jobTitleLower.includes(keyword)) {
      return { skills };
    }
  }
  
  return { skills: ['Communication', 'Problem Solving', 'Time Management', 'Teamwork', 'Adaptability', 'Leadership'] };
}

export async function POST(request: Request) {
  const body = await request.json() as { jobTitle: string };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallback(body.jobTitle));
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: 'gpt-4-mini',
    messages: [
      {
        role: 'system',
        content: 'You suggest relevant skills for a job title. Return only valid JSON with a "skills" array containing 6 skill names as strings. Be specific and professional.'
      },
      {
        role: 'user',
        content: `Suggest 6 relevant skills for someone with this job title: ${body.jobTitle}`
      }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content || '{"skills": []}';
  return NextResponse.json(JSON.parse(content) as { skills: string[] });
}
