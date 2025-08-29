'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageOff, Check } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface ProductColor {
  id: string;
  name: string;
  slug: string;
  hexCode: string;
  images: ProductImage[];
}

interface ProductGalleryProps {
  images: ProductImage[];
  colors: ProductColor[];
  productName: string;
  selectedColorId?: string;
}

export default function ProductGallery({ 
  images, 
  colors, 
  productName,
  selectedColorId = colors[0]?.id || ''
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get images for the selected color variant, or default images if no color selected
  const currentImages = selectedColorId 
    ? colors.find(color => color.id === selectedColorId)?.images || images
    : images;
    
  // Filter out any invalid images
  const validImages = currentImages.filter(img => img.url && img.url !== '');
  
  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  
  const goToPrevious = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex(prev => 
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // If no valid images, show fallback
  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-light-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <ImageOff className="w-16 h-16 text-dark-500 mx-auto mb-2" />
          <p className="text-dark-500 text-sm">No images available</p>
        </div>
      </div>
    );
  }

  const currentImage = validImages[currentImageIndex];

  return (
    <div className="flex gap-4">
      {/* Left side - Thumbnails only */}
      <div className="flex flex-col gap-2">
        {validImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleImageSelect(index)}
            onKeyDown={(e) => handleKeyDown(e, () => handleImageSelect(index))}
            className={`flex-shrink-0 w-16 h-16 bg-light-200 rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 ${
              currentImageIndex === index 
                ? 'border-dark-900' 
                : 'border-light-400 hover:border-dark-500'
            }`}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Right side - Main image */}
      <div className="flex-1 relative aspect-square bg-light-200 rounded-lg overflow-hidden group">
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        
        {/* Navigation arrows - only show if more than 1 image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              onKeyDown={(e) => handleKeyDown(e, goToPrevious)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-light-100 bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-dark-900"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-dark-900" />
            </button>
            
            <button
              onClick={goToNext}
              onKeyDown={(e) => handleKeyDown(e, goToNext)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-light-100 bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:ring-2 focus:ring-dark-900"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-dark-900" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}