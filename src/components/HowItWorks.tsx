import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mic2, CheckCircle2, Zap, Star } from 'lucide-react';

const StepCard = ({ number, title, description, isActive, isPayoff }: { number: string, title: string, description: string, isActive?: boolean, isPayoff?: boolean }) => (
  <div className={`relative p-10 rounded-[2.5rem] transition-all duration-500 ${isPayoff ? 'bg-electric-blue text-white scale-110 z-20 shadow-[0_0_60px_rgba(45,142,255,0.4)]' : isActive ? 'glass-panel border-electric-blue/50 glow-blue scale-105 z-10' : 'glass-panel border-white/5 opacity-60'}`}>
    <span className={`text-6xl font-display absolute top-6 right-8 ${isPayoff ? 'text-white/20' : 'text-white/5'}`}>{number}</span>
    <div className={`mb-8 ${isPayoff ? 'text-white' : 'text-electric-blue'}`}>
      {number === '01' && <Phone size={32} />}
      {number === '02' && <Mic2 size={32} />}
      {number === '03' && <CheckCircle2 size={32} className="text-green-400" />}
      {number === '04' && <Zap size={32} />}
      {number === '05' && <Star size={32} className="text-amber-gold" />}
    </div>
    <h3 className={`text-2xl font-display uppercase tracking-tight mb-4 ${isPayoff ? 'text-white' : isActive ? 'text-electric-blue' : 'text-soft-white'}`}>{title}</h3>
    <p className={`${isPayoff ? 'text-blue-50' : 'text-cool-gray'} text-sm leading-relaxed font-medium`}>{description}</p>
    {isPayoff && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-gold text-navy-slate text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-bounce">
        The Payoff
      </div>
    )}
  </div>
);

export const HowItWorks = () => {
  return (
    <motion.section 
      id="how-it-works" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-40 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-electric-blue font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">← THE PROCESS</span>
          <h2 className="text-5xl md:text-8xl font-display uppercase leading-none mb-8 text-soft-white">
            From Missed Call to<br />
            <span className="text-electric-blue">Booked Job</span> in 60s.
          </h2>
          <p className="text-cool-gray max-w-2xl text-xl font-medium">
            Ericka handles the front desk so your crew can focus on the work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <StepCard 
            number="01" 
            title="Customer Calls" 
            description="A homeowner calls your business — day or night." 
          />
          <StepCard 
            number="02" 
            title="Ericka Answers" 
            description="Ericka picks up in seconds, greets them professionally in your company's name." 
          />
          <StepCard 
            number="03" 
            title="Job Booked" 
            description="Ericka qualifies the lead, captures their info, and schedules the job directly into your calendar." 
            isPayoff
          />
          <StepCard 
            number="04" 
            title="You Get Notified" 
            description="You receive an instant summary — customer name, issue, address, and appointment time." 
          />
          <StepCard 
            number="05" 
            title="You Show Up" 
            description="Walk in prepared. Ericka already handled the rest. Collect your payment." 
          />
        </div>
      </div>
    </motion.section>
  );
};
