import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { StrawberryGraphic, TinyHeartSvg } from './RomanticIllustrations';
import { triggerRomanticBurst } from './FallingFlowers';

export const HiddenStrawberry: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleDiscover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerRomanticBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 16,
    });
    setIsOpen(true);
  };

  return (
    <>
      {/* Subtle, discoverable hidden strawberry nestled quietly in a decorative botanical corner */}
      <div className="relative mx-auto flex max-w-[1200px] justify-end px-6 sm:px-8">
        <button
          type="button"
          onClick={handleDiscover}
          aria-label="A tiny hidden strawberry"
          title="What is this?"
          className="group -mt-6 mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full opacity-60 transition-all duration-300 hover:scale-125 hover:opacity-100 focus-visible:opacity-100"
        >
          <StrawberryGraphic
            size={24}
            className="drop-shadow-[0_2px_6px_rgba(200,62,80,0.2)] transition-transform duration-300 group-hover:-rotate-12"
          />
        </button>
      </div>

      {/* Secret Romantic Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="secret-strawberry-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={romanticConfig.hiddenStrawberry.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#321720]/45 p-6 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-[1.5rem] border border-[#D9B7AC]/80 bg-[#FFF9F5] px-7 py-9 text-center shadow-[0_24px_60px_rgba(120,61,80,0.22)]"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close secret message"
                className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#783D50]/70 transition-colors hover:bg-[#F3DDE3]/60 hover:text-[#783D50]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3DDE3]/65">
                <StrawberryGraphic size={36} withBlossom />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-medium tracking-[0.16em] text-[#783D50]/75 uppercase">
                <TinyHeartSvg color="#C83E50" size={12} />
                <span>{romanticConfig.hiddenStrawberry.title}</span>
                <TinyHeartSvg color="#C83E50" size={12} />
              </div>

              <p className="font-handwritten mt-4 text-3xl leading-snug text-[#783D50]">
                {romanticConfig.hiddenStrawberry.secretMessage}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
