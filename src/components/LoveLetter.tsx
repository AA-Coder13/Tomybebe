import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, RefreshCw, Eye, Sparkles } from 'lucide-react';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const letterRef = useRef<HTMLDivElement | null>(null);

  const fullLetter = `My dearest Bebe,

From the moment you entered my life, the ordinary became extraordinary. Every day is a silent symphony, and every minor detail of you is my favorite story. Today, I wanted to write down a permanent token of what you mean to me.

You are my quiet harbor when the tides are rough, my warm coffee on a freezing winter morning, and the soft golden light that illuminates everything. I love our long random nights talking about things that do not matter, and the comfortable silences where we do not need to speak at all. 

Thank you for your warmth, your kind soul, and the laughter you freely scatter into my days. You are my home, my anchor, and my favorite adventure. 

No matter where the future takes us, I want you to remember this: every single universe in which we could exist, I would still search for you.

Forever & always Yours,
Me ❤️`;

  // Typing effect logic
  useEffect(() => {
    if (!isOpen) {
      setTypedText('');
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < fullLetter.length) {
        setTypedText(fullLetter.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Auto-scroll the letter container as it writes for better UX
        if (letterRef.current) {
          letterRef.current.scrollTop = letterRef.current.scrollHeight;
        }
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 28); // Speed of typewriter

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSkip = () => {
    setTypedText(fullLetter);
    setIsTypingComplete(true);
    setTimeout(() => {
      if (letterRef.current) {
        letterRef.current.scrollTop = letterRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleReset = () => {
    setTypedText('');
    setIsTypingComplete(false);
    // Trigger re-type
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 250);
  };

  return (
    <section
      id="love-letter-section"
      className="relative w-full py-28 px-4 bg-[#0a0614] overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      <div className="absolute top-[-10%] left-[-10%] h-[500px] bg-sky-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[550px] bg-rose-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest font-mono uppercase mb-4">
            <Mail className="h-3.5 w-3.5" /> Handwritten Sentiment
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            A Sealed <span className="font-handwritten text-rose-400 capitalize text-5xl md:text-6xl text-glow-rose font-medium ml-1">Confession</span>
          </h2>
          <p className="mt-3 text-rose-300/60 max-w-md mx-auto text-sm font-sans tracking-wide font-light">
            Tap the sacred seal below to unveil a heartfelt letter written especially for you.
          </p>
        </div>

        {/* Dynamic Interactive Envelope Showcase */}
        <div className="relative w-full max-w-xl aspect-[3/2] flex items-center justify-center mt-6">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope View */
              <motion.div
                key="envelope-closed"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsOpen(true)}
                className="group relative w-full h-full bg-[#1b152d]/90 border border-rose-500/15 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-all duration-500 hover:border-rose-400/40 hover:shadow-[0_25px_60px_rgba(244,63,94,0.15)] bg-glassmorphism"
              >
                {/* Triangular envelope back fold lines (pure elegant absolute visuals) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-rose-500/10 bg-rose-950/15 origin-top scale-y-105" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                
                {/* Pulsing seal */}
                <div className="relative flex flex-col items-center z-10 p-6 text-center">
                  <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-rose-600/35 border-2 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.4)] heartbeat-slow group-hover:scale-110 group-hover:bg-rose-500/40 duration-300">
                    <Sparkles id="seal-sparkle-lucide" className="h-9 w-9 text-rose-100 fill-rose-500/40 group-hover:rotate-45 duration-700" />
                  </div>
                  <span className="mt-5 text-sm font-sans tracking-[0.25em] text-rose-100 font-light uppercase">
                    Click to Open Seal
                  </span>
                  <span className="mt-1 text-xs text-rose-300/40 font-mono tracking-widest uppercase">
                    Strictly confidential for Bebe
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter View sliding out of Envelope */
              <motion.div
                key="envelope-opened"
                initial={{ opacity: 0, y: 30, scale: 1.02 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-[620px] md:h-[580px] -top-24 md:-top-16 flex flex-col"
              >
                {/* Glassmorphism love letter capsule */}
                <div className="w-full h-full relative p-6 md:p-8 rounded-2xl bg-glassmorphic bg-gradient-to-b from-[#1b152d]/95 to-[#120a22]/95 border border-rose-500/30 shadow-[0_25px_60px_rgba(244,63,94,0.2)] flex flex-col justify-between">
                  
                  {/* Absolute subtle background watermark */}
                  <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                    <Mail className="w-96 h-96 text-rose-500" />
                  </div>

                  {/* Letter Content Header */}
                  <div className="relative z-10 flex items-center justify-between pb-3 border-b border-rose-500/10 font-mono text-xs uppercase text-rose-300/40 tracking-widest">
                    <span>FROM: YOUR_BEAR</span>
                    <span className="text-rose-500 heartbeat-slow font-sans text-lg">❤️</span>
                    <span>TO: MY_BEBE</span>
                  </div>

                  {/* Typing content panel */}
                  <div
                    ref={letterRef}
                    className="relative z-10 flex-1 my-5 overflow-y-auto pr-2 custom-scrollbar text-rose-100 font-handwritten text-xl md:text-2xl tracking-wide leading-relaxed scroll-smooth whitespace-pre-line text-left"
                    style={{ maxHeight: 'calc(100% - 100px)' }}
                  >
                    {typedText}
                    {!isTypingComplete && (
                      <span className="inline-block w-2.5 h-6 ml-0.5 bg-rose-400 animate-pulse align-middle" />
                    )}
                  </div>

                  {/* Letter Bottom Tools Panel */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-rose-500/15">
                    {/* Reset letter view */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-mono uppercase tracking-widest text-rose-300/50 hover:text-rose-300 flex items-center gap-1.5 duration-300 hover:scale-105"
                    >
                      <Mail className="h-3.5 w-3.5" /> Seal Back
                    </button>

                    {/* Typewriter Speed tool commands */}
                    <div className="flex gap-4">
                      {!isTypingComplete && (
                        <button
                          onClick={handleSkip}
                          className="px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs tracking-wider uppercase font-mono font-medium flex items-center gap-1.5 duration-300 border border-rose-500/20"
                        >
                          <Eye className="h-3.5 w-3.5" /> Skip Typing
                        </button>
                      )}

                      <button
                        onClick={handleReset}
                        className="px-3.5 py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/30 text-rose-100 text-xs tracking-wider uppercase font-mono font-medium flex items-center gap-1.5 duration-300 border border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Restart Letter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
