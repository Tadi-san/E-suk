
import { Outlet } from "react-router-dom"
import Header from "./header"
import { UserContext } from "./usercontext"
import Secondheader from "./secondHeader"
import { useContext } from "react"

export default function Layout(){
    const {user} = useContext(UserContext)

    return(
        <div className="sm:grid sm:grid-cols-1 ">
       {user?<Secondheader className='z-10' />:<Header /> }      
        <Outlet />
    </div>)
}