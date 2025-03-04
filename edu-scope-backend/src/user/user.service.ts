import { Injectable, Inject } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,
                    @Inject(REQUEST) private readonly request: Request) {
        }

    getMe() {
        return this.prisma.user.findFirst({
            where: {
                id: parseInt(String(this.request['user'].userId))
            },
            select : {
                id: true,
                email: true,
                name: true,
                isAdmin: true
            } 
        });
    }
}
