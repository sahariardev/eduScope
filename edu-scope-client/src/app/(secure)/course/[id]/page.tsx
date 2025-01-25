'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import React, {useEffect, useState} from "react";
import {DefaultEditor} from "react-simple-wysiwyg";
import axios from "axios";
import {CREATE_NEW_COURSE_URL, GET_ALL_COURSE_URL, GET_ONE_COURSE_URL} from "@/app/constant";
import {useRouter} from "next/navigation";


export default function CourseUpdate({params}) {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();
    const resolvedParams = React.use(params);

    useEffect(() => {
        updateHeaderName('Course')
    }, []);

    const [html, setHtml] = useState('');
    const [title, setTitle] = useState('');
    const [globalError, setGlobalError] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(GET_ONE_COURSE_URL + resolvedParams.id, {withCredentials: true});
            console.log(response);
            setTitle(response.data.title || '');
            setHtml(response.data.description|| '');
        }

        fetchCourse();
    }, [resolvedParams.id]);

    const handleSubmit = async (e) => {

        const data = {
            "title": title,
            "description": html,
            "id" : resolvedParams.id
        }

        try {
            const response = await axios.post(CREATE_NEW_COURSE_URL, data, {withCredentials: true});
            console.log(response);
            router.push('/course');

        } catch (error) {
            console.log(error)
            setGlobalError(error.response.data.message.join(', '))
        }
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg p-4">
                {globalError && <div className="text-red-500">{globalError}</div>}
                <form className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Course Name"
                        />
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