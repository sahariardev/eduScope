
import {PrismaService} from "../prisma/prisma.service";
import {REQUEST} from "@nestjs/core";
import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';

@Injectable()
export class ProgressService {
    private readonly logger = new Logger(ProgressService.name);
    
    constructor(private prisma: PrismaService, 
        @Inject(REQUEST) private readonly request: Request) {
        
    }

    async save(lessonId: number) {
        
        try {
            return await this.prisma.userProgress.create({
                data: {
                    lessonId: parseInt(String(lessonId)),
                    userId: this.request['user'].userId
                }
            });
        } catch (error) {
            this.logger.error(error);
            this.remove(lessonId);
        }
    }

    async remove(lessonId: number) {    
        try {
            return await this.prisma.userProgress.deleteMany({
                where: {
                    userId: this.request['user'].userId,
                    lessonId: parseInt(String(lessonId)),
                }
            });
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }
}
