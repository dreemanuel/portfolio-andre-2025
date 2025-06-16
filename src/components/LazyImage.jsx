import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 animate-pulse">
          {placeholder || (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-ctp-subtext0 text-sm">Loading...</div>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 flex items-center justify-center">
          <div className="text-ctp-subtext0 text-sm text-center">
            <div className="mb-2">⚠️</div>
            <div>Image failed to load</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;