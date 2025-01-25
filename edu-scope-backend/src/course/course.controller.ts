import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CourseService} from "./course.service";
import {CourseDto} from "./dto";
import {Public} from "../app.utils";

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {
    }

    @Post('save')
    save(@Body() dto: CourseDto) {
        return this.courseService.save(dto);
    }


    @Get('all')
    getAllCourse() {
        return this.courseService.getAllCourse();
    }

    @Get(':id')
    get(@Param("id") id: number) {
        return this.courseService.getCourse(id);
    }

    @Get(':courseId/user/:userId')
    enroll(@Param('userId') userId: string,
           @Param('courseId') courseId: string,) {

        //todo enroll user to a course
    }
}
