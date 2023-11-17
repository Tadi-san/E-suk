import {useContext, useState} from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "./usercontext"
export default function Secondheader (){
    const {user, redirect, setRedirect} = useContext(UserContext)
 const [tosearch, setToSerch] = useState('')

 function search(ev){
   ev.preventDefault()
   setRedirect(true)
 }
 
 if (redirect) {
 return <Navigate to={'/search/'+tosearch} />
 setRedirect(false)
 }

    return(  <div className="h-fit mt-5 px-3 mb-5 z-10"><header className='  gap-2 items-center  relative' > 
    <div className="flex justify-between items-center h-10">
    <Link to= {'/'} className="font-semibold shadow-blue-100 shadow-md p-2 rounded-sm cursor-pointer flex items-center">
    <h2 className=" text-primery "><span className=" text-primery text-2xl">ኢ</span>-ሱቅ</h2>
     </Link>
     <Link to={'/account/bought'}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>

     </Link>
     <div className="flex justify-center ">
    <div >
    <form className="flex">
    <input className="" type="search" value={tosearch} onChange={(ev)=>{setToSerch(ev.target.value)}}/>
      <button className=" bg-primery text-white px-1 rounded-2xl" onClick={(ev)=>search(ev)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>
    </form>
     
    </div>
   </div>
    <Link to = {user?"/account":"/login"} className="font-semibold bg-transparent rounded-2xl cursor-pointer">
   {!!user?<div className="flex flex-col items-center w-fit h-fit bg-transparent">
   <img className="primary shadow-md border " src={user.pfp} />
   <h2 className=" text-sm text-gray-500 bg-white border truncate shadow-lg rounded-2xl p-1">{user.name}</h2>
   
   </div>:<div>Login</div>}
    </Link>
    </div>
    
   </header>

   </div>)
}