'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const render = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const lerp = 0.15;
    rendered.current.x += (mouse.current.x - rendered.current.x) * lerp;
    rendered.current.y += (mouse.current.y - rendered.current.y) * lerp;

    cursor.style.transform = `translate3d(${rendered.current.x}px, ${rendered.current.y}px, 0) translate(-50%, -50%)`;

    rafId.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Detect touch — bail entirely
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    cursor.style.opacity = '0';

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursor && cursor.style.opacity === '0') {
        cursor.style.opacity = '1';
      }
    }

    function onMouseEnterHoverable(e: Event) {
      const el = e.currentTarget as HTMLElement;
      const label = el.dataset.cursor || 'view';
      const labelEl = cursor?.querySelector('.custom-cursor-label');
      if (labelEl) labelEl.textContent = label.toUpperCase();
      cursor?.classList.add('is-hovering');
    }

    function onMouseLeaveHoverable() {
      cursor?.classList.remove('is-hovering');
    }

    function bindHoverables() {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable);
        el.removeEventListener('mouseleave', onMouseLeaveHoverable);
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    }

    document.addEventListener('mousemove', onMouseMove);

    const observer = new MutationObserver(bindHoverables);
    observer.observe(document.body, { childList: true, subtree: true });
    bindHoverables();

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [mounted, render]);

  // Return null during SSR / before mount — no DOM to mismatch
  if (!mounted) return null;

  return (
    <div ref={cursorRef} className="custom-cursor">
      <span className="custom-cursor-label">VIEW</span>
    </div>
  );
}
