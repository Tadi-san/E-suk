import { useEffect, useState } from "react"
import { Navigate, useParams} from "react-router-dom"
import axios from 'axios'
export default function AddItems(){
const {id} = useParams() 
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [type, setType] = useState('item')
const [photos, setPhotos] = useState([])
const [condition, setCondition] = useState('Phones-&-Tablets')
const [address, setAddress] = useState('')
const [price, setPrice] = useState(0)
const [redirect, setRedierct] = useState(null)
const [currency, setCurrency] = useState('Birr')
const [PhoneNumber, setPhoneNumber] = useState('')
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

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };



if(id){
useEffect(()=>{
    axios.get('/account/posted/'+id).then(response =>{
        const {data} = response
        setTitle(data.title)
        setDescription(data.description)
        setType(data.type)
        setPhotos(data.photos)
        setCondition(data.condition)
        setAddress(data.address)
        setPrice(data.price)
        setCurrency(data.currency)
        setPhoneNumber(data.PhoneNumber)
    })
},[id])
}

function uploadSingleImage(base64) {
    setLoading(true);
    axios.post("/uploadImage", { image: base64 })
      .then((res) => {
        setPhotos (prev => {
            return [...prev, res.data]
        })
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }



function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post("/uploadMultipleImages", { images })
      .then((res) => {
        setPhotos (prev => {
            return [...prev, ...res.data]
        })
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }


async function postItem(ev){
    if(id)
    {
        ev.preventDefault()
        await axios.put('/update',{title, description, type, id
            ,photos, condition, address,price, currency,PhoneNumber,} )

            setRedierct(true)
    }
    else{
        ev.preventDefault()
        await axios.post('/post-item', {title, description, type
                                        ,photos, condition, address,price, currency,PhoneNumber,}                                         
                                        )
            setRedierct(true)
    }




}



    function PreInput(title, desc){
        return(
        <div className="mt-5 ">
            <h1 className="text-3xl font-semibold ">{title}</h1>
            <p className=" text-sm text-gray-400">{desc}</p>
        </div>
        )
    }


    // function uploadPhoto (ev){
    //     const {files} = ev.target
    //     const data = new FormData()
    //     for(let i=0; i < files.length; i++){
    //         data.append('photos', files[i])
    //     }
    //     axios.post('/upload-photo', data, 
    //     {
    //         headers:{"Content-Type":"multipart/form-data"}
    //     }).then(response =>{
    //         const {data:filename} = response
            // setPhotos (prev => {
            //     return [...prev, ...filename]
            // })
    //     }
    //     )
    // }


    if(redirect){
        return( <Navigate to = {'/account/posted'} />)
    }


    return(
        <div>
        <form className="grid grid-cols-1 p-5 lg:px-56 md:px-28" onSubmit={postItem}>
            <div>
                {PreInput("Title","write the name of the item/service you would like to sell")}
                <input className="mb-2"
                 type="text"
                 required
                  placeholder="name of the item/service"
                  value={title}
                  onChange={(ev)=>{setTitle(ev.target.value)}}
                  />
            </div>
            <div>
                {PreInput("Description","describe the item/service you would like to sell")}
                <textarea 
                value={description}
                required
                onChange={(ev)=>{setDescription(ev.target.value)}} 
                />
            </div>
            <div>
                {PreInput("Type","choose weather what you're selling is an item or a service")}
            <div className=" flex gap-5">
            <select value={type} onChange={(ev)=>{setType(ev.target.value)}}>
                <option>Item</option>
                <option>Service</option>
            </select>
            </div> 
            </div> 

            {PreInput("Category","categories the item/service you are selling")}
            <select value={condition} onChange={(ev)=>{setCondition(ev.target.value)}}>
                <option>Phones-&-Tablets</option>
                <option>Vehicle</option>
                <option>Electronics</option>
                <option>Beauty-products</option>
                <option>Clothes</option>
                <option>Gifts</option>
                <option>Pets</option>
                <option>Food</option>
                <option>Sport-&-Art</option>
                <option>Other</option>
            </select>

            <div>
                {PreInput("Photos","add photos of your item/ photos that describe your service, upload three or more , the more the marier")}
                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <label className=" cursor-pointer bg-white flex w-32 h-20 justify-center items-center mt-3 rounded-2xl border shadow-lg text-black font-semibold">
                <h2>Upload</h2>
                <input required type="file" 
                className=" hidden"
                multiple
                placeholder="minimum 3"
                onChange={uploadImage} >
            
                </input>
                </label>
               
                    {photos.length >0 && photos.map(link => (<div key={item._id} className=" mt-3 shadow-md  w-32 h-20 object-cover rounded-xl relative">
                       
                        <img className=" w-32 h-20 object-cover rounded-xl relative" src={link} />
                        
                    </div>))}
                
                </div>
            </div>

            <div >
                {PreInput("Price","set price for the item/service you would like to sell")}
                <div className=" flex gap-2">
                <input className="mb-2" 
                type="number" 
                placeholder="price"
                required
                value={price }
                onChange={(ev)=>{setPrice(ev.target.value )}}
                   />
                   <select value={currency} onChange={(ev)=>{setCurrency(ev.target.value)}} >
                    <option>Birr</option>
                    <option>$</option>
                   </select>
                </div>
            </div>
            <div>
                {PreInput("Address","write where your buyer/client could get your item/service")}
                <input className="mb-2" 
                type="text" 
                placeholder="location"
                required
                value={address}
                onChange={(ev)=>{setAddress(ev.target.value)}}
                   />
            </div>
            <div>
                {PreInput("Phone number","write your phone number for your client to call you and ask other informations ")}
                <input className="mb-2" 
                type="tel" 
                placeholder="09..."
                required
                value={PhoneNumber}
                onChange={(ev)=>{setPhoneNumber(ev.target.value)}}
                   />
            </div>
                <button className="mt-5 border shadow-lg bg-primery text-white font-semibold w-full h-10 rounded-2xl  " >Add</button>
        
            </form>
        </div>
      
    )
}