import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import {
  BotanicalRoseFlourish,
  StrawberryGraphic,
  TinyBlossomSvg,
  TinyHeartSvg,
} from './RomanticIllustrations';
import { triggerRomanticBurst } from './FallingFlowers';

interface IntroScreenProps {
  isOpen: boolean;
  onEnter: (withMusic: boolean) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ isOpen, onEnter }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isExiting) return;
    setIsExiting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    triggerRomanticBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 26,
    });
    onEnter(musicEnabled);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.02 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FFF9F5] px-6 py-12"
        >
          {/* Subtle pink & warm champagne radial atmospheric gradients */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 22% 24%, rgba(243, 221, 227, 0.62) 0%, transparent 48%), radial-gradient(circle at 78% 74%, rgba(235, 198, 208, 0.45) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255, 249, 245, 0.9) 0%, rgba(243, 221, 227, 0.25) 100%)',
            }}
          />

          {/* Delicate floating flower illustrations & golden sparkles */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-float-slow absolute left-[7%] top-[12%] opacity-75 md:left-[12%] md:top-[15%]">
              <TinyBlossomSvg color="#F3DDE3" size={34} />
            </div>
            <div
              className="animate-float-slow absolute right-[9%] top-[16%] opacity-80 md:right-[14%] md:top-[18%]"
              style={{ animationDelay: '1.2s' }}
            >
              <TinyBlossomSvg color="#EBC6D0" size={28} />
            </div>
            <div
              className="animate-float-gentle absolute bottom-[16%] left-[10%] opacity-70 md:left-[16%]"
              style={{ animationDelay: '0.7s' }}
            >
              <TinyHeartSvg color="#EBC6D0" size={20} />
            </div>
            <div
              className="animate-float-gentle absolute bottom-[18%] right-[11%] opacity-75 md:right-[17%]"
              style={{ animationDelay: '1.8s' }}
            >
              <TinyHeartSvg color="#D9B7AC" size={18} />
            </div>

            {/* Golden sparkles */}
            <svg
              className="animate-shimmer-soft absolute left-[24%] top-[28%]"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" fill="#C9A77B" />
            </svg>
            <svg
              className="animate-shimmer-soft absolute right-[23%] top-[33%]"
              style={{ animationDelay: '1.4s' }}
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" fill="#C9A77B" />
            </svg>
            <svg
              className="animate-shimmer-soft absolute bottom-[28%] left-[28%]"
              style={{ animationDelay: '2.1s' }}
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" fill="#C9A77B" />
            </svg>
          </div>

          {/* Central Luxury Keepsake Frame */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-[2rem] border border-[#D9B7AC]/55 bg-[#FFF9F5]/85 px-7 py-12 text-center shadow-[0_24px_64px_rgba(120,61,80,0.08)] backdrop-blur-sm sm:px-12 sm:py-16"
          >
            {/* Delicate corner botanical flourish */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <BotanicalRoseFlourish size={126} />
            </div>

            <div className="mb-3 flex items-center gap-2 text-xs tracking-[0.22em] text-[#783D50]/80 uppercase">
              <span>A Digital Keepsake</span>
            </div>

            <h1 className="font-serif-editorial text-balance text-4xl font-medium tracking-tight text-[#783D50] sm:text-5xl md:text-6xl">
              {romanticConfig.intro.headline}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A2531]/85 sm:text-lg">
              {romanticConfig.intro.subheadline}
            </p>

            {/* Optional music enable toggle (user-initiated only) */}
            <label className="mt-7 inline-flex cursor-pointer items-center gap-2.5 text-sm text-[#783D50]/85 select-none">
              <input
                type="checkbox"
                checked={musicEnabled}
                onChange={(e) => setMusicEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-[#D9B7AC] accent-[#783D50]"
              />
              <Music className="h-3.5 w-3.5 text-[#C9A77B]" />
              <span>{romanticConfig.intro.musicHint}</span>
            </label>

            {/* Enter Button */}
            <button
              type="button"
              onClick={handleEnterClick}
              className="group relative mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[#783D50] px-8 py-3.5 text-sm font-medium tracking-wide text-[#FFF9F5] shadow-[0_12px_28px_rgba(120,61,80,0.22)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#8A485D] hover:shadow-[0_16px_34px_rgba(120,61,80,0.28)] active:translate-y-0 whitespace-nowrap shrink-0"
            >
              <span>{romanticConfig.intro.enterButton}</span>
              <StrawberryGraphic
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
