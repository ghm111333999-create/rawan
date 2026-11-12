import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import {
  BotanicalRoseFlourish,
  StrawberryGraphic,
  TinyHeartSvg,
} from './RomanticIllustrations';

export const HeroSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const scrollToLetter = () => {
    const el = document.getElementById('love-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#D9B7AC]/30 bg-[#FFF9F5] py-14 sm:py-20 lg:py-24"
    >
      {/* Soft pink editorial gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 15% 20%, rgba(243, 221, 227, 0.55) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 88% 75%, rgba(235, 198, 208, 0.36) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-6 lg:py-4"
          >
            <div>
              {/* Quiet unboxed kicker + delicate strawberry emblem */}
              <div className="flex items-center gap-3">
                <StrawberryGraphic size={30} withBlossom />
                <span className="text-xs font-medium tracking-[0.18em] text-[#783D50]/80 uppercase">
                  {romanticConfig.hero.kicker}
                </span>
              </div>

              <h1 className="font-serif-editorial text-balance mt-7 text-[clamp(2.65rem,5vw,4.5rem)] font-medium leading-[1.06] tracking-tight text-[#783D50]">
                {romanticConfig.hero.headline}
              </h1>

              <p className="mt-6 max-w-lg text-base leading-[1.75] text-[#4A2531]/85 sm:text-lg">
                {romanticConfig.hero.subheadline}
              </p>

              {/* Delicate botanical rose flourish */}
              <div className="mt-9 flex items-center gap-4">
                <BotanicalRoseFlourish size={130} />
                <div className="animate-float-gentle opacity-80">
                  <TinyHeartSvg color="#EBC6D0" size={16} />
                </div>
              </div>
            </div>

            {/* Scroll indicator prompt */}
            <div className="mt-10 border-t border-[#D9B7AC]/40 pt-6">
              <button
                type="button"
                onClick={scrollToLetter}
                className="group inline-flex min-h-[44px] items-center gap-3 text-left text-sm font-medium text-[#783D50] transition-colors hover:text-[#C83E50]"
              >
                <span className="font-serif-editorial text-lg italic">
                  {romanticConfig.hero.scrollPrompt}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D9B7AC]/70 bg-[#F3DDE3]/40 transition-transform duration-300 group-hover:translate-y-1">
                  <ArrowDown className="h-3.5 w-3.5 text-[#783D50]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Framed Floral & Strawberry Still Life */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex lg:col-span-6"
          >
            {/* Floating heart accents near frame */}
            <div
              aria-hidden="true"
              className="animate-float-slow pointer-events-none absolute -right-2 -top-3 z-10 hidden sm:block"
            >
              <TinyHeartSvg color="#C83E50" size={18} />
            </div>
            <div
              aria-hidden="true"
              className="animate-float-gentle pointer-events-none absolute -left-3 bottom-10 z-10 hidden sm:block"
              style={{ animationDelay: '1.3s' }}
            >
              <TinyHeartSvg color="#EBC6D0" size={20} />
            </div>

            <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-[#D9B7AC]/55 bg-[#FFFDFB] p-3 shadow-[0_22px_54px_rgba(120,61,80,0.09)] sm:p-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-[#F3DDE3]/45 lg:aspect-auto lg:h-full lg:min-h-[520px]">
                {!imgError ? (
                  <img
                    src={romanticConfig.hero.heroImage}
                    alt={romanticConfig.hero.heroImageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F3DDE3] to-[#FFF9F5] p-8 text-center">
                    <BotanicalRoseFlourish size={140} />
                    <span className="font-serif-editorial text-lg italic text-[#783D50]">
                      Roses &amp; Wild Strawberries
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
