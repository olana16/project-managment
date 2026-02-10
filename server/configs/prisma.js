import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Required for Neon WebSocket connections in Node.js
neonConfig.webSocketConstructor = ws

// Create a Neon pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Create PrismaNeon adapter
const adapter = new PrismaNeon(pool)

// Global caching for dev hot-reload
const globalForPrisma = globalThis
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
