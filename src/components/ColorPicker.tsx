'use client';

import { Check } from 'lucide-react';

interface ProductColor {
  id: string;
  name: string;
  slug: string;
  hexCode: string;
}

interface ColorPickerProps {
  colors: ProductColor[];
  selectedColorId: string;
  onColorSelect: (colorId: string) => void;
}

export default function ColorPicker({ 
  colors, 
  selectedColorId, 
  onColorSelect 
}: ColorPickerProps) {
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onColorSelect(color.id)}
          onKeyDown={(e) => handleKeyDown(e, () => onColorSelect(color.id))}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 transition-all ${
            selectedColorId === color.id 
              ? 'border-dark-900 ring-2 ring-dark-900 ring-offset-2' 
              : 'border-light-400 hover:border-dark-500'
          }`}
          style={{ backgroundColor: color.hexCode }}
          title={color.name}
          aria-label={`Select ${color.name} color`}
        >
          {selectedColorId === color.id && (
            <Check 
              className={`w-5 h-5 ${
                color.hexCode === '#FFFFFF' || color.hexCode.toLowerCase() === '#ffffff' 
                  ? 'text-dark-900' 
                  : 'text-light-100'
              }`} 
            />
          )}
        </button>
      ))}
    </div>
  );
}