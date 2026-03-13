import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, DollarSign, PhoneOff, TrendingDown, CheckCircle2 } from 'lucide-react';

export const LostRevenueCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    missedCallsPerWeek: 10,
    averageTicketValue: 500,
    bookingRate: 40,
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculations
  const missedCallsPerYear = formData.missedCallsPerWeek * 52;
  const lostJobsPerYear = Math.round(missedCallsPerYear * (formData.bookingRate / 100));
  const lostRevenuePerYear = lostJobsPerYear * formData.averageTicketValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'email' || name === 'phone' || name === 'company' 
        ? value 
        : Number(value)
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      lostRevenuePerYear,
      source: 'Lost Revenue Calculator'
    };

    try {
      // Send to GoHighLevel Webhook
      await fetch('https://services.leadconnectorhq.com/hooks/xS6XtHTWs9JzkVQk6iwk/webhook-trigger/af0d3f11-c4fd-4159-969a-5596484152ff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting calculator lead:', error);
      // Still show success to user even if webhook fails, or handle error
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-32 relative overflow-hidden bg-navy-slate">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border-white/10 mb-8 shadow-[0_0_20px_rgba(45,142,255,0.1)]">
            <Calculator className="text-electric-blue" size={18} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-soft-white">Free Audit</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display uppercase leading-none mb-6 text-soft-white">
            How Much Are Missed Calls<br />
            <span className="text-ember-red text-glow-red">Costing You?</span>
          </h2>
          <p className="text-xl text-cool-gray font-medium">
            Find out your true lost revenue in 30 seconds.
          </p>
        </div>

        <div className="glass-panel-heavy rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <div 
                className="h-full bg-electric-blue transition-all duration-500 ease-out glow-blue"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-display uppercase tracking-tight text-soft-white mb-8">Step 1: Your Numbers</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-cool-gray mb-4">
                          <span>Missed Calls Per Week</span>
                          <span className="text-electric-blue text-xl">{formData.missedCallsPerWeek}</span>
                        </label>
                        <input 
                          type="range" 
                          name="missedCallsPerWeek"
                          min="1" max="100" 
                          value={formData.missedCallsPerWeek}
                          onChange={handleInputChange}
                          className="w-full accent-electric-blue h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-cool-gray mb-4">
                          <span>Average Job Ticket Value ($)</span>
                          <span className="text-electric-blue text-xl">${formData.averageTicketValue}</span>
                        </label>
                        <input 
                          type="range" 
                          name="averageTicketValue"
                          min="100" max="5000" step="50"
                          value={formData.averageTicketValue}
                          onChange={handleInputChange}
                          className="w-full accent-electric-blue h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-cool-gray mb-4">
                          <span>Booking Rate (%)</span>
                          <span className="text-electric-blue text-xl">{formData.bookingRate}%</span>
                        </label>
                        <input 
                          type="range" 
                          name="bookingRate"
                          min="10" max="100" step="5"
                          value={formData.bookingRate}
                          onChange={handleInputChange}
                          className="w-full accent-electric-blue h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Percentage of callers who actually book a job</p>
                      </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <button 
                        onClick={nextStep}
                        className="bg-electric-blue hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all glow-blue flex items-center gap-2"
                      >
                        See My Lost Revenue <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-display uppercase tracking-tight text-soft-white mb-8 text-center">The Brutal Truth</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                        <PhoneOff className="text-cool-gray mx-auto mb-4" size={24} />
                        <p className="text-3xl font-display text-soft-white mb-1">{missedCallsPerYear}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-cool-gray">Missed Calls / Yr</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                        <TrendingDown className="text-cool-gray mx-auto mb-4" size={24} />
                        <p className="text-3xl font-display text-soft-white mb-1">{lostJobsPerYear}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-cool-gray">Lost Jobs / Yr</p>
                      </div>
                      <div className="bg-ember-red/10 border border-ember-red/20 rounded-3xl p-6 text-center glow-red">
                        <DollarSign className="text-ember-red mx-auto mb-4" size={24} />
                        <p className="text-3xl font-display text-ember-red mb-1">${lostRevenuePerYear.toLocaleString()}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-ember-red">Lost Revenue / Yr</p>
                      </div>
                    </div>

                    <div className="bg-electric-blue/10 border border-electric-blue/20 rounded-2xl p-6 text-center">
                      <p className="text-soft-white font-medium">
                        Erica can capture that <strong className="text-electric-blue">${lostRevenuePerYear.toLocaleString()}</strong> for a fraction of the cost of a human dispatcher.
                      </p>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button 
                        onClick={prevStep}
                        className="text-cool-gray hover:text-soft-white px-6 py-4 text-sm font-black uppercase tracking-widest transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={nextStep}
                        className="bg-electric-blue hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all glow-blue flex items-center gap-2"
                      >
                        Get My Custom Plan <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-display uppercase tracking-tight text-soft-white mb-4">Stop The Bleeding</h3>
                      <p className="text-cool-gray text-sm font-medium">
                        Enter your details below to get a custom breakdown of how Erica will plug the holes in your leaky bucket.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-cool-gray ml-4">Full Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-soft-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-cool-gray ml-4">Company Name</label>
                        <input 
                          required
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-soft-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="Henderson Plumbing"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-cool-gray ml-4">Email Address</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-soft-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-cool-gray ml-4">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-soft-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="pt-8 flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={prevStep}
                        className="text-cool-gray hover:text-soft-white px-6 py-4 text-sm font-black uppercase tracking-widest transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-electric-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all glow-blue flex items-center gap-2"
                      >
                        {isSubmitting ? 'Sending...' : 'Send My Report'} <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8 glow-blue shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="text-green-500" size={48} />
                </div>
                <h3 className="text-4xl font-display uppercase tracking-tight text-soft-white mb-4">Report Sent!</h3>
                <p className="text-cool-gray text-lg font-medium mb-8">
                  We've received your details. Check your email shortly for a custom strategy on how to capture that ${lostRevenuePerYear.toLocaleString()} in lost revenue.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="text-electric-blue hover:text-blue-400 font-black uppercase tracking-widest text-sm transition-colors"
                >
                  Calculate Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
