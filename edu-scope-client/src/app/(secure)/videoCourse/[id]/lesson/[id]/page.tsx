import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios/index";
import {GET_ALL_COURSE_URL, GET_ONE_LESSON_URL} from "@/app/constant";

export default function LessonView({params}) {


    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();
    const resolvedParams = React.use(params);

    useEffect(() => {
        updateHeaderName('Lesson')
    }, []);

    const [html, setHtml] = useState('');
    const [title, setTitle] = useState('');
    const [videoId, setVideoId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [globalError, setGlobalError] = useState('');

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const response = await axios.get(GET_ONE_LESSON_URL + resolvedParams.id, {withCredentials: true});
                setTitle(response.data.title)
                setHtml(response.data.text)
                setVideoId(response.data.videoId || '')
                setCourseId(response.data.courseId)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchLessonData();
    }, []);
    return (
        <div>
            Hello World
        </div>
    )
}