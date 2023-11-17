
import { useState } from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
export default function Registerpage(ev){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [pfp, setPfp] = useState([])
    const [loading, setLoading] = useState(false);
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);
      
    
        if (files.length === 1) {
          const base64 = await convertBase64(files[0]);
          uploadSingleImage(base64);
          return;
        }
    }    
    function uploadSingleImage(base64) {
        setLoading(true);
        axios.post("/upload", { image: base64 })
          .then((res) => {
            setPfp(res.data);
            alert("profile picture updated Succesfully");
          })
          .then(() => setLoading(false))
          .catch(console.log);
      }
    

    function registerUser(ev){
        ev.preventDefault()
       try{
        axios.post('/register',{name,password, pfp ,email })
        alert("Registered Successfully")
       }
       catch(e){
        alert("registration failed "+ e)
       }
    }
    // function uploadPfp (ev){
    //     const {files} = ev.target
    //     const data = new FormData()
    //     for(let i=0; i < files.length; i++){
    //         data.append('pfp', files[i])
    //     }
    //     axios.post('/upload', data, 
    //     {
    //         headers:{"Content-Type":"multipart/form-data"}
    //     }).then(response =>{
    //         const {data:filename} = response
    //         setPfp (prev => {
    //             return [...prev, ...filename]
    //         })
    //     }
    //     )
    // }



    return(
        <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
    <h1 className=" text-4xl text-center mb-4">Register</h1>
    <form className="max-w-md mx-auto " onSubmit={registerUser}>
    <div className=" flex justify-center">
    
    <label className=" cursor-pointer relative  w-40 h-40 mb-3 rounded-full shadow-md z-10 text-white" >
        <input type="file" 
        multiple
        required
        onChange={uploadImage}
        className=" hidden" />

    </label>
        <div className="z-0 absolute w-40 h-40 mb-3 rounded-full shadow-md  ">
        <img className="w-40 h-40 mb-3 rounded-full object-cover" src={pfp}  />
        </div>
    </div>
    
        <input 
        type="text" 
        placeholder="full name" 
        required
        value={name}
        onChange={(ev) =>{setName(ev.target.value)}}
        
        />
            <input 
        type="email" 
        placeholder="your@email.com" 
        required
        value={email}
        onChange={(ev) =>{setEmail(ev.target.value)}}
        
        />
     
        <input 
        type="password" 
        placeholder="Add password" 
        required
        value={password}
        onChange={(ev) =>{setPassword(ev.target.value)}}
        
        />


        <button className="primary mt-5" type="submit" >Register</button>
        <div className="text-center py-2 text-grey-500">Already registered?
         <Link to = {"/login"} className="underline font-semibold text-black">Login</Link>
         </div> 
   </form> </div> 
    </div>
    )
}