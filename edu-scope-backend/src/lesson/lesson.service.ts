import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import {LessonDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class LessonService {
    private readonly logger = new Logger(LessonService.name);

    constructor(private prisma: PrismaService,
                @Inject(REQUEST) private readonly request: Request) {
    }

    async save(dto: LessonDto) {
        try {
            if (dto.id && dto.id != 0) {
                const lesson = await this.prisma.lesson.findFirst({
                    where: {
                        id: parseInt(String(dto.id))
                    }
                });

                if (!lesson) {
                    throw new BadRequestException('Invalid lesson id');
                }

                console.log(dto);

                await this.prisma.lesson.update({
                    where: {
                        id: parseInt(String(dto.id))
                    },
                    data: {
                        title: dto.title,
                        text: dto.description,
                        updatedById: this.request['user'].userId,
                        videoId: parseInt(String(dto.videoId)),
                        courseId: parseInt(String(dto.courseId)),
                    }
                })
            } else {
                return await this.prisma.lesson.create({
                    data: {
                        title: dto.title,
                        videoId: parseInt(String(dto.videoId)),
                        courseId: parseInt(String(dto.courseId)),
                        text: dto.description,
                        createdById: this.request['user'].userId,
                        updatedById: this.request['user'].userId,
                    }
                })
            }
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }

    async getLesson(id: number) {
        try {
            return await this.prisma.lesson.findFirst({
                where: {
                    id: parseInt(String(id))
                },
                include: {
                    course: true,
                    UserProgress: {
                        where: {
                            userId: this.request['user'].userId
                        }
                    }
                }
            });
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }

    async getAllLesson() {
        try {
            return await this.prisma.lesson.findMany({
                include: {
                    course: true
                }
            });
        } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Something went wrong');
        }
    }

}
