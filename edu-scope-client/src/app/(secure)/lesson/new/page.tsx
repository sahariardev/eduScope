'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect, useState} from "react";
import {BtnBold, BtnItalic, DefaultEditor, Editor, EditorProvider, Toolbar} from "react-simple-wysiwyg";

export default function NewContent() {

    const {updateHeaderName} = useHeaderStore();

    useEffect(() => {
        updateHeaderName('Lesson')
    }, []);

    const [html, setHtml] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {

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
                            value={name}
                            name="name"
                            onChange={e => setName(e.target.value)}
                            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Course Name"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Select Course:
                        </label>
                        <select
                            id="options"
                            className="w-3/4 rounded-md block border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Select Video:
                        </label>
                        <select
                            id="options"
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