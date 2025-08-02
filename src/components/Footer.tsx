import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Orderly Wares</h3>
            <p className="text-primary-300 text-sm leading-relaxed mb-6">
              Your trusted destination for premium electronics and accessories. 
              Quality products, excellent service, and fast delivery guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-400 hover:text-accent-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-accent-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-accent-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-accent-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-300 hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-primary-300 hover:text-accent-400 transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-400" />
                <span className="text-primary-300">support@orderlywares.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-400" />
                <span className="text-primary-300">(555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent-400 mt-0.5" />
                <span className="text-primary-300">
                  123 Commerce St,<br />
                  City, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-400 text-sm">
              © 2025 Orderly Wares. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-primary-400 hover:text-accent-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-400 hover:text-accent-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-primary-400 hover:text-accent-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
