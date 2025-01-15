import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {VideoChunkUploadDto, VideoUploadCompleteDto, VideoUploadInitializeDto} from "./dto";
import {
    CompleteMultipartUploadCommand,
    CreateMultipartUploadCommand,
    S3Client,
    UploadPartCommand
} from "@aws-sdk/client-s3";
import {NodeHttpHandler} from "@aws-sdk/node-http-handler";
import {SqsService} from "../sqs/sqs.service";

@Injectable()
export class VideoService {

    private readonly logger = new Logger(VideoService.name);

    constructor(private configService: ConfigService, private sqsService: SqsService) {
    }

    async initializeUpload(dto: VideoUploadInitializeDto) {
        try {
            this.logger.log('Initializing upload');
            const filename = dto.fileName;
            const s3Client = new S3Client({
                    region: this.configService.get('AWS_S3_REGION'),
                    credentials: {
                        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
                    }
                }
            );

            const createCommand = new CreateMultipartUploadCommand({
                Bucket: this.configService.get('AWS_VIDEO_UPLOAD_BUCKET'),
                Key: filename,
                ContentType: 'video/mp4'
            });

            const multiPartParams = await s3Client.send(createCommand);

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
            const s3Client = new S3Client({
                    region: this.configService.get('AWS_S3_REGION'),
                    credentials: {
                        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
                    },
                    requestHandler: new NodeHttpHandler({
                        connectionTimeout: 300000, // 5 minutes
                        socketTimeout: 300000,    // 5 minutes
                    }),
                }
            );

            const bucketName = this.configService.get('AWS_VIDEO_UPLOAD_BUCKET');
            const partNumber = dto.chunkIndex + 1;


            const params = {
                Bucket: bucketName,
                Key: dto.fileName,
                UploadId: dto.uploadId,
                PartNumber: dto.chunkIndex + 1,
                Body: file.buffer
            }

            const uploadPartCommand = new UploadPartCommand(params);

            this.logger.log("putting chunk to s3");
            this.logger.log(dto);

            const response = await s3Client.send(uploadPartCommand);

            this.logger.log(response);

            return {success: true, ETag: response.ETag, partNumber: partNumber};
        } catch (error) {
            this.logger.log(error);
            return {message: 'Upload failed'};
        }
    }

    async completeUpload(dto: VideoUploadCompleteDto) {
        try {
            this.logger.log('Completing Upload');
            const uploadParts = [];
            const s3Client = new S3Client({
                    region: this.configService.get('AWS_S3_REGION'),
                    credentials: {
                        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
                    },
                    requestHandler: new NodeHttpHandler({
                        connectionTimeout: 300000, // 5 minutes
                        socketTimeout: 300000,    // 5 minutes
                    }),
                }
            );

            this.logger.log(JSON.parse(dto.etags));

            const completeParams = {
                Bucket: this.configService.get('AWS_VIDEO_UPLOAD_BUCKET'),
                Key: dto.fileName,
                UploadId: dto.uploadId,
                MultipartUpload: {Parts: JSON.parse(dto.etags)}
            }

            const completeCommand = new CompleteMultipartUploadCommand(completeParams);

            this.logger.log(completeParams);

            const completeRes = await s3Client.send(completeCommand);
            // noinspection TypeScriptUnresolvedReference
            const key = completeRes.Key;
            // noinspection TypeScriptUnresolvedReference
            const location = completeRes.Location;

            //send this data to database
            //send this data to sqs
            this.sqsService.sendMessage({key, location});
            console.log("recievied", this.sqsService.receiveMessages());
            return {message: "Uploaded successfully"}

        } catch (error) {
            this.logger.error(error);
            return {message: 'Upload failed'};
        }
    }

}
