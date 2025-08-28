import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  imageUrl: string;
  imageAlt: string;
  badge?: "Best Seller" | "Just In" | "Sale" | string;
  category?: string;
  colors?: string[];
  sizes?: string[];
  href?: string;
  onClick?: () => void;
  variant?: "product" | "collection" | "featured";
  className?: string;
  backgroundColor?: string;
}

export default function Card({
  id,
  title,
  subtitle,
  description,
  price,
  originalPrice,
  imageUrl,
  imageAlt,
  badge,
  category,
  colors = [],
  sizes = [],
  href,
  onClick,
  variant = "product",
  className = "",
  backgroundColor,
}: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Define background colors for variety
  const getBackgroundColor = (index?: number) => {
    if (backgroundColor) return backgroundColor;

    // Use a consistent default background color to avoid hydration mismatch
    return "bg-gray-200";
  };

  const CardContent = () => (
    <div
      className={`group cursor-pointer transition-all duration-300 bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md ${className}`}
      {...(onClick && !href ? { onClick: handleClick } : {})}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden aspect-square ${getBackgroundColor()}`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-orange-500 text-white px-3 py-1 text-sm font-medium rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price Row */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-medium text-black leading-tight flex-1 pr-2">
            {title}
          </h3>
          {price && (
            <span className="text-base font-medium text-black whitespace-nowrap">
              ${price}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && <p className="text-gray-500 text-sm mb-1">{subtitle}</p>}

        {/* Colors */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1 mb-1">
            {colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ 
                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                  color.toLowerCase() === 'black' ? '#000000' :
                                  color.toLowerCase() === 'red' ? '#DC2626' :
                                  color.toLowerCase() === 'blue' ? '#2563EB' :
                                  color.toLowerCase() === 'green' ? '#16A34A' :
                                  color.toLowerCase() === 'gray' || color.toLowerCase() === 'grey' ? '#6B7280' :
                                  color.toLowerCase() === 'orange' ? '#EA580C' :
                                  color.toLowerCase() === 'yellow' ? '#FBBF24' :
                                  color.toLowerCase() === 'navy' ? '#1E3A8A' :
                                  color.toLowerCase() === 'brown' ? '#A16207' :
                                  '#6B7280'
                }}
                title={color}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-gray-500 ml-1">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Wrap with Link if href is provided
  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}

// Specialized Card variants for common use cases
export function ProductCard(props: Omit<CardProps, "variant">) {
  return <Card {...props} variant="product" />;
}

export function CollectionCard(props: Omit<CardProps, "variant">) {
  return <Card {...props} variant="collection" />;
}

export function FeaturedCard(props: Omit<CardProps, "variant">) {
  return <Card {...props} variant="featured" />;
}

// Example usage component showing the grid layout
export function ProductGrid() {
  const products = [
    {
      id: "1",
      title: "Air Max Pulse",
      subtitle: "Men's Shoes",
      price: "149.99",
      colors: ["Blue", "White", "Navy", "Orange", "Gray", "Black"],
      imageUrl: "/air-max-pulse.jpg",
      imageAlt: "Air Max Pulse",
      backgroundColor: "bg-gray-200",
    },
    {
      id: "2",
      title: "Air Zoom Pegasus",
      subtitle: "Men's Shoes",
      price: "129.99",
      colors: ["Orange", "Red", "Black", "White"],
      imageUrl: "/air-zoom-pegasus.jpg",
      imageAlt: "Air Zoom Pegasus",
      backgroundColor: "bg-slate-700",
    },
    {
      id: "3",
      title: "InfinityRN 4",
      subtitle: "Men's Shoes",
      price: "159.99",
      colors: ["White", "Gray", "Brown", "Black", "Navy", "Green"],
      imageUrl: "/infinity-rn-4.jpg",
      imageAlt: "InfinityRN 4",
      backgroundColor: "bg-gray-100",
    },
    {
      id: "4",
      title: "Metcon 9",
      subtitle: "Men's Shoes",
      price: "139.99",
      colors: ["Black", "Red", "Gray"],
      imageUrl: "/metcon-9.jpg",
      imageAlt: "Metcon 9",
      backgroundColor: "bg-gray-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
}
