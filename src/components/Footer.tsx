import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Featured",
    links: ["Air Force 1", "Huarache", "Air Max 90", "Air Max 95"],
  },
  {
    title: "Shoes",
    links: ["All Shoes", "Custom Shoes", "Jordan Shoes", "Running Shoes"],
  },
  {
    title: "Clothing",
    links: [
      "All Clothing",
      "Modest Wear",
      "Hoodies & Pullovers",
      "Shirts & Tops",
    ],
  },
  {
    title: "Kids'",
    links: [
      "Infant & Toddler Shoes",
      "Kids' Shoes",
      "Kids' Jordan Shoes",
      "Kids' Basketball Shoes",
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* Nike Logo - Takes less space */}
          <div className="flex items-start md:col-span-2">
            <Image src="/logo.svg" alt="Nike" width={85} height={85} />
          </div>

          {/* Navigation Columns - Takes more space */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-base font-medium text-light-100">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-sm text-light-400 hover:text-light-100 transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Icons - Aligned to the right */}
          <div className="flex gap-4 md:col-span-2 md:justify-end">
            {[
              { src: "/x.svg", alt: "X" },
              { src: "/facebook.svg", alt: "Facebook" },
              { src: "/instagram.svg", alt: "Instagram" },
            ].map((s) => (
              <Link
                key={s.alt}
                href="#"
                aria-label={s.alt}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-light-100 hover:bg-light-200 transition-colors"
              >
                <Image src={s.src} alt={s.alt} width={18} height={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 text-light-400 sm:flex-row sm:items-center sm:px-6 lg:px-8 border-t border-gray-800 ">
        <div className="flex items-center gap-2 text-sm">
          <Image src="/globe.svg" alt="" width={16} height={16} />
          <span>Iraq</span>
          <span className="ml-4">© 2025 Nike, Inc. All Rights Reserved</span>
        </div>
        <ul className="flex items-center gap-6 text-sm">
          {[
            "Guides",
            "Terms of Sale",
            "Terms of Use",
            "Nike Privacy Policy",
          ].map((t) => (
            <li key={t}>
              <Link href="#" className="hover:text-light-100 transition-colors">
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
