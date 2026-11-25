type PipelineProps = {
  stages: string[];
  label: string;
};

// A project's real stages, in order. The last stage is the output, so it carries the accent.
export function Pipeline({ stages, label }: PipelineProps) {
  return (
    <ol aria-label={label} className="flex flex-col md:flex-row md:items-stretch">
      {stages.map((stage, i) => {
        const isOutput = i === stages.length - 1;
        return (
          <li key={stage} className="flex flex-col md:flex-1 md:flex-row">
            <span
              className={`flex items-center rounded-md border px-3 py-2.5 text-[14px] leading-snug md:flex-1 ${
                isOutput
                  ? "border-signal bg-signal-tint font-medium text-ink"
                  : "border-rule bg-white text-ink"
              }`}
            >
              {stage}
            </span>
            {!isOutput && <span aria-hidden="true" className="pipe-connector" />}
          </li>
        );
      })}
    </ol>
  );
}
