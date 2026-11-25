import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-graphite">
        © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
      </div>
    </footer>
  );
}
