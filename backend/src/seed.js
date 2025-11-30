import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      status: 'active',
      tasks: {
        create: [
          {
            title: 'Design mockups',
            description: 'Create initial design mockups in Figma',
            status: 'completed',
            priority: 'high',
            assignee: 'Sarah Johnson',
            deadline: new Date('2025-12-15'),
          },
          {
            title: 'Frontend implementation',
            description: 'Implement the new design using React',
            status: 'in_progress',
            priority: 'high',
            assignee: 'Mike Chen',
            deadline: new Date('2025-12-30'),
          },
          {
            title: 'Backend API updates',
            description: 'Update API endpoints to support new features',
            status: 'todo',
            priority: 'medium',
            assignee: 'Alex Kumar',
            deadline: new Date('2026-01-10'),
          },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Build iOS and Android mobile applications',
      status: 'active',
      tasks: {
        create: [
          {
            title: 'Setup React Native project',
            description: 'Initialize React Native with required dependencies',
            status: 'completed',
            priority: 'high',
            assignee: 'Emily Davis',
            deadline: new Date('2025-12-05'),
          },
          {
            title: 'Implement authentication',
            description: 'Add user login and registration',
            status: 'in_progress',
            priority: 'high',
            assignee: 'Emily Davis',
            deadline: new Date('2025-12-20'),
          },
          {
            title: 'Design app icons',
            description: 'Create app icons for both platforms',
            status: 'todo',
            priority: 'low',
            assignee: 'Sarah Johnson',
            deadline: new Date('2026-01-15'),
          },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Database Migration',
      description: 'Migrate from MongoDB to PostgreSQL',
      status: 'active',
      tasks: {
        create: [
          {
            title: 'Schema design',
            description: 'Design PostgreSQL schema',
            status: 'todo',
            priority: 'high',
            assignee: 'Alex Kumar',
            deadline: new Date('2025-12-18'),
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${3} projects with sample tasks`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
