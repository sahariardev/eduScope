'use client'
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ContentList() {

    const {updateHeaderName} = useHeaderStore();
    const router = useRouter();

    useEffect(() => {
        updateHeaderName('Content')
    }, []);

    const handleCreateNew = () => {
        router.push('/course/new')
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-3 bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="font-bold">Content Title</div>
                    <div className="font-bold">Video Title</div>
                    <div className="font-bold text-right">Action</div>
                </div>

                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-3 p-4 items-center">
                        <div>Introduction to React</div>
                        <div>Introduction to React</div>
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