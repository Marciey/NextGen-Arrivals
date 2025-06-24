const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-storefront';

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('orders').deleteMany({});
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await db.collection('users').insertOne({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Create regular user
    const userPassword = await bcrypt.hash('user123', 12);
    await db.collection('users').insertOne({
      name: 'Test User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
        price: 199.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Wireless+Headphones'],
        stock: 15,
        featured: true,
        tags: ['wireless', 'headphones', 'audio', 'bluetooth'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, GPS, and long battery life.',
        price: 299.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Smart+Watch'],
        stock: 10,
        featured: true,
        tags: ['smartwatch', 'fitness', 'health', 'wearable'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Laptop Stand',
        description: 'Ergonomic laptop stand for better productivity and posture. Adjustable height and angle.',
        price: 49.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Laptop+Stand'],
        stock: 25,
        featured: false,
        tags: ['laptop', 'stand', 'ergonomic', 'office'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors. Soft and breathable fabric.',
        price: 24.99,
        category: 'Clothing',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Cotton+T-Shirt'],
        stock: 50,
        featured: false,
        tags: ['t-shirt', 'cotton', 'casual', 'comfortable'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Programming Book',
        description: 'Learn modern web development with this comprehensive guide. Perfect for beginners and professionals.',
        price: 39.99,
        category: 'Books',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Programming+Book'],
        stock: 30,
        featured: true,
        tags: ['book', 'programming', 'web development', 'learning'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Coffee Mug',
        description: 'Premium ceramic coffee mug with insulated design. Perfect for your morning coffee.',
        price: 14.99,
        category: 'Home',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Coffee+Mug'],
        stock: 40,
        featured: false,
        tags: ['mug', 'coffee', 'ceramic', 'kitchen'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
        price: 29.99,
        category: 'Electronics',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Wireless+Mouse'],
        stock: 35,
        featured: false,
        tags: ['mouse', 'wireless', 'computer', 'ergonomic'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yoga Mat',
        description: 'High-quality yoga mat with non-slip surface. Perfect for yoga, pilates, and other exercises.',
        price: 34.99,
        category: 'Sports',
        images: ['https://via.placeholder.com/400x300/1f2937/ffffff?text=Yoga+Mat'],
        stock: 20,
        featured: false,
        tags: ['yoga', 'mat', 'exercise', 'fitness'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    await db.collection('products').insertMany(products);
    
    console.log('Database seeded successfully!');
    console.log('Admin user: admin@example.com / admin123');
    console.log('Test user: user@example.com / user123');
    console.log(`Created ${products.length} products`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
