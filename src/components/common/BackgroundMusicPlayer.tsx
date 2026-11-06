import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

const MUSIC_PREF_KEY = "hss_portfolio_music_playing";

/**
 * ============================================================================
 * 1. ALWAYS-ON DEFAULT UI HOVER & CLICK SOUND ENGINE (ALL DEVICES: iPhone, iPad, Desktop)
 * ============================================================================
 * - Completely independent from the "Play Music" button (always enabled by default).
 * - Unlocks WebKit / iOS / iPadOS AudioContext synchronously on first touch/pointer gesture
 *   using a 1-sample silent buffer + immediate `resume()` so click sounds work on iPhone,
 *   iPad, Android, and Desktop right from the very first tap.
 */
class DefaultUISoundEngine {
  private uiCtx: AudioContext | null = null;
  private bound = false;
  private unlocked = false;
  private lastClickTime = 0;
  private lastHoverTime = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.bindGlobalListeners();
    }
  }

  private getOrCreateContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.uiCtx) {
      this.uiCtx = new AudioCtx();
    }

    if (this.uiCtx.state === "suspended") {
      void this.uiCtx.resume().catch(() => {});
    }

    // Unlock iOS/iPadOS Safari WebAudio on first user gesture
    if (!this.unlocked && this.uiCtx) {
      try {
        const buffer = this.uiCtx.createBuffer(1, 1, 22050);
        const source = this.uiCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.uiCtx.destination);
        source.start(0);
        if (this.uiCtx.state === "running") {
          this.unlocked = true;
        }
      } catch {
        // Ignore unlock errors
      }
    }

    return this.uiCtx;
  }

  private bindGlobalListeners(): void {
    if (this.bound || typeof window === "undefined") return;
    this.bound = true;

    const interactiveSelector =
      "a, button, [role='button'], [role='tab'], input, textarea, select, label, [data-interactive='true']";

    // Handle click / tap across iPhone, iPad, Android, and Desktop
    const handlePress = (e: Event) => {
      const nowMs = performance.now();
      // Deduplicate rapid touchstart + pointerdown + mousedown from a single tap on mobile/iPad
      if (nowMs - this.lastClickTime < 55) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Always unlock audio context on any touch/pointer gesture on iPhone/iPad
      const ctx = this.getOrCreateContext();
      if (!ctx) return;

      const interactive = target.closest(interactiveSelector);
      const isCanvasOrMascot = Boolean(target.closest("canvas, [role='img']"));

      if (interactive || isCanvasOrMascot) {
        this.lastClickTime = nowMs;
        const isNav = Boolean(target.closest("nav, header"));
        this.triggerClickTone(ctx, isNav);
      }
    };

    // Listen to touchstart (crucial for iPhone/iPad instant response), pointerdown, and keydown
    window.addEventListener("touchstart", handlePress, {
      passive: true,
      capture: true,
    });
    window.addEventListener("pointerdown", handlePress, {
      passive: true,
      capture: true,
    });
    window.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          handlePress(e);
        } else {
          this.getOrCreateContext();
        }
      },
      { passive: true, capture: true }
    );

    // Handle hover sounds on desktop / iPad trackpad pointer
    window.addEventListener(
      "mouseover",
      (e: MouseEvent) => {
        const nowMs = performance.now();
        if (nowMs - this.lastHoverTime < 55) return;

        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest(interactiveSelector);
        if (!interactive) return;

        const related = e.relatedTarget as Node | null;
        if (related && interactive.contains(related)) return;

        const ctx = this.getOrCreateContext();
        if (!ctx || ctx.state !== "running") return;

        this.lastHoverTime = nowMs;
        const isNav = Boolean(target.closest("nav, header"));
        this.triggerHoverTone(ctx, isNav);
      },
      { passive: true }
    );
  }

  /**
   * Warm, Tactile Apple-Style UI Click Sound (Works on iPhone, iPad, and Desktop)
   */
  public triggerClickTone(ctx: AudioContext, isNav = false): void {
    const scheduleTone = () => {
      try {
        const now = ctx.currentTime;

        // Warm low-mid body transient + crisp woodblock/marimba overtone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const env = ctx.createGain();

        osc1.type = "triangle";
        osc2.type = "sine";

        const baseFreq = isNav ? 340 : 295;
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(135, now + 0.042);

        osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(180, now + 0.032);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(920, now);

        env.gain.setValueAtTime(0.0001, now);
        env.gain.linearRampToValueAtTime(0.085, now + 0.003);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 0.048);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(env);
        env.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.052);
        osc2.stop(now + 0.052);
      } catch {
        // Ignore audio scheduling errors
      }
    };

    if (ctx.state === "running") {
      scheduleTone();
    } else {
      void ctx
        .resume()
        .then(() => {
          this.unlocked = true;
          scheduleTone();
        })
        .catch(() => {});
    }
  }

  /**
   * Soft, Velvety Hover Chime for Navigation & Interactive Controls
   */
  public triggerHoverTone(ctx: AudioContext, isNav = true): void {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const env = ctx.createGain();

      osc.type = "sine";
      const startFreq = isNav ? 261.63 : 220.0; // Warm C4 / A3
      const endFreq = isNav ? 329.63 : 277.18;  // Warm E4 / C#4
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(640, now);

      const peakGain = isNav ? 0.038 : 0.024;
      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(peakGain, now + 0.007);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(filter);
      filter.connect(env);
      env.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore hover audio errors
    }
  }
}

