import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Zap, Phone } from 'lucide-react';

export const Emergency = () => {
  return (
    <section className="py-40 bg-navy-slate relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ember-red/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-ember-red/10 border border-ember-red/20 mb-10 shadow-[0_0_20px_rgba(255,76,76,0.1)]">
              <AlertCircle className="text-ember-red animate-pulse" size={18} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-ember-red">High-Priority Dispatch</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display uppercase leading-none mb-10 text-soft-white">
              Never Miss An<br />
              <span className="text-ember-red text-glow-red">Emergency</span> Again.
            </h2>
            <p className="text-xl text-cool-gray leading-relaxed mb-12 font-medium">
              A burst pipe at 2:00 AM isn't just a job — it's a high-ticket emergency. 
              Erica is trained to identify urgency instantly, flag the call, and ensure your on-call team is notified before the customer calls your competitor.
            </p>
            <div className="space-y-8">
              {[
                { title: "Urgency Detection", desc: "Erica listens for keywords like 'flood', 'burst', or 'emergency'." },
                { title: "Instant Escalation", desc: "Emergency leads are texted and emailed to your team with a red-alert status." },
                { title: "24/7/365 Coverage", desc: "No more sleeping through your ringer. Erica is always awake." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-ember-red/10 flex items-center justify-center shrink-0 group-hover:bg-ember-red/20 transition-colors">
                    <Zap className="text-ember-red" size={24} />
                  </div>
                  <div>
                    <h4 className="text-soft-white font-display uppercase tracking-tight text-xl mb-1">{item.title}</h4>
                    <p className="text-cool-gray text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-20 bg-ember-red/20 blur-[120px] rounded-full opacity-40" />
            <div className="relative glass-panel rounded-[4rem] border border-ember-red/30 p-10 md:p-16 overflow-hidden glow-red shadow-[0_0_50px_rgba(255,76,76,0.2)]">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-ember-red/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,76,76,0.2)]">
                    <Phone className="text-ember-red" size={28} />
                  </div>
                  <div>
                    <p className="text-ember-red font-black text-[10px] uppercase tracking-[0.3em] mb-1">Incoming Emergency</p>
                    <p className="text-soft-white font-display uppercase text-2xl">Main Line (02:14 AM)</p>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-ember-red text-white text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg">Live</div>
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                  <p className="text-cool-gray text-[10px] uppercase font-black tracking-widest mb-4">Customer Issue</p>
                  <p className="text-soft-white font-medium italic text-lg leading-relaxed">"My basement is flooding! The main pipe just burst and I can't find the shutoff valve!"</p>
                </div>
                <div className="bg-ember-red/5 rounded-3xl p-8 border border-ember-red/10">
                  <p className="text-ember-red text-[10px] uppercase font-black tracking-widest mb-4">Erica's Response</p>
                  <p className="text-soft-white font-medium text-lg leading-relaxed">"I understand this is an emergency, I'm flagging this for our on-call technician right now. Can you confirm your address?"</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex-grow h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-ember-red shadow-[0_0_15px_rgba(255,76,76,0.8)]"
                  />
                </div>
              </div>
              <p className="text-center text-[10px] text-cool-gray mt-6 font-black uppercase tracking-[0.3em]">Alerting On-Call Team...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
