"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Nike Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={55}
                height={55}
                priority
                className="invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/men"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-semibold  transition-colors duration-200"
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-semibold  transition-colors duration-200"
            >
              Women
            </Link>
            <Link
              href="/kids"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-semibold  transition-colors duration-200"
            >
              Kids
            </Link>
            <Link
              href="/collections"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-semibold  transition-colors duration-200"
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-semibold  transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right side - Search and Cart as text */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              type="button"
              className="text-gray-900 hover:text-gray-700 text-base font-semibold  transition-colors duration-200"
              aria-label="Search"
            >
              Search
            </button>

            <Link
              href="/cart"
              className="text-gray-900 hover:text-gray-700 text-base font-semibold  transition-colors duration-200"
              aria-label="Shopping cart"
            >
              My Cart (2)
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <Link
              href="/cart"
              className="text-gray-900 hover:text-gray-700 text-sm font-medium"
              aria-label="Shopping cart"
            >
              Cart (2)
            </Link>

            {/* Hamburger button */}
            <button
              type="button"
              className="text-gray-900 hover:text-gray-700 inline-flex items-center justify-center p-2 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/men"
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/kids"
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Kids
            </Link>
            <Link
              href="/collections"
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Search */}
            <div className="border-t border-gray-200 pt-4">
              <button
                type="button"
                className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium w-full text-left"
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
