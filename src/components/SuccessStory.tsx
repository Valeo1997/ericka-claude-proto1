import React from 'react';
import { Zap, Star } from 'lucide-react';

export const SuccessStory = () => {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Side - Image & Overlay */}
        <div className="relative min-h-[500px] lg:min-h-[800px] flex flex-col justify-between p-12 md:p-24">
          <img 
            src="/phoenix-night.jpg"
            alt="Phoenix night highway"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-amber-gold text-[10px] font-black tracking-[0.3em] uppercase mb-6">
              <Zap size={12} className="fill-amber-gold" /> ERICA RESPONDS IN SECONDS
            </div>
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] text-white">
              FASTER THAN<br/>THE <span className="text-amber-gold">SPEED OF LIGHT.</span>
            </h2>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-white/50 text-[10px] font-black tracking-[0.3em] uppercase mt-auto pt-24">
            <div className="w-8 h-[1px] bg-white/30" />
            3:00 AM — PHOENIX NEVER STOPS
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="bg-[#0B1120] p-12 md:p-24 flex flex-col justify-center">
          <div className="flex gap-1.5 mb-10">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="text-amber-gold fill-amber-gold" size={24} />)}
          </div>
          <h3 className="text-3xl md:text-5xl font-display uppercase leading-tight mb-12 italic text-white">
            "Erica paid for herself in the first 48 hours. She caught a <span className="text-electric-blue"> $4,500 emergency slab leak </span> at 3:00 AM while I was fast asleep. I woke up to a booked job and a happy customer."
          </h3>
          <div className="mb-12">
            <p className="text-white font-display uppercase text-2xl mb-2">Mike Henderson</p>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Owner, Henderson Plumbing Co. — 8 Trucks · Phoenix, AZ</p>
          </div>
          <div className="flex items-center gap-16 pt-12 border-t border-white/10">
            <div>
              <p className="text-5xl font-display text-electric-blue mb-2">$12k+</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Monthly Rev Added</p>
            </div>
            <div>
              <p className="text-5xl font-display text-electric-blue mb-2">0</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Missed Calls</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
