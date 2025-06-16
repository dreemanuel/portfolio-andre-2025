import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FiFilter, FiGrid, FiSearch } from 'react-icons/fi';
import ProjectTile from './ProjectTile';
import ProjectDetailsModal from './ProjectDetailsModal';
import projects from '../data/projects';
// Removed navigation context - keeping showcase section simple for now

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  
  // Refs for scroll tracking
  const sectionRef = useRef(null);
  const fullHeaderRef = useRef(null);
  const projectGridRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Track when showcase becomes sticky and start transitions from there
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showcaseStickyPosition, setShowcaseStickyPosition] = useState(0);
  
  // Calculate dynamic scroll start position
  useEffect(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      setShowcaseStickyPosition(sectionTop);
    }
  }, []);
  
  // Create smooth transform values - Start transitions AFTER showcase becomes sticky
  const fullHeaderOpacity = useTransform(
    scrollY, 
    [showcaseStickyPosition, showcaseStickyPosition + 200, showcaseStickyPosition + 400], 
    [1, 0.5, 0.2]
  );
  const fullHeaderScale = useTransform(
    scrollY, 
    [showcaseStickyPosition, showcaseStickyPosition + 200, showcaseStickyPosition + 400], 
    [1, 0.92, 0.85]
  );
  
  // Simple boolean state for collapsed header
  useEffect(() => {
    const handleScroll = () => {
      if (fullHeaderRef.current) {
        const headerRect = fullHeaderRef.current.getBoundingClientRect();
        const shouldTransition = headerRect.bottom <= 100;
        if (shouldTransition !== isTransitioning) {
          setIsTransitioning(shouldTransition);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning]);

  const collapsedHeaderOpacity = isTransitioning ? 1 : 0;
  const collapsedHeaderY = isTransitioning ? 0 : -50;

  // Spring-based transforms for smooth motion - Much faster for compact showcase header
  const springFullOpacity = useSpring(fullHeaderOpacity, {
    stiffness: 600,
    damping: 50,
    mass: 0.4
  });
  
  const springFullScale = useSpring(fullHeaderScale, {
    stiffness: 700,
    damping: 55,
    mass: 0.3
  });
  
  const springCollapsedOpacity = useSpring(collapsedHeaderOpacity, {
    stiffness: 300,
    damping: 30,
    mass: 0.8
  });
  
  const springCollapsedY = useSpring(collapsedHeaderY, {
    stiffness: 350,
    damping: 35,
    mass: 0.7
  });
  

  // Get unique industries for filtering
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(projects.map(project => project.industry))];
    return ['all', 'featured', ...uniqueIndustries];
  }, []);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply industry filter
    if (filterBy === 'featured') {
      filtered = filtered.filter(project => project.featured);
    } else if (filterBy !== 'all') {
      filtered = filtered.filter(project => project.industry === filterBy);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [filterBy, searchTerm]);

  // Handle opening modal
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-ctp-base to-ctp-mantle">
      
      {/* Full Header - Scales and fades on scroll */}
      <motion.div 
        ref={fullHeaderRef} 
        className="relative mt-[40px]"
        style={{
          opacity: springFullOpacity,
          scale: springFullScale,
          transformOrigin: 'center top'
        }}
      >
        <div className="bg-ctp-base/95 border-b border-ctp-surface2/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              variants={headerVariants}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-ctp-text mb-4">
                Featured{' '}
                <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-base text-ctp-subtext0 max-w-2xl mx-auto leading-relaxed">
                Explore my latest work showcasing cutting-edge web technologies and innovative design patterns.
              </p>
            </motion.div>

            {/* Controls */}
            <motion.div
              variants={controlsVariants}
              initial="hidden"
              animate="show"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ctp-subtext0 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-xl text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-200"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-4">
                  <FiFilter className="text-ctp-subtext0 w-4 h-4" />
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => setFilterBy(industry)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filterBy === industry
                            ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 text-ctp-text'
                            : 'bg-ctp-surface0/50 border border-ctp-surface2/30 text-ctp-subtext1 hover:text-ctp-text hover:border-ctp-surface2/50'
                        }`}
                      >
                        {industry === 'all' ? 'All Projects' : 
                         industry === 'featured' ? 'Featured' : 
                         industry}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="mt-4 flex items-center justify-between text-sm text-ctp-subtext0">
                <div className="flex items-center gap-2">
                  <FiGrid className="w-4 h-4" />
                  <span>
                    Showing {filteredProjects.length} of {projects.length} projects
                    {searchTerm && ` for "${searchTerm}"`}
                    {filterBy !== 'all' && ` in ${filterBy === 'featured' ? 'Featured' : filterBy}`}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Collapsed Sticky Header - Fades in as full header fades out */}
      <motion.div 
        className="fixed top-[32px] left-0 right-0 z-40 bg-ctp-base/95 backdrop-blur-md border-b border-ctp-surface2/30"
        style={{
          opacity: isTransitioning ? 1 : 0, // Direct boolean control instead of spring
          pointerEvents: isTransitioning ? 'auto' : 'none'
        }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            
            {/* Collapsed Title - aligned with navbar brand */}
            <h3 className="text-xl font-heading font-bold text-ctp-text flex-shrink-0">
              Featured{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                Projects
              </span>
            </h3>

            {/* Search and Filters Row */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              
              {/* Compact Search Bar */}
              <div className="relative w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ctp-subtext0 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-ctp-surface0/50 border border-ctp-surface2/30 rounded-lg text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-200"
                />
              </div>

              {/* Compact Filter Buttons */}
              <div className="flex items-center gap-2">
                {industries.slice(0, 4).map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setFilterBy(industry)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                      filterBy === industry
                        ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 text-ctp-text'
                        : 'bg-ctp-surface0/50 border border-ctp-surface2/30 text-ctp-subtext1 hover:text-ctp-text hover:border-ctp-surface2/50'
                    }`}
                  >
                    {industry === 'all' ? 'All' : 
                     industry === 'featured' ? 'Featured' : 
                     industry}
                  </button>
                ))}
                
                {/* More filters dropdown if needed */}
                {industries.length > 4 && (
                  <button className="px-3 py-2 rounded-md text-xs font-medium bg-ctp-surface0/50 border border-ctp-surface2/30 text-ctp-subtext1 hover:text-ctp-text hover:border-ctp-surface2/50 transition-all duration-200">
                    +{industries.length - 4}
                  </button>
                )}
              </div>

              {/* Results count */}
              <span className="text-xs text-ctp-subtext0 flex-shrink-0">
                {filteredProjects.length}/{projects.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Project Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-7xl">

          {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            ref={projectGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="h-fit"
              >
                <ProjectTile
                  project={project}
                  onOpenModal={handleOpenModal}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* No Results State */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 rounded-full flex items-center justify-center">
              <FiSearch className="w-8 h-8 text-ctp-subtext0" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-ctp-text mb-2">
              No Projects Found
            </h3>
            <p className="text-ctp-subtext0 mb-6">
              {searchTerm 
                ? `No projects match "${searchTerm}". Try adjusting your search terms.`
                : `No projects found in the ${filterBy} category.`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 rounded-lg hover:from-neon-cyan/30 hover:to-neon-green/30 transition-all duration-200 text-ctp-text font-medium"
            >
              Show All Projects
            </button>
          </motion.div>
        )}

        {/* Featured Projects Badge */}
        {filterBy === 'all' && !searchTerm && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0/30 border border-ctp-surface2/30 rounded-full">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span className="text-ctp-subtext1 text-sm">
                P {projects.filter(p => p.featured).length} Featured Projects Available
              </span>
            </div>
          </motion.div>
        )}
        
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ProjectShowcase;