import {Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {SqsModule} from "../sqs/sqs.module";
import {SqsService} from "../sqs/sqs.service";

@Module({
    imports: [SqsModule],
    controllers: [VideoController],
    providers: [VideoService, SqsService]
})
export class VideoModule {
}
