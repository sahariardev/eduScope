import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule,  { cors: true });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe(
        // {
        //     whitelist: true
        // }
    ))
    await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
