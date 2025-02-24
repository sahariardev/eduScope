'use client'
import {useCourseInfoStore} from "@/app/hooks/useCourseInfoStore";
import {useRouter} from "next/navigation";

export default function ViewCourse() {

    const {currentCourse} = useCourseInfoStore();
    const router = useRouter();
    console.log(currentCourse)

    return (
        <div>
            {currentCourse.description}

            <div>
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="grid grid-cols-2 bg-gray-800 text-white p-4 rounded-t-lg">
                        <div className="font-bold">Course Name</div>
                        <div className="font-bold text-right">Action</div>
                    </div>

                    {currentCourse && currentCourse.lessons?.map(lesson => {
                        return (<div className="divide-y divide-gray-300 bg-white rounded-b-lg" key={lesson.id}>
                            <div className="grid grid-cols-2 p-4 items-center">
                                <div>{lesson.title}</div>
                                <div className="text-right">
                                    <button
                                        onClick={() => router.push(`/videoCourse/${currentCourse.id}/lesson/${lesson.id}`)}
                                        className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}