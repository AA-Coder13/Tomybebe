import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Calendar, X, HeartHandshake } from 'lucide-react';
import { GalleryItem } from '../types';

import starryCouple from '../assets/images/1st_date.JPG';
import beachCouple from '../assets/images/north_trip.jpg';
import cafeCouple from '../assets/images/2nd_anniv.jpg';

export default function Gallery() {
  // Setup nice hand-crafted memories
  const [items, setItems] = useState<GalleryItem[]>([
    {
      id: 'mem-1',
      src: starryCouple,
      title: 'Our 1st Date',
      date: 'January 10, 2024',
      location: 'Antipolo Rizal',
      description: 'Dito ko napatunayan na gusto kita makasama palagi. ang gaan ng pakiramdam ko pag nasa tabi kita.',
      likes: 12455412,
    },
    {
      id: 'mem-2',
      src: beachCouple,
      title: 'North Trip',
      date: 'December 27, 2025',
      location: 'Baguio City and Vigan',
      description: 'Thankful ako dahil nakasama ako sa north trip with your family. ang sarap lang sa feeling na welcome na welcome ako.',
      likes: 5028941,
    },
    {
      id: 'mem-3',
      src: cafeCouple,
      title: '2nd Anniversary',
      date: 'January 10, 2026',
      location: 'Makati City',
      description: 'Nung araw na to medyo nainis ka dahil nalate ka. at ako naman pinapakalma kita para hindi mag tuloy tuloy yung inis mo hehehe. at the end naman ang saya ng celebration natin.',
      likes: 85627533,
    },
  ]);

  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likedList, setLikedList] = useState<string[]>([]);

  const handleLike = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (likedList.includes(id)) {
      setLikedList(likedList.filter((item) => item !== id));
      setItems(items.map((item) => (item.id === id ? { ...item, likes: item.likes - 1 } : item)));
    } else {
      setLikedList([...likedList, id]);
      setItems(items.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)));
      
      // If of active item, sync its likes in modal too
      if (activeItem && activeItem.id === id) {
        setActiveItem({ ...activeItem, likes: activeItem.likes + 1 });
      }
    }
  };

  return (
    <section
      id="photo-gallery-section"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#09050d] via-[#100b17] to-[#0c0813] overflow-hidden"
    >
      {/* Decorative Blur Spots */}
      <div className="absolute top-20 right-[-10%] h-96 w-96 rounded-full bg-rose-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-15%] h-[400px] w-[400px] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Gallery Headers */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest font-mono uppercase mb-4">
            <HeartHandshake className="h-3.5 w-3.5" /> Photographic Keepsakes
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Our Polaroid <span className="font-handwritten text-rose-400 capitalize text-5xl md:text-6xl text-glow-rose font-medium ml-1">Archive</span>
          </h2>
          <p className="mt-4 text-rose-300/60 max-w-lg mx-auto text-sm md:text-base font-light font-sans leading-relaxed">
            A selective collection of three snapshots, encapsulating the deep emotions and breathtaking landscapes of our adventure together.
          </p>
        </div>

        {/* Polaroids Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-2 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const isLiked = likedList.includes(item.id);
            // Dynamic subtle rotating coefficients for physical polaroid realism
            const rotateDeg = index === 0 ? '-rotate-2' : index === 1 ? 'rotate-1' : 'rotate-2';

            return (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                onClick={() => setActiveItem(item)}
                className={`relative group cursor-pointer bg-[#faf8f5] text-[#2c2620] p-4 pb-6 mx-auto w-full max-w-[320px] shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_45px_rgba(244,63,94,0.25)] rounded-[3px] border border-[#eadacc]/60 transition-all duration-500 ${rotateDeg} hover:rotate-0 hover:-translate-y-4`}
              >
                {/* Washi Tape Accent on top */}
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/40 border-l border-r border-[#e8d2bd] opacity-75 shadow-sm transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 font-mono text-[9px] text-[#8c745d] tracking-widest flex items-center justify-center pointer-events-none">
                  MEMORY_PIN
                </div>

                {/* Main Polaroid Photo Container */}
                <div className="relative overflow-hidden aspect-square rounded-[1px] bg-[#dfd9d1] border border-black/5">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle photographic flash gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Polaroid Text & handwritten caption styles */}
                <div className="mt-5 text-center">
                  <h3 className="font-handwritten text-2xl font-bold tracking-wide text-[#3f2e1a] group-hover:text-rose-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Event stamps */}
                  <div className="flex items-center justify-center gap-2 mt-2 font-mono text-[10px] text-[#7c6a58] tracking-wider uppercase">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>

                  {/* Polaroid footprint indicators */}
                  <div className="flex items-center justify-between border-t border-[#eeebdf] mt-4 pt-4 px-1">
                    <div className="flex items-center gap-1.5 text-rose-600 font-semibold text-xs">
                      <Heart 
                        id={`heart-btn-l-${item.id}`}
                        onClick={(e) => handleLike(item.id, e)}
                        className={`h-4.5 w-4.5 transition-all cursor-pointer ${isLiked ? 'fill-rose-500 scale-125' : 'hover:scale-110'}`} 
                      />
                      <span>{item.likes}</span>
                    </div>
                    <span className="text-[10px] text-[#8c745f]/70 uppercase tracking-widest font-mono">
                      SH-#{index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fully Interactive Immersive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Modal Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Modal Body Card Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-[#14101e] border border-rose-500/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(244,63,94,0.15)] z-20 flex flex-col md:flex-row"
            >
              {/* Close Button element */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 text-rose-100/75 hover:text-white border border-white/10 hover:bg-rose-600/30 transition-all duration-300"
              >
                <X id="close-modal-icon" className="h-5 w-5" />
              </button>

              {/* Left Side: Massive visual view */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[500px] relative bg-black flex items-center justify-center">
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent pointer-events-none" />
              </div>

              {/* Right Side: Editorial emotional detail container */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#14101e] to-[#0f0b17] text-white">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{activeItem.date}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-white font-medium mb-4 tracking-tight glow-soft">
                    {activeItem.title}
                  </h3>

                  <div className="flex items-center gap-2 text-rose-200/60 font-sans text-sm mb-6 pb-4 border-b border-rose-500/10">
                    <MapPin className="h-4 w-4 text-rose-500/80 shrink-0" />
                    <span>{activeItem.location}</span>
                  </div>

                  <p className="text-rose-100/85 text-sm md:text-base leading-relaxed font-light italic mb-8">
                    &ldquo;{activeItem.description}&rdquo;
                  </p>
                </div>

                {/* Likes engagement button inside details modal */}
                <div className="flex items-center justify-between pt-4 border-t border-rose-500/10">
                  <div className="text-xs font-mono text-white/40 tracking-wider">
                    LOVE_STAMP_ID: {activeItem.id.toUpperCase()}
                  </div>
                  
                  <button
                    onClick={() => handleLike(activeItem.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans tracking-wide transition-all duration-300 ${
                      likedList.includes(activeItem.id)
                        ? 'bg-rose-500/25 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-transparent border-rose-500/30 text-rose-100 hover:border-rose-500 hover:bg-rose-500/10'
                    }`}
                  >
                    <Heart 
                      id={`heart-btn-modal-${activeItem.id}`}
                      className={`h-4.5 w-4.5 ${likedList.includes(activeItem.id) ? 'fill-rose-400 text-rose-400' : ''}`} 
                    />
                    <span>{likedList.includes(activeItem.id) ? 'Favorited Memory' : 'Like this Memory'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
