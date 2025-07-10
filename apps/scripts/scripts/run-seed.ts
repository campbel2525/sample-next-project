// scripts/run-seed.ts

import { prisma } from '@my-monorepo/db/client'
import { seedUsers } from '@my-monorepo/seeders/user_seeder'

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
