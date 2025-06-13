// src/components/HeroSection.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import SocialLinksDropdown from './SocialLinksDropdown';
import { useNavigationContext } from '../App';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { 
    heroOpacity, 
    heroScale, 
    isHeroMode,
    SCROLL_THRESHOLD 
  } = useNavigationContext();

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
      style={{ 
        opacity: heroOpacity, 
        scale: heroScale,
        pointerEvents: isHeroMode ? 'auto' : 'none'
      }}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[70vh] py-8">
          {/* Left Column - Minimalist Text */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center p-12 lg:p-16"
            style={{
              position: 'relative',
              background: 'linear-gradient(to right, rgba(36, 39, 58, 0.8), rgba(41, 44, 60, 0.8))',
              borderRadius: '1.5rem',
              overflow: 'hidden',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="left-column"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '1.5rem',
              padding: '1px',
              background: 'linear-gradient(to bottom, rgba(51, 204, 255, 0.7), rgba(0, 255, 153, 0.7))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none'
            }} />
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-left"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ctp-mauve to-ctp-blue">
                Hi, I'm <span className="animate-pulse [text-shadow:0_0_10px_rgba(102,164,224,0.8),0_0_20px_rgba(102,164,224,0.6),0_0_30px_rgba(102,164,224,0.4)]">Andre</span>
              </span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-medium mb-8 text-left"
            >
              <span className="inline-block min-h-[2.5rem] font-heading text-ctp-text">
                I am a <TypeAnimation
                  sequence={typingSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline"
                />
              </span>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-ctp-subtext1 mb-10 max-w-2xl text-lg leading-relaxed text-left"
            >
              Crafting digital experiences with <span className="text-ctp-blue">clean code</span>, cutting edge web technologies, and 
              <span className="text-ctp-pink"> thoughtful design</span>.
            </motion.p>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-center p-12 lg:p-16 text-left"
            style={{
              position: 'relative',
              background: 'linear-gradient(to right, rgba(36, 39, 58, 0.8), rgba(41, 44, 60, 0.8))',
              borderRadius: '1.5rem',
              overflow: 'hidden',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="right-column"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '1.5rem',
              padding: '1px',
              background: 'linear-gradient(to bottom, rgba(51, 204, 255, 0.7), rgba(0, 255, 153, 0.7))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none'
            }} />
            <div className="space-y-6">
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-ctp-text text-center"
              >
                Let's Collaborate
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-ctp-subtext1 mb-6 text-sm"
              >
                I'm currently available for select freelance opportunities. Have an exciting project where you need my help?
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-ctp-base rounded-lg bg-gradient-to-r from-ctp-blue to-ctp-sapphire hover:opacity-90 transition-opacity w-full"
                >
                  Work with me
                </Link>
                
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-ctp-text rounded-lg border border-ctp-surface2 hover:bg-ctp-surface0/30 transition-colors w-full"
                >
                  About Me
                </Link>
                
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <SocialLinksDropdown />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
