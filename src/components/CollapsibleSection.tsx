'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  className?: string;
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false,
  badge,
  className = '' 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen(!isOpen);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`border-b border-light-300 ${className}`}>
      <button
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none focus:bg-light-200 hover:bg-light-200 transition-colors group"
        aria-expanded={isOpen}
        aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-body-medium font-medium text-dark-900 group-hover:text-black transition-colors">
            {title}
          </h3>
          {badge && (
            <span className="flex items-center gap-1 text-caption">
              {badge.includes('★') ? (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-orange text-orange" />
                  ))}
                  <span className="text-dark-500 ml-1">{badge}</span>
                </div>
              ) : (
                <span className="text-dark-500">{badge}</span>
              )}
            </span>
          )}
        </div>
        <div className="transition-transform duration-200">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-dark-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-500" />
          )}
        </div>
      </button>
      
      <div
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="text-body text-dark-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

// Pre-built sections for common use cases
export function ProductDetailsSection({ features }: { features: string[] }) {
  return (
    <CollapsibleSection title="Product Details" defaultOpen>
      <div className="space-y-4">
        <p className="text-body text-dark-700">
          The Air Max 90 stays true to its running roots with the iconic
          Waffle sole, stitched overlays and classic TPU accents create
          the &apos;90s look you love. Complete with normal-sized,
          Air cushioning adds comfort to your journey.
        </p>
        
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-dark-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-body text-dark-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CollapsibleSection>
  );
}

export function ShippingReturnsSection() {
  return (
    <CollapsibleSection title="Shipping & Returns">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-dark-900 mb-2">Free Shipping & Returns</h4>
          <p className="text-body text-dark-700">
            Free standard shipping on orders $50+ and free 60-day returns for Nike Members.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-dark-900 mb-2">Fast Shipping</h4>
          <p className="text-body text-dark-700">
            Get your order faster with expedited shipping options available at checkout.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-dark-900 mb-2">Easy Returns</h4>
          <p className="text-body text-dark-700">
            Not quite right? No problem. Return unworn items within 60 days for a full refund.
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export function ReviewsSection({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <CollapsibleSection 
      title="Reviews" 
      badge={`(${reviewCount})`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'fill-orange text-orange' 
                    : 'text-light-400'
                }`} 
              />
            ))}
          </div>
          <span className="text-body font-medium text-dark-900">{rating} out of 5</span>
          <span className="text-caption text-dark-500">({reviewCount} reviews)</span>
        </div>
        
        <div className="bg-light-100 rounded-lg p-4">
          <p className="text-body text-dark-700 text-center">
            Be the first to review this product and share your experience with other customers.
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}