import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaChevronDown } from 'react-icons/fa';

const SocialLinksDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub size={16} />,
      url: 'https://github.com/yourusername',
      color: 'hover:text-ctp-text'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={16} />,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-ctp-blue'
    },
    {
      name: 'Email',
      icon: <FaEnvelope size={16} />,
      url: 'mailto:your.email@example.com',
      color: 'hover:text-ctp-mauve'
    }
  ];

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ctp-subtext1 hover:text-ctp-text transition-colors duration-200 border border-ctp-overlay0/30 rounded-lg hover:bg-ctp-surface1/50"
      >
        <span>Connect with me</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-full origin-top-right rounded-lg bg-ctp-surface0/80 backdrop-blur-sm border border-ctp-overlay0/20 shadow-lg shadow-ctp-base/50 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="py-1">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center px-4 py-2 text-sm text-ctp-subtext1 ${link.color} transition-colors duration-200`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialLinksDropdown;