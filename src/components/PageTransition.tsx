'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      // Page-load reveal: curtain retracts upward
      gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' });
      gsap.to(overlay, {
        scaleY: 0,
        duration: 0.6,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        delay: 0.15,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      aria-hidden="true"
    />
  );
}
