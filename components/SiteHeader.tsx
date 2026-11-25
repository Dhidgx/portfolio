import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
        <Link href="/" className="text-[17px] font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-graphite underline-offset-4 hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            download
            className="rounded-md border border-ink/25 px-3.5 py-1.5 font-medium text-ink hover:border-ink"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
