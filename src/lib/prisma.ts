// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
	});

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
