import {IsEmail, IsNotEmpty, IsString, Max} from "class-validator";

export class CourseDto {
    @IsNotEmpty()
    @Max(300)
    title: string;

    @Max(2000)
    description: string;

}