'use client'
import {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import PageTitle from "@/app/components/pageTitle";
import {useNavbarStore} from "@/app/hooks/useNavbarStore";
import {GET_ME} from "@/app/constant";
import axios from "axios";

interface Props {
    children: ReactNode;
}

const MainLayout = ({children}: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {navbarUrls} = useNavbarStore();
    const [me, setMe] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_ME, {withCredentials: true});
                console.log(response.data); // Handle the data as needed
                setMe(response.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();         
    });

    return (
        <div className="flex h-screen ">
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
                    <a href='/'>EduScope</a>
                </div>
                <nav className="flex-grow p-4 space-y-4">

                    {navbarUrls.map(navbar => {

                        if (navbar.adminUrl && !me.isAdmin) {
                            return;
                        }

                        return (
                            <Link href={navbar.href} key={navbar.href} className="block px-4 py-2 rounded hover:bg-gray-700" data-title="Dashboard"
                            >
                                {navbar.title}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 bg-gray-100 p-8 overflow-auto">
                <PageTitle/>
                <div className="text-gray-700">
                    {children}
                </div>
            </main>
        </div>
    );
}


export default MainLayout;