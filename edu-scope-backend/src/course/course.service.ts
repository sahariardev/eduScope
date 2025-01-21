import {Inject, Injectable} from '@nestjs/common';
import {CourseDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class CourseService {

    constructor(private prisma: PrismaService,
                @Inject(REQUEST) private readonly request: Request) {
    }

    async save(dto: CourseDto) {
        try {
            return await this.prisma.course.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    createdById: this.request['user'].id
                }
            });
        } catch (error) {
            
        }
    }

}
