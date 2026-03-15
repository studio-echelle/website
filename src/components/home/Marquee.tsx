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
            className="text-[14px] uppercase tracking-[0.18em] text-[var(--color-bg)]/50 whitespace-nowrap px-6 lg:px-10"
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
    <section className="bg-[var(--color-dark)] h-[80px] flex items-center overflow-hidden">
      <div className="flex">
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
