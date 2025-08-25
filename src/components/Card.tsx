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
}: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const CardContent = () => (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative bg-light-200 rounded-lg overflow-hidden mb-4 aspect-square">
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`
              px-2 py-1 rounded-full text-footnote font-footnote
              ${
                badge === "Best Seller"
                  ? "bg-orange text-light-100"
                  : badge === "Just In"
                  ? "bg-green text-light-100"
                  : badge === "Sale"
                  ? "bg-red text-light-100"
                  : "bg-dark-900 text-light-100"
              }
            `}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Quick Actions Overlay - Appears on hover */}
        <div className="absolute inset-0 bg-dark-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="bg-light-100 text-dark-900 px-4 py-2 rounded-full text-caption font-caption hover:bg-dark-900 hover:text-light-100 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0">
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Category */}
        {category && (
          <p className="text-caption text-dark-500 font-caption uppercase tracking-wide">
            {category}
          </p>
        )}

        {/* Title */}
        <h3 className="text-body-medium font-body-medium text-dark-900 line-clamp-2 group-hover:text-dark-700 transition-colors duration-200">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-caption text-dark-700 font-caption">{subtitle}</p>
        )}

        {/* Description - Only show for featured variant */}
        {description && variant === "featured" && (
          <p className="text-body text-dark-700 line-clamp-3">{description}</p>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-caption text-dark-500 mr-2">Colors:</span>
            <div className="flex space-x-1">
              {colors.slice(0, 6).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-light-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {colors.length > 6 && (
                <span className="text-caption text-dark-500">
                  +{colors.length - 6}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-caption text-dark-500 mr-2">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {sizes.slice(0, 4).map((size, index) => (
                <span
                  key={index}
                  className="text-footnote text-dark-700 bg-light-200 px-1 py-0.5 rounded"
                >
                  {size}
                </span>
              ))}
              {sizes.length > 4 && (
                <span className="text-footnote text-dark-500">
                  +{sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-body-medium font-body-medium text-dark-900">
              ${price}
            </span>
            {originalPrice && originalPrice !== price && (
              <span className="text-body text-dark-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button - Only for product variant */}
        {variant === "product" && (
          <button className="w-full mt-4 bg-dark-900 text-light-100 py-2 px-4 rounded-full text-caption font-caption hover:bg-dark-700 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            Add to Cart
          </button>
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
