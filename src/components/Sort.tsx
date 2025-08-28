'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useQueryState } from '@/lib/hooks/useQueryState';
import { SORT_OPTIONS, SortOption, getSortLabel } from '@/lib/utils/query';

export default function Sort() {
  const { currentParams, updateSort } = useQueryState();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentSort = (currentParams.sort || 'featured') as SortOption;
  const currentLabel = getSortLabel(currentSort);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSortChange = (sortKey: SortOption) => {
    updateSort(sortKey);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, sortKey: SortOption) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSortChange(sortKey);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort products"
      >
        <span>Sort By:</span>
        <span className="font-normal">{currentLabel}</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div 
            className="py-1"
            role="listbox"
            aria-label="Sort options"
          >
            {Object.entries(SORT_OPTIONS).map(([sortKey, sortLabel]) => {
              const isSelected = currentSort === sortKey;
              
              return (
                <button
                  key={sortKey}
                  onClick={() => handleSortChange(sortKey as SortOption)}
                  onKeyDown={(e) => handleKeyDown(e, sortKey as SortOption)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                    isSelected ? 'font-medium text-black' : 'text-gray-700'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{sortLabel}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-black" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}