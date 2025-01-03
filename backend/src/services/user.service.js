import prisma from "../db.js";
import logger from "./logger.service.js";

export async function saveUser(user) {
    const userData = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password
        }
    });

    return userData;
}

export async function findAllUser() {
    try {
        return await prisma.user.findMany().map(u => {
            u.password = ''
            return u;
        });
    } catch (error) {
        logger.error(`Error finding user by email: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

export async function findUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    } catch (error) {
        logger.error(`Error finding user by email: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateUser(userId, updates) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updates,
        });

        logger.info(`Updated user: ${JSON.stringify(updatedUser)}`);
        return updatedUser;
    } catch (error) {
        logger.error(`Error finding user by email: ${error.message}`);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}