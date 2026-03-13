import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, Sparkles, Plus } from 'lucide-react';
import { get, set } from 'idb-keyval';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const STORY_PROMPTS = [
  "A woman in her mid 30s, sitting on a couch in a cozy well-lit living room at night, holding a smartphone to her ear, worried expression on her face, wearing casual pajamas, warm lamp light in the background, normal suburban home interior, realistic photography style, no dark or dystopian elements.",
  "Abstract AI technology visualization, glowing blue neural network data streams, floating holographic UI panels with phone call data and calendar bookings, no human figures, futuristic digital command center aesthetic, deep dark blue background, highly detailed.",
  "A friendly male plumber in a blue uniform shirt standing in front of a suburban house in bright morning sunlight, holding copper pipes in one hand and a yellow torch in the other, smiling confidently at the camera, service van parked in driveway behind him, realistic photo style, warm golden hour lighting."
];

const STORY_CAPTIONS = [
  "3:00 AM: The Emergency Call",
  "3:01 AM: Erica Springs Into Action",
  "8:00 AM: The Technician Arrives"
];

const MAX_SETS = 5;

export const StoryCarousel = () => {
  const [imageSets, setImageSets] = useState<string[][]>([]);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedSets = async () => {
      try {
        const savedSets = await get('erica_story_sets');
        if (savedSets) {
          setImageSets(savedSets);
        } else {
          // Migrate old single set if it exists so the user doesn't lose their favorite
          const oldSaved = localStorage.getItem('erica_story_images');
          if (oldSaved) {
            const parsed = JSON.parse(oldSaved);
            if (parsed.length === 3) {
              setImageSets([parsed]);
              await set('erica_story_sets', [parsed]);
            }
          }
        }
        // Clean up old localStorage to free up browser quota
        localStorage.removeItem('erica_story_images');
        localStorage.removeItem('erica_story_sets');
      } catch (e) {
        console.error("Failed to load saved sets from IndexedDB", e);
      }
    };
    
    loadSavedSets();
  }, []);

  const currentImages = imageSets[activeSetIndex] || [];

  useEffect(() => {
    if (currentImages.length === 3 && !isGenerating) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentImages, activeSetIndex, isGenerating]);

  const generateImages = async () => {
    if (imageSets.length >= MAX_SETS) return;
    
    setIsGenerating(true);
    setError(null);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < STORY_PROMPTS.length; i++) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: STORY_PROMPTS[i],
          config: {
            imageConfig: { aspectRatio: "16:9" }
          }
        });

        let found = false;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            newImages.push(base64);
            found = true;
            break;
          }
        }
        if (!found) {
          throw new Error(`Failed to generate image ${i + 1}`);
        }
      }

      const updatedSets = [...imageSets, newImages];
      setImageSets(updatedSets);
      setActiveSetIndex(updatedSets.length - 1);
      setCurrentIndex(0);
      try {
        await set('erica_story_sets', updatedSets);
      } catch (storageErr) {
        console.warn("Could not cache images (storage full), images will still display this session.", storageErr);
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || "Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-[#050b14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6">
            The <span className="text-electric-blue">Erica</span> Difference
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See how Erica transforms a late-night emergency into a morning success story.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden bg-[#0a1324] border border-white/10 shadow-2xl flex items-center justify-center">
          {isGenerating ? (
            <div className="text-center p-8 flex flex-col items-center justify-center h-full w-full">
              <Loader2 className="w-16 h-16 text-electric-blue animate-spin mb-6" />
              <h3 className="text-2xl md:text-4xl font-display uppercase text-white mb-4">
                Generating Storyboard...
              </h3>
              <p className="text-slate-400 text-lg">
                Crafting your cinematic storyboard (takes about 15-20s)
              </p>
            </div>
          ) : currentImages.length === 3 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSetIndex}-${currentIndex}`}
                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 15, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={currentImages[currentIndex]} 
                  alt={STORY_CAPTIONS[currentIndex]}
                  className="w-full h-full object-cover"
                />
                <>
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
                </>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center p-8">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-electric-blue" />
                </div>
                <h3 className="text-2xl font-display uppercase text-white">Experience the Story</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-4">
                  Click below to generate a custom AI storyboard showing how Erica handles a late-night emergency.
                </p>
                <button 
                  onClick={generateImages}
                  className="px-8 py-4 bg-electric-blue hover:bg-blue-600 text-white font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles size={20} />
                  Generate Story Images
                </button>
                {error && (
                  <p className="text-red-400 mt-4 text-sm bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                    {error}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Progress Indicators */}
          {!isGenerating && currentImages.length === 3 && currentIndex !== 2 && (
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
          )}
        </div>
        
        {!isGenerating && currentImages.length === 3 && imageSets.length < MAX_SETS && (
          <div className="mt-6 text-center">
            <button
              onClick={generateImages}
              className="px-6 py-3 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/40 text-slate-400 hover:text-electric-blue font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles size={16} />
              Generate New Set
            </button>
          </div>
        )}

        {error && imageSets.length > 0 && (
          <div className="mt-6 max-w-2xl mx-auto text-center">
            <p className="text-red-400 text-sm bg-red-400/10 p-4 rounded-lg border border-red-400/20">
              {error}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
