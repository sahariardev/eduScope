import {IsNotEmpty, Max} from "class-validator";

export class CourseDto {

    id?: number;

    @IsNotEmpty()
    @Max(300)
    title: string;

    @Max(2000)
    description: string;

}