'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            E-Store
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600">
              Products
            </Link>
            {session?.user.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">
                Admin
              </Link>
            )}
            <Link href="/cart" className="text-gray-700 hover:text-primary-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hello, {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-primary-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-gray-700 hover:text-primary-600">
                <User className="w-6 h-6" />
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                Products
              </Link>
              {session?.user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/cart"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                Cart
              </Link>
              {session ? (
                <div className="px-3 py-2">
                  <span className="block text-sm text-gray-700 mb-2">
                    Hello, {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-primary-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
