import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectShowcase from '../components/ProjectShowcase';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectShowcase />
    </div>
  );
};

export default HomePage;
