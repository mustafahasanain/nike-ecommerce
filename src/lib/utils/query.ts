import qs from 'query-string';
import type { ProductFilters } from '@/lib/actions/product';

export interface FilterParams {
  gender?: string[];
  color?: string[];
  size?: string[];
  price?: string[];
  sort?: string;
  page?: string;
  search?: string;
  category?: string[];
  brand?: string[];
  priceMin?: string;
  priceMax?: string;
}

export function parseSearchParams(searchParams: URLSearchParams): FilterParams {
  const query = qs.parse(searchParams.toString(), {
    arrayFormat: 'comma',
  });

  const filterStringArray = (value: unknown): string[] | undefined => {
    if (Array.isArray(value)) {
      const filtered = value.filter((v): v is string => typeof v === 'string' && v.length > 0);
      return filtered.length > 0 ? filtered : undefined;
    }
    if (typeof value === 'string' && value.length > 0) {
      return [value];
    }
    return undefined;
  };

  return {
    gender: filterStringArray(query.gender),
    color: filterStringArray(query.color),
    size: filterStringArray(query.size),
    price: filterStringArray(query.price),
    sort: typeof query.sort === 'string' ? query.sort : undefined,
    page: typeof query.page === 'string' ? query.page : undefined,
    search: typeof query.search === 'string' ? query.search : undefined,
    category: filterStringArray(query.category),
    brand: filterStringArray(query.brand),
    priceMin: typeof query.priceMin === 'string' ? query.priceMin : undefined,
    priceMax: typeof query.priceMax === 'string' ? query.priceMax : undefined,
  };
}

export function buildQueryString(filters: FilterParams): string {
  const cleanedFilters: Record<string, string | string[]> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        cleanedFilters[key] = value;
      } else if (!Array.isArray(value)) {
        cleanedFilters[key] = value;
      }
    }
  });

  return qs.stringify(cleanedFilters, {
    arrayFormat: 'comma',
    skipEmptyString: true,
    skipNull: true,
  });
}

export function updateQueryParams(
  currentParams: FilterParams,
  updates: Partial<FilterParams>
): FilterParams {
  return {
    ...currentParams,
    ...updates,
  };
}

export function addFilterValue(
  currentParams: FilterParams,
  filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>,
  value: string
): FilterParams {
  const currentValues = currentParams[filterType] || [];
  const updatedValues = [...currentValues, value];
  
  return updateQueryParams(currentParams, {
    [filterType]: updatedValues,
    page: '1', // Reset to first page when filtering
  });
}

export function removeFilterValue(
  currentParams: FilterParams,
  filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>,
  value: string
): FilterParams {
  const currentValues = currentParams[filterType] || [];
  const updatedValues = currentValues.filter(v => v !== value);
  
  return updateQueryParams(currentParams, {
    [filterType]: updatedValues.length > 0 ? updatedValues : undefined,
    page: '1', // Reset to first page when filtering
  });
}

export function clearAllFilters(): FilterParams {
  return {
    sort: undefined,
    page: '1',
  };
}

export function clearFilterType(
  currentParams: FilterParams,
  filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>
): FilterParams {
  return updateQueryParams(currentParams, {
    [filterType]: undefined,
    page: '1',
  });
}

export function updateSort(currentParams: FilterParams, sort: string): FilterParams {
  return updateQueryParams(currentParams, {
    sort,
    page: '1', // Reset to first page when sorting
  });
}


// Type definitions for sort options
export const SORT_OPTIONS = {
  featured: 'Featured',
  newest: 'Newest',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;

export function getSortLabel(sortKey: string): string {
  return SORT_OPTIONS[sortKey as SortOption] || SORT_OPTIONS.featured;
}

// Helper function to convert FilterParams to ProductFilters
export function parseFilterParams(searchParams: URLSearchParams): ProductFilters {
  const filters = parseSearchParams(searchParams);
  
  const productFilters: ProductFilters = {
    search: filters.search,
    category: filters.category,
    brand: filters.brand,
    gender: filters.gender,
    color: filters.color,
    size: filters.size,
    sortBy: filters.sort as 'price_asc' | 'price_desc' | 'latest' | 'featured',
    page: filters.page ? parseInt(filters.page) : 1,
    limit: 12, // Default limit
  };

  // Handle price range filters
  if (filters.priceMin) {
    const priceMin = parseFloat(filters.priceMin);
    if (!isNaN(priceMin)) {
      productFilters.priceMin = priceMin;
    }
  }

  if (filters.priceMax) {
    const priceMax = parseFloat(filters.priceMax);
    if (!isNaN(priceMax)) {
      productFilters.priceMax = priceMax;
    }
  }

  // Handle price range strings (e.g., "0-50", "50-100")
  if (filters.price && filters.price.length > 0) {
    const priceRanges = filters.price.map(range => {
      const [min, max] = range.split('-').map(p => parseFloat(p));
      return { min: isNaN(min) ? undefined : min, max: isNaN(max) ? undefined : max };
    });

    // Find the overall min and max from all selected price ranges
    const mins = priceRanges.map(r => r.min).filter(Boolean) as number[];
    const maxs = priceRanges.map(r => r.max).filter(Boolean) as number[];

    if (mins.length > 0) {
      productFilters.priceMin = Math.min(...mins);
    }
    if (maxs.length > 0) {
      productFilters.priceMax = Math.max(...maxs);
    }
  }

  return productFilters;
}

// Helper function to build Drizzle query conditions (if needed)
// Note: Currently the server actions handle all query building internally
export function buildProductQueryObject(filters: ProductFilters) {
  return {
    hasFilters: Boolean(
      filters.search ||
      (filters.category && filters.category.length > 0) ||
      (filters.brand && filters.brand.length > 0) ||
      (filters.gender && filters.gender.length > 0) ||
      (filters.color && filters.color.length > 0) ||
      (filters.size && filters.size.length > 0) ||
      filters.priceMin !== undefined ||
      filters.priceMax !== undefined
    ),
    filters,
  };
}