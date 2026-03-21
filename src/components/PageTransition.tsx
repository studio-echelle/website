'use client';

import { useEffect, useRef, useState } from 'react';

export function PageTransition() {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    let cancelled = false;

    // Dynamically import GSAP only on client
    import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' });
        gsap.to(overlay, {
          scaleY: 0,
          duration: 0.6,
          ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
          delay: 0.15,
        });
      });

      // Store for cleanup
      (overlay as unknown as { _gsapCtx: typeof ctx })._gsapCtx = ctx;
    });

    return () => {
      cancelled = true;
      const ctx = (overlay as unknown as { _gsapCtx?: { revert: () => void } })._gsapCtx;
      ctx?.revert();
    };
  }, [mounted]);

  // Return null during SSR — no DOM to mismatch
  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      aria-hidden="true"
    />
  );
}
