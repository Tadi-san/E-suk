
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Catagorizer from "../catagorizer"
import { UserContext } from "../usercontext"
export default  function Indexpage(){
const [item, setItem] = useState([])
const {user} = useContext(UserContext)
const showAllItems = async ()=>{

    await axios.get('/all-items').then((response)=>{
        
        setItem(response.data)
    })
    
}
useEffect(()=>{
    showAllItems()
},[])


    return (<div className=" bg-gray-50 h-screen">
    <div>
       
    </div>
<Catagorizer className="px-5 md:px-10" />
    <div className=" md:px-10 mt-5 flex justify-center md:justify-around items-center gap-2 shadow-sm flex-wrap">
    {item.length>0 && item.map( item =>( <div key={item._id}  className="m-2 md:w-52 w-36 sm:h-56 md:h-96 p-1 bg-white hover:shadow-sm rounded-md hover:shadow-blue-200">
    <Link to={"/item/"+item._id} key={item._id}><img loading="lazy" className="md:w-52 w-36 h-56 md:h-72 object-cover rounded-2xl shadow-sm" src={item.photos[0] }/></Link>
    <h2 className="font-bold text-center" >{item.title} </h2>  
    <h2 className="font-semibold truncate text-xs text-gray-500" >{item.description} </h2>  
    <div  className=" p-1 rounded-2xl font-semibold flex justify-between items-center text-primery">
    <h2 className="mt-5">{item.price + item.currency}</h2></div>
    </div>))}

    </div>

    

 {user && <Link to={'/add-items'} className=" sticky cursor-pointer px-5 py-3 rounded-full bg-primery shadow-lg text-white font-semibold w-fit bottom-5 ">
    +
   </Link>}
    </div>)
      
}