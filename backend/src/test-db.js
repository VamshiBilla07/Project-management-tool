import prisma from './prisma.js';

async function test() {
  try {
    console.log('Testing database connection...');
    const projects = await prisma.project.findMany();
    console.log(`Found ${projects.length} projects`);
    console.log('Database connection successful!');
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

test();
