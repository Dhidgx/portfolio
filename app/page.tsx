import Link from "next/link";
import { AgentSchematic } from "@/components/AgentSchematic";
import { button } from "@/components/button";
import { Pipeline } from "@/components/Pipeline";
import { Section } from "@/components/Section";
import { projects } from "@/lib/projects";
import { facts, site, skills } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section
        data-hero
        aria-labelledby="hero-heading"
        className="on-dark relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />
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
        <div className="grid gap-10 lg:grid-cols-8">
          <div className="space-y-5 lg:col-span-5">
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
          <dl className="space-y-5 self-start rounded-lg border border-rule bg-white p-6 lg:col-span-3">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="text-[14px] text-graphite">{f.term}</dt>
                <dd className="font-medium leading-snug">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-6 border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-4 md:grid-cols-12">
            <h2 id="projects-heading" className="text-[28px] font-semibold leading-tight tracking-tight md:col-span-4">
              Featured Projects
            </h2>
            <p className="text-graphite md:col-span-8">
              Four things I&apos;ve built, from client systems to research. Each row shows the project&apos;s
              pipeline, from input to output.
            </p>
          </div>

          <div className="mt-12 divide-y divide-rule border-y border-rule">
            {projects.map((p) => (
              <article key={p.slug} className="grid gap-6 py-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <h3 className="text-[21px] font-semibold leading-snug tracking-tight">
                    <Link href={`/projects/${p.slug}/`} className="underline-offset-4 hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[15px] text-graphite">{p.context}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-[62ch]">{p.summary}</p>
                  <Link
                    href={`/projects/${p.slug}/`}
                    className="mt-3 inline-block font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
                    aria-label={`Read the case study: ${p.title}`}
                  >
                    Read the case study
                  </Link>
                </div>
                <div className="md:col-span-12">
                  <Pipeline stages={p.pipeline} label={`${p.title} pipeline`} />
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-graphite">
            Smaller builds and practice projects are on{" "}
            <a href={site.github} className="font-medium text-ink underline underline-offset-4 hover:text-signal">
              GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <Section id="skills" title="Skills" intro="The tools I've built with.">
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="font-semibold">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="rounded-full border border-rule bg-white px-3 py-1 text-[14px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-6 border-t border-rule bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 id="contact-heading" className="max-w-[18ch] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em]">
            Hiring for AI or Python work?
          </h2>
          <p className="mt-5 max-w-[56ch] text-[18px] text-paper/75">
            I&apos;m available now for remote contract and full-time roles with teams in the US and Canada. Email is
            the fastest way to reach me.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-md bg-paper px-5 py-3 font-medium text-ink hover:bg-white"
            >
              Email me
            </a>
            <a
              href={site.linkedin}
              className="rounded-md border border-paper/30 px-5 py-3 font-medium hover:border-paper"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              className="rounded-md border border-paper/30 px-5 py-3 font-medium hover:border-paper"
            >
              GitHub
            </a>
          </div>
          <p className="mt-6 text-[15px] text-paper/60">{site.email}</p>
        </div>
      </section>
    </>
  );
}
