import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pipeline } from "@/components/Pipeline";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.summary,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-rule py-10 md:grid-cols-12">
      <h2 className="text-[19px] font-semibold tracking-tight md:col-span-3">{title}</h2>
      <div className="max-w-[64ch] md:col-span-9">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <Link href="/#projects" className="text-[15px] text-graphite underline-offset-4 hover:text-ink hover:underline">
        All projects
      </Link>

      <header className="mt-8 max-w-[44rem]">
        <h1 className="text-[clamp(2.1rem,4.4vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.025em]">
          {project.title}
        </h1>
        <p className="mt-4 text-[18px] text-graphite">{project.context}</p>
        {project.privateWork && (
          <p className="mt-4 rounded-md border border-rule bg-white px-4 py-3 text-[15px] text-graphite">
            Client work: the code and data aren&apos;t shown. This page describes the approach.
          </p>
        )}
      </header>

      <div className="mt-12">
        <Pipeline stages={project.pipeline} label={`${project.title} pipeline`} />
      </div>

      <div className="mt-14">
        <Block title="The problem">
          <p>{project.problem}</p>
        </Block>
        <Block title="How I built it">
          <ul className="list-disc space-y-3 pl-5 marker:text-graphite">
            {project.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </Block>
        <Block title="Tech stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <li key={tool} className="rounded-full border border-rule bg-white px-3 py-1 text-[14px]">
                {tool}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Results">
          <p>{project.results}</p>
        </Block>
        {project.next && (
          <Block title="What's next">
            <p>{project.next}</p>
          </Block>
        )}
      </div>

      <nav
        aria-label="More projects"
        className="mt-6 flex flex-col gap-6 border-t border-rule pt-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[14px] text-graphite">Next project</p>
          <Link
            href={`/projects/${nextProject.slug}/`}
            className="text-[21px] font-semibold tracking-tight underline-offset-4 hover:underline"
          >
            {nextProject.title}
          </Link>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="self-start rounded-md bg-signal px-5 py-3 font-medium text-white hover:bg-signal-deep sm:self-auto"
        >
          Email me about this work
        </a>
      </nav>
    </article>
  );
}
