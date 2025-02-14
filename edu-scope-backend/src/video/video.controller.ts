// noinspection TypeScriptValidateTypes

import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {VideoChunkUploadDto, VideoUploadCompleteDto, VideoUploadInitializeDto} from "./dto";
import {VideoService} from "./video.service";
import {Public} from "../app.utils";

@Controller('video')
export class VideoController {
    constructor(private videoService: VideoService) {
    }

    @Post('initialize')
    initializeUpload(@Body() dto: VideoUploadInitializeDto) {
        return this.videoService.initializeUpload(dto);
    }

    @Post('uploadChunk')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: VideoChunkUploadDto) {
        return this.videoService.uploadChunk(file, dto);
    }

    @Post('completeUpload')
    uploadCompleted(@Body() dto: VideoUploadCompleteDto) {
        return this.videoService.completeUpload(dto)
    }


    @Get('all')
    getAll() {
        return this.videoService.getAll();  
    }

}
