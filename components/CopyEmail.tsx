"use client";

import { useEffect, useRef, useState } from "react";

// Copies the email address and briefly says "Copied". If the clipboard isn't available, nothing happens:
// the address is still on screen to select by hand.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked or unsupported: fail quietly.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-lg border border-white/30 px-4 text-small font-semibold text-white hover:border-white hover:bg-white/10 motion-safe:transition-colors"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          {copied ? (
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          ) : (
            <>
              <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
              <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
            </>
          )}
        </svg>
        {copied ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
