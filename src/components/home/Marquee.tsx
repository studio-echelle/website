'use client';

import { useTranslations } from 'next-intl';

const ITEM_KEYS = [
  'luxuryResidential',
  'commercialInteriors',
  'landscapeDesign',
  'fitOutSupervision',
  'gccBeyond',
] as const;

function MarqueeTrack({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 animate-[marquee_30s_linear_infinite]">
      {items.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span
            className="text-[14px] uppercase tracking-[0.18em] whitespace-nowrap px-6 lg:px-10"
            style={{ color: 'rgba(245,242,237,0.4)', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
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
  const t = useTranslations('marquee');
  const items = ITEM_KEYS.map((key) => t(key));

  return (
    <section className="bg-[var(--color-dark)] h-[80px] flex items-center overflow-hidden">
      <div className="flex">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
      </div>
    </section>
  );
}
