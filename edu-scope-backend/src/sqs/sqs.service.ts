import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {ConfigService} from "@nestjs/config";
import {Cron, CronExpression} from "@nestjs/schedule";
import {TranscoderService} from "../transcoder/transcoder.service";

@Injectable()
export class SqsService implements OnModuleInit {

    private readonly logger = new Logger(SqsService.name);

    private readonly sqs: AWS.SQS;

    constructor(private config: ConfigService, private transcoderService : TranscoderService) {
        this.sqs = new AWS.SQS({
            region: 'us-east-1', // Replace with your AWS region
            accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
        });
    }

    onModuleInit() {
        this.logger.log('SQS Service initialized');
    }

    // Method to send a message
    async sendMessage(messageBody: any): Promise<void> {
        const params = {
            QueueUrl: this.config.get('AWS_SQS_URL'),
            MessageBody: JSON.stringify(messageBody),
        };

        try {
            const message = await this.sqs.sendMessage(params).promise();

            this.logger.log('Message sent:', message.MessageId);
        } catch (error) {
            this.logger.error('Error sending message:', error);
        }
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async receiveMessages(): Promise<void> {
        const params = {
            QueueUrl: this.config.get('AWS_SQS_URL'),
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 10,
        };

        try {
            const result = await this.sqs.receiveMessage(params).promise();
            if (result.Messages) {
                for (const message of result.Messages) {
                    this.logger.log('Received message:', message.Body);

                    const processDone = await this.transcoderService.convertToHlsFormat(JSON.parse(message.Body).key);

                    if (processDone) {
                        await this.deleteMessage(message.ReceiptHandle);
                    }
                }
            } else {
                this.logger.log('No messages available.');
            }
        } catch (error) {
            this.logger.error('Error receiving messages:', error);
        }
    }
    private async deleteMessage(receiptHandle: string): Promise<void> {
        const params = {
            QueueUrl: this.config.get('AWS_SQS_URL'),
            ReceiptHandle: receiptHandle,
        };

        try {
            await this.sqs.deleteMessage(params).promise();
            this.logger.log('Message deleted');
        } catch (error) {
            this.logger.error('Error deleting message:', error);
        }
    }
}
