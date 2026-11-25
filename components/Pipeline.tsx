import type { CSSProperties } from "react";

type PipelineProps = {
  stages: string[];
  label: string;
  size?: "md" | "lg";
};

// A project's real stages, in order, for a navy diagram panel. The last stage is the output, so it's in sky.
// The flow follows the width of its panel (a container query), not the viewport: it runs horizontally
// when the panel has room for five readable nodes and vertically when it doesn't, so labels never overflow.
// The parent must have the `@container` class. Class names are written out in full so Tailwind can find them.
const layouts = {
  md: {
    list: "gap-6 @2xl:grid-cols-[repeat(var(--stages),minmax(0,1fr))] @2xl:gap-x-5",
    node: "px-4 py-3 text-small @2xl:px-2.5",
    down: "@2xl:hidden",
    across: "hidden w-5 @2xl:block",
  },
  lg: {
    list: "mx-auto max-w-xl gap-6 @4xl:max-w-none @4xl:grid-cols-[repeat(var(--stages),minmax(0,1fr))] @4xl:gap-x-8",
    node: "px-5 py-4 text-body @4xl:px-4",
    down: "@4xl:hidden",
    across: "hidden w-8 @4xl:block",
  },
};

export function Pipeline({ stages, label, size = "md" }: PipelineProps) {
  const layout = layouts[size];
  return (
    <ol aria-label={label} style={{ "--stages": stages.length } as CSSProperties} className={`grid w-full ${layout.list}`}>
      {stages.map((stage, i) => {
        const isOutput = i === stages.length - 1;
        return (
          <li key={stage} className="relative flex">
            <span
              className={`flex w-full items-center justify-center rounded-xl border text-center leading-snug wrap-break-word hyphens-auto ${layout.node} ${
                isOutput ? "border-sky bg-sky font-semibold text-navy-950" : "border-navy-600 bg-navy-800 text-white"
              }`}
            >
              {stage}
            </span>
            {!isOutput && (
              <>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 24"
                  className={`absolute left-1/2 top-full h-6 w-3 -translate-x-1/2 ${layout.down}`}
                >
                  <path d="M6 3 V20.5 M2.5 16.5 L6 20.5 L9.5 16.5" {...arrowStroke} />
                </svg>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 12"
                  className={`absolute left-full top-1/2 h-3 -translate-y-1/2 ${layout.across}`}
                >
                  <path d="M3 6 H17 M13 2.5 L17 6 L13 9.5" {...arrowStroke} />
                </svg>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const arrowStroke = {
  className: "stroke-sky/70",
  strokeWidth: 1.5,
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
