import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
