import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { button } from "@/components/button";
import { Chips } from "@/components/Chips";
import { Pipeline } from "@/components/Pipeline";
import { getProject, projects } from "@/lib/projects";
import { ogImage, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} | ${site.name}`;
  const url = `/projects/${project.slug}/`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title, description: project.summary, type: "article", url, siteName: site.name, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [ogImage.url] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  const blocks: { id: string; title: string; body: React.ReactNode }[] = [
    { id: "problem", title: "The problem", body: <p>{project.problem}</p> },
    {
      id: "approach",
      title: "How I built it",
      body: (
        <ul className="list-disc space-y-3 pl-5 marker:text-accent">
          {project.approach.map((step) => (
            <li key={step} className="pl-1">
              {step}
            </li>
          ))}
        </ul>
      ),
    },
    { id: "stack", title: "Tech stack", body: <Chips items={project.stack} /> },
    { id: "results", title: "Results", body: <p>{project.results}</p> },
  ];
  if (project.next) blocks.push({ id: "whats-next", title: "What's next", body: <p>{project.next}</p> });

  return (
    <article>
      <header data-hero className="on-dark relative isolate overflow-hidden bg-navy-900 text-white">
        <div aria-hidden="true" className="blueprint-grid fade-down absolute inset-0 -z-10" />
        <div className="mx-auto max-w-page px-6 pb-16 pt-[calc(var(--header-h)+1.5rem)] sm:px-8 md:pb-20 md:pt-[calc(var(--header-h)+2.5rem)]">
          <Link
            href="/#projects"
            className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-md px-1 font-medium text-white/80 hover:text-white motion-safe:transition-colors"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10H4.5M9 5.5 4.5 10 9 14.5" />
            </svg>
            All projects
          </Link>
          <h1 className="mt-6 max-w-[20ch] text-display font-bold text-balance">{project.title}</h1>
          <p className="mt-5 max-w-[60ch] text-white/75 lg:text-card lg:leading-normal lg:tracking-normal">
            {project.context}
          </p>
          <Chips items={project.stack} tone="dark" label="Tech stack" className="mt-8" />
          {project.privateWork && (
            <p className="mt-8 flex max-w-[62ch] items-start gap-3 rounded-xl border border-navy-600 bg-navy-800 px-4 py-3 text-small text-white/85">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 size-4.5 shrink-0 text-sky" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8.5" width="12" height="8.5" rx="1.75" />
                <path d="M6.75 8.5V6.25a3.25 3.25 0 0 1 6.5 0V8.5" />
              </svg>
              Client work: the code and data aren&apos;t shown. This page describes the approach.
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-page px-6 pt-12 sm:px-8 md:pt-16">
        <div className="@container blueprint-grid rounded-2xl bg-navy-900 p-6 sm:p-8 lg:p-10">
          <Pipeline stages={project.pipeline} label={`${project.title} pipeline`} size="lg" />
        </div>
      </div>

      <div className="mx-auto max-w-page px-6 py-16 sm:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:gap-10">
        <nav aria-labelledby="on-this-page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <p id="on-this-page" className="text-small font-semibold">
              On this page
            </p>
            <ul className="mt-3 border-l border-line">
              {blocks.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="-ml-px flex min-h-11 items-center border-l-2 border-transparent pl-4 text-small text-slate hover:border-accent hover:text-ink"
                  >
                    {b.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-8 lg:col-start-5">
          {blocks.map((b, i) => (
            <section key={b.id} aria-labelledby={b.id} className={i > 0 ? "mt-12 border-t border-line pt-12" : ""}>
              <h2 id={b.id} className="text-section font-bold">
                {b.title}
              </h2>
              <div className="mt-5 max-w-[65ch]">{b.body}</div>
            </section>
          ))}
        </div>
      </div>

      <nav aria-label="More projects" className="mx-auto max-w-page px-6 pb-24 sm:px-8">
        <div className="grid gap-8 border-t border-line pt-12 md:grid-cols-12 md:items-center">
          <Link
            href={`/projects/${nextProject.slug}/`}
            className="group block rounded-2xl border border-line bg-white p-7 hover:border-accent hover:shadow-xl hover:shadow-navy-900/10 focus-visible:border-accent motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200 sm:p-8 md:col-span-8"
          >
            <span className="text-small text-slate">Next project</span>
            <span className="mt-2 flex items-center justify-between gap-4 text-card font-bold">
              {nextProject.title}
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5" />
              </svg>
            </span>
            <span className="mt-2 block text-small text-slate">{nextProject.context}</span>
          </Link>
          <div className="md:col-span-4 md:justify-self-end">
            <a href={`mailto:${site.email}`} className={button("accent")}>
              Email me about this work
            </a>
          </div>
        </div>
      </nav>
    </article>
  );
}
