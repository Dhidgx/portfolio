type ChipsProps = {
  items: string[];
  tone?: "light" | "dark";
  label?: string;
  className?: string;
};

// Small, non-interactive tags for tools and skills.
export function Chips({ items, tone = "light", label, className = "" }: ChipsProps) {
  const chip =
    tone === "light" ? "border-line bg-ice text-ink" : "border-navy-600 bg-navy-800 text-white";
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className={`rounded-full border px-3 py-1 text-small ${chip}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}
