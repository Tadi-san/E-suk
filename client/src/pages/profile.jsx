import { useContext, useState ,useEffect } from "react"
import { UserContext } from "../usercontext"
import { Navigate } from "react-router-dom"
import axios from "axios"

export default function Profile (){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState('')
  const [id, setId] = useState('')
  const [pfp, setPfp] = useState([])
  const {user, setUser} = useContext(UserContext)
  function Logout(){
    setUser(null)
    setRedirect(true)
  }
useEffect(()=>{
      setName(user.name)
      setEmail(user.email)
      setPfp(user.pfp)
      setId(user._id)
      setPassword('')
}, [])

async function edit(ev){
  ev.preventDefault()
  await axios.post('/edit-profile', {name, email, pfp, id, password})
 Logout()

}
  if(user === null){
    return <Navigate to={'/'} />
  }


    return(
        <form >
        <div className=" flex flex-col justify-center items-center p-5">
        <h2 className=" text-3xl font-semibold my-10 border-b-2 ">Edit profile</h2>
            <img className=" w-56 border rounded-3xl shadow-lg relative" src={pfp} />  
         <p className=" text-sm  text-gray-400">Change user name</p>
            <input
            required
            className=" max-w-xl"
             value={name}
             onChange={(ev)=>{setName(ev.target.value)}}
            type="text"
            />
         <p className=" text-sm  text-gray-400">Change email address </p>
            <input
            required
            className=" max-w-xl"
             value={email} 
             onChange={(ev)=>{setEmail(ev.target.value)}}
            type="text"
            />
           <p className=" text-sm  text-gray-400">Change password </p>
            <input
            required
            className=" max-w-xl"
             value={password} 
             onChange={(ev)=>{setPassword(ev.target.value)}}
            type="password"
            placeholder="input new password"
            />

            <button className=" w-fit mt-3 p-2 rounded-xl shadow-sm bg-green-400 text-white" onClick={(ev)=>{edit(ev)}}>Save Changes</button>
            <button className="primary mt-10 font-semibold shadow-md max-w-2xl" onClick={Logout}>logout</button>
        </div>
        </form>
    )
}