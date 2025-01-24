import {IsNotEmpty, Length, Max, Min} from "class-validator";

export class CourseDto {

    id?: number;

    @IsNotEmpty()
    @Length(1, 300)
    title: string;

    @Length(0, 2000)
    description: string;

}