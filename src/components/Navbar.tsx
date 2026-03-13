import React, { useState, useEffect } from 'react';
import { Droplets, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (link: string) => {
    if (link === 'Calculator') return '/calculator';
    const hash = `#${link.toLowerCase().replace(/\s+/g, '-')}`;
    return isHome ? hash : `/${hash}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-panel-heavy py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-electric-blue flex items-center justify-center glow-blue shadow-[0_0_30px_rgba(45,142,255,0.3)]">
            <Droplets className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-display uppercase tracking-tighter text-soft-white leading-none">Ericka</span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-electric-blue leading-none mt-1">AI Dispatcher</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Live Demo', 'How It Works', 'Features', 'Calculator', 'Pricing', 'FAQ'].map((link) => (
            link === 'Calculator' ? (
              <Link key={link} to="/calculator" className="text-xs font-black uppercase tracking-[0.2em] text-cool-gray hover:text-electric-blue transition-colors">
                {link}
              </Link>
            ) : (
              <a key={link} href={getHref(link)} className="text-xs font-black uppercase tracking-[0.2em] text-cool-gray hover:text-electric-blue transition-colors">
                {link}
              </a>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-3 text-cool-gray">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <Phone size={14} className="text-electric-blue" />
            </div>
            <span className="text-xs font-black tracking-widest">(877) 000-0000</span>
          </div>
          <button className="bg-electric-blue hover:bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all glow-blue shadow-[0_0_20px_rgba(45,142,255,0.2)]">
            Book a Demo →
          </button>
        </div>

        <button className="md:hidden text-soft-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-panel-heavy p-6 md:hidden flex flex-col gap-4 border-t border-white/10"
          >
            {['Live Demo', 'How It Works', 'Features', 'Calculator', 'Pricing', 'FAQ'].map((link) => (
              link === 'Calculator' ? (
                <Link key={link} to="/calculator" className="text-lg font-medium text-soft-white" onClick={() => setIsMobileMenuOpen(false)}>
                  {link}
                </Link>
              ) : (
                <a key={link} href={getHref(link)} className="text-lg font-medium text-soft-white" onClick={() => setIsMobileMenuOpen(false)}>
                  {link}
                </a>
              )
            ))}
            <hr className="border-white/10" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-cool-gray">
                <Phone size={18} />
                <span>(877) 000-0000</span>
              </div>
              <button className="bg-electric-blue text-white w-full py-3 rounded-full font-semibold">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
