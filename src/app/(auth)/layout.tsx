import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nike - Authentication",
  description: "Sign in to your Nike account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Section */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-16 xl:px-20 bg-black relative overflow-hidden">
        {/* Nike Logo */}
        <div className="absolute top-12 left-12">
          <div className="w-16 h-16 bg-orange rounded-lg flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={32}
              height={32}
              className="text-white"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center flex-1">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Just Do It
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs
          </p>

          {/* Three dots pagination */}
          <div className="flex space-x-2 mb-8">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Rights text at bottom */}
        <div className="absolute bottom-8 left-16 text-white/60 text-sm">
          © 2025 Nike, Inc. All Rights Reserved
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="flex-1 flex flex-col justify-center py-12 px-8 bg-white">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
