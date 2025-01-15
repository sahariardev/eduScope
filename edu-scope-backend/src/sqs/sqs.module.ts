import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import {TranscoderModule} from "../transcoder/transcoder.module";
import {TranscoderService} from "../transcoder/transcoder.service";

@Module({
  imports: [TranscoderModule],
  providers: [SqsService, TranscoderService]
})
export class SqsModule {}
