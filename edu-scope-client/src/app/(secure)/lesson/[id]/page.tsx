'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import React, {useEffect, useState} from "react";
import {DefaultEditor} from "react-simple-wysiwyg";
import axios from "axios";
import {CREATE_NEW_LESSON_URL, GET_ALL_COURSE_URL, GET_ONE_LESSON_URL} from "@/app/constant";
import {useRouter} from "next/navigation";

export default function EditLesson({params}) {

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
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_ALL_COURSE_URL, {withCredentials: true});
                setCourseList(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

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

    const handleSubmit = async (e) => {
        const data = {
            description: html,
            title: title,
            videoId: videoId,
            courseId: courseId,
            id: resolvedParams.id,
        }

        try {
            const response = await axios.post(CREATE_NEW_LESSON_URL, data, {withCredentials: true});
            router.push('/lesson');

        } catch (error) {
            setGlobalError(error.response.data.message.join(', '))
        }
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg p-4">
                <form className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Lesson Title:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={title}
                            name="name"
                            onChange={e => setTitle(e.target.value)}
                            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Course Name"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor="course" className="w-1/5 font-medium text-gray-700">
                            Select Course:
                        </label>
                        <select
                            id="course"
                            value={courseId}
                            onChange={e => setCourseId(e.target.value)}
                            className="w-3/4 rounded-md block border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option>Please Select</option>
                            {courseList.map(course => <option value={course.id}
                                                              key={course.id}>{course.title}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor="video" className="w-1/5 font-medium text-gray-700">
                            Select Video:
                        </label>
                        <select
                            id="video"
                            value={videoId}
                            onChange={e => setVideoId(e.target.value)}
                            className="w-3/4 rounded-md block border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Description:
                        </label>

                        <div
                            className="w-3/4 rounded-md shadow-sm"
                        >
                            <DefaultEditor value={html} onChange={e => setHtml(e.target.value)}/>
                        </div>

                    </div>
                </form>

            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-2 p-4 items-center">
                        <div></div>
                        <div className="text-right">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}