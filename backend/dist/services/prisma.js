import { PrismaClient } from '@prisma/client';
let prisma = null;
export const getPrisma = () => {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
};
//# sourceMappingURL=prisma.js.map