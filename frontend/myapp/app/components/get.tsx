
import Image from "next/image";
import astro from '@/app/images/image_2024-12-03_214055168-removebg-preview.png';


export default function Get(){
    return(
        <div>
            <div id="nextt" className="bg-gradient-to-b from-black to-green-900">
  <div id="comp" className="flex justify-center">
    <div id="getstarted">
      <h1 className="text-7xl mt-20 text-white">Gaming,<br />reimagined.</h1><br />
      <button className="text-3xl bg-green-800 text-white w-64 rounded-3xl h-14" ><a href="http://localhost:3000/signup">Get Started</a></button>
    </div>
    <Image src={astro} alt="" width={400} height={400} />
  </div>
</div>
        </div>
    )
}