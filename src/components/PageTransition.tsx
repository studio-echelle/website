'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Exit animation: reveal the page (scaleY 1 → 0 from top)
    gsap.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: 'top' },
      {
        scaleY: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.1,
      },
    );
  }, []);

  return <div ref={overlayRef} className="page-transition" />;
}
