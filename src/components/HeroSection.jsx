// src/components/HeroSection.jsx
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import SocialLinksDropdown from './SocialLinksDropdown';
import { useNavigationContext } from '../App';

// Mobile optimization hook
const useMobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchVelocity, setTouchVelocity] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    let lastTouchY = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
      lastTouchTime = Date.now();
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const currentTime = Date.now();
      const deltaY = currentY - lastTouchY;
      const deltaTime = currentTime - lastTouchTime;
      
      if (deltaTime > 0) {
        setTouchVelocity(Math.abs(deltaY / deltaTime));
      }
      
      lastTouchY = currentY;
      lastTouchTime = currentTime;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  return { isMobile, touchVelocity };
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { isMobile, touchVelocity } = useMobileOptimizations();
  const { 
    isHeroMode,
    SCROLL_THRESHOLD 
  } = useNavigationContext();
  
  // Custom scroll-based transforms for smoother hero transition
  const { scrollY } = useScroll();
  
  // Testing: Start at 200% + 4x duration for opacity
  const heroOpacity = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD * 0.8, SCROLL_THRESHOLD * 2.8, SCROLL_THRESHOLD * 4.0], 
    [1, 1, 0.3, 0]
  );
  
  // Testing: Start at 200% + 4x duration for height  
  const heroHeight = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD * 1.0, SCROLL_THRESHOLD * 2.6, SCROLL_THRESHOLD * 4.2], 
    ['100vh', '100vh', '20vh', '0vh']
  );
  
  // Testing: Start at 200% + 4x duration for scale
  const heroScale = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD * 1.4, SCROLL_THRESHOLD * 3.4], 
    [1, 0.95, 0.85]
  );

  // Testing: Extended rotation to match new timeline
  const heroRotation = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD * 3.4],
    [0, -2]
  );

  // Mobile-optimized spring configurations
  const mobileSpringConfig = useMemo(() => ({
    opacity: {
      stiffness: isMobile ? 250 : 300,
      damping: isMobile ? 35 : 30,
      mass: touchVelocity > 1 ? 0.6 : 0.8
    },
    scale: {
      stiffness: isMobile ? 350 : 400,
      damping: isMobile ? 45 : 40,
      mass: touchVelocity > 1 ? 0.5 : 0.6
    },
    height: {
      stiffness: isMobile ? 180 : 200,
      damping: isMobile ? 30 : 25,
      mass: touchVelocity > 1 ? 0.8 : 1
    },
    rotation: {
      stiffness: isMobile ? 300 : 350,
      damping: isMobile ? 40 : 35,
      mass: touchVelocity > 1 ? 0.6 : 0.7
    }
  }), [isMobile, touchVelocity]);

  // Spring-based transforms for smoother motion
  const springOpacity = useSpring(heroOpacity, mobileSpringConfig.opacity);
  const springScale = useSpring(heroScale, mobileSpringConfig.scale);
  const springHeight = useSpring(heroHeight, mobileSpringConfig.height);
  const springRotation = useSpring(heroRotation, mobileSpringConfig.rotation);

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

  // Enhanced animation variants for better timing
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
        type: 'spring',
        stiffness: 100,
        damping: 20
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: 10
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8
      },
    },
  };

  return (
    <motion.section 
      className="hero-section relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ 
        opacity: springOpacity,
        scale: springScale,
        rotateX: springRotation,
        height: springHeight,
        minHeight: springHeight,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        pointerEvents: isHeroMode ? 'auto' : 'none',
        // Hardware acceleration
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform, opacity, height'
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Enhanced background elements with parallax */}
      <div className="absolute inset-0 -z-10" style={{ transform: 'translate3d(0, 0, 0)' }}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-ctp-base to-ctp-mantle" 
          style={{
            scale: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [1, 1.1])
          }}
        />
        
        {/* Parallax floating orbs with enhanced motion */}
        <motion.div 
          className="floating-orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-ctp-pink/20 to-ctp-mauve/20 filter blur-3xl"
          style={{
            y: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [0, -50]),
            scale: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [1, 0.8]),
            opacity: useTransform(scrollY, [0, SCROLL_THRESHOLD * 3.2], [1, 0])
          }}
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="floating-orb absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-ctp-blue/20 to-ctp-sapphire/20 filter blur-3xl"
          style={{
            y: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [0, 30]),
            scale: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [1, 1.2]),
            opacity: useTransform(scrollY, [0, SCROLL_THRESHOLD * 3.2], [1, 0])
          }}
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="floating-orb absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-ctp-green/20 to-ctp-teal/20 filter blur-3xl"
          style={{
            y: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [0, -20]),
            scale: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [1, 0.9]),
            opacity: useTransform(scrollY, [0, SCROLL_THRESHOLD * 3.2], [1, 0])
          }}
          animate={{ 
            y: [0, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Enhanced grid pattern with parallax */}
      <motion.div 
        className="grid-pattern absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(138, 173, 244, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 173, 244, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
          y: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.0], [0, 100]),
          opacity: useTransform(scrollY, [0, SCROLL_THRESHOLD * 2.4], [1, 0])
        }}
      />

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
