'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useQueryState } from '@/lib/hooks/useQueryState';
import { getUniqueFilterOptions } from '@/lib/mock-data';

interface FilterGroup {
  id: string;
  title: string;
  options: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-3">{children}</div>
      )}
    </div>
  );
}

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
}

function Checkbox({ id, label, checked, onChange, count }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black focus:ring-offset-2"
      />
      <label
        htmlFor={id}
        className="ml-3 text-sm text-gray-700 flex-1 cursor-pointer"
      >
        <span>{label}</span>
        {count !== undefined && (
          <span className="ml-1 text-gray-500">({count})</span>
        )}
      </label>
    </div>
  );
}

interface ColorSwatchProps {
  color: {
    name: string;
    slug: string;
    hexCode: string;
  };
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ColorSwatch({ color, checked, onChange }: ColorSwatchProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(!checked)}
        className={`w-6 h-6 rounded-full border-2 ${
          checked ? 'border-black' : 'border-gray-300'
        } flex items-center justify-center`}
        style={{ backgroundColor: color.hexCode }}
        aria-label={`${checked ? 'Remove' : 'Add'} ${color.name} color filter`}
      >
        {checked && (
          <div className="w-2 h-2 rounded-full bg-white" 
               style={{ backgroundColor: color.hexCode === '#FFFFFF' ? '#000000' : '#FFFFFF' }} />
        )}
      </button>
      <label className="text-sm text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>
        {color.name}
      </label>
    </div>
  );
}

function FiltersContent() {
  const { currentParams, addFilter, removeFilter, clearAll } = useQueryState();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    gender: true,
    color: true,
    size: true,
    price: true,
  });

  const filterOptions = getUniqueFilterOptions();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleFilterChange = (
    filterType: 'gender' | 'color' | 'size' | 'price',
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      addFilter(filterType, value);
    } else {
      removeFilter(filterType, value);
    }
  };

  const hasActiveFilters = !!(
    currentParams.gender?.length ||
    currentParams.color?.length ||
    currentParams.size?.length ||
    currentParams.price?.length
  );

  return (
    <div className="space-y-0">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pb-4 border-b border-gray-200">
          <button
            onClick={clearAll}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Gender Filter */}
      <FilterSection
        title="Gender"
        isExpanded={expandedSections.gender}
        onToggle={() => toggleSection('gender')}
      >
        {filterOptions.genders.map((gender) => (
          <Checkbox
            key={gender.slug}
            id={`gender-${gender.slug}`}
            label={gender.label}
            checked={currentParams.gender?.includes(gender.slug) || false}
            onChange={(checked) => handleFilterChange('gender', gender.slug, checked)}
          />
        ))}
      </FilterSection>

      {/* Color Filter */}
      <FilterSection
        title="Color"
        isExpanded={expandedSections.color}
        onToggle={() => toggleSection('color')}
      >
        <div className="grid grid-cols-2 gap-3">
          {filterOptions.colors.map((color) => (
            <ColorSwatch
              key={color.slug}
              color={color}
              checked={currentParams.color?.includes(color.slug) || false}
              onChange={(checked) => handleFilterChange('color', color.slug, checked)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection
        title="Size"
        isExpanded={expandedSections.size}
        onToggle={() => toggleSection('size')}
      >
        <div className="grid grid-cols-3 gap-2">
          {filterOptions.sizes.map((size) => (
            <button
              key={size.slug}
              onClick={() => handleFilterChange('size', size.slug, !(currentParams.size?.includes(size.slug) || false))}
              className={`px-3 py-2 text-sm border rounded-md text-center transition-colors ${
                currentParams.size?.includes(size.slug)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        {filterOptions.priceRanges.map((range) => (
          <Checkbox
            key={range.value}
            id={`price-${range.value}`}
            label={range.label}
            checked={currentParams.price?.includes(range.value) || false}
            onChange={(checked) => handleFilterChange('price', range.value, checked)}
          />
        ))}
      </FilterSection>
    </div>
  );
}

export default function Filters() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-md"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <FiltersContent />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}