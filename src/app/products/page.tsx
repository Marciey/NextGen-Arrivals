'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories] = useState(['Electronics', 'Accessories', 'Gaming', 'Smart Home', 'Audio']);

  // Sample products for demonstration
  useEffect(() => {
    // In a real app, this would fetch from your API
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with active noise cancellation and premium sound quality',
        price: 199.99,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'],
        category: 'Electronics',
        stock: 10,
      },
      {
        _id: '2',
        name: 'Smart Fitness Watch',
        description: 'Advanced smartwatch with health monitoring and fitness tracking capabilities',
        price: 299.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'],
        category: 'Electronics',
        stock: 5,
      },
      {
        _id: '3',
        name: 'Ergonomic Laptop Stand',
        description: 'Adjustable laptop stand for better posture and productivity',
        price: 49.99,
        images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'],
        category: 'Accessories',
        stock: 15,
      },
      {
        _id: '4',
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
        price: 29.99,
        images: ['https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=300&fit=crop'],
        category: 'Electronics',
        stock: 20,
      },
      {
        _id: '5',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design',
        price: 79.99,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'],
        category: 'Audio',
        stock: 8,
      },
      {
        _id: '6',
        name: 'Mechanical Keyboard',
        description: 'Premium mechanical keyboard with customizable RGB lighting',
        price: 129.99,
        images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop'],
        category: 'Accessories',
        stock: 12,
      },
      {
        _id: '7',
        name: 'Gaming Mouse',
        description: 'High-precision gaming mouse with customizable DPI and RGB lighting',
        price: 59.99,
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'],
        category: 'Gaming',
        stock: 18,
      },
      {
        _id: '8',
        name: 'Smart Home Hub',
        description: 'Central hub for controlling all your smart home devices',
        price: 149.99,
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'],
        category: 'Smart Home',
        stock: 6,
      },
    ];

    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
          <p className="text-primary-300 text-lg">Discover our amazing collection of premium products</p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field w-full pl-10 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <select
                  className="input-field w-full pl-10 pr-4"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-primary-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-accent-500 text-white' 
                    : 'text-primary-300 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-accent-500 text-white' 
                    : 'text-primary-300 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-primary-300">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-primary-800 rounded-lg p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-primary-300">
                Try adjusting your search criteria or browse all categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