// Instantiate the always-on UI sound engine immediately
export const uiSoundEngine = new DefaultUISoundEngine();

/**
 * ============================================================================
 * 2. SOFT, POSITIVE, SOOTHING & INTERESTING BACKGROUND SONG ENGINE
 * ============================================================================
 * Multi-layered warm acoustic-ambient composition in D Major / Gmaj9 Lydian:
 *  - Voice 1: Warm Felt Electric Piano / Rhodes chords (8-bar progression)
 *  - Voice 2: Flowing Plucked Acoustic Harp / Kalimba arpeggio (evolving 64-step pattern)
 *  - Voice 3: Uplifting, Soothing Felt-Piano Melody with expressive phrasing
 *  - Voice 4: Velvet Acoustic Sub-Bass & Soft Lo-Fi Pulse
 * Controlled strictly by the "Play Music" button in the navigation bar.
 */
class PositiveSoothingSongEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;

  // ON by default unless explicitly paused by the user in this session
  private isPlayingState = true;
  private stepTimer: number | null = null;
  private stepIndex = 0;
  private listeners = new Set<(playing: boolean) => void>();
  private unlockBound = false;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(MUSIC_PREF_KEY);
        if (saved === "paused") {
          this.isPlayingState = false;
        } else {
          this.isPlayingState = true;
        }
      } catch {
        this.isPlayingState = true;
      }

      const startWhenAvailable = () => {
        if (this.isPlayingState && document.visibilityState !== "hidden") {
          void this.startAudioEngine();
        }
      };

      if (document.readyState === "complete") {
        window.setTimeout(startWhenAvailable, 0);
      } else {
        window.addEventListener("load", startWhenAvailable, { once: true });
      }
      window.addEventListener("pageshow", startWhenAvailable);
      document.addEventListener("visibilitychange", startWhenAvailable);
      this.bindAutoUnlock();
    }
  }

  private bindAutoUnlock(): void {
    if (typeof window === "undefined" || this.unlockBound) return;
    this.unlockBound = true;

    const resumeIfDefaultPlaying = () => {
      if (this.isPlayingState) {
        void this.startAudioEngine();
      }
    };

    const events = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "keydown",
      "click",
    ];
    events.forEach((evt) =>
      window.addEventListener(evt, resumeIfDefaultPlaying, {
        passive: true,
        once: false,
      })
    );
  }

  // 8-Bar Uplifting & Soothing Chord Progression in D Major / G Lydian (Warm 110Hz–370Hz register)
  // Gmaj9 -> A6/9 -> Bm11 -> F#m7 -> Gmaj9 -> Dmaj9 -> Em9 -> A13sus4
  private readonly chordProgression: number[][] = [
    [146.83, 185.0, 220.0, 246.94, 293.66],  // Bar 1: Gmaj9 (D3, F#3, A3, B3, D4)
    [164.81, 185.0, 220.0, 246.94, 277.18],  // Bar 2: A6/9  (E3, F#3, A3, B3, C#4)
    [146.83, 185.0, 220.0, 246.94, 329.63],  // Bar 3: Bm11  (D3, F#3, A3, B3, E4)
    [138.59, 164.81, 185.0, 220.0, 277.18],  // Bar 4: F#m7  (C#3, E3, F#3, A3, C#4)
    [146.83, 185.0, 220.0, 246.94, 293.66],  // Bar 5: Gmaj9 (D3, F#3, A3, B3, D4)
    [146.83, 185.0, 220.0, 277.18, 329.63],  // Bar 6: Dmaj9 (D3, F#3, A3, C#4, E4)
    [146.83, 185.0, 196.0, 246.94, 293.66],  // Bar 7: Em9   (D3, F#3, G3, B3, D4)
    [164.81, 196.0, 220.0, 246.94, 293.66],  // Bar 8: A13sus4 (E3, G3, A3, B3, D4)
  ];

  // Warm Deep Bass Roots (G2, A2, B2, F#2, G2, D2, E2, A2)
  private readonly bassNotes: number[] = [
    98.0, 110.0, 123.47, 92.5, 98.0, 73.42, 82.41, 110.0,
  ];

  // Flowing Plucked Kalimba / Acoustic Harp Arpeggio Pattern (indices into current 5-note chord)
  private readonly arpPattern: number[] = [0, 2, 4, 3, 1, 4, 2, 3];

  // 64-Step (8 Bars x 8 Eighth-Notes) Positive, Soothing & Interesting Felt-Piano Melody (Hz, 0 = rest)
  // Stays in the warm, expressive D4–A4 range (293Hz–440Hz) — never shrill or high-pitched
  private readonly upliftingMelody: number[] = [
    // Bar 1 (Gmaj9) - Warm, hopeful opening phrase
    293.66, 0, 329.63, 369.99, 0, 329.63, 293.66, 0,
    // Bar 2 (A6/9) - Gentle upward answer
    277.18, 0, 293.66, 329.63, 0, 246.94, 220.0, 0,
    // Bar 3 (Bm11) - Soulful melodic motif
    246.94, 293.66, 369.99, 0, 329.63, 0, 293.66, 246.94,
    // Bar 4 (F#m7) - Warm comforting resolution
    277.18, 0, 246.94, 220.0, 0, 185.0, 220.0, 0,
    // Bar 5 (Gmaj9) - Uplifting second theme
    369.99, 0, 392.0, 369.99, 0, 329.63, 293.66, 0,
    // Bar 6 (Dmaj9) - Glowing major harmony
    329.63, 0, 369.99, 440.0, 0, 369.99, 329.63, 0,
    // Bar 7 (Em9) - Tender reflective descent
    293.66, 329.63, 293.66, 0, 246.94, 0, 220.0, 196.0,
    // Bar 8 (A13sus4) - Positive, peaceful turnaround
    220.0, 0, 246.94, 293.66, 329.63, 0, 293.66, 0,
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlayingState);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn(this.isPlayingState));
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlayingState) {
      this.pause();
      try {
        sessionStorage.setItem(MUSIC_PREF_KEY, "paused");
      } catch {
        // Ignore storage errors
      }
      return false;
    } else {
      await this.play();
      try {
        sessionStorage.setItem(MUSIC_PREF_KEY, "playing");
      } catch {
        // Ignore storage errors
      }
      return true;
    }
  }

  public async play(): Promise<void> {
    this.isPlayingState = true;
    this.notify();
    await this.startAudioEngine();
  }

  private async startAudioEngine(): Promise<void> {
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return;
      }
    }

    if (ctx.state !== "running") return;

    const targetVolume = 0.16;

    if (!this.masterGain) {
      const now = ctx.currentTime;
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + 0.75);

      // Warm Stereo Tape Delay / Ambient Room Space
      this.delayNode = ctx.createDelay(1.2);
      this.delayNode.delayTime.value = 0.34;
      const delayFeedback = ctx.createGain();
      delayFeedback.gain.value = 0.32;
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = "lowpass";
      delayFilter.frequency.value = 620;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);
      delayFilter.connect(this.masterGain);

      this.masterGain.connect(ctx.destination);
    } else {
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(
        Math.max(0.0001, this.masterGain.gain.value),
        now
      );
      this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + 0.45);
    }

    if (this.stepTimer === null) {
      this.triggerMusicalStep();
      // ~92 BPM eighth-note groove (325ms per 8th note) — relaxed, positive & engaging
      this.stepTimer = window.setInterval(() => {
        if (this.isPlayingState && this.ctx?.state === "running") {
          this.triggerMusicalStep();
        }
      }, 325);
    }
  }

  private triggerMusicalStep(): void {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const step64 = this.stepIndex % 64;
    const stepInBar = step64 % 8;
    const barIdx = Math.floor(step64 / 8) % 8;
    this.stepIndex++;

    const currentChord = this.chordProgression[barIdx];

    // 1. Warm Rhodes / Felt Piano Pad on beat 1 of each bar
    if (stepInBar === 0) {
      this.playWarmRhodesChord(ctx, now, currentChord, 2.75);
      this.playVelvetBass(ctx, now, this.bassNotes[barIdx], 2.6);
    }

    // 2. Gentle Plucked Kalimba / Acoustic Harp Arpeggio on every 8th note
    const arpChordIdx = this.arpPattern[stepInBar];
    const arpFreq = currentChord[arpChordIdx];
    if (arpFreq) {
      this.playPluckedKalimbaNote(
        ctx,
        now,
        arpFreq,
        stepInBar % 2 === 0 ? 0.036 : 0.024
      );
    }

    // 3. Expressive Felt-Piano Positive Melody
    const melodyFreq = this.upliftingMelody[step64];
    if (melodyFreq > 0) {
      this.playExpressiveFeltPiano(ctx, now, melodyFreq);
    }

    // 4. Soft Lo-Fi Heartbeat & Warm Brushed Groove
    if (stepInBar === 0 || stepInBar === 4) {
      this.playSoftKickPulse(ctx, now, stepInBar === 0 ? 0.055 : 0.035);
    } else if (stepInBar === 2 || stepInBar === 6) {
      this.playWarmWoodTick(ctx, now);
    }
  }

  private playWarmRhodesChord(
    ctx: AudioContext,
    now: number,
    freqs: number[],
    duration: number
  ): void {
    if (!this.masterGain || !this.delayNode) return;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, now);
    filter.frequency.linearRampToValueAtTime(590, now + duration * 0.45);
    filter.frequency.linearRampToValueAtTime(360, now + duration);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.048, now + 0.65);
    env.gain.linearRampToValueAtTime(0.036, now + duration - 0.7);
    env.gain.linearRampToValueAtTime(0.0001, now + duration);

    filter.connect(env);
    env.connect(this.masterGain);
    env.connect(this.delayNode);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, now);
      osc.detune.setValueAtTime((i - 2) * 3.2, now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    });
  }

  private playPluckedKalimbaNote(
    ctx: AudioContext,
    now: number,
    freq: number,
    peakGain: number
  ): void {
    if (!this.masterGain || !this.delayNode) return;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(peakGain, now + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

    osc.connect(env);
    env.connect(this.masterGain);
    env.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  private playExpressiveFeltPiano(
    ctx: AudioContext,
    now: number,
    freq: number
  ): void {
    if (!this.masterGain || !this.delayNode) return;

    // Warm fundamental + gentle octave warmth filtered through a felt low-pass
    const oscFund = ctx.createOscillator();
    const oscWarmth = ctx.createOscillator();
    oscFund.type = "triangle";
    oscWarmth.type = "sine";

    oscFund.frequency.setValueAtTime(freq, now);
    oscWarmth.frequency.setValueAtTime(freq * 0.5, now);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(680, now);
    filter.frequency.exponentialRampToValueAtTime(290, now + 1.05);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.068, now + 0.025);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

    oscFund.connect(filter);
    oscWarmth.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);
    env.connect(this.delayNode);

    oscFund.start(now);
    oscWarmth.start(now);
    oscFund.stop(now + 1.2);
    oscWarmth.stop(now + 1.2);
  }

  private playVelvetBass(
    ctx: AudioContext,
    now: number,
    freq: number,
    duration: number
  ): void {
    if (!this.masterGain) return;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.088, now + 0.3);
    env.gain.linearRampToValueAtTime(0.065, now + duration - 0.5);
    env.gain.linearRampToValueAtTime(0.0001, now + duration);

    osc.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  private playSoftKickPulse(
    ctx: AudioContext,
    now: number,
    velocity: number
  ): void {
    if (!this.masterGain) return;

    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(92, now);
    osc.frequency.exponentialRampToValueAtTime(44, now + 0.12);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(velocity, now + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  private playWarmWoodTick(ctx: AudioContext, now: number): void {
    if (!this.masterGain) return;

    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.03);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.016, now + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  public pause(): void {
    this.isPlayingState = false;

    if (this.stepTimer !== null) {
      window.clearInterval(this.stepTimer);
      this.stepTimer = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      try {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(
          Math.max(0.0001, this.masterGain.gain.value),
          now
        );
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.22);
      } catch {
        // Ignore audio scheduling race conditions
      }
    }

    this.notify();
  }
}

