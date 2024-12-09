"use client";
import Hnav from '@/app/components/homenav';
import {useState,useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Friendpage(){
    const [friends,setFriends]=useState([]);
    const router=useRouter();
    const getFriend=async()=>{
        const rey=localStorage.getItem('username');
        if(rey){
        const data=await fetch(`http://localhost:5000/friend/getDetails/${encodeURIComponent(rey)}`);
        const datj=await data.json();
        setFriends(datj)
    }
        else{
            return "Error"
        }
    }
    useEffect(()=>{
        getFriend();

    },[])
    return(<div>

          <Hnav/>
          
          <div className="min-h-screen bg-gradient-to-b from-black to-green-800 text-white">
          <h1 className="text-5xl">Friends</h1>
          <h2>ADD FRIEND</h2>
          <form>
            <input type="text" className="bg-white border-black"/><br></br>
            <input type="text" className="bg-white border-black mt-2"/><br></br>
            <input type="submit" className="bg-green-800"/>
          </form>
          <ul>
            {
                friends.map((friend,index)=>(
                    <li key={index} className='flex text-black bg-gray-300 w-10/12 h-auto mt-10 ml-20 p-4 items-start text-4xl' ><div><div>Name: {friend[0]}</div>
                    <div>Rating: {friend[1]}</div></div>
                    </li>
                ))
            }
          </ul>
          <button onClick={()=>router.push('/profile')} className='bg-green-600 text-white mt-10'>GO TO PROFILE</button>
          </div>
       
    </div>)
}