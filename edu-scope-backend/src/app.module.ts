import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {VideoModule} from './video/video.module';
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from '@nestjs/axios';

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
        AuthModule,
        UserModule,
        VideoModule,
        PrismaModule,
    ],
})
export class AppModule {
}
