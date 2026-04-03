import { templateMeta } from '@/lib/templates';
import type { TemplateName } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  selected: TemplateName;
  onSelect: (template: TemplateName) => void;
};

export function TemplateGallery({ selected, onSelect }: Props) {
  const templates: TemplateName[] = ['modern', 'minimal', 'corporate', 'creative'];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {templates.map((template) => {
        const meta = templateMeta[template];
        const isSelected = template === selected;
        return (
          <button
            key={template}
            onClick={() => onSelect(template)}
            className={cn(
              'text-left rounded-[24px] border p-4 transition duration-200',
              isSelected ? 'border-ink bg-ink text-paper shadow-soft' : 'border-ink/10 bg-white/80 hover:border-ink/25 hover:shadow-soft'
            )}
          >
            <div className={cn('mb-5 h-24 rounded-2xl bg-gradient-to-br', meta.accent)} />
            <p className="text-sm font-semibold">{meta.name}</p>
            <p className={cn('mt-1 text-sm leading-6', isSelected ? 'text-paper/80' : 'text-ink/65')}>{meta.description}</p>
          </button>
        );
      })}
    </div>
  );
}