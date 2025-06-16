import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectShowcase from '../components/ProjectShowcase';
import SEO from '../components/SEO';

const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Andre Emanuel's portfolio - Full-stack developer specializing in React, Node.js, and modern web technologies. Explore my projects and get in touch for collaboration opportunities."
        keywords="Andre Emanuel, full-stack developer, portfolio, React developer, web development, projects showcase"
      />
      <div className="min-h-screen">
        <HeroSection />
        <ProjectShowcase />
      </div>
    </>
  );
};

export default HomePage;
