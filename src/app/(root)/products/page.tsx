import { Suspense } from 'react';
import { parseFilterParams, parseSearchParams, FilterParams } from '@/lib/utils/query';
import { getAllProducts, type ProductWithDetails } from '@/lib/actions/product';
import Card from '@/components/Card';
import Filters from '@/components/Filters';
import Sort from '@/components/Sort';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function ActiveFilters({ filters }: { filters: FilterParams }) {
  const activeFilters: Array<{ type: string; label: string; value: string }> = [];

  // Add search filter
  if (filters.search) {
    activeFilters.push({ type: 'search', label: `Search: "${filters.search}"`, value: filters.search });
  }

  // Add category filters
  filters.category?.forEach(categorySlug => {
    activeFilters.push({ type: 'category', label: `Category: ${categorySlug}`, value: categorySlug });
  });

  // Add brand filters
  filters.brand?.forEach(brandSlug => {
    activeFilters.push({ type: 'brand', label: `Brand: ${brandSlug}`, value: brandSlug });
  });

  // Add gender filters
  filters.gender?.forEach(genderSlug => {
    activeFilters.push({ type: 'gender', label: `Gender: ${genderSlug}`, value: genderSlug });
  });

  // Add color filters
  filters.color?.forEach(colorSlug => {
    activeFilters.push({ type: 'color', label: `Color: ${colorSlug}`, value: colorSlug });
  });

  // Add size filters
  filters.size?.forEach(sizeSlug => {
    activeFilters.push({ type: 'size', label: `Size: ${sizeSlug}`, value: sizeSlug });
  });

  // Add price filters
  filters.price?.forEach(priceValue => {
    activeFilters.push({ type: 'price', label: `Price: $${priceValue}`, value: priceValue });
  });

  // Add price range filters
  if (filters.priceMin || filters.priceMax) {
    const min = filters.priceMin || '0';
    const max = filters.priceMax || '∞';
    activeFilters.push({ type: 'priceRange', label: `Price: $${min} - $${max}`, value: `${min}-${max}` });
  }

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
  products: ProductWithDetails[]; 
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
        {products.map((product) => {
          const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
          const displayPrice = product.minPrice === product.maxPrice 
            ? product.minPrice.toString() 
            : `${product.minPrice} - ${product.maxPrice}`;
          
          return (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              subtitle={`${product.gender.label}'s ${product.category.name}`}
              price={displayPrice}
              imageUrl={primaryImage?.url || '/shoes/shoe-1.jpg'}
              imageAlt={product.name}
              category={`${product.gender.label} • ${product.category.name}`}
              colors={product.colors}
              href={`/products/${product.id}`}
              variant="product"
            />
          );
        })}
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

  // Parse filters and call server action
  const productFilters = parseFilterParams(urlSearchParams);
  const { products, totalCount } = await getAllProducts(productFilters);
  
  // Also get original filter params for UI display
  const filters = parseSearchParams(urlSearchParams);

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
            <ProductGrid products={products} totalCount={totalCount} />
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