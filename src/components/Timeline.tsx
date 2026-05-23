import { motion } from 'motion/react';
import { Calendar, Search, Coffee, Heart, Compass, Stars, MessageCircleHeart } from 'lucide-react';
import { TimelineEvent } from '../types';

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      id: 't-1',
      title: 'Morning Messages',
      date: 'February 12, 2023',
      description: 'May your day start with a slow and calm. you are appreciated bebe.',
      iconName: 'heart',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 't-2',
      title: 'A Little Daily Reminder',
      date: 'March 05, 2023',
      description: 'Just incase you need a shoulder to cry on. im always here for you bebe.',
      iconName: 'heart',
      color: 'from-rose-500 to-orange-400',
    },
    {
      id: 't-3',
      title: 'Safest Harbor',
      date: 'August 19, 2023',
      description: 'When things get overwhelming and the noises of the world are too loud, remember that my arms are always your safe haven. No expectations, no pressure—just deep warmth.',
      iconName: 'heart',
      color: 'from-amber-400 to-rose-500',
    },
    {
      id: 't-4',
      title: 'Sweetest Adventures',
      date: 'December 28, 2023',
      description: 'With you bebe. kahit saan tayo mag punta napaka saya ko.',
      iconName: 'compass',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 't-5',
      title: 'My Forever Promise',
      date: 'The Infinite Future',
      description: 'I promise to respect your decision and always here to support you and hindi ako magsasawang intindihin ka.',
      iconName: 'stars',
      color: 'from-cyan-400 to-purple-500',
    },
  ];

  // Helper to resolve icon by key safely
  const renderIcon = (name: string) => {
    const iconClass = "h-5 w-5 text-white";
    switch (name) {
      case 'search':
        return <Search id="icon-search" className={iconClass} />;
      case 'coffee':
        return <Coffee id="icon-coffee" className={iconClass} />;
      case 'heart':
        return <Heart id="icon-heart" className={iconClass} />;
      case 'compass':
        return <Compass id="icon-compass" className={iconClass} />;
      case 'stars':
        return <Stars id="icon-stars" className={iconClass} />;
      default:
        return <Heart id="icon-default-heart" className={iconClass} />;
    }
  };

  return (
    <section
      id="love-timeline-section"
      className="relative w-full py-28 px-4 bg-[#0c0813] overflow-hidden"
    >
      {/* Visual Ambient Spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] h-[350px] w-[350px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest font-mono uppercase mb-4">
            <MessageCircleHeart className="h-3.5 w-3.5" /> Greetings
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Sweet Messages <span className="font-handwritten text-rose-400 capitalize text-5xl md:text-6xl text-glow-rose font-medium ml-1">For You</span>
          </h2>
          <p className="mt-3 text-rose-300/60 max-w-md mx-auto text-sm font-sans tracking-wide font-light">
          </p>
        </div>

        {/* Timeline Engine Wireframe */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500/35 via-purple-500/40 to-transparent -translate-x-[1px]" />

          {/* Timeline Nodes Iteration */}
          <div className="space-y-16 md:space-y-24">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-start md:items-center`}
                >
                  {/* Left Spacer or Content block in desktop */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 pr-0 md:px-10">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.8 }}
                      className="group p-6 md:p-8 rounded-2xl bg-glassmorphism border border-rose-500/10 hover:border-rose-500/25 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.12)] transition-all duration-500 flex flex-col"
                    >

                      {/* Event Title */}
                      <h3 className="text-xl md:text-2xl font-serif text-white hover:text-rose-300 transition-colors duration-300">
                        {event.title}
                      </h3>

                      {/* Horizontal accent line with gradient */}
                      <div className={`mt-3 mb-4 h-[1px] w-12 bg-gradient-to-r ${event.color}`} />

                      {/* Event elegant copy */}
                      <p className="text-rose-100/75 text-sm md:text-base leading-relaxed font-light font-sans">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Absolute node element with logo tag */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-auto -translate-x-1/2 z-20">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={`h-10 w-10 rounded-full bg-gradient-to-tr ${event.color} flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.5)] border-2 border-[#0c0813] cursor-pointer`}
                    >
                      {renderIcon(event.iconName)}
                    </motion.div>
                  </div>

                  {/* Right Spacing block wrapper for structure alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
