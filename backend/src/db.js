import { PrismaClient } from '@prisma/client';

let prisma;

if (!global.prisma) {
    prisma = new PrismaClient();
    if (process.env.NODE_ENV !== 'production') {
        global.prisma = prisma; // Attach to global object in non-production environments
    }
} else {
    prisma = global.prisma;
}

export default prisma;