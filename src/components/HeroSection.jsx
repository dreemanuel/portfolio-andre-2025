// src/components/HeroSection.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

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
    'Web Developer',
    2000,
    'UI/UX Designer',
    2000,
    'Linux Enthusiast',
    2000,
    'Problem Solver',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-16">
          {/* Left Column - Intro Text */}
          <motion.div 
            className="lg:col-span-7 backdrop-blur-sm bg-ctp-surface0/30 p-8 rounded-2xl border border-ctp-overlay0/20 shadow-2xl shadow-ctp-mauve/10"
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            key="left-column"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block px-3 py-1 mb-6 text-sm font-mono bg-ctp-surface1/50 text-ctp-blue border border-ctp-overlay0 rounded-full"
            >
              Welcome to my digital space
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ctp-mauve to-ctp-blue"
            >
              Hi, I'm <span className="animate-neon-pulse">Andre</span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-medium text-ctp-subtext0 mb-8"
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
              className="text-ctp-subtext1 mb-10 max-w-2xl text-lg leading-relaxed"
            >
              I craft immersive digital experiences with a focus on <span className="text-ctp-blue">clean code</span> and 
              <span className="text-ctp-pink"> pixel-perfect design</span>. Let's turn your ideas into reality with cutting-edge web technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-10">
              <Link 
                to="/projects" 
                className="group relative px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-ctp-blue to-ctp-sapphire text-ctp-base hover:shadow-neon transition-all duration-300 hover:translate-y-[-2px] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>View My Work</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-ctp-blue to-ctp-sapphire opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <a 
                href="#contact" 
                className="group relative px-8 py-4 rounded-xl font-medium border-2 border-ctp-blue text-ctp-text hover:bg-ctp-blue/10 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-neon-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Contact Me</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">↑</span>
                </span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon group relative w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-neon-cyan transition-all duration-300 hover:shadow-neon-sm"
                aria-label="GitHub"
              >
                <FaGithub size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-mono bg-ctp-surface0 px-2 py-1 rounded whitespace-nowrap transition-all duration-300">GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon group relative w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-neon-cyan transition-all duration-300 hover:shadow-neon-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-mono bg-ctp-surface0 px-2 py-1 rounded whitespace-nowrap transition-all duration-300">LinkedIn</span>
              </a>
              <a 
                href="mailto:your.email@example.com" 
                className="social-icon group relative w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-neon-cyan transition-all duration-300 hover:shadow-neon-sm"
                aria-label="Email"
              >
                <FaEnvelope size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-mono bg-ctp-surface0 px-2 py-1 rounded whitespace-nowrap transition-all duration-300">Email Me</span>
              </a>
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
              
              <div className="flex flex-col gap-4">
                <a 
                  href="/resume.pdf" 
                  download
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-ctp-base bg-gradient-to-r from-ctp-blue to-ctp-sapphire hover:from-ctp-sapphire hover:to-ctp-blue transition-all duration-300 shadow-lg hover:shadow-ctp-blue/50"
                >
                  <FiDownload className="mr-2" /> Download Resume
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-ctp-blue text-base font-medium rounded-lg text-ctp-blue hover:bg-ctp-blue/10 transition-all duration-300"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 border-t border-ctp-overlay0/30">
              <h4 className="text-ctp-subtext0 font-medium mb-4">Connect with me</h4>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-ctp-blue transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-ctp-blue transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a 
                  href="mailto:your.email@example.com" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 text-ctp-subtext1 hover:text-ctp-yellow transition-all duration-300"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </a>
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
