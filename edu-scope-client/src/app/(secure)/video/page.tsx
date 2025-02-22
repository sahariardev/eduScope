'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {GET_ALL_VIDEO_URL} from "@/app/constant";

export default function ContentList() {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();
    const [videoList, setVideoList] = useState<Video[]>([]);

    type Video = {
        id: string;
        title: string;
        processed: boolean;
      };

    useEffect(() => {
        updateHeaderName('Videos')
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_ALL_VIDEO_URL, {withCredentials: true});
                console.log(response.data);
                setVideoList(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-4 bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="font-bold">Video Title</div>
                    <div className="font-bold">Processed</div>
                    <div className="font-bold text-right">Action</div>
                </div>

                {videoList.map(video => {
                    return (<div className="divide-y divide-gray-300 bg-white rounded-b-lg" key={video.id}>
                        <div className="grid grid-cols-4 p-4 items-center">
                            <div>{video.title}</div>
                            <div>{video.processed ? 'Yes' : 'No'}</div>
                            <div className="text-right">
                                <button
                                    onClick={() => router.push(`/video/${video.id}`)}
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
                                onClick={() => router.push('/video/new')}
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