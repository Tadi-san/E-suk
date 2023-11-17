import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Posted from '../posted'
import Profile from './profile'
import Saved from '../saved'

export default function AccountPage(){
   const style = "w-fit py-2 px-6 border-gray-100  rounded-3xl font-semibold"
   const selectedStyle = "w-fit py-2 px-6 border-gray-100 shadow-md rounded-3xl font-semibold bg-primery text-white" 
    let {subpage} = useParams()
       if(subpage === undefined){
        subpage = "bought"
       }
   

    return (<div className=' absolute w-full mt-5 md:px-32 px-5 z-0'> 
    <div className='flex justify-center w-ful mt-10'>
    <div className='  border-b-2 border-b-sky-300 w-fit p-1 grid grid-cols-3 gap-3 rounded-t-3xl'>
    <Link to={'/account/posted'} className={subpage =='posted' ? selectedStyle :style }>
        Posted 
    </Link>
    <Link to={'/account/bought'} className={subpage =='bought'? selectedStyle :style}>
       Saved 
    </Link>
    <Link to={'/account/profile'} className={subpage =='profile'? selectedStyle :style}>
       Profile
    </Link>
    </div>
    </div>

    {subpage == 'posted' && (<Posted />)}

    {subpage == 'profile' && (<Profile />)}

    {subpage == 'bought' && (<Saved />)}

    </div>)
}