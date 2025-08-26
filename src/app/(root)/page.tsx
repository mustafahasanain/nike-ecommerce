"use client";

import { Card } from "@/components/index";

const Home = () => {
  const latestShoes = [
    {
      id: "1",
      title: "Air Max 270",
      subtitle: "Men's Shoes",
      price: "160",
      originalPrice: "200",
      imageUrl: "/shoes/shoe-1.jpg",
      imageAlt: "Air Max 270 Shoes",
      badge: "Just In",
      category: "Running",
      colors: ["black", "white", "red"],
      sizes: ["8", "9", "10", "11"],
    },
    {
      id: "2",
      title: "React Infinity Run",
      subtitle: "Women's Running Shoe",
      price: "160",
      imageUrl: "/shoes/shoe-2.webp",
      imageAlt: "React Infinity Run Shoes",
      badge: "Best Seller",
      category: "Running",
      colors: ["pink", "white", "gray"],
      sizes: ["7", "8", "9", "10"],
    },
    {
      id: "3",
      title: "Air Force 1",
      subtitle: "Men's Shoes",
      price: "90",
      imageUrl: "/shoes/shoe-3.webp",
      imageAlt: "Air Force 1 Shoes",
      category: "Lifestyle",
      colors: ["white", "black"],
      sizes: ["8", "9", "10", "11", "12"],
    },
    {
      id: "4",
      title: "Blazer Mid '77",
      subtitle: "Women's Shoes",
      price: "100",
      originalPrice: "120",
      imageUrl: "/shoes/shoe-4.webp",
      imageAlt: "Blazer Mid 77 Shoes",
      badge: "Sale",
      category: "Lifestyle",
      colors: ["white", "black", "blue"],
      sizes: ["6", "7", "8", "9"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-16">
        <h2 className="text-heading-2 font-jost mb-8">Latest Shoes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestShoes.map((shoe) => (
            <Card key={shoe.id} {...shoe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
