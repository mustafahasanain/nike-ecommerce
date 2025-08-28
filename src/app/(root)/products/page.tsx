import { Suspense } from 'react';
import { parseSearchParams, FilterParams } from '@/lib/utils/query';
import { 
  mockProducts, 
  filterProducts, 
  sortProducts, 
  getUniqueFilterOptions,
  MockProduct 
} from '@/lib/mock-data';
import Card from '@/components/Card';
import Filters from '@/components/Filters';
import Sort from '@/components/Sort';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function ActiveFilters({ filters }: { filters: FilterParams }) {
  const filterOptions = getUniqueFilterOptions();
  const activeFilters: Array<{ type: string; label: string; value: string }> = [];

  // Add gender filters
  filters.gender?.forEach(genderSlug => {
    const gender = filterOptions.genders.find(g => g.slug === genderSlug);
    if (gender) {
      activeFilters.push({ type: 'gender', label: gender.label, value: genderSlug });
    }
  });

  // Add color filters
  filters.color?.forEach(colorSlug => {
    const color = filterOptions.colors.find(c => c.slug === colorSlug);
    if (color) {
      activeFilters.push({ type: 'color', label: color.name, value: colorSlug });
    }
  });

  // Add size filters
  filters.size?.forEach(sizeSlug => {
    const size = filterOptions.sizes.find(s => s.slug === sizeSlug);
    if (size) {
      activeFilters.push({ type: 'size', label: size.name, value: sizeSlug });
    }
  });

  // Add price filters
  filters.price?.forEach(priceValue => {
    const priceRange = filterOptions.priceRanges.find(p => p.value === priceValue);
    if (priceRange) {
      activeFilters.push({ type: 'price', label: priceRange.label, value: priceValue });
    }
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <span
            key={`${filter.type}-${filter.value}-${index}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
          >
            {filter.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({ 
  products, 
  totalCount 
}: { 
  products: MockProduct[]; 
  totalCount: number; 
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          New ({totalCount})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            subtitle={`${product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}'s ${product.category}`}
            price={product.salePrice?.toString() || product.price.toString()}
            originalPrice={product.salePrice ? product.price.toString() : undefined}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            badge={product.badge}
            category={`${product.gender.charAt(0).toUpperCase() + product.gender.slice(1)} • ${product.category}`}
            colors={product.colors.map(c => c.name)}
            sizes={product.sizes.map(s => s.name)}
            href={`/products/${product.id}`}
            variant="product"
          />
        ))}
      </div>
    </div>
  );
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();
  
  // Convert the searchParams to URLSearchParams format
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  const filters = parseSearchParams(urlSearchParams);
  
  // Apply filters and sorting
  const filteredProducts = filterProducts(mockProducts, {
    gender: filters.gender,
    color: filters.color,
    size: filters.size,
    price: filters.price,
  });

  const sortBy = filters.sort || 'featured';
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const totalCount = sortedProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <Filters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filters & Sort */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between mb-4">
                <Filters />
                <Sort />
              </div>
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex lg:items-center lg:justify-end mb-6">
              <Sort />
            </div>

            {/* Active Filters */}
            <ActiveFilters filters={filters} />

            {/* Products Grid */}
            <ProductGrid products={sortedProducts} totalCount={totalCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="hidden lg:block">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 aspect-square rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}