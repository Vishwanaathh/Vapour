"use client";
import Hnav from "@/app/components/homenav";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation"

export default function Profile() {
    const [uname, setUname] = useState('');
    const [list, setList] = useState([]);
    const router=useRouter();

    const gett = async () => {
        const storedUsername = localStorage.getItem("username"); 
        if (storedUsername) {
            setUname(storedUsername); 
            try {
                const response = await fetch(`http://localhost:5000/user/${encodeURIComponent(storedUsername)}`);
                if (response.ok) {
                    const data = await response.json();
                    setList(data);
                } else {
                    console.error('Failed to fetch user details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    useEffect(() => {
        gett(); 
    }, []);

    const pfp=(nameee)=>`http://localhost:5000/user/image/${encodeURIComponent(nameee)}`;

    return (
        <div className="bg-gradient-to-b from-black to-green-900 min-h-screen">
            <Hnav />
            <h1 className="text-4xl text-white">Profile</h1>
            <div className="flex items-center justify-center  border-black rounded-3xl">
                <ul className="bg-green-700 h-80 w-80 flex flex-col items-center justify-center  border-black">
                    <li className='w-52 text-xl text-white bg-green-600 mb-10'>Username: {list[0]}</li>
                    <li className='w-52 text-xl text-white bg-green-600 mb-10'>No of games: {list[2]}</li>
                    <li className='w-52 text-xl text-white bg-green-600 mb-10'>Wishlist: {list[3]}</li>
                    
                
                </ul>
                <img className="w-72 h-80"
                    src={pfp(list[0])}
                    alt=''
                    height={300}
                    width={500}/>
                
            </div>
            <button onClick={()=>{router.push("/home")} }className="text-white bg-green-700 w-24 h-12 mt-16">Go to Home</button>
        </div>
    );
}
