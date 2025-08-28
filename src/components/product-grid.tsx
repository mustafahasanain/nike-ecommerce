'use client';

import { useEffect } from 'react';
import { Product } from '@/lib/db/schema';
// import { ProductCard } from './product-card'; // Disabled - using Card.tsx instead
import Card from './Card';
import { useProductStore } from '@/lib/stores/product-store';

export function ProductGrid() {
  const { products, loading, error, setProducts, setLoading, setError } = useProductStore();
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [setProducts, setLoading, setError]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading products: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          id={product.id}
          title={product.name}
          description={product.description || ''}
          imageUrl="/shoes/shoe-1.jpg" // placeholder since Product schema doesn't have imageUrl
          imageAlt={product.name}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  );
}