'use client';

export function GridOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)',
      }}
    />
  );
}
