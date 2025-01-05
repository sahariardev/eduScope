import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}