'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { state } = useCart();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-primary-900/95 backdrop-blur-sm border-b border-primary-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-accent-400 transition-colors">
            Orderly Wares
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-primary-300 hover:text-white transition-colors font-medium">
              Shop
            </Link>
            <Link href="/categories" className="text-primary-300 hover:text-white transition-colors font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-primary-300 hover:text-white transition-colors font-medium">
              Deals
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="text-primary-300 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="text-primary-300 hover:text-white transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-primary-300 hover:text-white transition-colors font-medium">
                  Admin
                </Link>
              )}
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-primary-300">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-primary-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin" className="text-primary-300 hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-900 border-t border-primary-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/wishlist"
                className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
              >
                Cart {state.itemCount > 0 && `(${state.itemCount})`}
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <div className="px-3 py-2 border-t border-primary-800">
                  <span className="block text-sm text-primary-300 mb-2">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-primary-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-primary-300 hover:text-white transition-colors"
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
