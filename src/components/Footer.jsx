import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiMapPin, 
  FiCalendar,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiArrowUp,
  FiHome,
  FiUser,
  FiBriefcase,
  FiMessageSquare
} from 'react-icons/fi';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/andre-emanuel', icon: FiGithub, color: 'hover:text-white' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/andre-emanuel', icon: FiLinkedin, color: 'hover:text-blue-400' },
    { name: 'Instagram', url: 'https://instagram.com/andre.emanuel', icon: FiInstagram, color: 'hover:text-pink-400' },
    { name: 'X', url: 'https://x.com/andre_emanuel', icon: FiTwitter, color: 'hover:text-blue-400' }
  ];

  // Navigation links
  const navigationLinks = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Projects', href: '/#projects', icon: FiBriefcase },
    { name: 'About Me', href: '/about', icon: FiUser },
    { name: 'Contact', href: '/contact', icon: FiMessageSquare }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="relative bg-ctp-base/80 backdrop-blur-md border-t border-ctp-surface2/30 mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-ctp-base via-ctp-base/50 to-transparent pointer-events-none" />
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Branding Section */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            variants={itemVariants}
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-heading font-bold text-ctp-text">
                Andre Emanuel
              </h3>
              <p className="text-neon-cyan font-medium">
                Full-Stack Developer & Creative Problem Solver
              </p>
              <p className="text-ctp-subtext0 text-sm leading-relaxed">
                Crafting digital experiences with cutting-edge web technologies. 
                Passionate about innovation and creating solutions that make a difference.
              </p>
            </div>
            
            {/* Availability status */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neon-green/10 border border-neon-green/30 rounded-lg">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-neon-green text-sm font-medium">Available for new projects</span>
            </div>
          </motion.div>

          {/* Navigation Section */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            variants={itemVariants}
          >
            <h4 className="text-lg font-heading font-semibold text-ctp-text mb-4">
              Site Navigation
            </h4>
            <nav className="space-y-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 text-ctp-subtext0 hover:text-neon-cyan transition-colors duration-200 group"
                >
                  <link.icon className="w-4 h-4 group-hover:text-neon-cyan transition-colors duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            variants={itemVariants}
          >
            <h4 className="text-lg font-heading font-semibold text-ctp-text mb-4">
              Contact Info
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:andre@example.com?subject=Portfolio Inquiry"
                className="flex items-center gap-3 text-ctp-subtext0 hover:text-neon-cyan transition-colors duration-200 group"
              >
                <FiMail className="w-4 h-4 group-hover:text-neon-cyan transition-colors duration-200" />
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  andre@example.com
                </span>
              </a>
              
              <div className="flex items-center gap-3 text-ctp-subtext0">
                <FiMapPin className="w-4 h-4" />
                <span>Bali, Indonesia</span>
              </div>
              
              <div className="flex items-center gap-3 text-ctp-subtext0">
                <FiCalendar className="w-4 h-4" />
                <span>GMT+8 (WITA)</span>
              </div>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            variants={itemVariants}
          >
            <h4 className="text-lg font-heading font-semibold text-ctp-text mb-4">
              Connect With Me
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg hover:bg-ctp-surface1/50 text-ctp-subtext1 ${social.color} transition-all duration-200 group`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Connect on ${social.name}`}
                >
                  <social.icon className="w-5 h-5 group-hover:drop-shadow-glow transition-all duration-200" />
                </motion.a>
              ))}
            </div>
            
            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 rounded-lg hover:from-neon-cyan/30 hover:to-neon-green/30 transition-all duration-200 text-ctp-text text-sm font-medium mt-6"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiArrowUp className="w-4 h-4" />
              Back to Top
            </motion.button>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="my-12 h-px bg-gradient-to-r from-transparent via-ctp-surface2/30 to-transparent"
          variants={itemVariants}
        />

        {/* Bottom section - Copyright and credits */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ctp-subtext0"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Andre Emanuel. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <p>Built with React + Vite</p>
            <span className="text-ctp-surface2">•</span>
            <p>Styled with Tailwind CSS</p>
            <span className="text-ctp-surface2">•</span>
            <p className="text-neon-cyan">Powered by passion ⚡</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
    </motion.footer>
  );
};

export default Footer;