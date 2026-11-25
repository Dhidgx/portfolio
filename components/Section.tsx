type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

// Each home-page section: heading on the left, content on the right (stacked on phones).
export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-6 border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <h2 id={`${id}-heading`} className="text-[28px] font-semibold leading-tight tracking-tight">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-[32ch] text-graphite">{intro}</p>}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
