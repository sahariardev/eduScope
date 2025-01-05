import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto";
import * as argon2 from "argon2";
import {PrismaService} from "../prisma/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {
    }

    async signup(dto: AuthDto) {
        const test = await argon2.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: test,
                    name: dto.name
                }
            });

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error;
        }
    }
}
