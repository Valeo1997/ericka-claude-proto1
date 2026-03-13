import React from 'react';
import { Droplets, Star, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const getHref = (link: string) => {
    if (link === 'Calculator') return '/calculator';
    const hash = `#${link.toLowerCase().replace(/\s+/g, '-')}`;
    return isHome ? hash : `/${hash}`;
  };
  return (
    <footer className="py-32 border-t border-white/5 bg-navy-slate/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-electric-blue flex items-center justify-center glow-blue">
                <Droplets className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display uppercase tracking-tighter text-soft-white leading-none">Erica</span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-electric-blue leading-none mt-1">AI Dispatcher</span>
              </div>
            </div>
            <p className="text-cool-gray text-sm leading-relaxed mb-10 font-medium">
              Every Call Answered. Every Job Booked. Meet Erica: Your AI Dispatcher. Built for the trades, by people who understand the trades.
            </p>
            <div className="flex gap-5">
              {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
                <div key={social} className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-cool-gray hover:text-electric-blue cursor-pointer transition-all border border-white/5 hover:border-electric-blue/30">
                  <span className="sr-only">{social}</span>
                  <Star size={20} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-soft-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Quick Links</h5>
            <ul className="space-y-5">
              {['Home', 'How It Works', 'Features', 'Calculator', 'Pricing', 'FAQ'].map((link) => (
                <li key={link}>
                  {link === 'Calculator' ? (
                    <Link to="/calculator" className="text-cool-gray hover:text-electric-blue transition-colors text-sm font-bold uppercase tracking-widest">{link}</Link>
                  ) : (
                    <a href={getHref(link)} className="text-cool-gray hover:text-electric-blue transition-colors text-sm font-bold uppercase tracking-widest">{link}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-soft-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Legal</h5>
            <ul className="space-y-5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cool-gray hover:text-electric-blue transition-colors text-sm font-bold uppercase tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-soft-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Contact</h5>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-cool-gray">
                <Phone size={18} className="text-electric-blue" />
                <span className="text-sm font-black tracking-widest">(877) 000-0000</span>
              </li>
              <li className="flex items-center gap-4 text-cool-gray">
                <Mail size={18} className="text-electric-blue" />
                <span className="text-sm font-black tracking-widest">hello@erica.ai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-cool-gray text-[10px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Erica AI Dispatcher. All rights reserved.
          </p>
          <p className="text-cool-gray text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
            Made with <Droplets size={12} className="text-electric-blue" /> for Plumbers
          </p>
        </div>
      </div>
    </footer>
  );
};
