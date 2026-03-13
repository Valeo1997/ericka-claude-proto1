import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy-slate/60 mix-blend-multiply" />
        <img 
          src="https://picsum.photos/seed/plumber-final/1920/1080?blur=5" 
          className="w-full h-full object-cover opacity-20"
          alt="Plumber working"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel-heavy p-16 md:p-32 rounded-[4rem] border border-white/20 shadow-2xl"
        >
          <h2 className="text-6xl md:text-9xl font-display uppercase leading-[0.85] mb-12 text-soft-white">
            Stop Sending Money To<br />
            <span className="text-ember-red text-glow-red">Voicemail.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-soft-white/80 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            Join 500+ plumbing companies who never miss a lead. 
            Get Ericka on your team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-electric-blue hover:bg-blue-600 text-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest transition-all glow-blue shadow-[0_0_50px_rgba(45,142,255,0.4)] flex items-center justify-center gap-4 group">
              Start My Free Trial <ArrowRight className="group-hover:translate-x-3 transition-transform" size={28} />
            </button>
            <button className="glass-panel hover:bg-white/10 text-soft-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest transition-all border border-white/20">
              Book A Demo
            </button>
          </div>
          <p className="mt-12 text-cool-gray font-black uppercase tracking-[0.3em] text-xs">
            No Credit Card Required • 14-Day Free Trial • Cancel Anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};
