<<<<<<< HEAD
<<<<<<< HEAD
# NextGen Arrivals Landing Page
# Orderly Wares - Modern E-Commerce Storefront
>>>>>>> 12b3b64 (Add all project files)

A fully functional e-commerce website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features a modern dark theme design with complete shopping cart functionality, user authentication, and admin capabilities.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Updates** - Live cart updates and user session management
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **State Management**: React Context API
- Supabase account
- Git

## 🚀 Quick Start

git clone <your-repo-url>
cd e-commerce-storefront
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Create the following tables in your Supabase database:

#### Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[],
  category VARCHAR NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Users Table
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
Create a `.env.local` file in the root directory:


# App Configuration
### 5. Seed the Database

Run the seed script to populate your database with sample products:

```bash
npm run seed
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Products page

## 🔧 Configuration

### Supabase Setup

1. **Enable Row Level Security (RLS)**: Go to Authentication > Policies in your Supabase dashboard
2. **Set up Storage**: Create a storage bucket for product images
3. **Configure Auth**: Set up email templates and redirect URLs

### Customization

- **Colors**: Modify `tailwind.config.js` to change the color scheme
- **Styling**: Update `src/app/globals.css` for custom styles
- **Components**: Edit components in `src/components/` to match your brand

## 🚀 Deployment


1. Push your code to GitHub
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Authentication

The app uses Supabase Auth with the following features:
- Email/password authentication
- User roles (user/admin)
- Protected routes
- Session management

### Test Accounts

For testing purposes, you can create these accounts:
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## 🛒 Shopping Cart Features

- Add/remove items
- Update quantities
- Persistent storage (localStorage)
- Real-time cart count
- Clear cart functionality
- Stock validation

## 💳 Checkout Process

1. **Shipping Information** - Collect delivery details
2. **Payment** - Credit card processing (simulated)
3. **Order Confirmation** - Success page with order details

## 👨‍💼 Admin Features

- Product management (CRUD operations)
- Order management
- User management
- Analytics dashboard

## 🎨 Design System

The app uses a custom design system with:
- **Primary Colors**: Slate grays for the dark theme
- **Accent Colors**: Orange/amber for highlights
- **Typography**: Inter font family
- **Components**: Reusable card, button, and input styles

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the Next.js documentation
3. Open an issue in this repository

## 🎯 Roadmap

- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Analytics dashboard

---

<<<<<<< HEAD
**Note**: This is a demo application for educational purposes. The Stripe integration is set to test mode. For production use, ensure proper security measures and use live Stripe keys.
>>>>>>> e801de1 (Initial commit: E-Commerce Storefront with Admin Panel)
=======
Built with ❤️ using Next.js, TypeScript, and Supabase
>>>>>>> 12b3b64 (Add all project files)
