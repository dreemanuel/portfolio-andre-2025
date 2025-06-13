// src/components/HeroSection.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import SocialLinksDropdown from './SocialLinksDropdown';

/**
 * Hero Section Component
 * @component
 * @description Displays the main hero section with animated text and call-to-action buttons.
 * Implements UI/UX spec 4.1 - Hero Section with animations and responsive design.
 * @returns {JSX.Element} The rendered HeroSection component
 */

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Scroll-based animations
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Text cycling animation sequence
  const typingSequence = [
    'Software Developer',
    2000,
    'Cybersecurity Analyst',
    2000,
    'Home Lab Hobbyist',
    2000,
    'Bassist',
    2000,
    'BBQ Pitmaster',
    2000,
    'Graphic Designer',
    2000,
    'Creative Problem Solver',
    2000,
    'Linux Power User (I use Arch btw)',
    2000,
  ];

  // Mount effect for animations
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ctp-base to-ctp-mantle" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-ctp-pink/20 to-ctp-mauve/20 filter blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-ctp-blue/20 to-ctp-sapphire/20 filter blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-ctp-green/20 to-ctp-teal/20 filter blur-3xl animate-float animation-delay-4000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(138, 173, 244, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 173, 244, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
      }}></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-ctp-mauve/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-ctp-blue/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[90vh] py-8">
          {/* Left Column - Minimalist Text */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center p-8 lg:p-12"
            style={{
              border: '1px solid transparent',
              borderImage: 'linear-gradient(to bottom, #33ccff, #00ff99) 1',
              background: 'linear-gradient(to right, rgba(36, 39, 58, 0.8), rgba(41, 44, 60, 0.8))',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="left-column"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-right"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ctp-mauve to-ctp-blue">
                Andre.
              </span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-medium mb-8 text-right"
            >
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block min-h-[2.5rem] font-heading text-ctp-text"
              />
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-ctp-subtext1 mb-10 max-w-2xl text-lg leading-relaxed text-right ml-auto"
            >
              Crafting digital experiences with <span className="text-ctp-blue">clean code</span> and 
              <span className="text-ctp-pink"> thoughtful design</span>.
            </motion.p>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-12"
            style={{
              border: '1px solid transparent',
              borderImage: 'linear-gradient(to bottom, #33ccff, #00ff99) 1',
              background: 'linear-gradient(to right, rgba(36, 39, 58, 0.8), rgba(41, 44, 60, 0.8))',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="right-column"
          >
            <div className="space-y-6">
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-ctp-text"
              >
                Let's Collaborate
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-ctp-subtext1 mb-6 text-sm"
              >
                I'm currently available for select freelance opportunities. Have an exciting project where you need my help?
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <Link 
                  to="/projects" 
                  className="block w-full text-center px-4 py-2 text-sm rounded-lg font-medium bg-gradient-to-r from-ctp-blue to-ctp-sapphire text-ctp-base hover:shadow-neon transition-all duration-300 hover:translate-y-[-2px]"
                >
                  View My Work
                </Link>
                
                <div className="flex items-center justify-center space-x-4 text-ctp-subtext1">
                  <span className="h-px flex-1 bg-ctp-overlay0/30"></span>
                  <span className="text-xs">or</span>
                  <span className="h-px flex-1 bg-ctp-overlay0/30"></span>
                </div>

                <div className="flex flex-col items-center space-y-3">
                  <SocialLinksDropdown />
                </div>
              </motion.div>
            </div>
          </motion.div>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div 
            className="lg:col-span-5 backdrop-blur-sm bg-ctp-surface0/30 p-8 rounded-2xl border border-ctp-overlay0/20 shadow-2xl shadow-ctp-blue/10"
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="right-column"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h3 className="text-2xl font-bold text-ctp-text mb-3">Let's Work Together</h3>
              <p className="text-ctp-subtext1 mb-6">I'm currently open to new opportunities and freelance projects</p>
                >
                  Let's Collaborate
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-ctp-subtext1 mb-6 text-sm"
                >
                  I'm currently available for select freelance opportunities. Have an exciting project where you need my help?
                </motion.p>

                <motion.div variants={itemVariants} className="space-y-4">
                  <Link 
                    to="/projects" 
                    className="block w-full text-center px-4 py-2 text-sm rounded-lg font-medium bg-gradient-to-r from-ctp-blue to-ctp-sapphire text-ctp-base hover:shadow-neon transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    View My Work
                  </Link>
                  
                  <div className="flex items-center justify-center space-x-4 text-ctp-subtext1">
                    <span className="h-px flex-1 bg-ctp-overlay0/30"></span>
                    <span className="text-xs">or</span>
                    <span className="h-px flex-1 bg-ctp-overlay0/30"></span>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <SocialLinksDropdown />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center group">
          <span className="text-sm text-ctp-subtext1 mb-2 group-hover:text-neon-cyan transition-colors">
            Scroll Down
          </span>
          <div className="w-8 h-12 border-2 border-neon-cyan rounded-full flex justify-center p-1 group-hover:shadow-[0_0_15px_var(--neon-cyan)] transition-all">
            <motion.div
              className="w-1.5 h-3 bg-neon-cyan rounded-full"
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
