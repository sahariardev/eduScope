import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        email: string;
        name: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    signin(): void;
}
