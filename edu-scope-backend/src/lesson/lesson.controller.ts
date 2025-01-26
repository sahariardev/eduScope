import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {LessonService} from "./lesson.service";
import {LessonDto} from "./dto";

@Controller('lesson')
export class LessonController {

    constructor(private lessonService: LessonService) {
    }

    @Post('save')
    save(@Body() dto: LessonDto) {
        return this.lessonService.save(dto);
    }

    @Get('all')
    getAllLessons() {
        return this.lessonService.getAllLesson();
    }

    @Get(':id')
    getOne(@Param("id") id: number) {
        return this.lessonService.getLesson(id);
    }
}
