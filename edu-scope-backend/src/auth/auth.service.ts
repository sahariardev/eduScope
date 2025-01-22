import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto";
import * as argon2 from "argon2";
import {PrismaService} from "../prisma/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
                private configService: ConfigService,
                private jwtService: JwtService) {
    }

    async signup(dto: AuthDto) {
        const hashedPassword = await argon2.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name
                }
            });

            return {
                access_token: await this.signToken(user.id, user.email),
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new ForbiddenException('Credentials incorrect')
        }

        const passwordMatched = await argon2.verify(user.password, dto.password);

        if (!passwordMatched) {
            throw new ForbiddenException('Credentials incorrect')
        }

        return {
            access_token: await this.signToken(user.id, user.email),
        };
    }

    async signToken(userId: number, email: string) {
        return this.jwtService.signAsync({userId, email}, {
            expiresIn: '30m',
            secret: this.configService.get('JWT_TOKEN')
        })
    }
}
