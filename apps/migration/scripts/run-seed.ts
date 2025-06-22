// scripts/run-seed.ts

import { prisma } from '../prisma/client'
import { seedUsers } from '../seeders/user.seeder'

async function main() {
  await seedUsers()
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
