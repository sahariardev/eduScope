import {Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'mysql://eduUser:eduPass@localhost:3306/eduScope'
                },
            },
        });
    }
}
