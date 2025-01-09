import {IS_NUMBER, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class VideoUploadInitializeDto {
    @IsNotEmpty()
    fileName: string;
}

export class VideoChunkUploadDto {
    @IsNotEmpty
    @IsString
    fileName: string;

    @IsNotEmpty
    @IS_NUMBER
    chunkIndex: number;

    @IsNotEmpty
    @IsString
    uploadId: string;
}