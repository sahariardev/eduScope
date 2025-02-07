import {Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {TranscoderModule} from "../transcoder/transcoder.module";
import {TranscoderService} from "../transcoder/transcoder.service";
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [TranscoderModule],
    controllers: [VideoController],
    providers: [VideoService, TranscoderService, PrismaService]
})
export class VideoModule {
}
