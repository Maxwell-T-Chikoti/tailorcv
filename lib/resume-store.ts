import type { ResumeData, ResumeRecord, SessionUser, TemplateName } from '@/lib/types';

type SaveInput = {
  userId: string;
  userName?: string;
  userEmail?: string;
  title: string;
  template: TemplateName;
  data: ResumeData;
  id?: string;
};

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Request failed.' }));
    throw new Error(body.error || 'Request failed.');
  }

  return response.json() as Promise<T>;
}

export async function listResumes(userId: string) {
  return request<ResumeRecord[]>(`/api/resumes?userId=${encodeURIComponent(userId)}`);
}

export async function getResume(id: string, userId: string) {
  return request<ResumeRecord>(`/api/resumes/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`)
    .catch(() => null);
}

export async function saveResume(input: SaveInput) {
  return request<ResumeRecord>('/api/resumes', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function duplicateResume(id: string, userId: string) {
  return request<ResumeRecord>(`/api/resumes/${encodeURIComponent(id)}/duplicate`, {
    method: 'POST',
    body: JSON.stringify({ userId })
  }).catch(() => null);
}

export async function deleteResume(id: string, userId: string) {
  await request<{ ok: boolean }>('/api/resumes', {
    method: 'DELETE',
    body: JSON.stringify({ id, userId })
  });
}

export async function seedDemoResumes(user: SessionUser) {
  await request<{ ok: boolean; seeded: boolean }>('/api/resumes/seed', {
    method: 'POST',
    body: JSON.stringify({ userId: user.id, userName: user.name, userEmail: user.email })
  });
}