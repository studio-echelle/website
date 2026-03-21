'use client';

import { useEffect, useRef } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const retried = useRef(false);

  useEffect(() => {
    console.error('Page error:', error);

    // Auto-retry once — most GSAP/navigation errors are transient
    if (!retried.current) {
      retried.current = true;
      // Small delay to let cleanup finish
      setTimeout(() => reset(), 100);
    }
  }, [error, reset]);

  return (
    <div className="bg-[var(--color-fg)] min-h-screen flex items-center justify-center" style={{ paddingTop: '120px' }}>
      <div className="text-center">
        <h2
          className="text-[var(--color-bg)] mb-6"
          style={{ fontFamily: 'var(--font-display), serif', fontSize: '36px', fontWeight: 300 }}
        >
          Something went wrong
        </h2>
        <button
          onClick={reset}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-3 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