const musicEngine = new PositiveSoothingSongEngine();

function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(musicEngine.isPlaying());

  useEffect(() => {
    return musicEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  const toggleMusic = () => {
    void musicEngine.toggle();
  };

  return { isPlaying, toggleMusic };
}

/**
 * Refined Burnt-Orange Play/Pause Music Control for the Collapsed & Expanded Navigation Bar.
 * Controls ONLY the soothing background song — UI hover and click sounds remain enabled at all times.
 */
export const NavbarMusicToggle: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? "Pause background music" : "Play background music"}
      className={`inline-flex items-center gap-1 sm:gap-2 rounded-full font-heading font-semibold transition-all duration-300 border shrink-0 ${
        compact
          ? "px-2 sm:px-3.5 py-1 sm:py-2 text-[10.5px] sm:text-[13.5px]"
          : "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[14px]"
      } ${
        isPlaying
          ? "bg-[#E86A33]/22 border-[#E86A33]/80 text-[#F5F3F0] shadow-[0_0_24px_rgba(232,106,51,0.32)]"
          : "bg-[#1C1B1E]/85 hover:bg-[#262428]/90 border-[#F5F3F0]/18 hover:border-[#E86A33]/55 text-[#F5F3F0]"
      }`}
    >
      {/* Play / Pause Icon */}
      <span
        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
          isPlaying
            ? "bg-[#E86A33] text-[#121316]"
            : "bg-[#121316]/90 text-[#E86A33]"
        }`}
      >
        {isPlaying ? (
          <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
        ) : (
          <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
        )}
      </span>

      {/* Label + Equalizer Bars */}
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="hidden xs:inline">
          {isPlaying ? "Play Music" : "Paused"}
        </span>
        <span className="inline xs:hidden">
          {isPlaying ? "Music" : "Off"}
        </span>
        <span aria-hidden="true" className="hidden sm:flex items-end gap-[2px] h-3">
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "h-3 bg-[#E86A33] animate-pulse"
                : "h-1.5 bg-[#C8C2BC]/45"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "h-2 bg-[#F29A4A] animate-bounce"
                : "h-2.5 bg-[#C8C2BC]/45"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "h-2.5 bg-[#E86A33] animate-pulse"
                : "h-1 bg-[#C8C2BC]/45"
            }`}
          />
        </span>
      </span>
    </button>
  );
};
