'use client'
import {useCourseInfoStore} from "@/app/hooks/useCourseInfoStore";

export default function ViewCourse() {

    const {currentCourse} = useCourseInfoStore();

    return (
        <div>
            {currentCourse.description}
        </div>
    )
}