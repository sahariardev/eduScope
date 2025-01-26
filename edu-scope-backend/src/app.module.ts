import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {VideoModule} from './video/video.module';
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from '@nestjs/axios';
import { SqsModule } from './sqs/sqs.module';
import {ScheduleModule} from "@nestjs/schedule";
import { TranscoderModule } from './transcoder/transcoder.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            global: true
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        AuthModule,
        UserModule,
        VideoModule,
        PrismaModule,
        SqsModule,
        TranscoderModule,
        CourseModule,
        LessonModule,
    ],
})
export class AppModule {
}
