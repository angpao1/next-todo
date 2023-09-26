import Link from "next/link";
import {useLazyQuery} from '@apollo/client';
import {LOGIN_USER} from '@/grahpql/auth-queries';
import React, {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'

export default function SignInPage() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        // Check if the user key exists in localStorage
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/todo');
        }
    }, [router]);

    const [loginUser, {loading, error}] = useLazyQuery(LOGIN_USER, {
        onError: (error) => {
            setErrorMessage("Username or password is incorrect");
        },
        onCompleted: (data) => {
            if (data.users.length > 0) {
                localStorage.setItem('user', JSON.stringify(data.users[0]));
                router.push('/todo');
            } else {
                setErrorMessage("Username or password is incorrect");
            }
        }
    });

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
        const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
        await loginUser({variables: {username, password}});
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="text" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Username"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-center text-red-500 mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>

                    <div className="text-center mt-12">
                        <span>
                            Don&apos;t have an account?
                        </span>
                        <Link
                            className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
                            href="/signup"
                        >Create One</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}