import {Body, Controller, Get, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('singin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @Get('test')
    getCountries() {
        return this.authService.getAllCountries();
    }
}
