import {IsNotEmpty, Length, Max, Min} from "class-validator";

export class LessonDto {

    id?: number;

    @IsNotEmpty()
    @Length(1, 300)
    title: string;

    @IsNotEmpty()
    courseId: number;

    videoId?: number;

    @Length(0, 2000)
    description: string;

}