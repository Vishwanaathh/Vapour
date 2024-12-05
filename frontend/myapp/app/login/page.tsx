'use client'; // Mark this file as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for app directory
import Nav from '@/app/components/nav';
import Robo from '@/app/images/f5f787b192fe6252ad71d37077e30868-removebg-preview.png';
import Image from 'next/image';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Use router from next/navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the credentials to the Flask API
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token); // Save JWT token
                setError('');
                router.push('/home'); // Use `router.push` from `next/navigation`
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Failed to connect to the server');
            console.error('Error:', err);
        }
    };

    return (
        <div className="bg-gradient-to-b from-black to-green-900 h-screen items-center justify-center">
            <Nav />
            <div className="flex bg-green-200 border-black h-4/6 w-3/4 ml-44 mt-14 rounded-3xl">
                <div id="formm" className="mt-10 ml-5">
                    <h1 className="text-4xl ml-2">Resume your journey</h1>
                    <h1 className="text-xl ml-2 mt-10">Email</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            className="ml-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <h1 className="text-xl ml-2 mt-10">Password</h1>
                        <input
                            type="password"
                            placeholder="Password"
                            className="ml-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <input
                            type="submit"
                            value="Sign in"
                            className="bg-green-600 ml-2 mt-2 w-44 text-white rounded-xl"
                        />
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <div>
                    <Image src={Robo} alt="Robo Image" height={1000} width={1000} />
                </div>
            </div>
        </div>
    );
}
