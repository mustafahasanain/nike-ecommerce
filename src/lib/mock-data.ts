export interface MockProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  brand: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
  colors: Array<{
    id: string;
    name: string;
    slug: string;
    hexCode: string;
  }>;
  sizes: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  variants: Array<{
    id: string;
    colorId: string;
    sizeId: string;
    price: number;
    salePrice?: number;
    inStock: number;
  }>;
  createdAt: Date;
  isPublished: boolean;
}

export const mockGenders = [
  { id: 'gender-1', label: 'Men', slug: 'men' },
  { id: 'gender-2', label: 'Women', slug: 'women' },
  { id: 'gender-3', label: 'Unisex', slug: 'unisex' },
];

export const mockColors = [
  { id: 'color-1', name: 'Black', slug: 'black', hexCode: '#000000' },
  { id: 'color-2', name: 'White', slug: 'white', hexCode: '#FFFFFF' },
  { id: 'color-3', name: 'Red', slug: 'red', hexCode: '#DC2626' },
  { id: 'color-4', name: 'Blue', slug: 'blue', hexCode: '#2563EB' },
  { id: 'color-5', name: 'Green', slug: 'green', hexCode: '#16A34A' },
  { id: 'color-6', name: 'Gray', slug: 'gray', hexCode: '#6B7280' },
  { id: 'color-7', name: 'Orange', slug: 'orange', hexCode: '#EA580C' },
  { id: 'color-8', name: 'Yellow', slug: 'yellow', hexCode: '#FBBF24' },
  { id: 'color-9', name: 'Navy', slug: 'navy', hexCode: '#1E3A8A' },
  { id: 'color-10', name: 'Brown', slug: 'brown', hexCode: '#A16207' },
];

export const mockSizes = [
  { id: 'size-1', name: 'US 6', slug: 'us-6' },
  { id: 'size-2', name: 'US 6.5', slug: 'us-6-5' },
  { id: 'size-3', name: 'US 7', slug: 'us-7' },
  { id: 'size-4', name: 'US 7.5', slug: 'us-7-5' },
  { id: 'size-5', name: 'US 8', slug: 'us-8' },
  { id: 'size-6', name: 'US 8.5', slug: 'us-8-5' },
  { id: 'size-7', name: 'US 9', slug: 'us-9' },
  { id: 'size-8', name: 'US 9.5', slug: 'us-9-5' },
  { id: 'size-9', name: 'US 10', slug: 'us-10' },
  { id: 'size-10', name: 'US 10.5', slug: 'us-10-5' },
  { id: 'size-11', name: 'US 11', slug: 'us-11' },
  { id: 'size-12', name: 'US 11.5', slug: 'us-11-5' },
  { id: 'size-13', name: 'US 12', slug: 'us-12' },
];

