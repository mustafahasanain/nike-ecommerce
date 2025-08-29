'use server';

import { db } from '@/lib/db';
import { products, productImages, productVariants, categories, brands, genders, colors, sizes } from '@/lib/db/schema';
import { eq, and, like, gte, lte, inArray, sql, desc, asc, type SQLWrapper } from 'drizzle-orm';

export interface ProductFilters {
  search?: string;
  category?: string[];
  brand?: string[];
  gender?: string[];
  color?: string[];
  size?: string[];
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'latest' | 'featured';
  page?: number;
  limit?: number;
}

export interface ProductWithDetails {
  id: string;
  name: string;
  description: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  gender: {
    id: string;
    label: string;
    slug: string;
  };
  minPrice: number;
  maxPrice: number;
  images: Array<{
    id: string;
    url: string;
    sortOrder: number;
    isPrimary: boolean;
    variantId?: string | null;
  }>;
  colors: string[];
}

export interface ProductDetailsWithVariants extends ProductWithDetails {
  variants: Array<{
    id: string;
    sku: string;
    price: number;
    salePrice: number | null;
    inStock: number;
    color: {
      id: string;
      name: string;
      slug: string;
      hexCode: string;
    };
    size: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

export interface ProductsResult {
  products: ProductWithDetails[];
  totalCount: number;
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<ProductsResult> {
  const {
    search,
    category,
    brand,
    gender,
    color,
    size,
    priceMin,
    priceMax,
    sortBy = 'featured',
    page = 1,
    limit = 12
  } = filters;

  const offset = (page - 1) * limit;

  // Step 1: Build minimal query to get filtered product IDs with sorting
  const productConditions = [eq(products.isPublished, true)];

  // Basic product filters
  if (search) {
    productConditions.push(like(products.name, `%${search}%`));
  }
  if (category && category.length > 0) {
    productConditions.push(inArray(categories.slug, category));
  }
  if (brand && brand.length > 0) {
    productConditions.push(inArray(brands.slug, brand));
  }
  if (gender && gender.length > 0) {
    productConditions.push(inArray(genders.slug, gender));
  }

  // Build variant-based filters subquery if needed
  let variantFilteredProductIds: string[] | null = null;
  if (color?.length || size?.length || priceMin !== undefined || priceMax !== undefined) {
    const variantConditions: SQLWrapper[] = [];
    if (color && color.length > 0) {
      variantConditions.push(inArray(colors.slug, color));
    }
    if (size && size.length > 0) {
      variantConditions.push(inArray(sizes.slug, size));
    }
    if (priceMin) {
      variantConditions.push(gte(productVariants.price, priceMin.toString()));
    }
    if (priceMax) {
      variantConditions.push(lte(productVariants.price, priceMax.toString()));
    }

    const variantFilterQuery = db
      .selectDistinct({ productId: productVariants.productId })
      .from(productVariants)
      .leftJoin(colors, eq(productVariants.colorId, colors.id))
      .leftJoin(sizes, eq(productVariants.sizeId, sizes.id))
      .where(and(...variantConditions));

    variantFilteredProductIds = (await variantFilterQuery).map(r => r.productId);
    
    if (variantFilteredProductIds.length === 0) {
      return { products: [], totalCount: 0 };
    }
  }

  // Add variant filter to product conditions
  if (variantFilteredProductIds) {
    productConditions.push(inArray(products.id, variantFilteredProductIds));
  }

  // Build main products query with minimal joins and sorting
  const baseQueryBuilder = db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      isPublished: products.isPublished,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,
      brandId: brands.id,
      brandName: brands.name,
      brandSlug: brands.slug,
      genderId: genders.id,
      genderLabel: genders.label,
      genderSlug: genders.slug,
      // For price sorting, we need to join variants
      minPrice: sql<number>`MIN(${productVariants.price})`.as('minPrice'),
      maxPrice: sql<number>`MAX(${productVariants.price})`.as('maxPrice'),
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(genders, eq(products.genderId, genders.id))
    .leftJoin(productVariants, eq(products.id, productVariants.productId))
    .where(and(...productConditions))
    .groupBy(products.id, categories.id, brands.id, genders.id);

  // Apply sorting in the query
  let baseQuery;
  switch (sortBy) {
    case 'price_asc':
      baseQuery = baseQueryBuilder.orderBy(asc(sql`MIN(${productVariants.price})`));
      break;
    case 'price_desc':
      baseQuery = baseQueryBuilder.orderBy(desc(sql`MAX(${productVariants.price})`));
      break;
    case 'latest':
      baseQuery = baseQueryBuilder.orderBy(desc(products.createdAt));
      break;
    case 'featured':
    default:
      // Default sort: created_at DESC as per requirements
      baseQuery = baseQueryBuilder.orderBy(desc(products.createdAt));
      break;
  }

  // Get total count before pagination
  const countQuery = db
    .select({ count: sql<number>`COUNT(DISTINCT ${products.id})`.as('count') })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(genders, eq(products.genderId, genders.id))
    .where(and(...productConditions));

  // Execute count and paginated products queries
  const [countResult, productsData] = await Promise.all([
    countQuery,
    baseQuery.limit(limit).offset(offset)
  ]);

  const totalCount = countResult[0]?.count || 0;

  if (productsData.length === 0) {
    return { products: [], totalCount };
  }

  // Step 2: Get colors and images for the paginated products
  const productIds = productsData.map(p => p.id);

  // Get colors for products
  const colorsQuery = db
    .select({
      productId: productVariants.productId,
      colorName: colors.name,
    })
    .from(productVariants)
    .leftJoin(colors, eq(productVariants.colorId, colors.id))
    .where(inArray(productVariants.productId, productIds))
    .groupBy(productVariants.productId, colors.name);

  // Get images for products (color-specific or generic based on filter)
  let imagesQuery;
  if (color && color.length > 0) {
    // Get color-specific images
    imagesQuery = db
      .select({
        productId: productImages.productId,
        imageId: productImages.id,
        imageUrl: productImages.url,
        imageSortOrder: productImages.sortOrder,
        imageIsPrimary: productImages.isPrimary,
        imageVariantId: productImages.variantId,
      })
      .from(productImages)
      .leftJoin(productVariants, eq(productImages.variantId, productVariants.id))
      .leftJoin(colors, eq(productVariants.colorId, colors.id))
      .where(and(
        inArray(productImages.productId, productIds),
        inArray(colors.slug, color)
      ))
      .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));
  } else {
    // Get generic images
    imagesQuery = db
      .select({
        productId: productImages.productId,
        imageId: productImages.id,
        imageUrl: productImages.url,
        imageSortOrder: productImages.sortOrder,
        imageIsPrimary: productImages.isPrimary,
        imageVariantId: productImages.variantId,
      })
      .from(productImages)
      .where(and(
        inArray(productImages.productId, productIds),
        sql`${productImages.variantId} IS NULL`
      ))
      .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));
  }

  // Execute color and image queries in parallel
  const [colorsData, imagesData] = await Promise.all([
    colorsQuery,
    imagesQuery
  ]);

  // Group data by product
  const colorsByProduct = colorsData.reduce((acc, row) => {
    if (!acc[row.productId]) acc[row.productId] = new Set();
    if (row.colorName) acc[row.productId].add(row.colorName);
    return acc;
  }, {} as Record<string, Set<string>>);

  const imagesByProduct = imagesData.reduce((acc, row) => {
    if (!acc[row.productId]) acc[row.productId] = [];
    acc[row.productId].push({
      id: row.imageId,
      url: row.imageUrl,
      sortOrder: row.imageSortOrder || 0,
      isPrimary: row.imageIsPrimary || false,
      variantId: row.imageVariantId,
    });
    return acc;
  }, {} as Record<string, Array<{
    id: string;
    url: string;
    sortOrder: number;
    isPrimary: boolean;
    variantId: string | null;
  }>>);

  // Combine all data
  const enhancedProducts: ProductWithDetails[] = productsData
    .filter(product => product.categoryId && product.brandId && product.genderId)
    .map(product => ({
      id: product.id,
      name: product.name || '',
      description: product.description,
      isPublished: product.isPublished || false,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      category: {
        id: product.categoryId!,
        name: product.categoryName || '',
        slug: product.categorySlug || '',
      },
      brand: {
        id: product.brandId!,
        name: product.brandName || '',
        slug: product.brandSlug || '',
      },
      gender: {
        id: product.genderId!,
        label: product.genderLabel || '',
        slug: product.genderSlug || '',
      },
      minPrice: product.minPrice || 0,
      maxPrice: product.maxPrice || 0,
      colors: Array.from(colorsByProduct[product.id] || []),
      images: imagesByProduct[product.id] || [],
    }));

  return {
    products: enhancedProducts,
    totalCount,
  };
}

