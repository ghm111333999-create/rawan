/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CustomStrawberryCursor } from './components/CustomStrawberryCursor';
import { FallingFlowers } from './components/FallingFlowers';
import { IntroScreen } from './components/IntroScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LoveLetter } from './components/LoveLetter';
import { MemoriesGallery } from './components/MemoriesGallery';
import { SurpriseSection } from './components/SurpriseSection';
import { HiddenStrawberry } from './components/HiddenStrawberry';
import { FinalSection } from './components/FinalSection';
import { useRomanticMusic } from './components/MusicPlayer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, startMusic, toggleMusic } = useRomanticMusic();

  const handleEnterWorld = (withMusic: boolean) => {
    setHasEntered(true);
    if (withMusic) {
      startMusic();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] text-[#4A2531]">
      {/* Desktop custom strawberry cursor */}
      <CustomStrawberryCursor />

      {/* Continuous subtle ambient falling flowers & burst particles */}
      <FallingFlowers />

      {/* Full-screen opening invitation */}
      <IntroScreen isOpen={!hasEntered} onEnter={handleEnterWorld} />

      {/* Main romantic experience */}
      <div
        className={`transition-opacity duration-700 ${
          hasEntered ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!hasEntered}
      >
        <Navigation isPlaying={isPlaying} onToggleMusic={toggleMusic} />

        <main>
          <HeroSection />
          <LoveLetter />
          <MemoriesGallery />
          <HiddenStrawberry />
          <SurpriseSection />
        </main>

        <FinalSection />
      </div>
    </div>
  );
}
