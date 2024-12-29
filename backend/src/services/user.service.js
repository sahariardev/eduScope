import prisma from "../db.js";

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
    await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}