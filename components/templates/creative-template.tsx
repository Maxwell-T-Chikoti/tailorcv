import type { ResumeData } from '@/lib/types';

type Props = {
  data: ResumeData;
  id?: string;
};

export function CreativeTemplate({ data, id }: Props) {
  return (
    <article id={id} className="overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-soft p-8">
      {/* Colorful header with accent bar */}
      <div className="mb-8 pb-6">
        <div className="mb-4 flex gap-1">
          <div className="h-3 w-3 rounded-full bg-coral" />
          <div className="h-3 w-3 rounded-full bg-sky" />
          <div className="h-3 w-3 rounded-full bg-moss" />
          <div className="h-3 w-3 rounded-full bg-sand" />
        </div>
        <h1 className="text-4xl font-bold text-ink mb-1">{data.name}</h1>
        <p className="text-lg font-semibold bg-gradient-to-r from-coral to-sky bg-clip-text text-transparent">
          {data.title}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink/70">
          <span>{data.email}</span>
          <span className="text-sky">•</span>
          <span>{data.phone}</span>
          <span className="text-sky">•</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Summary with coral accent */}
      {data.summary && (
        <section className="mb-8 pl-4 border-l-4 border-coral">
          <p className="text-sm leading-6 text-ink/75 italic">{data.summary}</p>
        </section>
      )}

      {/* Experience with color-coded sections */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-6 bg-gradient-to-r from-coral to-sky" />
            <h2 className="text-sm font-bold text-ink uppercase tracking-widest">Experience</h2>
          </div>
          <div className="space-y-6">
            {data.experience.map((item, idx) => (
              <div key={`${item.company}-${item.role}`} className="relative pl-6">
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-sky" />
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-bold text-ink">{item.role}</p>
                  <p className="text-xs font-medium text-sky">{item.start} – {item.end}</p>
                </div>
                <p className="text-sm font-semibold text-ink/80 mb-2">{item.company}</p>
                <ul className="space-y-1 text-sm text-ink/70">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>⊳ {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Three-column grid for skills, education, and projects */}
      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {/* Skills with colored tag headers */}
        {data.skills.length > 0 && (
          <section>
            <div className="mb-4 inline-block bg-coral/10 px-3 py-1 rounded-full">
              <h2 className="text-xs font-bold text-coral uppercase tracking-widest">Skills</h2>
            </div>
            <ul className="space-y-2">
              {data.skills.slice(0, 6).map((skill) => (
                <li key={skill} className="text-sm text-ink/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education with colored tag header */}
        {data.education.length > 0 && (
          <section>
            <div className="mb-4 inline-block bg-sky/10 px-3 py-1 rounded-full">
              <h2 className="text-xs font-bold text-sky uppercase tracking-widest">Education</h2>
            </div>
            <div className="space-y-3">
              {data.education.map((item) => (
                <div key={`${item.school}-${item.year}`}>
                  <p className="font-semibold text-ink text-sm">{item.school}</p>
                  <p className="text-xs text-ink/70">{item.degree}</p>
                  <p className="text-xs text-sky font-medium">{item.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects with colored tag header */}
        {data.projects.length > 0 && (
          <section>
            <div className="mb-4 inline-block bg-moss/10 px-3 py-1 rounded-full">
              <h2 className="text-xs font-bold text-moss uppercase tracking-widest">Projects</h2>
            </div>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((project) => (
                <div key={project.name}>
                  <p className="font-semibold text-ink text-sm">{project.name}</p>
                  <p className="text-xs text-ink/70 line-clamp-2">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Decorative footer with color accent */}
      <div className="pt-6 border-t-2 border-ink/5 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="h-1 w-8 rounded-full bg-coral" />
          <div className="h-1 w-8 rounded-full bg-sky" />
          <div className="h-1 w-8 rounded-full bg-moss" />
        </div>
        <p className="text-xs text-ink/40 font-medium">Crafted CV</p>
      </div>
    </article>
  );
}
