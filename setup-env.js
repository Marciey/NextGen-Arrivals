const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Supabase NextGen Project Setup');
console.log('================================\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupEnvironment() {
  try {
    console.log('Please provide your Supabase NextGen project credentials:\n');

    const supabaseUrl = await askQuestion('Enter your Supabase Project URL (e.g., https://your-project-ref.supabase.co): ');
    const anonKey = await askQuestion('Enter your anon/public key: ');
    const serviceRoleKey = await askQuestion('Enter your service_role key: ');

    // Generate a random secret for NextAuth
    const nextAuthSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const envContent = `# Supabase Configuration (NextGen Project)
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}

# App Configuration
NEXTAUTH_SECRET=${nextAuthSecret}
NEXTAUTH_URL=http://localhost:3000
`;

    fs.writeFileSync('.env.local', envContent);

    console.log('\n✅ Environment file created successfully!');
    console.log('📁 File: .env.local');
    console.log('\nNext steps:');
    console.log('1. Create database tables in your Supabase dashboard');
    console.log('2. Run: npm run seed');
    console.log('3. Run: npm run dev');
    console.log('\n📖 See SUPABASE_SETUP.md for detailed instructions');

  } catch (error) {
    console.error('❌ Error creating environment file:', error);
  } finally {
    rl.close();
  }
}

setupEnvironment(); 