'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {GET_ALL_COURSE_URL} from "@/app/constant";

export default function Course() {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        updateHeaderName('Course')
    }, []);

    const handleCreateNew = () => {
        router.push('/course/new')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_ALL_COURSE_URL, {withCredentials: true});
                console.log(response.data); // Handle the data as needed
                setCourseList(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-2 bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="font-bold">Course Name</div>
                    <div className="font-bold text-right">Action</div>
                </div>

                {courseList.map(course => {
                    return (<div className="divide-y divide-gray-300 bg-white rounded-b-lg" key={course.id}>
                        <div className="grid grid-cols-2 p-4 items-center">
                            <div>{course.title}</div>
                            <div className="text-right">
                                <button
                                    onClick={() => router.push(`/course/${course.id}`)}
                                    className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-2 p-4 items-center">
                        <div></div>
                        <div className="text-right">
                            <button
                                onClick={handleCreateNew}
                                className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                Create New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}