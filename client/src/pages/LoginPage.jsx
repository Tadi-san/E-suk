
import {Link, Navigate} from "react-router-dom"
import React, { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../usercontext"

export default function LoginPage (){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [saved, setSeved] = useState([])
const [redirect, setRedirect] = useState(null)
const {setUser} = useContext(UserContext)

async function loginHandler(ev){
   try{
    ev.preventDefault()
   const {data} = await axios.post('/login', {email, password})
   setUser(data)
   setRedirect(true)

   }
   catch(e){

   }
}

if(redirect){
  return <Navigate to={'/'} />
}


    return(
    <div className="mt-4 grow flex flex-col items-center">
    <div className="mb-5">
    <h1 className=" text-4xl text-center mb-4">Login</h1>
    <form className="max-w-md mx-auto " onSubmit={loginHandler} >
    <input type="email"
    value={email}
     placeholder="your@email.com"
     onChange={(ev) => {setEmail(ev.target.value)}}
     required
      />
        <input type
  ="password" 
        placeholder="password"
        required
        value={password}
        onChange={(ev)=>{setPassword(ev.target.value)}}
        />
        <button className="primary" type="submit">Login</button>
        <div className="text-center py-2 text-grey-500 flex justify-center" > <p>Didn't have an account yet?</p> 
        <Link className="underline text-black font-semibold" to={"/register"} > Register</Link>
         </div>
    </form> </div>
    <div className="p-2 text-gray-400 flex flex-col items-center">
    <h2 className=" text-sm">Demo accounts</h2>
   <p>Email: johndoe@gmail.com | password: jo123jo</p>
   <p>Email: test@gmail.com | password: jo123jo</p>
   <p>you can also register your own account and login</p>
    </div>
    </div>)
}