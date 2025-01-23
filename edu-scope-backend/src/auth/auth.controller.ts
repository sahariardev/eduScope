import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";
import {Public} from "../app.utils";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @Post('signup')
    signup(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signup(dto, res);
    }

    @Public()
    @Post('signin')
    signin(@Body() dto: AuthDto, @Res() res: Response) {
        return this.authService.signin(dto);
    }
}
