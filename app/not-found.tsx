import Link from "next/link";
import { button } from "@/components/button";

export default function NotFound() {
  return (
    <section
      data-hero
      aria-labelledby="not-found-heading"
      className="on-dark relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden="true" className="blueprint-grid fade-down absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-page px-6 pb-20 pt-[calc(var(--header-h)+3rem)] sm:px-8">
        <p className="text-small font-semibold text-sky">404</p>
        <h1 id="not-found-heading" className="mt-3 max-w-[16ch] text-display font-bold text-balance">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-[52ch] text-white/75">
          The link may be old or mistyped.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className={button("solidOnNavy")}>
            Go to the home page
          </Link>
          <Link href="/#projects" className={button("outlineOnNavy")}>
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
