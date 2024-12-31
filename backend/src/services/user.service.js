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
        await prisma.$disconnect(); // Ensures the connection is closed
    }
}