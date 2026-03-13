import React from 'react';

export const LiveTicker = () => {
  const activities = [
    { type: 'BOOKED', text: 'Water Heater Replace — BOOKED @ 9:00 AM', color: 'text-green-500' },
    { type: 'EMERGENCY', text: 'EMERGENCY: Bob K. — Burst Pipe — Dispatched 2:14 AM', color: 'text-ember-red' },
    { type: 'PENDING', text: 'Linda P. — Remodel Quote — Pending Follow-up', color: 'text-amber-gold' },
    { type: 'BOOKED', text: 'David N. — Sink Leak — BOOKED @ 11:30 AM', color: 'text-green-500' },
    { type: 'BOOKED', text: 'Marcus T. — Drain Cleaning — BOOKED @ 2:00 PM', color: 'text-green-500' },
    { type: 'EMERGENCY', text: 'EMERGENCY: Carol H. — Gas Smell — Dispatched 6:42 AM', color: 'text-ember-red' },
    { type: 'REVENUE', text: 'Revenue captured today: $3,240 and counting 💰', color: 'text-electric-blue' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] glass-panel-heavy border-t border-white/10 py-2 overflow-hidden">
      <div className="ticker-track">
        {[...activities, ...activities].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.color.replace('text-', 'bg-')}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${item.color}`}>
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
