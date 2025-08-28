'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { parseSearchParams, buildQueryString, addFilterValue, removeFilterValue, clearAllFilters, clearFilterType, updateSort, FilterParams } from '@/lib/utils/query';

// Custom hook for managing URL query state
export function useQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentParams = parseSearchParams(searchParams);
  
  const updateUrl = (newParams: FilterParams) => {
    const queryString = buildQueryString(newParams);
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });
  };
  
  return {
    currentParams,
    updateUrl,
    addFilter: (filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>, value: string) => {
      const newParams = addFilterValue(currentParams, filterType, value);
      updateUrl(newParams);
    },
    removeFilter: (filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>, value: string) => {
      const newParams = removeFilterValue(currentParams, filterType, value);
      updateUrl(newParams);
    },
    clearAll: () => {
      const newParams = clearAllFilters();
      updateUrl(newParams);
    },
    clearFilterType: (filterType: keyof Pick<FilterParams, 'gender' | 'color' | 'size' | 'price'>) => {
      const newParams = clearFilterType(currentParams, filterType);
      updateUrl(newParams);
    },
    updateSort: (sort: string) => {
      const newParams = updateSort(currentParams, sort);
      updateUrl(newParams);
    },
  };
}