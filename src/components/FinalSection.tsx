import React from 'react';
import { motion } from 'motion/react';
import { romanticConfig } from '../config/romanticConfig';
import {
  AnimatedRoseIllustration,
  StrawberryGraphic,
  TinyHeartSvg,
} from './RomanticIllustrations';

export const FinalSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#F3DDE3]/45 to-[#EBC6D0]/35 pt-20 pb-14 sm:pt-28 sm:pb-16">
      <div className="relative mx-auto max-w-[780px] px-6 text-center sm:px-8">
        {/* Animated Rose, Floating Strawberry & Soft Glowing Heart */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6 flex items-center justify-center gap-6">
            <div className="animate-float-gentle">
              <StrawberryGraphic size={34} withBlossom />
            </div>

            <div className="animate-float-slow">
              <AnimatedRoseIllustration size={108} />
            </div>

            <div className="relative flex items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute h-10 w-10 rounded-full bg-[#C83E50]/20 blur-md"
              />
              <div className="animate-heart-glow relative">
                <TinyHeartSvg color="#C83E50" size={24} />
              </div>
            </div>
          </div>

          <h2 className="font-serif-editorial text-balance text-3xl font-medium tracking-tight text-[#783D50] sm:text-4xl md:text-5xl">
            {romanticConfig.finalSection.heading}
          </h2>

          <div className="mt-7 space-y-4 text-base leading-[1.85] text-[#4A2531]/85 sm:text-lg">
            {romanticConfig.finalSection.paragraphs.map((line, index) => (
              <p key={index} className="mx-auto max-w-xl">
                {line}
              </p>
            ))}
          </div>

          {/* Quiet Luxury Footer Divider */}
          <div className="mt-14 w-full border-t border-[#D9B7AC]/55 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="font-handwritten text-2xl text-[#783D50]">
                {romanticConfig.finalSection.footerNote}
              </p>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#D9B7AC]/80 bg-[#FFF9F5]/85 px-5 py-2 text-xs font-medium tracking-wide text-[#783D50] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFF9F5] hover:shadow-sm whitespace-nowrap shrink-0"
              >
                {romanticConfig.finalSection.backToTop}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
