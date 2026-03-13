import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Calendar, Mail, ShieldCheck } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden mesh-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,142,255,0.1),transparent_70%)]" />
        <img 
          src="https://picsum.photos/seed/plumbing-hood/1920/1080?blur=10" 
          className="w-full h-full object-cover opacity-5 mix-blend-overlay"
          alt="Neighborhood background"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border-white/10 mb-12 shadow-[0_0_20px_rgba(45,142,255,0.1)]">
              <div className="w-2.5 h-2.5 rounded-full bg-electric-blue animate-pulse-soft" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-soft-white">Ericka is Online & Ready</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-display uppercase leading-[0.9] mb-10 tracking-tight text-soft-white">
              Your Phones Answered.<br />
              Your Jobs Booked.<br />
              <span className="text-electric-blue text-glow-blue">You Just Show Up.</span>
            </h1>

            <p className="text-xl md:text-2xl text-cool-gray max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
              Meet Ericka—she handles your calls, so you can handle the pipes. 
              She's your 24/7 AI Dispatcher, built exclusively for plumbing companies to answer calls, schedule appointments, and reply to emails.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
              <a href="#live-demo" className="bg-electric-blue hover:bg-blue-600 text-white px-12 py-6 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all glow-blue shadow-[0_0_40px_rgba(45,142,255,0.3)] flex items-center justify-center gap-3 group">
                Meet Ericka <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#live-demo" className="glass-panel hover:bg-white/10 text-soft-white px-12 py-6 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center">
                Try Live Demo
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/5 max-w-4xl mx-auto">
              {[
                { icon: Zap, text: "24/7 Live Answer" },
                { icon: Calendar, text: "Instant Booking" },
                { icon: Mail, text: "Email Response" },
                { icon: ShieldCheck, text: "No Contract" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-electric-blue/10 transition-colors">
                    <item.icon className="text-electric-blue" size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-soft-white">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
