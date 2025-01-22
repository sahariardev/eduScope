import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import {CourseDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class CourseService {

    private readonly logger = new Logger(CourseService.name);

    constructor(private prisma: PrismaService,
                @Inject(REQUEST) private readonly request: Request) {
    }

    async save(dto: CourseDto) {
        try {
            if (dto.id && dto.id != 0) {

                const course = await this.prisma.course.findFirst({
                    where: {
                        id: dto.id
                    }
                });

                if (!course) {
                    throw new BadRequestException('Invalid course id');
                }

                await this.prisma.course.update({
                    where: {
                        id: dto.id
                    },
                    data: {
                        title: dto.title,
                        description: dto.description,
                        updatedById: this.request['user'].id,
                    }
                })

            } else {
                return await this.prisma.course.create({
                    data: {
                        title: dto.title,
                        description: dto.description,
                        createdById: this.request['user'].id,
                        updatedById: this.request['user'].id,
                    }
                });
            }
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }

    async getCourse(id: number) {
        try {
            return await this.prisma.course.findFirst({
                where: {
                    id: id
                }
            });
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }

}
