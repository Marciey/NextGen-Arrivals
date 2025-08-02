import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Truck, Shield, CreditCard } from 'lucide-react';

// This would normally come from your API
const featuredProducts = [
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
    category: 'Electronics',
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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-accent-400 mr-2" />
              <span className="text-accent-400 font-semibold">Premium Quality Products</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Discover Amazing
              <span className="block text-accent-400">Products</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-200 leading-relaxed">
              Shop the latest trends in electronics, accessories, and more. 
              Quality guaranteed with fast, secure delivery to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="btn-primary flex items-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/deals"
                className="btn-secondary"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Products
            </h2>
            <p className="text-primary-300 max-w-2xl mx-auto text-lg">
              Handpicked products for quality and value. Discover our most popular items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-primary-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Orderly Wares?
            </h2>
            <p className="text-primary-300 max-w-2xl mx-auto text-lg">
              We're committed to providing the best shopping experience with quality products and excellent service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-accent-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                <Truck className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Fast Delivery</h3>
              <p className="text-primary-300 leading-relaxed">
                Free shipping on orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-accent-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                <Shield className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Quality Guaranteed</h3>
              <p className="text-primary-300 leading-relaxed">
                All products are tested and verified for quality and authenticity.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-accent-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                <CreditCard className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Secure Payment</h3>
              <p className="text-primary-300 leading-relaxed">
                Your payment information is always safe and secure with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-primary-300 mb-8 text-lg">
            Subscribe to our newsletter for exclusive deals and product updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
