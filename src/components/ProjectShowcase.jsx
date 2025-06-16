import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useMemo, useRef } from 'react';
import { FiFilter, FiGrid, FiSearch } from 'react-icons/fi';
import ProjectTile from './ProjectTile';
import ProjectDetailsModal from './ProjectDetailsModal';
import projects from '../data/projects';
import { useNavigationContext } from '../App';

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Navigation context and scroll tracking
  const { isNavbarMode, SCROLL_THRESHOLD } = useNavigationContext();
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Smooth sticky transition behavior
  const bufferDistance = 300; // Extra scroll distance before content starts moving
  const stickyThreshold = SCROLL_THRESHOLD + bufferDistance;
  
  // Simplified header movement for debugging
  const headerY = useTransform(
    scrollY,
    [SCROLL_THRESHOLD, stickyThreshold],
    [0, 0] // Keep it simple for now
  );
  
  // Simplified content movement
  const contentY = useTransform(
    scrollY,
    [stickyThreshold, stickyThreshold + 200],
    [0, -200]
  );
  

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
      
      {/* Sticky Header + Controls - smooth transition to sticky position */}
      <motion.div
        className={`${isNavbarMode ? 'fixed' : 'relative'} top-0 left-0 right-0 z-40`}
        style={{
          top: isNavbarMode ? '4rem' : '0', // Position below navbar (navbar height ~4rem)
          y: headerY,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 40,
          duration: 0.6
        }}
      >
        <div className="bg-ctp-base/95 backdrop-blur-md border-b border-ctp-surface2/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              variants={headerVariants}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-ctp-text mb-4">
                Featured{' '}
                <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-base text-ctp-subtext0 max-w-2xl mx-auto leading-relaxed">
                Explore my latest work showcasing cutting-edge web technologies and innovative design patterns.
              </p>
            </motion.div>

            {/* Controls - now part of sticky header */}
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

      {/* Main Content - Project Grid */}
      <motion.div 
        className={`px-4 sm:px-6 lg:px-8 ${isNavbarMode ? 'pt-80' : 'pt-20'} pb-20`}
        style={{ y: contentY }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 35,
          duration: 0.8
        }}
      >
        <div className="container mx-auto max-w-7xl">

          {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
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
      </motion.div>

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