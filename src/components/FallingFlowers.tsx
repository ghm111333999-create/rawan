import React, { useEffect, useMemo, useState } from 'react';
import { PetalSvg, TinyBlossomSvg, TinyHeartSvg } from './RomanticIllustrations';

export interface BurstEventDetail {
  x?: number;
  y?: number;
  count?: number;
}

export const triggerRomanticBurst = (detail: BurstEventDetail = {}) => {
  window.dispatchEvent(new CustomEvent<BurstEventDetail>('romantic-petal-burst', { detail }));
};

interface AmbientParticle {
  id: number;
  leftPercent: number;
  size: number;
  durationSec: number;
  delaySec: number;
  swayPx: number;
  swayEndPx: number;
  rotMid: number;
  rotEnd: number;
  opacity: number;
  kind: 'petal' | 'blossom' | 'heart' | 'sparkle';
  color: string;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  bx: number;
  by: number;
  br: number;
  scale: number;
  kind: 'petal' | 'heart' | 'sparkle';
  color: string;
}

const PETAL_COLORS = ['#F3DDE3', '#EBC6D0', '#E4B1BF', '#D9B7AC'];

export const FallingFlowers: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bursts, setBursts] = useState<BurstParticle[]>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const updateViewport = () => setIsMobile(window.innerWidth < 768);

    updateMotion();
    updateViewport();

    motionQuery.addEventListener('change', updateMotion);
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    let burstIdCounter = 0;
    const timers: number[] = [];

    const handleBurst = (e: Event) => {
      if (reducedMotion) return;
      const customEvent = e as CustomEvent<BurstEventDetail>;
      const originX = customEvent.detail?.x ?? window.innerWidth / 2;
      const originY = customEvent.detail?.y ?? window.innerHeight * 0.45;
      const count = Math.min(customEvent.detail?.count ?? 22, isMobile ? 14 : 28);

      const newItems: BurstParticle[] = Array.from({ length: count }).map((_, idx) => {
        const angle = (Math.PI * 2 * idx) / count + (Math.random() - 0.5) * 0.4;
        const distance = 65 + Math.random() * 145;
        const kindRoll = Math.random();
        return {
          id: ++burstIdCounter,
          x: originX,
          y: originY,
          bx: Math.cos(angle) * distance,
          by: Math.sin(angle) * distance - 35,
          br: (Math.random() - 0.5) * 180,
          scale: 0.75 + Math.random() * 0.65,
          kind: kindRoll < 0.45 ? 'petal' : kindRoll < 0.82 ? 'heart' : 'sparkle',
          color:
            kindRoll < 0.45
              ? PETAL_COLORS[idx % PETAL_COLORS.length]
              : kindRoll < 0.82
              ? idx % 2 === 0
                ? '#C83E50'
                : '#EBC6D0'
              : '#C9A77B',
        };
      });

      setBursts((prev) => [...prev.slice(-30), ...newItems]);

      const timer = window.setTimeout(() => {
        const ids = new Set(newItems.map((i) => i.id));
        setBursts((prev) => prev.filter((item) => !ids.has(item.id)));
      }, 1500);
      timers.push(timer);
    };

    window.addEventListener('romantic-petal-burst', handleBurst);
    return () => {
      window.removeEventListener('romantic-petal-burst', handleBurst);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [reducedMotion, isMobile]);

  const ambientParticles = useMemo<AmbientParticle[]>(() => {
    const count = isMobile ? 8 : 15;
    return Array.from({ length: count }).map((_, i) => {
      const seed = (i * 37 + 13) % 100;
      const kindRoll = i % 7;
      const kind: AmbientParticle['kind'] =
        kindRoll === 5 ? 'heart' : kindRoll === 6 ? 'sparkle' : kindRoll === 2 ? 'blossom' : 'petal';
      return {
        id: i,
        leftPercent: ((i * 100) / count + (seed % 7)) % 98,
        size: kind === 'sparkle' ? 10 : kind === 'heart' ? 12 + (seed % 4) : 14 + (seed % 8),
        durationSec: 13 + (seed % 9),
        delaySec: -(i * 1.4),
        swayPx: (i % 2 === 0 ? 1 : -1) * (20 + (seed % 26)),
        swayEndPx: (i % 2 === 0 ? -1 : 1) * (16 + (seed % 20)),
        rotMid: (i % 2 === 0 ? 1 : -1) * (90 + (seed % 80)),
        rotEnd: (i % 2 === 0 ? 1 : -1) * (220 + (seed % 110)),
        opacity: kind === 'sparkle' ? 0.55 : 0.42 + (seed % 25) / 100,
        kind,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      };
    });
  }, [isMobile]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Continuous ambient falling flowers */}
      {ambientParticles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.leftPercent}%`,
            top: '-5vh',
            animation: `petalFall ${p.durationSec}s linear ${p.delaySec}s infinite`,
            ['--petal-sway' as string]: `${p.swayPx}px`,
            ['--petal-sway-end' as string]: `${p.swayEndPx}px`,
            ['--petal-rot-mid' as string]: `${p.rotMid}deg`,
            ['--petal-rot-end' as string]: `${p.rotEnd}deg`,
            ['--petal-opacity' as string]: p.opacity,
          }}
          className="fixed will-change-transform"
        >
          {p.kind === 'petal' && <PetalSvg color={p.color} size={p.size} />}
          {p.kind === 'blossom' && <TinyBlossomSvg color={p.color} size={p.size} />}
          {p.kind === 'heart' && <TinyHeartSvg color="#EBC6D0" size={p.size} />}
          {p.kind === 'sparkle' && (
            <svg width={p.size} height={p.size} viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L9.3 6.7L15 8L9.3 9.3L8 15L6.7 9.3L1 8L6.7 6.7L8 1Z"
                fill="#C9A77B"
                fillOpacity="0.65"
              />
            </svg>
          )}
        </div>
      ))}

      {/* Celebration petal & heart bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            animation: 'burstRise 1.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            ['--bx' as string]: `${b.bx}px`,
            ['--by' as string]: `${b.by}px`,
            ['--br' as string]: `${b.br}deg`,
            ['--bs' as string]: b.scale,
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          {b.kind === 'petal' && <PetalSvg color={b.color} size={17} />}
          {b.kind === 'heart' && <TinyHeartSvg color={b.color} size={15} />}
          {b.kind === 'sparkle' && (
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L9.4 6.6L15 8L9.4 9.4L8 15L6.6 9.4L1 8L6.6 6.6L8 1Z"
                fill="#C9A77B"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
