import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function SingleItem(){
    const [item, setItem] = useState()
    const {id} = useParams()
    const [cliked, setCliked] = useState(null)
    
 
    const save = async()=>{ await axios.post('/to-save/'+id) 
                                setCliked((clicked) => !clicked)
                            
}
 
    useEffect(()=>{
        if(!id){
            return(<div>sorry,  couldn't find this item , the owner must've removed it</div>)
        }    
    axios.get("/single/"+id).then(response=>{
        setItem(response.data)
    })


}, [id])
   

if(!item){
    return(<div>sorry,  couldn't find this item , the owner must've removed it</div>)
}



    return(
        <div className=" mt-4  md:mx-32 rounded-md lg:px-44  px-5 ">
        
  
        <div className=" p-2 rounded-lg shadow-md mb-10 mt-5">      <div className="flex items-center justify-between mb-2 mt-5"><h2 className=" text-3xl font-semibold"> {item.theItem.title}</h2> <h2 className="font-semibold text-2xl text-primery">{item.theItem.price + item.theItem.currency}</h2> </div>
 <div className="grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-lg">
    <div><img className=" border rounded-lg aspect-square object-cover w-full" src={item.theItem.photos?.[0]} /></div>
    <div className=" grid  "><img className=" border rounded-lg aspect-square w-full object-cover" src={item.theItem.photos?.[1]} />
     <img className=" border rounded-lg aspect-square object-cover relative top-2 w-full" src={item.theItem.photos?.[2]} /></div>
    
</div> 
<button  className="flex gap-2" onClick={()=>{save()}}>{ cliked?<svg  xmlns="http://www.w3.org/2000/svg" fill="#00e1ff" viewBox="0 0 24 24" stroke-width="1.5" stroke="00e1ff" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg> :<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00e1ff" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>} Save the item</button>

       <h2 className=" font-semibold text-xl mt-2">Description</h2>
        <h2 className=" text-gray-500"> {item.theItem.description}</h2>  </div>
        <div className=" p-2 rounded-lg shadow-md mb-10">
<h2 className=" font-semibold text-xl mt-2">Address</h2>
<div className="flex gap-1  items-center text-gray-400 underline cursor-pointer"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
<a target="_blank" href={"https://maps.google.com/?q="+item.theItem.address}> <h2 className=""> {item.theItem.address}</h2> </a></div>

</div>
    <div className="p-2 rounded-lg shadow-md mb-5">
    <h2 className=" font-semibold text-xl mt-2">Posted by</h2>
<div className=" flex gap-2 items-center"> 
<img className="w-8 h-8 object-cover rounded-full border shadow-md" src={"http://localhost:5000/" +item.theUser.pfp}/> <h2 className=" text-primery font-semibold" >{item.theUser.name}</h2> </div>
<h2 className=" font-semibold text-xl mt-2 mb-3 " >Contact info</h2>
<h2 className=" text-gray-600"> <spam className='text-black font-semibold'>PhoneNo:</spam> {item.theItem.PhoneNumber}</h2>
<h2 className=" text-gray-600"> <spam className='text-black font-semibold'>Email:</spam> {item.theUser.email}</h2>

    </div>
         </div>

    )
}