"use client";
import Nav from '@/app/components/nav';
import Robo from '@/app/images/f5f787b192fe6252ad71d37077e30868-removebg-preview.png';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function signin(){
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");
  const [confirm,setConfirm]=useState("");
  const [error,setError]=useState("");
  const router = useRouter();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data=JSON.stringify({
      username:name,
      password:pass
    });
    
    const response=await fetch('http://127.0.0.1:5000/signin',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:data

    })
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token); // Save JWT token
      setError('');
      router.push('/login'); // Use `router.push` from `next/navigation`
  } else {
      const errorData = await response.json();
      setError(errorData.message || 'Invalid credentials');
  }
};

  
  
    return(<div className='bg-gradient-to-b from-black to-green-900 h-screen items-center justify-center'>
         <Nav/>
         <div className=" flex bg-green-200 border-black h-4/6 w-3/4 ml-44 mt-14 rounded-3xl">
           <div id="formm" className='mt-10 ml-5'>
            <h1 className="text-4xl ml-2">Start your journey</h1>
            <h1 className="text-xl ml-2 mt-10" >Email</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" className="ml-2" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <h1 className="text-xl ml-2 mt-5"> Password</h1>
                <input type="text" placeholder="Password" className="ml-2" value={pass} onChange={(e)=>{setPass(e.target.value)}}/><br></br>
            
                <h1 className="text-xl ml-2 mt-5">Confirm Password</h1>
                <input type="text" placeholder="Confirm Password" className="ml-2" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}/><br></br>
                <input type="submit" placeholder="Sign up" className="bg-green-600 ml-2 mt-2 w-44 text-white rounded-xl"/>


            </form>
           </div>
           <div>
            <Image src={Robo} alt="" height={1000} width={1000}/>
           </div>
         </div>
    </div>)
}