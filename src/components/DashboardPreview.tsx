import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const DashboardPreview = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-electric-blue font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">← YOUR COMMAND CENTER</span>
            <h2 className="text-5xl md:text-8xl font-display uppercase leading-none mb-10 text-soft-white">
              Mission Control.<br />
              Built for <span className="text-electric-blue">Plumbers.</span>
            </h2>
            <p className="text-xl text-cool-gray leading-relaxed mb-12 font-medium">
              Your Erica dashboard shows every call, every lead, and every booked job — in real time. 
              Know exactly what's coming in before you even pick up a wrench.
            </p>
            <ul className="space-y-8">
              {[
                "Live Feed with pulsing new lead rows",
                "Urgency badge (red glow) on emergency calls",
                "Revenue counter showing captured value",
                "Real-time status of your virtual assistant"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 text-soft-white font-bold uppercase tracking-tight text-lg">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center shadow-[0_0_15px_rgba(45,142,255,0.1)]">
                    <CheckCircle2 className="text-electric-blue" size={18} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 bg-electric-blue/20 blur-[120px] rounded-full opacity-30" />
            <motion.div 
              initial={{ rotateY: -10, rotateX: 5 }}
              whileInView={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1 }}
              className="relative glass-panel rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Mockup Dashboard Header */}
              <div className="bg-white/5 border-b border-white/5 p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-ember-red" />
                  <div className="w-3 h-3 rounded-full bg-amber-gold" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="relative group cursor-help">
                  <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                    <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                    <span className="text-[10px] font-black text-electric-blue uppercase tracking-[0.2em]">Erica Active</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-3 w-56 p-4 glass-panel-heavy rounded-2xl border border-electric-blue/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl">
                    <p className="text-[10px] text-soft-white leading-relaxed font-bold uppercase tracking-widest">Erica is currently monitoring your lines and booking jobs in real-time.</p>
                  </div>
                </div>
              </div>
              {/* Mockup Dashboard Content */}
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="relative group cursor-help">
                    <p className="text-[10px] text-cool-gray uppercase tracking-[0.3em] font-black mb-2">Today's Revenue</p>
                    <h4 className="text-5xl font-display text-soft-white">$3,240 <span className="text-sm text-green-500 font-black tracking-widest ml-2">+12%</span></h4>
                    {/* Tooltip */}
                    <div className="absolute top-full left-0 mt-3 w-64 p-4 glass-panel-heavy rounded-2xl border border-electric-blue/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl">
                      <p className="text-[10px] text-soft-white leading-relaxed font-bold uppercase tracking-widest">Total revenue from jobs successfully booked and confirmed by Erica AI today.</p>
                    </div>
                  </div>
                  <div className="h-16 w-40 bg-electric-blue/5 rounded-2xl border border-white/5" />
                </div>
                
                <div className="space-y-4">
                  <p className="text-[10px] text-cool-gray uppercase tracking-[0.3em] font-black">Recent Activity</p>
                  {[
                    { name: "John Smith", issue: "Burst Pipe — Emergency", status: "Urgent", color: "text-ember-red", bg: "bg-ember-red/10", tooltip: "Emergency call handled at 2:14 AM. Dispatch notified immediately." },
                    { name: "Sarah Miller", issue: "Water Heater Install", status: "Booked", color: "text-green-500", bg: "bg-green-500/10", tooltip: "Job booked via online calendar sync. Customer received confirmation email." },
                    { name: "Mike Johnson", issue: "Drain Cleaning", status: "Pending", color: "text-amber-gold", bg: "bg-amber-gold/10", tooltip: "Customer inquiring about rates. Erica provided quote and is awaiting confirmation." }
                  ].map((row, i) => (
                    <div key={i} className="relative group">
                      <div className="flex items-center justify-between p-5 glass-panel rounded-2xl border border-white/5 hover:border-electric-blue/30 transition-all cursor-help group-hover:bg-white/5">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-soft-white font-display text-xl border border-white/10">
                            {row.name[0]}
                          </div>
                          <div>
                            <p className="text-lg font-display uppercase tracking-tight text-soft-white">{row.name}</p>
                            <p className="text-xs text-cool-gray font-bold uppercase tracking-widest">{row.issue}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${row.bg} ${row.color} shadow-sm`}>
                          {row.status}
                        </span>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute left-full top-0 ml-6 w-56 p-4 glass-panel-heavy rounded-2xl border border-electric-blue/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 hidden lg:block shadow-2xl">
                        <p className="text-[10px] text-soft-white leading-relaxed font-bold uppercase tracking-widest">{row.tooltip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
