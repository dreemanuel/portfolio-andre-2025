import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiCode, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useNavigationContext } from '../App';

const Navbar = () => {
  const location = useLocation();
  const { 
    isMenuOpen, 
    setIsMenuOpen, 
    navbarOpacity, 
    isNavbarMode 
  } = useNavigationContext();

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
      {/* Dynamic Navbar - Only visible in navbar mode */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          opacity: navbarOpacity,
          pointerEvents: isNavbarMode ? 'auto' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ 
          y: isNavbarMode ? 0 : -100,
          backdropFilter: isNavbarMode ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 250, 
          damping: 35,
          duration: 0.8 
        }}
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-ctp-base/80 border-b border-ctp-surface2/30" />
        
        {/* Navbar content */}
        <div className="relative container mx-auto px-6 flex justify-between items-center">
          {/* Logo - Transforms from Hero */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isNavbarMode ? 1 : 0,
              x: isNavbarMode ? 0 : -20 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 250, 
              damping: 30,
              delay: isNavbarMode ? 0.15 : 0,
              duration: 0.8
            }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-ctp-text hover:text-ctp-blue transition-colors group"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiCode className="text-2xl text-ctp-blue group-hover:text-neon-cyan transition-colors" />
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-ctp-text to-ctp-blue bg-clip-text text-transparent">
                Andre Emanuel
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Cascading animation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isNavbarMode ? 1 : 0 }}
            transition={{ 
              delay: isNavbarMode ? 0.25 : 0,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isNavbarMode ? 1 : 0,
                  y: isNavbarMode ? 0 : -10 
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 250,
                  damping: 30,
                  delay: isNavbarMode ? 0.35 + (index * 0.15) : 0,
                  duration: 0.8
                }}
              >
                <Link
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-neon-cyan ${
                    location.pathname === link.path 
                      ? 'text-ctp-blue' 
                      : 'text-ctp-text'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-neon-cyan to-neon-green"
                      initial={false}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Social Icons */}
            <motion.div 
              className="flex items-center space-x-4 ml-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isNavbarMode ? 1 : 0,
                x: isNavbarMode ? 0 : 20 
              }}
              transition={{ 
                type: 'spring',
                stiffness: 250,
                damping: 30,
                delay: isNavbarMode ? 0.85 : 0,
                duration: 0.8
              }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-text hover:text-neon-cyan transition-colors p-2 rounded-lg hover:bg-ctp-surface0/30"
                  aria-label={social.url.split('/').pop()}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-ctp-text hover:text-neon-cyan transition-colors p-2 rounded-lg hover:bg-ctp-surface0/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isNavbarMode ? 1 : 0,
              scale: isNavbarMode ? 1 : 0.8
            }}
            transition={{ 
              type: 'spring',
              stiffness: 250,
              damping: 30,
              delay: isNavbarMode ? 0.4 : 0,
              duration: 0.8
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Only visible in navbar mode */}
      <AnimatePresence>
        {isMenuOpen && isNavbarMode && (
          <motion.div 
            className="fixed inset-0 z-40 pt-20 bg-ctp-base/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              type: 'spring',
              stiffness: 250,
              damping: 35,
              duration: 0.5 
            }}
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
