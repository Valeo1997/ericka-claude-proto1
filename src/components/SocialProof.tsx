import React from 'react';

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center md:items-start">
    <span className="text-4xl md:text-6xl font-display text-electric-blue text-glow-blue mb-2">{value}</span>
    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cool-gray font-black">{label}</span>
  </div>
);

export const SocialProof = () => {
  return (
    <section className="py-12 glass-panel border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-cool-gray text-sm font-bold uppercase tracking-[0.3em] mb-12">
          Trusted by plumbing companies across the country
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 divide-x-0 lg:divide-x divide-white/10">
          <div className="px-8"><StatItem value="10,000+" label="Calls Answered" /></div>
          <div className="px-8"><StatItem value="98%" label="Booking Accuracy" /></div>
          <div className="px-8"><StatItem value="$2.1M+" label="Revenue Captured" /></div>
          <div className="px-8"><StatItem value="4.9★" label="Average Rating" /></div>
        </div>
      </div>
    </section>
  );
};
