import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import {
  BotanicalRoseFlourish,
  PetalSvg,
  TinyHeartSvg,
  WaxSealIllustration,
} from './RomanticIllustrations';
import { triggerRomanticBurst } from './FallingFlowers';

export const LoveLetter: React.FC = () => {
  const [stage, setStage] = useState<'sealed' | 'opening' | 'open'>('sealed');

  const handleOpenLetter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stage !== 'sealed') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setStage('opening');

    triggerRomanticBurst({
      x: rect.left + rect.width / 2,
      y: rect.top,
      count: 18,
    });

    window.setTimeout(() => {
      setStage('open');
    }, 850);
  };

  const handleFoldBack = () => {
    setStage('sealed');
  };

  return (
    <section
      id="love-letter"
      className="relative overflow-hidden border-b border-[#D9B7AC]/30 bg-gradient-to-b from-[#FFF9F5] via-[#F3DDE3]/28 to-[#FFF9F5] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[960px] px-6 sm:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-[#783D50]/75 uppercase">
            {romanticConfig.loveLetter.sectionEyebrow}
          </p>
          <h2 className="font-serif-editorial text-balance mt-3 text-3xl font-medium tracking-tight text-[#783D50] sm:text-4xl md:text-5xl">
            {romanticConfig.loveLetter.envelopeHeading}
          </h2>
        </div>

        {/* Interactive Envelope -> Letter Transition */}
        <div className="mt-12 flex min-h-[420px] items-center justify-center sm:mt-14">
          <AnimatePresence mode="wait">
            {stage !== 'open' ? (
              <motion.div
                key="envelope-view"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-full max-w-md flex-col items-center"
              >
                {/* Floating Champagne Envelope */}
                <div
                  className={`relative w-full max-w-[400px] ${
                    stage === 'sealed' ? 'animate-float-slow' : ''
                  }`}
                  style={{ perspective: '1100px' }}
                >
                  <div className="relative h-[250px] w-full rounded-xl border border-[#D9B7AC]/80 bg-[#F6E4E9] shadow-[0_24px_50px_rgba(120,61,80,0.13)] sm:h-[270px]">
                    {/* Emerging inner letter card peek during opening */}
                    <motion.div
                      initial={{ y: 0, opacity: 0 }}
                      animate={
                        stage === 'opening'
                          ? { y: -74, opacity: 1 }
                          : { y: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-5 top-4 z-10 h-44 rounded-lg border border-[#D9B7AC]/50 bg-[#FFFDFB] p-5 shadow-md"
                    >
                      <p className="font-handwritten text-xl text-[#783D50]">
                        {romanticConfig.loveLetter.paragraphs[0]}
                      </p>
                      <div className="mt-2 h-px w-24 bg-[#D9B7AC]/50" />
                      <p className="font-handwritten mt-2 line-clamp-2 text-lg text-[#4A2531]/75">
                        {romanticConfig.loveLetter.paragraphs[1]}
                      </p>
                    </motion.div>

                    {/* Envelope Inner Pocket Background */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="h-full w-full bg-gradient-to-b from-[#EED2DA] to-[#F6E4E9]" />
                    </div>

                    {/* Envelope Side & Bottom Fold Geometry */}
                    <svg
                      viewBox="0 0 400 260"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 z-20 h-full w-full rounded-xl"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 0 L200 135 L0 260 Z"
                        fill="#F3DDE3"
                        stroke="#D9B7AC"
                        strokeOpacity="0.55"
                      />
                      <path
                        d="M400 0 L200 135 L400 260 Z"
                        fill="#F0D6DE"
                        stroke="#D9B7AC"
                        strokeOpacity="0.55"
                      />
                      <path
                        d="M0 260 L200 124 L400 260 Z"
                        fill="#F7E6EB"
                        stroke="#D9B7AC"
                        strokeOpacity="0.65"
                      />
                    </svg>

                    {/* Top Animated Flap */}
                    <motion.div
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: stage === 'opening' ? -175 : 0 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                      className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[55%]"
                    >
                      <svg
                        viewBox="0 0 400 144"
                        preserveAspectRatio="none"
                        className="h-full w-full drop-shadow-[0_4px_10px_rgba(120,61,80,0.08)]"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 0 L400 0 L200 140 Z"
                          fill="#F5E1E7"
                          stroke="#D9B7AC"
                          strokeWidth="1"
                        />
                      </svg>
                    </motion.div>

                    {/* Blush-pink wax seal & tiny rose/heart crest */}
                    <motion.div
                      animate={{
                        opacity: stage === 'opening' ? 0 : 1,
                        scale: stage === 'opening' ? 0.85 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute left-1/2 top-[48%] z-40 -translate-x-1/2 -translate-y-1/2"
                    >
                      <WaxSealIllustration
                        size={68}
                        className="drop-shadow-[0_6px_14px_rgba(120,61,80,0.2)]"
                      />
                    </motion.div>

                    {/* Tiny corner floral touch */}
                    <div className="pointer-events-none absolute bottom-3 right-4 z-30 flex items-center gap-1.5 opacity-80">
                      <TinyHeartSvg color="#C83E50" size={12} />
                      <span className="font-handwritten text-base text-[#783D50]">
                        For You
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="mt-10 inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#783D50] px-8 py-3.5 text-sm font-medium tracking-wide text-[#FFF9F5] shadow-[0_12px_28px_rgba(120,61,80,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8A485D] whitespace-nowrap shrink-0"
                >
                  <span>{romanticConfig.loveLetter.openButton}</span>
                </button>
              </motion.div>
            ) : (
              <motion.article
                key="letter-reading-view"
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl rounded-[1.5rem] border border-[#D9B7AC]/65 bg-[#FFFDFB] px-7 py-10 shadow-[0_26px_64px_rgba(120,61,80,0.1)] sm:px-14 sm:py-14"
              >
                {/* Subtle rose-petal decorations around the opened letter */}
                <div
                  aria-hidden="true"
                  className="animate-float-gentle pointer-events-none absolute -left-4 -top-4 hidden sm:block"
                >
                  <PetalSvg color="#EBC6D0" size={26} />
                </div>
                <div
                  aria-hidden="true"
                  className="animate-float-slow pointer-events-none absolute -right-3 bottom-10 hidden sm:block"
                >
                  <PetalSvg color="#F3DDE3" size={24} />
                </div>

                {/* Stationery header flourish */}
                <div className="mb-8 flex flex-col items-center border-b border-[#D9B7AC]/35 pb-6">
                  <BotanicalRoseFlourish size={115} />
                </div>

                {/* Handwritten Letter Body */}
                <div className="space-y-5 font-handwritten text-[1.45rem] leading-[1.6] text-[#4A2531] sm:text-[1.65rem]">
                  {romanticConfig.loveLetter.paragraphs.map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.1 + idx * 0.08 }}
                      className={
                        idx === 0 || idx === romanticConfig.loveLetter.paragraphs.length - 1
                          ? 'text-[#783D50]'
                          : ''
                      }
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Letter Footer Action */}
                <div className="mt-10 flex items-center justify-between border-t border-[#D9B7AC]/35 pt-6">
                  <div className="flex items-center gap-2 text-xs tracking-wider text-[#783D50]/70 uppercase">
                    <TinyHeartSvg color="#C83E50" size={13} />
                    <span>{romanticConfig.loveLetter.signatureLabel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleFoldBack}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#D9B7AC]/70 px-4 py-1.5 text-xs font-medium text-[#783D50] transition-colors hover:bg-[#F3DDE3]/50 whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{romanticConfig.loveLetter.closeButton}</span>
                  </button>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
