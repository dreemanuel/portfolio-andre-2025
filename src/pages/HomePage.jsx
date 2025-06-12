import React from 'react';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Add other sections below the hero */}
      <section className="py-20 bg-ctp-base">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-ctp-text text-center mb-8">
            Featured Work
          </h2>
          {/* Project grid will go here */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