export const mockProducts: MockProduct[] = [
  {
    id: 'product-1',
    name: 'Air Force 1 \'07',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original.',
    category: 'Basketball',
    gender: 'men',
    brand: 'Nike',
    price: 90,
    imageUrl: '/shoes/shoe-1.jpg',
    imageAlt: 'Nike Air Force 1 \'07',
    badge: 'Best Seller',
    colors: [mockColors[0], mockColors[1], mockColors[5]],
    sizes: mockSizes.slice(0, 8),
    variants: [],
    createdAt: new Date('2024-01-15'),
    isPublished: true,
  },
  {
    id: 'product-2',
    name: 'Court Vision Low Next Nature',
    description: 'Made with at least 20% recycled content, this shoe features a crisp upper.',
    category: 'Lifestyle',
    gender: 'men',
    brand: 'Nike',
    price: 65,
    imageUrl: '/shoes/shoe-2.webp',
    imageAlt: 'Nike Court Vision Low Next Nature',
    badge: 'Sustainable Materials',
    colors: [mockColors[1], mockColors[3], mockColors[0]],
    sizes: mockSizes.slice(0, 10),
    variants: [],
    createdAt: new Date('2024-01-10'),
    isPublished: true,
  },
  {
    id: 'product-3',
    name: 'Air Force 1 PLT.AF.ORM',
    description: 'The \'80s b-ball icon returns with classic details and throwback hoops.',
    category: 'Lifestyle',
    gender: 'women',
    brand: 'Nike',
    price: 110,
    imageUrl: '/shoes/shoe-3.webp',
    imageAlt: 'Nike Air Force 1 PLT.AF.ORM',
    colors: [mockColors[1], mockColors[4], mockColors[5]],
    sizes: mockSizes.slice(0, 9),
    variants: [],
    createdAt: new Date('2024-01-08'),
    isPublished: true,
  },
  {
    id: 'product-4',
    name: 'Dunk Low Retro',
    description: 'Created for the hardwood but taken to the streets.',
    category: 'Lifestyle',
    gender: 'men',
    brand: 'Nike',
    price: 100,
    salePrice: 80,
    imageUrl: '/shoes/shoe-4.webp',
    imageAlt: 'Nike Dunk Low Retro',
    badge: 'Extra 20% off',
    colors: [mockColors[4], mockColors[7], mockColors[0]],
    sizes: mockSizes.slice(0, 11),
    variants: [],
    createdAt: new Date('2024-01-12'),
    isPublished: true,
  },
  {
    id: 'product-5',
    name: 'Air Max SYSTM',
    description: 'The Nike Air Max SYSTM is a modern take on running.',
    category: 'Running',
    gender: 'men',
    brand: 'Nike',
    price: 75,
    imageUrl: '/shoes/shoe-5.avif',
    imageAlt: 'Nike Air Max SYSTM',
    colors: [mockColors[1], mockColors[2], mockColors[5]],
    sizes: mockSizes.slice(0, 12),
    variants: [],
    createdAt: new Date('2024-01-05'),
    isPublished: true,
  },
  {
    id: 'product-6',
    name: 'Air Force 1 PLT.AF.ORM',
    description: 'Comfortable, durable and timeless—it\'s number 1 for a reason.',
    category: 'Lifestyle',
    gender: 'women',
    brand: 'Nike',
    price: 110,
    imageUrl: '/shoes/shoe-6.avif',
    imageAlt: 'Nike Air Force 1 PLT.AF.ORM White',
    badge: 'Best Seller',
    colors: [mockColors[1], mockColors[6], mockColors[0]],
    sizes: mockSizes.slice(0, 9),
    variants: [],
    createdAt: new Date('2024-01-20'),
    isPublished: true,
  },
  {
    id: 'product-7',
    name: 'Dunk Low Retro SE',
    description: 'From backboards to skateboards, the influence of the Nike Dunk.',
    category: 'Skateboarding',
    gender: 'men',
    brand: 'Nike',
    price: 90,
    salePrice: 72,
    imageUrl: '/shoes/shoe-7.avif',
    imageAlt: 'Nike Dunk Low Retro SE',
    badge: 'Extra 20% off',
    colors: [mockColors[9], mockColors[0], mockColors[1]],
    sizes: mockSizes.slice(0, 10),
    variants: [],
    createdAt: new Date('2024-01-18'),
    isPublished: true,
  },
  {
    id: 'product-8',
    name: 'Air Max 90 SE',
    description: 'Nothing as fly, nothing as comfortable, nothing as proven.',
    category: 'Lifestyle',
    gender: 'men',
    brand: 'Nike',
    price: 100,
    imageUrl: '/shoes/shoe-8.avif',
    imageAlt: 'Nike Air Max 90 SE',
    colors: [mockColors[6], mockColors[2], mockColors[7]],
    sizes: mockSizes.slice(0, 11),
    variants: [],
    createdAt: new Date('2024-01-14'),
    isPublished: true,
  },
  {
    id: 'product-9',
    name: 'Legend Essential 3 Next Nature',
    description: 'Flexible and supportive, the Nike Legend Essential 3.',
    category: 'Training',
    gender: 'men',
    brand: 'Nike',
    price: 60,
    imageUrl: '/shoes/shoe-9.avif',
    imageAlt: 'Nike Legend Essential 3 Next Nature',
    badge: 'Sustainable Materials',
    colors: [mockColors[8], mockColors[2], mockColors[0]],
    sizes: mockSizes.slice(0, 13),
    variants: [],
    createdAt: new Date('2024-01-22'),
    isPublished: true,
  },
  {
    id: 'product-10',
    name: 'SB Zoom Janoski OG+',
    description: 'An icon returns with the Nike SB Zoom Janoski OG+.',
    category: 'Skateboarding',
    gender: 'men',
    brand: 'Nike',
    price: 85,
    imageUrl: '/shoes/shoe-10.avif',
    imageAlt: 'Nike SB Zoom Janoski OG+',
    badge: 'Best Seller',
    colors: [mockColors[9], mockColors[0], mockColors[1]],
    sizes: mockSizes.slice(0, 10),
    variants: [],
    createdAt: new Date('2024-01-16'),
    isPublished: true,
  },
  {
    id: 'product-11',
    name: 'Jordan Series ES',
    description: 'Inspired by the greatest of all time, the Jordan Series ES.',
    category: 'Basketball',
    gender: 'men',
    brand: 'Jordan',
    price: 70,
    imageUrl: '/shoes/shoe-11.avif',
    imageAlt: 'Jordan Series ES',
    colors: [mockColors[4], mockColors[0], mockColors[1]],
    sizes: mockSizes.slice(0, 12),
    variants: [],
    createdAt: new Date('2024-01-11'),
    isPublished: true,
  },
  {
    id: 'product-12',
    name: 'Blazer Low \'77 Jumbo',
    description: 'In the \'70s, Nike was the new shoe on the block.',
    category: 'Lifestyle',
    gender: 'women',
    brand: 'Nike',
    price: 100,
    salePrice: 80,
    imageUrl: '/shoes/shoe-12.avif',
    imageAlt: 'Nike Blazer Low \'77 Jumbo',
    badge: 'Extra 20% off',
    colors: [mockColors[1], mockColors[3], mockColors[4]],
    sizes: mockSizes.slice(0, 9),
    variants: [],
    createdAt: new Date('2024-01-06'),
    isPublished: true,
  },
  {
    id: 'product-13',
    name: 'Air Max 270',
    description: 'Nike\'s biggest heel Air unit yet delivers unrivaled comfort.',
    category: 'Lifestyle',
    gender: 'women',
    brand: 'Nike',
    price: 150,
    imageUrl: '/shoes/shoe-13.avif',
    imageAlt: 'Nike Air Max 270',
    colors: [mockColors[1], mockColors[6], mockColors[2]],
    sizes: mockSizes.slice(0, 10),
    variants: [],
    createdAt: new Date('2024-01-09'),
    isPublished: true,
  },
  {
    id: 'product-14',
    name: 'React Infinity Run Flyknit 3',
    description: 'A continuing evolution of the fan favorite.',
    category: 'Running',
    gender: 'women',
    brand: 'Nike',
    price: 160,
    imageUrl: '/shoes/shoe-14.avif',
    imageAlt: 'Nike React Infinity Run Flyknit 3',
    colors: [mockColors[1], mockColors[0], mockColors[5]],
    sizes: mockSizes.slice(0, 9),
    variants: [],
    createdAt: new Date('2024-01-17'),
    isPublished: true,
  },
  {
    id: 'product-15',
    name: 'Air Force 1 Shadow',
    description: 'The Nike Air Force 1 Shadow puts a playful twist.',
    category: 'Lifestyle',
    gender: 'women',
    brand: 'Nike',
    price: 100,
    imageUrl: '/shoes/shoe-15.avif',
    imageAlt: 'Nike Air Force 1 Shadow',
    badge: 'Just In',
    colors: [mockColors[1], mockColors[6], mockColors[8]],
    sizes: mockSizes.slice(0, 8),
    variants: [],
    createdAt: new Date('2024-01-25'),
    isPublished: true,
  },
];