export async function getProduct(productId: string): Promise<ProductDetailsWithVariants | null> {
  // Single comprehensive query with all relations
  const rawData = await db
    .select({
      // Product data
      productId: products.id,
      productName: products.name,
      productDescription: products.description,
      productIsPublished: products.isPublished,
      productCreatedAt: products.createdAt,
      productUpdatedAt: products.updatedAt,
      // Category data
      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,
      // Brand data
      brandId: brands.id,
      brandName: brands.name,
      brandSlug: brands.slug,
      // Gender data
      genderId: genders.id,
      genderLabel: genders.label,
      genderSlug: genders.slug,
      // Variant data
      variantId: productVariants.id,
      variantSku: productVariants.sku,
      variantPrice: productVariants.price,
      variantSalePrice: productVariants.salePrice,
      variantInStock: productVariants.inStock,
      // Color data
      colorId: colors.id,
      colorName: colors.name,
      colorSlug: colors.slug,
      colorHexCode: colors.hexCode,
      // Size data
      sizeId: sizes.id,
      sizeName: sizes.name,
      sizeSlug: sizes.slug,
      // Image data
      imageId: productImages.id,
      imageUrl: productImages.url,
      imageSortOrder: productImages.sortOrder,
      imageIsPrimary: productImages.isPrimary,
      imageVariantId: productImages.variantId,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(genders, eq(products.genderId, genders.id))
    .leftJoin(productVariants, eq(products.id, productVariants.productId))
    .leftJoin(colors, eq(productVariants.colorId, colors.id))
    .leftJoin(sizes, eq(productVariants.sizeId, sizes.id))
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .where(eq(products.id, productId));

  if (!rawData.length) {
    return null;
  }

  // Get basic product info from first row
  const firstRow = rawData[0];
  if (!firstRow.productId || !firstRow.categoryId || !firstRow.brandId || !firstRow.genderId) {
    return null;
  }

  const productDetails = {
    id: firstRow.productId,
    name: firstRow.productName || '',
    description: firstRow.productDescription,
    isPublished: firstRow.productIsPublished || false,
    createdAt: firstRow.productCreatedAt,
    updatedAt: firstRow.productUpdatedAt,
    category: {
      id: firstRow.categoryId,
      name: firstRow.categoryName || '',
      slug: firstRow.categorySlug || '',
    },
    brand: {
      id: firstRow.brandId,
      name: firstRow.brandName || '',
      slug: firstRow.brandSlug || '',
    },
    gender: {
      id: firstRow.genderId,
      label: firstRow.genderLabel || '',
      slug: firstRow.genderSlug || '',
    },
  };

  // Process variants
  const variantMap = new Map();
  const imageMap = new Map();

  rawData.forEach(row => {
    // Process variants
    if (row.variantId && row.colorId && row.sizeId) {
      if (!variantMap.has(row.variantId)) {
        variantMap.set(row.variantId, {
          id: row.variantId,
          sku: row.variantSku || '',
          price: parseFloat(row.variantPrice || '0'),
          salePrice: row.variantSalePrice ? parseFloat(row.variantSalePrice) : null,
          inStock: row.variantInStock || 0,
          color: {
            id: row.colorId,
            name: row.colorName || '',
            slug: row.colorSlug || '',
            hexCode: row.colorHexCode || '',
          },
          size: {
            id: row.sizeId,
            name: row.sizeName || '',
            slug: row.sizeSlug || '',
          },
        });
      }
    }

    // Process images
    if (row.imageId && row.imageUrl) {
      if (!imageMap.has(row.imageId)) {
        imageMap.set(row.imageId, {
          id: row.imageId,
          url: row.imageUrl,
          sortOrder: row.imageSortOrder || 0,
          isPrimary: row.imageIsPrimary || false,
          variantId: row.imageVariantId,
        });
      }
    }
  });

  const variants = Array.from(variantMap.values());
  const images = Array.from(imageMap.values()).sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  // Calculate price range and unique colors
  const prices = variants.map(v => v.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const uniqueColors = [...new Set(variants.map(v => v.color.name))];

  return {
    ...productDetails,
    minPrice,
    maxPrice,
    colors: uniqueColors,
    images,
    variants,
  };
}