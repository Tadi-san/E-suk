import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function Subpages(){
    const {subpage} = useParams()
    const [item, setItem] = useState([])

const showAllItems = async ()=>{

    await axios.get('/'+subpage).then(response =>{
        
        setItem(response.data)
    })
    
}
useEffect(()=>{
    showAllItems()
},[subpage])
    return(
    
        <div className=" md:px-10 mt-5 flex justify-center md:justify-around items-center gap-2 shadow-sm flex-wrap">
        {item.length>0 && item.map( item =>( <div  className="m-2 md:w-52 w-36 sm:h-56 md:h-96 p-1 bg-white hover:shadow-sm rounded-md hover:shadow-blue-200">
        <Link to={"/item/"+item._id} key={item._id}><img  className="md:w-52 w-36 h-56 md:h-72 object-cover rounded-2xl shadow-sm" loading="lazy" src={item.photos[0] }/></Link>
        <h2 className="font-bold text-center" >{item.title} </h2>  
        <h2 className="font-semibold truncate text-xs text-gray-500" >{item.description} </h2>  
        <div  className=" p-1 rounded-2xl font-semibold flex justify-between items-center text-primery">
        <h2 className="mt-5">{item.price + item.currency}</h2></div>
        </div>))}
    
        </div>
        
        )
}