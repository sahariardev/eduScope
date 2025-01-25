'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ContentList() {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();

    useEffect(() => {
        updateHeaderName('Lessons')
    }, []);

    const handleCreateNew = () => {
        router.push('/lesson/new')
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-4 bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="font-bold">Lesson Title</div>
                    <div className="font-bold">Course Title</div>
                    <div className="font-bold">Video Title</div>
                    <div className="font-bold text-right">Action</div>
                </div>

                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-4 p-4 items-center">
                        <div>Introduction to React</div>
                        <div>Introduction to React</div>
                        <div></div>
                        <div className="text-right">
                            <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-600">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
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