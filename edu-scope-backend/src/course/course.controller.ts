import {Body, Controller, Post} from '@nestjs/common';
import {CourseService} from "./course.service";
import {CourseDto} from "./dto";

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {
    }

    @Post('save')
    signup(@Body() dto: CourseDto) {
        return this.courseService.save(dto);
    }
}
