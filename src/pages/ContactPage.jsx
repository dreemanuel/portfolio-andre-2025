import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const pageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-ctp-base text-ctp-text"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Navigation spacer to account for sticky navbar */}
      <div className="h-20"></div>
      
      {/* Page Container */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-ctp-subtext0 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and creative solutions.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ContactForm />
        </motion.div>

        {/* Additional Contact Information */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 bg-ctp-surface0/30 rounded-lg border border-ctp-surface2/20">
              <h3 className="text-lg font-semibold text-neon-cyan mb-2">Response Time</h3>
              <p className="text-ctp-subtext0">Usually within 24 hours</p>
            </div>
            <div className="p-6 bg-ctp-surface0/30 rounded-lg border border-ctp-surface2/20">
              <h3 className="text-lg font-semibold text-neon-green mb-2">Project Types</h3>
              <p className="text-ctp-subtext0">Web apps, APIs, consulting</p>
            </div>
            <div className="p-6 bg-ctp-surface0/30 rounded-lg border border-ctp-surface2/20">
              <h3 className="text-lg font-semibold text-neon-cyan mb-2">Availability</h3>
              <p className="text-ctp-subtext0">Open for new projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
