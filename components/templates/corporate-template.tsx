import type { ResumeData } from '@/lib/types';

type Props = {
  data: ResumeData;
  id?: string;
};

export function CorporateTemplate({ data, id }: Props) {
  return (
    <article id={id} className="overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-soft p-8">
      {/* Formal header with box */}
      <div className="mb-8 pb-6 border-b-4 border-ink/20">
        <h1 className="text-3xl font-bold text-ink uppercase tracking-widest">{data.name}</h1>
        <p className="mt-3 text-sm font-semibold text-ink/70 uppercase tracking-wide">{data.title}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-ink/60">
          <span>{data.email}</span>
          <span>|</span>
          <span>{data.phone}</span>
          <span>|</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Professional summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-ink uppercase tracking-widest mb-2">Professional Summary</h2>
          <p className="text-sm leading-6 text-ink/75">{data.summary}</p>
        </section>
      )}

      {/* Experience - traditional format */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((item) => (
              <div key={`${item.company}-${item.role}`} className="mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-bold text-ink">{item.role}</p>
                  <p className="text-xs text-ink/50">{item.start} – {item.end}</p>
                </div>
                <p className="text-sm font-semibold text-ink/80 mb-2">{item.company}</p>
                <ul className="space-y-1 ml-4 text-sm text-ink/70">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two-column section for skills and education */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-3">
              {data.education.map((item) => (
                <div key={`${item.school}-${item.year}`}>
                  <p className="font-semibold text-ink">{item.school}</p>
                  <p className="text-sm text-ink/70">{item.degree}</p>
                  <p className="text-xs text-ink/50">{item.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Core Competencies</h2>
            <ul className="space-y-1">
              {data.skills.map((skill) => (
                <li key={skill} className="text-sm text-ink/75">• {skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mt-8 pt-8 border-t border-ink/10">
          <h2 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.name}>
                <p className="font-semibold text-ink">{project.name}</p>
                <p className="text-sm text-ink/70 mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
