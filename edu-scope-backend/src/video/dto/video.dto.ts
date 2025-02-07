import {IsNotEmpty, IsString} from "class-validator";

export class VideoUploadInitializeDto {
    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    title: string;
}

export class VideoChunkUploadDto {
    @IsNotEmpty()
    @IsString()
    fileName: string;

    @IsNotEmpty()
    chunkIndex: number;

    @IsNotEmpty()
    @IsString()
    uploadId: string;
}

export class VideoUploadCompleteDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    fileName: string;

    @IsNotEmpty()
    totalChunks: number;

    @IsNotEmpty()
    @IsString()
    uploadId: string;

    @IsString()
    etags: string
}