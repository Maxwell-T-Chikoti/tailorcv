import type { ResumeData } from '@/lib/types';

type Props = {
  data: ResumeData;
  id?: string;
};

export function ModernTemplate({ data, id }: Props) {
  return (
    <article id={id} className="overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-soft p-6">
      {/* Bold gradient header */}
      <div className="mb-6 pb-6 border-b-2 border-coral/30">
        <div className="mb-4 h-1.5 w-32 bg-gradient-to-r from-coral to-sky rounded-full" />
        <h1 className="display-font text-5xl font-bold text-ink">{data.name}</h1>
        <p className="mt-2 text-lg font-semibold text-coral">{data.title}</p>
        <p className="mt-3 text-sm text-ink/65">{data.email} · {data.phone} · {data.location}</p>
      </div>

      {/* Summary in highlight box */}
      <div className="mb-6 p-4 bg-gradient-to-br from-coral/10 to-sky/10 rounded-xl border border-coral/20">
        <p className="text-sm leading-6 text-ink/80">{data.summary}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {/* Main content (left, wider) */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="display-font text-2xl font-semibold text-ink mb-4">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((item) => (
                  <div key={`${item.company}-${item.role}`} className="border-l-4 border-coral/40 pl-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-bold text-ink">{item.role}</p>
                        <p className="text-sm font-medium text-coral">{item.company}</p>
                      </div>
                      <p className="text-xs text-ink/50 font-medium whitespace-nowrap">{item.start}–{item.end}</p>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-ink/70">• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="display-font text-2xl font-semibold text-ink mb-4">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.name} className="border-l-4 border-sky/40 pl-4">
                    <p className="font-bold text-ink">{project.name}</p>
                    <p className="text-sm text-ink/70 mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (right) */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-sky/10 border border-sky/30 rounded-full text-xs font-medium text-ink/80">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">Education</h3>
              <div className="space-y-3">
                {data.education.map((item) => (
                  <div key={`${item.school}-${item.year}`} className="p-3 bg-sand/40 rounded-lg border border-sand/60">
                    <p className="font-semibold text-sm text-ink">{item.school}</p>
                    <p className="text-xs text-ink/70 mt-1">{item.degree}, {item.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
