// Shared button styles. "onNavy" variants sit on navy bands; the others sit on white or ice.

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold leading-tight motion-safe:transition-colors motion-safe:duration-150";

const sizes = {
  md: "min-h-12 px-5",
  sm: "min-h-11 px-4",
};

const variants = {
  solidOnNavy: "bg-white text-navy-900 hover:bg-ice",
  outlineOnNavy: "border border-white/50 text-white hover:border-white hover:bg-white/10",
  accent: "bg-accent text-white hover:bg-navy-900",
  outline: "border border-line bg-white text-ink hover:border-ink",
};

export function button(variant: keyof typeof variants, size: keyof typeof sizes = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
