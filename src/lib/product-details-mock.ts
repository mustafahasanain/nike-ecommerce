export interface ProductDetailsMock {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  salePrice?: number;
  badge?: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  colors: Array<{
    id: string;
    name: string;
    slug: string;
    hexCode: string;
    images: Array<{
      id: string;
      url: string;
      alt: string;
      isPrimary: boolean;
    }>;
  }>;
  sizes: Array<{
    id: string;
    name: string;
    slug: string;
    inStock: boolean;
  }>;
  rating: number;
  reviewCount: number;
  features: string[];
  details: {
    style: string;
    colorway: string;
    materials: string[];
  };
  relatedProducts: Array<{
    id: string;
    name: string;
    subtitle: string;
    price: number;
    salePrice?: number;
    imageUrl: string;
    imageAlt: string;
    badge?: string;
    colors: string[];
  }>;
}

export const mockProductDetails: Record<string, ProductDetailsMock> = {
  'product-8': {
    id: 'product-8',
    name: 'Nike Air Max 90 SE',
    subtitle: 'Women\'s Shoes',
    description: 'The Air Max 90 stays true to its running roots with the iconic Waffle sole, stitched overlays and classic TPU accents. Fresh colors give the \'90s look you love. Complete with normal-sized, Air cushioning adds comfort to your journey.',
    price: 140,
    badge: 'Extra 20% off with code SPORT',
    images: [
      {
        id: 'img-1',
        url: '/shoes/shoe-8.avif',
        alt: 'Nike Air Max 90 SE - Main View',
        isPrimary: true
      },
      {
        id: 'img-2',
        url: '/shoes/shoe-7.avif',
        alt: 'Nike Air Max 90 SE - Side View',
        isPrimary: false
      },
      {
        id: 'img-3',
        url: '/shoes/shoe-9.avif',
        alt: 'Nike Air Max 90 SE - Heel View',
        isPrimary: false
      },
      {
        id: 'img-4',
        url: '/shoes/shoe-10.avif',
        alt: 'Nike Air Max 90 SE - Bottom View',
        isPrimary: false
      },
      {
        id: 'img-5',
        url: '/shoes/shoe-11.avif',
        alt: 'Nike Air Max 90 SE - Detail View',
        isPrimary: false
      },
      {
        id: 'img-6',
        url: '/shoes/shoe-12.avif',
        alt: 'Nike Air Max 90 SE - Top View',
        isPrimary: false
      },
      {
        id: 'img-7',
        url: '/shoes/shoe-13.avif',
        alt: 'Nike Air Max 90 SE - Profile View',
        isPrimary: false
      },
      {
        id: 'img-8',
        url: '/shoes/shoe-14.avif',
        alt: 'Nike Air Max 90 SE - Back View',
        isPrimary: false
      }
    ],
    colors: [
      {
        id: 'color-1',
        name: 'Dark Team Red/Rood/Platinum/White',
        slug: 'dark-team-red',
        hexCode: '#8B0000',
        images: [
          {
            id: 'red-img-1',
            url: '/shoes/shoe-8.avif',
            alt: 'Nike Air Max 90 SE - Dark Team Red',
            isPrimary: true
          },
          {
            id: 'red-img-2',
            url: '/shoes/shoe-7.avif',
            alt: 'Nike Air Max 90 SE - Dark Team Red Side',
            isPrimary: false
          }
        ]
      },
      {
        id: 'color-2',
        name: 'Light Silver/White',
        slug: 'light-silver',
        hexCode: '#C0C0C0',
        images: [
          {
            id: 'silver-img-1',
            url: '/shoes/shoe-9.avif',
            alt: 'Nike Air Max 90 SE - Light Silver',
            isPrimary: true
          }
        ]
      },
      {
        id: 'color-3',
        name: 'Black/White',
        slug: 'black-white',
        hexCode: '#000000',
        images: [
          {
            id: 'black-img-1',
            url: '/shoes/shoe-10.avif',
            alt: 'Nike Air Max 90 SE - Black',
            isPrimary: true
          }
        ]
      },
      {
        id: 'color-4',
        name: 'White/Light Gray',
        slug: 'white-gray',
        hexCode: '#FFFFFF',
        images: [
          {
            id: 'white-img-1',
            url: '/shoes/shoe-11.avif',
            alt: 'Nike Air Max 90 SE - White',
            isPrimary: true
          }
        ]
      },
      {
        id: 'color-5',
        name: 'Light Gray/White',
        slug: 'light-gray',
        hexCode: '#D3D3D3',
        images: [
          {
            id: 'gray-img-1',
            url: '/shoes/shoe-12.avif',
            alt: 'Nike Air Max 90 SE - Light Gray',
            isPrimary: true
          }
        ]
      },
      {
        id: 'color-6',
        name: 'Vintage',
        slug: 'vintage',
        hexCode: '#F5DEB3',
        images: [
          {
            id: 'vintage-img-1',
            url: '/shoes/shoe-13.avif',
            alt: 'Nike Air Max 90 SE - Vintage',
            isPrimary: true
          }
        ]
      }
    ],
    sizes: [
      { id: 'size-5', name: '5', slug: 'us-5', inStock: true },
      { id: 'size-5-5', name: '5.5', slug: 'us-5-5', inStock: true },
      { id: 'size-6', name: '6', slug: 'us-6', inStock: true },
      { id: 'size-6-5', name: '6.5', slug: 'us-6-5', inStock: true },
      { id: 'size-7', name: '7', slug: 'us-7', inStock: true },
      { id: 'size-7-5', name: '7.5', slug: 'us-7-5', inStock: true },
      { id: 'size-8', name: '8', slug: 'us-8', inStock: true },
      { id: 'size-8-5', name: '8.5', slug: 'us-8-5', inStock: true },
      { id: 'size-9', name: '9', slug: 'us-9', inStock: true },
      { id: 'size-9-5', name: '9.5', slug: 'us-9-5', inStock: false },
      { id: 'size-10', name: '10', slug: 'us-10', inStock: true },
      { id: 'size-10-5', name: '10.5', slug: 'us-10-5', inStock: false },
      { id: 'size-11', name: '11', slug: 'us-11', inStock: true }
    ],
    rating: 4.8,
    reviewCount: 10,
    features: [
      'Padded collar',
      'Foam midsole',
      'Shown: Dark Team Red/Rood/Platinum/White',
      'Style: HM8451-600'
    ],
    details: {
      style: 'HM8451-600',
      colorway: 'Dark Team Red/Rood/Platinum/White',
      materials: ['Leather', 'Synthetic', 'Rubber sole']
    },
    relatedProducts: [
      {
        id: 'product-1',
        name: 'Nike Air Force 1 Mid \'07',
        subtitle: 'Men\'s Shoes',
        price: 98.30,
        imageUrl: '/shoes/shoe-1.jpg',
        imageAlt: 'Nike Air Force 1 Mid \'07',
        badge: 'Best Seller',
        colors: ['6 Colours']
      },
      {
        id: 'product-2',
        name: 'Nike Court Vision Low Next Nature',
        subtitle: 'Men\'s Shoes',
        price: 98.30,
        imageUrl: '/shoes/shoe-2.webp',
        imageAlt: 'Nike Court Vision Low Next Nature',
        badge: 'Extra 20% off',
        colors: ['4 Colours']
      },
      {
        id: 'product-3',
        name: 'Nike Dunk Low Retro',
        subtitle: 'Men\'s Shoes',
        price: 98.30,
        imageUrl: '/shoes/shoe-3.webp',
        imageAlt: 'Nike Dunk Low Retro',
        badge: 'Extra 10% off',
        colors: ['8 Colours']
      }
    ]
  }
};

export function getProductDetails(id: string): ProductDetailsMock | null {
  return mockProductDetails[id] || null;
}