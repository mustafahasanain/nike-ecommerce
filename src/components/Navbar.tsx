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
    <nav className="bg-light-100 border-b border-light-300 sticky top-0 z-50">
      {/* Top banner - optional promotional strip */}
      <div className="bg-dark-900 text-light-100 text-center py-2">
        <p className="text-footnote font-footnote">
          Free shipping on orders over $50
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Nike Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={28}
                height={28}
                priority
                className="invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/men"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-body-medium transition-colors duration-200"
              >
                Men
              </Link>
              <Link
                href="/women"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-body-medium transition-colors duration-200"
              >
                Women
              </Link>
              <Link
                href="/kids"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-body-medium transition-colors duration-200"
              >
                Kids
              </Link>
              <Link
                href="/collections"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-body-medium transition-colors duration-200"
              >
                Collections
              </Link>
              <Link
                href="/contact"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-body-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side - Search, Cart, User */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <button
              type="button"
              className="text-dark-900 hover:text-dark-700 p-2 transition-colors duration-200"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart Icon with counter */}
            <Link
              href="/cart"
              className="text-dark-900 hover:text-dark-700 p-2 relative transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-1h18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              {/* Cart counter badge */}
              <span className="absolute -top-1 -right-1 bg-red text-light-100 rounded-full w-5 h-5 flex items-center justify-center text-footnote font-footnote">
                2
              </span>
            </Link>

            {/* User Account */}
            <button
              type="button"
              className="text-dark-900 hover:text-dark-700 p-2 transition-colors duration-200"
              aria-label="User account"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <Link
              href="/cart"
              className="text-dark-900 hover:text-dark-700 p-2 relative"
              aria-label="Shopping cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-1h18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red text-light-100 rounded-full w-5 h-5 flex items-center justify-center text-footnote font-footnote">
                2
              </span>
            </Link>

            {/* Hamburger button */}
            <button
              type="button"
              className="text-dark-900 hover:text-dark-700 inline-flex items-center justify-center p-2 transition-colors duration-200"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-light-100 border-t border-light-300">
            <Link
              href="/men"
              className="text-dark-900 hover:text-dark-700 block px-3 py-2 text-body font-body-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-dark-900 hover:text-dark-700 block px-3 py-2 text-body font-body-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/kids"
              className="text-dark-900 hover:text-dark-700 block px-3 py-2 text-body font-body-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Kids
            </Link>
            <Link
              href="/collections"
              className="text-dark-900 hover:text-dark-700 block px-3 py-2 text-body font-body-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-dark-900 hover:text-dark-700 block px-3 py-2 text-body font-body-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Search and User */}
            <div className="border-t border-light-300 pt-4 flex items-center justify-around">
              <button
                type="button"
                className="text-dark-900 hover:text-dark-700 p-2"
                aria-label="Search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="text-dark-900 hover:text-dark-700 p-2"
                aria-label="User account"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
