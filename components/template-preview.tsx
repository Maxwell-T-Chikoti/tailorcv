'use client';

import type { ResumeData, TemplateName } from '@/lib/types';
import { ModernTemplate } from './templates/modern-template';
import { MinimalTemplate } from './templates/minimal-template';
import { CorporateTemplate } from './templates/corporate-template';
import { CreativeTemplate } from './templates/creative-template';

type Props = {
  data: ResumeData;
  template: TemplateName;
  compact?: boolean;
  id?: string;
};

export function TemplatePreview({ data, template, id }: Props) {
  switch (template) {
    case 'modern':
      return <ModernTemplate data={data} id={id} />;
    case 'minimal':
      return <MinimalTemplate data={data} id={id} />;
    case 'corporate':
      return <CorporateTemplate data={data} id={id} />;
    case 'creative':
      return <CreativeTemplate data={data} id={id} />;
    default:
      const _exhaustive: never = template;
      return _exhaustive;
  }
}