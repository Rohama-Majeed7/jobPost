import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Use a global variable to persist the Prisma client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient().$extends(withAccelerate());

// Avoid multiple instances of Prisma Client in dev (hot reload safe)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
