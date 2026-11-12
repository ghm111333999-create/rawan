import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { romanticConfig } from '../config/romanticConfig';
import {
  BotanicalRoseFlourish,
  StrawberryGraphic,
  TinyHeartSvg,
} from './RomanticIllustrations';
import { triggerRomanticBurst } from './FallingFlowers';

export const SurpriseSection: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  const handleSurpriseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerRomanticBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 28,
    });

    // Trigger a gentle second wave slightly offset for a joyful heart & petal shower
    window.setTimeout(() => {
      triggerRomanticBurst({
        x: window.innerWidth * 0.5,
        y: rect.top - 40,
        count: 18,
      });
    }, 220);

    setRevealed(true);
  };

  return (
    <section
      id="surprise"
      className="relative overflow-hidden border-b border-[#D9B7AC]/30 bg-gradient-to-b from-[#FFF9F5] via-[#F3DDE3]/35 to-[#FFF9F5] py-20 sm:py-28"
    >
      {/* Soft radial glow when surprise is revealed */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 55%, rgba(235, 198, 208, 0.55) 0%, rgba(201, 167, 123, 0.12) 40%, transparent 72%)',
        }}
      />

      <div className="relative mx-auto max-w-[820px] px-6 text-center sm:px-8">
        <p className="text-xs font-medium tracking-[0.2em] text-[#783D50]/75 uppercase">
          {romanticConfig.surprise.sectionEyebrow}
        </p>

        <h2 className="font-serif-editorial text-balance mt-3 text-3xl font-medium tracking-tight text-[#783D50] sm:text-4xl md:text-5xl">
          {romanticConfig.surprise.heading}
        </h2>

        <p className="mt-4 text-base text-[#4A2531]/80 sm:text-lg">
          {romanticConfig.surprise.subheadline}
        </p>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="surprise-cta"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={handleSurpriseClick}
                  className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#C83E50] px-9 py-4 text-sm font-medium tracking-wide text-[#FFF9F5] shadow-[0_14px_34px_rgba(200,62,80,0.28)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#B33344] hover:shadow-[0_18px_40px_rgba(200,62,80,0.35)] whitespace-nowrap shrink-0"
                >
                  <span>{romanticConfig.surprise.buttonLabel}</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="surprise-revealed"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto max-w-2xl rounded-[1.75rem] border border-[#D9B7AC]/70 bg-[#FFFDFB]/95 px-7 py-10 shadow-[0_24px_60px_rgba(120,61,80,0.12)] sm:px-12 sm:py-12"
              >
                <div className="mb-5 flex items-center justify-center gap-3">
                  <TinyHeartSvg color="#EBC6D0" size={16} />
                  <BotanicalRoseFlourish size={105} />
                  <TinyHeartSvg color="#EBC6D0" size={16} />
                </div>

                <blockquote className="font-serif-editorial text-balance text-2xl font-medium italic leading-relaxed text-[#783D50] sm:text-3xl md:text-[2rem]">
                  &ldquo;{romanticConfig.surprise.revealedMessage}&rdquo;
                </blockquote>

                {/* Animated small strawberry underneath the message */}
                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="animate-float-gentle inline-flex items-center justify-center rounded-full border border-[#F3DDE3] bg-[#FFF9F5] p-3 shadow-sm">
                    <StrawberryGraphic size={42} withBlossom />
                  </div>

                  <button
                    type="button"
                    onClick={handleSurpriseClick}
                    className="inline-flex min-h-[40px] items-center gap-2 text-xs font-medium tracking-wide text-[#783D50]/80 underline decoration-[#D9B7AC] underline-offset-4 transition-colors hover:text-[#C83E50]"
                  >
                    {romanticConfig.surprise.replayLabel}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
