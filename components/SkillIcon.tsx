import type { SkillIconName } from "@/lib/site";

// Simple 24px line drawings for the Skills cards. Decorative: the group name carries the meaning.
const paths: Record<SkillIconName, React.ReactNode> = {
  // Three connected nodes: agents and LLM workflows.
  network: (
    <>
      <circle cx="12" cy="5" r="2.25" />
      <circle cx="5" cy="18" r="2.25" />
      <circle cx="19" cy="18" r="2.25" />
      <path d="M10.9 7 6.1 16M13.1 7l4.8 9M7.25 18h9.5" />
    </>
  ),
  // An eye: computer vision.
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // A waveform: speech.
  wave: <path d="M3 10.5v3M7 8v8M11 4.5v15M15 7.5v9M19 10v4" />,
  // Code brackets: backend and web.
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />,
  // A database cylinder: data and tools.
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.75" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" />
    </>
  ),
};

export function SkillIcon({ name, className = "" }: { name: SkillIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
