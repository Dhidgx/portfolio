"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { button } from "@/components/button";
import { nav, site } from "@/lib/site";

// Transparent with white text while the page's first navy band (marked data-hero) is under it,
// solid white once that band scrolls away. On phones the links move into a menu panel.
export function SiteHeader() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const height = headerRef.current?.offsetHeight ?? 72;
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: `-${height}px 0px 0px 0px`,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 64rem)");
    function onBreakpoint() {
      if (desktop.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const solid = !overHero || open;

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (open && next && !event.currentTarget.contains(next)) setOpen(false);
      }}
      className={`fixed inset-x-0 top-0 z-40 border-b motion-safe:transition-colors motion-safe:duration-200 ${
        solid ? "border-line bg-white text-ink" : "on-dark border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-(--header-h) max-w-page items-center justify-between gap-6 px-6 sm:px-8">
        <Link href="/" className="-mx-1 inline-flex min-h-11 items-center rounded-md px-1 font-bold tracking-tight">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center rounded-md px-3 text-small font-medium motion-safe:transition-colors ${
                    solid ? "text-slate hover:text-ink" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <a href={site.resume} download className={button(solid ? "accent" : "outlineOnNavy", "sm")}>
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div id="site-menu" ref={panelRef} hidden={!open} className="border-t border-line bg-white text-ink lg:hidden">
        <nav aria-label="Main" className="mx-auto max-w-page px-6 pb-6 pt-2 sm:px-8">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.resume} download className={`mt-4 w-full ${button("accent")}`}>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
