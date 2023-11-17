import { useContext, useEffect, useState } from "react"
import { UserContext } from "./usercontext"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Posted (){
const [items, setItems] = useState([])
const [sold, setSold] = useState('')
 const {user} = useContext(UserContext)

 useEffect(()=>{
    axios.get("/posted").then(({data})=>{
        setItems(data)

     
    })
 },[])



 
 if(!user){
    return
 }
 if(!items){
    return
 }
    
    return(<div className=" mt-5">
         {items.length>0 && items.map(item =>( <div  className=" cursor-pointer my-3 z-0 flex gap-2 bg-gray-100 p-1 items-center">
    <Link to = {'/account/posted/' + item._id} className="w-fit shrink-0 grow:">
    {item.photos.length>0 && (<img src={"http://localhost:5000/" + item.photos[0]} className="w-24 h-24 object-cover rounded-2xl bg-slate-100"/>)}
       
    </Link>
       <Link to = {'/account/posted/' + item._id}>
    <h2 className=" text-md font-semibold grow-0 shrink-0 ">{item.title}</h2>
    <p className=" text-sm text-gray-500 ">{item.description}</p>
        </Link>

        

    </div>)
    )}
    <Link to={'/add-items'} className="bg-primery p-2 w-full text-white font-semibold rounded-2xl cursor- grid text-center" >Add new</Link>
    </div>
       )
}