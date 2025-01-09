import {Injectable, Logger} from '@nestjs/common';
import AWS from "aws-sdk";
import {ConfigService} from "@nestjs/config";
import {VideoChunkUploadDto, VideoUploadCompleteDto, VideoUploadInitializeDto} from "./dro";

@Injectable()
export class VideoService {

    private readonly logger = new Logger(VideoService.name);

    constructor(private configService: ConfigService) {
    }

    async initializeUpload(dto: VideoUploadInitializeDto) {
        try {
            this.logger.log('Initializing upload');
            const filename = dto.fileName;
            AWS.config.update({
                region: 'us-east-1',
                accessKeyId: this.configService.get('AWS_SECRECT_ACCESS_ID'),
                secretAccessKey: this.configService.get('AWS_SECRECT_ACCESS_KEY')
            });

            const s3 = new AWS.S3();

            const params = {
                Bucket: this.configService.get('AWS_BUCKET'),
                Key: filename,
                ContentType: 'video/mp4'
            }
            const multiPartParams = await s3.createMultipartUpload(params).promise();

            this.logger.log(multiPartParams);

            return {uploadId: multiPartParams.UploadId};

        } catch (error) {
            this.logger.error(error);
            return {message: 'Upload failed'};
        }
    }

    async uploadChunk(file: Express.Multer.File, dto: VideoChunkUploadDto) {
        this.logger.log("chunking uploading");
        try {
            const s3 = new AWS.S3({
                region: 'us-east-1',
                accessKeyId: this.configService.get('AWS_SECRECT_ACCESS_ID'),
                secretAccessKey: this.configService.get('AWS_SECRECT_ACCESS_KEY')
            });

            const bucketName = this.configService.get('AWS_BUCKET');
            const partNumber = dto.chunkIndex + 1;

            const params = {
                Bucket: bucketName,
                Key: dto.fileName,
                UploadId: dto.uploadId,
                PartNumber: dto.chunkIndex + 1,
                Body: file.buffer
            }

            this.logger.log("putting chunk to s3");

            const data = await s3.uploadPart(params).promise();

            return {success: true, ETag: data.ETag, partNumber: partNumber};
        } catch (error) {
            this.logger.log(error);
            return {message: 'Upload failed'};
        }
    }

    completeUpload(dto: VideoUploadCompleteDto) {
        try {
            this.logger.log('Completing Upload');
            const uploadParts = [];
            const s3 = new AWS.S3({
                region: 'us-east-1',
                accessKeyId: this.configService.get('AWS_SECRECT_ACCESS_ID'),
                secretAccessKey: this.configService.get('AWS_SECRECT_ACCESS_KEY')
            });

            console.log(JSON.parse(etags));

            const completeParams = {
                Bucket: this.configService.get('AWS_BUCKET'),
                Key: dto.fileName,
                UploadId: dto.uploadId,
                MultipartUpload: {Parts: JSON.parse(dto.etags)}
            }

            this.logger.log(completeParams);

            const completeRes = await s3.completeMultipartUpload(completeParams).promise();
            return {message: "Uploaded successfully"}

        } catch (error) {
            this.logger.error(error);
            return {message: 'Upload failed'};
        }
    }

}
