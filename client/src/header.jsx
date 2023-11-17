import {useContext} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "./usercontext"


export default function Header(){
  const {user} = useContext(UserContext)


    return(  <div className="h-fit "><header className='  gap-2 items-center  relative' > 
    <div className="flex justify-between my-2 px-2">
    <Link to={'/'} className="font-semibold shadow-blue-100 shadow-sm p-2 rounded-md cursor-pointer flex items-center">
    <h2 className=" text-primery text-xs md:text-sm font-light"><span className=" text-primery text-2xl md:text-2xl font-semibold">ኢ</span>-ሱቅ</h2>
     </Link>
     <div className=" w-fit p-2 border flex justify-center items-center ">
      <h2 className=" font-sans md:text-xl text-xs">login to enjoy the whole feature🙂</h2>
     </div>
    
    <Link to = {user?"/account":"/login"} className="font-semibold bg-transparent rounded-2xl cursor-pointer">
   {!!user?<div className="flex flex-col items-center w-fit h-fit bg-transparent">
   <img className="primary shadow-md border " src={user.pfp} />
   <h2 className=" text-sm text-gray-500 bg-white border shadow-lg rounded-2xl p-1">{user.name}</h2>
   
   </div>:<div className="border p-2 rounded-2xl shadow-lg">Login</div>}
    </Link>
    </div>
    
   </header>

   </div> )
}