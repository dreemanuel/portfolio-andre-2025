import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import GlobalWavesBackground from './components/GlobalWavesBackground';

// Pages
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './index.css';

// Navigation Context for coordinating Hero-Navbar transitions
const NavigationContext = createContext();

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
};

// Navigation Provider Component
const NavigationProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navigationMode, setNavigationMode] = useState('hero'); // 'hero' | 'navbar'
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const { scrollY } = useScroll();
  
  // Responsive scroll thresholds based on device type
  const getScrollThreshold = () => {
    if (viewportWidth < 768) return 150; // Mobile: more scroll before transition
    if (viewportWidth < 1024) return 125; // Tablet: intermediate threshold
    return 100; // Desktop: current threshold maintained
  };
  
  const SCROLL_THRESHOLD = getScrollThreshold();
  
  // Transform values for smooth transitions
  const heroOpacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [1, 0]);
  const heroScale = useTransform(scrollY, [0, SCROLL_THRESHOLD], [1, 0.95]);
  const navbarOpacity = useTransform(scrollY, [SCROLL_THRESHOLD - 50, SCROLL_THRESHOLD], [0, 1]);
  
  // Viewport width detection for responsive thresholds
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateViewportWidth, { passive: true });
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  // Scroll detection and direction tracking with hysteresis
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      // Add hysteresis to prevent flickering - different thresholds for up/down
      const thresholdUp = SCROLL_THRESHOLD - 20; // 20px hysteresis
      const thresholdDown = SCROLL_THRESHOLD + 10; // 10px hysteresis
      
      // Update navigation mode based on scroll position and direction with hysteresis
      if (currentScrollY > thresholdDown && navigationMode === 'hero') {
        setNavigationMode('navbar');
      } else if (currentScrollY < thresholdUp && navigationMode === 'navbar') {
        setNavigationMode('hero');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY, navigationMode, SCROLL_THRESHOLD]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMenuOpen && window.scrollY > 50) {
      setIsMenuOpen(false);
    }
  }, [scrollY, isMenuOpen]);

  const navigationContextValue = {
    // State
    isMenuOpen,
    setIsMenuOpen,
    navigationMode,
    scrollDirection,
    viewportWidth,
    
    // Transform values
    heroOpacity,
    heroScale,
    navbarOpacity,
    
    // Constants
    SCROLL_THRESHOLD,
    
    // Utilities
    isHeroMode: navigationMode === 'hero',
    isNavbarMode: navigationMode === 'navbar',
    isMobile: viewportWidth < 768,
    isTablet: viewportWidth >= 768 && viewportWidth < 1024,
    isDesktop: viewportWidth >= 1024,
  };

  return (
    <NavigationContext.Provider value={navigationContextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ctp-base to-ctp-mantle opacity-90">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>
      {/* Animated particles or other effects can be added here */}
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main app content
const AppContent = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App component
const App = () => {
  console.log('App component rendering');
  console.log('React version:', React.version);
  console.log('Current location:', window.location.href);
  
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-ctp-base text-ctp-text">
        <style jsx global>{`
          :root {
            --ctp-base: #303446;
            --ctp-text: #c6d0f5;
          }
          body {
            background-color: var(--ctp-base);
            color: var(--ctp-text);
            margin: 0;
            padding: 0;
            min-height: 100vh;
          }
        `}</style>
        <GlobalWavesBackground />
        <AnimatedBackground />
        <Router>
          <NavigationProvider>
            <Navbar />
            <ScrollToTop />
            <AppContent />
            <Footer />
          </NavigationProvider>
        </Router>
      </div>
    </HelmetProvider>
  );
};

export default App;
