'use client';

import { useEffect, useRef, useState } from 'react';
import { loadGsap, getGsap, getScrollTrigger } from './gsap';

/**
 * Hook that loads GSAP once and runs an animation callback.
 * All errors are caught — GSAP should never crash the page.
 */
export function useGsap(
  callback: (
    gsap: NonNullable<ReturnType<typeof getGsap>>,
    ScrollTrigger: NonNullable<ReturnType<typeof getScrollTrigger>>,
  ) => { revert: () => void } | void,
  deps: React.DependencyList = [],
) {
  const [ready, setReady] = useState(() => !!getGsap());
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    if (!ready) {
      loadGsap().then(() => setReady(true));
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const gsap = getGsap();
    const ST = getScrollTrigger();
    if (!gsap || !ST) return;

    try {
      const result = callback(gsap, ST);
      if (result) {
        ctxRef.current = result;
      }
    } catch {
      // Animation setup failed — DOM may not be ready. Non-fatal.
    }

    return () => {
      try {
        ctxRef.current?.revert();
      } catch {
        // DOM already removed by React — safe to ignore.
      }
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, ...deps]);

  return ready;
}
