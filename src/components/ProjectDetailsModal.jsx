import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FiX, 
  FiExternalLink, 
  FiGithub, 
  FiCalendar, 
  FiTag, 
  FiChevronLeft, 
  FiChevronRight,
  FiMaximize2 
} from 'react-icons/fi';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsImageEnlarged(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isImageEnlarged) {
          setIsImageEnlarged(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isImageEnlarged, onClose]);

  if (!project) return null;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  // Navigate gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % project.screenshots.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + project.screenshots.length) % project.screenshots.length
    );
  };

  // Animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(10px)',
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const enlargedImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ctp-base/80 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => {
              if (e.target === e.currentTarget && !isImageEnlarged) {
                onClose();
              }
            }}
          >
            {/* Modal Container */}
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] bg-ctp-base border border-ctp-surface2/30 rounded-2xl overflow-hidden shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(48, 52, 70, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-ctp-surface2/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-heading font-bold text-ctp-text">
                        {project.title}
                      </h2>
                      {project.featured && (
                        <span className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/30 rounded-full text-neon-cyan text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-ctp-subtext0">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>{formatDate(project.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiTag className="w-4 h-4" />
                        <span>{project.industry}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg border border-ctp-surface2/30 bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6 space-y-6">
                  
                  {/* Image Gallery */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-ctp-text">
                        Gallery
                      </h3>
                      
                      {/* Main Image */}
                      <div className="relative group">
                        <div className="relative aspect-video bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 rounded-xl overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentImageIndex}
                              className="absolute inset-0 bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 flex items-center justify-center"
                              variants={imageVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <div className="text-ctp-text/60 text-center">
                                <div className="text-lg font-medium mb-2">
                                  {project.screenshots[currentImageIndex].split('/').pop().replace('.webp', '')}
                                </div>
                                <div className="text-sm">
                                  Screenshot {currentImageIndex + 1} of {project.screenshots.length}
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                          
                          {/* Enlarge button */}
                          <button
                            onClick={() => setIsImageEnlarged(true)}
                            className="absolute top-4 right-4 p-2 bg-ctp-base/80 border border-ctp-surface2/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-ctp-text hover:bg-ctp-base"
                          >
                            <FiMaximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Navigation arrows */}
                        {project.screenshots.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-ctp-base/80 border border-ctp-surface2/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-ctp-text hover:bg-ctp-base"
                            >
                              <FiChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-ctp-base/80 border border-ctp-surface2/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-ctp-text hover:bg-ctp-base"
                            >
                              <FiChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Strip */}
                      {project.screenshots.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {project.screenshots.map((screenshot, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-12 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                                index === currentImageIndex
                                  ? 'border-neon-cyan shadow-neon-sm'
                                  : 'border-ctp-surface2/30 hover:border-ctp-surface2/50'
                              }`}
                            >
                              <div className="w-full h-full bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 flex items-center justify-center">
                                <div className="text-xs text-ctp-subtext0">
                                  {index + 1}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-ctp-text">
                      About This Project
                    </h3>
                    <p className="text-ctp-subtext0 leading-relaxed">
                      {project.detailedDescription || project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-ctp-text">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg text-ctp-subtext1 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-ctp-text">
                      Project Links
                    </h3>
                    <div className="flex gap-4">
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 rounded-lg hover:from-neon-cyan/30 hover:to-neon-green/30 transition-all duration-200 text-ctp-text font-medium"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg hover:bg-ctp-surface1/50 transition-all duration-200 text-ctp-subtext1 hover:text-ctp-text font-medium"
                        >
                          <FiGithub className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enlarged Image Overlay */}
          <AnimatePresence>
            {isImageEnlarged && (
              <motion.div
                className="fixed inset-0 bg-ctp-base/95 z-60 flex items-center justify-center p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsImageEnlarged(false)}
              >
                <motion.div
                  className="relative max-w-[95vw] max-h-[95vh]"
                  variants={enlargedImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 rounded-xl p-8 aspect-video flex items-center justify-center">
                    <div className="text-ctp-text text-center">
                      <div className="text-xl font-medium mb-2">
                        {project.screenshots[currentImageIndex].split('/').pop().replace('.webp', '')}
                      </div>
                      <div className="text-sm text-ctp-subtext0">
                        Enlarged view - Screenshot {currentImageIndex + 1} of {project.screenshots.length}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsImageEnlarged(false)}
                    className="absolute top-4 right-4 p-2 bg-ctp-base/80 border border-ctp-surface2/30 rounded-lg text-ctp-text hover:bg-ctp-base"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;