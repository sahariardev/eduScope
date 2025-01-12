'use client'
import React, {useState} from 'react';
import axios from "axios";

const UploadForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFileUpload(selectedFile);
    }

    const handleFileUpload = async (file) => {
        try {

            const formData = new FormData();
            formData.append('fileName', file.name);
            const initializeRes = await axios.post('http://localhost:8080/video/initialize', {fileName: file.name});

            const {uploadId} = initializeRes.data;
            console.log('Upload ID is', uploadId);

            const chunkSize = 5 * 1024 * 1024;
            const totalchunks = Math.ceil(file.size / chunkSize);

            console.log(totalchunks);

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

                const uploadPromise = axios.post('http://localhost:8080/video/uploadChunk', formData, {
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
                console.log(`Response from upload ${index + 1}:`, response);
            });

            const completeRes = await axios.post('http://localhost:8080/video/completeUpload', {
                fileName: file.name,
                totalChunks: totalchunks,
                uploadId: uploadId,
                etags: JSON.stringify(etags)
            });
        } catch (error) {
            console.log('Something went wrong' + error);
        }
    }


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <button
                    className="inline-flex text-white bg-indigo-500 border-0 py-2
                px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadForm;