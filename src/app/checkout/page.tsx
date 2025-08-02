'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const subtotal = state.total;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would integrate with Stripe or another payment processor
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order in database
      const orderData = {
        user_id: 'user-id', // This would come from auth
        status: 'pending',
        total: total,
        items: state.items,
        shipping_address: shippingAddress,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        setStep('confirmation');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Order Confirmed!</h2>
          <p className="text-primary-300 mb-6">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-primary-300 hover:text-accent-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  step === 'shipping' ? 'bg-accent-500 text-white' : 'bg-primary-700 text-primary-300'
                }`}>
                  1
                </div>
                <span className={`font-medium ${step === 'shipping' ? 'text-white' : 'text-primary-300'}`}>
                  Shipping Information
                </span>
              </div>

              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        className="input-field w-full"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        className="input-field w-full"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="input-field w-full"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="input-field w-full"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Address</label>
                    <input
                      type="text"
                      required
                      className="input-field w-full"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">City</label>
                      <input
                        type="text"
                        required
                        className="input-field w-full"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">State</label>
                      <input
                        type="text"
                        required
                        className="input-field w-full"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        className="input-field w-full"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center mr-3">
                      2
                    </div>
                    <span className="font-medium text-white">Payment Information</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        className="input-field w-full pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">CVV</label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Complete Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-primary-300 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-700 pt-4 space-y-2">
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
                <div className="border-t border-primary-700 pt-2">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 