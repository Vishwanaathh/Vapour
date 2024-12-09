"use client";
import Hnav from '@/app/components/homenav';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Friendpage() {
    const [friends, setFriends] = useState([]);
    const [addf, setAddf] = useState("");
    const [rate, setRate] = useState("");
    const [message,setMessage]=useState("");
    const router = useRouter();

    // Fetch friends from the server
    const getFriend = async () => {
        const username = localStorage.getItem('username');
        if (username) {
            try {
                const response = await fetch(`http://localhost:5000/friend/getDetails/${encodeURIComponent(username)}`);
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        } else {
            console.error("Username not found in localStorage");
        }
    };

    useEffect(() => {
        getFriend();
    }, []);

    // Add a new friend
    const addFriend = async (e) => {
        e.preventDefault(); 
        const username = localStorage.getItem('username');
        if (username) {
            try {
                const response = await fetch(`http://localhost:5000/friend/enterDetails/${encodeURIComponent(username)}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name:username,
                        fname: addf,
                        frating: rate,
                    }),
                });

                if (response.ok) {
                
                    getFriend();
                    setAddf(""); 
                    setRate("");
                    setMessage("ADDED");
                } else {
                    console.error("Failed to add friend:", response.statusText);
                }
            } catch (error) {
                console.error("Error adding friend:", error);
            }
        } else {
            console.error("Username not found in localStorage");
        }
    };

    return (
        <div>
            <Hnav />
            <div className="min-h-screen bg-gradient-to-b from-black to-green-800 text-white">
                <h1 className="text-5xl">Friends</h1>
                <h2 className="mt-4">ADD FRIEND</h2>
                <form onSubmit={addFriend} className='text-black'>
                    <input
                        type="text"
                        className="bg-white border-black w-80 p-2"
                        value={addf}
                        onChange={(e) => setAddf(e.target.value)}
                        placeholder="Friend's Name"
                    />
                    <br />
                    <input
                        type="text"
                        className="bg-white border-black mt-2 w-80 p-2"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Friend's Rating"
                    />
                    <br />
                    <input type="submit" className="bg-green-800 text-white px-4 py-2 mt-4 cursor-pointer" value="Add Friend" />
                </form>
                {<div className="text-4xl"> {message}</div>}

                <ul>
                    {friends.map((friend, index) => (
                        <li key={index} className="flex text-black bg-gray-300 w-10/12 h-auto mt-10 ml-20 p-4 items-start text-4xl">
                            <div>
                                <div><strong>Name:</strong> {friend[0]}</div>
                                <div><strong>Rating:</strong> {friend[1]}</div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => router.push('/profile')}
                    className="bg-green-600 text-white px-4 py-2 mt-10"
                >
                    GO TO PROFILE
                </button><br></br>
                <button
                    onClick={() => router.push('/home')}
                    className="bg-green-600 text-white px-4 py-2 mt-10"
                >
                    GO TO HOME
                </button>

            </div>
        </div>
    );
}
