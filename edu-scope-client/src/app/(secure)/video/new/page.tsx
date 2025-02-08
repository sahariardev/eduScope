'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect, useState} from "react";
import axios from "axios";
import {VIDEO_UPLOAD_INITIALIZE_URL, VIDEO_UPLOAD_CHUNK_URL, VIDEO_UPLOAD_COMPLETE_URL} from "@/app/constant";
import {useRouter} from "next/navigation";

export default function NewVideo() {
    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();

    useEffect(() => {
        updateHeaderName('Video')
    }, []);

    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFileUpload(selectedFile);
    }

    const handleFileUpload = async (file) => {
        try {
            const initializeRes = await axios.post(VIDEO_UPLOAD_INITIALIZE_URL, {fileName: file.name, title: title});
            const {uploadId} = initializeRes.data;

            const chunkSize = 5 * 1024 * 1024;
            const totalchunks = Math.ceil(file.size / chunkSize);
            const uploadPromises = [];

            let start = 0;
            for (let chunkIndex = 0; chunkIndex < totalchunks; chunkIndex++) {
                const chunk = file.slice(start, start + chunkSize);
                start = start + chunkSize;

                const formData = new FormData();
                formData.append("fileName", file.name);
                formData.append("file", chunk);
                formData.append("totalChunks", totalchunks);
                formData.append("chunkIndex", chunkIndex);
                formData.append("uploadId", uploadId);

                const uploadPromise = axios.post(VIDEO_UPLOAD_CHUNK_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                uploadPromises.push(uploadPromise);
            }

            const responses = await Promise.all(uploadPromises);

            const etags = [];

            responses.forEach((response, index) => {
                etags.push(
                    {
                        ETag: response.data.ETag,
                        PartNumber: response.data.partNumber
                    }
                );
            });

            const completeRes = await axios.post(VIDEO_UPLOAD_COMPLETE_URL, {
                fileName: file.name,
                title: title,
                totalChunks: totalchunks,
                uploadId: uploadId,
                etags: JSON.stringify(etags)
            });

            router.push('/video');
        } catch (error) {
            console.log('Something went wrong' + error);
        }
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg p-4">
                <form className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Video Title:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={title}
                            name="name"
                            onChange={e => setTitle(e.target.value)}
                            className="w-3/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter video title"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor="name" className="w-1/5 font-medium text-gray-700">
                            Upload Video:
                        </label>

                        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
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