import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STORY_IMAGES = [
  '/story-1-customer.jpg',
  '/story-2-ericka.jpg',
  '/story-3-plumber.jpg'
];

const STORY_CAPTIONS = [
  "3:00 AM: The Emergency Call",
  "3:01 AM: Ericka Springs Into Action",
  "8:00 AM: The Technician Arrives"
];

export const StoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#050b14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6">
            The <span className="text-electric-blue">Ericka</span> Difference
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See how Ericka transforms a late-night emergency into a morning success story.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden bg-[#0a1324] border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 15, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={STORY_IMAGES[currentIndex]}
                alt={STORY_CAPTIONS[currentIndex]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-electric-blue font-black tracking-[0.2em] uppercase text-sm mb-2">
                    Step {currentIndex + 1} of 3
                  </p>
                  <h3 className="text-3xl md:text-5xl font-display uppercase text-white">
                    {STORY_CAPTIONS[currentIndex]}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute top-8 left-0 right-0 flex justify-center gap-3 z-20">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-12 bg-electric-blue' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
