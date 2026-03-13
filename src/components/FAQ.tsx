import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
      <button 
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-soft-white">{question}</span>
        <ChevronDown className={`text-cool-gray transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <p className="text-cool-gray text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-40"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-electric-blue font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">← FAQ</span>
          <h2 className="text-5xl md:text-8xl font-display uppercase leading-none mb-10 text-soft-white">Questions?</h2>
          <p className="text-cool-gray text-xl font-medium">Running a plumbing business is already complicated enough — Ericka makes this part simple.</p>
        </div>

        <div className="space-y-6">
          <FAQItem 
            question="Does Ericka sound like a robot?"
            answer="Not at all. Ericka is trained to speak naturally and professionally, using your company's name and tone. Most customers won't know they're speaking to AI."
          />
          <FAQItem 
            question="What happens if a customer has a complex question?"
            answer="Ericka handles common questions and booking seamlessly. For complex situations, she collects the information and escalates to your team immediately."
          />
          <FAQItem 
            question="Will Ericka work with my existing calendar?"
            answer="Yes. Ericka integrates with most scheduling tools used in the trades industry (ServiceTitan, Jobber, Housecall Pro, etc.)."
          />
          <FAQItem 
            question="Is there a contract?"
            answer="No long-term contracts. Start, pause, or cancel anytime. We believe in earning your business every single month."
          />
          <FAQItem 
            question="How fast can I get set up?"
            answer="Most plumbing companies are live with Ericka within 24–48 hours of signing up."
          />
        </div>
      </div>
    </motion.section>
  );
};
