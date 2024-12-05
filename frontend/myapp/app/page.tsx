
import type { Metadata } from "next";
import '@/app/globals.css';
import Nav from '@/app/components/nav';
import Get from '@/app/components/get';
import games from '@/app/images/WhatsApp Image 2024-12-04 at 9.41.42 PM.jpeg';
import Image from "next/image";

export default function Home() {
  return (
    <div>
       <Nav/>
       <Get/>
       <Image src={games} alt="" width={1000} height={1000} className="w-full h-4/6"/>
    </div>
  );
}
