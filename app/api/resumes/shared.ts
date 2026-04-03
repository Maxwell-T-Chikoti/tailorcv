import type { ResumeData, ResumeRecord, TemplateName } from '@/lib/types';

export type ResumeRow = {
  id: string;
  user_id: string;
  title: string;
  template: string;
  content: ResumeData;
  created_at: string;
  updated_at: string;
};

function toHex(input: string) {
  return Array.from(new TextEncoder().encode(input))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function toStableUuid(input: string) {
  if (isUuid(input)) return input;
  const raw = toHex(input).padEnd(32, '0').slice(0, 32);
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20, 32)}`;
}

export function toRecord(row: ResumeRow): ResumeRecord {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    template: row.template as TemplateName,
    data: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
