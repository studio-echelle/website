'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { killAllScrollTriggers, getScrollTrigger } from '@/lib/gsap';

/**
 * Handles GSAP cleanup on route changes and prevents unhandled errors
 * from crashing the page during client-side navigation.
 */
export function RouteCleanup() {
  const pathname = usePathname();

  // Kill all ScrollTriggers when leaving any page
  useEffect(() => {
    return () => {
      killAllScrollTriggers();
    };
  }, [pathname]);

  // Handle tab visibility — refresh ScrollTrigger when tab resumes
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        try {
          const ST = getScrollTrigger();
          if (ST) setTimeout(() => { try { ST.refresh(); } catch { /* ignore */ } }, 200);
        } catch { /* ignore */ }
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Global error handler — catch unhandled GSAP errors that would crash the page
  useEffect(() => {
    function handleError(event: ErrorEvent) {
      const msg = event.message || '';
      // Suppress GSAP/ScrollTrigger errors — they're non-fatal animation issues
      if (
        msg.includes('ScrollTrigger') ||
        msg.includes('gsap') ||
        msg.includes('Cannot read properties of null') ||
        msg.includes('removeChild') ||
        msg.includes('parentNode')
      ) {
        event.preventDefault();
        console.warn('[RouteCleanup] Suppressed animation error:', msg);
        return true;
      }
    }

    function handleRejection(event: PromiseRejectionEvent) {
      const reason = String(event.reason || '');
      if (
        reason.includes('ScrollTrigger') ||
        reason.includes('gsap') ||
        reason.includes('Cannot read properties of null')
      ) {
        event.preventDefault();
        console.warn('[RouteCleanup] Suppressed async animation error:', reason);
      }
    }

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
