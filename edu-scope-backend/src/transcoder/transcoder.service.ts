import {Injectable, Logger} from '@nestjs/common';
import * as AWS from "aws-sdk";
import {ConfigService} from "@nestjs/config";
import * as fluentFfmpeg from "fluent-ffmpeg";
import * as ffmpegStatic from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

@Injectable()
export class TranscoderService {
    private readonly logger = new Logger(TranscoderService.name);

    private readonly s3: AWS.S3;

    private readonly resolutions = [
        {
            resolution: '320x180',
            videRate: '500k',
            audioRate: '64k',
            bandwidth: 676800
        },
        {
            resolution: '320x180',
            videRate: '500k',
            audioRate: '64k',
            bandwidth: 1353600
        },
        {
            resolution: '320x180',
            videRate: '500k',
            audioRate: '64k',
            bandwidth: 3230400
        }
    ];

    constructor(private config: ConfigService) {
        this.s3 = new AWS.S3({
            region: 'us-east-1', // Replace with your AWS region
            accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
        });
    }

    onModuleInit() {
        fluentFfmpeg.setFfmpegPath(ffmpegStatic.path);
    }

    async convertToHlsFormat(key: string) {

        try {
            const writeStream = fs.createWriteStream('local.mp4');
            const readStream = this.s3.getObject({
                Bucket: this.config.get('AWS_VIDEO_UPLOAD_BUCKET'),
                Key: key
            }).createReadStream();

            readStream.pipe(writeStream);

            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', (error) => {
                    this.logger.error(error);
                });
            });

            this.logger.log(`Downloaded  ${key} file locally`);

            const variantPlayLists = [];

            for (const {resolution, videRate, audioRate, bandwidth} of this.resolutions) {
                const outputFilename = `${key.replace('.', '_')}_${resolution}.m3u8`;
                const segmentFilename = `${key.replace('.', '_')}_${resolution}_%03d.ts`;
                const outputFilenameWithFolder = `output/${outputFilename}`;

                await new Promise((resolve, reject) => {
                    fluentFfmpeg(key).outputOptions([
                        `-c:v h264`,
                        `-b:v ${videRate}`,
                        `-c:a aac`,
                        `-b:a ${audioRate}`,
                        `-vf scale=${resolution}`,
                        `-f hls`,
                        `-hls_time 10`,
                        `-hls_list_size 0`,
                        `-hls_segment_filename output/${segmentFilename}`
                    ]).output(outputFilenameWithFolder)
                        .on('end', resolve)
                        .on('error', (error) => reject(error))
                        .run();
                });

                const variantPlaylist = {
                    resolution,
                    outputFilename,
                    bandwidth
                };

                variantPlayLists.push(variantPlaylist);
            }

            let masterPlaylist = variantPlayLists.map((variantPlayList) => {
                const {resolution, outputFilename, bandwidth} = variantPlayList;
                return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFilename}`;
            }).join('\n');

            masterPlaylist = `#EXTM3U\n` + masterPlaylist;
            const masterPlaylistFileName = `${key.replace(
                '.',
                '_'
            )}_master.m3u8`;
            const masterPlaylistPath = `output/${masterPlaylistFileName}`;
            fs.writeFileSync(masterPlaylistPath, masterPlaylist);
            fs.unlinkSync('local.mp4');

            const files = fs.readdirSync('output');

            for (const file of files) {
                if (!file.startsWith(key.replace('.', '_'))) {
                    continue;
                }

                const filePath = path.join('output', file);
                const fileStream = fs.createReadStream(filePath);

                const uploadParams = {
                    Bucket: this.config.get('AWS_VIDEO_HLS_BUCKET'),
                    Key: `output/${file}`,
                    Body: fileStream,
                    ContentType: file.endsWith('.ts') ? 'video/mp2t' : file.endsWith('.m3u8') ? 'application/x-mpegURL' : null
                }

                await this.s3.upload(uploadParams).promise();
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            this.logger.error(error);
        }
    }
}
