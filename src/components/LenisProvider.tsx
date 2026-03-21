'use client';

import { useEffect } from 'react';
import { loadGsap } from '@/lib/gsap';

/**
 * Initialises GSAP + ScrollTrigger globally.
 * Lenis removed — was causing crashes after tab idle + client-side navigation.
 * Native CSS smooth scroll via scroll-behavior handles the UX.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadGsap();
  }, []);

  return <>{children}</>;
}
