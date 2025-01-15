import { Module } from '@nestjs/common';
import { TranscoderService } from './transcoder.service';

@Module({
  providers: [TranscoderService]
})
export class TranscoderModule {}
