"use client";
import HNav from '@/app/components/homenav';
import jwt_decode from 'jwt-decode'; 
import { useEffect, useState } from 'react';
import Icon from '@/app/components/icon';
import {useRouter} from "next/navigation";

export default function Home() {
    const [username, setUsername] = useState('');
    const [games, setGames] = useState([]);
    const [toggle,setToggle]=useState(true);
    const [byg,setByg]=useState([]);
    const [genre,setGenre]=useState("");
    const router=useRouter();

    const getdata = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/allgames", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch data:", response.statusText);
                return;
            }

            const data = await response.json();
            setGames(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    const getImageUrl = (name) => `http://localhost:5000/image/${encodeURIComponent(name)}`;
    
    const handleSubmitt=async(e)=>{
             e.preventDefault();
             const token = localStorage.getItem("token");
             const response=await fetch(`http://localhost:5000/genre/${genre}`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer${token}`

                }
             });
             const res=await response.json()
             setByg(res);
             setToggle(!toggle);


    }
    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <HNav />

            <div className="bg-green-500 w-screen h-10 flex items-center justify-center text-white font-mono"> Hot and Trending games</div>
            <form onSubmit={handleSubmitt}>
                <input type="text" placeholder="Search by genre" className="w-5/6 ml-14 mb-2 mt-1" value={genre} onChange={(e)=>{setGenre(e.target.value)}}/>
                <input type="submit" className="bg-green-700 text-white rounded-lg ml-1 w-16" placeholder='search'/>
            </form>
            <h1 className="text-white text-5xl">Market Place</h1><br />
            <h2 className="text-white text-2xl">Welcome {username}</h2>
            <ul>
                {toggle&&(games.length > 0 ? (
                    games.map((game, index) => (
                        <li
                            key={index}
                            className="flex text-black bg-gray-300 w-10/12 h-auto mt-10 ml-20 p-4 items-start text-4xl"
                        >
                            
                           
                            <img
                                src={getImageUrl(game[0])}
                                alt={""}
                                className="w-48 h-48 object-cover mt-4"
                            />
                            <div className='flex flex-col ml-96 mr-48'>
                             <p className='text-4xl'>{game[0]}</p>
                            <p className="text-2xl">Price:{game[1]}</p>
                            <p className="text-2xl">Genre:{game[2]}</p>
                            <p className="text-2xl">Discount:{game[3]}</p></div>
                            <Icon/>
                        </li>
                    ))
                ) : (
                     <li className="text-white">No games available or loading...</li>
                ))}
                {!toggle&&(
                    byg.map((game,index)=>(
                        <li key={index}  className="flex text-black bg-gray-300 w-10/12 h-auto mt-10 ml-20 p-4 items-start text-4xl">
                              <img src={getImageUrl(game[0])} alt={""}
                                className="w-48 h-48 object-cover mt-4"
                            />
                            <div className='flex flex-col ml-96 mr-48'>
                             <p className='text-4xl'>{game[0]}</p>
                            <p className="text-2xl">Price:{game[1]}</p>
                            <p className="text-2xl">Genre:{game[2]}</p>
                            <p className="text-2xl">Discount:{game[3]}</p></div>
                            <Icon/>

                        </li>
                    )
                ))
                }
            </ul>
            <div>{!toggle&&<button className="bg-green-700 text-white w-24 h-10" onClick={()=>setToggle(!toggle)}>GO BACK</button>}</div>
            <button onClick={()=>{router.push("/profile")} }className="text-white bg-green-700 w-24 h-12 mt-16 ">Go to Profile</button>
            <p>Parashuram Production 2024</p>
        </div>
    );
}
