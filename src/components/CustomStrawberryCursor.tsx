import React, { useEffect, useRef, useState } from 'react';
import { StrawberryGraphic } from './RomanticIllustrations';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  kind: 'heart' | 'sparkle';
  size: number;
  offsetX: number;
  offsetY: number;
}

export const CustomStrawberryCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const lastTrailPos = useRef({ x: -100, y: -100 });
  const trailIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluateEligibility = () => {
      const hasTouchOnly =
        !finePointerQuery.matches ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
      const shouldEnable = !hasTouchOnly && !reducedMotionQuery.matches;
      setEnabled(shouldEnable);
    };

    evaluateEligibility();

    const handleTouchStart = () => {
      setEnabled(false);
      setIsVisible(false);
    };

    finePointerQuery.addEventListener('change', evaluateEligibility);
    reducedMotionQuery.addEventListener('change', evaluateEligibility);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      finePointerQuery.removeEventListener('change', evaluateEligibility);
      reducedMotionQuery.removeEventListener('change', evaluateEligibility);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        prevPos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
        document.body.classList.add('custom-cursor-active');
      }

      // Check interactive element hover
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-interactive="true"]'
      );
      setIsHoveringInteractive(Boolean(interactive));

      // Spawn subtle trail particles when moving
      const dx = e.clientX - lastTrailPos.current.x;
      const dy = e.clientY - lastTrailPos.current.y;
      if (dx * dx + dy * dy > 1600) {
        lastTrailPos.current = { x: e.clientX, y: e.clientY };
        const id = ++trailIdRef.current;
        const particle: TrailParticle = {
          id,
          x: e.clientX,
          y: e.clientY,
          kind: id % 3 === 0 ? 'heart' : 'sparkle',
          size: id % 3 === 0 ? 10 : 7,
          offsetX: (Math.random() - 0.5) * 14,
          offsetY: (Math.random() - 0.5) * 14 + 6,
        };

        setTrail((prev) => [...prev.slice(-11), particle]);
        const timeout = window.setTimeout(() => {
          setTrail((prev) => prev.filter((item) => item.id !== id));
        }, 620);
        timeoutsRef.current.push(timeout);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('custom-cursor-active');
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let rotation = 0;
    const animate = () => {
      const ease = 0.24;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      const vx = currentPos.current.x - prevPos.current.x;
      prevPos.current.x = currentPos.current.x;
      prevPos.current.y = currentPos.current.y;

      const targetRotation = Math.max(-18, Math.min(18, vx * 1.45));
      rotation += (targetRotation - rotation) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-28%, -18%) rotate(${rotation.toFixed(2)}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  return (
    <>
      {/* Subtle pink sparkle & tiny heart trail */}
      <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden" aria-hidden="true">
        {trail.map((p) => (
          <span
            key={p.id}
            style={{
              left: `${p.x + p.offsetX}px`,
              top: `${p.y + p.offsetY}px`,
              animation: 'burstRise 0.62s ease-out forwards',
              ['--bx' as string]: `${p.offsetX * 0.8}px`,
              ['--by' as string]: '-18px',
              ['--bs' as string]: '0.6',
              ['--br' as string]: '12deg',
            }}
            className="fixed -translate-x-1/2 -translate-y-1/2"
          >
            {p.kind === 'heart' ? (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20.5C12 20.5 3.5 14.5 3.5 8.6C3.5 5.4 6 3 9 3C10.9 3 12 4.1 12 4.1C12 4.1 13.1 3 15 3C18 3 20.5 5.4 20.5 8.6C20.5 14.5 12 20.5 12 20.5Z"
                  fill="#EBC6D0"
                />
              </svg>
            ) : (
              <svg width={p.size} height={p.size} viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L9.4 6.6L15 8L9.4 9.4L8 15L6.6 9.4L1 8L6.6 6.6L8 1Z"
                  fill="#C9A77B"
                  fillOpacity="0.85"
                />
              </svg>
            )}
          </span>
        ))}
      </div>

      {/* Main custom strawberry cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-200 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isClicking
              ? 'scale-90'
              : isHoveringInteractive
              ? 'scale-125 -translate-y-0.5'
              : 'scale-100'
          }`}
        >
          <StrawberryGraphic
            size={28}
            className="drop-shadow-[0_3px_6px_rgba(120,61,80,0.22)]"
          />
        </div>
      </div>
    </>
  );
};
