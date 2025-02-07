import { Controller, Param, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {

    constructor(private progressService: ProgressService) {
        
    }

    @Post('save/:lessonId')
    save(@Param("lessonId") lessonId: number) {
        return this.progressService.save(lessonId);    
    }


}
