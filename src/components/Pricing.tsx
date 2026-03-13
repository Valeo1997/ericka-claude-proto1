import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const PricingCard = ({ tier, title, price, target, coreValue, features, isPopular }: { tier: string, title: string, price: string, target: string, coreValue: string, features: string[], isPopular?: boolean }) => (
  <div className={`glass-panel p-12 rounded-[3rem] flex flex-col h-full transition-all duration-500 ${isPopular ? 'border-electric-blue/50 glow-blue scale-105 z-10 border-beam' : 'border-white/5'}`}>
    {isPopular && (
      <span className="bg-electric-blue text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full self-center -mt-16 mb-12 shadow-lg">
        ⭐ Most Popular
      </span>
    )}
    <div className="mb-10">
      <h4 className="text-electric-blue text-xs font-black uppercase tracking-[0.3em] mb-4">{tier}</h4>
      <h3 className="text-4xl font-display uppercase tracking-tight text-soft-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-6xl font-display text-soft-white">{price}</span>
        <span className="text-cool-gray text-xs font-bold uppercase tracking-widest">/ Month</span>
      </div>
      <div className="flex items-center gap-2 mb-6 text-cool-gray">
        <div className="w-1 h-1 rounded-full bg-electric-blue" />
        <span className="text-[10px] font-black uppercase tracking-widest">{target}</span>
      </div>
      <p className="text-sm text-soft-white font-bold italic border-l-4 border-electric-blue pl-4 py-2 bg-electric-blue/5 rounded-r-2xl">
        "{coreValue}"
      </p>
    </div>
    <ul className="space-y-5 mb-12 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-4 text-sm text-cool-gray font-semibold">
          <CheckCircle2 className="text-electric-blue shrink-0 mt-0.5" size={20} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${isPopular ? 'bg-electric-blue text-white glow-blue hover:bg-blue-600' : 'bg-white/5 text-soft-white hover:bg-white/10 border border-white/10'}`}>
      {isPopular ? 'Start Free Trial →' : 'Get Started'}
    </button>
  </div>
);

export const Pricing = () => {
  return (
    <motion.section 
      id="pricing" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-32 bg-navy-slate/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-electric-blue font-bold tracking-[0.3em] uppercase text-xs mb-4 block">← PRICING</span>
          <h2 className="text-4xl md:text-6xl font-black text-soft-white mb-6">Pick the Plan That Fits Your Business.</h2>
          <p className="text-cool-gray text-xl">Start simple. Scale as you grow. No long-term contracts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            tier="Tier 1"
            title="The Safety Net"
            price="$197"
            target="Solo operators or small shops"
            coreValue="Stop losing money to missed calls"
            features={[
              "24/7 Ericka AI Receptionist",
              "Intelligent Lead Capture",
              "The Live Dispatch Dashboard",
              "Instant SMS Alerts"
            ]}
          />
          <PricingCard 
            tier="Tier 2"
            title="The Dispatcher"
            price="$497"
            target="Growing companies with 3–10 trucks"
            coreValue="Automated booking and CRM integration"
            isPopular
            features={[
              "Everything in Tier 1",
              "Live Calendar Booking",
              "CRM Integration (Jobber, GHL, etc.)",
              "Urgency Logic & Emergency Alerts",
              "Custom 'Office Manager' Voice"
            ]}
          />
          <PricingCard 
            tier="Tier 3"
            title="The Command Center"
            price="$997"
            target="Franchises & dominant local players"
            coreValue="The 'Digital Twin' of your best employee"
            features={[
              "Everything in Tier 2",
              "Customer Memory & History",
              "Live Price Book & Instant Quotes",
              "Self-Learning Brain",
              "Custom Voice Cloning",
              "VIP Priority Handling"
            ]}
          />
        </div>
      </div>
    </motion.section>
  );
};
