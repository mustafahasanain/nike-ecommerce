import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nike Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest Nike sneakers, running shoes, and lifestyle footwear. 
            Just Do It with our premium collection of athletic wear.
          </p>
        </div>
        
        <ProductGrid />
      </main>
      
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Nike Store. Built with Next.js, TypeScript, and TailwindCSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
