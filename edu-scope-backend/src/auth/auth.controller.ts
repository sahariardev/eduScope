import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";
import {AuthGuard} from "./auth.gurd";
import {Public} from "../app.utils";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}
