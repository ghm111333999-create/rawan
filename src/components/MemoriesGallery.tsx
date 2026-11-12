import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Expand } from 'lucide-react';
import { MemoryItem, romanticConfig } from '../config/romanticConfig';
import {
  BotanicalRoseFlourish,
  TinyBlossomSvg,
  TinyHeartSvg,
} from './RomanticIllustrations';

interface MemoryCardProps {
  item: MemoryItem;
  index: number;
  onSelect: (item: MemoryItem) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ item, index, onSelect }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ ['--card-tilt' as string]: `${item.tiltDegrees}deg` }}
      className="group relative flex flex-col"
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`View ${item.slotLabel}: ${item.caption}`}
        className="relative flex w-full flex-col rounded-[1.25rem] border border-[#D9B7AC]/55 bg-[#FFFDFB] p-4 pb-6 text-left shadow-[0_14px_38px_rgba(120,61,80,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_52px_rgba(120,61,80,0.14)] md:[transform:rotate(var(--card-tilt))] md:hover:[transform:rotate(0deg)_translateY(-6px)]"
      >
        {/* Subtle top tape / floral accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-2.5 right-6 z-10 opacity-85 transition-transform duration-300 group-hover:scale-110"
        >
          {index % 2 === 0 ? (
            <TinyBlossomSvg color="#F3DDE3" size={24} />
          ) : (
            <TinyHeartSvg color="#EBC6D0" size={18} />
          )}
        </div>

        {/* Image frame preserving original aspect ratio */}
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[0.85rem] bg-[#F8EFEA]">
          {!hasError ? (
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className={`max-h-[400px] w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
                item.kind === 'illustration' ? 'object-contain bg-[#FAF4EE]' : 'object-cover'
              }`}
            />
          ) : (
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F3DDE3]/70 to-[#FFF9F5] p-6 text-center">
              <BotanicalRoseFlourish size={96} />
              <span className="font-serif-editorial text-base italic text-[#783D50]">
                {item.slotLabel}
              </span>
            </div>
          )}

          {/* Subtle view cue on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF9F5]/90 text-[#783D50] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
          >
            <Expand className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Polaroid margin & caption */}
        <figcaption className="mt-4 px-1">
          <div className="flex items-center gap-2 text-xs text-[#783D50]/70">
            <span>{item.slotLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{item.dateLabel}</span>
          </div>

          <p className="font-handwritten mt-2 text-[1.45rem] leading-snug text-[#4A2531] transition-colors duration-200 group-hover:text-[#783D50] md:opacity-90 md:group-hover:opacity-100">
            {item.caption}
          </p>
        </figcaption>
      </button>
    </motion.figure>
  );
};

export const MemoriesGallery: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [lightboxError, setLightboxError] = useState(false);

  useEffect(() => {
    setLightboxError(false);
  }, [selectedMemory]);

  useEffect(() => {
    if (!selectedMemory) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMemory(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedMemory]);

  const photographs = romanticConfig.memories.items.filter((m) => m.kind === 'photograph');
  const illustrations = romanticConfig.memories.items.filter((m) => m.kind === 'illustration');

  return (
    <section
      id="memories"
      className="relative overflow-hidden border-b border-[#D9B7AC]/30 bg-[#FFF9F5] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-[#783D50]/75 uppercase">
            {romanticConfig.memories.sectionEyebrow}
          </p>
          <h2 className="font-serif-editorial text-balance mt-3 text-3xl font-medium tracking-tight text-[#783D50] sm:text-4xl md:text-5xl">
            {romanticConfig.memories.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A2531]/80 sm:text-lg">
            {romanticConfig.memories.subheading}
          </p>
        </div>

        {/* Photographs Row — Polaroid Scrapbook Frames */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 md:grid-cols-3 lg:gap-10">
          {photographs.map((item, idx) => (
            <MemoryCard
              key={item.id}
              item={item}
              index={idx}
              onSelect={setSelectedMemory}
            />
          ))}
        </div>

        {/* Curated Companion Botanical Illustration Plate (visually harmonized, never awkwardly mixed) */}
        {illustrations.length > 0 && (
          <div className="mt-16 border-t border-[#D9B7AC]/35 pt-14">
            {illustrations.map((illus, idx) => (
              <motion.div
                key={illus.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 rounded-[1.5rem] border border-[#D9B7AC]/50 bg-[#FFFDFB] p-6 shadow-[0_16px_42px_rgba(120,61,80,0.07)] md:grid-cols-12 md:p-8"
              >
                <div className="md:col-span-6">
                  <button
                    type="button"
                    onClick={() => setSelectedMemory(illus)}
                    className="group relative block w-full overflow-hidden rounded-[1rem] border border-[#D9B7AC]/35 bg-[#FAF4EE] p-2 transition-transform duration-300 hover:scale-[1.02]"
                    aria-label={`View ${illus.slotLabel}`}
                  >
                    <img
                      src={illus.imageSrc}
                      alt={illus.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-auto w-full rounded-[0.75rem] object-contain"
                    />
                  </button>
                </div>

                <div className="flex flex-col justify-center md:col-span-6 md:pl-4">
                  <div className="flex items-center gap-2 text-xs text-[#783D50]/75">
                    <span>{illus.slotLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{illus.dateLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{illus.locationLabel}</span>
                  </div>

                  <h3 className="font-handwritten mt-3 text-3xl text-[#783D50]">
                    {illus.caption}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#4A2531]/80 sm:text-base">
                    {illus.story}
                  </p>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedMemory(illus)}
                      className="inline-flex min-h-[40px] items-center gap-2 border-b border-[#783D50]/40 pb-1 text-xs font-medium tracking-wide text-[#783D50] transition-colors hover:border-[#C83E50] hover:text-[#C83E50]"
                    >
                      <span>View illustration closely</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal preserving original image aspect ratio */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            key="memory-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedMemory(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedMemory.slotLabel}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#321720]/70 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-[#D9B7AC]/60 bg-[#FFF9F5] p-5 shadow-2xl sm:p-7"
            >
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close memory preview"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B7AC]/70 bg-[#FFF9F5] text-[#783D50] transition-colors hover:bg-[#F3DDE3]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex max-h-[60vh] items-center justify-center overflow-hidden rounded-[1rem] bg-[#F7ECE6]/70 p-2">
                {!lightboxError ? (
                  <img
                    src={selectedMemory.imageSrc}
                    alt={selectedMemory.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setLightboxError(true)}
                    className="max-h-[56vh] w-auto max-w-full rounded-[0.75rem] object-contain"
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center">
                    <BotanicalRoseFlourish size={120} />
                  </div>
                )}
              </div>

              <div className="mt-5 px-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#783D50]/75">
                  <span>{selectedMemory.slotLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedMemory.dateLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedMemory.locationLabel}</span>
                </div>
                <p className="font-handwritten mt-2 text-2xl text-[#783D50] sm:text-3xl">
                  {selectedMemory.caption}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4A2531]/85 sm:text-base">
                  {selectedMemory.story}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
