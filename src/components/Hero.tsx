import { motion } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';
import heroBg from '../assets/images/romantic_hero_bg_1779502296010.png';

interface HeroProps {
  onScrollToGallery: () => void;
}

export default function Hero({ onScrollToGallery }: HeroProps) {
  return (
    <div
      id="hero-section"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Cinematic Background Image with dark romantic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Romantic Night Glow"
          className="h-full w-full object-cover opacity-60 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09050d] via-black/35 to-[#0c0813]/60" />
      </div>

      {/* Floating Light Glimmer Overlay */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl">
        
        {/* Glowing pulsing heart emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-8 cursor-pointer relative group"
        >
          {/* Heart Beat Radial Waves */}
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl scale-125 heartbeat-slow group-hover:bg-rose-500/35 transition-all duration-500" />
          
          <div className="relative flex items-center justify-center h-20 w-20 rounded-full border border-rose-500/30 bg-black/45 backdrop-blur-md glow-soft">
            <Heart 
              id="hero-heart-lucide"
              className="h-9 w-9 text-rose-500 fill-rose-500/25 heartbeat-slow group-hover:scale-110 group-hover:fill-rose-50/50 transition-all duration-300" 
            />
          </div>
        </motion.div>

        {/* Dedicated main title header */}
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
          className="relative text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-serif"
        >
          <span className="block font-handwritten text-rose-400 capitalize text-7xl md:text-9xl mb-3 text-glow-rose font-semibold">
            To My Bebe
          </span>
          <span className="relative text-3xl md:text-5xl font-sans font-light tracking-wide text-rose-100 uppercase block mt-1">
            Every moment with you feels like <span className="font-serif italic font-semibold text-rose-300">magic.</span>
          </span>
        </motion.h1>

        {/* Elegant mini text hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.4, duration: 1.5 }}
          className="mt-6 text-sm md:text-base text-rose-200/80 max-w-md font-sans tracking-widest font-light uppercase"
        >
          For my favorite person.
        </motion.p>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={onScrollToGallery}
        className="absolute bottom-10 z-20 flex flex-col items-center cursor-pointer hover:opacity-100 duration-300 opacity-60 text-rose-200"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] mb-2 text-rose-200/70">
          Enter Our Story
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown id="hero-arrow-lucide" className="h-5 w-5 text-rose-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
