import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LostRevenueCalculator } from '../components/LostRevenueCalculator';

export const CalculatorPage = () => {
  return (
    <div className="min-h-screen selection:bg-electric-blue/30 bg-navy-slate flex flex-col">
      <Navbar />
      <div className="flex-grow pt-32 pb-20">
        <LostRevenueCalculator />
      </div>
      <Footer />
    </div>
  );
};
