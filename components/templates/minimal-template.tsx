import type { ResumeData } from '@/lib/types';

type Props = {
  data: ResumeData;
  id?: string;
};

export function MinimalTemplate({ data, id }: Props) {
  return (
    <article id={id} className="overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-soft p-6">
      {/* Clean minimal header */}
      <header className="mb-7">
        <h1 className="display-font text-4xl font-light text-ink">{data.name}</h1>
        <p className="mt-1 text-sm font-light text-ink/60">{data.title}</p>
        <p className="mt-4 text-xs tracking-wide text-ink/50">{data.email} · {data.phone} · {data.location}</p>
      </header>

      {/* Minimal separator */}
      <div className="mb-6 h-px bg-ink/10" />

      {/* Simple summary */}
      <p className="mb-8 leading-relaxed text-sm text-ink/75">{data.summary}</p>

      {/* Single column, minimal styling */}
      <div className="space-y-8">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="display-font text-lg font-light text-ink/80 mb-4 tracking-wide">EXPERIENCE</h2>
            <div className="space-y-5">
              {data.experience.map((item) => (
                <div key={`${item.company}-${item.role}`}>
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="font-medium text-ink">{item.role}</p>
                    <p className="text-xs text-ink/50">{item.start}–{item.end}</p>
                  </div>
                  <p className="text-sm text-ink/60 mb-2">{item.company}</p>
                  <ul className="space-y-1 text-sm text-ink/70">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>—&nbsp;{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="display-font text-lg font-light text-ink/80 mb-4 tracking-wide">EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map((item) => (
                <div key={`${item.school}-${item.year}`}>
                  <p className="font-medium text-ink">{item.school}</p>
                  <p className="text-sm text-ink/60">{item.degree} — {item.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="display-font text-lg font-light text-ink/80 mb-4 tracking-wide">SKILLS</h2>
            <p className="text-sm text-ink/70 leading-relaxed">{data.skills.join(' · ')}</p>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="display-font text-lg font-light text-ink/80 mb-4 tracking-wide">PROJECTS</h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.name}>
                  <p className="font-medium text-ink">{project.name}</p>
                  <p className="text-sm text-ink/70 mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
