import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  FiUser, 
  FiMail, 
  FiMessageCircle, 
  FiSend, 
  FiLoader, 
  FiCheckCircle,
  FiAlertCircle 
} from 'react-icons/fi';

// Zod validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
});

const ContactForm = () => {
  const [submissionState, setSubmissionState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isDirty },
    reset 
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  });

  // Form submission handler
  const onSubmit = async (data) => {
    setSubmissionState('loading');
    setSubmitMessage('');

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (response.ok) {
        setSubmissionState('success');
        setSubmitMessage(result.message || 'Thank you! Your message has been sent successfully.');
        reset();
        
        // Auto-reset success state after 5 seconds
        setTimeout(() => {
          setSubmissionState('idle');
          setSubmitMessage('');
        }, 5000);
      } else {
        // Handle specific error cases
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before sending another message.');
        } else if (response.status === 400) {
          throw new Error(result.message || 'Please check your form data and try again.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again in a few minutes.');
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setSubmissionState('error');
        setSubmitMessage('Request timed out. Please check your connection and try again.');
      } else if (error.message.includes('Failed to fetch')) {
        setSubmissionState('error');
        setSubmitMessage('Network error. Please check your connection and try again.');
      } else {
        setSubmissionState('error');
        setSubmitMessage(error.message || 'Something went wrong. Please try again.');
      }
      
      // Auto-reset error state after 10 seconds
      setTimeout(() => {
        setSubmissionState('idle');
        setSubmitMessage('');
      }, 10000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fieldVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Form Container with Glassmorphism */}
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
        style={{
          background: 'linear-gradient(135deg, rgba(48, 52, 70, 0.9) 0%, rgba(41, 44, 60, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(198, 208, 245, 0.1)'
        }}
      >
        {/* Gradient border effect */}
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

        {/* Form Content */}
        <div className="relative p-8 md:p-12">
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ctp-text mb-4">
              Let's Work{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-ctp-subtext0 text-lg leading-relaxed">
              Ready to bring your project to life? Send me a message and let's discuss how we can create something amazing together.
            </p>
          </motion.div>

          {/* Success/Error Messages */}
          {submissionState === 'success' && (
            <motion.div
              className="mb-6 p-6 rounded-lg bg-neon-green/20 border border-neon-green/30 flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 400 }}
              >
                <FiCheckCircle className="text-neon-green text-4xl" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-neon-green font-semibold text-lg mb-2">Message Sent!</h3>
                <p className="text-neon-green/80">{submitMessage}</p>
                <p className="text-neon-green/60 text-sm mt-2">I'll get back to you soon!</p>
              </motion.div>
            </motion.div>
          )}

          {submissionState === 'error' && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-ctp-red/20 border border-ctp-red/30 flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiAlertCircle className="text-ctp-red text-xl flex-shrink-0" />
              <p className="text-ctp-red font-medium">{submitMessage}</p>
            </motion.div>
          )}

          {/* Contact Form */}
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={`space-y-6 transition-opacity duration-300 ${
              submissionState === 'loading' ? 'opacity-60' : 'opacity-100'
            }`}
          >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-ctp-text mb-2">
                <FiUser className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <motion.div variants={fieldVariants} whileFocus="focus" whileBlur="blur">
                <input
                  {...register('name')}
                  type="text"
                  className={`w-full px-4 py-3 bg-ctp-surface0/50 border rounded-lg text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name 
                      ? 'border-ctp-red focus:ring-ctp-red/50 focus:border-ctp-red' 
                      : 'border-ctp-surface2/30 focus:ring-neon-cyan/50 focus:border-neon-cyan'
                  }`}
                  placeholder="Enter your full name"
                  disabled={submissionState === 'loading'}
                />
              </motion.div>
              {errors.name && (
                <motion.p 
                  className="mt-2 text-sm text-ctp-red flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle className="w-3 h-3" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-ctp-text mb-2">
                <FiMail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <motion.div variants={fieldVariants} whileFocus="focus" whileBlur="blur">
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full px-4 py-3 bg-ctp-surface0/50 border rounded-lg text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-ctp-red focus:ring-ctp-red/50 focus:border-ctp-red' 
                      : 'border-ctp-surface2/30 focus:ring-neon-cyan/50 focus:border-neon-cyan'
                  }`}
                  placeholder="your@email.com"
                  disabled={submissionState === 'loading'}
                />
              </motion.div>
              {errors.email && (
                <motion.p 
                  className="mt-2 text-sm text-ctp-red flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Subject Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-ctp-text mb-2">
                <FiMessageCircle className="inline w-4 h-4 mr-2" />
                Subject
              </label>
              <motion.div variants={fieldVariants} whileFocus="focus" whileBlur="blur">
                <input
                  {...register('subject')}
                  type="text"
                  className={`w-full px-4 py-3 bg-ctp-surface0/50 border rounded-lg text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.subject 
                      ? 'border-ctp-red focus:ring-ctp-red/50 focus:border-ctp-red' 
                      : 'border-ctp-surface2/30 focus:ring-neon-cyan/50 focus:border-neon-cyan'
                  }`}
                  placeholder="What's this about?"
                  disabled={submissionState === 'loading'}
                />
              </motion.div>
              {errors.subject && (
                <motion.p 
                  className="mt-2 text-sm text-ctp-red flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle className="w-3 h-3" />
                  {errors.subject.message}
                </motion.p>
              )}
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-ctp-text mb-2">
                <FiMessageCircle className="inline w-4 h-4 mr-2" />
                Message
              </label>
              <motion.div variants={fieldVariants} whileFocus="focus" whileBlur="blur">
                <textarea
                  {...register('message')}
                  rows={6}
                  className={`w-full px-4 py-3 bg-ctp-surface0/50 border rounded-lg text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.message 
                      ? 'border-ctp-red focus:ring-ctp-red/50 focus:border-ctp-red' 
                      : 'border-ctp-surface2/30 focus:ring-neon-cyan/50 focus:border-neon-cyan'
                  }`}
                  placeholder="Tell me about your project, ideas, or how we can work together..."
                  disabled={submissionState === 'loading'}
                />
              </motion.div>
              {errors.message && (
                <motion.p 
                  className="mt-2 text-sm text-ctp-red flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle className="w-3 h-3" />
                  {errors.message.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="submit"
                disabled={!isValid || !isDirty || submissionState === 'loading'}
                className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  !isValid || !isDirty || submissionState === 'loading'
                    ? 'bg-ctp-surface1 text-ctp-subtext0 cursor-not-allowed'
                    : 'bg-gradient-to-r from-neon-cyan to-neon-green text-ctp-base hover:shadow-neon-lg transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
                whileHover={isValid && isDirty && submissionState !== 'loading' ? { 
                  boxShadow: '0 0 30px rgba(51, 204, 255, 0.4)' 
                } : {}}
                whileTap={isValid && isDirty && submissionState !== 'loading' ? { 
                  scale: 0.98 
                } : {}}
              >
                {submissionState === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <FiLoader className="w-5 h-5" />
                    </motion.div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;