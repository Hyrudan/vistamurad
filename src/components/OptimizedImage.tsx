import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

// OptimizedImage handles native lazy loading and error state for images.
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ''} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-70'}`}
      loading={loading}
      decoding="async"
      onLoad={handleImageLoad}
      onError={handleImageError}
      style={{
        filter: imageLoaded ? 'none' : 'blur(2px)',
        transition: 'filter 0.3s ease-out',
      }}
    />
  );
};

export default OptimizedImage;
