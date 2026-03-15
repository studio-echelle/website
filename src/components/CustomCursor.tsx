'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide until first move
    cursor.style.opacity = '0';

    function onMouseMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        if (!visible.current) {
          cursor.style.opacity = '1';
          visible.current = true;
        }
      }
    }

    function onMouseEnterHoverable() {
      cursor?.classList.add('is-hovering');
    }

    function onMouseLeaveHoverable() {
      cursor?.classList.remove('is-hovering');
    }

    document.addEventListener('mousemove', onMouseMove);

    // Observe DOM for [data-cursor="view"] elements
    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll('[data-cursor="view"]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    const hoverables = document.querySelectorAll('[data-cursor="view"]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterHoverable);
      el.addEventListener('mouseleave', onMouseLeaveHoverable);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <span className="custom-cursor-label">View</span>
    </div>
  );
}
