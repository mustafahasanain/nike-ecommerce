'use client';

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
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image Available
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        
        {product.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {product.size && (
            <span className="text-sm text-gray-600">Size: {product.size}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          {product.color && (
            <span className="text-sm text-gray-600">Color: {product.color}</span>
          )}
          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock <= 0}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {product.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}