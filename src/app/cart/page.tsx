'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    setIsUpdating(id);
    try {
      updateQuantity(id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setTimeout(() => setIsUpdating(null), 500);
    }
  };

  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id);
    try {
      removeItem(id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setTimeout(() => setIsRemoving(null), 500);
    }
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  const subtotal = state.total;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-primary-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-primary-300 hover:text-accent-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
        </div>

        {state.items.length === 0 ? (
          <div className="card p-12 text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
            <p className="text-primary-300 mb-8">Add some amazing products to get started!</p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Cart Items ({state.itemCount})</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-primary-400 hover:text-red-400 transition-colors text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-primary-800 rounded-lg border border-primary-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-1">{item.name}</h3>
                          <p className="text-accent-400 font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-xs text-primary-400">Stock: {item.stock}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-primary-700 rounded-lg p-1">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating === item.id || item.quantity <= 1}
                              className="p-2 rounded-md hover:bg-primary-600 text-primary-300 hover:text-white transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-white font-medium">
                              {isUpdating === item.id ? '...' : item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id || item.quantity >= item.stock}
                              className="p-2 rounded-md hover:bg-primary-600 text-primary-300 hover:text-white transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isRemoving === item.id}
                            className="p-2 text-primary-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-primary-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary-300">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400' : ''}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-primary-700 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full btn-primary mt-6"
                >
                  Proceed to Checkout
                </button>
                {shipping > 0 && (
                  <p className="text-sm text-primary-300 mt-4 text-center">
                    Add <span className="text-accent-400 font-semibold">${(50 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                )}
                {shipping === 0 && (
                  <p className="text-sm text-green-400 mt-4 text-center">
                    ✓ Free shipping applied!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
