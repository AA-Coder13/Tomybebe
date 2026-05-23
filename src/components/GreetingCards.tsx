import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Coffee, Check, FolderHeart } from 'lucide-react';
import { GreetingCardData } from '../types';

export default function GreetingCards() {
  const [openedCards, setOpenedCards] = useState<string[]>([]);

  const cards: GreetingCardData[] = [
    {
      id: 'card-1',
      title: 'The Promise Voucher',
      frontText: 'To hold you dear',
      backText: 'Click to open seal',
      insideText: 'I promise to hold your hand through every path we walk, to find peace in your quietest moments, to support your grandest goals, and to build our dream home step after warm step together.',
      emoji: '✨',
      color: 'from-[#2e0e27] to-[#120713]',
      accentColor: 'border-pink-500/35 text-pink-400 focus:ring-pink-500',
    },
    {
      id: 'card-2',
      title: 'The Compliment Ticket',
      frontText: 'My favorite scene',
      backText: 'Click to open seal',
      insideText: 'Your smile remains, and will always be, my absolute favorite visual in the entire galaxy. It is warmer than any golden sunset walk and brighter than a billion blinking stars.',
      emoji: '💖',
      color: 'from-[#0f113a] to-[#04061a]',
      accentColor: 'border-rose-500/35 text-rose-400 focus:ring-rose-500',
    },
    {
      id: 'card-3',
      title: 'Midnight Coupon',
      frontText: 'Redeemable anytime',
      backText: 'Click to open seal',
      insideText: 'Redeemable for infinite late-night conversations, deep warm coffee cups, spontaneous twilight highway road trips, and a shoulder that is always ready for you to lean on.',
      emoji: '☕',
      color: 'from-[#2a1708] to-[#110803]',
      accentColor: 'border-amber-500/35 text-amber-400 focus:ring-amber-500',
    },
  ];

  const handleCardToggle = (id: string) => {
    if (openedCards.includes(id)) {
      setOpenedCards(openedCards.filter((cardId) => cardId !== id));
    } else {
      setOpenedCards([...openedCards, id]);
    }
  };

  const resolveIcon = (id: string, color: string) => {
    switch (id) {
      case 'card-1':
        return <Sparkles id="card-ic-spark" className={`h-6 w-6 stroke-[1.5] ${color}`} />;
      case 'card-2':
        return <Heart id="card-ic-heart" className={`h-6 w-6 stroke-[1.5] ${color}`} />;
      case 'card-3':
        return <Coffee id="card-ic-coffee" className={`h-6 w-6 stroke-[1.5] ${color}`} />;
      default:
        return <Heart id="card-ic-default" className={`h-6 w-6 stroke-[1.5] ${color}`} />;
    }
  };

  return (
    <section
      id="love-cards-section"
      className="relative w-full py-28 px-4 bg-gradient-to-b from-[#0c0813] via-[#09050d] to-slate-950 overflow-hidden"
    >
      <div className="absolute top-20 left-[-15%] h-96 w-96 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-15%] h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest font-mono uppercase mb-4">
            <FolderHeart className="h-3.5 w-3.5" /> Sentimental Keepsakes
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Cute Greeting <span className="font-handwritten text-rose-400 capitalize text-5xl md:text-6xl text-glow-rose font-medium ml-1">Vouchers</span>
          </h2>
          <p className="mt-3 text-rose-300/60 max-w-md mx-auto text-sm font-sans tracking-wide font-light">
            Interactive digital keepsakes which reveal secret promises when flipped open.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-4 justify-items-center">
          {cards.map((card, index) => {
            const isOpened = openedCards.includes(card.id);
            const textAccentColor = card.id === 'card-1' ? 'text-pink-400' : card.id === 'card-2' ? 'text-rose-400' : 'text-amber-400';
            const borderAccentColor = card.id === 'card-1' ? 'border-pink-500/30' : card.id === 'card-2' ? 'border-rose-500/30' : 'border-amber-500/30';
            const glowShadow = card.id === 'card-1' ? 'hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)]' : card.id === 'card-2' ? 'hover:shadow-[0_20px_45px_rgba(239,68,68,0.15)]' : 'hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)]';

            return (
              <div
                key={card.id}
                className="relative w-full max-w-[300px] h-[380px] perspective"
              >
                <AnimatePresence mode="wait">
                  {!isOpened ? (
                    /* Sealed visual card view with hover scale */
                    <motion.div
                      key="card-closed"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleCardToggle(card.id)}
                      className={`w-full h-full p-6 rounded-2xl bg-gradient-to-b ${card.color} border ${borderAccentColor} shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${glowShadow} cursor-pointer flex flex-col justify-between items-center text-center group duration-300 transform`}
                    >
                      {/* Top elements */}
                      <span className="text-4xl mt-3 select-none filter drop-shadow-md group-hover:scale-110 duration-300">
                        {card.emoji}
                      </span>

                      {/* Header block with elegant typography and custom borders */}
                      <div className="w-full flex-1 flex flex-col justify-center items-center px-2">
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-300/40 mb-2">
                          ENVELOPE #{index + 1}
                        </span>
                        <h3 className="text-xl font-serif text-white tracking-tight mb-3">
                          {card.title}
                        </h3>
                        <p className="text-sm font-sans tracking-wide text-rose-200/60 font-light italic">
                          &ldquo;{card.frontText}&rdquo;
                        </p>
                      </div>

                      {/* Tap indicator footer */}
                      <div className="w-full pt-4 border-t border-rose-500/10 flex items-center justify-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-rose-400 group-hover:text-white duration-300">
                        {resolveIcon(card.id, textAccentColor)}
                        <span className="mt-0.5">{card.backText}</span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Flipped details description inside letter details ticket */
                    <motion.div
                      key="card-opened"
                      initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleCardToggle(card.id)}
                      className="w-full h-full p-6 rounded-2xl bg-[#14121e] border-2 border-rose-500/20 shadow-[0_20px_45px_rgba(244,63,94,0.18)] cursor-pointer flex flex-col justify-between text-left"
                    >
                      {/* Header stamping */}
                      <div className="flex items-center justify-between pb-3 border-b border-rose-500/10">
                        <span className="text-xs font-serif text-rose-400 font-semibold tracking-wide">
                          {card.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#a855f7]/60">
                          SEAL_REMOVED
                        </span>
                      </div>

                      {/* Card internal detailed voucher description */}
                      <div className="flex-1 my-5 overflow-y-auto pr-1">
                        <p className="text-rose-100 font-handwritten text-xl tracking-wide leading-relaxed">
                          {card.insideText}
                        </p>
                      </div>

                      {/* Card bottom tools footer */}
                      <div className="pt-3 border-t border-rose-500/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-rose-300/40">
                        <span>REDEEM_READY</span>
                        <div className="flex items-center gap-1 text-emerald-400 text-[10px] uppercase font-mono font-medium">
                          <Check className="h-3 w-3 stroke-[3]" />
                          <span>ACTIVE</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
