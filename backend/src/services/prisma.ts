import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export const getPrisma = (): PrismaClient => {
	if (!prisma) {
		prisma = new PrismaClient();
	}
	return prisma;
};

export type Prisma = PrismaClient;