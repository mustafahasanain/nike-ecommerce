// This component is deprecated - using Card.tsx instead
// Left here for reference but commented out to avoid conflicts

/* 'use client';

import Image from 'next/image';
import { Product } from '@/lib/db/schema';
import { useCartStore } from '@/lib/stores/cart-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 bg-gray-100">
        <div className="flex items-center justify-center h-full text-gray-400">
          No Image Available
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} */