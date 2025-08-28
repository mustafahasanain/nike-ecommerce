import qs from 'query-string';

export interface FilterParams {
  gender?: string[];
  color?: string[];
  size?: string[];
  price?: string[];
  sort?: string;
  page?: string;
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