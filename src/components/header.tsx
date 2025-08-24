'use client';

import { useCartStore } from '@/lib/stores/cart-store';

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Nike Store</h1>
          </div>
          
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-black transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">
              About
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-700 hover:text-black transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-1h18m-14 8v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}