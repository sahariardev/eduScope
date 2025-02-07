'use client'

import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {GET_ONE_LESSON_URL, MARK_AS_COMELETED_URL} from "@/app/constant";

export default function LessonView({params}) {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();
    const resolvedParams = React.use(params);

    const [alreadyCompleted, setAlreadyCompleted] = useState(false);
    const [html, setHtml] = useState('');
    const [title, setTitle] = useState('');
    const [videoId, setVideoId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [globalError, setGlobalError] = useState('');

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const response = await axios.get(GET_ONE_LESSON_URL + resolvedParams.lessonId, {withCredentials: true});
                const lesson = response.data;
                setTitle(response.data.title)
                setHtml(response.data.text)
                setVideoId(response.data.videoId || '')
                setCourseId(response.data.courseId);

                if(lesson.UserProgress.length > 0) {
                    setAlreadyCompleted(true)
                }

                updateHeaderName(`${lesson.title}`)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchLessonData();
    }, []);

    const handleOnClicked = async () => {
        try {
            const response = await axios.post(`${MARK_AS_COMELETED_URL}${resolvedParams.lessonId}`, {}, {withCredentials: true});
            setAlreadyCompleted(!alreadyCompleted);

            router.push(`/course/${courseId}`);
        } catch (error) {
            console.error("Error saving progress:", error);
            setGlobalError("Error saving progress");
        }
    }

    return (
        <div>
            <div>
                {html}
            </div>
            {
                videoId && (
                    <div>
                        {/*vide player*/}
                    </div>
                )
            }

            <div className="mx-auto mt-8">
                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-2 p-4 items-center">
                        <div></div>
                        <div className="text-right">
                            <button
                                onClick={handleOnClicked}
                                className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                {alreadyCompleted ? "Mark as uncomeleted" : "Mark as completed"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}