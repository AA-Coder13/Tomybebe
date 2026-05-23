import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Heart } from 'lucide-react';

import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import Timeline from './components/Timeline';
import MusicPlayer from './components/MusicPlayer';
import GreetingCards from './components/GreetingCards';

export default function App() {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  // Setup fine top progress indicator for user coordinates reference
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollYProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToGallery = () => {
    const gallerySection = document.getElementById('photo-gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09050d] text-white overflow-hidden font-sans selection:bg-rose-500/35 selection:text-white">
      {/* Immersive Canvas Particles Stars Overlay */}
      <FloatingHearts />

      {/* Luxury dynamic top-reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1a0e28] z-50">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollYProgress * 100}%` }}
        />
      </div>

      {/* Fluid scroll sections */}
      <Hero onScrollToGallery={handleScrollToGallery} />
      
      <div className="relative z-20">
        <Gallery />
        <LoveLetter />
        <Timeline />
        <MusicPlayer />
        <GreetingCards />
      </div>

      {/* Extra-aesthetic cinematic visual footer */}
      <footer className="relative z-30 bg-[#07040b] py-20 px-6 border-t border-rose-500/10 text-center overflow-hidden">
        {/* Subtle glow nodes back */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-44 bg-rose-500/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          {/* Heart Emblem */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 12 }}
            className="h-14 w-14 rounded-full bg-glassmorphism border border-rose-500/25 flex items-center justify-center mb-6 cursor-pointer glow-soft group"
          >
            <Heart 
              id="footer-heart-lucide"
              className="h-6 w-6 text-rose-500 fill-rose-500/20 heartbeat-slow group-hover:scale-110 duration-300" 
            />
          </motion.div>

          {/* Core Footer Quote */}
          <p className="text-2xl md:text-3xl font-serif text-rose-100 font-light italic max-w-2xl leading-relaxed text-glow-rose">
            &ldquo;In every universe, I’d still choose you.&rdquo;
          </p>

          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

          {/* Subtext info stamps */}
          <p className="mt-6 text-[10px] font-mono tracking-[0.25em] text-rose-200/30 uppercase">
            Crafted with infinite love • May 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
