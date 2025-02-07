import { Global, Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import {TranscoderModule} from "../transcoder/transcoder.module";
import {TranscoderService} from "../transcoder/transcoder.service";

@Global()
@Module({
  imports: [TranscoderModule],
  providers: [SqsService, TranscoderService],
  exports: [SqsService]
})
export class SqsModule {}
