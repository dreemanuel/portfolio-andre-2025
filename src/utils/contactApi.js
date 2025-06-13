// Contact API utilities for form submission
// This file provides a centralized way to handle contact form submissions

/**
 * Submit contact form data to the API
 * @param {Object} formData - The form data to submit
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} API response
 */
export const submitContactForm = async (formData) => {
  // Add timeout to prevent hanging requests
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (!response.ok) {
      // Handle specific error cases with user-friendly messages
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

    return {
      success: true,
      message: result.message || 'Thank you! Your message has been sent successfully.',
      id: result.id
    };

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw error;
    }
  }
};

/**
 * Mock API for development/testing when backend is not available
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} Mock API response
 */
export const mockContactSubmission = async (formData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate different responses for testing
  const shouldFail = Math.random() < 0.1; // 10% chance of failure for testing

  if (shouldFail) {
    throw new Error('Mock API error: Something went wrong (this is just for testing)');
  }

  console.log('Mock contact form submission:', formData);

  return {
    success: true,
    message: 'Mock submission successful! (Backend not connected)',
    id: `mock-${Date.now()}`
  };
};

/**
 * Get the appropriate submission function based on environment
 * @returns {Function} The submission function to use
 */
export const getSubmissionFunction = () => {
  // Check if we're in development and want to use mock API
  const isDevelopment = import.meta.env.MODE === 'development';
  const useMockApi = isDevelopment && import.meta.env.VITE_USE_MOCK_API === 'true';

  return useMockApi ? mockContactSubmission : submitContactForm;
};