import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, Mail, BarChart3, Zap, Mic2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, isUrgent, isLight }: { icon: any, title: string, description: string, isUrgent?: boolean, isLight?: boolean }) => (
  <div className={`${isLight ? 'bg-white shadow-xl border-black/5' : 'glass-panel border-white/5'} p-10 rounded-[2.5rem] transition-all group ${isUrgent ? 'border-ember-red/30 glow-red' : 'hover:border-electric-blue/30'}`}>
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${isUrgent ? 'bg-ember-red/20 text-ember-red shadow-[0_0_20px_rgba(255,76,76,0.2)]' : 'bg-electric-blue/10 text-electric-blue shadow-[0_0_20px_rgba(45,142,255,0.1)]'}`}>
      <Icon size={32} />
    </div>
    <h3 className={`text-2xl font-display uppercase tracking-tight mb-4 ${isLight ? 'text-navy-slate' : 'text-soft-white'}`}>{title}</h3>
    <p className={`${isLight ? 'text-slate-600' : 'text-cool-gray'} leading-relaxed font-medium`}>{description}</p>
  </div>
);

export const Features = () => {
  return (
    <motion.section 
      id="features" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-32 bg-soft-white relative overflow-hidden"
    >
      {/* Subtle pattern for light section */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0d1b2a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-electric-blue font-bold tracking-[0.3em] uppercase text-xs mb-4 block">← FEATURES</span>
          <h2 className="text-4xl md:text-6xl font-black text-navy-slate">One Assistant. Every Customer Touchpoint.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Phone}
            title="Answers Every Call"
            description="Never send a customer to voicemail again. Ericka answers 24/7, speaks naturally, and represents your brand with professionalism every single time."
            isLight
          />
          <FeatureCard 
            icon={Calendar}
            title="Books Appointments"
            description="Ericka syncs with your schedule and books jobs in real time. No double-bookings, no back-and-forth — just confirmed appointments."
            isLight
          />
          <FeatureCard 
            icon={Mail}
            title="Replies to Emails"
            description="From quote requests to follow-ups, Ericka manages your inbox and responds promptly so no lead goes cold."
            isLight
          />
          <FeatureCard 
            icon={BarChart3}
            title="Tracks Every Lead"
            description="Every call, booking, and email is logged in your Ericka dashboard — your personal mission control."
            isLight
          />
          <FeatureCard 
            icon={Zap}
            title="Always Improving"
            description="Ericka learns your business. The more she works for you, the sharper and more accurate she gets."
            isLight
          />
          <div className="bg-navy-slate p-8 rounded-3xl flex flex-col justify-center items-center text-center border border-white/10 group hover:scale-[1.02] transition-transform">
            <Mic2 className="text-electric-blue mb-4 animate-pulse-soft" size={40} />
            <h3 className="text-xl font-bold text-soft-white mb-2">Custom Voice Cloning</h3>
            <p className="text-cool-gray text-sm">Make Ericka sound exactly like your best office manager.</p>
          </div>
        </div>

        {/* Ericka in Action Mockup */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-navy-slate mb-4 italic">"Ericka, handle my calls for the next 2 hours."</h3>
            <p className="text-slate-500 font-medium">Real-time control from your phone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-black/5 max-w-[80%]">
                <p className="text-xs font-bold text-electric-blue mb-1">Ericka AI</p>
                <p className="text-sm text-navy-slate">"I've just booked a water heater repair for tomorrow at 9:00 AM with Mr. Henderson. I've sent the details to your calendar."</p>
              </div>
              <div className="bg-electric-blue p-4 rounded-2xl shadow-lg max-w-[80%] ml-auto text-white">
                <p className="text-xs font-bold text-blue-100 mb-1">You</p>
                <p className="text-sm">"Perfect. Flag any emergencies to my cell directly."</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-black/5 max-w-[80%]">
                <p className="text-xs font-bold text-electric-blue mb-1">Ericka AI</p>
                <p className="text-sm text-navy-slate">"Understood. Emergency protocol active. I'll only interrupt you for high-priority jobs."</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-electric-blue/10 blur-2xl rounded-full" />
              <img 
                src="https://picsum.photos/seed/plumber-phone/600/400" 
                className="relative rounded-3xl shadow-2xl border border-black/5 object-cover w-full h-64"
                alt="Plumber checking phone"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-soft-white uppercase">Live Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
