import Link from "next/link";
import { nav, site } from "@/lib/site";

const linkClass = "inline-flex min-h-11 items-center text-white/75 hover:text-white motion-safe:transition-colors";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy-950 text-white">
      <div className="mx-auto max-w-page px-6 pt-14 sm:px-8">
        <div className="grid gap-8 border-b border-navy-600 pb-10 md:grid-cols-12 md:items-start">
          <Link href="/" className="inline-flex min-h-11 items-center self-start font-bold tracking-tight md:col-span-4">
            {site.name}
          </Link>
          <nav aria-label="Footer" className="md:col-span-5">
            <ul className="flex flex-wrap gap-x-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-wrap gap-x-6 md:col-span-3 md:justify-end">
            <li>
              <a href={site.linkedin} className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} className={linkClass}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <p className="py-6 text-small text-white/70">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
