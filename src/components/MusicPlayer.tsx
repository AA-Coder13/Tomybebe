import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Music, SkipForward, SkipBack, Disc } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  duration: string;
  chordProgression: number[][]; // MIDI cents, or hz multipliers
  tempo: number; // BPM
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.5); // 0 to 1
  const [progress, setProgress] = useState(0); // percentage

  // Synth state refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterVolumeRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const trackTimeSecsRef = useRef(0);

  const playlist: Track[] = [
    {
      title: 'Palagi',
      artist: 'TJ Monterde',
      duration: '01:45',
      // Dynamic lovely melodic scale notes (Frequencies multipliers of root 130.81Hz - C3)
      chordProgression: [
        [1.0, 1.25, 1.5, 2.0, 2.5, 3.0],      // C Major (C, E, G, C4, E4, G4)
        [1.33, 1.66, 2.0, 2.66, 3.33, 4.0],  // F Major (F, A, C4, F4, A4, C5)
        [1.2, 1.5, 1.8, 2.4, 3.0, 3.6],      // Am9 (A, C, E, A4, C4)
        [1.5, 1.875, 2.25, 3.0, 3.75, 4.5],  // G Major (G, B, D, G4, B4, D5)
      ],
      tempo: 90,
    },
    {
      title: 'Always Yours (Lullaby)',
      artist: 'Warm Music Box',
      duration: '02:10',
      chordProgression: [
        [1.0, 1.5, 2.0, 2.5, 3.0, 3.5],       // Cmaj7 (C, G, C4, E4, G4, B4)
        [1.2, 1.5, 1.8, 2.4, 3.0, 3.6],       // Am7
        [1.35, 1.62, 2.02, 2.7, 3.24, 4.05],  // Fmaj7
        [1.5, 1.875, 2.25, 3.0, 3.75, 4.5],   // G7
      ],
      tempo: 75,
    },
    {
      title: 'Melody of Us',
      artist: 'Ambient Soundscape',
      duration: '02:00',
      chordProgression: [
        [1.0, 1.2, 1.5, 1.8, 2.0, 2.4],       // Minor cozy chord
        [1.25, 1.5, 1.875, 2.5, 3.0, 3.75],   // Major happy wave
        [1.33, 1.66, 2.0, 2.66, 3.33, 4.0],   // Calm transition
        [1.0, 1.5, 1.75, 2.0, 2.5, 3.0],      // Safe resolution
      ],
      tempo: 80,
    },
  ];

  const currentTrack = playlist[activeTrackIdx];

  const initializeAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterVol = ctx.createGain();
      masterVol.gain.value = volume;
      masterVol.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterVolumeRef.current = masterVol;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Adjust synthesizer volume
  useEffect(() => {
    if (masterVolumeRef.current) {
      masterVolumeRef.current.gain.setValueAtTime(volume, audioCtxRef.current?.currentTime || 0);
    }
  }, [volume]);

  // Triggers melody notes playing sequence
  const startSynthesizing = () => {
    if (!audioCtxRef.current || !masterVolumeRef.current) return;
    const ctx = audioCtxRef.current;
    const masterVol = masterVolumeRef.current;

    const baseFreq = 130.81; // C3 root
    const chords = currentTrack.chordProgression;
    let step = 0;

    const intervalTimeMs = (60000 / currentTrack.tempo) * 0.75; // Arpeggio delay

    const playNote = (freq: number, startTime: number, duration: number) => {
      // Warm Subtractive synthesizer synthesizer node
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft triangle/sine sound for nice relaxing chimes
      osc.type = Math.random() > 0.8 ? 'sine' : 'triangle';
      osc.frequency.value = freq;

      // Filter settings to shave harsh top ends
      filter.type = 'lowpass';
      filter.frequency.value = 1400;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterVol);

      // Envelope configuration
      gain.gain.setValueAtTime(0, startTime);
      // Soft cozy attack
      gain.gain.linearRampToValueAtTime(0.24, startTime + 0.12);
      // Long beautiful release decay
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.5);
    };

    // Synthesizer scheduler loop
    const scheduler = () => {
      const scheduleAheadTime = 0.1; // schedule 100ms ahead
      const now = ctx.currentTime;

      // Chord selection
      const chordIdx = Math.floor(step / 6) % chords.length;
      // Note in chord progression selection
      const noteIdx = step % 6;
      
      const multiplier = chords[chordIdx][noteIdx];
      const frequency = baseFreq * multiplier;

      // Play soft arpeggiation note
      playNote(frequency, now + scheduleAheadTime, 2.5);
      step++;
    };

    // Scheduled trigger
    scheduler();
    synthIntervalRef.current = window.setInterval(scheduler, intervalTimeMs);

    // Track simulated seconds progress bar
    const durationParts = currentTrack.duration.split(':');
    const totalSecs = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

    progressIntervalRef.current = window.setInterval(() => {
      trackTimeSecsRef.current += 1;
      const pct = (trackTimeSecsRef.current / totalSecs) * 100;
      if (pct >= 100) {
        // Auto go next track
        handleNext();
      } else {
        setProgress(pct);
      }
    }, 1000);
  };

  const stopSynthesizing = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlayPause = () => {
    initializeAudio();
    if (isPlaying) {
      stopSynthesizing();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    stopSynthesizing();
    setProgress(0);
    trackTimeSecsRef.current = 0;
    setActiveTrackIdx((prevIdx) => (prevIdx + 1) % playlist.length);
    // Restart if playing
    if (isPlaying) {
      setTimeout(() => {
        initializeAudio();
      }, 50);
    }
  };

  const handlePrev = () => {
    stopSynthesizing();
    setProgress(0);
    trackTimeSecsRef.current = 0;
    setActiveTrackIdx((prevIdx) => (prevIdx - 1 + playlist.length) % playlist.length);
    // Restart if playing
    if (isPlaying) {
      setTimeout(() => {
        initializeAudio();
      }, 50);
    }
  };

  // Re-schedule synthesizer trigger if active track swaps during playing state
  useEffect(() => {
    if (isPlaying) {
      startSynthesizing();
    }
    return () => stopSynthesizing();
  }, [isPlaying, activeTrackIdx]);

  // Handle teardown on unmount
  useEffect(() => {
    return () => {
      stopSynthesizing();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section
      id="romantic-music-section"
      className="relative w-full py-28 px-4 bg-[#100b17] overflow-hidden"
    >
      <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-rose-900/15 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest font-mono uppercase mb-4">
            <Music className="h-3.5 w-3.5" /> Atmospheric Soundboard
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Our Melody <span className="font-handwritten text-rose-400 capitalize text-5xl md:text-6xl text-glow-rose font-medium ml-1">Player</span>
          </h2>
          <p className="mt-3 text-rose-300/60 max-w-md mx-auto text-sm font-sans tracking-wide font-light">
          </p>
        </div>

        {/* Unified Vinyl & Deck visual player mockup */}
        <div className="w-full max-w-4xl mx-auto bg-glassmorphism rounded-3xl p-6 md:p-10 border border-rose-500/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Block: rotating vinyl disk & stylus tone-arm */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center shrink-0">
            {/* Outer golden wood base or neon visual glow ring */}
            <div className="absolute inset-0 rounded-full border border-rose-500/10 bg-black/40 blur-md scale-102" />

            {/* Glowing spinning visual disc aura */}
            <div className="absolute inset-2 rounded-full bg-[#1b122c] border border-rose-500/20" />

            {/* Spinning Vinyl Element */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#0d0a11] border-[4px] border-black flex items-center justify-center shadow-2xl cursor-pointer"
              onClick={handlePlayPause}
            >
              {/* Concentric subtle sound vinyl ridges */}
              <div className="absolute inset-4 rounded-full border border-white/5 opacity-40" />
              <div className="absolute inset-8 rounded-full border border-white/5 opacity-50" />
              <div className="absolute inset-12 rounded-full border border-white/5 opacity-30" />
              <div className="absolute inset-16 rounded-full border border-white/5 opacity-40" />
              <div className="absolute inset-20 rounded-full border border-white/5 opacity-50" />

              {/* Album Center Tag Badge (Rose Heart Pattern) */}
              <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-rose-600 to-purple-600 border-[3px] border-[#0d0a11] flex flex-col items-center justify-center text-center p-1 overflow-hidden">
                <Disc className="w-6 h-6 text-white text-glow-rose stroke-[1.5]" />
                <span className="text-[7.5px] uppercase font-mono tracking-widest text-rose-100 font-semibold truncate w-full mt-1.5">
                  {currentTrack.title}
                </span>
                <span className="text-[5.5px] font-mono tracking-normal text-rose-200/60 truncate w-full">
                  {currentTrack.artist}
                </span>
              </div>

              {/* Physical mini center spindle peg hole */}
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0a050d] border border-white/20" />
            </motion.div>

            {/* Vintage styling arm styluses tonearm */}
            <div className="absolute -top-4 -right-1 z-20 w-24 h-32 origin-top-right transition-transform duration-700 pointer-events-none"
                 style={{ transform: isPlaying ? 'rotate(-6deg)' : 'rotate(-32deg)' }}>
              
              {/* Metallic arm arm segments */}
              <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
                {/* Arm wire */}
                <path d="M 90 10 C 90 40, 80 50, 45 60 C 42 61, 38 65, 30 92" stroke="#a2a1a6" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Spindle head counter-weight base */}
                <circle cx="90" cy="10" r="8" fill="#58545e" stroke="#252427" strokeWidth="1"/>
                {/* Red jewel cartridge indicator needle */}
                <rect x="23" y="88" width="14" height="6" rx="1" fill="#f43f5e" transform="rotate(25, 23, 88)"/>
              </svg>
            </div>
          </div>

          {/* Right Block: track information details & full deck dials console */}
          <div className="flex-1 w-full flex flex-col justify-between h-full text-left">
            <div>
              {/* Live visual equalizers that bounce in visual melody rhythm */}
              <div className="flex gap-1 items-end h-8 mb-6">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? { height: [4, Math.random() * 24 + 6, 4] }
                        : { height: 4 }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + i * 0.08,
                      ease: 'easeInOut',
                    }}
                    className={`w-1.5 rounded-t-full bg-gradient-to-t ${
                      i % 2 === 0 ? 'from-rose-500 to-rose-400' : 'from-purple-500 to-rose-300'
                    }`}
                  />
                ))}
              </div>

              {/* Interactive track info indicators */}
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-400 font-semibold mb-2 block">
                NOW REPRODUCING
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white font-medium mb-1 tracking-tight">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-rose-200/60 font-sans tracking-wide mb-8">
                Created organically by <span className="text-rose-300 italic">{currentTrack.artist}</span>
              </p>

              {/* Progress visual bar bar with seek parameters */}
              <div className="space-y-2 mb-8">
                <div className="relative w-full h-1.5 bg-rose-950/40 rounded-full overflow-hidden border border-rose-500/10">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-rose-300/50">
                  <span>
                    {trackTimeSecsRef.current
                      ? `${Math.floor(trackTimeSecsRef.current / 60)
                          .toString()
                          .padStart(2, '0')}:${(trackTimeSecsRef.current % 60)
                          .toString()
                          .padStart(2, '0')}`
                      : '00:00'}
                  </span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>
            </div>

            {/* Core mechanical controller panel */}
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between pt-4 border-t border-rose-500/10">
              
              {/* Media deck control buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 text-rose-200 hover:text-white transition-all duration-300"
                >
                  <SkipBack id="music-prev" className="h-4 w-4" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:shadow-[0_0_28px_rgba(244,63,94,0.55)] transition-all duration-300 shrink-0 relative"
                >
                  {isPlaying ? (
                    <Pause id="music-pause" className="h-5 w-5" />
                  ) : (
                    <Play id="music-play" className="h-5 w-5 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 text-rose-200 hover:text-white transition-all duration-300"
                >
                  <SkipForward id="music-next" className="h-4 w-4" />
                </button>
              </div>

              {/* Volume sliders dials container */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Volume2 className="h-4 w-4 text-rose-300/40 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full md:w-32 h-1 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
