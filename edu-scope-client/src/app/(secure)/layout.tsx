'use client'
import {ReactNode, useState} from "react";

interface Props {
    children: ReactNode;
}


const MainLayout = ({children}: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <button
                className="md:hidden p-4 bg-gray-800 text-gray-100"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? 'Close' : 'Menu'}
            </button>

            <aside
                className={`fixed inset-y-0 left-0 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 bg-gray-800 text-gray-100 flex flex-col transition-transform duration-200 md:translate-x-0 md:relative`}
            >
                <div className="p-4 font-bold text-lg border-b border-gray-700">
                    EduScope
                </div>
                <nav className="flex-grow p-4 space-y-4">
                    <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
                        Dashboard
                    </a>
                    <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
                        Settings
                    </a>
                    <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
                        Profile
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 bg-gray-100 p-8 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="text-gray-700">
                    {children}
                </div>
            </main>
        </div>
    );
}


export default MainLayout;