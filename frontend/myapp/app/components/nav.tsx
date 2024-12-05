export default function Nav(){
 return(
    <nav className="flex bg-black items-center">
    <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg" href="http://www.w3.org/1999/xlink">
<rect width="101" height="101" fill="url(#pattern0_4_27)"/>
<defs>
<pattern id="pattern0_4_27" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image0_4_27" transform="translate(0 -0.0384615) scale(0.00384615)"/>
</pattern>
<image id="image0_4_27" width="260" height="280" href="data:image/png;base64,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"/>
</defs>
</svg>

    <h1 className="text-5xl  text-white"><a href="http://localhost:3000">Vapour</a></h1>
    <div className="flex absolute right-0 space-x-10 mr-10">
    <div></div>
    <button className="bg-green-800 text-white mt-2 w-32 h-12 rounded-3xl"><a href="http://localhost:3000/login">Login</a></button>
    <button className="bg-white mt-2 w-32 h-12 rounded-3xl"><a href="http://localhost:3000/signup">Sign up</a></button></div>
    </nav>
 )
}