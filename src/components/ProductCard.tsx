import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    
    setIsAdding(true);
    
    try {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0] || 'https://via.placeholder.com/300x200',
        stock: product.stock,
      };
      
      addItem(cartItem);
      
      // Show success feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const currentQuantity = getItemQuantity(product._id);
  const inCart = isInCart(product._id);

  return (
    <div className="card group overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product._id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={product.images[0] || 'https://via.placeholder.com/300x200'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
        
        {/* Wishlist button */}
        <button className="absolute top-3 right-3 p-2 bg-primary-800/80 backdrop-blur-sm rounded-full text-primary-300 hover:text-accent-400 hover:bg-primary-700/80 transition-all duration-200">
          <Heart className="w-4 h-4" />
        </button>
        
        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-primary-800/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-accent-400 fill-current" />
          <span className="text-xs text-white font-medium">4.5</span>
        </div>

        {/* Cart indicator */}
        {inCart && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {currentQuantity} in cart
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-white mb-2 hover:text-accent-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-primary-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-accent-400">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 100 && (
              <span className="text-xs text-primary-400 line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          
          <span className="text-xs text-primary-400 bg-primary-700 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform font-medium ${
              inCart
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-accent-500 hover:bg-accent-600 text-white hover:scale-105'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              {isAdding 
                ? 'Adding...' 
                : inCart 
                  ? 'Added to Cart' 
                  : 'Add to Cart'
              }
            </span>
          </button>
        ) : (
          <div className="w-full bg-primary-700 text-primary-300 py-2 px-4 rounded-lg text-center font-medium">
            Out of Stock
          </div>
        )}
        
        <div className="mt-3 text-xs text-primary-400">
          {product.stock > 0 ? `${product.stock} left in stock` : 'Currently unavailable'}
        </div>
      </div>
    </div>
  );
}
