# Supabase NextGen Project Setup Guide

## 🚀 Connecting Your NextGen Supabase Project

### Step 1: Get Your Project Credentials

1. Go to your [Supabase NextGen Dashboard](https://supabase.com/dashboard)
2. Select your "NextGen" project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### Step 2: Create Environment File

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration (NextGen Project)
NEXT_PUBLIC_SUPABASE_URL=https://your-nextgen-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Step 3: Create Database Tables

Run these SQL commands in your Supabase SQL Editor:

#### 1. Products Table
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

#### 2. Users Table
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

#### 3. Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  items JSONB,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 4: Set Up Row Level Security (RLS)

Enable RLS and create policies:

#### Enable RLS
```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

#### Products Policies
```sql
-- Allow public read access to products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Allow authenticated users to create products (for admin)
CREATE POLICY "Users can create products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own products (for admin)
CREATE POLICY "Users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow users to delete products (for admin)
CREATE POLICY "Users can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### Users Policies
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow insert during signup
CREATE POLICY "Users can insert profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

#### Orders Policies
```sql
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create orders
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);
```

### Step 5: Seed the Database

Run the seed script to populate your database:

```bash
npm run seed
```

### Step 6: Test the Connection

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to test your application.

## 🔧 Troubleshooting

### Common Issues:

1. **Environment Variables Not Found**
   - Make sure `.env.local` is in the project root
   - Restart your development server after adding env vars

2. **Database Connection Errors**
   - Verify your Supabase URL and keys are correct
   - Check that tables exist in your database

3. **Authentication Issues**
   - Ensure RLS policies are set up correctly
   - Check that the users table references auth.users

4. **CORS Errors**
   - Add your localhost URL to Supabase Auth settings
   - Go to Authentication → Settings → URL Configuration

## 📞 Support

If you encounter issues:
1. Check the Supabase logs in your dashboard
2. Verify your environment variables
3. Test the connection in the Supabase dashboard
4. Check the browser console for errors 