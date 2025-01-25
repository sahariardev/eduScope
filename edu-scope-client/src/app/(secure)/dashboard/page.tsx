'use client'
import {useEffect} from "react";
import {useHeaderStore} from "@/app/hooks/useHeaderStore";

export default function Dashboard() {

    const {updateHeaderName} = useHeaderStore();

    useEffect(() => {
        updateHeaderName('Dashboard')
    }, []);

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-3 bg-gray-800 text-white p-4 rounded-t-lg">
                    <div className="font-bold">Course Name</div>
                    <div className="font-bold text-center">Progress</div>
                    <div className="font-bold text-right">Action</div>
                </div>

                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-3 p-4 items-center">
                        <div>Introduction to React</div>
                        <div className="text-center">
                            <span className="text-sm text-gray-600">75%</span>
                        </div>
                        <div className="text-right">
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-300 bg-white rounded-b-lg">
                    <div className="grid grid-cols-3 p-4 items-center">
                        <div>Introduction to JS</div>
                        <div className="text-center">
                            <span className="text-sm text-gray-600">75%</span>
                        </div>
                        <div className="text-right">
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}