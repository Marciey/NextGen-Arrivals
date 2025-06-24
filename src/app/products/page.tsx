'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';

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
  const [categories] = useState(['Electronics', 'Clothing', 'Books', 'Home', 'Sports']);

  // Sample products for demonstration
  useEffect(() => {
    // In a real app, this would fetch from your API
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life.',
        price: 199.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Electronics',
        stock: 10,
      },
      {
        _id: '2',
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
        price: 299.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Electronics',
        stock: 5,
      },
      {
        _id: '3',
        name: 'Laptop Stand',
        description: 'Ergonomic laptop stand for better productivity and posture.',
        price: 49.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Electronics',
        stock: 15,
      },
      {
        _id: '4',
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
        price: 24.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Clothing',
        stock: 20,
      },
      {
        _id: '5',
        name: 'Programming Book',
        description: 'Learn modern web development with this comprehensive guide.',
        price: 39.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Books',
        stock: 8,
      },
      {
        _id: '6',
        name: 'Coffee Mug',
        description: 'Premium ceramic coffee mug with insulated design.',
        price: 14.99,
        images: ['https://via.placeholder.com/300x200'],
        category: 'Home',
        stock: 25,
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

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add to cart state/context
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
