import { AuthDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: AuthDto): Promise<{
        email: string;
        name: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
