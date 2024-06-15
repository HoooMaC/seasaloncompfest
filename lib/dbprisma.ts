import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}
export const dbPrisma = globalThis.prisma || new PrismaClient({});

if (process.env.NODE_ENV !== 'production')
  prisma = globalThis.prisma = dbPrisma;
