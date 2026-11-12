import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { MusicPlayer } from './MusicPlayer';

interface NavigationProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isPlaying, onToggleMusic }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#D9B7AC]/35 bg-[#FFF9F5]/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-3.5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-serif-editorial text-xl font-medium tracking-tight text-[#783D50] transition-opacity hover:opacity-80 whitespace-nowrap shrink-0 sm:text-2xl"
        >
          {romanticConfig.brandTitle}
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary sections"
          className="hidden items-center gap-7 md:flex"
        >
          {romanticConfig.navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="relative py-1 text-sm font-medium text-[#4A2531]/80 transition-colors duration-200 hover:text-[#783D50] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#C83E50] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (Music Player) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <MusicPlayer isPlaying={isPlaying} onToggle={onToggleMusic} />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B7AC]/60 text-[#783D50] transition-colors hover:bg-[#F3DDE3]/50 md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile sections"
          className="border-t border-[#D9B7AC]/30 bg-[#FFF9F5] px-6 py-3 md:hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            {romanticConfig.navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="min-h-[44px] inline-flex items-center px-2 text-sm font-medium text-[#783D50] hover:text-[#C83E50] whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