export const priceRanges = [
  { label: 'Under $75', value: '0-75', min: 0, max: 75 },
  { label: '$75 - $100', value: '75-100', min: 75, max: 100 },
  { label: '$100 - $150', value: '100-150', min: 100, max: 150 },
  { label: 'Over $150', value: '150+', min: 150, max: Infinity },
];

// Filtering and sorting functions
export function filterProducts(
  products: MockProduct[],
  filters: {
    gender?: string[];
    color?: string[];
    size?: string[];
    price?: string[];
  }
): MockProduct[] {
  return products.filter((product) => {
    // Gender filter
    if (filters.gender && filters.gender.length > 0) {
      if (!filters.gender.includes(product.gender)) {
        return false;
      }
    }

    // Color filter
    if (filters.color && filters.color.length > 0) {
      const productColorSlugs = product.colors.map(c => c.slug);
      if (!filters.color.some(colorSlug => productColorSlugs.includes(colorSlug))) {
        return false;
      }
    }

    // Size filter
    if (filters.size && filters.size.length > 0) {
      const productSizeSlugs = product.sizes.map(s => s.slug);
      if (!filters.size.some(sizeSlug => productSizeSlugs.includes(sizeSlug))) {
        return false;
      }
    }

    // Price filter
    if (filters.price && filters.price.length > 0) {
      const productPrice = product.salePrice || product.price;
      const matchesPriceRange = filters.price.some(priceRange => {
        const range = priceRanges.find(r => r.value === priceRange);
        if (!range) return false;
        return productPrice >= range.min && productPrice <= range.max;
      });
      if (!matchesPriceRange) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(products: MockProduct[], sortBy: string): MockProduct[] {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      return sortedProducts.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceA - priceB;
      });
    case 'price_desc':
      return sortedProducts.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceB - priceA;
      });
    case 'newest':
      return sortedProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'featured':
    default:
      // Featured sorting: prioritize products with badges, then by name
      return sortedProducts.sort((a, b) => {
        if (a.badge && !b.badge) return -1;
        if (!a.badge && b.badge) return 1;
        return a.name.localeCompare(b.name);
      });
  }
}

export function getUniqueFilterOptions() {
  return {
    genders: mockGenders,
    colors: mockColors,
    sizes: mockSizes,
    priceRanges: priceRanges,
  };
}