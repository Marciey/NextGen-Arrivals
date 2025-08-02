const fs = require('fs');

// Your Supabase NextGen project credentials
const supabaseUrl = 'https://oiqjjxlbmiuspzktilur.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcWpqeGxibWl1c3B6a3RpbHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDIwMzksImV4cCI6MjA2OTcxODAzOX0.6BWKJk6vAjV3FuoCyt2TtOnCVZvzYP9ezFaykbBAi5s';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcWpqeGxibWl1c3B6a3RpbHVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDE0MjAzOSwiZXhwIjoyMDY5NzE4MDM5fQ.6jbnntBugptit2iakpUAPWkpDtcDCyM6t_ntplMqcUA';

// Generate a secure secret for NextAuth
const nextAuthSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const envContent = `# Supabase Configuration (NextGen Project)
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}

# App Configuration
NEXTAUTH_SECRET=${nextAuthSecret}
NEXTAUTH_URL=http://localhost:3000
`;

try {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Environment file updated successfully!');
  console.log('📁 File: .env.local');
  console.log('\n🎉 All Supabase credentials are now configured!');
  console.log('\nNext steps:');
  console.log('1. Create database tables in your Supabase dashboard');
  console.log('2. Run: npm run seed');
  console.log('3. Run: npm run dev');
} catch (error) {
  console.error('❌ Error creating environment file:', error);
} 