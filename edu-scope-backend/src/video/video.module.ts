import {Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {SqsModule} from "../sqs/sqs.module";
import {SqsService} from "../sqs/sqs.service";
import {TranscoderModule} from "../transcoder/transcoder.module";
import {TranscoderService} from "../transcoder/transcoder.service";

@Module({
    imports: [SqsModule, TranscoderModule],
    controllers: [VideoController],
    providers: [VideoService, SqsService, TranscoderService]
})
export class VideoModule {
}
