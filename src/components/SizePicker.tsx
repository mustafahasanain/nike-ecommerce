'use client';

import { useState } from 'react';

interface Size {
  id: string;
  name: string;
  slug: string;
  inStock: boolean;
}

interface SizePickerProps {
  sizes: Size[];
  onSizeSelect?: (sizeId: string) => void;
}

export default function SizePicker({ sizes, onSizeSelect }: SizePickerProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');

  const handleSizeSelect = (sizeId: string, inStock: boolean) => {
    if (!inStock) return;
    
    const newSelectedId = selectedSizeId === sizeId ? '' : sizeId;
    setSelectedSizeId(newSelectedId);
    onSizeSelect?.(newSelectedId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, sizeId: string, inStock: boolean) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSizeSelect(sizeId, inStock);
    }
  };

  if (sizes.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-body-medium font-medium text-dark-900">Select Size</h3>
        </div>
        <p className="text-caption text-dark-500">No sizes available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-body-medium font-medium text-dark-900">Select Size</h3>
        <button 
          className="text-caption text-dark-500 underline hover:text-dark-900 focus:outline-none focus:text-dark-900"
          aria-label="View size guide"
        >
          Size Guide
        </button>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => handleSizeSelect(size.id, size.inStock)}
            onKeyDown={(e) => handleKeyDown(e, size.id, size.inStock)}
            disabled={!size.inStock}
            className={`
              aspect-square min-h-[40px] sm:min-h-[48px] border rounded-lg text-caption sm:text-body font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2
              ${size.inStock 
                ? selectedSizeId === size.id
                  ? 'border-dark-900 bg-dark-900 text-light-100'
                  : 'border-light-300 hover:border-dark-500 text-dark-900'
                : 'border-light-300 text-dark-500 bg-light-200 cursor-not-allowed opacity-50'
              }
            `}
            aria-label={`Size ${size.name}${!size.inStock ? ' - Out of stock' : ''}`}
            aria-pressed={selectedSizeId === size.id}
          >
            <span className={`${!size.inStock ? 'line-through' : ''}`}>
              {size.name}
            </span>
          </button>
        ))}
      </div>
      
      {selectedSizeId && (
        <p className="text-caption text-dark-500">
          Size {sizes.find(s => s.id === selectedSizeId)?.name} selected
        </p>
      )}
    </div>
  );
}