/**
 * Shared GSAP loader — loads once, provides synchronous access after init.
 */

let gsapInstance: typeof import('gsap').gsap | null = null;
let scrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;
let loadPromise: Promise<void> | null = null;

export function loadGsap() {
  if (!loadPromise) {
    loadPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      scrollTriggerInstance = ScrollTrigger;
    });
  }
  return loadPromise;
}

export function getGsap() {
  return gsapInstance;
}

export function getScrollTrigger() {
  return scrollTriggerInstance;
}

/**
 * Kill all ScrollTrigger instances — call on route change.
 * Wrapped in try/catch because DOM may already be torn down.
 */
export function killAllScrollTriggers() {
  try {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.getAll().forEach((t) => {
        try { t.kill(); } catch { /* DOM already gone */ }
      });
    }
  } catch {
    // ScrollTrigger itself may be in a bad state — ignore
  }
}
