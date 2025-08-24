import { db } from './db';
import { products } from './db/schema';

const sampleNikeProducts = [
  {
    name: 'Nike Air Max 90',
    description: 'The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents.',
    price: '119.99',
    originalPrice: '129.99',
    brand: 'Nike',
    category: 'Sneakers',
    size: 'US 10',
    color: 'White/Black',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-max-90-mens-shoes-6n7J06.png',
    stock: 25,
  },
  {
    name: 'Nike Air Force 1 \'07',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best.',
    price: '109.99',
    originalPrice: '119.99',
    brand: 'Nike',
    category: 'Sneakers',
    size: 'US 9.5',
    color: 'Triple White',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f44d927-96ab-4f35-b8db-2ccdf7ac5929/air-force-1-07-mens-shoes-jBrhbr.png',
    stock: 30,
  },
  {
    name: 'Nike Dunk Low',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors.',
    price: '99.99',
    brand: 'Nike',
    category: 'Sneakers',
    size: 'US 11',
    color: 'Panda',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f1b0bf41-1d27-432c-acd8-9bb59e2b5ba3/dunk-low-mens-shoes-5SNKX2.png',
    stock: 20,
  },
  {
    name: 'Nike React Infinity Run Flyknit 3',
    description: 'A running shoe designed to help reduce injury and keep you on the run. More foam and improved upper details provide a secure and cushioned feel.',
    price: '159.99',
    brand: 'Nike',
    category: 'Running',
    size: 'US 10.5',
    color: 'Black/White',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/react-infinity-run-flyknit-3-mens-road-running-shoes-ZQzf7L.png',
    stock: 15,
  },
  {
    name: 'Nike Blazer Mid \'77 Vintage',
    description: 'In the \'70s, Nike was the new shoe on the block. So new in fact, we were still breaking some rules.',
    price: '99.99',
    originalPrice: '109.99',
    brand: 'Nike',
    category: 'Lifestyle',
    size: 'US 9',
    color: 'White/Black',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7db47b93-8737-4b44-8329-59c5fbbded36/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
    stock: 18,
  },
  {
    name: 'Nike Air Jordan 1 Low',
    description: 'Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that\'s familiar yet fresh.',
    price: '89.99',
    brand: 'Nike',
    category: 'Basketball',
    size: 'US 10',
    color: 'Bred Toe',
    imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f8dda191-4786-428a-9f09-103bb4948af2/air-jordan-1-low-shoes-zTWr0R.png',
    stock: 12,
  }
];

export async function seedDatabase() {
  try {
    console.log('Starting database seed...');
    
    // Insert sample products
    await db.insert(products).values(sampleNikeProducts);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}