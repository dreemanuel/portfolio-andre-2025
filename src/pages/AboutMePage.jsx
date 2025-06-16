import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { 
  FiCode, 
  FiServer, 
  FiDatabase, 
  FiMonitor,
  FiCoffee,
  FiMusic,
  FiGlobe,
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiZap
} from "react-icons/fi";

const AboutMePage = () => {
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <SEO
        title="About Me"
        description="Learn about Andre Emanuel's journey from F&B management to full-stack development. 14+ years of experience transitioning into modern web technologies from Bali, Indonesia."
        keywords="Andre Emanuel, about, career transition, F&B management, full-stack developer, Bali developer, professional background"
      />
      <motion.div
        className="min-h-screen bg-ctp-base text-ctp-text"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
    >
      {/* Navigation spacer */}
      <div className="h-20"></div>
      
      {/* Page Container */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Andre Emanuel
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-ctp-subtext0 mb-6">
            Full-Stack Developer & Creative Problem Solver
          </h2>
          <p className="text-lg text-ctp-subtext1 mb-8">
            📍 Based in Bali, Indonesia
          </p>
          <motion.div 
            className="inline-block p-4 rounded-lg bg-ctp-surface0/30 border border-ctp-surface2/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-neon-cyan font-medium text-lg italic">
              "Let's make it happen!"
            </p>
          </motion.div>
        </motion.section>

        {/* Professional Overview */}
        <motion.section 
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Bridging{' '}
                <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                  Creativity & Technology
                </span>
              </h2>
              <p className="text-lg text-ctp-subtext0 mb-6 leading-relaxed">
                I'm a full-stack developer who discovered that the best solutions come from understanding both technical requirements and human needs. After 14+ years managing high-pressure restaurant operations in Jakarta and Bali, I made a strategic pivot to technology—returning to my roots as an art school graduate with a lifelong passion for building things that matter.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-ctp-text">
                  <FiTarget className="text-neon-cyan" />
                  <span className="text-sm">Art school graduate</span>
                </div>
                <div className="flex items-center gap-2 text-ctp-text">
                  <FiTrendingUp className="text-neon-green" />
                  <span className="text-sm">Operations manager</span>
                </div>
                <div className="flex items-center gap-2 text-ctp-text">
                  <FiCode className="text-neon-cyan" />
                  <span className="text-sm">Full-stack developer</span>
                </div>
                <div className="flex items-center gap-2 text-ctp-text">
                  <FiGlobe className="text-neon-green" />
                  <span className="text-sm">Global perspective</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(48, 52, 70, 0.9) 0%, rgba(41, 44, 60, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(198, 208, 245, 0.1)'
                }}
              >
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(51, 204, 255, 0.3), rgba(0, 255, 153, 0.3))',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                  }}
                />
                <div className="relative p-8">
                  <h3 className="text-xl font-semibold text-neon-cyan mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-ctp-subtext0">Years in F&B Management</span>
                      <span className="text-neon-green font-semibold">14+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ctp-subtext0">Team Members Led</span>
                      <span className="text-neon-green font-semibold">25+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ctp-subtext0">Restaurant Locations</span>
                      <span className="text-neon-green font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ctp-subtext0">Daily Orders Managed</span>
                      <span className="text-neon-green font-semibold">500+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technical Skills */}
        <motion.section 
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            My{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Development */}
            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20"
              variants={skillVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <FiCode className="text-3xl text-neon-cyan mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-3">Frontend</h3>
              <ul className="text-sm text-ctp-subtext0 space-y-1">
                <li>React, Next.js</li>
                <li>JavaScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </motion.div>

            {/* Backend */}
            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20"
              variants={skillVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <FiServer className="text-3xl text-neon-green mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-3">Backend</h3>
              <ul className="text-sm text-ctp-subtext0 space-y-1">
                <li>Node.js, Python</li>
                <li>Django</li>
                <li>Docker</li>
              </ul>
            </motion.div>

            {/* Database */}
            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20"
              variants={skillVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <FiDatabase className="text-3xl text-neon-cyan mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-3">Database</h3>
              <ul className="text-sm text-ctp-subtext0 space-y-1">
                <li>PostgreSQL</li>
                <li>MySQL, Redis</li>
                <li>Git, GitHub</li>
              </ul>
            </motion.div>

            {/* Systems */}
            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20"
              variants={skillVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <FiMonitor className="text-3xl text-neon-green mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-3">Systems</h3>
              <ul className="text-sm text-ctp-subtext0 space-y-1">
                <li>Arch Linux</li>
                <li>Hyprland, Neovim</li>
                <li>Home Lab Setup</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Career Journey */}
        <motion.section 
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            From Restaurant Floors to{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Code Repositories
            </span>
          </h2>
          
          <div className="space-y-8">
            {/* F&B Years */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-neon-cyan mb-3">The F&B Years (2008-2017)</h3>
                <p className="text-ctp-subtext0 mb-4 leading-relaxed">
                  Led teams of 25+ staff across multiple high-volume restaurant locations in Bali's tourism hub. Managed everything from daily operations to system implementations, helping expand Smokehouse Texas BBQ from 1 to 3 locations in just one year.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-sm">Team Leadership</span>
                  <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-sm">Operations Management</span>
                  <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-sm">System Implementation</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-neon-cyan/20">
                  <FiUsers className="text-4xl text-neon-cyan" />
                </div>
              </div>
            </div>

            {/* Transition */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center lg:order-1">
                <div className="p-4 rounded-full bg-neon-green/20">
                  <FiHeart className="text-4xl text-neon-green" />
                </div>
              </div>
              <div className="lg:col-span-2 lg:order-2">
                <h3 className="text-xl font-semibold text-neon-green mb-3">The Transition (2017-Present)</h3>
                <p className="text-ctp-subtext0 mb-4 leading-relaxed">
                  Becoming a father changed my priorities. I needed work that offered both creative fulfillment and family time. Technology wasn't new to me—I'd always been the guy tinkering with computers, building home labs, and solving technical problems. The transition was really a homecoming.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm">Family Focus</span>
                  <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm">Self-taught Developer</span>
                  <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm">Home Lab Builder</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Personal Interests */}
        <motion.section 
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Beyond{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              the Code
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20 text-center"
              variants={skillVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <FiZap className="text-3xl text-neon-cyan mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-2">Tech Enthusiast</h3>
              <p className="text-sm text-ctp-subtext0">
                Home lab, cybersecurity, and always learning the latest technologies
              </p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20 text-center"
              variants={skillVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <FiMusic className="text-3xl text-neon-green mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-2">Music & Making</h3>
              <p className="text-sm text-ctp-subtext0">
                Multi-instrumentalist with home studio setup and creative projects
              </p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20 text-center"
              variants={skillVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <FiGlobe className="text-3xl text-neon-cyan mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-2">Languages & Culture</h3>
              <p className="text-sm text-ctp-subtext0">
                English & Indonesian native, learning Spanish, multicultural perspective
              </p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-xl bg-ctp-surface0/30 border border-ctp-surface2/20 text-center"
              variants={skillVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <FiCoffee className="text-3xl text-neon-green mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ctp-text mb-2">BBQ & Balance</h3>
              <p className="text-sm text-ctp-subtext0">
                Pitmaster skills, island life balance, and family-first priorities
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div 
            className="relative rounded-2xl overflow-hidden p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(48, 52, 70, 0.9) 0%, rgba(41, 44, 60, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(198, 208, 245, 0.1)'
            }}
          >
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(51, 204, 255, 0.3), rgba(0, 255, 153, 0.3))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1px'
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                  Amazing
                </span>
              </h2>
              <p className="text-lg text-ctp-subtext0 mb-8 max-w-3xl mx-auto leading-relaxed">
                Ready to turn your vision into reality? I bring the creative instincts of a designer, the technical skills of a developer, and the operational mindset of someone who's managed complex systems under pressure.
              </p>
              <p className="text-xl text-neon-cyan font-medium italic mb-8">
                Because, as I always say: "Let's make it happen!"
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-green text-ctp-base font-semibold rounded-lg text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(51, 204, 255, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start a Project</span>
                <FiZap className="text-xl" />
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
    </>
  );
};

export default AboutMePage;
