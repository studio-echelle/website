'use client';

const ITEMS = [
  'Luxury Residential',
  'Commercial Interiors',
  'Landscape Design',
  'Fit-Out Supervision',
  'GCC & Beyond',
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 animate-[marquee_30s_linear_infinite]">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span
            className="text-[clamp(14px,1.8vw,20px)] uppercase tracking-[0.15em] text-[var(--color-bg)]/60 whitespace-nowrap px-4 lg:px-6"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
          >
            {item}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="bg-[var(--color-dark)] border-y border-[var(--color-bg)]/10 py-5 lg:py-6 overflow-hidden">
      <div className="flex">
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
