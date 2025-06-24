<<<<<<< HEAD
# NextGen Arrivals Landing Page

A modern, responsive landing page for the NextGen SmartWatch X, featuring:

- Mobile-first, responsive design using CSS media queries
- Collapsible navigation menu for mobile
- Dark mode toggle
- Early access signup form (front-end only)
- Feature highlights with icons
- Social media links
- **Contact form with validation** (Name, Email, Message, error/success messages)

## Features

- **Responsive Layout:**
  - Uses CSS Flexbox and Grid for flexible layouts
  - Media queries for breakpoints at 900px and 768px
  - Stacks columns vertically and reduces font sizes on mobile
  - Navigation collapses into a hamburger menu on small screens
  - Images scale fluidly within containers
  - Prevents horizontal overflow and scrolling issues

- **Dark Mode:**
  - Toggle button to switch between light and dark themes

- **Signup Form:**
  - Collects email for early access (no backend integration)
  - Shows a thank you message on submit

- **Contact Form:**
  - Fields: Name, Email, Message
  - JavaScript validation for non-empty fields and valid email (regex)
  - Error messages shown below each field if invalid
  - Prevents submission if invalid, shows success message if valid
  - Handles edge cases (empty, invalid email, special characters)

- **Tech Stack:**
  - HTML5
  - CSS3 (custom properties, flex, grid, media queries)
  - JavaScript (for nav toggle, dark mode, form handling, and contact validation)

## Credits

- Icons and images are placeholders—replace with your own as needed

---

© 2025 NextGen Arrivals. All rights reserved.
=======
# E-Commerce Storefront with Admin Panel

A modern, full-stack e-commerce application built with Next.js, MongoDB, Stripe, and Tailwind CSS. Features include product catalog, search and filtering, shopping cart, checkout flow, user authentication, and admin dashboard.

## Features

### User Features
- 🏠 **Homepage** with featured products and company info
- 🛍️ **Product Catalog** with search and category filtering
- 🛒 **Shopping Cart** functionality
- 💳 **Secure Checkout** with Stripe integration (test mode)
- 👤 **User Authentication** (login/register)
- 📱 **Responsive Design** for all devices

### Admin Features
- 📊 **Admin Dashboard** with sales analytics
- 📦 **Product Management** (CRUD operations)
- 👥 **User Management**
- 🛒 **Order Management**
- 🔐 **Role-based Access Control**

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose
- **Payment**: Stripe (Test Mode)
- **Icons**: Lucide React
- **Authentication**: NextAuth.js with credentials provider

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Stripe account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-storefront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce-storefront
   
   # Authentication
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Stripe (Test Mode)
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   
   # Admin Default User
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Seed the database** (optional)
   ```bash
   node scripts/seed.js
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Test Accounts

After seeding the database, you can use these test accounts:

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Products
- `GET /api/products` - Get all products (with pagination, search, filtering)
- `POST /api/products` - Create new product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order status (admin only)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # Database models
└── types/                 # TypeScript type definitions
```

## Deployment

### Environment Setup
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure Stripe with your live keys
3. Set up proper environment variables
4. Deploy to Vercel, Netlify, or your preferred platform

### Production Considerations
- Use live Stripe keys for production
- Set up proper SSL certificates
- Configure proper CORS settings
- Set up monitoring and logging
- Implement proper error handling
- Add rate limiting for API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@estore.com or create an issue on GitHub.

---

**Note**: This is a demo application for educational purposes. The Stripe integration is set to test mode. For production use, ensure proper security measures and use live Stripe keys.
>>>>>>> e801de1 (Initial commit: E-Commerce Storefront with Admin Panel)
