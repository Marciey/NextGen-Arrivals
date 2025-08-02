require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProducts = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'],
    category: 'Electronics',
    stock: 10,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced smartwatch with health monitoring and fitness tracking capabilities. Track your heart rate, steps, and workouts.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'],
    category: 'Electronics',
    stock: 5,
  },
  {
    name: 'Ergonomic Laptop Stand',
    description: 'Adjustable laptop stand for better posture and productivity. Elevate your laptop to eye level for comfortable working.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'],
    category: 'Accessories',
    stock: 15,
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Charge your phone without cables.',
    price: 29.99,
    images: ['https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=300&fit=crop'],
    category: 'Electronics',
    stock: 20,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design. Perfect for outdoor activities and parties.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'],
    category: 'Audio',
    stock: 8,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with customizable RGB lighting. Tactile switches for the ultimate typing experience.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop'],
    category: 'Accessories',
    stock: 12,
  },
  {
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable DPI and RGB lighting. Perfect for gamers and professionals.',
    price: 59.99,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'],
    category: 'Gaming',
    stock: 18,
  },
  {
    name: 'Smart Home Hub',
    description: 'Central hub for controlling all your smart home devices. Connect and manage your smart home ecosystem.',
    price: 149.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'],
    category: 'Smart Home',
    stock: 6,
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB, and SD card slots. Expand your laptop connectivity.',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'],
    category: 'Accessories',
    stock: 25,
  },
  {
    name: 'Webcam HD',
    description: 'High-definition webcam with built-in microphone. Perfect for video calls and streaming.',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'],
    category: 'Electronics',
    stock: 14,
  },
  {
    name: 'Portable SSD',
    description: 'Ultra-fast portable SSD with USB 3.1 connectivity. Transfer files at lightning speed.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'],
    category: 'Electronics',
    stock: 9,
  },
  {
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand for ergonomic workspace setup. Improve your posture and productivity.',
    price: 69.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'],
    category: 'Accessories',
    stock: 11,
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all except a dummy record

    if (deleteError) {
      console.error('Error clearing products:', deleteError);
    }

    // Insert sample products
    console.log('📦 Inserting sample products...');
    const { data: products, error: insertError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (insertError) {
      console.error('Error inserting products:', insertError);
      return;
    }

    console.log(`✅ Successfully seeded ${products.length} products!`);
    console.log('\n📋 Sample products created:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🚀 You can now start the development server with: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
