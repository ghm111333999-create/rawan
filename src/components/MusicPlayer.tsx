import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';

const SESSION_MUSIC_KEY = 'little_world_music_playing';

interface MusicController {
  isPlaying: boolean;
  startMusic: () => Promise<void>;
  stopMusic: () => void;
  toggleMusic: () => Promise<void>;
}

/**
 * Soft Felt-Piano Web Audio Synthesizer fallback when `/public/music/romantic-piano.mp3`
 * is not yet supplied. Plays a gentle, low-volume romantic chord arpeggio.
 */
class SoftPianoFallback {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private intervalId: number | null = null;
  private step = 0;
  private running = false;

  // Tender Fmaj7 -> Cmaj7 -> Dm9 -> Bbmaj7 arpeggio notes (Hz)
  private readonly sequence = [
    174.61, 261.63, 329.63, 440.0, 523.25, 440.0, 329.63, 261.63, // Fmaj7
    130.81, 261.63, 329.63, 392.0, 493.88, 392.0, 329.63, 261.63, // Cmaj7
    146.83, 220.0, 293.66, 349.23, 440.0, 349.23, 293.66, 220.0,  // Dm7
    116.54, 233.08, 293.66, 349.23, 440.0, 349.23, 293.66, 233.08, // Bbmaj7
  ];

  private playNote(freq: number) {
    if (!this.ctx || !this.filter || !this.running) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.14, now);

    // Soft felt hammer attack and gentle decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.045);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 2.4);

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);
    noteGain.connect(this.filter);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.5);
    osc2.stop(now + 2.5);
  }

  public async start(volume: number) {
    if (this.running) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 1050;
      this.filter.Q.value = 0.7;

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(volume * 0.55, this.ctx.currentTime);
    }

    this.running = true;
    this.playNote(this.sequence[this.step % this.sequence.length]);
    this.step += 1;

    this.intervalId = window.setInterval(() => {
      if (!this.running) return;
      this.playNote(this.sequence[this.step % this.sequence.length]);
      this.step += 1;
    }, 620);
  }

  public stop() {
    this.running = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  public destroy() {
    this.stop();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}

export function useRomanticMusic(): MusicController {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackRef = useRef<SoftPianoFallback | null>(null);
  const hasRealAudioRef = useRef<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch(romanticConfig.music.trackPath, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        const ct = res.headers.get('content-type') || '';
        hasRealAudioRef.current = res.ok && ct.startsWith('audio/');
      })
      .catch(() => {
        if (active) hasRealAudioRef.current = false;
      });
    return () => {
      active = false;
    };
  }, []);

  const startMusic = useCallback(async () => {
    try {
      if (hasRealAudioRef.current === true) {
        if (!audioRef.current) {
          const audio = new Audio(romanticConfig.music.trackPath);
          audio.loop = true;
          audio.volume = romanticConfig.music.defaultVolume;
          audio.addEventListener('error', () => {
            hasRealAudioRef.current = false;
          });
          audioRef.current = audio;
        }
        await audioRef.current.play();
      } else {
        if (!fallbackRef.current) {
          fallbackRef.current = new SoftPianoFallback();
        }
        await fallbackRef.current.start(romanticConfig.music.defaultVolume);
      }
      setIsPlaying(true);
      sessionStorage.setItem(SESSION_MUSIC_KEY, 'true');
    } catch {
      try {
        if (!fallbackRef.current) {
          fallbackRef.current = new SoftPianoFallback();
        }
        await fallbackRef.current.start(romanticConfig.music.defaultVolume);
        setIsPlaying(true);
        sessionStorage.setItem(SESSION_MUSIC_KEY, 'true');
      } catch {
        setIsPlaying(false);
      }
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (fallbackRef.current) {
      fallbackRef.current.stop();
    }
    setIsPlaying(false);
    sessionStorage.setItem(SESSION_MUSIC_KEY, 'false');
  }, []);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      stopMusic();
    } else {
      await startMusic();
    }
  }, [isPlaying, startMusic, stopMusic]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fallbackRef.current) {
        fallbackRef.current.destroy();
        fallbackRef.current = null;
      }
    };
  }, []);

  return { isPlaying, startMusic, stopMusic, toggleMusic };
}

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      className="group inline-flex min-h-[40px] items-center gap-2.5 rounded-full border border-[#D9B7AC]/70 bg-[#FFF9F5]/90 px-4 py-2 text-xs font-medium tracking-wide text-[#783D50] shadow-[0_2px_10px_rgba(120,61,80,0.06)] transition-all duration-200 hover:border-[#783D50]/50 hover:bg-[#F3DDE3]/50 whitespace-nowrap shrink-0"
    >
      {isPlaying ? (
        <>
          <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden="true">
            <span
              className="w-[2px] h-full rounded-full bg-[#C83E50] origin-bottom"
              style={{ animation: 'musicBar 0.9s ease-in-out infinite' }}
            />
            <span
              className="w-[2px] h-full rounded-full bg-[#783D50] origin-bottom"
              style={{ animation: 'musicBar 0.7s ease-in-out 0.2s infinite' }}
            />
            <span
              className="w-[2px] h-full rounded-full bg-[#C83E50] origin-bottom"
              style={{ animation: 'musicBar 1.05s ease-in-out 0.4s infinite' }}
            />
          </span>
          <Volume2 className="h-3.5 w-3.5 text-[#783D50]" />
          <span>Music On</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5 text-[#783D50]/75" />
          <span>Play Music</span>
        </>
      )}
    </button>
  );
};
