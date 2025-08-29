'use client';

import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import ColorPicker from '@/components/ColorPicker';
import SizePicker from '@/components/SizePicker';
import { ProductDetailsSection, ShippingReturnsSection, ReviewsSection } from '@/components/CollapsibleSection';
import { ProductCard } from '@/components/Card';

export default function ProductPageClient({ product }: { product: any }) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id || '');

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-light-100">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Left - Product Gallery */}
          <div className="space-y-4">
            <ProductGallery 
              images={product.images}
              colors={product.colors}
              productName={product.name}
              selectedColorId={selectedColorId}
            />
          </div>

          {/* Right - Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Highly Rated Badge */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-dark-900">★</div>
              <span className="text-caption text-dark-700">Highly Rated</span>
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <h1 className="text-heading-3 font-medium text-dark-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-body text-dark-500">{product.subtitle}</p>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-heading-3 font-medium text-dark-900">
                  ${currentPrice}
                </span>
                {hasDiscount && (
                  <span className="text-body text-dark-500 line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              {product.badge && (
                <p className="text-caption text-green font-medium">
                  {product.badge}
                </p>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-body-medium font-medium text-dark-900">
                  Color
                </h3>
                <span className="text-caption text-dark-500">
                  {product.colors.length} Colors
                </span>
              </div>
              <ColorPicker 
                colors={product.colors}
                selectedColorId={selectedColorId}
                onColorSelect={setSelectedColorId}
              />
            </div>

            {/* Size Picker */}
            <SizePicker sizes={product.sizes} />

            {/* Add to Bag & Favorite Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-dark-900 text-light-100 py-3 sm:py-4 rounded-full font-medium text-body hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2">
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bag
                </div>
              </button>
              
              <button className="w-full border border-light-300 text-dark-900 py-3 sm:py-4 rounded-full font-medium text-body hover:border-dark-500 hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Favorite
                </div>
              </button>
            </div>

            {/* Product Description */}
            <div className="space-y-4 pt-4">
              <p className="text-body text-dark-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-0 pt-4">
              <ProductDetailsSection features={product.features} />
              <ShippingReturnsSection />
              <ReviewsSection rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="bg-light-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-heading-3 font-medium text-dark-900 mb-6 sm:mb-8">
            You Might Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                title={relatedProduct.name}
                subtitle={relatedProduct.subtitle}
                price={relatedProduct.salePrice?.toString() || relatedProduct.price.toString()}
                originalPrice={relatedProduct.salePrice ? relatedProduct.price.toString() : undefined}
                imageUrl={relatedProduct.imageUrl}
                imageAlt={relatedProduct.imageAlt}
                badge={relatedProduct.badge}
                colors={relatedProduct.colors}
                href={`/products/${relatedProduct.id}`}
                className="bg-light-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}