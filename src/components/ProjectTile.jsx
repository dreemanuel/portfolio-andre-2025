import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiGithub, FiCalendar, FiTag } from 'react-icons/fi';
import LazyImage from './LazyImage';

const ProjectTile = ({ project, onOpenModal, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Animation variants
  const tileVariants = {
    initial: {
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    hover: {
      opacity: 1,
      backdropFilter: 'blur(10px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const contentVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      variants={tileVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Project Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ctp-surface0 to-ctp-surface1">
        {/* Use LazyImage for project thumbnail with fallback */}
        <LazyImage
          src={project.heroImage || `/images/projects/${project.id}/thumbnail.webp`}
          alt={`${project.title} - Project Screenshot`}
          className="absolute inset-0"
          placeholder={
            <div className="absolute inset-0 bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 flex items-center justify-center">
              <div className="text-ctp-text/60 text-sm font-mono">
                {project.title}
              </div>
            </div>
          }
          onError={() => {
            // Fallback to placeholder if image fails to load
            console.warn(`Failed to load image for project: ${project.title}`);
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ctp-base/80 via-transparent to-transparent" />
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-neon-cyan/20 backdrop-blur-sm rounded-full border border-neon-cyan/30">
            <span className="text-neon-cyan text-xs font-medium">Featured</span>
          </div>
        )}
      </div>

      {/* Hover Overlay with Glassmorphism */}
      <motion.div
        className="absolute inset-0 bg-ctp-base/30 border border-neon-cyan/30"
        variants={overlayVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        style={{
          backdropFilter: isHovered ? 'blur(10px)' : 'blur(0px)',
        }}
      >
        {/* Content that appears on hover */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-between"
          variants={contentVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
        >
          {/* Top section */}
          <div>
            <h3 className="text-ctp-text font-heading text-xl font-semibold mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-ctp-subtext0 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Middle section - Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-md text-ctp-subtext1"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-md text-ctp-subtext1">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Bottom section - Meta info and actions */}
          <div className="space-y-3">
            {/* Date and Industry */}
            <div className="flex items-center justify-between text-xs text-ctp-subtext0">
              <div className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                <span>{formatDate(project.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiTag className="w-3 h-3" />
                <span>{project.industry}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 rounded-lg hover:from-neon-cyan/30 hover:to-neon-green/30 transition-all duration-200 text-ctp-text text-sm font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
              >
                View Details
              </button>
              
              {project.websiteUrl && (
                <button
                  className="p-2 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg hover:bg-ctp-surface1/50 transition-all duration-200 text-ctp-subtext1 hover:text-ctp-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.websiteUrl, '_blank');
                  }}
                  title="Visit Website"
                >
                  <FiExternalLink className="w-4 h-4" />
                </button>
              )}
              
              {project.githubUrl && (
                <button
                  className="p-2 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg hover:bg-ctp-surface1/50 transition-all duration-200 text-ctp-subtext1 hover:text-ctp-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                  title="View Code"
                >
                  <FiGithub className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Neon glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: isHovered 
            ? '0 0 20px rgba(51, 204, 255, 0.3), 0 0 40px rgba(51, 204, 255, 0.1)' 
            : 'none',
        }}
      />
    </motion.div>
  );
};

export default ProjectTile;