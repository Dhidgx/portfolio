import Link from "next/link";
import { AgentSchematic } from "@/components/AgentSchematic";
import { button } from "@/components/button";
import { Chips } from "@/components/Chips";
import { CopyEmail } from "@/components/CopyEmail";
import { Pipeline } from "@/components/Pipeline";
import { Section } from "@/components/Section";
import { SkillIcon } from "@/components/SkillIcon";
import { education, roles } from "@/lib/experience";
import { getProject, projects, type Project } from "@/lib/projects";
import { facts, research, site, skills } from "@/lib/site";

export default function Home() {
  const researchProject = getProject(research.slug);
  if (!researchProject) throw new Error(`research.slug "${research.slug}" doesn't match a project in lib/projects.ts`);

  return (
    <>
      <section
        data-hero
        aria-labelledby="hero-heading"
        className="on-dark relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div aria-hidden="true" className="blueprint-grid fade-down absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-page items-center gap-14 px-6 pb-20 pt-[calc(var(--header-h)+3rem)] sm:px-8 lg:min-h-[85svh] lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-[calc(var(--header-h)+2rem)]">
          <div className="lg:col-span-6">
            <p className="inline-flex min-h-9 items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 text-small text-white/85">
              <span aria-hidden="true" className="size-2 rounded-full bg-sky ring-4 ring-sky/20" />
              Available now for remote work
            </p>
            <h1 id="hero-heading" className="mt-6 max-w-[17ch] text-display font-bold text-balance">
              I build LLM agents, RAG pipelines and the web apps people use them through.
            </h1>
            <p className="mt-6 max-w-[54ch] text-white/75 lg:text-card lg:leading-normal lg:tracking-normal">
              AI engineer working in Python, FastAPI and Next.js. I&apos;ve built multi-agent systems for business
              workflows and computer vision for a US healthcare-facilities client, and I&apos;m finishing an MS in
              Computer Science at UET Lahore.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className={button("solidOnNavy")}>
                See my work
              </a>
              <a href={site.resume} download className={button("outlineOnNavy")}>
                Download resume
              </a>
            </div>
          </div>
          <div className="max-w-[34rem] lg:col-span-6 lg:max-w-none lg:pl-4">
            <AgentSchematic />
          </div>
        </div>
      </section>

      <Section id="about" title="About">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-[64ch] space-y-5 lg:col-span-7">
            <p>
              I&apos;m Mudassar, an AI engineer based in Lahore. I like owning a feature from start to finish: the
              model or agent, the Python API that serves it, and the interface someone actually clicks.
            </p>
            <p>
              So far that has meant multi-agent assistants and RAG at Webevis Technologies, Django and FastAPI apps at
              Globex IT Solutions and ViSigma Apparel Group, and computer vision and speech work at InvoZone.
            </p>
            <p>
              Alongside work I&apos;m doing an MS in Computer Science at UET Lahore. My research looks at how
              adaptive assessment systems can decide whom to ask to verify their results without treating some
              learners unfairly.
            </p>
          </div>
          <dl className="on-dark self-start rounded-2xl bg-navy-900 p-7 text-white sm:p-8 lg:col-span-5">
            {facts.map((f) => (
              <div key={f.term} className="grid gap-1 border-t border-navy-600 py-5 first:border-t-0 first:pt-0 last:pb-0">
                <dt className="text-small text-white/70">{f.term}</dt>
                <dd className="font-semibold leading-snug">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="experience" title="Experience" tone="ice">
        <ol className="max-w-4xl">
          {roles.map((role) => (
            <TimelineItem key={role.title} dates={role.dates}>
              <h3 className="text-card font-bold">{role.title}</h3>
              <p className="mt-1 font-medium text-slate">{role.company}</p>
              <p className="mt-3 max-w-[60ch]">{role.summary}</p>
            </TimelineItem>
          ))}
          <TimelineItem dates={education.dates} quiet last>
            <h3 className="font-semibold">{education.degree}</h3>
            <p className="mt-1 text-slate">{education.school}</p>
          </TimelineItem>
        </ol>
      </Section>

      <Section
        id="projects"
        title="Featured projects"
        intro="Four things I've built, from client systems to research. Each card shows the project's pipeline, from input to output."
      >
        <div className="space-y-8 md:space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} flip={i % 2 === 1} />
          ))}
        </div>
        <p className="mt-12 text-slate">
          Smaller builds and practice projects are on{" "}
          <a
            href={site.github}
            className="-my-2.5 inline-block rounded-sm py-2.5 font-semibold text-accent underline underline-offset-4 hover:text-navy-900"
          >
            GitHub
          </a>
          .
        </p>
      </Section>

      <section id="research" aria-labelledby="research-heading" className="on-dark bg-navy-900 text-white">
        <div className="mx-auto grid max-w-page gap-8 px-6 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="text-small font-semibold text-sky">{research.label}</p>
            <h2 id="research-heading" className="mt-3 text-section font-bold text-balance">
              {researchProject.title}
            </h2>
            <p className="mt-5 max-w-[60ch] text-white/75">{researchProject.summary}</p>
            <p className="mt-3 font-medium">{research.status}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href={`/projects/${researchProject.slug}/`}
              aria-label={`Read the case study: ${researchProject.title}`}
              className={button("solidOnNavy")}
            >
              Read the case study
            </Link>
          </div>
        </div>
      </section>

      <Section id="skills" title="Skills" intro="The tools I've built with." tone="ice">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {skills.map((s, i) => (
            <li key={s.group} className={`rounded-2xl border border-line bg-white p-7 ${skillSpan(i, skills.length)}`}>
              <div className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-sky">
                  <SkillIcon name={s.icon} className="size-6" />
                </span>
                <h3 className="text-card font-bold">{s.group}</h3>
              </div>
              <Chips items={s.items} className="mt-5" />
            </li>
          ))}
        </ul>
      </Section>

      <section id="contact" aria-labelledby="contact-heading" className="on-dark bg-navy-900 text-white">
        <div className="mx-auto max-w-page px-6 py-24 sm:px-8 md:py-32">
          <h2 id="contact-heading" className="max-w-[16ch] text-display font-bold text-balance">
            Hiring for AI or Python work?
          </h2>
          <p className="mt-6 max-w-[56ch] text-white/75 lg:text-card lg:leading-normal lg:tracking-normal">
            I&apos;m available now for remote contract and full-time roles with teams in the US and Canada. Email is
            the fastest way to reach me.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className={button("solidOnNavy")}>
              Email me
            </a>
            <a href={site.linkedin} className={button("outlineOnNavy")}>
              LinkedIn
            </a>
            <a href={site.github} className={button("outlineOnNavy")}>
              GitHub
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-navy-600 pt-8">
            <p className="font-medium text-white/90">{site.email}</p>
            <CopyEmail email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}

// One entry on the Experience timeline. Phones: marker, then dates above the title.
// From 768px: dates in a left column, the line and marker in the middle, details on the right.
function TimelineItem({
  dates,
  quiet = false,
  last = false,
  children,
}: {
  dates: string;
  quiet?: boolean;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[11rem_2rem_minmax(0,1fr)] md:gap-x-6 ${
        last ? "" : "pb-12"
      }`}
    >
      {!last && (
        <span
          aria-hidden="true"
          className="absolute -bottom-3.5 left-[calc(0.875rem-1px)] top-3.5 w-0.5 bg-navy-900 md:left-[calc(13.5rem-1px)]"
        />
      )}
      <span
        aria-hidden="true"
        className={`relative col-start-1 row-start-1 justify-self-center rounded-full md:col-start-2 ${
          quiet ? "mt-2 size-3 border-2 border-navy-600 bg-ice" : "mt-1.5 size-4 border-[3px] border-navy-900 bg-white"
        }`}
      />
      <p className="col-start-2 row-start-1 text-small font-medium text-slate md:col-start-1 md:pt-0.5 md:text-right">
        {dates}
      </p>
      <div className={`col-start-2 mt-1 md:col-start-3 md:row-start-1 md:mt-0 ${quiet ? "text-ink/90" : ""}`}>
        {children}
      </div>
    </li>
  );
}

// Text on one side, the pipeline diagram on the other; the sides swap on every other card.
// The whole card is one link target, through the "Read the case study" link stretched over it.
function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      className={`relative grid overflow-hidden rounded-2xl border border-line bg-white focus-within:border-accent focus-within:shadow-xl focus-within:shadow-navy-900/10 hover:border-accent hover:shadow-xl hover:shadow-navy-900/10 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200 md:grid-cols-2 ${
        flip ? "xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]" : "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]"
      }`}
    >
      <div className={`flex flex-col p-7 sm:p-9 ${flip ? "md:order-2" : ""}`}>
        <h3 className="text-card font-bold text-balance">{project.title}</h3>
        <p className="mt-2 text-small text-slate">{project.context}</p>
        <p className="mt-4">{project.summary}</p>
        <Chips items={project.stack} label="Tech stack" className="mt-6" />
        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${project.slug}/`}
            aria-label={`Read the case study: ${project.title}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-accent after:absolute after:inset-0 after:z-10 hover:text-navy-900"
          >
            Read the case study
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5" />
            </svg>
          </Link>
        </div>
      </div>
      <div className={`@container blueprint-grid flex items-center bg-navy-900 p-6 ${flip ? "md:order-1" : ""}`}>
        <Pipeline stages={project.pipeline} label={`${project.title} pipeline`} />
      </div>
    </article>
  );
}

// Five skill groups: three across, then two wider cards, so no row on a large screen is left half empty.
function skillSpan(index: number, count: number) {
  const large = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
  const small = count % 2 === 1 && index === count - 1 ? "sm:col-span-2" : "";
  return `${small} ${large}`;
}
