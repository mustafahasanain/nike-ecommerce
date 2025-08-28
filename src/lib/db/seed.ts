import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import {
  genders,
  colors,
  sizes,
  brands,
  categories,
  collections,
  products,
  productVariants,
  productImages,
  productCollections,
} from './schema';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
const db = drizzle(sql);

const NIKE_PRODUCTS = [
  {
    name: "Air Jordan 1 Retro High OG",
    description: "The Air Jordan 1 Retro High OG brings back the original colorway that started it all. Premium leather upper and Air-Sole unit for comfort.",
    category: "basketball",
    gender: "unisex",
    colors: ["black", "red", "white"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    basePrice: 170.00,
  },
  {
    name: "Air Force 1 '07",
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
    category: "lifestyle",
    gender: "unisex",
    colors: ["white", "black", "navy"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 110.00,
  },
  {
    name: "Air Max 90",
    description: "Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots.",
    category: "running",
    gender: "unisex",
    colors: ["white", "gray", "black", "blue"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 130.00,
  },
  {
    name: "React Infinity Run Flyknit 3",
    description: "A comfortable, secure and soft running shoe designed to help reduce injury and keep you on the run.",
    category: "running",
    gender: "men",
    colors: ["black", "gray", "blue"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    basePrice: 160.00,
  },
  {
    name: "Air Zoom Pegasus 39",
    description: "A responsive Zoom Air unit in the forefoot returns energy with every step for a bouncy feel.",
    category: "running",
    gender: "women",
    colors: ["pink", "white", "gray"],
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    basePrice: 130.00,
  },
  {
    name: "SB Dunk Low Pro",
    description: "Created for the hardwood but taken to the streets, the basketball icon returns with perfectly aged details.",
    category: "skateboarding",
    gender: "unisex",
    colors: ["white", "black", "green"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 100.00,
  },
  {
    name: "Blazer Mid '77",
    description: "The Nike Blazer Mid '77 delivers a vintage look with modern comfort and durability.",
    category: "lifestyle",
    gender: "unisex",
    colors: ["white", "black", "navy"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 100.00,
  },
  {
    name: "Air Max 270",
    description: "The Air Max 270 delivers visible heel Air cushioning and lightweight, durable construction.",
    category: "lifestyle",
    gender: "unisex",
    colors: ["black", "white", "red"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 150.00,
  },
  {
    name: "Metcon 8",
    description: "We improved on the 7 by increasing the rubber wrap up the sides for even more durability and traction.",
    category: "training",
    gender: "unisex",
    colors: ["black", "white", "blue"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 130.00,
  },
  {
    name: "Free RN 5.0",
    description: "The Nike Free RN 5.0 takes a minimalist approach to your run with an updated Flyknit upper.",
    category: "running",
    gender: "men",
    colors: ["black", "gray", "blue"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    basePrice: 100.00,
  },
  {
    name: "Air Huarache",
    description: "Designed for comfort, the Nike Air Huarache features a sock-like fit and lightweight cushioning.",
    category: "lifestyle",
    gender: "unisex",
    colors: ["white", "black", "gray"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 120.00,
  },
  {
    name: "Zoom Freak 4",
    description: "Giannis' off-the-court family time is just as important to him as dominating the competition.",
    category: "basketball",
    gender: "unisex",
    colors: ["green", "black", "white"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    basePrice: 120.00,
  },
  {
    name: "Court Vision Low",
    description: "Styled to look like a basketball icon from the '80s, the Nike Court Vision Low has crisp leather.",
    category: "lifestyle",
    gender: "unisex",
    colors: ["white", "black"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 75.00,
  },
  {
    name: "Revolution 6",
    description: "The Nike Revolution 6 continues to evolve for a soft, smooth ride that's comfortable and familiar.",
    category: "running",
    gender: "unisex",
    colors: ["black", "gray", "white"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    basePrice: 65.00,
  },
  {
    name: "Dri-FIT ADV TechKnit Ultra",
    description: "Made with Nike Dri-FIT ADV technology, this running shirt combines moisture-wicking fabric.",
    category: "running",
    gender: "men",
    colors: ["black", "blue", "gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    basePrice: 80.00,
  },
];

async function copyImages() {
  const publicPath = path.join(process.cwd(), 'public', 'shoes');
  const staticPath = path.join(process.cwd(), 'public', 'static', 'uploads');
  
  if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(staticPath, { recursive: true });
  }

  const imageFiles = fs.readdirSync(publicPath);
  
  for (const file of imageFiles) {
    const sourcePath = path.join(publicPath, file);
    const destPath = path.join(staticPath, file);
    
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${file} to static/uploads/`);
    }
  }
  
  return imageFiles;
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    // Copy images
    console.log('📁 Copying images...');
    const imageFiles = await copyImages();

    // Seed genders
    console.log('👫 Seeding genders...');
    const [menGender, womenGender, unisexGender] = await db.insert(genders).values([
      { label: 'Men', slug: 'men' },
      { label: 'Women', slug: 'women' },
      { label: 'Unisex', slug: 'unisex' },
    ]).returning();

    // Seed colors
    console.log('🎨 Seeding colors...');
    const colorData = [
      { name: 'Black', slug: 'black', hexCode: '#000000' },
      { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
      { name: 'Red', slug: 'red', hexCode: '#FF0000' },
      { name: 'Blue', slug: 'blue', hexCode: '#0000FF' },
      { name: 'Gray', slug: 'gray', hexCode: '#808080' },
      { name: 'Green', slug: 'green', hexCode: '#008000' },
      { name: 'Navy', slug: 'navy', hexCode: '#000080' },
      { name: 'Pink', slug: 'pink', hexCode: '#FFC0CB' },
    ];
    const insertedColors = await db.insert(colors).values(colorData).returning();

    // Seed sizes
    console.log('📏 Seeding sizes...');
    const sizeData = [
      { name: '5', slug: '5', sortOrder: 5 },
      { name: '6', slug: '6', sortOrder: 6 },
      { name: '7', slug: '7', sortOrder: 7 },
      { name: '8', slug: '8', sortOrder: 8 },
      { name: '9', slug: '9', sortOrder: 9 },
      { name: '10', slug: '10', sortOrder: 10 },
      { name: '11', slug: '11', sortOrder: 11 },
      { name: '12', slug: '12', sortOrder: 12 },
      { name: '13', slug: '13', sortOrder: 13 },
      { name: 'S', slug: 's', sortOrder: 1 },
      { name: 'M', slug: 'm', sortOrder: 2 },
      { name: 'L', slug: 'l', sortOrder: 3 },
      { name: 'XL', slug: 'xl', sortOrder: 4 },
      { name: 'XXL', slug: 'xxl', sortOrder: 5 },
    ];
    const insertedSizes = await db.insert(sizes).values(sizeData).returning();

    // Seed brands
    console.log('🏷️ Seeding brands...');
    const [nikeBrand] = await db.insert(brands).values([
      { name: 'Nike', slug: 'nike', logoUrl: '/logo.svg' },
    ]).returning();

    // Seed categories
    console.log('📂 Seeding categories...');
    const categoryData = [
      { name: 'Running', slug: 'running' },
      { name: 'Basketball', slug: 'basketball' },
      { name: 'Lifestyle', slug: 'lifestyle' },
      { name: 'Training', slug: 'training' },
      { name: 'Skateboarding', slug: 'skateboarding' },
    ];
    const insertedCategories = await db.insert(categories).values(categoryData).returning();

    // Seed collections
    console.log('📦 Seeding collections...');
    const collectionData = [
      { name: "Winter '24", slug: 'winter-24' },
      { name: "Spring Essentials", slug: 'spring-essentials' },
      { name: "Performance Pack", slug: 'performance-pack' },
    ];
    const insertedCollections = await db.insert(collections).values(collectionData).returning();

    // Create lookup maps
    const genderMap = {
      men: menGender.id,
      women: womenGender.id,
      unisex: unisexGender.id,
    };

    const colorMap = Object.fromEntries(
      insertedColors.map(color => [color.slug, color.id])
    );

    const sizeMap = Object.fromEntries(
      insertedSizes.map(size => [size.slug, size.id])
    );

    const categoryMap = Object.fromEntries(
      insertedCategories.map(cat => [cat.slug, cat.id])
    );

    // Seed products and variants
    console.log('👟 Seeding products and variants...');
    let imageIndex = 0;
    
    for (const productData of NIKE_PRODUCTS) {
      // Insert product
      const [product] = await db.insert(products).values({
        name: productData.name,
        description: productData.description,
        categoryId: categoryMap[productData.category],
        genderId: genderMap[productData.gender as keyof typeof genderMap],
        brandId: nikeBrand.id,
        isPublished: true,
      }).returning();

      // Create variants
      const variants = [];
      for (const colorSlug of productData.colors) {
        for (const sizeSlug of productData.sizes) {
          const colorId = colorMap[colorSlug];
          const sizeId = sizeMap[sizeSlug];
          
          if (!colorId || !sizeId) continue;

          const priceVariation = Math.random() * 20 - 10; // ±$10 variation
          const finalPrice = Math.max(productData.basePrice + priceVariation, 50);
          const hasSale = Math.random() < 0.3; // 30% chance of sale
          const salePrice = hasSale ? finalPrice * (0.7 + Math.random() * 0.2) : null; // 70-90% of original

          const [variant] = await db.insert(productVariants).values({
            productId: product.id,
            sku: `${product.name.replace(/\s+/g, '-').toLowerCase()}-${colorSlug}-${sizeSlug}`.substring(0, 90),
            price: finalPrice.toFixed(2),
            salePrice: salePrice?.toFixed(2) || null,
            colorId,
            sizeId,
            inStock: Math.floor(Math.random() * 50) + 1, // 1-50 in stock
            weight: 1.2 + Math.random() * 0.8, // 1.2-2.0 lbs
            dimensions: {
              length: 12 + Math.random() * 2,
              width: 4.5 + Math.random(),
              height: 5 + Math.random(),
            },
          }).returning();

          variants.push(variant);
        }
      }

      // Set default variant
      if (variants.length > 0) {
        await db.update(products).set({
          defaultVariantId: variants[0].id
        }).where(eq(products.id, product.id));
      }

      // Add product images
      const productImageCount = Math.min(3, imageFiles.length - imageIndex);
      for (let i = 0; i < productImageCount && imageIndex < imageFiles.length; i++) {
        await db.insert(productImages).values({
          productId: product.id,
          variantId: i < variants.length ? variants[i].id : null,
          url: `/static/uploads/${imageFiles[imageIndex]}`,
          sortOrder: i,
          isPrimary: i === 0,
        });
        imageIndex++;
      }

      // Randomly assign to collections
      const collectionsToAssign = insertedCollections
        .filter(() => Math.random() < 0.4) // 40% chance per collection
        .slice(0, 2); // Max 2 collections per product

      for (const collection of collectionsToAssign) {
        await db.insert(productCollections).values({
          productId: product.id,
          collectionId: collection.id,
        });
      }

      console.log(`✅ Created product: ${product.name} with ${variants.length} variants`);
    }

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Summary:
    - ${NIKE_PRODUCTS.length} products created
    - ${insertedColors.length} colors
    - ${insertedSizes.length} sizes  
    - ${insertedCategories.length} categories
    - ${insertedCollections.length} collections
    - Images: ${imageFiles.length} files copied`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDatabase };