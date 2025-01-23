"use client"
import Link from "next/link";
import React, {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [errors, setErrors] = useState<{ email: string, password: string, repeatPassword: string, name: string }>({
        email: "",
        password: "",
        repeatPassword: "",
        name: ""
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({
            email: "",
            password: "",
            repeatPassword: "",
            name: ""
        });

        if (password !== repeatPassword) {
            setErrors({
                email: "",
                password: "",
                repeatPassword: "Password does not match",
                name: ""
            });

            return;
        }

        const url = 'http://localhost:8080/auth/signup';

        const data = {
            "email": email,
            "name": name,
            "password": password
        }

        try {
            const response = await axios.post(url, data);
            console.log(response);
            router.push('/dashboard');

        } catch (error) {
            console.log(error)
            setGlobalError(error.response.data.message.join(', '))
        }

    }

    return (
        <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
            <div className="flex w-1/4 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Signup</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            {globalError && <div className="text-red-500">{globalError}</div>}
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email
                                address</label>
                            <div className="mt-2">
                                <input type="email"
                                       name="email"
                                       id="email"
                                       autoComplete="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       required
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                {errors.email && <div className="text-red-500">{errors.email}</div>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                            <div className="mt-2">
                                <input type="name"
                                       name="name"
                                       id="name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input type="password"
                                       name="password"
                                       id="password"
                                       autoComplete="current-password"
                                       required
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                {errors.password && <div className="text-red-500">{errors.password}</div>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium text-gray-900">Repeat Password</label>
                            </div>
                            <div className="mt-2">
                                <input type="password"
                                       name="repeatPassword"
                                       id="repeatPassword"
                                       autoComplete="current-password"
                                       required
                                       value={repeatPassword}
                                       onChange={(e) => setRepeatPassword(e.target.value)}
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>

                                {errors.repeatPassword && <div className="text-red-500">{errors.repeatPassword}</div>}
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                up
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already a member?
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
                </p>
            </div>
        </div>

    );

}