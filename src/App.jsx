import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// Pages
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './index.css';

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
  return (
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
      <AnimatedBackground />
      <Router>
        <Navbar />
        <ScrollToTop />
        <AppContent />
      </Router>
    </div>
  );
};

export default App;
