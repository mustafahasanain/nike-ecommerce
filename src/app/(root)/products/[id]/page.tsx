import { notFound } from 'next/navigation';
import { getProductDetails } from '@/lib/product-details-mock';
import ProductPageClient from '@/components/ProductPageClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductDetails(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductDetails(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - ${product.subtitle} | Nike`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${product.subtitle}`,
      description: product.description,
      images: product.images.filter(img => img.isPrimary).map(img => ({
        url: img.url,
        alt: img.alt,
      })),
    },
  };
}