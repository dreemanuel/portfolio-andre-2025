import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiCode, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  // Social links
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/username' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/username' },
    { icon: <FiMail />, url: 'mailto:your.email@example.com' },
  ];

  // Mobile menu variants for framer-motion
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-ctp-base/80 backdrop-blur-md shadow-lg' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-ctp-text hover:text-ctp-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiCode className="text-2xl text-ctp-blue" />
            <span className="text-xl font-bold font-mono">AE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-ctp-blue' 
                    : 'text-ctp-text hover:text-ctp-blue/80'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-ctp-blue to-ctp-sapphire"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-text hover:text-ctp-blue transition-colors"
                  aria-label={social.url.split('/').pop()}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-ctp-text hover:text-ctp-blue transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 pt-20 bg-ctp-base/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="container mx-auto px-6 py-8"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.ul className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <motion.li key={link.path} variants={navItemVariants}>
                    <Link
                      to={link.path}
                      className={`block text-2xl font-medium px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === link.path
                          ? 'bg-ctp-surface0 text-ctp-blue'
                          : 'text-ctp-text hover:bg-ctp-surface0/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* Mobile Social Links */}
              <motion.div 
                className="flex justify-center space-x-6 mt-12"
                variants={navItemVariants}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-2xl text-ctp-text hover:text-ctp-blue transition-colors"
                    aria-label={social.url.split('/').pop()}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
