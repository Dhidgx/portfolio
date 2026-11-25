type Tone = "white" | "ice" | "navy";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  tone?: Tone;
  children: React.ReactNode;
};

const tones: Record<Tone, { band: string; intro: string }> = {
  white: { band: "bg-white text-ink", intro: "text-slate" },
  ice: { band: "bg-ice text-ink", intro: "text-slate" },
  navy: { band: "on-dark bg-navy-900 text-white", intro: "text-white/75" },
};

// A full-width home-page band: colour reaches the screen edges, content sits in the centred column.
export function Section({ id, title, intro, tone = "white", children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={tones[tone].band}>
      <div className="mx-auto max-w-page px-6 py-20 sm:px-8 md:py-28">
        <h2 id={`${id}-heading`} className="max-w-[24ch] text-section font-bold text-balance">
          {title}
        </h2>
        {intro && <p className={`mt-4 max-w-[60ch] ${tones[tone].intro}`}>{intro}</p>}
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
